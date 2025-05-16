'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';

// Dynamically import Lottie without SSR to avoid 'document is not defined' error
const Lottie = dynamic(() => import('lottie-react'), {
    ssr: false
});

interface FeatureProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    imageSrcDark?: string;
    animationData?: object;
}
// TODO: Fix the lottie gradient to: clip bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-4

const Feature = ({ title, description, imageSrc, imageAlt, imageSrcDark, animationData }: FeatureProps) => {
    return (
        <div className="grid-6 item">
            <div className="feature">
                <div className="box rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all">
                    <h1 className="title text-xl font-bold mb-2">
                        <span className="clip bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-400">
                            {title}
                        </span>
                    </h1>
                    <div className="details mb-4">
                        <p className="text-gray-600 dark:text-gray-300">{description}</p>
                    </div>
                    <div className="image mt-4">
                        {animationData ? (
                            <div className="h-[200px] w-full">
                                <Lottie
                                    animationData={animationData}
                                    loop={true}
                                    autoplay={true}
                                    className="w-full h-full"
                                />
                            </div>
                        ) : imageSrcDark ? (
                            <>
                                <Image
                                    src={imageSrc}
                                    alt={imageAlt}
                                    width={300}
                                    height={200}
                                    className="rounded-md object-cover light-image block dark:hidden"
                                />
                                <Image
                                    src={imageSrcDark}
                                    alt={imageAlt}
                                    width={300}
                                    height={200}
                                    className="rounded-md object-cover dark-image hidden dark:block"
                                />
                            </>
                        ) : (
                            <Image
                                src={imageSrc}
                                alt={imageAlt}
                                width={300}
                                height={200}
                                className="rounded-md object-cover"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feature;
