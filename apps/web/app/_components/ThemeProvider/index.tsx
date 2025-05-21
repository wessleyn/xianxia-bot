'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { PropsWithChildren } from 'react';

export default function ThemeProvider({ children }: PropsWithChildren) {
    return (
        <NextThemesProvider defaultTheme="system" enableSystem>
            {children}
        </NextThemesProvider>
    );
}