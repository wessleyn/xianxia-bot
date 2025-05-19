'use client';

import { useAuthModalStore } from '@store/useAuthModalStore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const SuccessView = () => {
    const { name, redirectUrl, closeModal, isNew, setIsAuthenticated } = useAuthModalStore();
    const router = useRouter();
    const [countdown, setCountdown] = useState(3);

    // Prefetch the route we'll redirect to
    useEffect(() => {
        // Prefetch the route immediately when component mounts
        router.prefetch(redirectUrl);
    }, [router, redirectUrl]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(interval);
                    // Move state updates outside the setState callback
                    setTimeout(() => {
                        setIsAuthenticated(false);
                        closeModal();
                        router.push(redirectUrl);
                    }, 0);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [closeModal, redirectUrl, router, setIsAuthenticated]);

    return (
        <div className="space-y-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <svg
                    className="h-6 w-6 text-green-600 dark:text-green-300"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>

            <h3 className="text-center text-lg font-medium text-gray-900 dark:text-white">
                Authentication Successful
            </h3>

            <div className="mt-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isNew
                        ? `Welcome to the path of cultivation, ${name ? name : 'new cultivator'}!`
                        : `Welcome back to your journey, ${name ? name : 'cultivator'}!`}
                </p>
            </div>

            <div className="mt-5 sm:mt-6">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                    <span className="text-lg font-medium text-purple-600 dark:text-purple-300">
                        {countdown}
                    </span>
                </div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Redirecting to your cultivation realm...
                </p>
            </div>
        </div>
    );
};

export default SuccessView;
