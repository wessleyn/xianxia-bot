import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ToCView from './ToCView';

/**
 * Router for the Table of Contents view
 * This router is shown when on a novel's table of contents page
 */
const ToCRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="*" element={<ToCView />} />
        </Routes>
    );
};

export default ToCRouter;
