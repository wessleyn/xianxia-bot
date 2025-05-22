import React from 'react';
import { useViewContext } from '../context/ViewContext';
import { ViewType } from '../utils/pageDetection';
import ChapterRouter from './chapter/ChapterRouter';
import NormalRouter from './normal/NormalRouter';
import NovelRouter from './novel/NovelRouter';
import ToCRouter from './toc/ToCRouter';

/**
 * ViewRouter selects the appropriate router based on the current view type
 * It serves as the top-level router for the application
 */
const ViewRouter: React.FC = () => {
    const { viewType, tabInfo } = useViewContext();

    // Log the current view type for debugging
    console.log('ViewRouter: Current view type:', viewType);
    console.log('ViewRouter: Tab info:', tabInfo);

    switch (viewType) {
        case ViewType.CHAPTER:
            return <ChapterRouter />;
        case ViewType.TOC:
            return <ToCRouter />;
        case ViewType.NOVEL:
            return <NovelRouter />;
        case ViewType.NORMAL:
            return <NormalRouter />;
        default:
            return <NormalRouter />;
    }
};

export default ViewRouter;
