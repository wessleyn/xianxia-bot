import { supabase } from '@constants/supabase'
import { Session, User } from '@supabase/supabase-js'
import { create } from 'zustand'

type AccountStore = {
    session: Session | null
    user: User | null
    isLoggedIn: boolean
    setSession: (session: Session | null) => void
    setUser: (user: User | null) => void
    logout: () => Promise<void>
}

export const useAccountStore = create<AccountStore>((set) => ({
    session: null,
    user: null,
    isLoggedIn: false,
    setSession: (session) => set({
        session,
        isLoggedIn: !!session,
        user: session?.user || null
    }),
    setUser: (user) => set({
        user,
        isLoggedIn: !!user
    }),
    logout: async () => {
        await supabase.auth.signOut()
        set({ session: null, user: null, isLoggedIn: false })
    }
}))