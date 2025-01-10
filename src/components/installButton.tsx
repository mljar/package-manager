import React from 'react';
import { usePackageContext } from '../contexts/packagesListContext';
import { installIcon } from '../icons/installPackageIcon';

interface InstallButtonProps {
  onStartInstall: () => void;
}

export const InstallButton: React.FC<InstallButtonProps> = ({ onStartInstall }) => {
  const { loading } = usePackageContext();

  return (
    <button
      className="install-button"
      onClick={onStartInstall}
      disabled={loading}
      title="Install Package"
    >
      <installIcon.react className="install-icon" />
      Install
    </button>
  );
};

