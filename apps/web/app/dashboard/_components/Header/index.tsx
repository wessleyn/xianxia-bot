'use client';

import ThemeToggle from '@repo/ui/components/ThemeToggle';
import { User } from '@supabase/supabase-js';
import {
  IconBell,
  IconMenu2,
  IconSearch
} from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useResponsiveSidebar } from '../../_store/useSidebarStore';

interface HeaderProps {
  user: User | null;
}

export default function DashboardHeader({ user }: HeaderProps) {
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
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            {formattedPageName}
          </h1>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 mx-10 max-w-xl">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IconSearch size={20} />
            </div>
            <input
              type="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition duration-150 ease-in-out"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />

          {/* Notifications */}
          <button className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none relative">
            <IconBell size={20} />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
          </button>


          {/* Profile Menu */}
          <div className=" items-center">
            <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 uppercase font-semibold">
              {user?.email?.[0] || 'U'}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search - Visible only on small screens */}
      <div className="md:hidden px-4 pb-4">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IconSearch size={20} />
          </div>
          <input
            type="search"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Search..."
          />
        </div>
      </div>

    </header>
  );
}
