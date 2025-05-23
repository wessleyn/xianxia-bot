import React from 'react';

const ReadingActivitySkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-100 dark:border-gray-700 mt-2 animate-pulse">
      <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-16 flex items-end gap-[2px]">
        {Array(28).fill(0).map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-gray-700 flex-1 rounded-t-sm"
            style={{ height: `${Math.random() * 40 + 5}%` }}
          ></div>
        ))}
      </div>
      <div className="flex justify-between text-xs mt-1">
        <div className="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="h-3 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );
};

export default ReadingActivitySkeleton;
