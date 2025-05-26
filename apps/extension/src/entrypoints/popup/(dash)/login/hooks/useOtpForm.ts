import { useAuthStore } from '@stores/useAuthStore';
import { useEffect, useState } from 'react';

interface UseOtpFormProps {
    email: string;
}

export interface UseOtpFormReturn {
    timer: number;
    loading: boolean;
    error: string;
    handleResend: () => Promise<void>;
    clearError: () => void;
}

export const useOtpForm = ({ email }: UseOtpFormProps): UseOtpFormReturn => {
    const { resetCodeIn, setResetCodeIn, login } = useAuthStore();
    const [timer, setTimer] = useState(resetCodeIn);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Sync timer with resetCodeIn from the store on mount
    useEffect(() => {
        setTimer(resetCodeIn);
    }, [resetCodeIn]);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    const newValue = prev - 1;
                    return newValue;
                });

                // Update the auth store separately from the state update
                setResetCodeIn(timer - 1);
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timer, setResetCodeIn]);


    const handleResend = async () => {
        setTimer(30);
        setResetCodeIn(30);
        setError('');
        setLoading(true);

        try {
            const { error } = await login(email);

            if (error) {
                setError(error.message || 'Failed to resend code. Please try again.');
            }
        } catch (err) {
            setError('Failed to resend code. Please try again.');
            console.error('Resend OTP error:', err);
        } finally {
            setLoading(false);
        }
    };

    return {
        timer,
        loading,
        error,
        handleResend,
        clearError: () => setError('')
    };
};
