import { Logo } from '@components/Logo';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ThemeSelector from '../../components/ThemeSelector';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isEmailSubmitted && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isEmailSubmitted, timer]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    // Mock API call for sending OTP
    setTimeout(() => {
      setLoading(false);
      setIsEmailSubmitted(true);
    }, 1500);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 3) {
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

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (otp.some(digit => digit === '')) {
      setError('Please enter the complete OTP');
      return;
    }

    setLoading(true);

    // Mock API call for verifying OTP
    setTimeout(() => {
      setLoading(false);
      // Successful login
      navigate('/');
    }, 1500);
  };

  const handleResendOtp = () => {
    setTimer(30);
    setError('');

    setLoading(true);
    // Mock API call for resending OTP
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="h-[450px] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <header className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-800 to-purple-700 dark:from-indigo-900 dark:to-purple-900 text-white shadow-md">
        <div className="flex items-center">
          <Logo />
          <span className="ml-2 text-2xl font-bold">Xianxu</span>
        </div>

        <ThemeSelector />

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/30 hover:bg-indigo-500/50 text-white rounded-md transition-colors shadow-sm"
          title="Back to Home"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M5 12l6-6m-6 6l6 6" />
          </svg>
          <span className="font-medium text-sm">Back</span>
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6 border border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sign In</h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {!isEmailSubmitted ? "Enter your email to receive a login code" : "Enter the verification code sent to your email"}
            </p>
          </div>

          {!isEmailSubmitted ? (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
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

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 disabled:opacity-70"
              >
                {loading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : "Continue"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
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
                <button
                  type="submit"
                  disabled={loading || otp.some(digit => digit === '')}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 disabled:opacity-70"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : "Verify"}
                </button>

                <div className="flex justify-center">
                  {timer > 0 ? (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Resend code in {timer}s
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={loading}
                      className="text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
                    >
                      Resend code
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
