import { IconRefresh } from '@tabler/icons-react';
import React from 'react';

interface CurrentHeaderProps {
    onRefresh?: () => void;
    isRefreshing?: boolean;
}

const CurrentHeader: React.FC<CurrentHeaderProps> = ({ onRefresh, isRefreshing = false }) => {
    return (
        <div className="flex justify-between items-center pb-2 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Current Readings</h2>
            {onRefresh && (
                <button
                    onClick={onRefresh}
                    disabled={isRefreshing}
                    className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Refresh current readings"
                    title="Refresh Current Readings"
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

export default CurrentHeader;
