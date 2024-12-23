import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ onScrollToFAQ }) => {
  const [language, setLanguage] = useState("English");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 50) {
        setIsVisible(false); // Hide navbar when scrolling down
      } else {
        setIsVisible(true); // Show navbar when scrolling up
      }

      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  return (
    <header className={`header ${isVisible ? "visible" : "hidden"}`}>
      <nav className="navbar">
        {/* Logo */}
        <div className="navbar__logo">
          <a href="/" className="header__title">NETELIX</a>
        </div>

        {/* Menu Items */}
        <ul className="navbar__menu">
          <li><a href="/about">About</a></li>
          <li>
            <li className="navbar-link" onClick={onScrollToFAQ}>
              FAQ
            </li>
          </li>
          <li><a href="/contact">Contact</a></li>
        </ul>

        {/* Controls */}
        <div className="navbar__controls">
          <div className="navbar__language">
            <select
              className="language-selector"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="English">English</option>
              <option value="Azerbaijani">Azerbaijani</option>
            </select>
          </div>
          <button className="btn btn--signin">Sign In</button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
