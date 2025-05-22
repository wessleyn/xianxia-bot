import React from 'react';
import BookmarkCard from './components/BookmarkCard';
import BookmarkHeader from './components/BookmarkHeader';

const Bookmarks: React.FC = () => {
    // Mock data for bookmarks
    const bookmarks = [
        {
            id: 1,
            novel: "Against the Gods",
            chapter: 341,
            chapterTitle: "Heavenly Profound Treasure",
            excerpt: "The Overlord Pellet was known as the number one pellet within the Blue Wind Empire...",
            dateAdded: "2025-05-12",
            color: "bg-red-100",
            textColor: "text-red-700"
        },
        {
            id: 2,
            novel: "Martial World",
            chapter: 984,
            chapterTitle: "Divine Phoenix Island",
            excerpt: "The ancient Phoenix was a mythical divine beast, said to be unrivaled under the heavens...",
            dateAdded: "2025-05-10",
            color: "bg-blue-100",
            textColor: "text-blue-700"
        },
        {
            id: 3,
            novel: "Desolate Era",
            chapter: 155,
            chapterTitle: "The Bloodcloud Hall",
            excerpt: "The Diremonsters were divided into nine separate grades, just like magic treasures...",
            dateAdded: "2025-05-08",
            color: "bg-green-100",
            textColor: "text-green-700"
        },
        {
            id: 4,
            novel: "Martial World",
            chapter: 982,
            chapterTitle: "The Final Trial",
            excerpt: "The divine tree had nine branches and nine roots, symbolizing the nine heavens and nine earths...",
            dateAdded: "2025-05-06",
            color: "bg-purple-100",
            textColor: "text-purple-700"
        },
    ];

    return (
        <div className="flex flex-col gap-4">
            <BookmarkHeader />

            <div className="space-y-4">
                {bookmarks.map((bookmark) => (
                    <BookmarkCard key={bookmark.id} bookmark={bookmark} />
                ))}
            </div>
        </div>
    );
};

export default Bookmarks;
