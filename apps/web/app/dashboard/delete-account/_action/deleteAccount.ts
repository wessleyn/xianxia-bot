'use server'

import createSupabaseClient from "@repo/auth/client"
import { getCurrentUser } from "@repo/auth/utils"

const supabase = createSupabaseClient({ isWeb: true })
export default async function deleteAccount() { 
    const auth = await getCurrentUser()
    const { error } = await supabase.auth.admin.deleteUser(auth.id)
    if (error) {
        throw new Error(error.message)
    }
    return true

}