import React, { useState } from 'react';
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
        <div className="search-box">
            <form className="search-box__form" onSubmit={handleSubmit}>
                <input
                    value={searchLine}
                    type="text"
                    className="search-box__input"
                    placeholder="Search for movies..."
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    className="search-box__submit"
                    disabled={!searchLine.trim()}
                >
                    Search
                </button>
            </form>
        </div>
    );
};

export default SearchBox;
