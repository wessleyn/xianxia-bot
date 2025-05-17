'use client';

import { useEffect } from 'react';
import { create } from 'zustand';

interface SidebarState {
    collapsed: boolean;
    isMobile: boolean;
    setCollapsed: (collapsed: boolean) => void;
    toggleCollapsed: () => void;
    initializeResponsive: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
    collapsed: false,
    isMobile: false,

    setCollapsed: (collapsed) => set({ collapsed }),

    toggleCollapsed: () => set((state) => ({ collapsed: !state.collapsed })),

    initializeResponsive: () => {
        const checkScreenSize = () => {
            if (typeof window === 'undefined') return;

            if (window.innerWidth < 768) {
                set({ collapsed: true, isMobile: true });
            } else if (window.innerWidth < 1024) {
                set({ collapsed: true, isMobile: false });
            } else {
                set({ collapsed: false, isMobile: false });
            }
        };

        // Initial check
        checkScreenSize();

        // Add resize event listener
        window.addEventListener('resize', checkScreenSize);

        // Note: We can't return a cleanup function from this method
        // The caller should handle cleanup if needed
    }
}));

// A hook to initialize responsive behavior with auto-cleanup
export function useResponsiveSidebar() {
    const { initializeResponsive } = useSidebarStore();

    // Set up responsive behavior on component mount
    useEffect(() => {
        initializeResponsive();

        // Cleanup function for the resize event listener
        return () => {
            if (typeof window !== 'undefined') {
                const checkScreenSize = () => {
                    if (window.innerWidth < 768) {
                        useSidebarStore.setState({ collapsed: true, isMobile: true });
                    } else if (window.innerWidth < 1024) {
                        useSidebarStore.setState({ collapsed: true, isMobile: false });
                    } else {
                        useSidebarStore.setState({ collapsed: false, isMobile: false });
                    }
                };

                window.removeEventListener('resize', checkScreenSize);
            }
        };
    }, [initializeResponsive]);

    return useSidebarStore();
}
