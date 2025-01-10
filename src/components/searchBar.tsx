// src/components/SearchBar.tsx
import React from 'react';
import { usePackageContext } from '../contexts/packagesListContext';

export const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm } = usePackageContext();

    console.log("Rendering SearchBar", { searchTerm, setSearchTerm });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="Wyszukaj pakiet..."
        className='search-bar-input'
      />
    </div>
  );
};

