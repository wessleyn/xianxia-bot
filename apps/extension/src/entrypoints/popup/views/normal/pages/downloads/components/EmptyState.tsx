import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full py-8 text-center bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="w-16 h-16 mb-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center text-indigo-500 dark:text-indigo-300">
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-download" width="28" height="28" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
          <path d="M7 11l5 5l5 -5"></path>
          <path d="M12 4l0 12"></path>
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-300 mb-2">No downloaded novels</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Download novels to read them offline anytime</p>
      <Link
        to="/"
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-sm px-4 py-2 rounded-md transition-colors shadow-sm"
      >
        Browse Library
      </Link>
    </div>
  );
};

export default EmptyState;
