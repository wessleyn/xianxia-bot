import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '../../../../stores/useOnboardingStore';

const Features = () => {
    const navigate = useNavigate();
    const { prevStep, completeOnboarding } = useOnboardingStore();

    const handleFinish = () => {
        completeOnboarding();
        // In a real implementation, this could redirect to popup or close the onboarding tab
        alert("Onboarding complete! You're all set to use Xianxu!");
    };

    const handlePrev = () => {
        prevStep();
        navigate('/settings');
    };

    return (
        <>
            {/* Quick start features */}
            <section className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Try These Features Now</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Detect Novels</h3>
                        <p className="mb-3">Automatically detect novel content on any webpage.</p>
                        <button className="text-blue-600 dark:text-blue-400 hover:underline">Try now →</button>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Reading Mode</h3>
                        <p className="mb-3">Transform any novel page into a clean, distraction-free reading experience.</p>
                        <button className="text-blue-600 dark:text-blue-400 hover:underline">Try now →</button>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Download Novels</h3>
                        <p className="mb-3">Save novels for offline reading anytime, anywhere.</p>
                        <button className="text-blue-600 dark:text-blue-400 hover:underline">Try now →</button>
                    </div>
                    <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-2">Translation</h3>
                        <p className="mb-3">Translate novel content between languages with a single click.</p>
                        <button className="text-blue-600 dark:text-blue-400 hover:underline">Try now →</button>
                    </div>
                </div>
            </section>

            {/* Help & support */}
            <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Need Help?</h2>
                <div className="flex flex-wrap gap-4">
                    <a href="#" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                        <span className="mr-2">View Documentation</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                    <a href="#" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                        <span className="mr-2">Get Support</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                    <a href="#" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
                        <span className="mr-2">Report an Issue</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>
            </section>

            <div className="flex justify-between mt-4">
                <button
                    onClick={handlePrev}
                    className="border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium px-6 py-2 rounded-md transition-colors flex items-center"
                >
                    <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Back
                </button>
                <button
                    onClick={handleFinish}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-md transition-colors flex items-center"
                >
                    Finish
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </button>
            </div>
        </>
    );
};

export default Features;