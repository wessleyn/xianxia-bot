import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Bookmarks from './pages/bookmarks';
import Current from './pages/current';
import Downloads from './pages/downloads';
import Login from './pages/login';
import Stats from './pages/stats';

const NormalRouter: React.FC = () => {
    console.log('loading normal router');
    return (
        <Routes>
            {/* Login route is separate without tabs */}
            <Route path="/login" element={<Login />} />

            {/* Main layout with tabs */}
            <Route path="/" element={<Layout />}>
                <Route index element={<Stats />} />
                <Route path="current" element={<Current />} />
                <Route path="bookmarks" element={<Bookmarks />} />
                <Route path="downloads" element={<Downloads />} />
            </Route>
        </Routes>
    );
};

export default NormalRouter;
