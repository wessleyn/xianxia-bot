'use client';

import { useAuthModalStore } from "@store/useAuthModalStore";

// This file exports functions for external usage of the auth modal
// Useful for API integrations that need to control the auth flow

export const openAuthModal = (view: 'login' | 'register' = 'login') => {
    useAuthModalStore.getState().openModal(view);
};

export const closeAuthModal = () => {
    useAuthModalStore.getState().closeModal();
};

export const setAuthRedirectUrl = (url: string) => {
    useAuthModalStore.getState().setRedirectUrl(url);
};

export const setAuthModalView = (view: 'login' | 'register' | 'otp' | 'profile' | 'success') => {
    useAuthModalStore.getState().setView(view);
};

export const showAuthSuccess = () => {
    const store = useAuthModalStore.getState();
    store.setView('success');
};

export default useAuthModalStore;
