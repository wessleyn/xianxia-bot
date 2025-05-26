import { useOnboardingStore } from '@stores/useOnboardingStore';
import { IconArrowLeft, IconArrowRight, IconCheck } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

const NavigationButtons = () => {
    const navigate = useNavigate();
    const {
        isLastStep,
        isCurrentStepCompleted,
        navigateToStep,
        currentStep,
        completeOnboarding
    } = useOnboardingStore();

    const isStepComplete = isCurrentStepCompleted();
    const isLastStepValue = isLastStep();

    const handleBack = () => {
        navigateToStep((path) => navigate(path), 'prev');
    };

    const handleNext = () => {
        navigateToStep((path) => navigate(path), 'next');
    };

    const handleFinish = () => {
        alert("Window will now close");
        completeOnboarding();
        window.close();
    };

    return (
        <div className="flex justify-between mt-4">
            {
                currentStep > 1 && (
                    <button
                        onClick={handleBack}
                        className="border border-[var(--color-border)] hover:bg-[var(--color-muted)] text-[var(--color-foreground)] font-medium px-6 py-2 rounded-md transition-colors flex items-center"
                    >
                        <IconArrowLeft className="mr-2" size={16} stroke={2} />
                        Back
                    </button>

                )
            }
            <div className="flex-1 flex-grow"></div>
            {!isLastStepValue && (
                <button
                    onClick={handleNext}
                    className={`${isStepComplete
                        ? 'bg-teal-600 hover:bg-teal-700'
                        : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]'
                        } text-white font-medium px-6 py-2 rounded-md transition-colors flex items-center`}
                >
                    Continue
                    <IconArrowRight className="ml-2" size={16} stroke={2} />
                </button>
            )}

            {isLastStepValue && (
                <button
                    onClick={handleFinish}
                    className={`${isStepComplete
                        ? 'bg-teal-600 hover:bg-teal-700'
                        : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]'
                        } text-white font-medium px-6 py-2 rounded-md transition-colors flex items-center`}
                >
                    Finish
                    <IconCheck className="ml-2" size={16} stroke={2} />
                </button>
            )}
        </div>
    );
};

export default NavigationButtons;