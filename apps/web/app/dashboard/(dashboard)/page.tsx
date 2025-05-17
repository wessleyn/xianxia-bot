import { getCurrentUser } from "@repo/auth/utils";

export default async function Dashboard() {
    const user = await getCurrentUser();

    // Sample stats
    const stats = [
        { name: "Reading Streak", value: "7 days" },
        { name: "Chapters Read", value: "152" },
        { name: "Time Spent Reading", value: "42 hrs" },
        { name: "Bookmarks", value: "8" },
    ];

    // Sample recent novels
    const recentNovels = [
        { title: "The Path to Ascension", lastRead: "Today", progress: 75 },
        { title: "Eternal Sacred Mountain", lastRead: "Yesterday", progress: 45 },
        { title: "Nine Dragons Emperor", lastRead: "2 days ago", progress: 92 },
        { title: "Martial Peak", lastRead: "5 days ago", progress: 30 },
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    Welcome back, {user.user_metadata?.name || user!.email!.split('@')[0]}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-1">
                    Continue your cultivation journey. Your last reading session was 6 hours ago.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-l-4 border-purple-500"
                    >
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {stat.name}
                        </p>
                        <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">
                            {stat.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* Recent Reading */}
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
                    {recentNovels.map((novel) => (
                        <div
                            key={novel.title}
                            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between"
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
                        </div>
                    ))}
                </div>
            </div>

            {/* User Info (For debugging) */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <details className="text-sm">
                    <summary className="text-gray-500 dark:text-gray-400 cursor-pointer">
                        User Details
                    </summary>
                    <div className="mt-3 space-y-1 text-gray-600 dark:text-gray-300">
                        <p>User ID: {user.id}</p>
                        <p>Email: {user.email}</p>
                        <p>Created: {new Date(user.created_at).toLocaleDateString()}</p>
                    </div>
                </details>
            </div>
        </div>
    );
}