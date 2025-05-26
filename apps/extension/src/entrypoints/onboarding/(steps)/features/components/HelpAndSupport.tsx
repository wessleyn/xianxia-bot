import { IconBook2, IconBug, IconHelp } from '@tabler/icons-react';
import React from 'react';

interface HelpLinkProps {
    text: string;
    icon: React.ReactNode;
    href?: string;
}

const HelpLink: React.FC<HelpLinkProps> = ({ text, icon, href = "#" }) => (
    <a href={href} className="inline-flex items-center text-[var(--color-primary)] hover:underline">
        <span className="mr-2">{text}</span>
        {icon}
    </a>
);

const HelpAndSupport: React.FC = () => {
    return (
        <section className="mb-8 bg-[var(--color-card)] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-card-foreground)]">Need Help?</h2>
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
        </section>
    );
};

export default HelpAndSupport;