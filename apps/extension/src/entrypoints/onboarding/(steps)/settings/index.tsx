import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '../../../../stores/useOnboardingStore';
import NavigationButtons from '../../components/NavigationButtons';
import EssentialSettings from './components/EssentialSettings';
import ThemeCustomization from './components/ThemeCustomization';

const Settings: React.FC = () => {
    const navigate = useNavigate();
    const { nextStep, prevStep } = useOnboardingStore();

    const handleNext = () => {
        nextStep();
        navigate('/features');
    };

    const handlePrev = () => {
        prevStep();
        navigate('/');
    };

    return (
        <>
            <EssentialSettings />
            <ThemeCustomization />
            <NavigationButtons
                showBack={true}
                showNext={true}
                onBack={handlePrev}
                onNext={handleNext}
            />
        </>
    );
};

export default Settings;