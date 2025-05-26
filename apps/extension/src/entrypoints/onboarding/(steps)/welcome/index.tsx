import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '../../../../stores/useOnboardingStore';

const Welcome = () => {
    const navigate = useNavigate();
    const { nextStep } = useOnboardingStore();

    const handleNext = () => {
        nextStep();
        navigate('/settings');
    };

    return (
        <>
            {/* Introduction */}
            <section className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Welcome to Xianxu</h2>
                <p className="mb-4">
                    Thank you for installing Xianxu! This extension helps you manage and enhance your novel reading experience.
                    Let's get you set up in just a few steps:
                </p>
            </section>

            {/* Login importance */}
            <section className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Account Setup</h2>
                <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-2">Why Login Matters</h3>
                        <p className="mb-3">
                            Logging in to your account allows you to:
                        </p>
                        <ul className="list-disc pl-5 mb-4 space-y-2">
                            <li>Sync your reading progress across devices</li>
                            <li>Save your favorite novels and chapters</li>
                            <li>Access personalized recommendations</li>
                            <li>Get updates on new chapters from your favorite series</li>
                        </ul>
                        <div className="flex space-x-4">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                                Sign In
                            </button>
                            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition-colors">
                                Create Account
                            </button>
                        </div>
                        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                            <p>You can also continue without an account, but some features will be limited.</p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="flex justify-end mt-4">
                <button
                    onClick={handleNext}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md transition-colors flex items-center"
                >
                    Next
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
        </>
    );
};

export default Welcome;