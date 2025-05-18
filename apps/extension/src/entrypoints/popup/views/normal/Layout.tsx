import { Logo } from '@components/Logo';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { IconDeviceDesktop, IconMoon, IconSun } from '@tabler/icons-react';
import { ThemeToggle } from '@repo/ui';
import { useTheme } from 'next-themes';
import React, { Fragment, ReactNode, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

interface LayoutProps {
  children?: ReactNode;
  isNovelSite?: boolean;
  novelTitle?: string;
}

const Layout: React.FC<LayoutProps> = ({ isNovelSite = false, novelTitle }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const tabs = [
    { name: 'Stats', path: '/' },
    { name: 'Current', path: '/current' },
    { name: 'Bookmarks', path: '/bookmarks' },
    { name: 'Downloads', path: '/downloads' },
  ];

  // Mock downloaded novels
  const downloadedNovels = [
    { id: 1, title: "Against the Gods", chapters: 530 },
    { id: 2, title: "Martial World", chapters: 214 },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  // Theme selector component
  const ThemeSelector = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // When mounted on client, now we can show the UI
    useEffect(() => setMounted(true), []);

    if (!mounted) {
      return <div className="h-24"></div>; // Placeholder to prevent layout shift
    }

    const themeOptions = [
      { name: 'Light', value: 'light', icon: IconSun },
      { name: 'Dark', value: 'dark', icon: IconMoon },
      { name: 'System', value: 'system', icon: IconDeviceDesktop },
    ];

    return (
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
    );
  };

  return (
    <div className="h-[450px] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <header className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-800 to-purple-700 dark:from-indigo-900 dark:to-purple-900 text-white shadow-md">
        <Popover className="relative">
          {({ open }) => (
            <>
              <PopoverButton
                className="flex items-center focus:outline-none"
                title={isLoggedIn ? "User Profile" : "Xianxu"}
              >
                {isLoggedIn ? (
                  <>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-sm">
                      <span className="text-sm font-medium">U</span>
                    </div>
                    <span className="ml-2 text-lg font-medium">User</span>
                  </>
                ) : (
                  <>
                    <Logo />
                    <span className="ml-2 text-2xl font-bold">Xianxu</span>
                  </>
                )}
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
                <PopoverPanel className="absolute left-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 focus:outline-none">
                  <div className="py-1">
                    {isLoggedIn && (
                      <div className="px-4 py-2 border-b dark:border-gray-700">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white">
                            <span className="text-sm font-medium">U</span>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">User</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">user@example.com</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <Link
                      to="/downloads"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-download mr-2" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
                          <path d="M7 11l5 5l5 -5"></path>
                          <path d="M12 4l0 12"></path>
                        </svg>
                        Downloads
                      </div>
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings mr-2" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                          <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                        </svg>
                        Settings
                      </div>
                    </Link>
                    {isLoggedIn && (
                      <button
                        onClick={toggleLogin}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout mr-2" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                            <path d="M7 12h14l-3 -3m0 6l3 -3"></path>
                          </svg>
                          Logout
                        </div>
                      </button>
                    )}
                    {!isLoggedIn && (
                      <button
                        onClick={toggleLogin}
                        className="block w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100"
                      >
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-login mr-2" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                            <path d="M20 12h-13l3 -3m0 6l-3 -3"></path>
                          </svg>
                          Login
                        </div>
                      </button>
                    )}
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>

        {/* Theme Toggle Button in Header */}
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
                  <div className="bg-white dark:bg-gray-800 rounded-md py-1 border border-gray-200 dark:border-gray-700 shadow-md text-gray-800 dark:text-gray-200 overflow-hidden">
                    <div className="p-3 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50">
                      <div className="flex justify-between items-center">
                        <h4 className="font-semibold text-sm text-indigo-800 dark:text-indigo-300">Theme Settings</h4>
                      </div>
                    </div>

                    <ThemeSelector />
                  </div>
                </PopoverPanel>
              </Transition>
            </>
          )}
        </Popover>

        <div className="relative">
          {isLoggedIn ? (
            <button
              onClick={toggleLogin}
              className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500/80 hover:bg-indigo-600/80 rounded-md transition-colors focus:outline-none shadow-sm"
              title="Sync data and logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-refresh" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"></path>
                <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"></path>
              </svg>
              <span className="text-xs font-medium">Sync</span>
            </button>
          ) : (
            <button
              onClick={toggleLogin}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-md transition-colors shadow-sm"
              title="Login to your account"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user-circle" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
              </svg>
              <span className="font-medium text-sm">Login</span>
            </button>
          )}
        </div>
      </header>

      <nav className="flex border-b bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm">
        {tabs.map(tab => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`relative flex-1 py-3 text-center text-sm ${isActive(tab.path)
              ? 'font-medium text-indigo-600'
              : 'text-gray-500 hover:text-indigo-500 transition-colors'
              }`}
          >
            {tab.name}
            {isActive(tab.path) && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500"></div>
            )}
          </Link>
        ))}
      </nav>

      <main className="flex-1 p-4 overflow-auto custom-scrollbar">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
