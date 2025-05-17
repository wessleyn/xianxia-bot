'use client';

import { createProfile } from '@repo/db/queries';
import { useToastStore } from '@repo/ui/hooks/useToastStore';
import { useAuthModalStore } from '@store/useAuthModalStore';
import { useState } from 'react';

const ProfileView = () => {
    const { setView, setName, userId } = useAuthModalStore();
    const [nameInput, setNameInput] = useState('');
    const [useConcealmentCloak, setUseConcealmentCloak] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToastStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nameInput && !useConcealmentCloak) {
            toast.error('Name required', 'Please provide a name or use the concealment cloak option');
            return;
        }

        setIsLoading(true);

        try {
            if (!userId) {
                toast.error('Authentication error', 'User ID not found. Please try signing in again.');
                return;
            }

            if (!useConcealmentCloak) {
                await createProfile(userId, nameInput);
                setName(nameInput);
            } else {
                await createProfile(userId, '', true);
            }

            toast.success('Profile updated', 'Your cultivation journey awaits!');

            // Move to success view
            setView('success');
            setIsLoading(false);
        } catch (error) {
            console.log(error)
            setIsLoading(false);
            toast.error('Profile update failed', 'An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="space-y-6">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                Welcome, new cultivator! How shall we address you on your journey?
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Cultivator Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        placeholder="Enter your true name"
                        disabled={useConcealmentCloak}
                        className={`mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm placeholder-gray-400 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 ${useConcealmentCloak ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                    />
                </div>

                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input
                            id="cloak"
                            name="cloak"
                            type="checkbox"
                            checked={useConcealmentCloak}
                            onChange={() => setUseConcealmentCloak(!useConcealmentCloak)}
                            className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="cloak" className="font-medium text-gray-700 dark:text-gray-300">
                            Use Concealment Cloak
                        </label>
                        <p className="text-gray-500 dark:text-gray-400">
                            Remain anonymous on your cultivation journey
                        </p>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isLoading || (!nameInput && !useConcealmentCloak)}
                    className={`w-full rounded-md bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all ${isLoading || (!nameInput && !useConcealmentCloak) ? 'opacity-70 cursor-not-allowed' : ''
                        }`}
                >
                    {isLoading ? 'Creating identity...' : 'Continue Your Journey'}
                </button>
            </form>
        </div>
    );
};

export default ProfileView;
