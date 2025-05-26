import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../../../../../../stores/useAuthStore';
import { UseOtpFormReturn } from '../hooks/useOtpForm';
import SubmitButton from './SubmitButton';

interface OtpFormProps {
    formState: UseOtpFormReturn;
    email: string;
    onVerifySuccess: () => void;
}

const OtpForm: React.FC<OtpFormProps> = ({ formState, email, onVerifySuccess }) => {
    const {
        timer,
        loading,
        error,
        handleResend,
        clearError
    } = formState;

    const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (index: number, value: string) => {
        // Only allow numbers
        if (value && !/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        // Only take the last character if someone pastes more than one character
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Clear any previous errors
        clearError();

        // Move to next input if current one is filled
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        // Go to previous input on backspace if current input is empty
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (otp.some(digit => !digit)) {
            toast.error('Please enter all 6 digits of your verification code');
            return;
        }

        // Get the OTP token by joining the digits
        const otpToken = otp.join('');

        try {
            // Use the auth store's verifyOtp function directly
            const { error } = await useAuthStore.getState().verifyOtp(email, otpToken);

            if (error) {
                toast.error(`Verification failed: ${error.message}`);
            } else {
              await onVerifySuccess();
            }
        } catch (error) {
            toast.error('Verification failed. An unexpected error occurred.');
            console.error(error);
        }
    };

    // Auto-paste OTP from clipboard
    useEffect(() => {
        const handlePaste = async (e: ClipboardEvent) => {
            e.preventDefault();
            const text = e.clipboardData?.getData('text') || '';
            const digits = text.match(/\d/g)?.slice(0, 6);

            if (!digits) return;

            const newOtp = [...otp];
            digits.forEach((digit, index) => {
                if (index < 6) newOtp[index] = digit;
            });

            setOtp(newOtp);

            if (digits.length === 6) {
                // Focus last input if complete OTP is pasted
                inputRefs.current[5]?.focus();
            } else {
                // Focus next empty input
                inputRefs.current[digits.length]?.focus();
            }
        };

        document.addEventListener('paste', handlePaste);
        return () => document.removeEventListener('paste', handlePaste);
    }, [otp]);

    return (
        <div className="space-y-6">
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                We sent a verification code to <span className="font-medium">{email}</span>
            </p>

            <form onSubmit={onSubmit} className="space-y-4">
                <div className="flex justify-center space-x-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => {
                                inputRefs.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            disabled={loading}
                            className="h-12 w-12 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-center text-lg shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                        />
                    ))}
                </div>

                {error && (
                    <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
                )}

                <SubmitButton
                    isLoading={loading}
                    disabled={otp.some(digit => digit === '')}
                    text="Verify"
                />
            </form>

            <div className="text-center text-sm">
                {timer > 0 ? (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Resend code in {timer}s
                    </p>
                ) : (
                    <button
                        type="button"
                        onClick={() => handleResend()}
                        disabled={loading}
                        className="text-purple-600 dark:text-purple-400 hover:underline"
                    >
                        Didn&apos;t receive a code? Resend
                    </button>
                )}
            </div>

            <div className="text-center text-sm">
                <button
                    onClick={() => window.history.back()}
                    className="text-gray-600 dark:text-gray-400 hover:underline"
                    disabled={loading}
                >
                    Use a different email
                </button>
            </div>
        </div>
    );
};

export default OtpForm;
