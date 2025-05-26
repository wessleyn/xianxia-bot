import { IconArrowRight, IconBook, IconBook2, IconDownload, IconLanguage } from '@tabler/icons-react';
import React from 'react';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => (
    <div className="border border-[var(--color-border)] dark:border-gray-700 p-4 rounded-lg bg-[var(--color-card)] dark:bg-gray-800">
        <div className="flex items-center mb-2">
            <div className="mr-2 text-[var(--color-primary)] dark:text-purple-300">{icon}</div>
            <h3 className="text-lg font-medium text-[var(--color-card-foreground)] dark:text-gray-100">{title}</h3>
        </div>
        <p className="mb-3 text-[var(--color-card-foreground)] dark:text-gray-200">{description}</p>
        <button className="text-[var(--color-primary)] dark:text-purple-300 hover:underline inline-flex items-center">
            Try now <IconArrowRight className="ml-1" size={14} />
        </button>
    </div>
);

const QuickStartFeatures: React.FC = () => {
    return (
        <section className="mb-8 bg-[var(--color-card)] dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-card-foreground)] dark:text-gray-100">Try These Features Now</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <FeatureCard
                    title="Detect Novels"
                    description="Automatically detect novel content on any webpage."
                    icon={<IconBook size={20} />}
                />
                <FeatureCard
                    title="Reading Mode"
                    description="Transform any novel page into a clean, distraction-free reading experience."
                    icon={<IconBook2 size={20} />}
                />
                <FeatureCard
                    title="Download Novels"
                    description="Save novels for offline reading anytime, anywhere."
                    icon={<IconDownload size={20} />}
                />
                <FeatureCard
                    title="Translation"
                    description="Translate novel content between languages with a single click."
                    icon={<IconLanguage size={20} />}
                />
            </div>
        </section>
    );
};

export default QuickStartFeatures;