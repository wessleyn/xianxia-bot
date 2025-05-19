import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../../../stores/useAuthStore';
import EmailForm from './components/EmailForm';
import OtpForm from './components/OtpForm';
import { useEmailForm } from './hooks/useEmailForm';
import { useOtpForm } from './hooks/useOtpForm';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  // Track whether the email has been submitted
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  // Set up email form
  const emailForm = useEmailForm();

  // Set up OTP form with email
  const otpForm = useOtpForm({ email: emailForm.email });

  // Handler for when email submission is successful
  const handleEmailSubmitSuccess = () => {
    setIsEmailSubmitted(true);
  };

  // Handler for when OTP verification is successful
  const handleOtpVerifySuccess = () => {
    // Create mock user data
    const mockUser = {
      name: 'User',
      email: emailForm.email
    };

    // Update auth state
    login(mockUser);

    // Navigate back to home
    navigate('/');
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6 border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign In</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {!isEmailSubmitted
              ? "Enter your email to receive a login code"
              : "Enter the verification code sent to your email"
            }
          </p>
        </div>

        {!isEmailSubmitted ? (
          <EmailForm
            formState={emailForm}
            onSubmitSuccess={handleEmailSubmitSuccess}
          />
        ) : (
          <OtpForm
            formState={otpForm}
            email={emailForm.email}
            onVerifySuccess={handleOtpVerifySuccess}
            loading={otpForm.loading}
            error={otpForm.error}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
