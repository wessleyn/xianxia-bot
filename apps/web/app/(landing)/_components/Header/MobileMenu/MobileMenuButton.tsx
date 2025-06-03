'use client'

import { IconMenu2, IconX } from '@tabler/icons-react';

interface MobileMenuButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

const MobileMenuButton = ({
    isOpen,
    onClick
}: MobileMenuButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="rounded-full bg-gray-100 dark:bg-gray-700 p-3 text-gray-600 dark:text-gray-300 transition hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-purple-600 dark:hover:text-purple-400"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
        >
            <span className="sr-only">{isOpen ? 'Close menu' : 'Open menu'}</span>
            {isOpen ? (
                <IconX size={24} />
            ) : (
                <IconMenu2 size={24} />
            )}
        </button>
    )
}

export default MobileMenuButton