import { IconLogin, IconUser, IconUserPlus } from '@tabler/icons-react';
import React from 'react';

const AccountSetup: React.FC = () => {
    return (
        <section className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Account Setup</h2>
            <div className="flex items-start space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                    <IconUser className="h-6 w-6 text-blue-600 dark:text-blue-300" />
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-2">Why Login Matters</h3>
                    <p className="mb-3">
                        Logging in to your account allows you to:
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-2">
                        <li>Sync your reading progress across devices</li>
                        <li>Save your favorite novels and chapters</li>
                        <li>Access personalized recommendations</li>
                        <li>Get updates on new chapters from your favorite series</li>
                    </ul>
                    <div className="flex space-x-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center">
                            <IconLogin className="mr-2" size={18} />
                            Sign In
                        </button>
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors flex items-center">
                            <IconUserPlus className="mr-2" size={18} />
                            Create Account
                        </button>
                    </div>
                    <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                        <p>You can also continue without an account, but some features will be limited.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AccountSetup;