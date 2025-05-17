'use client'

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { useAuthModalStore } from '@store/useAuthModalStore';
import dynamic from 'next/dynamic';
import { Fragment, useEffect, useState } from 'react';
import { LoadingState } from './LoadingState';

// Dynamically import components to reduce bundle size
const LoginView = dynamic(() => import('./LoginView'), {
  loading: () => <LoadingState message="Gathering the ancient scrolls..." />
});
const RegisterView = dynamic(() => import('./RegisterView'), {
  loading: () => <LoadingState message="Preparing the cultivation path..." />
});
const OtpVerificationView = dynamic(() => import('./OtpVerificationView'), {
  loading: () => <LoadingState message="Channeling spiritual energy..." />
});
const ProfileView = dynamic(() => import('./ProfileView'), {
  loading: () => <LoadingState message="Preparing your identity..." />
});
const SuccessView = dynamic(() => import('./SuccessView'), {
  loading: () => <LoadingState message="Preparing your realm..." />
});
const AuthenticatingView = dynamic(() => import('./AuthenticatingView'), {
  loading: () => <LoadingState message="Establishing connection to the heavenly dao..." />
});

const AuthModal = () => {
  const { isOpen, closeModal, view, canClose } = useAuthModalStore();
  const [mounted, setMounted] = useState(false);

  // Add blur effect to the body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  // Ensure component is mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={canClose ? closeModal : () => { }}
        static={!canClose}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 dark:text-white text-center mb-6"
                >
                  {view === 'login' && 'Begin Your Cultivation Journey'}
                  {view === 'register' && 'Join the Immortal Path'}
                  {view === 'otp' && 'Transcend the Heavenly Tribulation'}
                  {view === 'profile' && 'Establish Your Identity'}
                  {view === 'success' && 'Cultivation Breakthrough Achieved'}
                  {view === 'authenticating' && 'Communion with the Dao'}
                </DialogTitle>

                {view === 'login' && <LoginView />}
                {view === 'register' && <RegisterView />}
                {view === 'otp' && <OtpVerificationView />}
                {view === 'profile' && <ProfileView />}
                {view === 'success' && <SuccessView />}
                {view === 'authenticating' && <AuthenticatingView />}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AuthModal;
