import { useUpboardingStore } from '@stores/useUpboardingStore';
import React, { useEffect } from 'react';
import FeatureDetails from './components/FeatureDetails';
import FeatureShowcase from './components/FeatureShowcase';

const UpdatedFeatures: React.FC = () => {
    const { markFeaturesViewed } = useUpboardingStore();

    useEffect(() => {
        // Mark that the user has viewed the features when this component loads
        markFeaturesViewed(true);
    }, [markFeaturesViewed]);

    return (
        <div className="space-y-6">
            <FeatureShowcase />
            <FeatureDetails />
        </div>
    );
};

export default UpdatedFeatures;