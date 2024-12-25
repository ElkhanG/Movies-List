import React from 'react';
import './FeatureSection.css';
import FlipCard from './Flipcard';
const FeaturesSection = () => {
  return (
    <section className="features-section">
      <h2 className="features-title">More Reasons to Join</h2>
      <div className="features-container">
        <FlipCard
          frontTitle="Create Favorites"
          backContent="Save your top movies in personalized favorite lists."
          frontIcon="❤️"
        />
        <FlipCard
          frontTitle="AI Recommendations"
          backContent="Get tailored movie suggestions with our AI-powered engine."
          frontIcon="🤖"
        />
        <FlipCard
          frontTitle="Personality Insights"
          backContent="Learn about your personality through your movie choices."
          frontIcon="🧠"
        />
        <FlipCard
          frontTitle="Discover Movies"
          backContent="Browse and find trending movies to expand your watchlist."
          frontIcon="🎥"
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
