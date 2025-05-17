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

                    <div className="flex-1 relative">
                        <div className="flex justify-between items-start">
                            <h3 className="font-bold text-indigo-800 leading-tight line-clamp-1 pr-16">{book.title}</h3>
                            <span className="absolute top-0 right-0 text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">
                                {book.lastReadDate}
                            </span>
                        </div>
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

                        <div className="mt-2 flex justify-end items-center">
                            <div className="flex items-center gap-1.5">
                                <button
                                    className="text-gray-400 hover:text-indigo-600"
                                    title="Download for offline reading"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-download" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                                        <path d="M7 11l5 5l5 -5"></path>
                                        <path d="M12 4l0 12"></path>
                                    </svg>
                                </button>
                                <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 text-xs py-1 px-3 rounded transition-colors">
                                    Continue
                                </button>
                            </div>
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
