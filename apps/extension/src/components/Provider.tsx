import { ThemeProvider } from 'next-themes';
import React from 'react';
import { MemoryRouter as Router, Routes } from 'react-router-dom';

const Provider = ({children}: {children: React.ReactNode}) => {
    return (
        <React.StrictMode>
            <ThemeProvider>
                <Router>
                    <Routes>
                        {children}
                    </Routes>
                </Router>
            </ThemeProvider>
        </React.StrictMode>
    )
}
        export default Provider