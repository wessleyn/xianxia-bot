import React from 'react';

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
            <h2 className="text-xl font-bold text-gray-800 pb-2 border-b border-gray-200">Current Readings</h2>

            {currentReadings.map((book) => (
                <div key={book.id} className="bg-white rounded-lg shadow-sm p-3 border border-gray-100 flex gap-3">
                    <div className="w-14 h-20 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                        <img
                            src={book.coverUrl}
                            alt={`${book.title} cover`}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="flex-1">
                        <h3 className="font-bold text-indigo-800 leading-tight line-clamp-1">{book.title}</h3>
                        <p className="text-gray-500 text-xs">{book.author}</p>

                        <div className="mt-1.5">
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Chapter {book.currentChapter}/{book.totalChapters}</span>
                                <span>{book.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div
                                    className="bg-indigo-600 h-1.5 rounded-full"
                                    style={{ width: `${book.progress}%` }}
                                ></div>
                            </div>
                        </div>

                        <div className="mt-2 flex justify-between items-center">
                            <span className="text-xs text-gray-500">Last read {book.lastReadDate}</span>
                            <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-xs py-1 px-3 rounded transition-colors">
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            ))}

            <div className="text-center mt-2">
                <button className="bg-white hover:bg-gray-100 text-indigo-600 border border-gray-200 rounded-md px-4 py-2 text-sm transition-colors w-full">
                    Browse Library
                </button>
            </div>
        </div>
    );
};

export default Current;
