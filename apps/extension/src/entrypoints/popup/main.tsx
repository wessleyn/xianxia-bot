import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Bookmarks from './pages/bookmarks';
import Current from './pages/current';
import Downloads from './pages/downloads';
import Stats from './pages/stats';

import './globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Stats />} />
          <Route path="/current" element={<Current />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/downloads" element={<Downloads />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>,
);
