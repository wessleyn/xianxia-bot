import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react';
import { useTheme } from 'next-themes';
import React, { Fragment, useEffect, useState } from 'react';

const ThemeSelector: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-8 w-8"></div>; // Placeholder to prevent layout shift
  }

  const themeOptions = [
    { name: 'Light', value: 'light', icon: IconSun },
    { name: 'Dark', value: 'dark', icon: IconMoon },
    { name: 'System', value: 'system', icon: IconDeviceDesktop },
  ];

  return (
    <Popover className="relative mx-2">
      {({ open }) => (
        <>
          <PopoverButton
            className={`flex items-center gap-1 px-3 py-1.5 ${open ? 'bg-indigo-600/50' : 'bg-indigo-600/30'} hover:bg-indigo-600/50 rounded-md transition-colors focus:outline-none shadow-sm`}
            title="Theme Settings"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-palette"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" /><path d="M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
            <span className="text-xs font-medium">Theme</span>
          </PopoverButton>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <PopoverPanel className="fixed left-1/2 transform -translate-x-1/2 z-10 mt-2 w-64 rounded-md shadow-lg">
              <div className="bg-white dark:bg-gray-800 rounded-md pb-1 border border-gray-200 dark:border-gray-700 shadow-md text-gray-800 dark:text-gray-200 overflow-hidden">
                <div className="p-3 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-sm text-indigo-800 dark:text-indigo-300">Theme Settings</h4>
                  </div>
                </div>

                <div className="p-2">
                  <div className="grid grid-cols-3 gap-2">
                    {themeOptions.map((option) => {
                      const Icon = option.icon;
                      const isActive = theme === option.value;

                      return (
                        <button
                          key={option.value}
                          className={`flex flex-col items-center justify-center p-3 rounded-lg transition-colors ${isActive
                            ? 'bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                          onClick={() => setTheme(option.value)}
                        >
                          <Icon className="w-6 h-6 mb-2" />
                          <span className="text-xs font-medium">{option.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </PopoverPanel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default ThemeSelector;
