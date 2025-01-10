import React from 'react';
import { useState } from 'react';
import { RefreshButton } from '../components/refreshButton';
import { InstallButton } from './installButton';
import { BackButton } from './backButton';

export const PackageActions: React.FC = () => {
  const [isInstalling, setIsInstalling] = useState<boolean>(false);

  const handleStartInstall = () => {
    setIsInstalling(true);
  };

  const handleBack = () => {
    setIsInstalling(false);
  };

  return (
    <div className="actions-container">
      <RefreshButton />
      {!isInstalling && <InstallButton onStartInstall={handleStartInstall} />}
      {isInstalling && <BackButton onBack={handleBack} />}
    </div>
  );
};
