import React from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';

const Movies = ({ movies, onAdd }) => {
    return ( 
        <div className="movies">
            {movies.length > 0 ? (
                movies.map((movie) => (
                    <MovieItem 
                        key={movie.imdbID} 
                        title={movie.Title} 
                        year={movie.Year} 
                        poster={movie.Poster} 
                        onAdd={() => onAdd(movie)} 
                    />
                ))
            ) : (
                <p>No movies found. Try a different search.</p>
            )}
        </div>
    );
};

export default Movies;
