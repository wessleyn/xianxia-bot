import React from 'react';
import { NovelData } from '../types';
import NovelChaptersList from './NovelChaptersList';

interface NovelCardProps {
    novel: NovelData;
    toggleExpand: (id: number) => void;
    deleteDownload: (id: number) => void;
}

const NovelCard: React.FC<NovelCardProps> = ({ novel, toggleExpand, deleteDownload }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
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
                        <h3 className="font-bold text-gray-800 dark:text-white leading-tight">{novel.title}</h3>
                        <span className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-full font-medium">
                            {novel.totalSize}
                        </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">{novel.author}</p>

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
                            <span className="text-indigo-600 dark:text-indigo-300 font-medium">{novel.downloadedChapters} chapters</span>
                        </div>
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                        <button
                            onClick={() => toggleExpand(novel.id)}
                            className="text-xs bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                        >
                            {novel.isExpanded ? 'Hide chapters' : 'Show chapters'}
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3 w-3 transition-transform ${novel.isExpanded ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                        <div className="flex gap-2">
                            <button
                                className="p-1.5 bg-indigo-100 dark:bg-indigo-900/50 hover:bg-indigo-200 dark:hover:bg-indigo-800/70 text-indigo-600 dark:text-indigo-300 rounded-md transition-colors"
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
                                className="p-1.5 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-300 rounded-md transition-colors"
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

            {novel.isExpanded && <NovelChaptersList novel={novel} />}
        </div>
    );
};

export default NovelCard;
