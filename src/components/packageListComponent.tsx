// src/components/PackageListComponent.tsx
import React, { useState } from 'react';
import { SearchBar } from '../components/searchBar';
import { PackageListContent } from '../components/packageListContent';
import { PackageContextProvider } from '../contexts/packagesListContext';
import { RefreshButton } from '../components/refreshButton';
import { InstallButton } from '../components/installButton';
import { BackButton } from '../components/backButton';
import { InstallForm } from './installFrom';

export const PackageListComponent: React.FC = () => {
  const [view, setView] = useState<'list' | 'install'>('list');

  const handleStartInstall = () => {
    setView('install');
  };

  const handleBack = () => {
    setView('list');
  };

  return (
    <PackageContextProvider>
      <div className="mljar-packages-manager-package-container">
        <div className="mljar-packages-manager-package-header-container">
          <h3 className="mljar-packages-manager-package-header">Packages Manager</h3>
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
          <InstallForm/>
        )}
      </div>
    </PackageContextProvider>
  );
};
