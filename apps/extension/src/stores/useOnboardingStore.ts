import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingState {
    currentStep: number;
    isComplete: boolean;
    themePreference: 'light' | 'dark' | 'system';
    setCurrentStep: (step: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    completeOnboarding: () => void;
    setThemePreference: (theme: 'light' | 'dark' | 'system') => void;
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set) => ({
            currentStep: 1,
            isComplete: false,
            themePreference: 'system',
            setCurrentStep: (step) => set({ currentStep: step }),
            nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 3) })),
            prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
            completeOnboarding: () => set({ isComplete: true }),
            setThemePreference: (theme) => set({ themePreference: theme }),
        }),
        {
            name: 'onboarding-storage',
        }
    )
);