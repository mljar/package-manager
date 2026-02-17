// import { usePackageContext } from '../contexts/packagesListContext';
import { settingsIcon } from '../icons/settingsIcon';
import React from 'react';
import { t } from '../translator';

interface SettingsButtonProps {
  onClick: () => void;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({ 
    onClick,
 }) => {
  return (
    <button
      className="mljar-packages-manager-settings-button"
      onClick={onClick}
      title={t('Settings')}
    >
      <settingsIcon.react className="mljar-packages-manager-settings-icon" />
    </button>
  );
};
