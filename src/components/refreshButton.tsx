import { usePackageContext } from '../contexts/packagesListContext';
import { refreshIcon } from '../icons/refreshIcon';
import React from 'react';
import { t } from '../translator';

export const RefreshButton: React.FC = () => {
  const { refreshPackages, loading } = usePackageContext();

  return (
    <button
      className="mljar-packages-manager-refresh-button"
      onClick={refreshPackages}
      disabled={loading}
      title={t('Refresh Packages')}
    >
      <refreshIcon.react className="mljar-packages-manager-refresh-icon" />
      {/* {loading ? 'Loading...' : 'Refresh'} */}
    </button>
  );
};
