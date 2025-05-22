'use client'

import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { IconBrandChrome, IconBrandEdge, IconBrandFirefox, IconPuzzle } from '@tabler/icons-react';
import Link from 'next/link';
import { Fragment } from 'react';

const extensions = [
    {
        name: 'Chrome',
        href: 'https://chrome.google.com/webstore/detail/xianxu',
        icon: (
            <IconBrandChrome />
        )
    },
    {
        name: 'Firefox',
        href: 'https://addons.mozilla.org/firefox/addon/xianxu',
        icon: (
            <IconBrandFirefox />
        )
    },
    {
        name: 'Edge',
        href: 'https://microsoftedge.microsoft.com/addons/detail/xianxu',
        icon: (
            <IconBrandEdge />
        )
    }
];
export const ExtensionDropdown = () => {

    return (
        <Popover className="relative">
            {() => (
                <>
                    <PopoverButton
                        className="Button alt border-2 border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 px-4 py-2 rounded-full font-medium transition-all text-sm whitespace-nowrap flex items-center gap-2"
                    >
                        <IconPuzzle className="w-4 h-4" />
                        <span>Extension</span>
                    </PopoverButton>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 -translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 -translate-y-1"
                    >
                        <PopoverPanel className="absolute z-10 bottom-12 transform -translate-x-1/3 left-1/2">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="bg-white dark:bg-gray-800 p-1">
                                    {extensions.map((extension) => (
                                        <Link
                                            key={extension.name}
                                            href={extension.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 px-4 py-3 rounded-md transition-colors hover:bg-purple-50 dark:hover:bg-purple-900/30"
                                        >
                                            <span className="flex-shrink-0 text-purple-600 dark:text-purple-400">
                                                {extension.icon}
                                            </span>
                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{extension.name}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </PopoverPanel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

