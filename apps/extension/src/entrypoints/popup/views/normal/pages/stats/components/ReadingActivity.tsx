import React from 'react';

interface ReadingActivityProps {
    monthlyActivity: number[];
}

const ReadingActivity: React.FC<ReadingActivityProps> = ({ monthlyActivity }) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700 mt-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Reading Activity (Last 4 Weeks)</h3>
            <div className="h-16 flex items-end gap-1">
                {monthlyActivity.map((day, i) => (
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
    );
};

export default ReadingActivity;
