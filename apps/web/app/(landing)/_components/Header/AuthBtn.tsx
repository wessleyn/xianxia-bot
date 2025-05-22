'use client'

import { hasActiveSession } from "@repo/auth/utils"
import { useAuthModalStore } from "@store/useAuthModalStore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const AuthBtn = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const { openModal } = useAuthModalStore()
    const router = useRouter()

    useEffect(() => {
        const fetchSession = async () => { 
            const hasSession = await hasActiveSession()
            if (hasSession) router.prefetch('/dashboard')
            setIsLoggedIn(hasSession)

        }

        fetchSession()
    }, [router])

    const handleClick = () => {
        if (isLoggedIn) {
            // Navigate to dashboard if logged in
            router.push('/dashboard')
        } else {
            // Open login modal if not logged in
            openModal('login')
        }
    }

    return (
        <button
            onClick={handleClick}
            className={`rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 px-7 py-3 text-base font-medium text-white hover:from-purple-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg`}
        >
            { isLoggedIn ? 'CULTIVATE' : 'ENROLL'}
        </button>
    )
}

export default AuthBtn