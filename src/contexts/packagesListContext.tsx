// src/contexts/PackageContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef
} from 'react';

import { IKernelData } from '@mljar/kernel-data';
import { CommandRegistry } from '@lumino/commands';
import { useNotebookPanelContext } from './notebookPanelContext';
import { useNotebookKernelContext } from './notebookKernelContext';
import { listPackagesCode } from '../pcode/utils';
import { KernelMessage } from '@jupyterlab/services';
import { t } from '../translator';
import {
  providePackageManagerSubshellKernel,
  resetPackageManagerSubshell
} from '../utils/packageManagerSubshell';

export const CMD_REFRESH_PACKAGES_MANAGER = 'mljar-packages-manager-refresh';

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

export const PackageContextProvider: React.FC<{
  children: React.ReactNode;
  kernelData: IKernelData;
  commands: CommandRegistry;
}> = ({ children, kernelData, commands }) => {
  const notebookPanel = useNotebookPanelContext();
  const kernel = useNotebookKernelContext();
  const [packages, setPackages] = useState<IPackageInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const activeRef = useRef(notebookPanel);
  activeRef.current = notebookPanel;
  const executeCode = useCallback(async () => {
    if (!notebookPanel || activeRef.current !== notebookPanel) {
      return;
    }
    const session = notebookPanel.context.sessionContext;
    kernelData.track(session);
    await session.ready;
    const sourceKernel = session.session?.kernel;
    if (!sourceKernel) {
      setPackages([]);
      setLoading(false);
      return;
    }
    const request = kernelData.begin(sourceKernel.id, 'packages');
    const current = () =>
      activeRef.current === notebookPanel &&
      session.session?.kernel?.id === sourceKernel.id &&
      kernelData.current(request);
    setPackages([]);
    setLoading(true);
    setError(null);
    try {
      const pmKernel = await providePackageManagerSubshellKernel(sourceKernel);
      if (!current()) {
        return;
      }
      if (!pmKernel) {
        throw new Error('No kernel available');
      }
      let received = false;
      const future = pmKernel.requestExecute({
        code: listPackagesCode,
        store_history: false
      });
      future.onIOPub = (msg: KernelMessage.IIOPubMessage) => {
        if (!current()) {
          return;
        }
        if (msg.header.msg_type === 'error') {
          kernelData.fail(request, 'Package inspection failed');
          setError('Package inspection failed');
          return;
        }
        if (
          ['execute_result', 'display_data', 'update_display_data'].includes(
            msg.header.msg_type
          )
        ) {
          const data = (msg.content as any)?.data;
          const items = data?.['application/json'];
          if (Array.isArray(items)) {
            received = true;
            kernelData.publish(request, items);
            setPackages(items);
          }
        }
      };
      await future.done;
      if (current() && !received) {
        throw new Error('Kernel returned no package snapshot');
      }
    } catch (err) {
      if (current()) {
        kernelData.fail(request, String(err));
        setError('Package inspection failed');
      }
    } finally {
      if (current()) {
        setLoading(false);
      }
    }
  }, [notebookPanel, kernel?.id, kernelData]);

  useEffect(() => {
    setPackages([]);
    setLoading(false);
    setError(null);
    if (!notebookPanel) {
      return;
    }
    const session = notebookPanel.context.sessionContext;
    kernelData.track(session);
    const onStatus = (_: unknown, status: string) => {
      if (
        ['restarting', 'autorestarting', 'dead', 'terminating'].includes(status)
      ) {
        resetPackageManagerSubshell();
        setPackages([]);
      } else if (
        status === 'idle' &&
        kernelData.packages(session.session?.kernel?.id).status === 'unknown'
      ) {
        void executeCode();
      }
    };
    session.statusChanged.connect(onStatus);
    void executeCode();
    return () => {
      session.statusChanged.disconnect(onStatus);
    };
  }, [notebookPanel, executeCode, kernelData]);

  useEffect(() => {
    const registration = commands.addCommand(CMD_REFRESH_PACKAGES_MANAGER, {
      execute: executeCode,
      label: t('Refresh packages in MLJAR Package Manager')
    });
    return () => registration.dispose();
  }, [commands, executeCode]);

  return (
    <PackageContext.Provider
      value={{
        packages,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        refreshPackages: executeCode
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
