// src/components/PackageItem.tsx
import React from 'react';

interface PackageInfo {
  name: string;
  version: string;
}

interface PackageItemProps {
  pkg: PackageInfo;
}

export const PackageItem: React.FC<PackageItemProps> = ({ pkg }) => {
  return (
    <li className='package-item' >
      <strong>{pkg.name}</strong> - {pkg.version}
    </li>
  );
};

