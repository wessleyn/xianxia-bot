import { useOnboardingStore } from '@stores/useOnboardingStore';
import { IconCheck } from '@tabler/icons-react';

interface OnboardingTimelineProps {
    totalSteps?: number;
    labels?: string[];
}

/**
 * Timeline component to show progress through onboarding steps
 */
const OnboardingTimeline = ({ totalSteps = 3, labels }: OnboardingTimelineProps) => {
    const { currentStep } = useOnboardingStore();

    return (
        <ol className="flex items-center w-full mb-8">
            {Array.from({ length: totalSteps }, (_, index) => {
                const stepNumber = index + 1;
                const isActive = currentStep === stepNumber;
                const isCompleted = currentStep > stepNumber;
                const isLast = stepNumber === totalSteps;

                return (
                    <li
                        key={`step-${stepNumber}`}
                        className={`flex ${isLast ? 'items-center' : 'w-full items-center'} ${isCompleted ? 'text-teal-600' :
                            isActive ? 'text-[var(--color-primary)]' :
                                'text-[var(--color-muted-foreground)]'
                            }${!isLast ?
                                ` after:content-[''] after:w-full after:h-1 after:border-b ${isCompleted ? 'after:border-teal-600 dark:after:border-teal-400' :
                                    isActive ? 'after:border-[var(--color-primary)] dark:after:border-[var(--color-primary)]' :
                                        'after:border-[var(--color-muted)] dark:after:border-[var(--color-muted)]'
                                } after:border-4 after:inline-block` : ''
                            }`}
                    >
                        <span
                            className={` text-lg flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${isCompleted ? 'bg-teal-100 dark:bg-teal-600' :
                                isActive ? 'bg-[var(--color-accent)] dark:bg-[var(--color-accent)]' :
                                    'bg-[var(--color-muted)] dark:bg-[var(--color-muted)]'
                                }`}
                        >
                            {isCompleted ? (
                                <IconCheck className="text-teal-300 dark:text-teal-400" size={24} stroke={2} />
                            ) : (
                                <span className={`${currentStep >= stepNumber ? 'text-[var(--color-foreground)]' :
                                    'text-[var(--color-muted-foreground)] '
                                    }`}>
                                    {labels ? labels[index] : stepNumber}
                                </span>
                            )}
                        </span>
                    </li>
                );
            })}
        </ol>
    );
};

export default OnboardingTimeline;