'use client';

import {
    IconBook,
    IconBookmark,
    IconClock,
    IconDevices,
    IconHome,
    IconPalette,
    IconSettings,
    IconStar,
    IconWorldWww
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
        name: 'Sources',
        href: '/dashboard/sources',
        icon: IconWorldWww,
        description: 'View your subscribed sources and content feeds'
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
