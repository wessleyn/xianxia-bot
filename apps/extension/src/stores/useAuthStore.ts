import createSupabaseClient from '@repo/auth/client';
import { Session, SupabaseClient, User } from '@supabase/supabase-js';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const supabase = createSupabaseClient({})
interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    session: Session | null;
    supabase: SupabaseClient;
    login: (email: string) => Promise<{ error: any | null; data: any | null }>;
    verifyOtp: (email: string, token: string) => Promise<{ error: any | null; data: any | null }>;
    loginWithGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    checkSession: () => Promise<Session | null>;
    getUser: () => Promise<User | null>;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            isLoggedIn: false,
            user: null,
            session: null,
            supabase,

            // Email OTP login
            login: async (email: string) => {
                try {
                    const { data, error } = await supabase.auth.signInWithOtp({
                        email,
                        options: {
                            emailRedirectTo: window.location.origin,
                        },
                    });

                    return { data, error };
                } catch (error) {
                    return { data: null, error };
                }
            },

            // Verify OTP token
            verifyOtp: async (email: string, token: string) => {
                try {
                    const { data, error } = await supabase.auth.verifyOtp({
                        email,
                        token,
                        type: 'email',
                    });

                    if (!error && data.session) {
                        set({
                            isLoggedIn: true,
                            user: data.user,
                            session: data.session
                        });
                    }

                    return { data, error };
                } catch (error) {
                    return { data: null, error };
                }
            },

            // OAuth with Google
            loginWithGoogle: async () => {
                await supabase.auth.signInWithOAuth({
                    provider: 'google',
                    options: {
                        redirectTo: window.location.origin,
                    },
                });
            },

            // Sign out
            logout: async () => {
                await supabase.auth.signOut();
                set({ isLoggedIn: false, user: null, session: null });
            },

            // Check for existing session
            checkSession: async () => {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    set({
                        isLoggedIn: true,
                        user: session.user,
                        session
                    });
                }
                return session;
            },

            // Get current user
            getUser: async () => {
                const { data: { user } } = await supabase.auth.getUser();
                if (user) {
                    set({ user });
                }
                return user;
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({
                isLoggedIn: state.isLoggedIn,
                user: state.user,
                session: state.session
            }),
        }
    )
);
