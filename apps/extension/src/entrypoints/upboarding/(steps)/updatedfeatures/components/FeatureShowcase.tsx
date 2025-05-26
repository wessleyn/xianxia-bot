import { IconDeviceDesktop } from '@tabler/icons-react';
import React from 'react';

const FeatureShowcase: React.FC = () => {
    return (
        <section className="mb-8 bg-[var(--color-card)] dark:bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
                <IconDeviceDesktop size={24} className="text-[var(--color-primary)] dark:text-purple-300 mr-2" />
                <h2 className="text-xl font-semibold text-[var(--color-card-foreground)] dark:text-gray-100">Enhanced User Experience</h2>
            </div>
            <p className="mb-6 text-[var(--color-card-foreground)] dark:text-gray-200">
                We've completely redesigned the interface to make finding and reading novels even more enjoyable.
            </p>

            {/* Feature Screenshot/Demo Area */}
            <div className="relative rounded-lg overflow-hidden border border-[var(--color-border)] dark:border-gray-700 mb-4">
                <div className="aspect-video bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] dark:from-purple-500 dark:to-purple-800 flex items-center justify-center">
                    <p className="text-white text-lg font-medium">Feature Preview</p>
                </div>
            </div>

            <div className="flex justify-between text-sm text-[var(--color-muted-foreground)] dark:text-gray-400">
                <p>Swipe through features to explore</p>
                <p>1/3</p>
            </div>
        </section>
    );
};

export default FeatureShowcase;