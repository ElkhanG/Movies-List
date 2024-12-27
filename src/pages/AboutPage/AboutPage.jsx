import React from 'react';
import Header from '../../components/Header/Header'; 
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <Header />
      <div className="about-hero">
        <h1>About Us</h1>
        <p>
          Your ultimate destination for discovering, curating, and learning more about your favorite movies. Experience
          a unique blend of personalization and insights powered by AI.
        </p>
      </div>

      <main className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            At <strong>Netelix</strong>, we strive to make movie discovery fun and meaningful. Whether you're creating
            a list of your favorite films, uncovering personalized recommendations, or exploring how your preferences
            reflect your personality, we aim to provide a seamless experience for every movie lover.
          </p>
        </section>

        <section className="about-section">
          <h2>What We Offer</h2>
          <div className="offer-grid">
            <div className="offer-card">
              <h3>Favorite Lists</h3>
              <p>Organize and share your top movies with just a few clicks.</p>
            </div>
            <div className="offer-card">
              <h3>AI-Powered Recommendations</h3>
              <p>Receive tailored movie suggestions based on your unique taste.</p>
            </div>
            <div className="offer-card">
              <h3>Personality Insights</h3>
              <p>Discover what your favorite movies say about your personality.</p>
            </div>
            <div className="offer-card">
              <h3>Community Interaction</h3>
              <p>Connect with like-minded movie enthusiasts and share experiences.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Where We Are Located</h2>
          <p>
            Visit us at:
            <br />
            <strong>Netelix Headquarters</strong>
            <br />
            123 Movie Street, Cinematic City, Filmstate, 56789
          </p>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3039.34513217917!2d49.8538674112017!3d40.3790427713265!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40307dd42d26ad8d%3A0x2aa807745685f89!2sAdnsu!5e0!3m2!1saz!2saz!4v1735151398254!5m2!1saz!2saz"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </section>

        <section className="about-section">
          <h2>Stay Updated</h2>
          <p>Subscribe to our newsletter for the latest updates, features, and recommendations!</p>
          <form className="subscription-form">
            <input
              type="email"
              className="subscription-input"
              placeholder="Enter your email address"
              required
            />
            <button type="submit" className="btn btn--subscribe">
              Subscribe
            </button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
