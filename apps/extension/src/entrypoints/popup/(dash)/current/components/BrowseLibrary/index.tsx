import React from 'react';

const BrowseLibrary: React.FC = () => {
    return (
        <div className="text-center mt-2">
            <button className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 text-sm transition-colors w-full">
                Browse Library
            </button>
        </div>
    );
};

export default BrowseLibrary;
