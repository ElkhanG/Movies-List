import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <h2 className="footer__logo">Netelix</h2>
          <p className="footer__text">
            Your trusted platform for personalized movie recommendations.
          </p>
          <ul className="footer__links">
            <li><a href="/terms" className="footer__link">Terms of Service</a></li>
            <li><a href="/privacy" className="footer__link">Privacy Policy</a></li>
            <li><a href="/about" className="footer__link">About Us</a></li>
            <li><a href="/contact" className="footer__link">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} <span className="footer__brand">Netelix</span> - All Rights Reserved.
          </p>
          <ul className="footer__socials">
            <li><a href="https://facebook.com" className="footer__social-link" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" className="footer__social-link" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://instagram.com" className="footer__social-link" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
