import { IconBook2, IconBug, IconHelp } from '@tabler/icons-react';
import React from 'react';

interface HelpLinkProps {
    text: string;
    icon: React.ReactNode;
    href?: string;
}

const HelpLink: React.FC<HelpLinkProps> = ({ text, icon, href = "#" }) => (
    <a href={href} className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
        <span className="mr-2">{text}</span>
        {icon}
    </a>
);

const HelpAndSupport: React.FC = () => {
    return (
        <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
            <div className="flex flex-wrap gap-4">
                <HelpLink
                    text="View Documentation"
                    icon={<IconBook2 size={16} />}
                />
                <HelpLink
                    text="Get Support"
                    icon={<IconHelp size={16} />}
                />
                <HelpLink
                    text="Report an Issue"
                    icon={<IconBug size={16} />}
                />
            </div>
        </section>
    );
};

export default HelpAndSupport;