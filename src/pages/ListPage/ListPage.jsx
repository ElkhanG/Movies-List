import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ListPage.css';
import Header from '../../components/Header/Header';

const ListPage = () => {
  const { id } = useParams();
  const [list, setList] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [personalityResult, setPersonalityResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

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
      const apiKey = '7cddddcd'; 
      try {
        const fetchPromises = imdbIDs.map((id) =>
          fetch(`https://www.omdbapi.com/?i=${id}&apikey=${apiKey}`).then((response) => response.json())
        );
        const moviesData = await Promise.all(fetchPromises);
        const validMovies = moviesData.filter((movie) => movie.Response === 'True');
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

  const handlePersonalityQuiz = async () => {
    const movieTitles = movies.map((movie) => movie.Title).join(', ');

    const prompt = `
      Based on the following favorite movies: ${movieTitles}, describe the personality of the person who selected them. 
      Provide insights into their character traits, preferences, and interests.
    `;

    setIsProcessing(true);

    try {
      const openAiApiKey = 'sk-5hufRBBaemfO7ssEoTePVV6DLIqUCBkc7jV_5-RQdzT3BlbkFJy6ZMoIg5xohA_buHc7OjJ2U9Bk9w9HmAa1S__vFQQA';

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiApiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 300,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API Error:', errorData);
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const result = data.choices[0]?.message?.content.trim();
      setPersonalityResult(result);
    } catch (error) {
      console.error('Error fetching personality insights:', error.message);
      setPersonalityResult('Something went wrong while generating the personality quiz result. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!list) {
    return <p>List not found.</p>;
  }

  return (
    <>
      <Header pageName="ListPage" />

      <div className="list-page">
        <h1 className="list-page__title">{list.title}</h1>

        <ul className="list-page__movies">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <li key={movie.imdbID} className="list-page__movie-item">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/120x180?text=No+Image'}
                  alt={movie.Title}
                  className="list-page__movie-poster"
                />
                <div className="list-page__movie-info">
                  <h3>
                    {movie.Title} ({movie.Year})
                  </h3>
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

        <div className="list-page__actions">
          <Link to="/" className="btn">
            Back to Main Page
          </Link>
          <button className="btn btn--quiz" onClick={handlePersonalityQuiz} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Take Personality Quiz'}
          </button>
        </div>

        {personalityResult && (
          <div className="personality-result">
            <h2>Personality Insights</h2>
            <p>{personalityResult}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default ListPage;
