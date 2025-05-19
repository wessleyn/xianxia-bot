import { IconDownload, IconLogin, IconLogout, IconSettings } from '@tabler/icons-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../../../../../stores/useAuthStore';
import UserAvatar from './UserAvatar';

const NavigationMenu: React.FC = () => {
    const { isLoggedIn, toggleLoginState: toggleLogin, user } = useAuthStore();
    return (
        <div className="py-1">
            {isLoggedIn && (
                <div className="px-4 py-2 border-b dark:border-gray-700">
                    <div className="flex items-center">
                        <UserAvatar size="md" />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">User</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">user@example.com</p>
                        </div>
                    </div>
                </div>
            )}

            <Link
                to="/downloads"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <div className="flex items-center">
                    <IconDownload size={16} className="mr-2" stroke={2} />
                    Downloads
                </div>
            </Link>

            <Link
                to="/"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <div className="flex items-center">
                    <IconSettings size={16} className="mr-2" stroke={2} />
                    Settings
                </div>
            </Link>

            {isLoggedIn && (
                <button
                    onClick={toggleLogin}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <div className="flex items-center">
                        <IconLogout size={16} className="mr-2" stroke={2} />
                        Logout
                    </div>
                </button>
            )}

            {!isLoggedIn && (
                <Link
                    to="/login"
                    className="block w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                    <div className="flex items-center">
                        <IconLogin size={16} className="mr-2" stroke={2} />
                        Login
                    </div>
                </Link>
            )}
        </div>
    );
};

export default NavigationMenu;
