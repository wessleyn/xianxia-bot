import {
    IconBook,
    IconBookmark,
    IconChevronDown,
    IconTrash
} from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns';
import React from 'react';
import { NovelData } from '../../action';
import NovelChaptersList from '../NovelChaptersList';

interface NovelCardProps {
    novel: NovelData;
    toggleExpand: (id: number) => void;
    deleteDownload: (id: number) => void;
}

const NovelCard: React.FC<NovelCardProps> = ({ novel, toggleExpand, deleteDownload }) => {
    // Calculate download date based on most recent chapter if available
    const downloadDate = novel.chapters?.length
        ? new Date(novel.chapters[novel.chapters.length - 1].downloadDate || Date.now())
        : null;

    const formattedDate = downloadDate
        ? formatDistanceToNow(downloadDate, { addSuffix: true })
        : "Recently";

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
                            <IconBook size={14} className="mr-1 text-indigo-600 dark:text-indigo-300" />
                            <span className="text-indigo-600 dark:text-indigo-300 font-medium">{novel.downloadedChapters} chapters</span>
                        </div>
                        <div className="flex items-center justify-end">
                            <span className="text-gray-500 dark:text-gray-400"> {formattedDate}</span>
                        </div>
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                        <button
                            onClick={() => toggleExpand(novel.id)}
                            className="text-xs bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded flex items-center gap-1 transition-colors"
                        >
                            {novel.isExpanded ? 'Hide chapters' : 'Show chapters'}
                            <IconChevronDown
                                size={14}
                                className={`transition-transform ${novel.isExpanded ? 'rotate-180' : ''}`}
                            />
                        </button>

                        <div className="flex gap-2">
                            <button
                                className="p-1.5 bg-indigo-100 dark:bg-indigo-900/50 hover:bg-indigo-200 dark:hover:bg-indigo-800/70 text-indigo-600 dark:text-indigo-300 rounded-md transition-colors"
                                title="Read offline"
                            >
                                <IconBookmark size={16} />
                            </button>
                            <button
                                onClick={() => deleteDownload(novel.id)}
                                className="p-1.5 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 text-red-600 dark:text-red-300 rounded-md transition-colors"
                                title="Delete download"
                            >
                                <IconTrash size={16} />
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
