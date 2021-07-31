import React from 'react';
import './style.css';

const SearchBar = ({ handleInputSearch, handleSearch }) => (
  <form onSubmit={handleSearch}>
    <input
      className="search-input"
      placeholder="What track are you looking for?"
      onChange={handleInputSearch}
    />
    <button className="search-button" type="submit">
      Search
    </button>
  </form>
);

export default SearchBar;
