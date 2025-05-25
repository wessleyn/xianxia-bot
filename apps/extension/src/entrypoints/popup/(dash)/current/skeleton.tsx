import React from 'react';
import { BrowseLibraryButtonSkeleton } from './components/BrowseLibrary/skeleton';
import { HeaderSkeleton } from './components/CurrentHeader/skeleton';
import { ReadingCardSkeleton } from './components/ReadingCard/skeleton';

const CurrentSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col h-full justify-between gap-4">
            <HeaderSkeleton />

            {Array.from({ length: 3 }).map((_, index) => (
                <ReadingCardSkeleton key={`reading-skeleton-${index}`} />
            ))}

            <BrowseLibraryButtonSkeleton />
        </div>
    );
};

export default CurrentSkeleton
