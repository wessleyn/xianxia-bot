import { IconLogin, IconUser, IconUserPlus } from '@tabler/icons-react';
import React from 'react';

const AccountSetup: React.FC = () => {
    return (
        <section className="mb-8 bg-[var(--color-card)] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-card-foreground)]">Account Setup</h2>
            <div className="flex items-start space-x-4">
                <div className="bg-[var(--color-accent)] p-3 rounded-full">
                    <IconUser className="h-6 w-6 text-[var(--color-background)]" />
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-2 text-[var(--color-card-foreground)]">Why Login Matters</h3>
                    <p className="mb-3 text-[var(--color-card-foreground)]">
                        Logging in to your account allows you to:
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-2 text-[var(--color-card-foreground)]">
                        <li>Sync your reading progress across devices</li>
                        <li>Save your favorite novels and chapters</li>
                        <li>Access personalized recommendations</li>
                        <li>Get updates on new chapters from your favorite series</li>
                    </ul>
                    <div className="flex space-x-4">
                        <button className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-background)] px-4 py-2 rounded-md transition-colors flex items-center">
                            <IconLogin className="mr-2" size={18} />
                            Sign In
                        </button>
                        <button className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[var(--color-background)] px-4 py-2 rounded-md transition-colors flex items-center">
                            <IconUserPlus className="mr-2" size={18} />
                            Create Account
                        </button>
                    </div>
                    <div className="mt-4 text-sm text-[var(--color-muted-foreground)]">
                        <p>You can also continue without an account, but some features will be limited.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AccountSetup;