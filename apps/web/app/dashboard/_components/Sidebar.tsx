'use client';

import { signOutAction } from '@repo/auth';
import { User } from '@supabase/supabase-js';
import {
  IconBook,
  IconChevronLeft,
  IconChevronRight,
  IconClock,
  IconHome,
  IconLogout,
  IconSettings,
  IconStar
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '../../_assets/monk-man.svg';
import { useResponsiveSidebar, useSidebarStore } from '../_store/useSidebarStore';
const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: IconHome },
  { name: 'Reading List', href: '/dashboard/reading-list', icon: IconBook },
  { name: 'History', href: '/dashboard/history', icon: IconClock },
  { name: 'Recommendations', href: '/dashboard/recommendations', icon: IconStar },
  { name: 'Settings', href: '/dashboard/settings', icon: IconSettings },
];

interface SidebarProps {
  user: User | null;
}

export default function DashboardSidebar({ user }: SidebarProps) {
  const { collapsed, isMobile } = useResponsiveSidebar();
  const pathname = usePathname();

  const handleSignOut = async () => {
    await signOutAction();
    // The redirect will be handled by the signOutAction
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
      <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
        <div className={`${collapsed ? 'text-xl' : 'flex gap-2'} font-bold text-purple-600 dark:text-purple-400`}>
          <div className="w-8 h-8">
            <Image src={Logo} alt={'logo'} />
          </div>
          {!collapsed && 'Xianxu'}
        </div>
      </div>

      {/* Nav Items */}
      <nav className="mt-5 px-2">
        <div className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`${isActive
                  ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
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
      </nav>

      {/* User Profile and Logout */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-700 py-3 px-4">
        {!collapsed ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 uppercase font-semibold">
                Clubber
              </div>
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                  {user?.email?.[0] || 'U'}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex items-center"
            >
              <span className="mr-1">Logout</span>
              <IconLogout size={20} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-3">
            <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 uppercase font-semibold">
              {user?.email?.[0] || 'U'}
            </div>
            <button
              onClick={handleSignOut}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <IconLogout size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
