import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface NovelData {
    id: number;
    title: string;
    author: string;
    coverUrl: string;
    downloadedChapters: number;
    totalSize: string;
    isExpanded: boolean;
    downloadOrder: number; // Added for sorting by recency without showing dates
}

const Downloads: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState<'all' | 'recent' | 'size'>('all');
    const [novels, setNovels] = useState<NovelData[]>([
        {
            id: 1,
            title: "Against the Gods",
            author: "Mars Gravity",
            coverUrl: "https://via.placeholder.com/60x80/6366F1/FFFFFF?text=ATG",
            downloadedChapters: 530,
            totalSize: "24.5 MB",
            isExpanded: false,
            downloadOrder: 2 // More recently downloaded (higher number means more recent)
        },
        {
            id: 2,
            title: "Martial World",
            author: "Cocooned Cow",
            coverUrl: "https://via.placeholder.com/60x80/8B5CF6/FFFFFF?text=MW",
            downloadedChapters: 214,
            totalSize: "9.8 MB",
            isExpanded: false,
            downloadOrder: 1 // Less recently downloaded
        }
    ]);

    const totalStorageUsed = novels.reduce((acc, novel) => {
        return acc + parseFloat(novel.totalSize);
    }, 0);

    const toggleExpand = (id: number) => {
        setNovels(novels.map(novel =>
            novel.id === id ? { ...novel, isExpanded: !novel.isExpanded } : novel
        ));
    };

    const deleteDownload = (id: number) => {
        setNovels(novels.filter(novel => novel.id !== id));
    };

    const filteredNovels = () => {
        switch (activeFilter) {
            case 'recent':
                return [...novels].sort((a, b) =>
                    b.downloadOrder - a.downloadOrder
                );
            case 'size':
                return [...novels].sort((a, b) =>
                    parseFloat(b.totalSize) - parseFloat(a.totalSize)
                );
            default:
                return novels;
        }
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-indigo-800">Downloaded Novels</h2>

                <div className="flex rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                    <button
                        className={`px-3 py-1 text-xs ${activeFilter === 'all'
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium'
                            : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`px-3 py-1 text-xs border-l ${activeFilter === 'recent'
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium'
                            : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        onClick={() => setActiveFilter('recent')}
                    >
                        Recent
                    </button>
                    <button
                        className={`px-3 py-1 text-xs border-l ${activeFilter === 'size'
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium'
                            : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                        onClick={() => setActiveFilter('size')}
                    >
                        Largest
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto pr-1 custom-scrollbar">
                {novels.length > 0 ? (
                    <div className="space-y-3">
                        {filteredNovels().map((novel) => (
                            <div key={novel.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                <div className="p-3 flex gap-3">
                                    <div className="w-14 h-20 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-md overflow-hidden flex-shrink-0 shadow-sm">
                                        <img
                                            src={novel.coverUrl}
                                            alt={`${novel.title} cover`}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-bold text-indigo-800 leading-tight">{novel.title}</h3>
                                            <span className="text-xs bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-medium">
                                                {novel.totalSize}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 text-xs">{novel.author}</p>

                                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                                            <div className="flex items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-book mr-1" width="14" height="14" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>
                                                    <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0"></path>
                                                    <path d="M3 6l0 13"></path>
                                                    <path d="M12 6l0 13"></path>
                                                    <path d="M21 6l0 13"></path>
                                                </svg>
                                                <span className="text-indigo-600 font-medium">{novel.downloadedChapters} chapters</span>
                                            </div>
                                        </div>

                                        <div className="mt-3 flex justify-between items-center">
                                            <button
                                                onClick={() => toggleExpand(novel.id)}
                                                className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-600 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                                            >
                                                {novel.isExpanded ? 'Hide chapters' : 'Show chapters'}
                                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform ${novel.isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>

                                            <div className="flex gap-2">
                                                <button
                                                    className="p-1.5 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 rounded-md transition-colors"
                                                    title="Read offline"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-book-2" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z"></path>
                                                        <path d="M19 16h-12a2 2 0 0 0 -2 2"></path>
                                                        <path d="M9 8h6"></path>
                                                        <path d="M9 12h6"></path>
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => deleteDownload(novel.id)}
                                                    className="p-1.5 bg-red-100 hover:bg-red-200 text-red-600 rounded-md transition-colors"
                                                    title="Delete download"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                        <path d="M4 7l16 0"></path>
                                                        <path d="M10 11l0 6"></path>
                                                        <path d="M14 11l0 6"></path>
                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {novel.isExpanded && (
                                    <div className="bg-gray-50 border-t border-gray-200 p-3">
                                        <div className="flex justify-between items-center mb-2">
                                            <h4 className="text-xs font-medium text-gray-700">Downloaded Chapters</h4>
                                            <span className="text-xs text-gray-500">{novel.downloadedChapters} total</span>
                                        </div>
                                        <div className="max-h-36 overflow-y-auto pr-1 custom-scrollbar">
                                            <ul className="space-y-1.5">
                                                {[...Array(5)].map((_, i) => (
                                                    <li key={i} className="flex justify-between text-xs p-1.5 hover:bg-gray-100 rounded">
                                                        <span className="text-indigo-700 font-medium">Chapter {novel.id === 1 ? i + 530 - 4 : i + 214 - 4}: {novel.title} {novel.id === 1 ? i + 530 - 4 : i + 214 - 4}</span>
                                                        <span className="text-gray-500">{(0.1 + i * 0.02).toFixed(1)} MB</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="text-center mt-3 pt-2 border-t border-gray-200">
                                                <button className="text-xs bg-indigo-600 hover:bg-indigo-700 text-white py-1.5 px-3 rounded transition-colors">
                                                    Show all {novel.downloadedChapters} chapters
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {novels.length > 0 && (
                            <div className="mt-2 pt-2 border-t border-gray-200">
                                <div className="flex justify-between items-center text-xs text-gray-500 mb-1">
                                    <span>Storage used: {totalStorageUsed.toFixed(1)} MB</span>
                                    <span>Free storage: {(1000 - totalStorageUsed).toFixed(1)} MB</span>
                                </div>
                                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                        style={{ width: `${(totalStorageUsed / 1000) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full py-8 text-center bg-white rounded-lg border border-gray-200 shadow-sm">
                        <div className="w-16 h-16 mb-4 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-download" width="28" height="28" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                                <path d="M7 11l5 5l5 -5"></path>
                                <path d="M12 4l0 12"></path>
                            </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-indigo-800 mb-2">No downloaded novels</h3>
                        <p className="text-sm text-gray-500 mb-4">Download novels to read them offline anytime</p>
                        <Link
                            to="/"
                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm px-4 py-2 rounded-md transition-colors shadow-sm"
                        >
                            Browse Library
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Downloads;
