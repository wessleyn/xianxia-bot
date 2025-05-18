import React from 'react';
import BrowseLibraryButton from './components/BrowseLibraryButton';
import CurrentHeader from './components/CurrentHeader';
import ReadingCard from './components/ReadingCard';

const Current: React.FC = () => {
    // Mock data for current readings
    const currentReadings = [
        {
            id: 1,
            title: "Against the Gods",
            author: "Mars Gravity",
            coverUrl: "https://via.placeholder.com/60x80",
            currentChapter: 342,
            totalChapters: 1823,
            progress: 18.8,
            lastReadDate: "2 hours ago",
        },
        {
            id: 2,
            title: "Martial World",
            author: "Cocooned Cow",
            coverUrl: "https://via.placeholder.com/60x80",
            currentChapter: 984,
            totalChapters: 2345,
            progress: 42,
            lastReadDate: "Yesterday",
        },
        {
            id: 3,
            title: "Desolate Era",
            author: "I Eat Tomatoes",
            coverUrl: "https://via.placeholder.com/60x80",
            currentChapter: 156,
            totalChapters: 1324,
            progress: 11.8,
            lastReadDate: "3 days ago",
        },
    ];

    return (
        <div className="flex flex-col gap-4">
            <CurrentHeader />

            {currentReadings.map((book) => (
                <ReadingCard key={book.id} book={book} />
            ))}

            <BrowseLibraryButton />
        </div>
    );
};

export default Current;
