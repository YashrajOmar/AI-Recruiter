"use client"

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { AlignCenter } from 'lucide-react'
import { supabase } from '@/services/supabaseClient'
function Login() {

    /**
     * use to sign in with google
     */
    const signInWithGoogle=async()=>{
        const {error}=await supabase.auth.signInWithOAuth({
            provider:'google'
        })

        if(error)
        {
            console.error('Error:', error.message)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center
        h-screen'>
            <div className='flex items-center flex-col border rounded-2xl p-8'>
                <Image src = {'/logo.png'} alt='logo'
                    width = {1200}
                    height = {100}
                    className='w-[580px]'
                    />
                    <h2 className='text-2xl font-bold text-center mt-5'>Welcome to AI Recruiter</h2>
                    <h1 className='glow-heading'>
                        THE FUTURE OF INTERVIEWS
                    </h1>
                    <p className='text-gray-500 text-center'>Sign In with Google Authentication</p>
                    <Button className='w-full'
                    onClick={signInWithGoogle}
                    > Login with Google</Button>
            </div>
        </div>
    )
}

export default Login