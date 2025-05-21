'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useResponsiveSidebar } from '../../_store/useSidebarStore';

export interface NavItem {
    name: string;
    href: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
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
    );
}
