// src/components/PackageListComponent.tsx
import React, { useState } from 'react';
import { SearchBar } from '../components/searchBar';
import { PackageListContent } from '../components/packegeListContent';
import { PackageContextProvider } from '../contexts/packagesListContext';
import { RefreshButton } from '../components/refreshButton';
import { InstallButton } from '../components/installButton';
import { BackButton } from '../components/backButton';
import { InstallForm } from './installFrom';

export const PackageListComponent: React.FC = () => {
  const [view, setView] = useState<'list' | 'install'>('list');
  const [installStatus, setInstallStatus] = useState<{ success: boolean; message: string } | null>(null);
  console.log(installStatus);

  const handleStartInstall = () => {
    setView('install');
    setInstallStatus(null);
  };

  const handleBack = () => {
    setView('list');
    setInstallStatus(null);
  };

  const handleInstallSuccess = (packageName: string) => {
    setInstallStatus({ success: true, message: `Package "${packageName}" installed successfully!` });
  };

  const handleInstallError = (error: string) => {
    setInstallStatus({ success: false, message: error });
  };

  return (
    <PackageContextProvider>
      <div className="package-container">
        <h3 className="package-header">Installed Packages</h3>
        <div className="actions-container">
          {view === 'list' && <RefreshButton />}
          {view === 'list' && <InstallButton onStartInstall={handleStartInstall} />}
          {view === 'install' && <BackButton onBack={handleBack} />}
        </div>
        {view === 'list' ? (
          <div>
            <SearchBar />
          <PackageListContent />
          </div>
        ) : (
          <InstallForm
            onBack={handleBack}
            onInstallSuccess={handleInstallSuccess}
            onInstallError={handleInstallError}
          />
        )}
      </div>
    </PackageContextProvider>
  );
};
