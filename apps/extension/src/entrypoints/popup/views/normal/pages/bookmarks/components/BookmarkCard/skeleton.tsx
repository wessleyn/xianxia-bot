

const BookmarkCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden animate-pulse">
      {/* Header bar */}
      <div className="bg-gray-200 dark:bg-gray-700 px-3 py-1.5 flex justify-between items-center">
        <div className="h-3 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
        <div className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Title */}
        <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>

        {/* Excerpt */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="h-3 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>

        {/* Footer */}
        <div className="mt-3 flex justify-between items-center">
          <div className="h-3 w-28 bg-gray-200 dark:bg-gray-700 rounded"></div>
          <div className="flex gap-2">
            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookmarkCardSkeleton;