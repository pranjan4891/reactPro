// SearchBar.tsx
import React, { FC } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  placeholder?: string;
  onSearchChange?: (value: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ placeholder = 'Search for...', onSearchChange }) => (
  <div className="relative mr-2">
    <label htmlFor="Search" className="sr-only">Search</label>
    <input
      type="text"
      id="Search"
      placeholder={placeholder}
      onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
      className="search-input"
    />
    <button type="button" className="search-button">
      <SearchIcon />
    </button>
  </div>
);

const SearchIcon: FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);

export default SearchBar;
