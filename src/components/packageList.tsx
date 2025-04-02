// src/components/PackageList.tsx
import React from 'react';
import { usePackageContext } from '../contexts/packagesListContext';
import { PackageItem } from './packageItem';

export const PackageList: React.FC = () => {
  const { packages, searchTerm } = usePackageContext();

  const filteredPackages = packages.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredPackages.length === 0) {
    return <p>Sorry, no packages found or notebook is closed.</p>;
  }

  return (
    <ul className="mljar-packages-manager-list">
      <li className="mljar-packages-manager-list-header">
        <span className="mljar-packages-manager-header-name">Name</span>
        <span className="mljar-packages-manager-header-version">Version</span>
        <span className="mljar-packages-manager-header-blank">&nbsp;</span>
      </li>
      {filteredPackages
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(pkg => (
          <PackageItem key={pkg.name} pkg={pkg} />
        ))}
    </ul>
  );
};
