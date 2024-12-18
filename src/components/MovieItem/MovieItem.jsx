import React from 'react';
import './MovieItem.css';

const MovieItem = ({ title, year, poster, onAdd }) => (
    <article className="movie-item">
        <img 
            className="movie-item__poster" 
            src={poster !== "N/A" ? poster : "https://via.placeholder.com/120x180?text=No+Image"} 
            alt={title} 
        />
        <div className="movie-item__info">
            <h3 className="movie-item__title">{title} ({year})</h3>
            <button type="button" className="movie-item__add-button" onClick={onAdd}>
                Add to List
            </button>
        </div>
    </article>
);

export default MovieItem;
