import maintenanceSvg from '@assets/svg/website-maintenance.svg';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Manual | Xianxu',
  description: 'Learn, how to operate xianxu',
};

export default function ManualPage() {
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
          
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center h-10 px-6 py-3 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
