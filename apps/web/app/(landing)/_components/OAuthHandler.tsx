'use client';

import { authenticateCode } from "@repo/auth";
import { useToastStore } from "@repo/ui/hooks/useToastStore";
import { useAuthModalStore } from "@store/useAuthModalStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const OAuthHandler = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { openModal } = useAuthModalStore();
    const toast = useToastStore();

    useEffect(() => {
        const code = searchParams.get('code');

        const handleCode = async (code: string) => {
            openModal('authenticating'); // Show authenticating modal

            try {
                const error = await authenticateCode(code);
                if (error) {
                    console.error('Error authenticating code:', error);
                    toast.error('Authentication Failed', error.message || 'Please try again');
                    openModal('login'); // Show login modal again on error
                } else {
                    toast.success('Authentication Successful', 'Welcome to your cultivation journey!');
                    openModal('success');
                }
            } catch (err) {
                console.error('Authentication process failed:', err);
                const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
                toast.error('Authentication Error', errorMessage);
                openModal('login');
            } finally {
                // Only replace the URL after authentication is complete
                router.replace(pathname);
            }
        };

        if (code) {
            handleCode(code);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]);

    // This component doesn't render anything visible
    return null;
};

export default OAuthHandler;
