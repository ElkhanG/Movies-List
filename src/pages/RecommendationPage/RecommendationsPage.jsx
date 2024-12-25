import React, { useState } from 'react';
import './RecommendationsPage.css';

const RecommendationsPage = () => {
  const [quizAnswers, setQuizAnswers] = useState({});
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);

  const questions = [
    {
      id: 'genre',
      question: 'What is your favorite genre?',
      options: ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi'],
    },
    {
      id: 'mood',
      question: 'What is your current mood?',
      options: ['Relaxed', 'Excited', 'Emotional', 'Adventurous', 'Curious'],
    },
    {
      id: 'era',
      question: 'Which movie era do you prefer?',
      options: ['Classic (Pre-2000)', 'Modern (2000-Present)'],
    },
    {
      id: 'language',
      question: 'What is your preferred movie language?',
      options: ['English', 'Spanish', 'French', 'Korean', 'Other'],
    },
    {
      id: 'runtime',
      question: 'What runtime do you prefer?',
      options: ['Short (<90 mins)', 'Average (90-120 mins)', 'Long (>120 mins)'],
    },
  ];

  const handleOptionClick = (questionId, option) => {
    setQuizAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const generatePrompt = () => {
    return `
      Based on these preferences, recommend a movie:
      - Genre: ${quizAnswers.genre || 'Not specified'}
      - Mood: ${quizAnswers.mood || 'Not specified'}
      - Movie Era: ${quizAnswers.era || 'Not specified'}
      - Language: ${quizAnswers.language || 'Not specified'}
      - Runtime: ${quizAnswers.runtime || 'Not specified'}
    `;
  };

  const handleGetRecommendation = async () => {
    setLoading(true);
    const prompt = generatePrompt();

    try {
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, // Use environment variable for the API key
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt,
          max_tokens: 100,
        }),
      });

      const data = await response.json();
      setRecommendation(data.choices[0].text.trim());
    } catch (error) {
      console.error('Error fetching recommendation:', error);
      setRecommendation('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recommendations-page">
      <h1>Movie Recommendations</h1>
      <p>Answer the quiz below to get a personalized movie recommendation!</p>

      <div className="quiz-container">
        {questions.map((question) => (
          <div key={question.id} className="quiz-question">
            <h2>{question.question}</h2>
            <div className="quiz-options">
              {question.options.map((option) => (
                <button
                  key={option}
                  className={`quiz-option ${
                    quizAnswers[question.id] === option ? 'selected' : ''
                  }`}
                  onClick={() => handleOptionClick(question.id, option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        className="btn btn--recommend"
        onClick={handleGetRecommendation}
        disabled={Object.keys(quizAnswers).length !== questions.length || loading}
      >
        {loading ? 'Fetching Recommendation...' : 'Get Recommendation'}
      </button>

      {recommendation && (
        <div className="recommendation-result">
          <h2>Your Movie Recommendation</h2>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default RecommendationsPage;
