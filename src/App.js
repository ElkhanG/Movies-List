import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import ListPage from './pages/ListPage/ListPage';

import './reset.css';
import './common.css';

const App = () => (
    <div className="app">
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/list/:id" element={<ListPage />} />
            {/* Fallback Route */}
            <Route path="*" element={<p>Page Not Found</p>} />
        </Routes>
    </div>
);

export default App;
