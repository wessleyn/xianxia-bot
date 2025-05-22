'use client';

import { signOutAction } from '@repo/auth';
import { IconLogout } from '@tabler/icons-react';

interface LogoutButtonProps {
    collapsed: boolean;
}

export default function LogoutButton({ collapsed }: LogoutButtonProps) {
    const handleSignOut = async () => {
        await signOutAction();
    };

    return (
        <div className={`
      mt-auto
      border-t border-gray-200 dark:border-gray-700 
      py-3 px-4 
      ${collapsed ? 'flex justify-center' : 'flex justify-end'}
    `}>
            <button
                onClick={handleSignOut}
                className={`
          text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-300
          ${collapsed
                        ? 'p-2 hover:bg-gray-100 dark:hover:bg-gray-700/70 rounded-full transition-colors'
                        : 'flex items-center'
                    }
        `}
                aria-label="Logout"
            >
                {!collapsed && <span className="mr-2">Logout</span>}
                <IconLogout size={20} />
            </button>
        </div>
    );
}
