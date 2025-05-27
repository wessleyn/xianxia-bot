import { IconBulb, IconExternalLink, IconSettings } from '@tabler/icons-react';
import React from 'react';

interface ActionCardProps {
    title: string;
    description: string;
    buttonText: string;
    icon: React.ReactNode;
    onClick: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ title, description, buttonText, icon, onClick }) => (
    <div className="border border-[var(--color-border)] dark:border-gray-700 p-5 rounded-lg bg-[var(--color-card)] dark:bg-gray-800 flex flex-col">
        <div className="flex items-center mb-3">
            <div className="mr-3 text-[var(--color-primary)] dark:text-purple-300">{icon}</div>
            <h3 className="text-lg font-medium text-[var(--color-card-foreground)] dark:text-gray-100">{title}</h3>
        </div>
        <p className="mb-4 text-[var(--color-card-foreground)] dark:text-gray-200 text-sm flex-grow">{description}</p>
        <button
            onClick={onClick}
            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] dark:bg-purple-500 dark:hover:bg-purple-600 text-white px-4 py-2 rounded-md text-sm transition-colors flex items-center self-end"
        >
            {buttonText}
            <IconExternalLink className="ml-1" size={14} />
        </button>
    </div>
);

const NextStepsActions: React.FC = () => {
    const openSettings = () => {
        // Logic to open settings page
        console.log('Opening settings');
    };

    const exploreFeatures = () => {
        // Logic to explore features
        console.log('Exploring features');
    };

    return (
        <section className="mb-8 bg-[var(--color-card)] dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-card-foreground)] dark:text-gray-100">Next Steps</h2>
            <p className="mb-6 text-[var(--color-card-foreground)] dark:text-gray-200">
                Get the most out of the new version with these recommended actions:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ActionCard
                    title="Review Your Settings"
                    description="Check your preferences to ensure they're optimized for the new features."
                    buttonText="Open Settings"
                    icon={<IconSettings size={20} />}
                    onClick={openSettings}
                />
                <ActionCard
                    title="Try New Features"
                    description="Explore the latest additions to enhance your reading experience."
                    buttonText="Explore Features"
                    icon={<IconBulb size={20} />}
                    onClick={exploreFeatures}
                />
            </div>
        </section>
    );
};

export default NextStepsActions;