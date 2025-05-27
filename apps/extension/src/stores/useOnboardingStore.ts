import { create } from 'zustand';
import { persist } from 'zustand/middleware';


export const STEP_PATHS = {
    1: '/', // welcome step
    2: 'settings',
    3: 'features'
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
    currentStep: OnboardingStep;
    completionCriteria: StepCompletionCriteria;

    isCurrentStepCompleted: () => boolean;
    isLastStep: () => boolean;

    navigateToStep: (direction?: 'next' | 'prev' | number) => void;

    // Step completion actions
    completeWelcomeStep: () => void;
    markEssentialSettingsComplete: (value: boolean) => void;
    markThemeToggled: (value: boolean) => void;
    markFeaturesComplete: () => void;
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
            // UI helpers
            isCurrentStepCompleted: () => {
                const { currentStep, completionCriteria } = get();

                let isCompleted = false;
                switch (currentStep) {
                    case 1: isCompleted = completionCriteria.welcome; break;
                    case 2: isCompleted = completionCriteria.settings.essentialSettings &&
                        completionCriteria.settings.themeToggled; break;
                    case 3: isCompleted = completionCriteria.features; break;
                    default: isCompleted = false;
                }

                return isCompleted;
            },

            isLastStep: () => {
                const result = get().currentStep === 3;
                return result;
            },

            // Navigation helpers
            navigateToStep: (direction = 'next') => {
                const { currentStep } = get();

                let targetStep: OnboardingStep;

                if (typeof direction === 'number') {
                    targetStep = Math.min(Math.max(direction, 1), 3) as OnboardingStep;
                } else if (direction === 'next') {
                    targetStep = Math.min(currentStep + 1, 3) as OnboardingStep;
                } else { // prev
                    targetStep = Math.max(currentStep - 1, 1) as OnboardingStep;
                }

                set({ currentStep: targetStep });
            },

            completeWelcomeStep: () => {
                set(state => ({
                    completionCriteria: {
                        ...state.completionCriteria,
                        welcome: true
                    }
                }));
            },

            markEssentialSettingsComplete: (value) => {
                set(state => ({
                    completionCriteria: {
                        ...state.completionCriteria,
                        settings: {
                            ...state.completionCriteria.settings,
                            essentialSettings: value
                        }
                    }
                }));
            },

            markThemeToggled: (value) => {
                set(state => ({
                    completionCriteria: {
                        ...state.completionCriteria,
                        settings: {
                            ...state.completionCriteria.settings,
                            themeToggled: value
                        }
                    }
                }));
            },

            markFeaturesComplete: () => {
                set(state => ({
                    completionCriteria: {
                        ...state.completionCriteria,
                        features: true
                    }
                }));
            },
        }),
        {
            name: 'onboarding',
        }
    )
);