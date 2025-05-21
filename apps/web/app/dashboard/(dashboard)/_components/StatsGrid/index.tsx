import { fetchReadingStats } from "./action";

export async function StatsGrid() {
    const stats = await fetchReadingStats()
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
                <div
                    key={stat.name}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 -l-4 border-purple-500"
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
    );
}
