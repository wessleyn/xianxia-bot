'use client'
import { useAuthModalStore } from '@store/useAuthModalStore'
import dynamic from 'next/dynamic'

const AuthModal = dynamic(() => import('../AuthModal'), { ssr: false })

const DynamicAuth = () => {
    const { isOpen } = useAuthModalStore()
    
    if (!isOpen) return null

    return (
        <AuthModal />
    )
}

export default DynamicAuth