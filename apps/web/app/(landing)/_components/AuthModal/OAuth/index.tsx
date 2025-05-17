'use client'

import { signInWithGoogle, signInWithSlack } from '@repo/auth';
import { useToastStore } from '@repo/ui/hooks/useToastStore';
import { IconBrandGoogle, IconBrandSlack } from '@tabler/icons-react';
import { useState } from 'react';

const OAuth = () => {
    const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);
    const [isLoadingSlack, setIsLoadingSlack] = useState(false);
    const toast = useToastStore();

    const handleAuth = async (provider: 'google' | 'slack') => {
        if (provider === 'google') {
            setIsLoadingGoogle(true);
            const { error } = await signInWithGoogle();
            if (error) {
                setIsLoadingGoogle(false);
                toast.error('Google login failed', error.message);
            }
        } else {
            setIsLoadingSlack(true);
            const { error } = await signInWithSlack();
            if (error) {
                setIsLoadingSlack(false);
                toast.error('Slack login failed', error.message);
            }
        }
    };

    return (
        <div className="grid grid-cols-2 gap-3">
            <button
                type="button"
                onClick={() => handleAuth('google')}
                disabled={isLoadingGoogle || isLoadingSlack}
                className={`flex w-full items-center justify-center gap-3 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-all ${(isLoadingGoogle || isLoadingSlack) ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                <IconBrandGoogle className="h-5 w-5" />
                {isLoadingGoogle ? 'Connecting...' : 'Google'}
            </button>

            <button
                onClick={() => handleAuth('slack')}
                type="button"
                disabled={isLoadingGoogle || isLoadingSlack}
                className={`flex w-full items-center justify-center gap-3 rounded-md bg-white dark:bg-gray-800 px-3 py-2 text-sm font-semibold text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none transition-all ${(isLoadingGoogle || isLoadingSlack) ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
                <IconBrandSlack className="h-5 w-5" />
                {isLoadingSlack ? 'Connecting...' : 'Slack'}
            </button>
        </div>
    )
}

export default OAuth