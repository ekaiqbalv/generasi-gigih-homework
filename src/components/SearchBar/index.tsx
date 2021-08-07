import { Input } from 'antd';
import './style.css';

interface ISearchBarProps {
  handleSearch: Function;
}

const SearchBar = ({ handleSearch }: ISearchBarProps) => (
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
