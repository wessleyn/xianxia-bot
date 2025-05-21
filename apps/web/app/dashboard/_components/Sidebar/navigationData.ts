'use client';

import {
    IconBook,
    IconBookmark,
    IconClock,
    IconCloudCheck,
    IconDevices,
    IconHome,
    IconPalette,
    IconSettings,
    IconStar
} from '@tabler/icons-react';
import { NavItem } from './NavSection';

export const primaryNavigation: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: IconHome },
    { name: 'Updated', href: '/dashboard/updated', icon: IconCloudCheck },
    { name: 'Reading List', href: '/dashboard/reading-list', icon: IconBook },
];

export const contentManagement: NavItem[] = [
    { name: 'Bookmarks', href: '/dashboard/bookmarks', icon: IconBookmark },
    { name: 'History', href: '/dashboard/history', icon: IconClock },
    { name: 'Recommendations', href: '/dashboard/recommendations', icon: IconStar },
];

export const settingsNavigation: NavItem[] = [
    { name: 'Devices', href: '/dashboard/devices', icon: IconDevices },
    { name: 'Preferences', href: '/dashboard/preferences', icon: IconPalette },
    { name: 'Settings', href: '/dashboard/settings', icon: IconSettings },
];
