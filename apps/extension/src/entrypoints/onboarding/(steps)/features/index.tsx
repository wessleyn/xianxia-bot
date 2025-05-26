import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '../../../../stores/useOnboardingStore';
import NavigationButtons from '../../components/NavigationButtons';
import HelpAndSupport from './components/HelpAndSupport';
import QuickStartFeatures from './components/QuickStartFeatures';

const Features: React.FC = () => {
    const navigate = useNavigate();
    const { prevStep, completeOnboarding } = useOnboardingStore();

    const handleFinish = () => {
        completeOnboarding();
        // TODO: implement redirection to popup or close onboarding tab upon completion
        alert("Onboarding complete! You're all set to use Xianxu!");
    };

    const handlePrev = () => {
        prevStep();
        navigate('/settings');
    };

    return (
        <>
            <QuickStartFeatures />
            <HelpAndSupport />
            <NavigationButtons
                showBack={true}
                showFinish={true}
                onBack={handlePrev}
                onFinish={handleFinish}
            />
        </>
    );
};

export default Features;