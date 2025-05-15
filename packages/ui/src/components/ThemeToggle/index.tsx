'use client';

import { IconMoon, IconSun } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeToggler() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return <div className="w-8 h-8"></div>; // Placeholder to prevent layout shift
    }

    return (
        <button
            aria-label="Toggle Dark Mode"
            className="w-8 h-8 flex items-center justify-center bg-transparent rounded-full transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
            {theme === 'dark' ? (
                // Sun icon for dark mode
                <IconSun />
            ) : (
                // Moon icon for light mode
                <IconMoon />
            )}
        </button>
    );
}
