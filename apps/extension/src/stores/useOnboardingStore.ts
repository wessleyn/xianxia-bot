import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const STEP_PATHS = {
    1: '/', // welcome step
    2: '/settings',
    3: '/features'
};

export type OnboardingStep = 1 | 2 | 3;

interface StepCompletionCriteria {
    welcome: boolean;
    settings: {
        essentialSettings: boolean;
        themeToggled: boolean;
    };
    features: boolean;
}

interface OnboardingState {
    // Core state
    currentStep: OnboardingStep;
    completionCriteria: StepCompletionCriteria;
    isComplete: boolean;

    // UI helpers
    isCurrentStepCompleted: () => boolean;
    isLastStep: () => boolean;

    // Navigation helpers
    navigateToStep: (navigateFn: (path: string) => void, direction?: 'next' | 'prev' | number) => void;

    // Step completion actions
    completeWelcomeStep: () => void;
    markEssentialSettingsComplete: (value: boolean) => void;
    markThemeToggled: (value: boolean) => void;
    markFeaturesComplete: () => void;
    completeOnboarding: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
    persist(
        (set, get) => ({
            // Core state
            currentStep: 1,
            completionCriteria: {
                welcome: false,
                settings: {
                    essentialSettings: false,
                    themeToggled: false
                },
                features: false
            },
            isComplete: false,

            // UI helpers
            isCurrentStepCompleted: () => {
                const { currentStep, completionCriteria } = get();

                switch (currentStep) {
                    case 1: return completionCriteria.welcome;
                    case 2: return completionCriteria.settings.essentialSettings &&
                        completionCriteria.settings.themeToggled;
                    case 3: return completionCriteria.features;
                    default: return false;
                }
            },

            isLastStep: () => {
                return get().currentStep === 3;
            },

            // Navigation helpers
            navigateToStep: (navigateFn, direction = 'next') => {
                const { currentStep } = get();
                let targetStep: OnboardingStep;

                if (typeof direction === 'number') {
                    // If a specific step number is provided
                    targetStep = Math.min(Math.max(direction, 1), 3) as OnboardingStep;
                } else if (direction === 'next') {
                    targetStep = Math.min(currentStep + 1, 3) as OnboardingStep;
                } else { // prev
                    targetStep = Math.max(currentStep - 1, 1) as OnboardingStep;
                }

                set({ currentStep: targetStep });
                navigateFn(STEP_PATHS[targetStep]);
            },

            completeWelcomeStep: () => set(state => ({
                completionCriteria: {
                    ...state.completionCriteria,
                    welcome: true
                }
            })),

            markEssentialSettingsComplete: (value) => set(state => ({
                completionCriteria: {
                    ...state.completionCriteria,
                    settings: {
                        ...state.completionCriteria.settings,
                        essentialSettings: value
                    }
                }
            })),

            markThemeToggled: (value) => set(state => ({
                completionCriteria: {
                    ...state.completionCriteria,
                    settings: {
                        ...state.completionCriteria.settings,
                        themeToggled: value
                    }
                }
            })),

            markFeaturesComplete: () => set(state => ({
                completionCriteria: {
                    ...state.completionCriteria,
                    features: true
                }
            })),

            completeOnboarding: () => set({ isComplete: true })
        }),
        {
            name: 'onboarding-storage',
        }
    )
);