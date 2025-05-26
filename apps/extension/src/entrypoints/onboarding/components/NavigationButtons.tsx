import { useOnboardingStore } from '@stores/useOnboardingStore';
import { IconArrowLeft, IconArrowRight, IconCheck } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

const NavigationButtons = () => {
    const {
        isLastStep,
        isCurrentStepCompleted,
        navigateToStep,
        currentStep,
        completionCriteria,
    } = useOnboardingStore();

    const [isStepComplete, setisStepComplete] = useState(false);
    const [isLastStepValue, setIsLastStepValue] = useState(false);

    useEffect(() => {
        setisStepComplete(isCurrentStepCompleted());
        setIsLastStepValue(isLastStep());
        console.log('reacted')
    }, [completionCriteria, currentStep]);

    const handleBack = () => navigateToStep('prev');

    const handleNext = () => navigateToStep('next');

    const handleFinish = () => {
        alert('Onboarding completed! You can now start using Xianxu.');
        window.close();
    };

    return (
        <div className="flex justify-between mt-4">
            {
                currentStep > 1 && (
                    <button
                        onClick={handleBack}
                        className="border border-[var(--color-border)] dark:border-gray-600 hover:bg-[var(--color-muted)] dark:hover:bg-gray-700 text-[var(--color-foreground)] dark:text-gray-200 font-medium px-6 py-2 rounded-md transition-colors flex items-center"
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
                        ? 'bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600'
                        : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] dark:bg-purple-600 dark:hover:bg-purple-700'
                        } text-white dark:text-white font-medium px-6 py-2 rounded-md transition-colors flex items-center`}
                // disabled={!isStepComplete}
                >
                    Continue
                    <IconArrowRight className="ml-2" size={16} stroke={2} />
                </button>
            )}

            {isLastStepValue && (
                <button
                    onClick={handleFinish}
                    className={`${isStepComplete
                        ? 'bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-600'
                        : 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] dark:bg-purple-600 dark:hover:bg-purple-700'
                        } text-white dark:text-white font-medium px-6 py-2 rounded-md transition-colors flex items-center`}
                    disabled={!isStepComplete}
                >
                    Finish
                    <IconCheck className="ml-2" size={16} stroke={2} />
                </button>
            )}
        </div>
    );
};

export default NavigationButtons;