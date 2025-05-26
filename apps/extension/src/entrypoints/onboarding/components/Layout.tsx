import '@styles/globals.css';
import { Outlet, useLocation } from 'react-router-dom';
import OnboardingTimeline from './OnboardingTimeline';

const Layout = () => {
    const { pathname } = useLocation();

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