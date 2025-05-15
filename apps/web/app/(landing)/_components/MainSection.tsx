import Link from 'next/link';
import Feature from './Feature';
import NovelCarousel from './NovelCarousel';

const data = {
    title: "Xianxu",
    tagline: "Webnovels in your spatial ring",
    description: "A simple and convenient open source webnovel reader from and for the community, where you can find and read your favorite webnovels easier than ever."
}

const features = [
    {
        title: "Huge collection of sources",
        description: "Access over a thousand different sources of webnovels",
        imageSrc: "/img/feature-sources-light.webp",
        imageSrcDark: "/img/feature-sources-dark.webp",
        imageAlt: "Feature Sources"
    },
    {
        title: "Customizable reader",
        description: "Make reading even more convenient with different reader settings",
        imageSrc: "/img/feature-reader-light.webp",
        imageSrcDark: "/img/feature-reader-dark.webp",
        imageAlt: "Feature Reader"
    },
    {
        title: "Supports tracking",
        description: "Easily track your reading progress across multiple platforms",
        imageSrc: "/img/feature-tracking-light.webp",
        imageSrcDark: "/img/feature-tracking-dark.webp",
        imageAlt: "Feature Tracking"
    },
    {
        title: "Smart search",
        description: "Search for interested titles quickly and easily",
        imageSrc: "/img/feature-search-light.webp",
        imageSrcDark: "/img/feature-search-dark.webp",
        imageAlt: "Feature Search"
    },
    {
        title: "Powerful downloader",
        description: "Download titles to read offline whenever and wherever",
        imageSrc: "/img/feature-downloads-light.webp",
        imageSrcDark: "/img/feature-downloads-dark.webp",
        imageAlt: "Feature Downloads"
    },
    {
        title: "Synchronization",
        description: "Easily sync reading progress between your devices",
        imageSrc: "/img/feature-sync-light.webp",
        imageSrcDark: "/img/feature-sync-dark.webp",
        imageAlt: "Feature Sync"
    }
];

const MainSection = () => {
    return (
        <>
            {/* Hero Section */}
            <section className="bg-white dark:bg-gray-900">
                <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-16">
                    <div className="VPHomeHero has-image">
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

            {/* Features Section */}
            <section className="bg-gray-50 dark:bg-gray-800 py-16">
                <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                    <div className="FeatureTitle text-center mb-16">
                        <div className="container">
                            <p className="title text-xl font-medium text-purple-600 dark:text-purple-400 mb-2">What Xianxu can do?</p>
                            <h1 className="subtitle text-3xl font-bold text-gray-900 dark:text-white">And here&apos;s what it does!</h1>
                        </div>
                    </div>

                    <div className="Features">
                        <div className="container">
                            <div className="items grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {features.map((feature, index) => (
                                    <Feature
                                        key={index}
                                        title={feature.title}
                                        description={feature.description}
                                        imageSrc={feature.imageSrc}
                                        imageSrcDark={feature.imageSrcDark}
                                        imageAlt={feature.imageAlt}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MainSection;