import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: '404 - Page Not Found',
    description: 'The cultivation path you seek cannot be found',
};

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center py-24 px-4 min-h-[70vh]">
            <div className="text-center max-w-md">
                <h1 className="text-6xl font-bold text-purple-600 dark:text-purple-400 mb-4">404</h1>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                    This Cultivation Path Does Not Exist
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                    The spiritual realm you seek cannot be found. Perhaps it is hidden, or perhaps it is yet to be created.
                </p>
                <Link
                    href="/"
                    className="inline-block bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-medium px-6 py-3 rounded-full hover:from-purple-600 hover:to-indigo-700 transition-all shadow-md"
                >
                    Return to the Main Realm
                </Link>
            </div>
        </div>
    );
}