import React from 'react';
import { BookmarkLabel } from '../../../../../../ctypes';
import { BookmarkData } from '../../action';

interface BookmarkCardProps {
    bookmark: BookmarkData;
}

const getLabelStyles = (label: BookmarkLabel): { bgColor: string, textColor: string } => {
    switch (label) {
        case 'urgent':
            return {
                bgColor: 'bg-red-100 dark:bg-red-900/30',
                textColor: 'text-red-700 dark:text-red-300'
            };
        case 'bad':
            return {
                bgColor: 'bg-orange-100 dark:bg-orange-900/30',
                textColor: 'text-orange-700 dark:text-orange-300'
            };
        case 'awesome':
            return {
                bgColor: 'bg-green-100 dark:bg-green-900/30',
                textColor: 'text-green-700 dark:text-green-300'
            };
        default:
            return {
                bgColor: 'bg-gray-100 dark:bg-gray-700',
                textColor: 'text-gray-700 dark:text-gray-300'
            };
    }
};

const BookmarkCard: React.FC<BookmarkCardProps> = ({ bookmark }) => {
    const { bgColor, textColor } = getLabelStyles(bookmark.label);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className={`${bgColor} ${textColor} px-3 py-1.5 flex justify-between items-center text-xs font-medium`}>
                <span>{bookmark.novel}</span>
                <span>Ch. {bookmark.chapter}</span>
            </div>
            <div className="p-3">
                <h3 className="font-medium text-gray-800 dark:text-white">{bookmark.chapterTitle}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5 line-clamp-2">{bookmark.excerpt}</p>
                <div className="mt-2 flex justify-between items-center">
                    <span className="text-xs text-gray-500 dark:text-gray-400">Added on {new Date(bookmark.dateAdded).toLocaleDateString()}</span>
                    <div className="flex gap-2">
                            // Available for download
                            <button className="text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400" title="Download chapter">
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-download" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                                    <path d="M7 11l5 5l5 -5"></path>
                                    <path d="M12 4l0 12"></path>
                                </svg>
                            </button>

                        <button className="text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400" title="Bookmark">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                            </svg>
                        </button>
                        <button className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400" title="Delete bookmark">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookmarkCard;