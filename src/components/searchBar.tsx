// src/components/SearchBar.tsx
import React from 'react';
import { usePackageContext } from '../contexts/packagesListContext';
import { t } from '../translator';
// import { t } from '../translator';

export const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = usePackageContext();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="mljar-packages-manager-search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder={t('Search package...')}
        className='mljar-packages-manager-search-bar-input'
      />
    </div>
  );
};

