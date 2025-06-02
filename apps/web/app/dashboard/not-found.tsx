import maintenanceSvg from '@assets/website-maintenance.svg';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Feature Coming Soon | Dashboard',
    description: 'This feature is currently under development and will be available soon.',
    robots: {
        index: false,
        follow: false,
    }
};

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-900 px-4 py-16">
            <div className="text-center max-w-3xl">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                    Feature Coming Soon
                </h1>

                <div className="w-full max-w-md mx-auto mb-8">
                    <Image
                        src={maintenanceSvg}
                        alt="Feature under construction"
                        width={360}
                        height={360}
                        priority
                        className="mx-auto"
                    />
                </div>

                <div className="space-y-6">
                    <p className="text-lg text-gray-600 dark:text-gray-300">
                        We&apos;re working hard on implementing this feature for an enhanced reading experience.
                    </p>

                    <div className="bg-purple-50 dark:bg-gray-800 border border-purple-200 dark:border-purple-900 rounded-lg p-4 text-gray-700 dark:text-gray-300">
                        <p className="font-medium text-purple-700 dark:text-purple-400 mb-2">Cultivation Never Stops!</p>
                        <p>Our warriors are diligently working on this section. Come back later to discover new relics.</p>
                    </div>

                    <div className="mt-8">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center justify-center h-10 px-6 py-3 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
                        >
                            Return to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
