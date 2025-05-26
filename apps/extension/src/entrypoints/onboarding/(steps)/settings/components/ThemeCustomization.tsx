import { IconMoon } from '@tabler/icons-react';
import React from 'react';
import { useOnboardingStore } from '../../../../../stores/useOnboardingStore';

const ThemeCustomization: React.FC = () => {
    const { themePreference, setThemePreference } = useOnboardingStore();

    return (
        <section className="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Theme Customization</h2>
            <div className="flex items-start space-x-4">
                <div className="bg-amber-100 dark:bg-amber-900 p-3 rounded-full">
                    <IconMoon className="h-6 w-6 text-amber-600 dark:text-amber-300" />
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
    );
};

export default ThemeCustomization;