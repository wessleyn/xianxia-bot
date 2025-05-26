import { ThemeProvider } from 'next-themes';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import Bookmarks from './(dash)/bookmarks';
import Current from './(dash)/current';
import Downloads from './(dash)/downloads';
import Login from './(dash)/login';
import Stats from './(dash)/stats';
import ChapterView from './(novel)/chapter';
import NovelView from './(novel)/novel';
import ToCView from './(novel)/toc';
import Layout from './components/Layout';
import './globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Stats />} />
zz
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
);
