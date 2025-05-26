import { useOnboardingStore } from '@stores/useOnboardingStore';
import { useEffect } from 'react';
import HelpAndSupport from './components/HelpAndSupport';
import QuickStartFeatures from './components/QuickStartFeatures';

const Features = () => {
    const { markFeaturesComplete } = useOnboardingStore();

    // Mark the features step as completed when the user views it
    // TODO: change this later
    useEffect(() => {
        markFeaturesComplete();
    }, []);



    return (
        <>
            <QuickStartFeatures />
            <HelpAndSupport />
        </>
    );
};

export default Features;