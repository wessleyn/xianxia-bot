import { createClient } from '@supabase/supabase-js';

export default function createSupabaseClient({ isWeb = false }) {

    if (isWeb) {
        return createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
    }
    return createClient(
        import.meta.env.WXT_SUPABASE_URL!,
        import.meta.env.WXT_SUPABASE_ANON_KEY!,
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true,
                storageKey: 'sb-auth-token'
            }
        }
    )
}