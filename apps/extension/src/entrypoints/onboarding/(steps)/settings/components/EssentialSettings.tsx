import { useOnboardingStore } from '@stores/useOnboardingStore';
import { useSettingsStore } from '@stores/useSettingsStore';
import { IconAdjustments, IconSettings } from '@tabler/icons-react';
import React from 'react';

const EssentialSettings: React.FC = () => {
    const { toggleAutoSync, autoSync, readingProgress, toggleReadingProgress, } = useSettingsStore();
    const {markEssentialSettingsComplete} = useOnboardingStore()
    const isCompleted = autoSync && readingProgress

     markEssentialSettingsComplete(isCompleted)


    
    return (
        <section className="mb-8 bg-[var(--color-card)] p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[var(--color-card-foreground)]">Customizing Your Experience</h2>
            <div className="flex items-start space-x-4">
                <div className={`${isCompleted ? 'bg-teal-400' : 'bg-[var(--color-accent)]'} p-3 rounded-full`}>
                    <IconSettings className={`h-6 w-6 ${isCompleted ? 'text-teal-600' : 'text-[var(--color-background)]'}`} />
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-2 text-[var(--color-card-foreground)]">Essential Settings</h3>
                    <p className="mb-3 text-[var(--color-card-foreground)]">
                        Adjust these settings to optimize your reading experience:
                    </p>
                    <ul className="list-none pl-5 mb-4 flex flex-col space-y-2">
                        <li>
                            <label className="inline-flex items-center me-5 cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" checked={autoSync} onChange={toggleAutoSync} />
                                <div className="relative w-11 h-6 bg-[var(--color-muted)] rounded-full peer peer-focus:ring-4 peer-focus:ring-teal-100 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-[var(--color-border)] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                <span className="ms-3 text-sm font-medium text-[var(--color-card-foreground)]">Auto Sync</span>
                            </label>
                        </li>
                        <li>
                            <label className="inline-flex items-center me-5 cursor-pointer">
                                <input type="checkbox" value="" className="sr-only peer" checked={readingProgress} onChange={toggleReadingProgress} />
                                <div className="relative w-11 h-6 bg-[var(--color-muted)] rounded-full peer peer-focus:ring-4 peer-focus:ring-teal-100 dark:peer-focus:ring-teal-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-[var(--color-border)] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                                <span className="ms-3 text-sm font-medium text-[var(--color-card-foreground)]">Reading Progress</span>
                            </label>
                        </li>
                    </ul>
                    <button className={`
                    ${isCompleted ? 
                        'bg-teal-600 hover:bg-teal-700' 
                        : 
                        'bg-purple-600 hover:bg-purple-700'
                    }
                    text-white px-4 py-2 rounded-md transition-colors flex items-center
                    `}>
                        <IconAdjustments className="mr-2" size={18} />
                        Open Settings
                    </button>
                </div>
            </div>
        </section>
    );
};

export default EssentialSettings;