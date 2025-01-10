import React from 'react';
import { usePackageContext } from '../contexts/packagesListContext';
import { PackageList } from '../components/packageList';

export const PackageListContent: React.FC = () => {
  const { loading, error } = usePackageContext();

  return (
    <div className="package-list-container">
      {loading && <p>Loading packages...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <PackageList />}
    </div>
  );
};

