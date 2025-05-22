'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useResponsiveSidebar } from '../../_store/useSidebarStore';

import React from 'react';
import { Tooltip } from 'react-tooltip';
export interface NavItem {
    name: string;
    href: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    description?: string; // Optional description for tooltip
}

interface NavSectionProps {
    title: string;
    items: NavItem[];
}

export default function NavSection({ title, items }: NavSectionProps) {
    const pathname = usePathname();
    const { collapsed } = useResponsiveSidebar();

    return (
        <div>
            <h3 className={`text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 ${collapsed ? 'text-center' : 'px-3'}`}>
                {!collapsed && title}
            </h3>

            <div className="space-y-1">
                {items.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                    return (
                        <React.Fragment key={item.name}>
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`${isActive
                                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-800/80 dark:text-purple-200'
                                    : 'text-gray-700 hover:bg-gray-100 hover:text-purple-600 dark:text-gray-200 dark:hover:bg-gray-700/70 dark:hover:text-purple-300'
                                    } ${item.name.split(" ")[0]} flex items-center py-2.5 px-3 rounded-md transition-all duration-200 group`}
                            >
                                <item.icon />
                                {
                                    !collapsed && (
                                        <span className="ml-3 text-sm font-medium">
                                            {item.name}
                                        </span>
                                    )
                                }
                            </Link>
                            {
                                collapsed && item.description && (
                                    <Tooltip
                                        anchorSelect={`.${item.name.split(" ")[0]}`}
                                        content={item.description}
                                    // place="left-end"
                                    />
                                )
                            }
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
}
