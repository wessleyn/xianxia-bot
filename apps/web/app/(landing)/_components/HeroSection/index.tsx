import Link from 'next/link';
import { ExtensionDropdown } from './ExtensionsDropDown';
import NovelCarousel from './NovelCarousel';
import RegAuthBtn from './RegAuthBtn';


const data = {
    title: "Xianxu",
    tagline: "Webnovels in your spatial ring",
    description: "A simple and convenient open source webnovel reader from and for the community, where you can find and read your favorite webnovels easier than ever. Powered by advanced AI algorithms for personalized recommendations."
};

const HeroSection = () => {
    return (
        <section>
            <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16">
                <div className="container">
                    <div className="flex flex-col lg:flex-row items-center">
                        <div className="main lg:w-1/2 py-8">
                            <h1 className="title text-5xl font-bold mb-4">
                                <span className="clip bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                                    {data.title}
                                </span>
                            </h1>
                            <h2 className="text text-3xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                                <span className="clip">{data.tagline}</span>
                            </h2>
                            <p className="description text-lg text-gray-600 dark:text-gray-300 mb-8">
                                {data.description}
                            </p>

                            <div className="ai-recommendation mb-6">
                                <span className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900 px-3 py-1 text-sm font-medium text-purple-700 dark:text-purple-300 mr-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 mr-1">
                                        <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
                                    </svg>
                                    AI-Powered
                                </span>
                                <span className="text-sm text-gray-600 dark:text-gray-400">Smart recommendations tailored to your reading preferences</span>
                            </div>

                            <div className="actions flex items-center space-x-3">
                                <RegAuthBtn />
                                <Link
                                    href="/download/mobile"
                                    className="Button brand bg-gradient-to-r from-indigo-400 to-blue-500 hover:from-indigo-400 hover:to-blue-600 text-white px-4 py-2 rounded-full font-medium transition-all text-sm whitespace-nowrap"
                                >
                                    Mobile App
                                </Link>
                                <ExtensionDropdown />
                                <Link
                                    href="/manuals"
                                    className="text-purple-600 dark:text-purple-400 hover:underline flex items-center text-sm whitespace-nowrap"
                                >
                                    <span>Manuals</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        <div className="image lg:w-1/2 mt-10 lg:mt-0 flex justify-center items-center">
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
