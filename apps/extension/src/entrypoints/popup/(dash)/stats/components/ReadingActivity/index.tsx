import React from 'react';

interface ReadingActivityProps {
    monthlyActivity: number[];
}

const ReadingActivity: React.FC<ReadingActivityProps> = ({ monthlyActivity = [] }) => {
    // Ensure we have exactly 28 days (4 weeks) for the activity chart
    const normalizedActivity = monthlyActivity.length === 28
        ? monthlyActivity
        : Array(28).fill(0).map((_, i) => monthlyActivity[i] || 0);

    // Find the max value to normalize the heights properly
    const maxActivity = Math.max(...normalizedActivity, 1);

    // Scale the values between 5% and 100% for better visualization
    const calculateHeight = (value: number): number => {
        if (value === 0) return 5; // Minimum visible height for zero activity
        return Math.max(5, Math.min(100, (value / maxActivity) * 100));
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700 mt-2">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Reading Activity (Last 4 Weeks)</h3>
            <div className="h-16 flex items-end gap-[2px]">
                {normalizedActivity.map((day, i) => (
                    <div
                        key={i}
                        className="bg-indigo-500 dark:bg-indigo-400 flex-1 rounded-t-sm opacity-80 hover:opacity-100 transition-opacity"
                        style={{ height: `${calculateHeight(day)}%` }}
                        title={`Reading activity: ${day}`}
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
