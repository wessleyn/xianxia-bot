import { IconCheckbox, IconCloudComputing, IconDeviceMobile, IconLanguage } from '@tabler/icons-react';
import React from 'react';

interface FeatureItemProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, description, icon }) => (
    <div className="flex items-start space-x-3 mb-4">
        <div className="mt-1 text-[var(--color-primary)] dark:text-purple-300">
            {icon}
        </div>
        <div>
            <h3 className="font-medium text-[var(--color-card-foreground)] dark:text-gray-100">{title}</h3>
            <p className="text-sm text-[var(--color-muted-foreground)] dark:text-gray-300">{description}</p>
        </div>
    </div>
);

const FeatureDetails: React.FC = () => {
    return (
        <section className="mb-8 bg-[var(--color-card)] dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-card-foreground)] dark:text-gray-100">What's Improved</h2>

            <div className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium mb-3 text-[var(--color-card-foreground)] dark:text-gray-100">Reading Experience</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FeatureItem
                            title="Enhanced Dark Mode"
                            description="Better contrast and reduced eye strain in low-light environments"
                            icon={<IconDeviceMobile size={20} />}
                        />
                        <FeatureItem
                            title="Performance Boost"
                            description="Faster loading times and smoother scrolling"
                            icon={<IconCloudComputing size={20} />}
                        />
                        <FeatureItem
                            title="More Translation Options"
                            description="Support for 5 additional languages"
                            icon={<IconLanguage size={20} />}
                        />
                        <FeatureItem
                            title="Reading Progress Sync"
                            description="Seamlessly continue reading across devices"
                            icon={<IconCheckbox size={20} />}
                        />
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-medium mb-3 text-[var(--color-card-foreground)] dark:text-gray-100">Bug Fixes</h3>
                    <ul className="list-disc pl-6 space-y-1 text-[var(--color-card-foreground)] dark:text-gray-200">
                        <li>Fixed synchronization issues on certain websites</li>
                        <li>Improved novel detection on dynamic pages</li>
                        <li>Corrected text formatting in reading mode</li>
                        <li>Fixed offline mode access problems</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default FeatureDetails;