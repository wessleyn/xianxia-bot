import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthModalView = 'extension' | 'login' | 'register' | 'otp' | 'profile' | 'success' | 'authenticating';

interface AuthModalStore {
  isOpen: boolean;
  isFromExtension: boolean;
  isAuthenticated: boolean;

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
  setUserId: (userId: string) => void;
  setRedirectUrl: (url: string) => void;
  setCanClose: (canClose: boolean) => void;
  setIsFromExtension: (isFromExtension: boolean) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export const useAuthModalStore = create<AuthModalStore>()(
  persist(
    (set) => ({
      isOpen: false,
      isFromExtension: false,
      isAuthenticated: false,

      view: 'login' as AuthModalView,
      email: '',
      name: '',
      isNew: false,
      userId: '',
      redirectUrl: '/dashboard',
      canClose: true,
      openModal: (view = 'login') => set({ isOpen: true, view }),
      closeModal: () => set((state) => {
        // Only allow closing if canClose is true
        if (state.canClose) {
          const resetState: Partial<AuthModalStore> = {
            isOpen: false,
            view: 'login',
            email: '',
            name: '',
            isNew: false,
            userId: '',
            isFromExtension: state.isFromExtension
          };

          return resetState;
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
      setIsFromExtension: (isFromExtension) => set({ isFromExtension }),
      setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
    }),
    {
      name: 'auth-modal-storage',
      partialize: (state) => ({
        // Don't persist isOpen to prevent modal auto-opening on page load
        isFromExtension: state.isFromExtension,
        isAuthenticated: state.isAuthenticated,
        view: state.view,
        email: state.email,
        name: state.name,
        isNew: state.isNew,
        userId: state.userId,
        redirectUrl: state.redirectUrl,
        canClose: state.canClose,
      }),
    }
  )
);
