'use client';

import { IconBrandApple, IconBrandGooglePlay, IconDeviceMobile } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export const MobileAppDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="Button alt border-2 border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 px-4 py-2 rounded-full font-medium transition-all text-sm whitespace-nowrap flex items-center gap-2"
            >
                <IconDeviceMobile className="w-4 h-4" />
                
                <span>Mobile App</span>
            </button>

            {isOpen && (
                <div className="absolute bottom-full mb-2 w-60 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 overflow-hidden">
                    <div className="p-2">
                        <Link
                            href="https://play.google.com/store/apps/details?id=app.xianxu"
                            className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsOpen(false)}
                        >
                            <IconBrandGooglePlay size={20} className="mr-2 text-green-600 dark:text-green-400" />
                            <span className="text-gray-700 dark:text-gray-200">Google Play Store</span>
                        </Link>

                        <Link
                            href="https://apps.apple.com/app/xianxu"
                            className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsOpen(false)}
                        >
                            <IconBrandApple size={20} className="mr-2 text-gray-600 dark:text-gray-400" />
                            <span className="text-gray-700 dark:text-gray-200">Apple App Store</span>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};
