import { IconRefresh, IconVersions } from '@tabler/icons-react';
import React from 'react';

const VersionDetails: React.FC = () => {
    return (
        <section className="mb-8 bg-[var(--color-card)] dark:bg-gray-800 p-6 rounded-lg">
            <div className="flex items-center mb-4">
                <IconVersions size={24} className="text-[var(--color-primary)] dark:text-purple-300 mr-2" />
                <h2 className="text-xl font-semibold text-[var(--color-card-foreground)] dark:text-gray-100">Xianxu Has Been Updated!</h2>
            </div>
            <div className="flex items-start space-x-4">
                <div className="bg-[var(--color-accent)] dark:bg-purple-500 p-3 rounded-full">
                    <IconRefresh className="h-6 w-6 text-[var(--color-background)] dark:text-gray-200" />
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-2 text-[var(--color-card-foreground)] dark:text-gray-100">Version 2.0 Released</h3>
                    <p className="mb-3 text-[var(--color-card-foreground)] dark:text-gray-200">
                        Thank you for using Xianxu! We've made significant improvements to enhance your novel reading experience.
                    </p>
                    <p className="text-[var(--color-muted-foreground)] dark:text-gray-400 text-sm">
                        Released: May 22, 2025
                    </p>
                </div>
            </div>
        </section>
    );
};

export default VersionDetails;