'use client';

import { signOutAction } from '@repo/auth';
import { IconLogout } from '@tabler/icons-react';
import Image from 'next/image';
import Logo from '../../../_assets/monk-man.svg';
import { useResponsiveSidebar } from '../../_store/useSidebarStore';
import { contentManagement, primaryNavigation, settingsNavigation } from './navigationData';
import NavSection from './NavSection';

export default function DashboardSidebar() {
  const { collapsed, isMobile } = useResponsiveSidebar();

  const handleSignOut = async () => {
    await signOutAction();
  };

  return (
    <div
      className={`
        ${isMobile ? 'hidden md:block' : collapsed ? 'w-16' : 'w-64'}
        bg-white dark:bg-gray-800 h-full transition-all duration-300 ease-in-out shadow-md 
        flex flex-col gap-2
      `}
    >
      {/* Logo */}
      <div className="flex items-center p-4 h-16 border-b border-gray-200 dark:border-gray-700">
        <div className={`${collapsed ? 'text-xl' : 'flex w-full justify-start gap-2'} font-bold text-purple-600 dark:text-purple-400`}>
          <div className={`w-8 h-8 ${!collapsed && 'mt-5'}`}>
            <Image src={Logo} alt="logo" />
          </div>
          {!collapsed && (
            <div className="flex items-center clip bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-400">
              <span className="text-[3rem]">X</span>
              <span className="ml-2 text-2xl font-bold tracking-wide" style={{ lineHeight: '3rem' }}>ianxu</span>
            </div>
          )}
        </div>
      </div>

      {/* Nav Items */}
      <nav className="mt-5 px-2 flex flex-col gap-6 flex-grow">
        {/* Section 1: Primary Navigation */}
        <NavSection title="Main" items={primaryNavigation} />

        {/* Section 2: Content Management */}
        <NavSection title="Library" items={contentManagement} />

        {/* Section 3: Settings and preferences */}
        <NavSection title="Settings" items={settingsNavigation} />

        {/* Logout Button */}
        <div className={`
          mt-auto
          border-t border-gray-200 dark:border-gray-700 
          py-3 px-4 
          ${collapsed ? 'flex justify-center' : 'flex justify-end'}
        `}>
          <button
            onClick={handleSignOut}
            className={`
              text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-300
              ${collapsed
                ? 'p-2 hover:bg-gray-100 dark:hover:bg-gray-700/70 rounded-full transition-colors'
                : 'flex items-center'
              }
            `}
            aria-label="Logout"
          >
            {!collapsed && <span className="mr-2">Logout</span>}
            <IconLogout size={20} />
          </button>
        </div>
      </nav>
    </div>
  );
}
