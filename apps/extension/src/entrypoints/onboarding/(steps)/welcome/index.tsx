import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '../../../../stores/useOnboardingStore';
import NavigationButtons from '../../components/NavigationButtons';
import AccountSetup from './components/AccountSetup';
import Introduction from './components/Introduction';

const Welcome: React.FC = () => {
    const navigate = useNavigate();
    const { nextStep } = useOnboardingStore();

    const handleNext = () => {
        nextStep();
        navigate('/settings');
    };

    return (
        <>
            <Introduction />
            <AccountSetup />
            <NavigationButtons
                showNext={true}
                onNext={handleNext}
            />
        </>
    );
};

export default Welcome;