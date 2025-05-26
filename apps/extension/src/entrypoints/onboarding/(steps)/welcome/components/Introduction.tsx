import { IconBook } from '@tabler/icons-react';
import React from 'react';

const Introduction: React.FC = () => {
    return (
        <section className="mb-8 bg-[var(--color-card)] dark:bg-gray-800 p-6 rounded-lg gap-2 flex-col">
            <div className="flex items-center mb-4">
                <IconBook size={24} className="text-[var(--color-primary)] dark:text-purple-400 mr-2" />
                <h2 className="text-xl font-semibold text-[var(--color-card-foreground)] dark:text-gray-100">Welcome to Xianxu</h2>
            </div>
            <p className="mb-4 text-[var(--color-card-foreground)] dark:text-gray-200">
                Thank you for installing Xianxu!
            </p>
            <p className="mb-4 text-[var(--color-card-foreground)] dark:text-gray-200">
                This extension helps you manage and enhance your novel reading experience.
            </p>
            <p className="mb-4 text-[var(--color-card-foreground)] dark:text-gray-200">
                Let's get you set up in just a few steps:
            </p>
        </section>
    );
};

export default Introduction;