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
    return <p>Nie znaleziono pakietów spełniających kryteria.</p>;
  }

  return (
    <ul className='package-list'>
      {filteredPackages.map(pkg => (
        <PackageItem key={pkg.name} pkg={pkg} />
      ))}
    </ul>
  );
};

