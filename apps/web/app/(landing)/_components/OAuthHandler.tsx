'use client';

import { authenticateCode } from "@repo/auth";
import { useAuthModalStore } from "@store/useAuthModalStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast } from 'react-hot-toast';

const OAuthHandler = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const { openModal, setIsAuthenticated } = useAuthModalStore();

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
                    toast.error(`Authentication Failed: Invalid Session.\nPlease try again.`);
                    openModal('login');
                } else {
                    // Authentication was successful
                    toast.success('Authentication Successful.\nWelcome to your cultivation journey!');

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
                toast.error(`An unexpected error occurred.\nPlease Contact Support, if the issue persists.`);
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
