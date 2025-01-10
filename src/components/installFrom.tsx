import React, { useState } from 'react';


interface InstallFormProps {
  onBack: () => void;
  onInstallSuccess: (packageName: string) => void;
  onInstallError: (error: string) => void;
}

export const InstallForm: React.FC<InstallFormProps> = ({ onInstallSuccess, onInstallError }) => {
  const [packageName, setPackageName] = useState<string>('');
  const [installing, setInstalling] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleInstall = () => {
    setInstalling(true);
    setMessage(null);

    setTimeout(() => {
      const isSuccess = Math.random() > 0.8;
      if (isSuccess) {
        setInstalling(false);
        setMessage(`Package "${packageName}" installed successfully!`);
        onInstallSuccess(packageName);
        setPackageName('');
      } else {
        setInstalling(false);
        setMessage(`Failed to install package "${packageName}".`);
        onInstallError(`Failed to install package "${packageName}".`);
      }
    }, 2000);
  };

  return (
    <div className="install-form">
      <h4>Install New Package</h4>
      <input
        type="text"
        value={packageName}
        onChange={(e) => setPackageName(e.target.value)}
        placeholder="Enter package name"
        className="install-input"
      />
      <button
        className="install-submit-button"
        onClick={handleInstall}
        disabled={installing || packageName.trim() === ''}
      >
        {installing ? 'Installing...' : 'Install'}
      </button>
      {message && <p className={`install-message ${isSuccess(message) ? 'success' : 'error'}`}>{message}</p>}
    </div>
  );
};

const isSuccess = (message: string | null): boolean => {
  return message?.includes('successfully') || false;
};

