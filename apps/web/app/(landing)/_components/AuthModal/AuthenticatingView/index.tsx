'use client'

import { useAuthModalStore } from '@store/useAuthModalStore';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const AuthenticatingView = () => {
    const { setCanClose } = useAuthModalStore();
    const [animationDots, setAnimationDots] = useState('.');

    // Display toast notification when authentication starts
    useEffect(() => {
        toast.loading(
            'Authenticating your cultivation spirit...',
            { id: 'auth-loading', duration: Infinity }
        );

        // Clean up toast when component unmounts
        return () => {
            toast.dismiss('auth-loading');
        };
    }, []);

    // Disable closing the modal during authentication
    useEffect(() => {
        setCanClose(false);

        // Enable closing when unmounted
        return () => {
            setCanClose(true);
        };
    }, [setCanClose]);

    // Create animated dots for loading indicator
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimationDots(dots => {
                if (dots.length >= 3) return '.';
                return dots + '.';
            });
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center space-y-8 py-6">
            <div className="h-20 w-20">
                <div className="h-full w-full animate-spin rounded-full border-4 border-purple-200 border-t-purple-600 opacity-75"></div>
            </div>

            <div className="space-y-2 text-center">
                <h3 className="text-xl font-medium text-gray-800 dark:text-gray-200">
                    Ascending to Higher Realms
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                    Verifying your cultivation credentials{animationDots}
                </p>
            </div>

            <div className="mt-4 bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-100 dark:border-purple-800 max-w-sm">
                <p className="text-sm text-purple-700 dark:text-purple-300 text-center">
                    Please wait while we authenticate your spirit. This process cannot be interrupted.
                </p>
            </div>
        </div>
    );
};

export default AuthenticatingView;
