import React from 'react';

interface StatsHeaderProps {
    onRefresh: () => void;
    isRefreshing: boolean;
}

const StatsHeader: React.FC<StatsHeaderProps> = ({ onRefresh, isRefreshing }) => {
    return (
        <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Reading Statistics</h2>
            <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className="p-2 rounded-md text-indigo-600 dark:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                title="Refresh statistics"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${isRefreshing ? 'animate-spin' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            </button>
        </div>
    );
};

export default StatsHeader;
