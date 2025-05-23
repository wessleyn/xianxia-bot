import React from 'react';

const ReadingInsightsSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700 mt-2 animate-pulse">
      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
      <div className="space-y-3">
        <div className="flex items-center space-x-1">
          <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default ReadingInsightsSkeleton;
