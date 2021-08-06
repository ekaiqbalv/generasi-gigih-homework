import React from 'react';
import { Input } from 'antd';
import './style.css';

const SearchBar = ({ handleSearch }) => (
  <div className="search-bar">
    <Input.Search
      placeholder="What track are you looking for?"
      size="large"
      allowClear
      enterButton
      onSearch={(searchQuery) => handleSearch(searchQuery)}
    />
  </div>
);

export default SearchBar;
