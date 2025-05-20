import createSupabaseClient from '@repo/auth/client';
import { Session, SupabaseClient, User } from '@supabase/supabase-js';
import { browser } from 'wxt/browser';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const supabase = createSupabaseClient({});

const WEB_APP_URL = import.meta.env.WXT_NEXT_PUBLIC;

export type LOGIN_STATUS = 'initaiting' | 'pending' | 'error' | 'success';

interface AuthState {
    loginStatus: LOGIN_STATUS;
    resetCodeIn: number;
    email: string | null;
    user: User | null;
    session: Session | null;
    supabase: SupabaseClient;
    setLoginStatus: (status: LOGIN_STATUS) => void;
    setResetCodeIn: (n: number) => void;
    setEmail: (email: string | null) => void;
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
            user: null,
            session: null,
            email: null,
            resetCodeIn: 50,
            supabase,
            loginStatus: 'initaiting',
            setLoginStatus: (status: LOGIN_STATUS) => {
                set({ loginStatus: status });
            },
            setResetCodeIn: (n: number) => {
                set({ resetCodeIn: n });
            },
            setEmail: (email: string | null) => {
                set({ email });
            },

            // Email OTP login
            login: async (email: string) => {
                try {
                    // Store the email in the state so it persists
                    set({ email });

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
                            loginStatus: 'success',
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
                set({ loginStatus: 'initaiting', user: null, session: null, email: null });
            },

            // Check for existing session
            checkSession: async () => {
                const { data: { session } } = await supabase.auth.getSession();
                if (session) {
                    set({
                        loginStatus: 'success',
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
                            loginStatus: 'success',
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
            name: 'auth-storage', partialize: (state: AuthState) => ({
                loginStatus: state.loginStatus,
                resetCodeIn: state.resetCodeIn,
                user: state.user,
                email: state.email,
                session: state.session
            })
        }
    )
);
