// src/components/PackageListComponent.tsx
import React from 'react';
import { SearchBar } from './searchBar';
import { PackageList } from './packageList';
import { PackageContextProvider } from '../contexts/packagesListContext';

export const PackageListComponent: React.FC = () => {
  return (
    <PackageContextProvider>
      <div className="package-container">
        <h3 className="package-header">Installed packagessss</h3>
        <SearchBar />
        <div
          className="package-list-container"
        >
          <PackageList />
        </div>
      </div>
    </PackageContextProvider>
  );
};

