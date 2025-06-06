import { ReadingTheme } from '@ctypes/index';
import { useSettingsStore } from '@stores/useSettingsStore';
import { IconMoon } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useOnboardingStore } from '../../../../../stores/useOnboardingStore';

const ThemeCustomization: React.FC = () => {
    const { theme, setTheme } = useSettingsStore();
    const [isToggled, setIsToggled] = useState(false);
    const { markThemeToggled } = useOnboardingStore();

    const handleThemeChange = (selectedTheme: ReadingTheme) => {
        setTheme(selectedTheme);
        setIsToggled(true);
        markThemeToggled(true);
    };

    return (
        <section className="mb-8 bg-[var(--color-card)] dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-card-foreground)] dark:text-gray-100">Theme Customization</h2>
            <div className="flex items-start space-x-4">
                <div className={`${isToggled ? 'bg-teal-400 dark:bg-teal-600' : 'bg-[var(--color-accent)] dark:bg-purple-600'} p-3 rounded-full`}>
                    <IconMoon className={`h-6 w-6 ${isToggled ? 'text-teal-600 dark:text-teal-200' : 'text-[var(--color-background)] dark:text-gray-200'}`} />
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-2 text-[var(--color-card-foreground)] dark:text-gray-100">Choose Your Theme</h3>
                    <p className="mb-3 text-[var(--color-card-foreground)] dark:text-gray-200">
                        Xianxu supports different themes to improve your reading comfort:
                    </p>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        <div
                            className={`border-2 ${theme === 'light' ? 'border-teal-600 dark:border-teal-400' : 'border-[var(--color-border)] dark:border-gray-700'} p-3 rounded-lg text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}
                            onClick={() => handleThemeChange('light' as ReadingTheme)}
                        >
                            <div className="h-8 w-full bg-white dark:bg-gray-200 mb-2 rounded shadow-sm"></div>
                            <span className="text-[var(--color-card-foreground)] dark:text-gray-200">Light</span>
                        </div>
                        <div
                            className={`border-2 ${theme === 'dark' ? 'border-teal-600 dark:border-teal-400' : 'border-[var(--color-border)] dark:border-gray-700'} p-3 rounded-lg text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}
                            onClick={() => handleThemeChange('dark' as ReadingTheme)}
                        >
                            <div className="h-8 w-full bg-gray-900 mb-2 rounded shadow-sm"></div>
                            <span className="text-[var(--color-card-foreground)] dark:text-gray-200">Dark</span>
                        </div>
                        <div
                            className={`border-2 ${theme === 'system' ? 'border-teal-600 dark:border-teal-400' : 'border-[var(--color-border)] dark:border-gray-700'} p-3 rounded-lg text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors`}
                            onClick={() => handleThemeChange('system' as ReadingTheme)}
                        >
                            <div className="h-8 w-full bg-gradient-to-r from-white to-gray-900 dark:from-gray-200 mb-2 rounded shadow-sm"></div>
                            <span className="text-[var(--color-card-foreground)] dark:text-gray-200">System</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ThemeCustomization;