import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NovelView from './NovelView';

/**
 * Router for the Novel site view
 * This router is shown when on a novel site, but not on a chapter or TOC page
 */
const NovelRouter: React.FC = () => {
    return (
        <Routes>
            <Route path="*" element={<NovelView />} />
        </Routes>
    );
};

export default NovelRouter;
