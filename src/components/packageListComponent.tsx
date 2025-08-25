// src/components/PackageListComponent.tsx
import React from 'react';
import { SearchBar } from '../components/searchBar';
import { PackageListContent } from '../components/packageListContent';
import { RefreshButton } from '../components/refreshButton';
import { InstallButton } from '../components/installButton';
import { t } from '../translator';

interface IPackageListComponentProps {}

export const PackageListComponent: React.FC<
  IPackageListComponentProps
> = () => {
  return (
    <div className="mljar-packages-manager-container">
      <div className="mljar-packages-manager-header-container">
        <h3 className="mljar-packages-manager-header">
          {t('Package Manager')}
        </h3>
        <RefreshButton />
        <InstallButton onStartInstall={() => {}} />
      </div>
      <div>
        <SearchBar />
        <PackageListContent />
      </div>
    </div>
  );
};
