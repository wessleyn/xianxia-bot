import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
    return (
        <div className=" w-full slide-enter">
            <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-8">
                <div className="footer__content mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <nav className="footer__navigation">
                        <h3 className="footer__title text-lg font-bold text-gray-900 dark:text-white mb-4">Legal</h3>
                        <ul className="footer__list space-y-2">
                            <li className="footer__item">
                                <Link className="link text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400" href="/privacy">
                                    Privacy
                                </Link>
                            </li>
                            <li className="footer__item">
                                <Link className="link text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400" href="/terms">
                                    Terms of Service
                                </Link>
                            </li>
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
                        <h4 className="qrcode__title font-medium text-gray-900 dark:text-white">Discord Community</h4>
                        <p className="qrcode__description text-sm text-gray-600 dark:text-gray-400">Join our community</p>
                    </div>

                    <div className="text-right">
                        <div className="footer__copyright mb-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                GPL-3.0 Licensed<br />
                                Xianxu Developers
                            </p>
                        </div>
                        <ul className="footer__socials flex justify-end space-x-4">
                            <li className="footer__social-item">
                                <a href="https://github.com/wessleyn/xianxia-bot" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current">
                                        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                                    </svg>
                                </a>
                            </li>
                            <li className="footer__social-item">
                                <a href="https://discord.gg/Uk46pW6v" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current">
                                        <path d="M19.27,5.33C17.94,4.71 16.5,4.26 15,4c-0.03,0 -0.05,0.01 -0.07,0.03c-0.18,0.33 -0.39,0.76 -0.53,1.09c-1.61,-0.24 -3.22,-0.24 -4.8,0C9.46,4.78 9.25,4.36 9.06,4.03C9.05,4.01 9.02,4 8.99,4c-1.5,0.26 -2.93,0.71 -4.27,1.33c-0.01,0 -0.02,0.01 -0.03,0.02c-2.72,4.07 -3.47,8.03 -3.1,11.95c0,0.02 0.01,0.04 0.03,0.05c1.8,1.32 3.53,2.12 5.24,2.65c0.03,0.01 0.06,0 0.07,-0.02c0.4,-0.55 0.76,-1.13 1.07,-1.74c0.02,-0.04 0,-0.08 -0.04,-0.09c-0.57,-0.22 -1.11,-0.48 -1.64,-0.78c-0.04,-0.02 -0.04,-0.08 -0.01,-0.11c0.11,-0.08 0.22,-0.17 0.33,-0.25c0.02,-0.02 0.05,-0.02 0.07,-0.01c3.44,1.57 7.15,1.57 10.55,0c0.02,-0.01 0.05,-0.01 0.07,0.01c0.11,0.09 0.22,0.17 0.33,0.26c0.04,0.03 0.04,0.09 -0.01,0.11c-0.52,0.31 -1.07,0.56 -1.64,0.78c-0.04,0.01 -0.05,0.06 -0.04,0.09c0.32,0.61 0.68,1.19 1.07,1.74C17.07,20 17.1,20.01 17.13,20c1.72,-0.53 3.45,-1.33 5.25,-2.65c0.02,-0.01 0.03,-0.03 0.03,-0.05c0.44,-4.53 -0.73,-8.46 -3.1,-11.95C19.3,5.34 19.29,5.33 19.27,5.33zM8.52,14.91c-1.03,0 -1.89,-0.95 -1.89,-2.12s0.84,-2.12 1.89,-2.12c1.06,0 1.9,0.96 1.89,2.12C10.41,13.96 9.57,14.91 8.52,14.91zM15.49,14.91c-1.03,0 -1.89,-0.95 -1.89,-2.12s0.84,-2.12 1.89,-2.12c1.06,0 1.9,0.96 1.89,2.12C17.38,13.96 16.55,14.91 15.49,14.91z" />
                                    </svg>
                                </a>
                            </li>
                            <li className="footer__social-item">
                                <a href="https://t.me/" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400">
                                    <svg role="img" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current">
                                        <path d="m196.03,328.68 l162,118.8c16.8,10.8 31.2,4.8 36,-16.8l66,-309.6c6,-26.4 -10.8,-38.4 -28.8,-30L46.03,239.88c-25.2,9.6 -25.2,25.2 -4.8,31.2l99.6,31.2 228,-145.2c10.8,-6 20.4,-3.6 13.2,4.8" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
