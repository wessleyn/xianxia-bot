import { getTrendingGenres } from './actions';

export default async function TrendingGenres() {
  const genres = await getTrendingGenres();
  const maxCount = genres.length

  return (
    <div className="col-span-1 lg:col-span-2">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        Trending Genres
      </h2>

      <div className="bg-white dark:bg-gray-800 md p-6 pl-0">
        {genres.length > 0 ? (
          <ul className="space-y-6">
            {genres.map((genre) => (
              <li key={genre.name}>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{genre.name}</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {genre.count.toLocaleString()} novels
                  </span>
                </div>

                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{
                      width: `${Math.min(100, (genre.count / maxCount) * 100)}%`
                    }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No trending genres found</p>
        )}

      </div>
    </div>
  );
}