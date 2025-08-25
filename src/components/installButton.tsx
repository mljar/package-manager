import React, { useState } from 'react';
import { usePackageContext } from '../contexts/packagesListContext';
import { installIcon } from '../icons/installPackageIcon';
import { InstallModal } from './installModal';
import { InstallForm } from './installFrom';
import { t } from '../translator';

interface IInstallButtonProps {
  onStartInstall: () => void;
}

export const InstallButton: React.FC<IInstallButtonProps> = ({
  onStartInstall
}) => {
  const { loading } = usePackageContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        className="mljar-packages-manager-install-button"
        onClick={handleClick}
        disabled={loading}
        title={t('Install Packages')}
      >
        <installIcon.react className="mljar-packages-manager-install-icon" />
      </button>

      <InstallModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>{t('Install Packages')}</h3>
        <InstallForm onClose={() => setIsModalOpen(false)} />
      </InstallModal>
    </>
  );
};
