import React from 'react';
import { NovelData } from '../types';

interface NovelChaptersListProps {
    novel: NovelData;
}

const NovelChaptersList: React.FC<NovelChaptersListProps> = ({ novel }) => {
    return (
        <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-3">
            <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-medium text-gray-700 dark:text-gray-200">Downloaded Chapters</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400">{novel.downloadedChapters} total</span>
            </div>
            <div className="max-h-36 overflow-y-auto pr-1 custom-scrollbar">
                <ul className="space-y-1.5">
                    {[...Array(5)].map((_, i) => (
                        <li key={i} className="flex justify-between text-xs p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
                            <span className="text-indigo-700 dark:text-indigo-400 font-medium">
                                Chapter {novel.id === 1 ? i + novel.downloadedChapters - 4 : i + novel.downloadedChapters - 4}: {novel.title} {novel.id === 1 ? i + novel.downloadedChapters - 4 : i + novel.downloadedChapters - 4}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400">{(0.1 + i * 0.02).toFixed(1)} MB</span>
                        </li>
                    ))}
                </ul>
                <div className="text-center mt-3 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <button className="text-xs bg-indigo-600 dark:bg-indigo-700 hover:bg-indigo-700 dark:hover:bg-indigo-800 text-white py-1.5 px-3 rounded transition-colors">
                        Show all {novel.downloadedChapters} chapters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NovelChaptersList;
