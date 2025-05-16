import Link from 'next/link';
import NovelCarousel from './NovelCarousel';

const data = {
    title: "Xianxu",
    tagline: "Webnovels in your spatial ring",
    description: "A simple and convenient open source webnovel reader from and for the community, where you can find and read your favorite webnovels easier than ever."
};

const HeroSection = () => {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16">
                <div className=" has-image">
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

                                <div className="actions flex flex-wrap gap-4">
                                    <Link
                                        href="/download"
                                        className="Button brand bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-3 rounded-full font-medium transition-all"
                                    >
                                        Download
                                    </Link>
                                    <Link
                                        href="/manuals"
                                        className="Button alt border-2 border-gray-300 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-500 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 px-8 py-3 rounded-full font-medium transition-all"
                                    >
                                        Manuals
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
            </div>
        </section>
    );
};

export default HeroSection;
