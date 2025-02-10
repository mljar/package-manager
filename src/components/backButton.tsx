import React from 'react';
import { backIcon } from '../icons/backIcon';

interface BackButtonProps {
  onBack: () => void;
}

export const BackButton: React.FC<BackButtonProps> = ({ onBack }) => {
  return (
    <button className="mljar-back-button" onClick={onBack} title="Go Back">
      <backIcon.react className="mljar-back-icon" />
    Back 
    </button>
  );
};

