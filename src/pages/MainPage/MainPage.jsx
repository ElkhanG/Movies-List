// src/pages/MainPage/MainPage.jsx
import React, { useState, useEffect } from 'react';
import './MainPage.css';
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import Movies from '../../components/Movies/Movies';
import Favorites from '../../components/Favorites/Favorites';

const MainPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [defaultMovies, setDefaultMovies] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [savedListId, setSavedListId] = useState(null);
    const [listTitle, setListTitle] = useState('My Movie List');

    const isLocked = Boolean(savedListId);

    const defaultImdbIDs = ['tt4158110', 'tt0903747', 'tt0773262', 'tt3896198', 'tt0137523', 'tt0816692', 'tt0088763'];

    useEffect(() => {
        const fetchDefaultMovies = async () => {
            try {
                const fetchPromises = defaultImdbIDs.map(id =>
                    fetch(`https://www.omdbapi.com/?i=${id}&apikey=7cddddcd`)
                        .then(response => response.json())
                );
                const moviesData = await Promise.all(fetchPromises);
                const validMovies = moviesData.filter(movie => movie.Response === "True");
                setDefaultMovies(validMovies);
            } catch (error) {
                console.error('Error fetching default movies:', error);
                alert('Failed to load default movies.');
            }
        };

        fetchDefaultMovies();
    }, []);

    const handleSearch = async (query) => {
        const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=7cddddcd`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.Response === "True") {
                setSearchResults(data.Search);
            } else {
                setSearchResults([]);
                alert(data.Error);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            alert('An error occurred while searching for movies.');
        }
    };

    const handleAddToFavorites = (movie) => {
        if (isLocked) {
            alert('Cannot add movies to a saved list.');
            return;
        }
        if (favorites.find((fav) => fav.imdbID === movie.imdbID)) {
            alert(`${movie.Title} is already in your favorites!`);
            return;
        }
        setFavorites([...favorites, movie]);
    };

    const handleRemoveFavorite = (imdbID) => {
        if (isLocked) {
            alert('Cannot remove movies from a saved list.');
            return;
        }
        const updatedFavorites = favorites.filter((movie) => movie.imdbID !== imdbID);
        setFavorites(updatedFavorites);
    };

    const handleSaveList = async () => {
        if (favorites.length === 0) {
            alert('Your favorites list is empty!');
            return;
        }

        setIsSaving(true);

        const apiUrl = 'https://acb-api.algoritmika.org/api/movies/list';
        const payload = {
            title: listTitle,
            movies: favorites.map(movie => movie.imdbID)
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (response.ok) {
                setSavedListId(data.id);
            } else {
                alert('Failed to save the list.');
            }
        } catch (error) {
            console.error('Error saving list:', error);
            alert('An error occurred while saving your list.');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="main-page">
            <Header />
            <main className="main-page__content">
                <section className="main-page__main-section">
                    <div className="main-page__search-box">
                        <SearchBox onSearch={handleSearch} />
                    </div>
                    <div className="main-page__movies">
                        {searchResults.length > 0 ? (
                            <Movies movies={searchResults} onAdd={handleAddToFavorites} isLocked={isLocked} />
                        ) : (
                            <Movies movies={defaultMovies} onAdd={handleAddToFavorites} isLocked={isLocked} />
                        )}
                    </div>
                </section>
                <aside className="main-page__favorites">
                    <Favorites 
                        movies={favorites} 
                        onRemove={handleRemoveFavorite} 
                        onSave={handleSaveList}
                        isSaving={isSaving}
                        savedListId={savedListId}
                        listTitle={listTitle}
                        setListTitle={setListTitle}
                        isLocked={isLocked}
                    />
                </aside>
            </main>
        </div>
    );
};

export default MainPage;
