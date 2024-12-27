import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import ListPage from './pages/ListPage/ListPage';
import Footer from './components/Footer/Footer';
import SignInPage from './pages/SignIn/SignIn';
import AboutPage from './pages/AboutPage/AboutPage';
import './reset.css';
import './common.css';
import RecommendationsPage from './pages/RecommendationPage/RecommendationsPage';

const App = () => (
    <div className="app">
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/list/:id" element={<ListPage />} />
            {/* Fallback Route */}
            <Route path="/signin" element={<SignInPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/recommendation' element={<RecommendationsPage />} />
            <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
        <Footer />
    </div>
);

export default App;
