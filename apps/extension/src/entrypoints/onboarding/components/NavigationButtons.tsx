import { IconArrowLeft, IconArrowRight, IconCheck } from '@tabler/icons-react';
import React from 'react';

interface NavigationButtonsProps {
    showBack?: boolean;
    showNext?: boolean;
    showFinish?: boolean;
    onBack?: () => void;
    onNext?: () => void;
    onFinish?: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
    showBack = false,
    showNext = true,
    showFinish = false,
    onBack,
    onNext,
    onFinish
}) => {
    return (
        <div className="flex justify-between mt-4">
            {showBack && (
                <button
                    onClick={onBack}
                    className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium px-6 py-2 rounded-md transition-colors flex items-center"
                >
                    <IconArrowLeft className="mr-2" size={16} stroke={2} />
                    Back
                </button>
            )}

            <div className="flex-grow"></div>

            {showNext && (
                <button
                    onClick={onNext}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md transition-colors flex items-center"
                >
                    Next
                    <IconArrowRight className="ml-2" size={16} stroke={2} />
                </button>
            )}

            {showFinish && (
                <button
                    onClick={onFinish}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md transition-colors flex items-center"
                >
                    Finish
                    <IconCheck className="ml-2" size={16} stroke={2} />
                </button>
            )}
        </div>
    );
};

export default NavigationButtons;