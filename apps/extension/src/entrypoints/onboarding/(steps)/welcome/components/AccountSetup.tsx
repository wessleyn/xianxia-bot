import { IconLogin, IconUser, IconUserPlus } from '@tabler/icons-react';
import React from 'react';

const AccountSetup: React.FC = () => {
    return (
        <section className="mb-8 bg-[var(--color-card)] dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-card-foreground)] dark:text-gray-100">Account Setup</h2>
            <div className="flex items-start space-x-4">
                <div className="bg-[var(--color-accent)] dark:bg-purple-600 p-3 rounded-full">
                    <IconUser className="h-6 w-6 text-[var(--color-background)] dark:text-gray-200" />
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-2 text-[var(--color-card-foreground)] dark:text-gray-100">Why Login Matters</h3>
                    <p className="mb-3 text-[var(--color-card-foreground)] dark:text-gray-200">
                        Logging in to your account allows you to:
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-2 text-[var(--color-card-foreground)] dark:text-gray-200">
                        <li>Sync your reading progress across devices</li>
                        <li>Save your favorite novels and chapters</li>
                        <li>Access personalized recommendations</li>
                        <li>Get updates on new chapters from your favorite series</li>
                    </ul>
                    <div className="flex space-x-4">
                        <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] dark:bg-purple-600 dark:hover:bg-purple-700 text-[var(--color-background)] dark:text-white px-4 py-2 rounded-md transition-colors flex items-center">
                            <IconLogin className="mr-2" size={18} />
                            Sign In
                        </button>
                        <button className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] dark:bg-purple-500 dark:hover:bg-purple-600 text-[var(--color-background)] dark:text-white px-4 py-2 rounded-md transition-colors flex items-center">
                            <IconUserPlus className="mr-2" size={18} />
                            Create Account
                        </button>
                    </div>
                    <div className="mt-4 text-sm text-[var(--color-muted-foreground)] dark:text-gray-400">
                        <p>You can also continue without an account, but some features will be limited.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AccountSetup;