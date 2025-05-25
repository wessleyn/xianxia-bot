import { formatDistanceToNow } from 'date-fns';
import React, { useState } from 'react';
import useSWR from 'swr';
import { NovelData, getNovelChapters, getRecentNovelChapters } from '../action';

interface NovelChaptersListProps {
    novel: NovelData;
}

const NovelChaptersList: React.FC<NovelChaptersListProps> = ({ novel }) => {
    const [showAllChapters, setShowAllChapters] = useState(false);

    // Fetch only recent chapters by default, or all chapters if requested
    const { data: chapters = [] } = useSWR(
        `novel-chapters-${novel.id}-${showAllChapters ? 'all' : 'recent'}`,
        () => showAllChapters
            ? getNovelChapters(novel.id)
            : getRecentNovelChapters(novel.id),
        {
            revalidateOnFocus: false
        }
    );

    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return formatDistanceToNow(date, { addSuffix: true });
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-3">
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-medium text-gray-700 dark:text-gray-200">Downloaded Chapters</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">{novel.downloadedChapters} total</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 px-1">
                <span>Chapter</span>
                <span className="text-right">Downloaded</span>
                <span className="text-right">Size</span>
            </div>

            <div className={`${showAllChapters ? 'max-h-72' : 'max-h-36'} overflow-y-auto pr-1 custom-scrollbar`}>
                <ul className="space-y-1">
                    {chapters.map((chapter) => (
                        <li
                            key={chapter.id}
                            className={`grid grid-cols-3 gap-2 text-xs py-1.5 px-1 rounded ${chapter.isRead
                                    ? 'bg-indigo-50 dark:bg-indigo-900/20'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                }`}
                        >
                            <span className={`truncate pr-2 ${chapter.isRead
                                    ? 'text-indigo-400 dark:text-indigo-500'
                                    : 'text-indigo-700 dark:text-indigo-400 font-medium'
                                }`}>
                                {chapter.title}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 text-right">
                                {formatDate(chapter.downloadDate)}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 whitespace-nowrap text-right">{chapter.size}</span>
                        </li>
                    ))}
                </ul>

                {!showAllChapters && chapters.length > 0 && (
                    <div className="text-center mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => setShowAllChapters(true)}
                            className="text-xs bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-800 text-white py-1.5 px-3 rounded transition-colors"
                        >
                            Show all {novel.downloadedChapters} chapters
                        </button>
                    </div>
                )}

                {showAllChapters && (
                    <div className="text-center mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                        <button
                            onClick={() => setShowAllChapters(false)}
                            className="text-xs bg-gray-600 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-800 text-white py-1.5 px-3 rounded transition-colors"
                        >
                            Show less
                        </button>
                    </div>
                )}

                {chapters.length === 0 && (
                    <div className="py-4 text-center">
                        <p className="text-gray-500 dark:text-gray-400 text-xs">Loading chapters...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NovelChaptersList;
