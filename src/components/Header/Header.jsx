import React, { useState } from 'react';
import './Header.css';

const Header = () => {
    const [language, setLanguage] = useState("English");

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    return (
        <header className="header">
            <nav className="navbar">
                <div className="navbar__logo">
                    <h1 className="header__title">NETELIX</h1>
                </div>
                <ul className="navbar__menu">
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/faq">FAQ</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
                <div className="navbar__controls">
                    <select
                        className="language-selector"
                        value={language}
                        onChange={handleLanguageChange}
                    >
                        <option value="English">English</option>
                        <option value="Azerbaijani">Azerbaijani</option>
                    </select>
                    <button className="btn btn--signin">Sign In</button>
                    <button className="btn btn--signup">Get Started</button>
                </div>
            </nav>
        </header>
    );
};

export default Header;
