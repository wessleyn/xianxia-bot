import { STEP_PATHS, useOnboardingStore } from '@stores/useOnboardingStore';
import '@styles/globals.css';
import { Outlet } from 'react-router-dom';
import NavigationButtons from './NavigationButtons';
import OnboardingTimeline from './OnboardingTimeline';

const Layout = () => {
    const { currentStep } = useOnboardingStore();

    return (
        <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
            <div className="max-w-4xl mx-auto p-6">
                <header className="flex items-center mb-8 space-x-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-[var(--color-card)]">
                        <img src="/logo.svg" alt="Xianxu Logo" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--color-foreground)]">Xianxu Setup</h1>
                        <p className="text-[var(--color-muted-foreground)]">Step {currentStep} of {Object.keys(STEP_PATHS).length}</p>
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