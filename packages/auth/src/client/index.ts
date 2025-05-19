import { createClient } from '@supabase/supabase-js';

export default function createSupabaseClient({ isNative = false }) {

    if (isNative) {
        return createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
    }
    // Else its web extension
    return createClient(
        import.meta.env.WXT_SUPABASE_URL!,
        import.meta.env.WXT_SUPABASE_ANON_KEY!
    )
}