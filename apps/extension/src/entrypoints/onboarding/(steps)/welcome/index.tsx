import { useOnboardingStore } from '@stores/useOnboardingStore';
import React, { useEffect } from 'react';
import AccountSetup from './components/AccountSetup';
import Introduction from './components/Introduction';

const Welcome: React.FC = () => {
    const {  completeWelcomeStep } = useOnboardingStore();

    useEffect(() => {
        completeWelcomeStep();
    }, []);

    return (
        <>
            <Introduction />
            <AccountSetup />
        </>
    );
};

export default Welcome;