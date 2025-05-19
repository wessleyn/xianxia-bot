import React, { ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import NavigationTabs from '../components/NavigationTabs';

interface LayoutProps {
  children?: ReactNode;
  isNovelSite?: boolean;
  novelTitle?: string;
}

const Layout: React.FC<LayoutProps> = ({ isNovelSite = false, novelTitle }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const tabs = [
    { name: 'Stats', path: '/' },
    { name: 'Current', path: '/current' },
    { name: 'Bookmarks', path: '/bookmarks' },
    { name: 'Downloads', path: '/downloads' },
  ];

  // Mock downloaded novels
  const downloadedNovels = [
    { id: 1, title: "Against the Gods", chapters: 530 },
    { id: 2, title: "Martial World", chapters: 214 },
  ];

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <div className="h-[450px] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <Header isLoggedIn={isLoggedIn} toggleLogin={toggleLogin} />

      <NavigationTabs tabs={tabs} />

      <main className="flex-1 p-4 overflow-auto custom-scrollbar">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
