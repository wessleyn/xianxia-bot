import React from 'react';

interface FilterBarProps {
    activeFilter: 'all' | 'recent' | 'size';
    setActiveFilter: (filter: 'all' | 'recent' | 'size') => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ activeFilter, setActiveFilter }) => {
    return (
        <div className="flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
            <button
                className={`px-3 py-1 text-xs ${activeFilter === 'all'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                onClick={() => setActiveFilter('all')}
            >
                All
            </button>
            <button
                className={`px-3 py-1 text-xs border-l ${activeFilter === 'recent'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                onClick={() => setActiveFilter('recent')}
            >
                Recent
            </button>
            <button
                className={`px-3 py-1 text-xs border-l ${activeFilter === 'size'
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}
                onClick={() => setActiveFilter('size')}
            >
                Largest
            </button>
        </div>
    );
};

export default FilterBar;
