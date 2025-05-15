'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

// Sample data for webnovels
const novels = [
    {
        id: 1,
        title: 'Martial Peak',
        cover: '/peak.jpeg',
        description: 'The journey to the martial peak is a lonely, solitary and long one. In the face of adversity, you must survive and remain unyielding.'
    },
    {
        id: 2,
        title: 'Against the Gods',
        cover: '/atg.png',
        description: 'A boy seeking power, a journey defying fate. Yun Che faces the heavens with unwavering determination.'
    },
    {
        id: 3,
        title: 'Tales of Demons and Gods',
        cover: '/tales.jpeg',
        description: 'A reincarnated prodigy returns to his youth to correct past mistakes and protect his loved ones.'
    }
];

const NovelCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto toggle between novels
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % novels.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, []);

    // Manual navigation
    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % novels.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? novels.length - 1 : prevIndex - 1));
    };

    return (
        <div className="relative w-full max-w-[400px]aspect-[2/3] max-h-[500px]  mx-auto">
            <div className="overflow-hidden rounded-lg shadow-xl bg-white dark:bg-gray-800">
                <div className="relative">
                    {/* Carousel content */}
                    <div className="relative aspect-[2/3] max-h-[500px]">
                        {novels[currentIndex] && (
                            <>
                                <Image
                                    src={novels[currentIndex]?.cover || ''}
                                    alt={novels[currentIndex]?.title || 'Novel cover'}
                                    className="transition-all duration-500 ease-in-out transform"
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 400px"
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                                    <div className="absolute bottom-0 left-0 p-6 text-white">
                                        <h3 className="text-2xl font-bold">{novels[currentIndex]?.title}</h3>
                                        <p className="mt-2 text-sm">{novels[currentIndex]?.description}</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Navigation buttons - auto-hide on hover */}
                    <div className="opacity-0 hover:opacity-100 transition-opacity duration-300 absolute inset-0 flex items-center justify-between px-4">
                        <button
                            onClick={goToPrevious}
                            className="bg-white/30 hover:bg-white/50 text-white rounded-full p-2 backdrop-blur-sm"
                            aria-label="Previous novel"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            onClick={goToNext}
                            className="bg-white/30 hover:bg-white/50 text-white rounded-full p-2 backdrop-blur-sm"
                            aria-label="Next novel"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Indicators */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                    {novels.map((_, index) => (
                        <button
                            key={index}
                            className={`h-2 w-2 rounded-full ${currentIndex === index ? 'bg-white' : 'bg-white/50'
                                }`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NovelCarousel;
