'use client'

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { User } from '@supabase/supabase-js';
import { IconLogout, IconSettings, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { Fragment } from 'react';

import { logOut } from '@repo/auth/utils';

const UserMenu = ({ user }: { user: User }) => {
    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className={({ open }) => `
                    flex items-center focus:outline-none
                    ${open ? 'ring-2 ring-purple-500 rounded-full' : ''}
                `}>
                    <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center text-purple-700 uppercase font-semibold">
                        {user?.email?.[0] || 'U'}
                    </div>
                </MenuButton>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-200 dark:divide-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-3">
                        <p className="text-sm text-gray-900 dark:text-gray-100">Signed in as</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user?.email || 'User'}</p>
                    </div>
                    <div className="py-1">
                        <MenuItem>
                            {({ focus }) => (
                                <Link href="/dashboard/profile" className={`${focus ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                                    } flex w-full items-center px-4 py-2 text-sm`}>
                                    <IconUser className="mr-3 h-5 w-5" aria-hidden="true" />
                                    Profile
                                </Link>
                            )}
                        </MenuItem>
                        <MenuItem>
                            {({ focus }) => (
                                <Link href="/dashboard/settings" className={`${focus ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                                    } flex w-full items-center px-4 py-2 text-sm`}>
                                    <IconSettings className="mr-3 h-5 w-5" aria-hidden="true" />
                                    Settings
                                </Link>
                            )}
                        </MenuItem>
                    </div>
                    <div>
                        <MenuItem>
                            {({ focus }) => (
                                <button
                                    onClick={async () => {
                                        await logOut();
                                    }}
                                    className={`${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                                        } text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white flex w-full items-center px-4 py-2 text-sm`}
                                >
                                    <IconLogout className="mr-3 h-5 w-5" aria-hidden="true" />
                                    Sign out
                                </button>
                            )}
                        </MenuItem>
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
    );
}

export default UserMenu