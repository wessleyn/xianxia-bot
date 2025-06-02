import Link from 'next/link';
import { fetchRecentNovels } from "./actions";

export async function RecentReading() {
    const novels = await fetchRecentNovels();
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                    Continue Reading
                </h3>
                <a
                    href="/dashboard/reading-list"
                    className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                >
                    View all
                </a>
            </div>

            <div className="space-y-4">
                {novels.map((novel) => (
                    <Link
                    href={novel.link}
                        key={novel.title}
                        className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between"
                    >
                            <div>
                                <h4 className="font-medium text-gray-800 dark:text-white">
                                    {novel.title}
                                </h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Last read {novel.lastRead}
                                </p>
                            </div>
                            <div className="mt-2 sm:mt-0 w-full sm:w-32">
                                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                                    <div
                                        className="bg-purple-600 h-2 rounded-full"
                                        style={{ width: `${novel.progress}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-right mt-1 text-gray-500 dark:text-gray-400">
                                    {novel.progress}% complete
                                </p>
                            </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
