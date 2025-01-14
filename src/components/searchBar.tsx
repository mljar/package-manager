// src/components/SearchBar.tsx
import React from 'react';
import { usePackageContext } from '../contexts/packagesListContext';

export const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = usePackageContext();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Search Package..."
        className='search-bar-input'
      />
    </div>
  );
};

