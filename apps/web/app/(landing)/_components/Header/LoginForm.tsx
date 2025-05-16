
// Redirecting component to use our modular auth system
// Instead of having a separate LoginForm component, we're using Headless UI modal system
// with dynamic imports to improve bundle size

import { useAuthModalStore } from '@store/useAuthModalStore';
import { useEffect } from 'react';

const LoginForm = () => {
  const { openModal } = useAuthModalStore();

  useEffect(() => {
    // Automatically open the login modal when this component is mounted
    openModal('login');
  }, [openModal]);

  return (
    <div className="p-8 rounded-lg bg-white dark:bg-gray-800 shadow-xl text-center">
      <p className="text-lg text-gray-700 dark:text-gray-300">
        Loading authentication portal...
      </p>
      <div className="mt-4">
        <div className="h-8 w-8 mx-auto animate-spin rounded-full border-b-2 border-purple-500"></div>
      </div>
    </div>
  );
};

export default LoginForm;