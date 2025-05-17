'use client'

import { authenticateCode } from "@repo/auth";
import { useToastStore } from "@repo/ui/hooks/useToastStore";
import { useAuthModalStore } from "@store/useAuthModalStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const AuthBtn = () => {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const { openModal } = useAuthModalStore();
    const toast = useToastStore();
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    useEffect(() => {
        const code = searchParams.get('code')

        const handleCode = async (code: string) => {
            setIsAuthenticating(true);
            openModal('authenticating'); // Show authenticating modal

            try {
                const error = await authenticateCode(code)
                if (error) {
                    console.error('Error authenticating code:', error)
                    toast.error('Authentication Failed', error.message || 'Please try again');
                    openModal('login'); // Show login modal again on error
                } else {
                    toast.success('Authentication Successful', 'Welcome to your cultivation journey!');
                    openModal('success')
                }
            } catch (err) {
                console.error('Authentication process failed:', err)
                const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
                toast.error('Authentication Error', errorMessage);
                openModal('login');
            } finally {
                setIsAuthenticating(false);
                // Only replace the URL after authentication is complete
                router.replace(pathname)
            }
        }

        if (code) {
            handleCode(code)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    if (isAuthenticating) {
        return (
            <button
                disabled
                className="rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 px-7 py-3 text-base font-medium text-white shadow-md cursor-not-allowed"
            >
                AUTHENTICATING...
            </button>
        );
    }

    return (
        <button
            onClick={() => openModal('login')}
            className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 px-7 py-3 text-base font-medium text-white hover:from-purple-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
        >
            CULTIVATE
        </button>
    );
}

export default AuthBtn