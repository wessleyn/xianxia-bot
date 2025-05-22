import { useState } from 'react';

export interface UseEmailFormReturn {
    email: string;
    setEmail: (email: string) => void;
    loading: boolean;
    error: string;
    handleSubmit: (onSuccess: () => void) => Promise<void>;
    clearError: () => void;
}

export const useEmailForm = (): UseEmailFormReturn => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const validateEmail = (email: string): boolean => {
        if (!email.trim()) {
            setError('Email is required');
            return false;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address');
            return false;
        }

        return true;
    };

    const handleSubmit = async (onSuccess: () => void) => {
        setError('');

        if (!validateEmail(email)) {
            return;
        }

        setLoading(true);

        try {
            // Mock API call for sending OTP - in a real app this would be a fetch request
            await new Promise(resolve => setTimeout(resolve, 1500));
            onSuccess();
        } catch (err) {
            setError('Failed to send verification code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        loading,
        error,
        handleSubmit,
        clearError: () => setError('')
    };
};
