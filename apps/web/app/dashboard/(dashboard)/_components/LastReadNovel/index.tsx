import Image from "next/image";
import { fetchLastReadNovel } from "./action";

export async function LastReadNovel() {

    const novel = await fetchLastReadNovel();

    if (!novel) {
        return <div>No recent reading activity</div>;
    }
    return (
        <div className="rounded-lg bg-card dark:bg-gray-800 p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Last Read Novel</h2>
            
            <div className="flex flex-col md:flex-row gap-4">
                {/* Cover image */}
                <div className="flex-shrink-0 h-[220px] w-[160px] rounded-md overflow-hidden">
                    <Image
                        src={novel.coverImage}
                        alt={`${novel.title} cover`}
                        width={160}
                        height={220}
                        className="object-cover w-full h-full"
                    />
                </div>
                
                {/* Novel info */}
                <div className="flex-1 space-y-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        {novel.title}
                    </h3>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        By {novel.author}
                    </p>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                        Currently reading: {novel.currentChapter} • Last read {novel.lastRead}
                    </p>
                    
                    <div className="pt-2">
                        <a
                            href={`${novel.link}`}
                            className="inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                        >
                            Continue Reading
                        </a>
                    </div>
                    
                    <div className="pt-2">
                        <div className="flex items-center justify-between mb-1">
                            <span className="text-sm text-gray-600 dark:text-gray-300">Reading Progress</span>
                            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{novel.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                            <div 
                                className="bg-purple-600 h-2.5 rounded-full transition-all duration-300" 
                                style={{ width: `${novel.progress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
