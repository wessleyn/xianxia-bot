import React from 'react';

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
            <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Bookmarks</h2>
                <div className="flex gap-1">
                    <button className="p-1 text-gray-500 hover:text-indigo-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 5a1 1 0 100 2h12a1 1 0 100-2H4z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <button className="p-1 text-gray-500 hover:text-indigo-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {bookmarks.map((bookmark) => (
                    <div key={bookmark.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                        <div className={`${bookmark.color} ${bookmark.textColor} px-3 py-1.5 flex justify-between items-center text-xs font-medium`}>
                            <span>{bookmark.novel}</span>
                            <span>Ch. {bookmark.chapter}</span>
                        </div>
                        <div className="p-3">
                            <h3 className="font-medium text-indigo-800">{bookmark.chapterTitle}</h3>
                            <p className="text-sm text-gray-600 mt-1.5 line-clamp-2">{bookmark.excerpt}</p>
                            <div className="mt-2 flex justify-between items-center">
                                <span className="text-xs text-gray-500">Added on {new Date(bookmark.dateAdded).toLocaleDateString()}</span>
                                <div className="flex gap-2">
                                    {/* Download button - Each bookmark will have different download states */}
                                    {bookmark.id % 2 === 0 ? (
                                        // Available for download
                                        <button className="text-gray-400 hover:text-indigo-600" title="Download chapter">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-download" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                                                <path d="M7 11l5 5l5 -5"></path>
                                                <path d="M12 4l0 12"></path>
                                            </svg>
                                        </button>
                                    ) : bookmark.id % 3 === 0 ? (
                                        // Already downloaded
                                        <button className="text-indigo-600" title="Downloaded">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-check" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M5 12l5 5l10 -10"></path>
                                            </svg>
                                        </button>
                                    ) : (
                                        // Not available for download
                                        <button className="text-gray-300 cursor-not-allowed" title="Download not available">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-x" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M18 6l-12 12"></path>
                                                <path d="M6 6l12 12"></path>
                                            </svg>
                                        </button>
                                    )}

                                    <button className="text-gray-400 hover:text-indigo-600" title="Bookmark">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                                        </svg>
                                    </button>
                                    <button className="text-gray-400 hover:text-red-600" title="Delete bookmark">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bookmarks;
