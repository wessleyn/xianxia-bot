import React from 'react';
import { UseOtpFormReturn } from '../hooks/useOtpForm';
import SubmitButton from './SubmitButton';

interface OtpFormProps {
    formState: UseOtpFormReturn;
    email: string;
    onVerifySuccess: () => void;
    loading: boolean;
    error: string;
}

const OtpForm: React.FC<OtpFormProps> = ({
    formState,
    email,
    onVerifySuccess
}) => {
    const {
        otp,
        handleOtpChange,
        handleKeyDown,
        handleVerify,
        handleResend,
        timer,
        loading,
        error
    } = formState;
    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleVerify(onVerifySuccess);
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Verification Code
                </label>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    We sent a code to {email}
                </p>
                <div className="flex justify-center gap-2 mt-3">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleOtpChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            disabled={loading}
                            className="w-12 h-12 text-center text-xl border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                  focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white dark:bg-gray-700"
                        />
                    ))}
                </div>
            </div>

            {error && (
                <div className="text-sm text-red-600 dark:text-red-400">{error}</div>
            )}

            <div className="flex flex-col gap-3">
                <SubmitButton
                    isLoading={loading}
                    disabled={otp.some(digit => digit === '')}
                    text="Verify"
                />

                <div className="flex justify-center">
                    {timer > 0 ? (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            Resend code in {timer}s
                        </p>
                    ) : (
                        <button
                            type="button" onClick={handleResend}
                            disabled={loading}
                            className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                        >
                            Resend code
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default OtpForm;
