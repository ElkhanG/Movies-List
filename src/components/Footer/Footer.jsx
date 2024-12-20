import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__content">
                <p className="footer__text">
                    &copy; {new Date().getFullYear()} Netelix - All Rights Reserved.
                </p>
                <ul className="footer__links">
                    <li><a href="/terms" className="footer__link">Terms of Service</a></li>
                    <li><a href="/privacy" className="footer__link">Privacy Policy</a></li>
                    <li><a href="/contact" className="footer__link">Contact Us</a></li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;
