import { IconBookmark, IconEye, IconStar } from '@tabler/icons-react';
import Link from 'next/link';
import { getTopNovelsThisWeek } from './actions';

export default async function TopNovelsThisWeek() {
  const novels = await getTopNovelsThisWeek()
  return (
    <div className="lg:col-span-3">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 pt-0">
        <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Top This Week</h2>
        <div className="space-y-6">
          {novels.map((novel) => (
            <Link 
              key={novel.id} 
              href={novel.url}
              className="block  p-4 pl-0"
            >
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-40 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                  <div 
                    className="w-full h-full bg-center bg-cover" 
                    style={{ backgroundImage: `url(${novel.coverUrl})` }}
                  ></div>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{novel.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">by {novel.author}</p>
                  <p className="text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{novel.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {novel.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm">
                    <div className="flex items-center">
                      <IconStar size={16} className="text-yellow-500 mr-1" />
                      <span>{novel.rating.toFixed(1)}</span>
                    </div>
                    <div className="flex items-center">
                      <IconEye size={16} className="text-blue-500 mr-1" />
                      <span>{novel.readCount.toLocaleString()} reads</span>
                    </div>
                    <div className="flex items-center">
                      <IconBookmark size={16} className="text-green-500 mr-1" />
                      <span>{novel.bookmarkCount.toLocaleString()} bookmarks</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}