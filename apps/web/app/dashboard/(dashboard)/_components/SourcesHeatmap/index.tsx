/* eslint-disable @next/next/no-img-element */
import { fetchSourcesData } from "./action";

export async function SourcesHeatmap() {
    const sources = await fetchSourcesData();
    const maxVisits = Math.max(...sources.map(source => source.visits));

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                    Reading Sources
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Last 30 days
                </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {sources.map((source) => (

                    <div key={source.site} className="flex flex-col">
                        <div className="flex items-center mb-1">
                            <img
                                width={100}
                                height={100}
                                src={`https://favicone.com/${source.site}?s=100`}
                                alt={`${source.site} favicon`}
                                className="p-2 w-10 h-10 rounded-full mr-2"
                            />
                            <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                                {source.site}
                            </span>
                        </div>
                        <div className="flex items-end gap-1 h-20">
                            <div
                                className={`${source.color} rounded-sm w-full`}
                                style={{ height: `${(source.visits / maxVisits) * 100}%` }}
                            ></div>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            {source.visits} visits
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
