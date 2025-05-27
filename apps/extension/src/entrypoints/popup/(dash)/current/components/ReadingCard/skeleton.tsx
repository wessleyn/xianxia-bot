
export const ReadingCardSkeleton = () => (
    <div className="flex bg-gray-50 dark:bg-gray-800 rounded-lg p-3 animate-pulse">
        <div className="h-20 w-15 bg-gray-200 dark:bg-gray-700 rounded"></div>
        <div className="ml-3 flex flex-col flex-1 justify-between">
            <div>
                <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
            <div className="w-full">
                <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded mb-1"></div>
                <div className="flex justify-between">
                    <div className="h-3 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-3 w-1/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>
        </div>
    </div>
);
