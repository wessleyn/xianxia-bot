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
    const { openModal, isFromExtension, setIsAuthenticated, setIsFromExtension } = useAuthModalStore();
    const toast = useToastStore();

    // const extParam = searchParams.get('ext');

    // This runs only once on component mount to avoid repeated state updates
    // useEffect(() => {
    //     if (extParam === 'true') {
    //         console.log('OAuthHandler detected ext=true in URL params, setting isFromExtension to true');
    //         setIsFromExtension(true);
    //     }
    // }, [extParam, setIsFromExtension]);

    useEffect(() => {
        const code = searchParams.get('code');


        const handleCode = async (code: string) => {
            // Get the extension status directly from URL param for consistency
            // const fromExtension = extParam === 'true';

            // console.log('OAuthHandler processing auth code with fromExtension =', fromExtension);

            // Always show authenticating modal first
            openModal('authenticating');

            try {
                // Authenticate the code
                const error = await authenticateCode(code);

                if (error) {
                    // Handle authentication error
                    console.error('Error authenticating code:', error);
                    toast.error('Authentication Failed', error.message || 'Please try again');
                    openModal('login');
                } else {
                    // Authentication was successful
                    toast.success('Authentication Successful', 'Welcome to your cultivation journey!');

                    // Set authenticated state
                    setIsAuthenticated(true);

                    // console.log('Authentication successful, fromExtension =', fromExtension);

                    // Use timeout to ensure state updates are processed
                    setTimeout(() => {
                        // Open the appropriate view based on whether this is from extension
                        // if (fromExtension) {
                        //     console.log('Opening extension modal view');
                        //     openModal('extension');
                        // } else {
                            console.log('Opening success modal view');
                            openModal('success');
                        // }//////
                    }, 10);
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
