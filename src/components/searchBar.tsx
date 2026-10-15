import React from 'react';
import { usePackageContext } from '../contexts/packagesListContext';
import { t } from '../translator';

export const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = usePackageContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mljar-packages-manager-search-bar-container">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
        <path d="M21 21l-6 -6" />
      </svg>
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        aria-label={t('Search packages')}
        placeholder={t('Search package...')}
        className="mljar-packages-manager-search-bar-input"
      />
    </div>
  );
};
