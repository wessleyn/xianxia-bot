import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ChapterView from './ChapterView';

/**
 * Router for the Chapter view
 * This router is shown when on a novel chapter page
 */
const ChapterRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="*" element={<ChapterView />} />
        </Routes>
    );
};

export default ChapterRouter;
