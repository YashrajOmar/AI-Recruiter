// lib/actions/auth.action.js
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function getCurrentUser() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  try {
    // Get the session from Supabase
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) return null

    // Get user details
    const { data: { user } } = await supabase.auth.getUser()
    
    // If you need additional user data from your profiles table:
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    return {
      id: user.id,
      email: user.email,
      name: profile?.username || user.user_metadata?.name || user.email.split('@')[0],
      profileURL: profile?.avatar_url || user.user_metadata?.avatar_url || null
    }
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}