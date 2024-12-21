import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md'; // Modern Material Design icon
import './SearchBox.css';

const SearchBox = ({ onSearch }) => {
  const [searchLine, setSearchLine] = useState('');

  const handleChange = (e) => {
    setSearchLine(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchLine.trim()) {
      onSearch(searchLine.trim());
      setSearchLine('');
    }
  };

  return (
    <div className="main-page__search-box">
      <form className="main-page__search-box__form" onSubmit={handleSubmit}>
        <div className="main-page__search-box__input-wrapper">
          <MdSearch className="main-page__search-box__icon" />
          <input
            value={searchLine}
            type="text"
            className="main-page__search-box__input"
            placeholder="Search for movies..."
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="main-page__search-box__submit"
          disabled={!searchLine.trim()}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
