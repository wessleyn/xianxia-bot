import { IconBook } from '@tabler/icons-react';
import React from 'react';

const Introduction: React.FC = () => {
    return (
        <section className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
                <IconBook size={24} className="text-blue-600 dark:text-blue-400 mr-2" />
                <h2 className="text-xl font-semibold">Welcome to Xianxu</h2>
            </div>
            <p className="mb-4">
                Thank you for installing Xianxu! This extension helps you manage and enhance your novel reading experience.
                Let's get you set up in just a few steps:
            </p>
        </section>
    );
};

export default Introduction;