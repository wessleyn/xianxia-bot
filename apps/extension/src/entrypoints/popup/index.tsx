import { ThemeProvider } from 'next-themes';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, MemoryRouter as Router, Routes } from 'react-router-dom';
import Bookmarks from './(dash)/bookmarks';
import Current from './(dash)/current';
import Downloads from './(dash)/downloads';
import Login from './(dash)/login';
import NovelView from './(dash)/novel';
import ChapterView from './(novel)/chapter';
import Stats from './(novel)/stats';
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
            <Route path="login" element={<Login />} />
            <Route path="current" element={<Current />} />
            <Route path="bookmarks" element={<Bookmarks />} />
            <Route path="downloads" element={<Downloads />} />
            <Route path="toc" element={<ToCView />} />
            <Route path="novel" element={<NovelView />} />
            <Route path="chapter" element={<ChapterView />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
);
