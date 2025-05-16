'use client';

import { create } from 'zustand';
import { ToastStatus } from '../../components/Toast/index';

interface ToastState {
    isVisible: boolean;
    status: ToastStatus;
    title?: string;
    description?: string;
    duration: number;
}

interface ToastActions {
    showToast: (options: Partial<ToastState>) => void;
    hideToast: () => void;
    success: (title: string, description?: string) => void;
    error: (title: string, description?: string) => void;
    info: (title: string, description?: string) => void;
    warning: (title: string, description?: string) => void;
    sent: (title: string, description?: string) => void;
    notification: (title: string, description?: string) => void;
}

const DEFAULT_DURATION = 5000;

export const useToastStore = create<ToastState & ToastActions>((set) => ({
    isVisible: false,
    status: 'info',
    title: '',
    description: '',
    duration: DEFAULT_DURATION,

    showToast: (options) => set((state) => ({
        ...state,
        ...options,
        isVisible: true
    })),

    hideToast: () => set((state) => ({ ...state, isVisible: false })),

    success: (title: string, description?: string) => set({
        isVisible: true,
        status: 'success',
        title,
        description,
        duration: DEFAULT_DURATION
    }),

    error: (title: string, description?: string) => set({
        isVisible: true,
        status: 'error',
        title,
        description,
        duration: DEFAULT_DURATION
    }),

    info: (title: string, description?: string) => set({
        isVisible: true,
        status: 'info',
        title,
        description,
        duration: DEFAULT_DURATION
    }),

    warning: (title: string, description?: string) => set({
        isVisible: true,
        status: 'warning',
        title,
        description,
        duration: DEFAULT_DURATION
    }),

    sent: (title: string, description?: string) => set({
        isVisible: true,
        status: 'sent',
        title,
        description,
        duration: DEFAULT_DURATION
    }),

    notification: (title: string, description?: string) => set({
        isVisible: true,
        status: 'notification',
        title,
        description,
        duration: DEFAULT_DURATION
    }),
}));
