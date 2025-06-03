export default function TopNovelsSkeleton() {
  return (
    <div className="lg:col-span-3">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 pt-0">
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-pulse"></div>
        <div className="space-y-6">
          {Array(3).fill(0).map((_, index) => (
            <div key={index} className="block p-4 pl-0">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-40 h-40 bg-gray-300 dark:bg-gray-600 rounded-md flex-shrink-0 animate-pulse"></div>

                <div className="flex-1">
                  <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded mb-3 animate-pulse"></div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {Array(4).fill(0).map((_, idx) => (
                      <div
                        key={idx}
                        className="h-6 w-16 bg-purple-100 dark:bg-purple-900 rounded-full animate-pulse"
                      ></div>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 text-sm">
                    {Array(3).fill(0).map((_, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-4 h-4 mr-1 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}