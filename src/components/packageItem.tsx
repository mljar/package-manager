// src/components/PackageItem.tsx
import React from 'react';
import { useState } from 'react';
import { myDeleteIcon } from '../icons/deletePackageIcon';
import { removePackagePip } from '../pcode/utils';
import { useNotebookPanelContext } from '../contexts/notebookPanelContext';
import { KernelMessage } from '@jupyterlab/services';
import { usePackageContext } from '../contexts/packagesListContext';
import { errorIcon } from '../icons/errorIcon';

interface PackageInfo {
  name: string;
  version: string;
}

interface PackageItemProps {
  pkg: PackageInfo;
}

export const PackageItem: React.FC<PackageItemProps> = ({ pkg }) => {
  const notebookPanel = useNotebookPanelContext();
  const { refreshPackages } = usePackageContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleDelete = async () => {
    let confirm = false;
    if ((window as any).electron) {
      confirm = await (window as any).electron.invoke(
        'show-confirm-dialog',
        `Click "Ok" to confirm the deletion of ${pkg.name}.`
      );
    } else {
      confirm = window.confirm(
        `Click "Ok" to confirm the deletion of ${pkg.name}.`
      );
    }

    if (confirm) {
      setLoading(true);
      setError(false);

      const code = removePackagePip(pkg.name);
      const future =
        notebookPanel?.sessionContext.session?.kernel?.requestExecute({
          code,
          store_history: false
        });
      if (!future) {
        setLoading(false);
        setError(true);
        return;
      }
      future.onIOPub = (msg: KernelMessage.IIOPubMessage) => {
        const msgType = msg.header.msg_type;
        if (
          msgType === 'stream' ||
          msgType === 'execute_result' ||
          msgType === 'display_data' ||
          msgType === 'update_display_data'
        ) {
          interface ContentData {
            name: string;
            text: string;
          }
          const content = msg.content as ContentData;
          if (content.text.includes('ERROR')) {
            setError(true);
            setLoading(false);
          } else if (content.text.includes('Successfully uninstalled')) {
            setError(false);
            setError(false);
            refreshPackages();
          }
        } else if (msgType === 'error') {
          setError(true);
          setLoading(false);
        }
      };
    }
  };

  return (
    <li className="mljar-packages-manager-list-item">
      <span className="mljar-packages-manager-package-name"> {pkg.name}</span>
      <span className="mljar-packages-manager-package-version">
        {pkg.version}
      </span>
      {!loading && (
        <button
          className="mljar-packages-manager-delete-button"
          onClick={handleDelete}
          aria-label={
            error
              ? `Error during uninstalling ${pkg.name}`
              : `Uninstall ${pkg.name}`
          }
          title={`Delete ${pkg.name}`}
        >
          {error ? (
            <errorIcon.react className="mljar-packages-manager-error-icon" />
          ) : (
            <myDeleteIcon.react className="mljar-packages-manager-delete-icon" />
          )}
        </button>
      )}
      {loading && <span className="mljar-packages-manager-spinner" />}
    </li>
  );
};
