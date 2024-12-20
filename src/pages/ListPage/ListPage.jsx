import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ListPage.css';


const ListPage = () => {
    const { id } = useParams();
    const [list, setList] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchList = async () => {
            const apiUrl = `https://acb-api.algoritmika.org/api/movies/list/${id}`;
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                if (response.ok) {
                    setList(data);
                    if (data.movies && data.movies.length > 0) {
                        fetchMoviesDetails(data.movies);
                    } else {
                        setMovies([]);
                    }
                } else {
                    alert('Failed to fetch the list.');
                }
            } catch (error) {
                console.error('Error fetching list:', error);
                alert('An error occurred while fetching the list.');
            } finally {
                setLoading(false);
            }
        };

        const fetchMoviesDetails = async (imdbIDs) => {
            const apiKey = process.env.REACT_APP_OMDB_API_KEY;
            console.log(apiKey)
            try {
                const fetchPromises = imdbIDs.map(id =>
                    fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`)
                        .then(response => response.json())
                );
                const moviesData = await Promise.all(fetchPromises);
                const validMovies = moviesData.filter(movie => movie.Response === "True");
                setMovies(validMovies);
            } catch (error) {
                console.error('Error fetching movie details:', error);
                alert('Failed to fetch movie details.');
            }
        };

        if (id) {
            fetchList();
        }
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!list) {
        return <p>List not found.</p>;
    }

    return (
        <div className="list-page">
            <h1 className="list-page__title">{list.title}</h1>
            <ul className="list-page__movies">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <li key={movie.imdbID} className="list-page__movie-item">
                            <img 
                                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/120x180?text=No+Image"} 
                                alt={movie.Title} 
                                className="list-page__movie-poster"
                            />
                            <div className="list-page__movie-info">
                                <h3>{movie.Title} ({movie.Year})</h3>
                                <a 
                                    href={`https://www.imdb.com/title/${movie.imdbID}/`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                >
                                    View on IMDB
                                </a>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No movies in this list.</p>
                )}
            </ul>
            <div className="list-page__return-button">
            <Link to="/" className="btn">
                Back to Main Page
            </Link>
        </div>
        </div>
    );
};

export default ListPage;
