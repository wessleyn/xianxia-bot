import React from 'react';

const StorageUsageSkeleton: React.FC = () => {
    return (
        <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between items-center text-xs mb-1">
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-28"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"></div>
        </div>
    );
};

export default StorageUsageSkeleton;