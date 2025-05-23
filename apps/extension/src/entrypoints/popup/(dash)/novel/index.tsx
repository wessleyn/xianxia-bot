import React from 'react';
/**
 * Component for the Novel view when on a novel site, but not on a chapter or TOC page
 */
const NovelView: React.FC = () => {
    const tabInfo = {
        title: 'Novel Site Detected',
        description: 'This appears to be a novel site. You can now:'
    };

    return (
            <div className="flex flex-col items-center justify-center space-y-6 p-4 text-center">
                <div className="text-2xl font-bold text-indigo-700">
                    {tabInfo?.title || 'Novel Site Detected'}
                </div>

                <p className="text-gray-600 max-w-md">
                    This appears to be a novel site. You can now:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-lg">
                    <button className="p-4 bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded-lg flex flex-col items-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                        </svg>
                        <span>Read Chapters</span>
                    </button>

                    <button className="p-4 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg flex flex-col items-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                            <polyline points="17 21 17 13 7 13 7 21"></polyline>
                            <polyline points="7 3 7 8 15 8"></polyline>
                        </svg>
                        <span>View Table of Contents</span>
                    </button>

                    <button className="p-4 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg flex flex-col items-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span>Add to Bookmarks</span>
                    </button>

                    <button className="p-4 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg flex flex-col items-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                            <polyline points="7 10 12 15 17 10"></polyline>
                            <line x1="12" y1="15" x2="12" y2="3"></line>
                        </svg>
                        <span>Download Novel</span>
                    </button>
                </div>
            </div>
    );
};

export default NovelView;
