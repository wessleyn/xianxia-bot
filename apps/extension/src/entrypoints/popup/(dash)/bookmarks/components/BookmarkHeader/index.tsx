import { IconRefresh } from '@tabler/icons-react';
import React from 'react';

interface BookmarkHeaderProps {
    onRefresh?: () => void;
    isRefreshing?: boolean;
}

const BookmarkHeader: React.FC<BookmarkHeaderProps> = ({ onRefresh, isRefreshing = false }) => {
    return (
        <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Bookmarks</h2>
            {onRefresh && (
                <button
                    onClick={onRefresh}
                    disabled={isRefreshing}
                    className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Refresh bookmarks"
                    title="Refresh Bookmarks"
                >
                    <IconRefresh
                        className={`text-gray-600 dark:text-gray-300 ${isRefreshing ? 'animate-spin' : ''}`}
                        size={20}
                        stroke={1.5}
                    />
                </button>
            )}
        </div>
    );
};

export default BookmarkHeader;