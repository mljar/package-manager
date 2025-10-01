// src/components/PackageItem.tsx
import React from 'react';
import { useState } from 'react';
import { myDeleteIcon } from '../icons/deletePackageIcon';
import { removePackagePip } from '../pcode/utils';
import { useNotebookPanelContext } from '../contexts/notebookPanelContext';
import { KernelMessage } from '@jupyterlab/services';
import { usePackageContext } from '../contexts/packagesListContext';
import { errorIcon } from '../icons/errorIcon';
import { t } from '../translator';

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
    let confirmDelete = false;
    if ((window as any).electron) {
      confirmDelete = await (window as any).electron.invoke(
        'show-confirm-dialog',
        `${t('Click "Ok" to confirm the deletion of')} ${pkg.name}.`
      );
    } else {
      confirmDelete = window.confirm(
        `${t('Click "Ok" to confirm the deletion of')} ${pkg.name}.`
      );
    }
    if (!confirmDelete) return;

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

    let done = false;

    const finish = (ok: boolean) => {
      if (done) return;
      done = true;
      setLoading(false);
      setError(!ok);
      try {
        future.dispose?.();
      } catch {
        /* ignore */
      }
    };

    const normalize = (s: string) => (s || '').replace(/\r/g, '\n');

    const extractText = (msg: KernelMessage.IIOPubMessage): string => {
      const msgType = msg.header.msg_type;
      if (msgType === 'stream') {
        const c = msg.content as { text?: string };
        return c?.text ?? '';
      }
      if (
        msgType === 'execute_result' ||
        msgType === 'display_data' ||
        msgType === 'update_display_data'
      ) {
        const c = msg.content as { data?: Record<string, any> };
        const data = c?.data || {};
        if (typeof data['text/plain'] === 'string')
          return data['text/plain'] as string;
        try {
          return JSON.stringify(data);
        } catch {
          return '';
        }
      }
      return '';
    };

    const handleText = (raw: string) => {
      if (!raw) return;
      const text = normalize(raw);

      // Success markers (our streaming tag or pip's usual line)
      if (
        text.includes('[done]') ||
        text.includes('Successfully uninstalled')
      ) {
        refreshPackages();
        finish(true);
        return;
      }

      // "Skipping <pkg> as it is not installed." -> treat as success
      if (/\bSkipping\b.*\bas it is not installed\b/i.test(text)) {
        refreshPackages();
        finish(true);
        return;
      }

      // Obvious failures
      if (text.includes('[error]') || /\bERROR\b/.test(text)) {
        finish(false);
        return;
      }
    };

    future.onIOPub = (msg: KernelMessage.IIOPubMessage) => {
      if (done) return;

      const msgType = msg.header.msg_type;

      if (
        msgType === 'stream' ||
        msgType === 'execute_result' ||
        msgType === 'display_data' ||
        msgType === 'update_display_data'
      ) {
        handleText(extractText(msg));
        return;
      }

      if (msgType === 'error') {
        finish(false);
        return;
      }

      if (msgType === 'status') {
        const c = msg.content as { execution_state?: string };
        if (c?.execution_state === 'idle' && !done) {
          // If no explicit marker but kernel went idle, assume success and refresh.
          refreshPackages();
          finish(true);
        }
      }
    };

    future.onReply = (reply: KernelMessage.IShellMessage) => {
      if (done) return;
      const status = (reply.content as any)?.status;
      if (status === 'error') {
        finish(false);
      }
    };
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
              ? `${t('Error during uninstalling')} ${pkg.name}`
              : `${t('Uninstall')} ${pkg.name}`
          }
          title={`${t('Delete')} ${pkg.name}`}
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
