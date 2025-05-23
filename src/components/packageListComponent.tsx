// src/components/PackageListComponent.tsx
import React, { useState } from 'react';
import { SearchBar } from '../components/searchBar';
import { PackageListContent } from '../components/packageListContent';
import { RefreshButton } from '../components/refreshButton';
import { InstallButton } from '../components/installButton';
import { BackButton } from '../components/backButton';
import { InstallForm } from './installFrom';

interface IPackageListComponentProps {}

export const PackageListComponent: React.FC<
  IPackageListComponentProps
> = () => {
  const [view, setView] = useState<'list' | 'install'>('list');

  const handleStartInstall = () => {
    setView('install');
  };

  const handleBack = () => {
    setView('list');
  };

  return (
    <div className="mljar-packages-manager-container">
      <div className="mljar-packages-manager-header-container">
        {view === 'list' && (
          <h3 className="mljar-packages-manager-header">Packages Manager</h3>
        )}
        {view === 'install' && (
          <h3 className="mljar-packages-manager-header">Install Packages</h3>
        )}
        {view === 'list' && <RefreshButton />}
        {view === 'list' && (
          <InstallButton onStartInstall={handleStartInstall} />
        )}
        {view === 'install' && <BackButton onBack={handleBack} />}
      </div>
      {view === 'list' ? (
        <div>
          <SearchBar />
          <PackageListContent />
        </div>
      ) : (
        <InstallForm />
      )}
    </div>
  );
};
