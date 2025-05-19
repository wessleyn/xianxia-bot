import { useEffect, useState } from 'react';

interface UseOtpFormProps {
    email: string;
}

export interface UseOtpFormReturn {
    timer: number;
    loading: boolean;
    error: string;
    handleVerify: (onSuccess: () => void) => Promise<void>;
    handleResend: () => Promise<void>;
    clearError: () => void;
}

export const useOtpForm = ({ email }: UseOtpFormProps): UseOtpFormReturn => {
    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const [timer, setTimer] = useState(30);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;

        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timer]);

    const handleOtpChange = (index: number, value: string) => {
        if (isNaN(Number(value))) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value !== '' && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            // Move to previous input on backspace when current is empty
            const prevInput = document.getElementById(`otp-${index - 1}`);
            prevInput?.focus();
        }
    };

    const handleVerify = async (onSuccess: () => void) => {
        setError('');

        if (otp.some(digit => digit === '')) {
            setError('Please enter the complete OTP');
            return;
        }

        setLoading(true);

        try {
            // Mock API call for verifying OTP
            await new Promise(resolve => setTimeout(resolve, 1500));
            onSuccess();
        } catch (err) {
            setError('Invalid verification code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setTimer(30);
        setError('');

        setLoading(true);
        try {
            // Mock API call for resending OTP
            await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (err) {
            setError('Failed to resend code. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return {
        timer,
        loading,
        error,
        handleVerify,
        handleResend,
        clearError: () => setError('')
    };
};
