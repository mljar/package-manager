import React from 'react';
import { usePackageContext } from '../contexts/packagesListContext';
import { PackageList } from '../components/packageList';

export const PackageListContent: React.FC = () => {
  const { loading, error } = usePackageContext();

  return (
    <div className="mljar-packages-manager-list-container">
      {loading && (
        <div className="mljar-packages-manager-spinner-container">
          <div
            className="mljar-packages-manager-spinner"
            role="status"
            aria-label="Loading"
          ></div>
        </div>
      )}
      {error && <p className="mljar-packages-manager-error-message">{error}</p>}
      {!loading && !error && <PackageList />}
    </div>
  );
};
