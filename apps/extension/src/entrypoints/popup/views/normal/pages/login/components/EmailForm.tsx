import React from 'react';
import { UseEmailFormReturn } from '../hooks/useEmailForm';
import SubmitButton from './SubmitButton';

interface EmailFormProps {
    formState: UseEmailFormReturn;
    onSubmitSuccess: () => void;
}

const EmailForm: React.FC<EmailFormProps> = ({ formState, onSubmitSuccess }) => {
    const { email, setEmail, loading, error, handleSubmit } = formState;

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit(onSubmitSuccess);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                </label>
                <div className="mt-1">
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        disabled={loading}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 
              focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white dark:bg-gray-700"
                    />
                </div>
            </div>

            {error && (
                <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
            )}

            <SubmitButton isLoading={loading} text="Continue" />
        </form>
    );
};

export default EmailForm;
