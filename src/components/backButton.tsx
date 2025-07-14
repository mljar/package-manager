import React from 'react';
import { backIcon } from '../icons/backIcon';
import { t } from '../translator';

interface BackButtonProps {
  onBack: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onBack }) => {
  return (
    <button
      className="mljar-packages-manager-back-button"
      onClick={onBack}
      title={t('Go Back')}
    >
      <backIcon.react className="mljar-packages-manager-back-icon" />
      {t('Back')}
    </button>
  );
};
