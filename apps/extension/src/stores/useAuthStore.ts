import createSupabaseClient from '@repo/auth/client';
import { Session, SupabaseClient, User } from '@supabase/supabase-js';
import { browser } from 'wxt/browser';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const supabase = createSupabaseClient({});

const WEB_APP_URL = import.meta.env.WXT_NEXT_PUBLIC;

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
    session: Session | null;
    supabase: SupabaseClient;
    login: (email: string) => Promise<{ error: any | null; data: any | null }>;
    verifyOtp: (email: string, token: string) => Promise<{ error: any | null; data: any | null }>;
    loginWithGoogle: () => Promise<void>;
    loginWithSlack: () => Promise<void>;
    logout: () => Promise<void>;
    checkSession: () => Promise<Session | null>;
    getUser: () => Promise<User | null>;
    syncCookieSession: () => Promise<boolean>;
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
                try {
                    await browser.tabs.create({
                        url: `${WEB_APP_URL}/login?ext=true&provider=google`,
                        active: true
                    });
                } catch (error) {
                    console.error('Failed to open Google auth tab:', error);
                }
            },
            
            // OAuth with Slack
            loginWithSlack: async () => {
                try {
                    await browser.tabs.create({
                        url: `${WEB_APP_URL}/login?ext=true&provider=slack`,
                        active: true
                    });
                } catch (error) {
                    console.error('Failed to open Slack auth tab:', error);
                }
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
            },
            
            // Sync session with cookie (for web extension integration)
            syncCookieSession: async () => {
                try {
                    // Get session directly from Supabase which will use cookies
                    const { data: { session } } = await supabase.auth.getSession();
                    
                    if (session) {
                        set({
                            isLoggedIn: true,
                            user: session.user,
                            session
                        });
                        console.log('Synced session from cookies');
                        return true;
                    }
                } catch (error) {
                    console.error('Error syncing session:', error);
                }
                return false;
            }
        }),
        {
            name: 'auth-storage',
            partialize: (state: AuthState) => ({
                isLoggedIn: state.isLoggedIn,
                user: state.user,
                session: state.session
            })
        }
    )
);
