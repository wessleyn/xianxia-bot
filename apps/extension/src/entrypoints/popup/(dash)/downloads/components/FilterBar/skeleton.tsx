import React from 'react';

const FilterBarSkeleton: React.FC = () => {
    return (
        <div className="flex justify-between items-center mb-4">
            <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
            <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
            </div>
        </div>
    );
};

export default FilterBarSkeleton;