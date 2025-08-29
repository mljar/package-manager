import React, { useState, useRef, useEffect } from 'react';
import { useNotebookPanelContext } from '../contexts/notebookPanelContext';
import { checkIfPackageInstalled, installPackagePip } from '../pcode/utils';
import { KernelMessage } from '@jupyterlab/services';
import { usePackageContext } from '../contexts/packagesListContext';
import { t } from '../translator';

interface InstallFormProps {
  onClose: () => void;
  initialPackageName?: string;
}

const isSuccess = (message: string | null): boolean => {
  return (
    message?.toLowerCase().includes(t('success')) ||
    message?.toLowerCase().includes(t('already')) ||
    false
  );
};

export const InstallForm: React.FC<InstallFormProps> = ({
  onClose,
  initialPackageName
}) => {
  const EVENT_PACKAGES_INSTALLED = 'mljar-packages-installed';

  const [packageName, setPackageName] = useState<string>(
    initialPackageName ?? ''
  );
  const [installing, setInstalling] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const interruptedRef = useRef(false);
  const notebookPanel = useNotebookPanelContext();
  const { refreshPackages } = usePackageContext();

  const logsEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialPackageName !== undefined) setPackageName(initialPackageName);
  }, [initialPackageName]);

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const appendLog = (text: string) => {
    const lines = text
      .split(/\r?\n/)
      .filter(
        line =>
          line.trim() !== '' &&
          !line.includes('NOT_INSTALLED') &&
          !line.includes('INSTALLED')
      );
    if (lines.length > 0) {
      setLogs(prev => [...prev, ...lines]);
    }
  };

  const handleStop = () => {
    notebookPanel?.sessionContext.session?.kernel?.interrupt();
    interruptedRef.current = true;
    setMessage(t('Installation stopped by user.'));
    setInstalling(false);
  };

  const handleCheckAndInstall = () => {
    setInstalling(true);
    setMessage(null);
    setLogs([]);

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
          text: string;
        }
        const content = msg.content as IContentData;

        if (content.text) appendLog(content.text);

        if (content.text.includes('NOT_INSTALLED')) {
          proceedWithInstall();
        } else if (content.text.includes('INSTALLED')) {
          setInstalling(false);
          setMessage(t('Package is already installed.'));
          window.dispatchEvent(
            new CustomEvent(EVENT_PACKAGES_INSTALLED, { detail: { packages: packageName } })
          );
        }
      } else if (msgType === 'error') {
        setInstalling(false);
        setMessage(t('Error while checking installation. Check package name.'));
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
      if (interruptedRef.current) {
        return;
      }
      const msgType = msg.header.msg_type;
      interface IContentData {
        text: string;
      }
      const content = msg.content as IContentData;

      if (content.text) appendLog(content.text);

      if (msgType === 'error') {
        setMessage(
          t('An error occurred during installation. Check package name.')
        );
        setInstalling(false);
      } else if (content.text.includes('Successfully installed')) {
        setMessage(t('Package installed successfully.'));
        setInstalling(false);
        refreshPackages();
        window.dispatchEvent(
          new CustomEvent(EVENT_PACKAGES_INSTALLED, { detail: { packages: packageName } })
        );
      }
    };
  };

  const resetForm = () => {
    setPackageName('');
    setLogs([]);
    setMessage(null);
    setInstalling(false);
    interruptedRef.current = false;
  };

  return (
    <div className="mljar-packages-manager-install-form">
      <div className="mljar-packages-manager-usage-box">
        <strong>{t('Usage:')} </strong> {t('Enter')}{' '}
        <code>{t('package_name')}</code> {t('or')}{' '}
        <code>{t('package_name==version')}</code>
      </div>
      <input
        type="text"
        value={packageName}
        onChange={e => setPackageName(e.target.value)}
        placeholder={t('Enter package name...')}
        className="mljar-packages-manager-install-input"
        disabled={!!message}
        onKeyDown={e => {
          if (e.key === 'Enter' && packageName.trim() !== '' && !installing) {
            handleCheckAndInstall();
          }
        }}
      />
      {logs.length > 0 && (
        <div className="mljar-packages-manager-install-logs">
          {logs.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
          <div ref={logsEndRef} />
        </div>
      )}
      {!message ? (
        <div className="mljar-packages-manager-install-form-buttons">
          <button
            className="mljar-packages-manager-install-submit-button"
            onClick={handleCheckAndInstall}
            disabled={installing || packageName.trim() === ''}
          >
            {installing ? (
              <div className="mljar-packages-manager-spinner" />
            ) : (
              t('Install')
            )}
          </button>
          {installing && (
            <button
              className="mljar-packages-manager-stop-button"
              onClick={handleStop}
            >
              Stop
            </button>
          )}
        </div>
      ) : (
        <div className="mljar-packages-manager-result">
          <p
            className={`mljar-packages-manager-install-message ${isSuccess(message) ? '' : 'error'}`}
          >
            {message}
          </p>
          <div className="mljar-packages-manager-install-form-buttons">
            <button
              className="mljar-packages-manager-install-submit-button"
              onClick={() => {
                resetForm();
              }}
            >
              {t('Install another package')}
            </button>
            <button
              className="mljar-packages-manager-install-close-button"
              onClick={onClose}
            >
              {t('Close')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
