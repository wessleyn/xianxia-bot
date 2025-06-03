import documentCloud from '@assets/lottie/document-cloud.json';
import documentDownload from '@assets/lottie/document-download.json';
import documentScan from '@assets/lottie/document-scan.json';
import documentSearch from '@assets/lottie/document-search.json';
import newspaper from '@assets/lottie/newspaper.json';
import writeList from '@assets/lottie/write-list.json';
import Feature from './Feature';

const features = [
    {
        title: "Huge collection of sources",
        description: "Access over a thousand different sources of webnovels",
        imageSrc: "/img/feature-sources-light.webp",
        imageSrcDark: "/img/feature-sources-dark.webp",
        imageAlt: "Feature Sources",
        animationData: documentSearch
    },
    {
        title: "Customizable reader",
        description: "Make reading even more convenient with different reader settings",
        imageSrc: "/img/feature-reader-light.webp",
        imageSrcDark: "/img/feature-reader-dark.webp",
        imageAlt: "Feature Reader",
        animationData: newspaper
    },
    {
        title: "Supports tracking",
        description: "Easily track your reading progress across multiple platforms",
        imageSrc: "/img/feature-tracking-light.webp",
        imageSrcDark: "/img/feature-tracking-dark.webp",
        imageAlt: "Feature Tracking",
        animationData: writeList
    },
    {
        title: "Smart search",
        description: "Search for interested titles quickly and easily",
        imageSrc: "/img/feature-search-light.webp",
        imageSrcDark: "/img/feature-search-dark.webp",
        imageAlt: "Feature Search",
        animationData: documentScan
    },
    {
        title: "Powerful downloader",
        description: "Download titles to read offline whenever and wherever",
        imageSrc: "/img/feature-downloads-light.webp",
        imageSrcDark: "/img/feature-downloads-dark.webp",
        imageAlt: "Feature Downloads",
        animationData: documentDownload
    },
    {
        title: "Synchronization",
        description: "Easily sync reading progress between your devices",
        imageSrc: "/img/feature-sync-light.webp",
        imageSrcDark: "/img/feature-sync-dark.webp",
        imageAlt: "Feature Sync",
        animationData: documentCloud
    }
];

const FeaturesSection = () => {
    return (
        <section className="bg-gray-50 dark:bg-gray-800 py-16">
            <div className="container mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="FeatureTitle text-center mb-16">
                    <div className="container">
                        <p className="title text-xl font-medium clip bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-400 mb-2">What Xianxu can do?</p>
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
                                    animationData={feature.animationData}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
