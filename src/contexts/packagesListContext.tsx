// src/contexts/PackageContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react';

import { IStateDB } from '@jupyterlab/statedb';
import { CommandRegistry } from '@lumino/commands';
import { useNotebookPanelContext } from './notebookPanelContext';
import { useNotebookKernelContext } from './notebookKernelContext';
import { listPackagesCode } from '../pcode/utils';
import { KernelMessage } from '@jupyterlab/services';
import { t } from '../translator';

// constants
// StateDB keys
export const STATE_DB_PACKAGES_LIST = 'mljarPackages';
export const STATE_DB_PACKAGES_STATUS = 'mljarPackagesStatus';

// Commands
export const CMD_REFRESH_PIECE_OF_CODE = 'mljar-piece-of-code:refresh-packages'; // force refresh in Piece of Code
export const CMD_REFRESH_AI_ASSISTANT = 'mljar-ai-assistant:refresh-packages'; // force refresh in AI Assistant
export const CMD_REFRESH_PACKAGES_MANAGER = 'mljar-packages-manager-refresh'; // force refresh in this package

interface IPackageInfo {
  name: string;
  version: string;
}

interface IPackageContextProps {
  packages: IPackageInfo[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  refreshPackages: () => void;
}

const PackageContext = createContext<IPackageContextProps | undefined>(
  undefined
);

let kernelIdToPackagesList: Record<string, IPackageInfo[]> = {};

export const PackageContextProvider: React.FC<{
  children: React.ReactNode;
  stateDB: IStateDB;
  commands: CommandRegistry;
}> = ({ children, stateDB, commands }) => {
  const notebookPanel = useNotebookPanelContext();
  const kernel = useNotebookKernelContext();
  const [packages, setPackages] = useState<IPackageInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const retryCountRef = useRef(0);

  const setPackagesList = (pkgs: IPackageInfo[]) => {
    setPackages(pkgs);
    stateDB.save(STATE_DB_PACKAGES_LIST, JSON.stringify(pkgs));
  };

  const setPackagesStatus = (s: 'unknown' | 'loading' | 'loaded' | 'error') => {
    stateDB.save(STATE_DB_PACKAGES_STATUS, s);
    commands.execute(CMD_REFRESH_PIECE_OF_CODE).catch(err => {});
    commands.execute(CMD_REFRESH_AI_ASSISTANT).catch(err => {});
  };

  const executeCode = useCallback(async () => {
    setPackagesList([] as IPackageInfo[]);
    setLoading(true);
    setPackagesStatus('loading');
    setError(null);

    if (!notebookPanel || !kernel) {
      setLoading(false);
      setPackagesStatus('unknown');
      return;
    }

    try {
      const kernelId = notebookPanel.sessionContext?.session?.kernel?.id;
      // check if there are packages for current kernel, if yes load them
      // otherwise run code request to Python kernel
      if (
        kernelId !== undefined &&
        kernelId !== null &&
        kernelId in kernelIdToPackagesList
      ) {
        setPackagesList(kernelIdToPackagesList[kernelId]);
        setLoading(false);
        setPackagesStatus('loaded');
        retryCountRef.current = 0;
      } else {
        const future =
          notebookPanel.sessionContext?.session?.kernel?.requestExecute({
            code: listPackagesCode,
            store_history: false
          });
        if (future) {
          let runAgain = false;
          future.onIOPub = (msg: KernelMessage.IIOPubMessage) => {
            const msgType = msg.header.msg_type;
            if (msgType === 'error') {
              runAgain = true;
              setLoading(false);
              setPackagesStatus('error');
              return;
            }
            if (
              msgType === 'execute_result' ||
              msgType === 'display_data' ||
              msgType === 'update_display_data'
            ) {
              const content = msg.content as any;

              const jsonData = content.data['application/json'];
              const textData = content.data['text/plain'];

              if (jsonData) {
                if (Array.isArray(jsonData)) {
                  setPackagesList(jsonData);
                  setPackagesStatus('loaded');
                  retryCountRef.current = 0;
                } else {
                  console.warn('Data is not JSON:', jsonData);
                }
                setLoading(false);
              } else if (textData) {
                try {
                  const cleanedData = textData.replace(/^['"]|['"]$/g, '');
                  const doubleQuotedData = cleanedData.replace(/'/g, '"');
                  const parsedData: IPackageInfo[] =
                    JSON.parse(doubleQuotedData);

                  if (Array.isArray(parsedData)) {
                    setPackagesList([]);
                    setPackagesList(parsedData);
                    setPackagesStatus('loaded');
                    retryCountRef.current = 0;
                    if (kernelId !== undefined && kernelId !== null) {
                      kernelIdToPackagesList[kernelId] = parsedData;
                    }
                  } else {
                    throw new Error('Error during parsing.');
                  }
                  setLoading(false);
                } catch (err) {
                  console.error(
                    'Error during export JSON from text/plain:',
                    err
                  );
                  setError('Error during export JSON');
                  setLoading(false);
                  setPackagesStatus('error');
                }
              }
            }
          };
          await future.done;
          if (runAgain) {
            // clean JupyterLab displayhook previous cell check
            notebookPanel.sessionContext?.session?.kernel?.requestExecute({
              code: 'pass'
            });
            if (retryCountRef.current < 1) {
              retryCountRef.current += 1;
              setTimeout(executeCode, 100);
            }
          }
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Unexpected error');
      setLoading(false);
      setPackagesStatus('error');
    }
  }, [notebookPanel, kernel]);

  useEffect(() => {
    if (kernel) {
      executeCode();
    }
  }, [kernel?.id]); // run only when kernel.id is changed and kernel is not null

  useEffect(() => {
    commands.addCommand(CMD_REFRESH_PACKAGES_MANAGER, {
      execute: () => {
        kernelIdToPackagesList = {};
        executeCode();
      },
      label: t('Refresh packages in MLJAR Package Manager')
    });
  }, [commands]);

  return (
    <PackageContext.Provider
      value={{
        packages,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        refreshPackages: () => {
          // clear all stored packages for all kernels
          kernelIdToPackagesList = {};
          executeCode();
        }
      }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export const usePackageContext = (): IPackageContextProps => {
  const context = useContext(PackageContext);
  if (context === undefined) {
    throw new Error('usePackageContext must be used within a PackageProvider');
  }
  return context;
};
