import { create } from 'zustand';

type AuthModalView = 'login' | 'register' | 'otp' | 'profile' | 'success';

interface AuthModalStore {
  isOpen: boolean;
  view: AuthModalView;
  email: string;
  name: string;
  isNew: boolean;
  redirectUrl: string;
  canClose: boolean;
  openModal: (view?: AuthModalView) => void;
  closeModal: () => void;
  setView: (view: AuthModalView) => void;
  setEmail: (email: string) => void;
  setName: (name: string) => void;
  setIsNew: (isNew: boolean) => void;
  setRedirectUrl: (url: string) => void;
  setCanClose: (canClose: boolean) => void;
}

export const useAuthModalStore = create<AuthModalStore>((set) => ({
  isOpen: false,
  view: 'login',
  email: '',
  name: '',
  isNew: false,
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
        isNew: false
      };
    }
    return state;
  }),
  setView: (view) => set({ view }),
  setEmail: (email) => set({ email }),
  setName: (name) => set({ name }),
  setIsNew: (isNew) => set({ isNew }),
  setRedirectUrl: (url) => set({ redirectUrl: url }),
  setCanClose: (canClose) => set({ canClose }),
}));
