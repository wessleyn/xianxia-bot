import React from 'react';
import { ReadingStats } from '../../types';

interface ReadingInsightsProps {
    stats: ReadingStats;
}

const ReadingInsights: React.FC<ReadingInsightsProps> = ({ stats }) => {
    const formattedWordCount = stats.wordsRead >= 1000000
        ? `${(stats.wordsRead / 1000000).toFixed(2)} million`
        : stats.wordsRead >= 1000
            ? `${(stats.wordsRead / 1000).toFixed(1)}k`
            : stats.wordsRead.toString();

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700 mt-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Reading Insights</h3>
            <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                <p>• Your favorite genre is <span className="font-medium text-gray-800 dark:text-gray-100">{stats.favoriteGenre || 'Unknown'}</span></p>
                <p>• You read for <span className="font-medium text-gray-800 dark:text-gray-100">{stats.lastWeekReadingTime || 0} {stats.lastWeekReadingTime === 1 ? 'hour' : 'hours'}</span> last week</p>
                <p>• You finish <span className="font-medium text-gray-800 dark:text-gray-100">{stats.completionRate || 0}%</span> of books you start</p>
                <p>• You've read approximately <span className="font-medium text-gray-800 dark:text-gray-100">{formattedWordCount}</span> words</p>
            </div>
        </div>
    );
};

export default ReadingInsights;
