// src/contexts/PackageContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNotebookPanelContext } from './notebookPanelContext';
import { useNotebookKernelContext } from './notebookKernelContext';
import { listPackagesCode } from '../pcode/utils';
import { KernelMessage } from '@jupyterlab/services';

interface PackageInfo {
  name: string;
  version: string;
}

interface PackageContextProps {
  packages: PackageInfo[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  refreshPackages: () => void;
}

const PackageContext = createContext<PackageContextProps | undefined>(undefined);

export const PackageContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const notebookPanel = useNotebookPanelContext();
  const kernel = useNotebookKernelContext();
  const [packages, setPackages] = useState<PackageInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const executeCode = useCallback(async () => {
    setPackages([]);
    setLoading(true);
    setError(null);


    if (!notebookPanel || !kernel) {
      setLoading(false);
      return;
    }

    try {
      const future = notebookPanel.sessionContext?.session?.kernel?.requestExecute({
        code: listPackagesCode,
        store_history: false,
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
                setPackages(jsonData);
              } else {
                console.warn('Odebrane dane JSON nie są tablicą:', jsonData);
              }
              setLoading(false);
            } else if (textData) {
              try {
                const cleanedData = textData.replace(/^['"]|['"]$/g, '');
                const doubleQuotedData = cleanedData.replace(/'/g, '"');
                const parsedData: PackageInfo[] = JSON.parse(doubleQuotedData);

                if (Array.isArray(parsedData)) {
                  setPackages([]);
                  setPackages(parsedData);
                } else {
                  throw new Error('Error during parsing.');
                }
                setLoading(false);
              } catch (err) {
                console.error('Error during export JSON from text/plain:', err);
                setError('Error during export JSON.');
                setLoading(false);
              }
            }
          }
        };
      }
    } catch (err) {
      console.error('Unexpected error:', err);
      setError('Unexpected error.');
      setLoading(false);
    }
  }, [notebookPanel, kernel]);

  useEffect(() => {
    executeCode();
  }, [executeCode]);

  return (
    <PackageContext.Provider
      value={{ packages, loading, error, searchTerm, setSearchTerm, refreshPackages: executeCode }}
    >
      {children}
    </PackageContext.Provider>
  );
};

export const usePackageContext = (): PackageContextProps => {
  const context = useContext(PackageContext);
  if (context === undefined) {
    throw new Error('usePackageContext must be used within a PackageProvider');
  }
  return context;
};

