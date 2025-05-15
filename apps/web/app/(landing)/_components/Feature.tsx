import Image from 'next/image';

interface FeatureProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    imageSrcDark?: string;
}

const Feature = ({ title, description, imageSrc, imageAlt, imageSrcDark }: FeatureProps) => {
    return (
        <div className="grid-6 item">
            <div className="feature">
                <div className="box rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 p-6 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all">
                    <h1 className="title text-xl font-bold mb-2">
                        <span className="clip bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
                            {title}
                        </span>
                    </h1>
                    <div className="details mb-4">
                        <p className="text-gray-600 dark:text-gray-300">{description}</p>
                    </div>
                    <div className="image mt-4">
                        {imageSrcDark ? (
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
