import React from 'react';
import { usePackageContext } from '../contexts/packagesListContext';
import { PackageList } from '../components/packageList';

export const PackageListContent: React.FC = () => {
  const { loading, error } = usePackageContext();

  return (
    <div className="mljar-package-list-container">
      {loading && (
        <div className="mljar-spinner-container">
            <div className="mljar-spinner" role="status" aria-label="Loading"></div>
        </div>
      )}
      {error && <p className="mljar-error-message">{error}</p>}
      {!loading && !error && <PackageList />}
    </div>
  );
};

