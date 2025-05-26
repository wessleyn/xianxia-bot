import { IconAdjustments, IconSettings } from '@tabler/icons-react';
import React from 'react';

const EssentialSettings: React.FC = () => {
    return (
        <section className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Customizing Your Experience</h2>
            <div className="flex items-start space-x-4">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                    <IconSettings className="h-6 w-6 text-purple-600 dark:text-purple-300" />
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-2">Essential Settings</h3>
                    <p className="mb-3">
                        Adjust these settings to optimize your reading experience:
                    </p>
                    <ul className="list-disc pl-5 mb-4 space-y-2">
                        <li>Reading preferences (font size, line spacing, margins)</li>
                        <li>Novel detection patterns and site configurations</li>
                        <li>Automatic tracking of reading progress</li>
                        <li>Notifications for updates</li>
                    </ul>
                    <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors flex items-center">
                        <IconAdjustments className="mr-2" size={18} />
                        Open Settings
                    </button>
                </div>
            </div>
        </section>
    );
};

export default EssentialSettings;