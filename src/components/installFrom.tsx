import React, { useState } from 'react';
import { useNotebookPanelContext } from '../contexts/notebookPanelContext';
import { checkIfPackageInstalled, installPackagePip } from '../pcode/utils';
import { KernelMessage } from '@jupyterlab/services';
import { usePackageContext } from '../contexts/packagesListContext';
import { t } from '../translator';
// import { infoIcon } from '../icons/infoIcon'

const isSuccess = (message: string | null): boolean => {
  return (
    message?.toLowerCase().includes(t('success')) ||
    message?.toLowerCase().includes(t('already')) ||
    false
  );
};

export const InstallForm: React.FC = () => {
  const [packageName, setPackageName] = useState<string>('');
  const [installing, setInstalling] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const notebookPanel = useNotebookPanelContext();
  const { refreshPackages } = usePackageContext();

  const handleCheckAndInstall = () => {
    setInstalling(true);
    setMessage(null);

    const code = checkIfPackageInstalled(packageName);
    const future =
      notebookPanel?.sessionContext.session?.kernel?.requestExecute({
        code,
        store_history: false
      });

    if (!future) {
      setInstalling(false);
      setMessage(t('No kernel available.'));
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
        interface IContentData {
          name: string;
          text: string;
        }
        const content = msg.content as IContentData;

        if (content.text.includes('NOT_INSTALLED')) {
          proceedWithInstall();
        } else if (content.text.includes('INSTALLED')) {
          setInstalling(false);
          setMessage(t('Package is already installed.'));
        }
      } else if (msgType === 'error') {
        setInstalling(false);
        setMessage(
          t(
            'An error occurred while checking installation. Check the correctness of the package name.'
          )
        );
      }
    };
  };

  const proceedWithInstall = () => {
    const code = installPackagePip(packageName);
    const future =
      notebookPanel?.sessionContext.session?.kernel?.requestExecute({
        code,
        store_history: false
      });
    if (!future) {
      setMessage(t('No kernel available.'));
      setInstalling(false);
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
        interface IContentData {
          name: string;
          text: string;
        }
        const content = msg.content as IContentData;
        if (content.text.includes('ERROR')) {
          setMessage(t('Error installing the package.'));
          setInstalling(false);
        } else if (content.text.includes('Successfully installed')) {
          setMessage(t('Package installed successfully.'));
          setInstalling(false);
          refreshPackages();
        }
      } else if (msgType === 'error') {
        setMessage(
          t(
            'An error occurred during installation. Check the correctness of the package name.'
          )
        );
        setInstalling(false);
      }
    };
  };

  return (
    <div className="mljar-packages-manager-install-form">
      <span className="mljar-packages-manager-usage-span">
        <span style={{ fontWeight: 600 }}>{t('Usage')}: </span>
        {t('Enter')}{' '}
        <span style={{ fontWeight: 600, color: '#0099cc' }}>
          {t('package_name')}
        </span>{' '}
        {t('or')}{' '}
        <span style={{ fontWeight: 600, color: '#0099cc' }}>
          {t('package_name==version')}
        </span>
      </span>
      <input
        type="text"
        value={packageName}
        onChange={e => setPackageName(e.target.value)}
        placeholder={t('Enter package name...')}
        className="mljar-packages-manager-install-input"
      />
      <div className="mljar-packages-manager-install-form-buttons">
        <button
          className="mljar-packages-manager-install-submit-button"
          onClick={handleCheckAndInstall}
          disabled={installing || packageName.trim() === ''}
        >
          {installing ? t('Processing...') : t('Install')}
        </button>
      </div>
      {message && (
        <p
          className={`mljar-packages-manager-install-message ${isSuccess(message) ? '' : 'error'}`}
        >
          {message}
        </p>
      )}
    </div>
  );
};
