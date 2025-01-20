import React from 'react';
import { usePackageContext } from '../contexts/packagesListContext';
import { PackageList } from '../components/packageList';

export const PackageListContent: React.FC = () => {
  const { loading, error } = usePackageContext();

  return (
    <div className="package-list-container">
      {loading && (
        <div className="spinner-container">
            <div className="spinner big-spinner" role="status" aria-label="Loading"></div>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && <PackageList />}
    </div>
  );
};

