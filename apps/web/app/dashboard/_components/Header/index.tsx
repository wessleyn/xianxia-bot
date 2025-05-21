'use client';

import ThemeToggle from '@components/ThemeToggle';
import {
  IconMenu2,
  IconSearch
} from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useResponsiveSidebar } from '../../_store/useSidebarStore';
import NotificationsMenu from './NotificationsMenu';


export default function DashboardHeader({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const { toggleCollapsed } = useResponsiveSidebar()

  const pathname = usePathname();
  const currentPage = pathname.split('/').filter(Boolean)[1] || 'dashboard';
  const formattedPageName = currentPage.charAt(0).toUpperCase() + currentPage.slice(1).replace(/-/g, ' ');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`${scrolled ? 'shadow-md' : ''
        } bg-white dark:bg-gray-800 sticky top-0 z-10 transition-shadow duration-300`}
    >
      <div className="px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Page Title and Sidebar TOggle */}
        <div className="flex items-center">
          <button
            className="mr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={toggleCollapsed}
          >
            <IconMenu2 size={24} />
          </button>
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white hidden xs:block">
            {formattedPageName}
          </h1>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 mx-10 max-w-xl">
          <div className="flex items-center w-full">
            <div className="flex items-center justify-center pl-3 pr-2">
              <IconSearch size={20} className="text-gray-500 dark:text-gray-400" />
            </div>
            <input
              type="search"
              className="block w-full py-2 px-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <NotificationsMenu />
          {children}
        </div>
      </div>

      {/* Mobile Search - Visible only on small screens */}
      <div className="md:hidden px-4 pb-4">
        <div className="flex items-center w-full">
          <div className="flex items-center justify-center pl-3 pr-2">
            <IconSearch size={20} className="text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="search"
            className="block w-full py-2 px-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Search..."
          />
        </div>
      </div>

    </header>
  );
}
