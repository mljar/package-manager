import React, { useState, useEffect } from 'react';
import { usePackageContext } from '../contexts/packagesListContext';
import { installIcon } from '../icons/installPackageIcon';
import { InstallModal } from './installModal';
import { InstallForm } from './installForm';
import { t } from '../translator';

interface IInstallButtonProps {
  onStartInstall: () => void;
}

export const InstallButton: React.FC<IInstallButtonProps> = ({
  onStartInstall
}) => {
  const { loading } = usePackageContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const EVENT_NAME = 'mljar-packages-install';
  const [prefillPackage, setPrefillPackage] = useState<string | undefined>(
    undefined
  );

  const handleClick = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const onOpen = (e: Event) => {
      const ce = e as CustomEvent<{ packageName?: string }>;
      setPrefillPackage(ce.detail?.packageName);
      setIsModalOpen(true);
    };
    window.addEventListener(EVENT_NAME, onOpen as EventListener);
    return () =>
      window.removeEventListener(EVENT_NAME, onOpen as EventListener);
  }, []);

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
        <InstallForm
          onClose={() => setIsModalOpen(false)}
          initialPackageName={prefillPackage}
        />
      </InstallModal>
    </>
  );
};
