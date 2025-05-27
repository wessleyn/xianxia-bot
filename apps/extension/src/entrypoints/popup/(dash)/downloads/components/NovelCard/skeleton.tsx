import React from 'react';

const NovelCardSkeleton: React.FC = () => {
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 flex flex-col">
            <div className="flex mb-3">
                {/* Cover image skeleton */}
                <div className="w-12 h-16 bg-gray-200 dark:bg-gray-700 rounded mr-3"></div>

                <div className="flex-1">
                    {/* Title skeleton */}
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    {/* Author skeleton */}
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
                    {/* Progress bar skeleton */}
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-full mt-3"></div>
                </div>

                {/* Action buttons skeleton */}
                <div className="flex items-start space-x-2">
                    <div className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700"></div>
                    <div className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-700"></div>
                </div>
            </div>

            {/* Download stats skeleton */}
            <div className="flex justify-between items-center mt-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            </div>
        </div>
    );
};

export default NovelCardSkeleton;