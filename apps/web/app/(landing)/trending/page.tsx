import { IconBookmark, IconEye, IconStar, IconTrendingUp } from '@tabler/icons-react';

export const metadata = {
  title: 'Trending | Xianxia',
  description: 'Discover trending cultivation novels and stories',
};

export default function TrendingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-center mb-8">
        <IconTrendingUp size={36} className="text-purple-600 mr-3" />
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Trending Novels</h1>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Top This Week</h2>
        <div className="space-y-6">
          {trendingNovels.map((novel) => (
            <div 
              key={novel.id} 
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-lg transition-shadow flex flex-col md:flex-row gap-4"
            >
              <div className="w-full md:w-48 h-48 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden">
                <div 
                  className="w-full h-full bg-center bg-cover" 
                  style={{ backgroundImage: `url(${novel.coverUrl})` }}
                ></div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{novel.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">by {novel.author}</p>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{novel.description}</p>
                
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
                    <span>{novel.views.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center">
                    <IconBookmark size={16} className="text-green-500 mr-1" />
                    <span>{novel.bookmarks.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Rising Stars</h2>
          <ul className="space-y-4">
            {risingNovels.map(novel => (
              <li key={novel.id} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{novel.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{novel.author}</p>
                  </div>
                  <div className="flex items-center text-green-500">
                    <IconTrendingUp size={16} className="mr-1" />
                    <span>+{novel.growth}%</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Trending Tags</h2>
          <div className="flex flex-wrap gap-3">
            {trendingTags.map((tag, index) => (
              <div 
                key={index} 
                className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-2 rounded-lg flex items-center"
              >
                <span className="font-medium">{tag.name}</span>
                <span className="ml-2 text-xs px-2 py-1 bg-purple-200 dark:bg-purple-800 rounded-full">{tag.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sample trending novels data
const trendingNovels = [
  {
    id: 1,
    title: 'Immortal Mountain',
    author: 'Dao Master Chen',
    description: 'A young cultivator discovers an ancient mountain with secrets that could change the cultivation world forever.',
    coverUrl: 'https://via.placeholder.com/300x450',
    tags: ['Cultivation', 'Adventure', 'Romance', 'Mystery'],
    rating: 4.7,
    views: 1243586,
    bookmarks: 87432
  },
  {
    id: 2,
    title: 'Path to Ascension',
    author: 'Heavenly Scribe',
    description: 'Follow the journey of Lin Feng as he climbs the ranks of cultivation and challenges the heavens themselves.',
    coverUrl: 'https://via.placeholder.com/300x450',
    tags: ['Cultivation', 'Action', 'Fantasy', 'Martial Arts'],
    rating: 4.5,
    views: 986421,
    bookmarks: 63245
  },
  {
    id: 3,
    title: 'Nine Heavens Sword Saint',
    author: 'Sword Dreamer',
    description: 'The tale of a young blacksmith who forges a legendary sword, beginning his journey to become the greatest sword cultivator.',
    coverUrl: 'https://via.placeholder.com/300x450',
    tags: ['Cultivation', 'Swordplay', 'Fantasy', 'Crafting'],
    rating: 4.8,
    views: 785321,
    bookmarks: 59871
  }
];

// Sample rising novels data
const risingNovels = [
  { id: 4, title: 'Divine Pill Master', author: 'Medicine Sage', growth: 243 },
  { id: 5, title: 'Eternal Talisman', author: 'Script Elder', growth: 187 },
  { id: 6, title: 'Jade Beauty', author: 'Dream Butterfly', growth: 156 },
  { id: 7, title: 'Demon Hunter Chronicles', author: 'Night Walker', growth: 134 },
  { id: 8, title: 'Celestial Mountains', author: 'Cloud Wanderer', growth: 121 }
];

// Sample trending tags data
const trendingTags = [
  { name: 'Cultivation', count: 2437 },
  { name: 'Martial Arts', count: 1853 },
  { name: 'Romance', count: 1542 },
  { name: 'Alchemy', count: 1246 },
  { name: 'Reincarnation', count: 1125 },
  { name: 'System', count: 987 },
  { name: 'Sect', count: 876 },
  { name: 'Hidden Realm', count: 742 }
];