import { BookmarkLabel } from '@ctypes/index';
import { IconBookmark, IconDownload, IconTrash } from '@tabler/icons-react';
import React from 'react';
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
                        <button className="text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400" title="Download chapter">
                            <IconDownload size={16} stroke={2} />
                        </button>

                        <button className="text-gray-400 dark:text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400" title="Bookmark">
                            <IconBookmark size={16} stroke={2} />
                        </button>
                        <button className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400" title="Delete bookmark">
                            <IconTrash size={16} stroke={2} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookmarkCard;