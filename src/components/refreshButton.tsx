import { usePackageContext } from '../contexts/packagesListContext';
import { refreshIcon } from '../icons/refreshIcon';
import React from 'react';



export const RefreshButton: React.FC = () => {
  const { refreshPackages, loading } = usePackageContext();

  return (
    <button
      className="mljar-refresh-button"
      onClick={refreshPackages}
      disabled={loading}
      title="Refresh Packages"
    >
      <refreshIcon.react className="mljar-refresh-icon" />
      {loading ? 'Loading...' : 'Refresh'}
    </button>
  );
};

