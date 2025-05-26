import { IconArrowRight, IconBrush, IconDeviceFloppy, IconSparkles } from '@tabler/icons-react';
import React from 'react';

interface FeatureHighlightProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const FeatureHighlight: React.FC<FeatureHighlightProps> = ({ title, description, icon }) => (
    <div className="border border-[var(--color-border)] dark:border-gray-700 p-4 rounded-lg bg-[var(--color-card)] dark:bg-gray-800">
        <div className="flex items-center mb-2">
            <div className="mr-2 text-[var(--color-primary)] dark:text-purple-300">{icon}</div>
            <h3 className="text-lg font-medium text-[var(--color-card-foreground)] dark:text-gray-100">{title}</h3>
        </div>
        <p className="mb-3 text-[var(--color-card-foreground)] dark:text-gray-200">{description}</p>
    </div>
);

const UpdateHighlights: React.FC = () => {
    return (
        <section className="mb-8 bg-[var(--color-card)] dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-card-foreground)] dark:text-gray-100">Update Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <FeatureHighlight
                    title="New UI Design"
                    description="We've completely refreshed the interface for a more intuitive experience with dark mode support."
                    icon={<IconBrush size={20} />}
                />
                <FeatureHighlight
                    title="Enhanced Reading Mode"
                    description="Improved formatting and customization options for a better reading experience."
                    icon={<IconSparkles size={20} />}
                />
                <FeatureHighlight
                    title="Offline Library"
                    description="Save and organize more novels in your personal library for offline reading."
                    icon={<IconDeviceFloppy size={20} />}
                />
            </div>
            <button className="text-[var(--color-primary)] dark:text-purple-300 hover:underline inline-flex items-center">
                See all changes <IconArrowRight className="ml-1" size={14} />
            </button>
        </section>
    );
};

export default UpdateHighlights;