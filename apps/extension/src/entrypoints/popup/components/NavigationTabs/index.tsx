import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationTabsProps {
  tabs: Array<{ name: string; path: string }>;
}

const NavigationTabs: React.FC<NavigationTabsProps> = ({ tabs }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="flex border-b bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
      {tabs.map(tab => (
        <Link
          key={tab.path}
          to={tab.path}
          className={`relative flex-1 py-3 text-center text-sm ${isActive(tab.path)
            ? 'font-medium text-indigo-600 dark:text-indigo-400'
            : 'text-gray-500 dark:text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors'
            }`}
        >
          {tab.name}
          {isActive(tab.path) && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
          )}
        </Link>
      ))}
    </nav>
  );
};

export default NavigationTabs;
