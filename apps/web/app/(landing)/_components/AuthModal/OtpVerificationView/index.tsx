import { signInAction, verifyOtp } from '@repo/auth';
import { useAuthModalStore } from '@store/useAuthModalStore';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const OtpVerificationView = () => {
  const { email, setView, isNew, setUserId } = useAuthModalStore();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    // Only take the last character if someone pastes more than one character
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.some(digit => !digit)) {
      toast.error('Please enter all 6 digits of your verification code');
      return;
    }

    setIsLoading(true);

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append('email', email);
      formData.append('otp', otp.join(''));

      // Call verification API
      const data = await verifyOtp(formData);

      if (data.status === 'error') {
        setIsLoading(false);
        toast.error(data.message || 'Verification failed');
      } else {
        // Check if this is a new user or returning user
        setIsLoading(false);

        // Store the user ID from the verification response
        if (data.data && data.data.user) {
          setUserId(data.data.user.id);
        }

        if (isNew) {
          // Store the user ID from the verification response
          if (data.data && data.data.user) {
            setUserId(data.data.user.id);
          }

          if (isNew) {
            toast.success('Complete your profile to continue');
            setView('profile');
          } else {
            toast.success('Authentication successful');
            setView('success');
          }
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error)
      toast.error('An unexpected error occurred. Please try again.');
    }
  }

  const handleResend = async () => {
    try {
      // Clear current OTP
      setOtp(['', '', '', '', '', '']);

      // Prepare form data
      const formData = new FormData();
      formData.append('email', email);

      // Call sign-in action again to resend OTP
      const data = await signInAction(formData);

      if (data.status === 'error') {
        toast.error(data.message || 'Failed to resend code');
      } else {
        toast.success('A new verification code has been sent to your email');
      }
    } catch {
      toast.error('An unexpected error occurred. Please try again.');
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

      <form onSubmit={handleSubmit} className="space-y-4">
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
              className="h-12 w-12 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-center text-lg shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading || otp.some(digit => !digit)}
          className={`w-full rounded-md bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all ${isLoading || otp.some(digit => !digit) ? 'opacity-70 cursor-not-allowed' : ''
            }`}
        >
          {isLoading ? 'Verifying...' : 'Verify'}
        </button>
      </form>

      <div className="text-center text-sm">
        <button
          onClick={handleResend}
          className="text-purple-600 dark:text-purple-400 hover:underline"
          disabled={isLoading}
        >
          Didn&apos;t receive a code? Resend
        </button>
      </div>

      <div className="text-center text-sm">
        <button
          onClick={() => useAuthModalStore.getState().setView('login')}
          className="text-gray-600 dark:text-gray-400 hover:underline"
          disabled={isLoading}
        >
          Use a different email
        </button>
      </div>
    </div>
  );
};

export default OtpVerificationView;
