import React from 'react';
import { usePackageContext } from '../contexts/packagesListContext';
import { installIcon } from '../icons/installPackageIcon';

interface IInstallButtonProps {
  onStartInstall: () => void;
}

export const InstallButton: React.FC<IInstallButtonProps> = ({
  onStartInstall
}) => {
  const { loading } = usePackageContext();

  return (
    <button
      className="mljar-packages-manager-install-button"
      onClick={onStartInstall}
      disabled={loading}
      title="Install Package"
    >
      <installIcon.react className="mljar-packages-manager-install-icon" />
    </button>
  );
};
