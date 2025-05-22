import React from 'react';
import ReactDOM from 'react-dom/client';
import { MemoryRouter as Router } from 'react-router-dom';
import { ViewProvider } from './context/ViewContext';
import ViewRouter from './views';

import { ThemeProvider } from 'next-themes';
import './globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ViewProvider>
        <Router>
          <ViewRouter />
        </Router>
      </ViewProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
