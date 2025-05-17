import { create } from 'zustand';

type AuthModalView = 'login' | 'register' | 'otp' | 'profile' | 'success' | 'authenticating';

interface AuthModalStore {
  isOpen: boolean;
  view: AuthModalView;
  email: string;
  name: string;
  isNew: boolean;
  userId: string;
  redirectUrl: string;
  canClose: boolean;
  openModal: (view?: AuthModalView) => void;
  closeModal: () => void;
  setView: (view: AuthModalView) => void;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setIsNew: (isNew: boolean) => void;
  setUserId: (userId: string) => void;
  setRedirectUrl: (url: string) => void;
  setCanClose: (canClose: boolean) => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
  isOpen: false,
  view: 'login',
  email: '',
  name: '',
  isNew: false,
  userId: '',
  redirectUrl: '/dashboard',
  canClose: true,
  openModal: (view = 'login') => set({ isOpen: true, view }),
  closeModal: () => set(state => {
    // Only allow closing if canClose is true
    if (state.canClose) {
      return {
        isOpen: false,
        view: 'login',
        email: '',
        name: '',
        isNew: false,
        userId: ''
      };
    }
    return state;
  }),
  setView: (view) => set({ view }),
  setEmail: (email) => set({ email }),
  setName: (name) => set({ name }),
  setIsNew: (isNew) => set({ isNew }),
  setUserId: (userId) => set({ userId }),
  setRedirectUrl: (url) => set({ redirectUrl: url }),
  setCanClose: (canClose) => set({ canClose }),
}));
