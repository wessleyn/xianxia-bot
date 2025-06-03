import {
    IconBrandDiscord,
    IconBrandGithub,
    IconBrandTelegram,
    IconFileText,
    IconShieldLock
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

// Define types for the link structure
type FooterLink = {
    name: string;
    href: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: React.FC<any>;
    isExternal?: boolean;
};

type FooterSection = {
    title: string;
    links: FooterLink[];
};

const footerLinks: FooterSection[] = [
    {
        title: 'Legal',
        links: [
            {
                name: 'Privacy',
                href: '/privacy',
                icon: IconShieldLock
            },
            {
                name: 'Terms of Service',
                href: '/terms',
                icon: IconFileText
            },
        ]
    },
    {
        title: 'Social',
        links: [
            {
                name: 'GitHub',
                href: 'https://github.com/wessleyn/xianxia-bot',
                icon: IconBrandGithub,
                isExternal: true
            },
            {
                name: 'Discord',
                href: 'https://discord.gg/Uk46pW6v',
                icon: IconBrandDiscord,
                isExternal: true
            },
            {
                name: 'Telegram',
                href: 'https://t.me/',
                icon: IconBrandTelegram,
                isExternal: true
            },
        ]
    }
];

const Footer = () => {
    return (
        <div className="w-full slide-enter">
            <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-8">
                <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <nav className="">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Legal</h3>
                        <ul className="space-y-2">
                            {footerLinks[0]!.links.map((link) => (
                                <li key={link.name} className="">
                                    <Link className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 flex items-center gap-2" href={link.href}>
                                        <link.icon className="h-4 w-4" />
                                        <span>{link.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="qrcode flex flex-col items-center">
                        <div className="h-32 w-32 rounded-md mb-2 relative overflow-hidden">
                            <Image
                                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://discord.gg/Uk46pW6v"
                                alt="QR Code to Discord Community"
                                fill
                                className="object-cover"
                                sizes="128px"
                                priority
                            />
                        </div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Discord Community</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Join our community</p>
                    </div>

                    <div className="text-right">
                        <div className="mb-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                <Link
                                    href="https://github.com/wessleyn/xianxia-bot/blob/main/LICENSE"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-purple-600 dark:hover:text-purple-400"
                                >
                                    GPL-3.0 Licensed
                                </Link>
                            </p>
                        </div>
                        <ul className="flex justify-end space-x-4">
                            {footerLinks[1]!.links.map((link) => (
                                <li key={link.name} className="">
                                    <a
                                        href={link.href}
                                        target={link.isExternal ? "_blank" : undefined}
                                        rel={link.isExternal ? "noopener noreferrer" : undefined}
                                        aria-label={link.name}
                                        className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400"
                                    >
                                        <link.icon className="h-6 w-6" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
