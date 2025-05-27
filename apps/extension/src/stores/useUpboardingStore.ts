import { create } from 'zustand';

export const STEP_PATHS: Record<number, string> = {
    1: '/',
    2: '/updatedfeatures',
    3: '/nextsteps',
};

interface UpboardingStore {
    // Current step in the upboarding flow
    currentStep: number;
    // Whether the user has viewed the new features in this version
    hasViewedFeatures: boolean;
    // Mark new features as viewed
    markFeaturesViewed: (value: boolean) => void;
    // Return whether all completion criteria for the current step are met
    isCurrentStepCompleted: () => boolean;
    // Check if we're on the last step
    isLastStep: () => boolean;
    // Navigate to a step (next, prev, or specific number)
    navigateToStep: (step: 'next' | 'prev' | number) => void;
}

export const useUpboardingStore = create<UpboardingStore>((set, get) => ({
    currentStep: 1,
    hasViewedFeatures: false,

    markFeaturesViewed: (value: boolean) => {
        set({ hasViewedFeatures: value });
    },

    isCurrentStepCompleted: () => {
        const { currentStep, hasViewedFeatures } = get();

        switch (currentStep) {
            case 1: // What's New
                return true; // Always allow progression from welcome screen
            case 2: // Updated Features
                return hasViewedFeatures;
            case 3: // Next Steps
                return true;
            default:
                return false;
        }
    },

    isLastStep: () => {
        return get().currentStep === Object.keys(STEP_PATHS).length;
    },

    navigateToStep: (step) => {
        const currentStep = get().currentStep;

        let newStep: number;
        if (step === 'next') {
            newStep = currentStep + 1;
        } else if (step === 'prev') {
            newStep = currentStep - 1;
        } else {
            newStep = step;
        }

        // Ensure step is within bounds
        if (newStep > 0 && newStep <= Object.keys(STEP_PATHS).length) {
            set({ currentStep: newStep });
        }
    },
}));