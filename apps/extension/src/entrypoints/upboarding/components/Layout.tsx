import { STEP_PATHS, useUpboardingStore } from '@stores/useUpboardingStore';
import '@styles/globals.css';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavigationButtons from './NavigationButtons';
import UpboardingProgress from './UpboardingProgress';

const Layout = () => {
    const navigate = useNavigate();
    const { currentStep } = useUpboardingStore();

    useEffect(() => {
        navigate(STEP_PATHS[currentStep] || '/');
    }, [currentStep, navigate]);

    return (
        <div className="min-h-screen bg-[var(--color-background)] dark:bg-gray-900 text-[var(--color-foreground)] dark:text-gray-100">
            <div className="max-w-4xl mx-auto p-6">
                <header className="flex items-center mb-8 space-x-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-[var(--color-card)] dark:bg-gray-800">
                        <img src="/logo.svg" alt="Xianxu Logo" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--color-foreground)] dark:text-gray-100">Xianxu Update</h1>
                        <p className="text-[var(--color-muted-foreground)] dark:text-gray-400">New version available!</p>
                    </div>
                </header>
                <UpboardingProgress />
                <Outlet />
                <NavigationButtons />
            </div>
        </div>
    );
};

export default Layout;