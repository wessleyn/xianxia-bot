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
    {
        name: 'Dashboard',
        href: '/dashboard',
        icon: IconHome,
        description: 'View your personalized dashboard and overview'
    },
    {
        name: 'Updated',
        href: '/dashboard/updated',
        icon: IconCloudCheck,
        description: 'Check recently updated chapters and stories'
    },
    {
        name: 'Reading List',
        href: '/dashboard/reading-list',
        icon: IconBook,
        description: 'Manage your current reading list'
    },
];

export const contentManagement: NavItem[] = [
    {
        name: 'Bookmarks',
        href: '/dashboard/bookmarks',
        icon: IconBookmark,
        description: 'Access your saved bookmarks and favorite chapters'
    },
    {
        name: 'History',
        href: '/dashboard/history',
        icon: IconClock,
        description: 'View your reading history and previously visited content'
    },
    {
        name: 'Recommendations',
        href: '/dashboard/recommendations',
        icon: IconStar,
        description: 'Discover personalized story recommendations'
    },
];

export const settingsNavigation: NavItem[] = [
    {
        name: 'Devices',
        href: '/dashboard/devices',
        icon: IconDevices,
        description: 'Manage your connected devices and synchronization'
    },
    {
        name: 'Preferences',
        href: '/dashboard/preferences',
        icon: IconPalette,
        description: 'Customize your reading experience and theme settings'
    },
    {
        name: 'Settings',
        href: '/dashboard/settings',
        icon: IconSettings,
        description: 'Configure account settings and notification preferences'
    },
];
