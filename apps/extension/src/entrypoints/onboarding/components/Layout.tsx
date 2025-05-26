import { STEP_PATHS, useOnboardingStore } from '@stores/useOnboardingStore';
import '@styles/globals.css';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import NavigationButtons from './NavigationButtons';
import OnboardingTimeline from './OnboardingTimeline';

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const { currentStep } = useOnboardingStore();
    useEffect(() => {
        console.log('Current Step:', currentStep, 'Step Path:', STEP_PATHS[currentStep]);
        navigate(STEP_PATHS[currentStep] || '/');
        console.log('Location:', location.pathname);
    }, [currentStep])


    return (
        <div className="min-h-screen bg-[var(--color-background)] dark:bg-gray-900 text-[var(--color-foreground)] dark:text-gray-100">
            <div className="max-w-4xl mx-auto p-6">
                <header className="flex items-center mb-8 space-x-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-[var(--color-card)] dark:bg-gray-800">
                        <img src="/logo.svg" alt="Xianxu Logo" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--color-foreground)] dark:text-gray-100">Xianxu Setup</h1>
                        <p className="text-[var(--color-muted-foreground)] dark:text-gray-400">Step {currentStep} of {Object.keys(STEP_PATHS).length}</p>
                    </div>
                </header>
                <OnboardingTimeline />
                <Outlet />
                <NavigationButtons />
            </div>
        </div>
    );
};

export default Layout;