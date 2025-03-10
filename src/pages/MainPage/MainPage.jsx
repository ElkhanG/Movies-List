import React, { useState, useEffect, useRef } from 'react';
import './MainPage.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../components/Header/Header';
import SearchBox from '../../components/SearchBox/SearchBox';
import Movies from '../../components/Movies/Movies';
import Favorites from '../../components/Favorites/Favorites';
import FAQ from '../../components/FAQ/FAQ';
import FeaturesSection from '../../components/FlipCard/FeatureSection';

const MainPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [defaultMovies, setDefaultMovies] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [savedListId, setSavedListId] = useState(null);
  const [listTitle, setListTitle] = useState('My Movie List');

  const faqRef = useRef(null); 

  const isLocked = Boolean(savedListId);

  const defaultImdbIDs = [
    'tt4158110', 
    'tt0903747', 
    'tt0773262', 
    'tt3896198', 
    'tt0137523', 
    'tt0816692', 
    'tt0088763', 
    'tt0111161', 
    'tt32252772', 
  ];

  const scrollToFAQ = () => {
    faqRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchDefaultMovies = async () => {
      try {
        const fetchPromises = defaultImdbIDs.map((id) =>
          fetch(`https://www.omdbapi.com/?i=${id}&apikey=7cddddcd`).then((response) => response.json())
        );
        const moviesData = await Promise.all(fetchPromises);
        const validMovies = moviesData.filter((movie) => movie.Response === 'True');
        setDefaultMovies(validMovies);
      } catch (error) {
        console.error('Error fetching default movies:', error);
        toast.error('Failed to load default movies.');
      }
    };

    fetchDefaultMovies();
  }, []);

  const handleSearch = async (query) => {
    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=7cddddcd`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data.Response === 'True') {
        setSearchResults(data.Search);
        toast.success('Movies loaded successfully!');
      } else {
        setSearchResults([]);
        toast.warn(data.Error);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('An error occurred while searching for movies.');
    }
  };

  const handleAddToFavorites = (movie) => {
    if (isLocked) {
      toast.warn('Cannot add movies to a saved list.');
      return;
    }
    if (favorites.find((fav) => fav.imdbID === movie.imdbID)) {
      toast.info(`${movie.Title} is already in your favorites!`);
      return;
    }
    setFavorites([...favorites, movie]);
    toast.success(`${movie.Title} added to favorites!`);
  };

  const handleRemoveFavorite = (imdbID) => {
    if (isLocked) {
      toast.warn('Cannot remove movies from a saved list.');
      return;
    }
    const updatedFavorites = favorites.filter((movie) => movie.imdbID !== imdbID);
    setFavorites(updatedFavorites);
    toast.success('Movie removed from favorites!');
  };

  const handleSaveList = async () => {
    if (favorites.length === 0) {
      toast.warn('Your favorites list is empty!');
      return;
    }

    setIsSaving(true);

    const apiUrl = 'https://acb-api.algoritmika.org/api/movies/list';
    const payload = {
      title: listTitle,
      movies: favorites.map((movie) => movie.imdbID),
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setSavedListId(data.id);
        toast.success('Favorites list saved successfully!');
      } else {
        toast.error('Failed to save the list.');
      }
    } catch (error) {
      console.error('Error saving list:', error);
      toast.error('An error occurred while saving your list.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="main-page">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Header onScrollToFAQ={scrollToFAQ} />
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover Your Next Favorite Movie</h1>
          <p>Personalized recommendations, curated lists, and insights based on your movie choices.</p>
          <div className="hero-buttons">
            <button
              className="btn btn--recommendations"
              onClick={() => (window.location.href = '/recommendation')}
            >
              Get Movie Recommendations
            </button>
          </div>
        </div>
      </section>

      <main className="main-page__content">
  <div className="main-page__layout">
    <section className="main-page__main-section">
      <div className="main-page__search-box">
        <SearchBox onSearch={handleSearch} />
      </div>
      <div className="main-page__movies">
        {searchResults.length > 0 ? (
          <Movies movies={searchResults} onAdd={handleAddToFavorites} />
        ) : (
          <Movies movies={defaultMovies} onAdd={handleAddToFavorites} />
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
  </div>
  {/* FAQ Section */}
  <section className="faq-wrapper">
    <FAQ ref={faqRef} />
  </section>
  <FeaturesSection />
</main>
    </div>
  );
};

export default MainPage;
