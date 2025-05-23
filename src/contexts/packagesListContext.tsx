// src/contexts/PackageContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback
} from 'react';

import { IStateDB } from '@jupyterlab/statedb';
import { CommandRegistry } from '@lumino/commands';
import { useNotebookPanelContext } from './notebookPanelContext';
import { useNotebookKernelContext } from './notebookKernelContext';
import { listPackagesCode } from '../pcode/utils';
import { KernelMessage } from '@jupyterlab/services';

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

  const setPackagesList = (pkgs: IPackageInfo[]) => {
    setPackages(pkgs);
    stateDB.save('mljarPackagesList', JSON.stringify(pkgs));
  };

  const setPackagesListLoading = (ld: boolean) => {
    setLoading(ld);
    stateDB.save('mljarPackagesListLoading', ld);
  };

  const executeCode = useCallback(async () => {
    setPackagesList([] as IPackageInfo[]);
    setPackagesListLoading(true);
    setError(null);

    if (!notebookPanel || !kernel) {
      setPackagesListLoading(false);
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
        setPackagesListLoading(false);
      } else {
        const future =
          notebookPanel.sessionContext?.session?.kernel?.requestExecute({
            code: listPackagesCode,
            store_history: false
          });

        if (future) {
          future.onIOPub = (msg: KernelMessage.IIOPubMessage) => {
            const msgType = msg.header.msg_type;
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
                } else {
                  console.warn('Data is not JSON:', jsonData);
                }
                setPackagesListLoading(false);
              } else if (textData) {
                try {
                  const cleanedData = textData.replace(/^['"]|['"]$/g, '');
                  const doubleQuotedData = cleanedData.replace(/'/g, '"');
                  const parsedData: IPackageInfo[] =
                    JSON.parse(doubleQuotedData);

                  if (Array.isArray(parsedData)) {
                    setPackagesList([]);
                    setPackagesList(parsedData);
                    if (kernelId !== undefined && kernelId !== null) {
                      kernelIdToPackagesList[kernelId] = parsedData;
                    }
                  } else {
                    throw new Error('Error during parsing.');
                  }
                  setPackagesListLoading(false);
                } catch (err) {
                  console.error(
                    'Error during export JSON from text/plain:',
                    err
                  );
                  setError('Error during export JSON');
                  setPackagesListLoading(false);
                }
              }
            }
          };
        }
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Unexpected error');
      setPackagesListLoading(false);
    }
  }, [notebookPanel, kernel]);

  useEffect(() => {
    executeCode();
  }, [executeCode]);

  useEffect(() => {
    commands.addCommand('mljar-packages-manager-refresh', {
      execute: () => {
        kernelIdToPackagesList = {};
        executeCode();
      },
      label: 'Refresh packages in MLJAR Packages Manager'
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
