import { useNavigate } from 'react-router-dom';
import { useOnboardingStore } from '../../../../stores/useOnboardingStore';

const Settings = () => {
    const navigate = useNavigate();
    const { nextStep, prevStep, themePreference, setThemePreference } = useOnboardingStore();

    const handleNext = () => {
        nextStep();
        navigate('/features');
    };

    const handlePrev = () => {
        prevStep();
        navigate('/');
    };

    return (
        <>
            {/* Settings guide */}
            <section className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Customizing Your Experience</h2>
                <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-2">Essential Settings</h3>
                        <p className="mb-3">
                            Adjust these settings to optimize your reading experience:
                        </p>
                        <ul className="list-disc pl-5 mb-4 space-y-2">
                            <li>Reading preferences (font size, line spacing, margins)</li>
                            <li>Novel detection patterns and site configurations</li>
                            <li>Automatic tracking of reading progress</li>
                            <li>Notifications for updates</li>
                        </ul>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md transition-colors">
                            Open Settings
                        </button>
                    </div>
                </div>
            </section>

            {/* Theme options */}
            <section className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Theme Customization</h2>
                <div className="flex items-start space-x-4">
                    <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-amber-600 dark:text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-medium mb-2">Choose Your Theme</h3>
                        <p className="mb-3">
                            Xianxu supports different themes to improve your reading comfort:
                        </p>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div
                                className={`border-2 ${themePreference === 'light' ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'} p-3 rounded-lg text-center cursor-pointer`}
                                onClick={() => setThemePreference('light')}
                            >
                                <div className="h-8 w-full bg-white mb-2 rounded"></div>
                                <span>Light</span>
                            </div>
                            <div
                                className={`border-2 ${themePreference === 'dark' ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'} p-3 rounded-lg text-center cursor-pointer`}
                                onClick={() => setThemePreference('dark')}
                            >
                                <div className="h-8 w-full bg-gray-900 mb-2 rounded"></div>
                                <span>Dark</span>
                            </div>
                            <div
                                className={`border-2 ${themePreference === 'system' ? 'border-blue-500' : 'border-gray-300 dark:border-gray-600'} p-3 rounded-lg text-center cursor-pointer`}
                                onClick={() => setThemePreference('system')}
                            >
                                <div className="h-8 w-full bg-gradient-to-r from-white to-gray-900 mb-2 rounded"></div>
                                <span>System</span>
                            </div>
                        </div>
                    </div>
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

export default Settings;