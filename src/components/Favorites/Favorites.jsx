import React from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';

const Favorites = ({
    movies,
    onRemove,
    onSave,
    isSaving,
    savedListId,
    listTitle,
    setListTitle,
    isLocked
}) => (
    <div className="favorites">
        <input 
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
            className="favorites__name" 
            placeholder="List Title"
            disabled={isLocked} 
        />
        
        <ul className="favorites__list">
            {movies.map((movie) => (
                <li key={movie.imdbID} className="favorites__item">
                    <span>{movie.Title} ({movie.Year})</span>
                    {!isLocked && (
                        <button 
                            type="button" 
                            className="favorites__remove-button" 
                            onClick={() => onRemove(movie.imdbID)}
                        >
                            Remove
                        </button>
                    )}
                </li>
            ))}
        </ul>
        
        {savedListId ? (
            <Link to={`/list/${savedListId}`} className="favorites__link btn">
                View Saved List
            </Link>
        ) : (
            <button 
                type="button" 
                className="favorites__save-button btn" 
                onClick={onSave}
                disabled={isSaving || movies.length === 0 || listTitle.trim() === ''}
            >
                {isSaving ? 'Saving...' : 'Save List'}
            </button>
        )}
    </div>
);

export default Favorites;
