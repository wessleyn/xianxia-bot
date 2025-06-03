import { IconChevronRight, IconRobot } from '@tabler/icons-react';
import Link from 'next/link';
import { ExtensionDropdown } from './ExtensionsDropDown';
import { MobileAppDropdown } from './MobileAppDropdown';
import NovelCarousel from './NovelCarousel';
import RegAuthBtn from './RegAuthBtn';


const data = {
    title: "Xianxu",
    tagline: "Webnovels in your spatial ring",
    description: "A simple and convenient open source webnovel reader from and for the community, where you can find and read your favorite webnovels easier than ever. Powered by advanced AI algorithms for personalized recommendations."
};

const HeroSection = () => {
    return (
        <section className="min-h-[84vh] flex items-center">
            <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="container">
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="main w-full lg:w-1/2 py-4 md:py-8">
                            <h1 className="title text-4xl sm:text-5xl font-bold mb-3 md:mb-4">
                                <span className="clip bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                                    {data.title}
                                </span>
                            </h1>
                            <h2 className="text text-2xl sm:text-3xl font-semibold mb-4 md:mb-6 text-gray-800 dark:text-gray-200">
                                <span className="clip">{data.tagline}</span>
                            </h2>
                            <p className="description text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-8">
                                {data.description}
                            </p>

                            <div className="ai-recommendation mb-5 md:mb-6">
                                <span className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900 px-3 py-1 text-sm font-medium text-purple-700 dark:text-purple-300 mr-2">
                                    <IconRobot size={16} className="mr-1" />
                                    AI-Powered
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">Smart recommendations tailored to your reading preferences</span>
                            </div>

                            <div className="actions flex flex-wrap gap-3 md:gap-4 md:items-center">
                                <MobileAppDropdown />
                                <ExtensionDropdown />
                                <RegAuthBtn />
                                <Link
                                    href="/manuals"
                                    className="text-purple-600 dark:text-purple-400 hover:underline flex items-center text-sm whitespace-nowrap"
                                >
                                    <span>Manuals</span>
                                    <IconChevronRight size={16} className="ml-1" />
                                </Link>
                            </div>
                        </div>

                        <div className="image w-full lg:w-1/2 mt-8 lg:mt-0 flex justify-center items-center">
                            <div className="image-container w-full max-w-md">
                                <NovelCarousel />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
