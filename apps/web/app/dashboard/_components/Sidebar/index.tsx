'use client';

import { useResponsiveSidebar } from '../../_store/useSidebarStore';
import { contentManagement, primaryNavigation, settingsNavigation } from './navigationData';
import NavSection from './NavSection';
import SidebarLogo from './SidebarLogo';

export default function DashboardSidebar() {
  const { collapsed, isMobile } = useResponsiveSidebar();

  return (
    <div
      className={`
        ${isMobile ? 'hidden md:block' : collapsed ? 'w-16' : 'w-64'}
        bg-white dark:bg-gray-800 h-full transition-all duration-300 ease-in-out shadow-md 
        flex flex-col gap-2
      `}
    >
      {/* Logo */}
      <SidebarLogo />

      {/* Nav Items */}
      <nav className="px-2 flex flex-col gap-6 flex-grow">
        {/* Section 1: Primary Navigation */}
        <NavSection title="Main" items={primaryNavigation} />

        {/* Section 2: Content Management */}
        <NavSection title="Library" items={contentManagement} />

        {/* Section 3: Settings and preferences */}
        <NavSection title="Settings" items={settingsNavigation} />

      </nav>
    </div>
  );
}
