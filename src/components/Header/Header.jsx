import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = ({ onScrollToFAQ }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [language, setLanguage] = useState("English");

  const toggleLanguageMenu = () => {
    setLanguageMenuOpen(!languageMenuOpen);
  };

  const selectLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setLanguageMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 50) {
        setIsVisible(false); 
      } else {
        setIsVisible(true);
      }
      setLastScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollPosition]);

  const shouldShowFAQ =
    window.location.hostname === 'localhost' &&
    window.location.port === '3000' &&
    (window.location.pathname === '/' || window.location.pathname === '');

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className={`header ${isVisible ? "visible" : "hidden"}`}>
      <nav className="navbar">
        <div className="navbar__logo">
          <a href="/" className="header__title">NETELIX</a>
        </div>

        <div className="navbar__toggle" onClick={handleToggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`navbar__menu ${isMenuOpen ? "navbar__menu--active" : ""}`}>
          <li><a href="/about">About</a></li>
          {shouldShowFAQ && (
            <li className="navbar-link" onClick={onScrollToFAQ}>
              FAQ
            </li>
          )}
          <li><a href="/recommendation">Recommendations</a></li>
        </ul>

        <div className="navbar__controls">
          <div className="navbar__language" onClick={toggleLanguageMenu}>
            <div className="language-selector">
              {language}
              <span className={`dropdown-icon ${languageMenuOpen ? "open" : ""}`}>▼</span>
            </div>
            <div
              className={`language-dropdown ${languageMenuOpen ? "language-dropdown--open" : ""}`}
            >
              <div className="language-item" onClick={() => selectLanguage("English")}>
                English
              </div>
              <div className="language-item" onClick={() => selectLanguage("Azerbaijani")}>
                Azerbaijani
              </div>
              <div className="language-item" onClick={() => selectLanguage("Spanish")}>
                Spanish
              </div>
            </div>
          </div>
          <a href="/signin">
            <button className="btn btn--signin">Sign In</button>
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
