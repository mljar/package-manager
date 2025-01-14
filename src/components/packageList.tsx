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
    return <p>Any packages found or notebook is closed.</p>;
  }

  console.log(filteredPackages);
  console.log(searchTerm);

  return (
    <ul className='package-list'>
      {filteredPackages
        .sort((a,b) => a.name.localeCompare(b.name))
        .map(pkg => (
        <PackageItem key={pkg.name} pkg={pkg} />
      ))}
    </ul>
  );
};

