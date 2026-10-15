import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { t } from '../translator';

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
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    const previousFocus = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLInputElement>('input')?.focus();
    return () => previousFocus?.focus();
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="mljar-package-manager-modal-overlay">
      <div
        ref={dialogRef}
        className="mljar-package-manager-content"
        role="dialog"
        aria-modal="true"
        aria-label={t('Install package')}
        onKeyDown={event => {
          if (event.key === 'Escape') {
            event.preventDefault();
            event.stopPropagation();
            onClose();
          } else if (event.key === 'Tab') {
            const controls = dialogRef.current?.querySelectorAll<HTMLElement>(
              'button:not(:disabled), input:not(:disabled), [tabindex="0"]'
            );
            if (!controls?.length) {
              return;
            }
            const first = controls[0];
            const last = controls[controls.length - 1];
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first.focus();
            }
          }
        }}
      >
        <button
          type="button"
          className="mljar-package-button mljar-package-icon-button mljar-package-manager-modal-close"
          aria-label={t('Close dialog')}
          onClick={onClose}
        >
          ✖
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
};
