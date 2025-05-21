'use server'

import { redirect } from 'next/navigation'
import { createClient } from './server'

export async function getCurrentUser() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return data.user
}

export async function getCurrentUserId() {
  const data = await getCurrentUser()
  return data.id
}

export async function logOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
}