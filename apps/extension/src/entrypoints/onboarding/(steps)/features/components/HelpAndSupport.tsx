import { IconBook2, IconBug, IconHelp, IconInfoCircle } from '@tabler/icons-react';
import React from 'react';

interface HelpLinkProps {
    text: string;
    icon: React.ReactNode;
    href?: string;
}

const HelpLink: React.FC<HelpLinkProps> = ({ text, icon, href = "#" }) => (
    <a href={href} className="inline-flex items-center text-[var(--color-primary)] dark:text-purple-300 hover:underline">
        <span className="mr-2">{text}</span>
        {icon}
    </a>
);

const HelpAndSupport: React.FC = () => {
    return (
        <section className="mb-8 bg-[var(--color-card)] dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-card-foreground)] dark:text-gray-100">Need Help?</h2>
            <div className="flex flex-wrap gap-4">
                <HelpLink
                    text="View Manual"
                    icon={<IconBook2 size={16} />}
                />
                <HelpLink
                    text="Get Guidance"
                    icon={<IconHelp size={16} />}
                />
                <HelpLink
                    text="Report an Issue"
                    icon={<IconBug size={16} />}
                />
            </div>
            <div className="flex items-start space-x-4 mt-4">
                <div className="bg-[var(--color-accent)] dark:bg-purple-500 p-3 rounded-full">
                    <IconHelp className="h-6 w-6 text-[var(--color-background)] dark:text-gray-200" />
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-2 text-[var(--color-card-foreground)] dark:text-gray-100">We're Here to Help</h3>
                    <p className="mb-3 text-[var(--color-card-foreground)] dark:text-gray-200">
                        If you have any questions or run into any issues, we're here to help:
                    </p>
                    <ul className="space-y-3 mb-4">
                        <li className="flex items-start">
                            <IconInfoCircle className="mr-2 mt-1 min-w-[20px] text-[var(--color-primary)] dark:text-purple-300" size={20} />
                            <span className="text-[var(--color-card-foreground)] dark:text-gray-200">Check out our <a href="#" className="underline text-[var(--color-primary)] dark:text-purple-300">documentation</a> for detailed guides on all features</span>
                        </li>
                        <li className="flex items-start">
                            <IconInfoCircle className="mr-2 mt-1 min-w-[20px] text-[var(--color-primary)] dark:text-purple-300" size={20} />
                            <span className="text-[var(--color-card-foreground)] dark:text-gray-200">Join our <a href="#" className="underline text-[var(--color-primary)] dark:text-purple-300">Discord community</a> to connect with other readers</span>
                        </li>
                        <li className="flex items-start">
                            <IconInfoCircle className="mr-2 mt-1 min-w-[20px] text-[var(--color-primary)] dark:text-purple-300" size={20} />
                            <span className="text-[var(--color-card-foreground)] dark:text-gray-200">Contact our <a href="#" className="underline text-[var(--color-primary)] dark:text-purple-300">support team</a> for personalized assistance</span>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default HelpAndSupport;