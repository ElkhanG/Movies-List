import React from 'react';
import './FlipCard.css';

const FlipCard = ({ frontTitle, backContent, frontIcon }) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        {/* Front Side */}
        <div className="flip-card-front">
          <div className="card-icon">{frontIcon}</div>
          <h3 className="title">{frontTitle}</h3>
        </div>
        
        {/* Back Side */}
        <div className="flip-card-back">
          <p>{backContent}</p>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
