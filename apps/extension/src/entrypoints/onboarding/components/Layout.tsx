import '@styles/globals.css';
import { Outlet, useLocation } from 'react-router-dom';
import { useOnboardingStore } from '../../../stores/useOnboardingStore';

// Timeline component to show progress through onboarding steps
const OnboardingTimeline = ({ currentStep }: { currentStep: number }) => {
    return (
        <ol className="flex items-center w-full mb-8">
            <li className={`flex w-full items-center ${currentStep >= 1 ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'} after:content-[''] after:w-full after:h-1 after:border-b ${currentStep >= 1 ? 'after:border-blue-100 dark:after:border-blue-800' : 'after:border-gray-100 dark:after:border-gray-700'} after:border-4 after:inline-block`}>
                <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${currentStep >= 1 ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                    {currentStep > 1 ? (
                        <svg className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${currentStep >= 1 ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-100'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    ) : (
                        <span className={`${currentStep >= 1 ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-100'}`}>1</span>
                    )}
                </span>
            </li>
            <li className={`flex w-full items-center ${currentStep >= 2 ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'} after:content-[''] after:w-full after:h-1 after:border-b ${currentStep >= 2 ? 'after:border-blue-100 dark:after:border-blue-800' : 'after:border-gray-100 dark:after:border-gray-700'} after:border-4 after:inline-block`}>
                <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${currentStep >= 2 ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                    {currentStep > 2 ? (
                        <svg className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${currentStep >= 2 ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-100'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    ) : (
                        <span className={`${currentStep >= 2 ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-100'}`}>2</span>
                    )}
                </span>
            </li>
            <li className={`flex items-center w-full ${currentStep >= 3 ? 'text-blue-600 dark:text-blue-500' : 'text-gray-500 dark:text-gray-400'}`}>
                <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0 ${currentStep >= 3 ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-700'}`}>
                    {currentStep > 3 ? (
                        <svg className={`w-3.5 h-3.5 lg:w-4 lg:h-4 ${currentStep >= 3 ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-100'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
                        </svg>
                    ) : (
                        <span className={`${currentStep >= 3 ? 'text-blue-600 dark:text-blue-300' : 'text-gray-500 dark:text-gray-100'}`}>3</span>
                    )}
                </span>
            </li>
        </ol>
    );
};

// Layout component for all onboarding pages
const Layout = () => {
    const { pathname } = useLocation();
    const { currentStep } = useOnboardingStore();

    // Map path to step number
    const getStepFromPath = () => {
        switch (pathname) {
            case '/':
                return 1;
            case '/settings':
                return 2;
            case '/features':
                return 3;
            default:
                return 1;
        }
    };

    const step = getStepFromPath();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <div className="max-w-4xl mx-auto p-6">
                <header className="flex items-center mb-8 space-x-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                        <img src="/logo.svg" alt="Xianxu Logo" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Xianxu Setup</h1>
                        <p className="text-gray-600 dark:text-gray-400">Step {step} of 3</p>
                    </div>
                </header>
                <OnboardingTimeline currentStep={step} />
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;