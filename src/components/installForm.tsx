import React, { useState, useRef, useEffect } from 'react';
import { useNotebookPanelContext } from '../contexts/notebookPanelContext';
import { installPackagePip, killPipProcess } from '../pcode/utils';
import { usePackageContext } from '../contexts/packagesListContext';
import { t } from '../translator';
import { providePackageManagerSubshellKernel } from '../utils/packageManagerSubshell';

interface InstallFormProps {
  onClose: () => void;
  initialPackageName?: string;
  pypiServerUrl: string;
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
  initialPackageName,
  pypiServerUrl
}) => {
  const [packageName, setPackageName] = useState<string>(
    initialPackageName ?? ''
  );
  const [installing, setInstalling] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const interruptedRef = useRef(false);
  const currentPidRef = useRef<number | null>(null);

  const futureRef = useRef<any>(null);
  const doneRef = useRef(false);

  const notebookPanel = useNotebookPanelContext();
  const kernel = notebookPanel?.sessionContext.session?.kernel;

  const { refreshPackages } = usePackageContext();

  const logsEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (initialPackageName !== undefined) {
      setPackageName(initialPackageName);
    }
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
          !line.includes('INSTALLED') &&
          !line.includes('NOTHING_TO_CHANGE')
      );
    if (lines.length > 0) {
      setLogs(prev => [...prev, ...lines]);
    }
  };

  // disconnect future
  const detachFuture = () => {
    // guard
    if (doneRef.current) return;
    doneRef.current = true;

    const f = futureRef.current;
    futureRef.current = null;

    if (f) {
      try {
        f.dispose?.();
      } catch {
        // ignore
      }
      try {
        f.onIOPub = null;
      } catch {
        // ignore
      }
    }
  };

  const handleStop = async () => {
    const pid = currentPidRef.current;
    if (!pid) {
      setMessage(t('Nothing to stop.'));
      return;
    }

    // interupt future
    interruptedRef.current = true;
    detachFuture();

    // immediate UI update
    currentPidRef.current = null;
    setInstalling(false);
    setMessage(
      t('Installation was cancelled. The package may have been installed.')
    );

    // stop process
    const pmKernel = await providePackageManagerSubshellKernel(kernel);
    if (!pmKernel) {
      refreshPackages();
      return;
    }

    await pmKernel.requestExecute({
      code: killPipProcess(pid),
      store_history: false
    }).done;

    pmKernel.requestExecute({
      code: 'pass',
      store_history: false
    });

    refreshPackages();
  };

  const handleInstall = async () => {
    setInstalling(true);
    setMessage(null);
    setLogs([]);
    interruptedRef.current = false;

    // reset (new installation)
    doneRef.current = false;

    const pmKernel = await providePackageManagerSubshellKernel(kernel);
    if (!pmKernel) {
      setInstalling(false);
      setMessage(t('No kernel available.'));
      return;
    }
    const future = pmKernel.requestExecute({
      code: installPackagePip(packageName, pypiServerUrl),
      store_history: false
    });
    if (!future) {
      setInstalling(false);
      setMessage(t('No kernel available.'));
      return;
    }

    // remember future
    futureRef.current = future;

    future.onIOPub = msg => {
      // guard
      if (interruptedRef.current) return;
      if (doneRef.current) return;

      const text = (msg.content as any)?.text;
      if (!text) return;

      // additional guard (to avoid race)
      if (interruptedRef.current || doneRef.current) return;

      appendLog(text);

      const match = text.match(/Starting installation process:\s*(\d+)/);
      if (match) {
        const pid = Number(match[1]);
        if (!isNaN(pid)) {
          currentPidRef.current = pid;
        }
        return;
      }

      // error
      if (text.startsWith('[error]')) {
        detachFuture();
        setMessage(t('Installation failed. Check logs for more information.'));
        setInstalling(false);
        currentPidRef.current = null;
        return;
      }
      // success
      if (text.startsWith('[done]')) {
        detachFuture();
        setMessage(t('Package installed successfully.'));
        setInstalling(false);
        currentPidRef.current = null;
        refreshPackages();
        return;
      }
    };
  };

  const resetForm = () => {
    setPackageName('');
    setLogs([]);
    setMessage(null);
    setInstalling(false);
    interruptedRef.current = false;
    detachFuture();
  };
  return (
    <div className="mljar-packages-manager-install-form">
      <div className="mljar-packages-manager-usage-box">
        <strong>{t('How to install packages')}</strong>
        <div>
          {t(
            'Type the package name to install the latest version, for example:'
          )}{' '}
          <code>numpy</code>
        </div>
        <div>
          {t('To install a specific version, use:')} <code>numpy==1.26.4</code>
        </div>
      </div>
      <input
        type="text"
        value={packageName}
        onChange={e => setPackageName(e.target.value)}
        placeholder={t('Enter package name...')}
        className="mljar-packages-manager-install-input"
        disabled={!!message || installing}
        onKeyDown={e => {
          if (e.key === 'Enter' && packageName.trim() !== '' && !installing) {
            handleInstall();
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
            onClick={() => {
              handleInstall();
            }}
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
