import React, { useState } from 'react';

const ChapterView: React.FC = () => {
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [currentPage, setCurrentPage] = useState(3);
  const totalPages = 12;

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    setFontSize(size);
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(parseInt(e.target.value, 10));
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="h-[450px] bg-gray-900/80 text-white backdrop-blur-lg flex flex-col">
      <header className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-800 to-purple-700">
        <div className="flex items-center">
          <button className="p-2 hover:bg-white/20 rounded-full" title="Back to library">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-arrow-left" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M5 12l14 0"></path>
              <path d="M5 12l6 6"></path>
              <path d="M5 12l6 -6"></path>
            </svg>
          </button>
          <h1 className="ml-2 text-lg font-semibold">Ch. 12: The Howling Begins</h1>
        </div>
      </header>

      <div className="flex-1 flex flex-col justify-between">
        {/* Central area - reading position indicator */}
        <div className="px-4 py-8">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={handlePrevPage}
              className="h-10 w-10 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/30 transition-colors"
              disabled={currentPage === 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-left" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M15 6l-6 6l6 6"></path>
              </svg>
            </button>
            <span className="text-lg font-medium">Page {currentPage} of {totalPages}</span>
            <button
              onClick={handleNextPage}
              className="h-10 w-10 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/30 transition-colors"
              disabled={currentPage === totalPages}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-chevron-right" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 6l6 6l-6 6"></path>
              </svg>
            </button>
          </div>

          <div className="w-full mt-4">
            <input
              type="range"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={handlePageChange}
              className="w-full h-2 bg-white/30 rounded-lg appearance-none cursor-pointer accent-indigo-500"
            />
            <div className="flex justify-between mt-2 text-sm">
              <span>1</span>
              <span>{totalPages}</span>
            </div>
          </div>
        </div>

        {/* Control panel at bottom */}
        <div className="bg-gray-900/90 p-4 grid grid-cols-4 gap-3">
          <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bookmark" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M9 4h6a2 2 0 0 1 2 2v14l-5 -3l-5 3v-14a2 2 0 0 1 2 -2"></path>
            </svg>
            <span className="mt-1 text-xs">Bookmark</span>
          </button>

          <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-indigo-600/70 hover:bg-indigo-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-share" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M6 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
              <path d="M18 6m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
              <path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
              <path d="M8.7 10.7l6.6 -3.4"></path>
              <path d="M8.7 13.3l6.6 3.4"></path>
            </svg>
            <span className="mt-1 text-xs">Share</span>
          </button>

          <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-indigo-600/70 hover:bg-indigo-700 transition-colors">
            <div className="flex items-center justify-center">
              <button
                className={`text-xs px-2 py-1 ${fontSize === 'small' ? 'bg-white text-indigo-800' : 'text-white'} rounded-l`}
                onClick={() => handleFontSizeChange('small')}
              >
                A-
              </button>
              <button
                className={`text-sm px-2 py-1 ${fontSize === 'medium' ? 'bg-white text-indigo-800' : 'text-white'}`}
                onClick={() => handleFontSizeChange('medium')}
              >
                A
              </button>
              <button
                className={`text-base px-2 py-1 ${fontSize === 'large' ? 'bg-white text-indigo-800' : 'text-white'} rounded-r`}
                onClick={() => handleFontSizeChange('large')}
              >
                A+
              </button>
            </div>
            <span className="mt-1 text-xs">Text Size</span>
          </div>

          <button className="flex flex-col items-center justify-center p-3 rounded-lg bg-indigo-600/70 hover:bg-indigo-700 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z"></path>
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
            </svg>
            <span className="mt-1 text-xs">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChapterView;
