import React from 'react';

const Stats: React.FC = () => {
    // Mock reading statistics
    const stats = {
        booksRead: 24,
        chaptersRead: 1834,
        totalHoursRead: 412,
        wordsRead: 2458000,
        lastWeekReadingTime: 18.5,
        weeklyStreak: 12,
        favoriteGenre: 'Cultivation',
        completionRate: 84,
        monthlyActivity: [65, 72, 45, 80, 95, 45, 60, 80, 75, 82, 90, 95, 88, 92, 75, 80, 85, 70, 65, 72, 78, 83, 90, 75, 60, 65, 70, 85]
    };

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 pb-2 border-b border-gray-200 dark:border-gray-700">Reading Statistics</h2>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Books Read</h3>
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{stats.booksRead}</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Chapters</h3>
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{stats.chaptersRead}</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Hours Read</h3>
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{stats.totalHoursRead}</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Weekly Streak</h3>
                    <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">{stats.weeklyStreak} weeks</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700 mt-2">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Reading Activity (Last 4 Weeks)</h3>
                <div className="h-16 flex items-end gap-1">
                    {stats.monthlyActivity.map((day, i) => (
                        <div
                            key={i}
                            className="bg-indigo-500 dark:bg-indigo-400 w-2 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                            style={{ height: `${day}%` }}
                            title={`${day}% of daily goal`}
                        ></div>
                    ))}
                </div>
                <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 mt-1">
                    <span>4 weeks ago</span>
                    <span>Today</span>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700 mt-2">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Reading Insights</h3>
                <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <p>• Your favorite genre is <span className="font-medium text-gray-800 dark:text-gray-100">{stats.favoriteGenre}</span></p>
                    <p>• You read for <span className="font-medium text-gray-800 dark:text-gray-100">{stats.lastWeekReadingTime} hours</span> last week</p>
                    <p>• You finish <span className="font-medium text-gray-800 dark:text-gray-100">{stats.completionRate}%</span> of books you start</p>
                    <p>• You've read approximately <span className="font-medium text-gray-800 dark:text-gray-100">{(stats.wordsRead / 1000000).toFixed(2)} million</span> words</p>
                </div>
            </div>
        </div>
    );
};

export default Stats;
