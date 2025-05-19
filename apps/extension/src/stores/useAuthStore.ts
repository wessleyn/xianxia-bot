import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    isLoggedIn: boolean;
    user: {
        name: string;
        email: string;
        avatar?: string;
    } | null;
    login: (user: { name: string; email: string; avatar?: string }) => void;
    logout: () => void;
    toggleLoginState: () => void; // For demo purposes
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            isLoggedIn: false,
            user: null,
            login: (user) => set({ isLoggedIn: true, user }),
            logout: () => set({ isLoggedIn: false, user: null }),
            toggleLoginState: () =>
                set((state) => ({
                    isLoggedIn: !state.isLoggedIn,
                    user: state.isLoggedIn
                        ? null
                        : { name: 'User', email: 'user@example.com' }
                })),
        }),
        {
            name: 'auth-storage',
        }
    )
);
