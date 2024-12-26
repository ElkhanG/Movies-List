import React, { useState } from 'react';
import './RecommendationsPage.css';
import Header from '../../components/Header/Header';

const RecommendationsPage = () => {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const questions = [
    { id: 'genre', question: 'What is your favorite genre?', options: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'] },
    { id: 'mood', question: 'What is your current mood?', options: ['Relaxed', 'Excited', 'Emotional', 'Adventurous', 'Curious'] },
    { id: 'era', question: 'Which movie era do you prefer?', options: ['Classic (Pre-2000)', 'Modern (2000-Present)'] },
    { id: 'language', question: 'What is your preferred movie language?', options: ['English', 'Spanish', 'French', 'Korean', 'Other'] },
    { id: 'runtime', question: 'What runtime do you prefer?', options: ['Short (<90 mins)', 'Average (90-120 mins)', 'Long (>120 mins)'] },
    { id: 'theme', question: 'What type of theme do you prefer?', options: ['Romantic', 'Thriller', 'Superhero', 'Fantasy', 'Mystery'] },
    { id: 'intensity', question: 'How intense should the movie be?', options: ['Lighthearted', 'Moderate', 'High'] },
    { id: 'character', question: 'Do you prefer movies with a strong central character?', options: ['Yes', 'No', 'Doesn’t matter'] },
  ];

  const handleOptionClick = (questionId, option) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const generatePrompt = () => `
    Recommend three movies based on these preferences:
    - Genre: ${quizAnswers.genre || 'Not specified'}
    - Mood: ${quizAnswers.mood || 'Not specified'}
    - Movie Era: ${quizAnswers.era || 'Not specified'}
    - Language: ${quizAnswers.language || 'Not specified'}
    - Runtime: ${quizAnswers.runtime || 'Not specified'}
    - Theme: ${quizAnswers.theme || 'Not specified'}
    - Intensity: ${quizAnswers.intensity || 'Not specified'}
    - Strong Central Character: ${quizAnswers.character || 'Not specified'}

    Only return movie titles separated by commas. Do not include extra descriptions or details.
  `;

  const fetchMovieDetails = async (movieTitle) => {
    const omdbApiKey = '7cddddcd'; 
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieTitle)}&apikey=${omdbApiKey}`;
    console.log('Fetching OMDB details with URL:', url);

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.Response === 'True') {
        return {
          title: data.Title || 'No title available',
          description: data.Plot || 'No description available',
          image: data.Poster !== 'N/A' ? data.Poster : url("../images/noimage.png"),
          imdbLink: `https://www.imdb.com/title/${data.imdbID}`,
        };
      } else {
        console.error('OMDB API Error:', data.Error);
        return { title: movieTitle, description: 'No additional details found.', image: url("../images/noimage.png"), imdbLink: '' };
      }
    } catch (error) {
      console.error('Error fetching movie details:', error.message);
      return null;
    }
  };

  const handleGetRecommendation = async () => {
    setLoading(true);
    const openAiApiKey = 'sk-5hufRBBaemfO7ssEoTePVV6DLIqUCBkc7jV_5-RQdzT3BlbkFJy6ZMoIg5xohA_buHc7OjJ2U9Bk9w9HmAa1S__vFQQA'; // Replace with your actual OpenAI API key

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiApiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: generatePrompt() }],
          max_tokens: 300,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('OpenAI API Error:', errorData);
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      const fullResponse = data.choices[0]?.message.content.trim();
      console.log('OpenAI Response:', fullResponse);

      // Parse movie titles from the response
      const movieTitles = fullResponse.split(',').map((title) => title.trim()).slice(0, 3);
      const movieDetailsPromises = movieTitles.map((title) => fetchMovieDetails(title));

      // Fetch movie details from OMDB
      const fetchedMovies = await Promise.all(movieDetailsPromises);
      setRecommendations(fetchedMovies.filter((movie) => movie !== null));
    } catch (error) {
      console.error('Error fetching recommendation:', error.message);
      setRecommendations([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recommendations-page">
      <Header />
      <h1>Movie Recommendations</h1>
      <p>Answer the quiz below to get personalized movie recommendations!</p>
      <div className="quiz-container">
        {questions.map((q) => (
          <div key={q.id} className="quiz-question">
            <h2>{q.question}</h2>
            <div className="quiz-options">
              {q.options.map((option) => (
                <button
                  key={option}
                  className={`quiz-option ${quizAnswers[q.id] === option ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(q.id, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="btn btn--recommend" onClick={handleGetRecommendation} disabled={Object.keys(quizAnswers).length !== questions.length || loading}>
        {loading ? 'Fetching Recommendations...' : 'Get Recommendations'}
      </button>
      <div className="recommendation-result">
        <h2>Your Movie Recommendations</h2>
        {recommendations.length > 0 ? (
          recommendations.map((movie, index) => (
            <div key={index} className="movie-details">
              <img src={movie.image} alt={movie.title} className="movie-poster" />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
                {movie.imdbLink && (
                  <a href={movie.imdbLink} target="_blank" rel="noopener noreferrer" className="imdb-link">
                    View on IMDb
                  </a>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No recommendations available. Try again later.</p>
        )}
      </div>
    </div>
  );
};

export default RecommendationsPage;
