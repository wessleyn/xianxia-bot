import React from 'react';

interface StorageUsageProps {
    totalStorageUsed: number;
}

const StorageUsage: React.FC<StorageUsageProps> = ({ totalStorageUsed }) => {
    return (
        <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mb-1">
                <span>Storage used: {totalStorageUsed.toFixed(1)} MB</span>
                <span>Free storage: {(1000 - totalStorageUsed).toFixed(1)} MB</span>
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ width: `${(totalStorageUsed / 1000) * 100}%` }}
                ></div>
            </div>
        </div>
    );
};

export default StorageUsage;
