import { IconCheck } from '@tabler/icons-react';
import React from 'react';

interface OnboardingTimelineProps {
    currentStep: number;
}

/**
 * Timeline component to show progress through onboarding steps
 */
const OnboardingTimeline: React.FC<OnboardingTimelineProps> = ({ currentStep }) => {
    return (
        <ol className="flex items-center w-full mb-8">
            <li className={`flex w-full items-center ${currentStep >= 1 ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'} after:content-[''] after:w-full after:h-1 after:border-b ${currentStep >= 1 ? 'after:border-blue-100 dark:after:border-blue-800' : 'after:border-gray-100 dark:after:border-gray-700'} after:border-4 after:inline-block`}>
                <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${currentStep >= 1 ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                    {currentStep > 1 ? (
                        <IconCheck className={`${currentStep >= 1 ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-100'}`} size={16} stroke={2} />
                    ) : (
                        <span className={`${currentStep >= 1 ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-100'}`}>1</span>
                    )}
                </span>
            </li>
            <li className={`flex w-full items-center ${currentStep >= 2 ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'} after:content-[''] after:w-full after:h-1 after:border-b ${currentStep >= 2 ? 'after:border-blue-100 dark:after:border-blue-800' : 'after:border-gray-100 dark:after:border-gray-700'} after:border-4 after:inline-block`}>
                <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${currentStep >= 2 ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                    {currentStep > 2 ? (
                        <IconCheck className={`${currentStep >= 2 ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-100'}`} size={16} stroke={2} />
                    ) : (
                        <span className={`${currentStep >= 2 ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-100'}`}>2</span>
                    )}
                </span>
            </li>
            <li className={`flex items-center w-full ${currentStep >= 3 ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
                <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${currentStep >= 3 ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                    {currentStep > 3 ? (
                        <IconCheck className={`${currentStep >= 3 ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-100'}`} size={16} stroke={2} />
                    ) : (
                        <span className={`${currentStep >= 3 ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-100'}`}>3</span>
                    )}
                </span>
            </li>
        </ol>
    );
};

export default OnboardingTimeline;