import React from 'react';
import { ReadingData } from '../../action';

interface ReadingCardProps {
    book: ReadingData;
}

const ReadingCard: React.FC<ReadingCardProps> = ({ book }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-3 border border-gray-100 dark:border-gray-700 flex gap-3">
            <div className="w-14 h-20 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                <img
                    src={book.coverUrl}
                    alt={`${book.title} cover`}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-1 relative">
                <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800 dark:text-white leading-tight line-clamp-1 pr-16">{book.title}</h3>
                    <span className="absolute top-0 right-0 text-xs bg-indigo-100 dark:bg-indigo-900/50 text-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">
                        {book.lastReadDate}
                    </span>
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-xs">{book.author}</p>

                <div className="mt-1.5">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <span>Chapter {book.currentChapter}/{book.totalChapters}</span>
                        <span>{book.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                            className="bg-indigo-600 dark:bg-indigo-500 h-1.5 rounded-full"
                            style={{ width: `${book.progress}%` }}
                        ></div>
                    </div>
                </div>

                <div className="mt-2 flex justify-end items-center">
                    <div className="flex items-center gap-1.5">
                        <button
                            className="text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400"
                            title="Download for offline reading"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-download" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                                <path d="M7 11l5 5l5 -5"></path>
                                <path d="M12 4l0 12"></path>
                            </svg>
                        </button>
                        <button className="bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-800/50 text-indigo-700 dark:text-indigo-300 text-xs py-1 px-3 rounded transition-colors">
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReadingCard;
