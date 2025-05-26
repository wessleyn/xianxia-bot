import { useUpboardingStore } from '@stores/useUpboardingStore';
import { IconCheck } from '@tabler/icons-react';

interface UpboardingProgressProps {
    totalSteps?: number;
}

const UpboardingProgress = ({ totalSteps = 3 }: UpboardingProgressProps) => {
    const { currentStep } = useUpboardingStore();

    const steps = [
        { label: "What's New", number: 1 },
        { label: "Updated Features", number: 2 },
        { label: "Next Steps", number: 3 }
    ];

    return (
        <ol className="flex items-center w-full mb-8">
            {steps.map((step) => {
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                const isLast = step.number === totalSteps;

                return (
                    <li
                        key={`step-${step.number}`}
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
                                <span className={`${currentStep >= step.number ? 'text-[var(--color-foreground)]' :
                                    'text-[var(--color-muted-foreground)] '
                                    }`}>
                                    {step.label.charAt(0)}
                                </span>
                            )}
                        </span>
                    </li>
                );
            })}
        </ol>
    );
};

export default UpboardingProgress;