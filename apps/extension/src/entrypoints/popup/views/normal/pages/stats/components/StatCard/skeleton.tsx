import React from 'react';

const StatCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700 animate-pulse">
      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  );
};

export default StatCardSkeleton;
