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
    return <p>Any packages found or notebook is closed. Try refresh page or change kernel.</p>;
  }


  return (
    <ul className='mljar-packages-manager-package-list'>
        <li className='mljar-packages-manager-package-header-list'>
          <span className='mljar-packages-manager-package-header-name'>Name</span>
          <span className='mljar-packages-manager-package-header-version'>Version</span>
          <span className='mljar-packages-manager-package-header-blank'>&nbsp;</span>
        </li>
      {filteredPackages
        .sort((a,b) => a.name.localeCompare(b.name))
        .map(pkg => (
        <PackageItem key={pkg.name} pkg={pkg} />
      ))}
    </ul>
  );
};
