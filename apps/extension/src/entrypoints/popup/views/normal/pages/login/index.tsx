import LoginForm from '@repo/auth/components/LoginForm';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../../../../stores/useAuthStore';
import OtpForm from './components/OtpForm';
import { useOtpForm } from './hooks/useOtpForm';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login, checkSession, setLoginStatus, loginStatus, email: storedEmail, setEmail } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isSlackLoading, setIsSlackLoading] = useState(false);

  // Use the stored email or an empty string to avoid null
  const email = storedEmail || '';

  // Set up OTP form with email
  const otpForm = useOtpForm({ email });

  // Check for existing session on component mount
  useEffect(() => {
    const checkForExistingSession = async () => {
      const session = await checkSession();
      if (session) {
        // User is already logged in, redirect to home
        navigate('/');
      }
    };

    checkForExistingSession();
  }, [checkSession, navigate]);

  // Login form handlers
  const handleEmailSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // The login function will store the email in the auth store
      const { error } = await login(email);

      if (error) {
        setLoginStatus('error')
        toast.error(`Login failed: ${error.message}`);
      } else {
        toast.success(`Verification code sent to ${email}`);
        setLoginStatus('pending');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      await useAuthStore.getState().loginWithGoogle();
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSlackLogin = async () => {
    try {
      setIsSlackLoading(true);
      await useAuthStore.getState().loginWithSlack();
    } finally {
      setIsSlackLoading(false);
    }
  };

  const handleOtpVerifySuccess = () => {
    // Navigate back to home - the store will handle updating the auth state
    toast.success('Login successful');
    setLoginStatus('success');
    navigate('/');
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6 border border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign In</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {loginStatus === 'pending'
              ? "Enter your email to receive a login code"
              : "Enter the verification code sent to your email"
            }
          </p>
        </div>

        {loginStatus !== 'pending' ? (
          <LoginForm
            email={email}
            setEmail={setEmail}
            handleSubmit={handleEmailSubmit}
            handleGoogle={handleGoogleLogin}
            handleSlack={handleSlackLogin}
            isLoading={isLoading}
            isGoogleLoading={isGoogleLoading}
            isSlackLoading={isSlackLoading}
          />
        ) : (
          <OtpForm
            formState={otpForm}
            email={email}
            onVerifySuccess={handleOtpVerifySuccess}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
