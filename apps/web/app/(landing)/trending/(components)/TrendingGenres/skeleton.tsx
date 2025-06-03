export default function TrendingGenresSkeleton() {
  return (
    <div className="col-span-1 lg:col-span-2">
      <h2 className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-6 animate-pulse"></h2>

      <div className="bg-white dark:bg-gray-800 md p-6 pl-0">
        <ul className="space-y-6">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <li key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="h-5 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>
                  <span className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></span>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-gray-300 dark:bg-gray-600 h-2.5 rounded-full animate-pulse"
                    style={{ width: `${Math.random() * 70 + 30}%` }}
                  ></div>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}