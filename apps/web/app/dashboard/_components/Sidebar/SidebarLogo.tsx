'use client';

import Image from 'next/image';
import Logo from '@assets/svg/monk-man.svg';
import { useResponsiveSidebar } from '../../_store/useSidebarStore';

export default function SidebarLogo() {
    const { collapsed } = useResponsiveSidebar();
    return (
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
    );
}
