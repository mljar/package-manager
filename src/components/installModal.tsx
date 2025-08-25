import React from 'react';
import ReactDOM from 'react-dom';

interface IInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const InstallModal: React.FC<IInstallModalProps> = ({
  isOpen,
  onClose,
  children
}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="mljar-package-manager-modal-overlay">
      <div className="mljar-package-manager-content">
        <button className="mljar-package-manager-modal-close" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};
