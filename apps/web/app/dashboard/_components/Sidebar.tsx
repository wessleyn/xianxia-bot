'use client';

import { signOutAction } from '@repo/auth';
import {
  IconBook,
  IconBookmark,
  IconChevronLeft,
  IconChevronRight,
  IconClock,
  IconCloudCheck,
  IconDevices,
  IconHome,
  IconPalette,
  IconSettings,
  IconStar
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../../_assets/monk-man.svg';
import { useResponsiveSidebar, useSidebarStore } from '../_store/useSidebarStore';
const primaryNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: IconHome },
  { name: 'Updated', href: '/dashboard/updated', icon: IconCloudCheck },
  { name: 'Reading List', href: '/dashboard/reading-list', icon: IconBook },
];

// Section 2: Content management
const contentManagement = [
  { name: 'Bookmarks', href: '/dashboard/bookmarks', icon: IconBookmark },
  { name: 'History', href: '/dashboard/history', icon: IconClock },
  { name: 'Recommendations', href: '/dashboard/recommendations', icon: IconStar },
];

// Section 3: Settings and preferences
const settingsNavigation = [
  { name: 'Devices', href: '/dashboard/devices', icon: IconDevices },
  { name: 'Preferences', href: '/dashboard/preferences', icon: IconPalette },
  { name: 'Settings', href: '/dashboard/settings', icon: IconSettings },
];

export default function DashboardSidebar() {
  const { collapsed, isMobile } = useResponsiveSidebar();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOutAction();
  };

  return (
    <div
      className={`${isMobile ? 'hidden md:block' : collapsed ? 'w-16' : 'w-64'
        } bg-white dark:bg-gray-800 h-full transition-all duration-300 ease-in-out shadow-md relative`}
    >
      {/* Toggle button */}
      <button
        onClick={() => useSidebarStore.setState(state => ({ collapsed: !state.collapsed }))}
        className="absolute -right-3 top-10 bg-white dark:bg-gray-800 rounded-full p-1.5 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 z-20 border border-gray-200 dark:border-gray-700"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <IconChevronRight size={18} stroke={2} /> : <IconChevronLeft size={18} stroke={2} />}
      </button>

      {/* Logo */}
      <div className="flex items-center p-4 h-16 border-b border-gray-200 dark:border-gray-700">
        <div className={` ${collapsed ? 'text-xl' : 'flex w-full justify-start  gap-2'} font-bold text-purple-600 dark:text-purple-400`}>
          <div className={`w-8 h-8 ${!collapsed && 'mt-5'}`}>
            <Image src={Logo} alt={'logo'} />
          </div>
          {!collapsed && (
            <div className="flex items-center clip bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-4 ">
              <span className="text-[3rem]">X</span>
              <span className="ml-2 text-2xl font-bold tracking-wide" style={{ lineHeight: '3rem' }}>ianxu</span>
            </div>
          )}
        </div>
      </div>


      {/* Nav Items */}
      <nav className="mt-5 px-2 flex flex-col gap-6">
        {/* Section 1: Primary Navigation */}
        <div>
          <h3 className={`text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 ${collapsed ? 'text-center' : 'px-3'}`}>
            {!collapsed && 'Main'}
          </h3>
          <div className="space-y-1">
            {primaryNavigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${isActive
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-800/80 dark:text-purple-200'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-gray-700/70 dark:hover:text-purple-300'
                    } flex items-center py-2.5 px-3 rounded-md transition-all duration-200 group`}
                >
                  <item.icon />
                  {!collapsed && (
                    <span className="ml-3 text-sm font-medium">{item.name}</span>
                  )}
                  {collapsed && (
                    <span className="absolute left-full ml-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Section 2: Content Management */}
        <div>
          <h3 className={`text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 ${collapsed ? 'text-center' : 'px-3'}`}>
            {!collapsed && 'Library'}
          </h3>
          <div className="space-y-1">
            {contentManagement.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${isActive
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-800/80 dark:text-purple-200'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-gray-700/70 dark:hover:text-purple-300'
                    } flex items-center py-2.5 px-3 rounded-md transition-all duration-200 group`}
                >
                  <item.icon />
                  {!collapsed && (
                    <span className="ml-3 text-sm font-medium">{item.name}</span>
                  )}
                  {collapsed && (
                    <span className="absolute left-full ml-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Section 3: Settings and preferences */}
        <div>
          <h3 className={`text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 ${collapsed ? 'text-center' : 'px-3'}`}>
            {!collapsed && 'Settings'}
          </h3>
          <div className="space-y-1">
            {settingsNavigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${isActive
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-800/80 dark:text-purple-200'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-gray-700/70 dark:hover:text-purple-300'
                    } flex items-center py-2.5 px-3 rounded-md transition-all duration-200 group`}
                >
                  <item.icon />
                  {!collapsed && (
                    <span className="ml-3 text-sm font-medium">{item.name}</span>
                  )}
                  {collapsed && (
                    <span className="absolute left-full ml-2 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
                      {item.name}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
