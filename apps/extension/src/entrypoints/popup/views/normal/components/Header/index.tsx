import { Logo } from '@components/Logo';
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import ThemeSelector from '../ThemeSelector';

interface HeaderProps {
  isLoggedIn: boolean;
  toggleLogin: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, toggleLogin }) => {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-800 to-purple-700 dark:from-indigo-900 dark:to-purple-900 text-white shadow-md">
      {/* Brand/Logo Section */}
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
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
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
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-settings mr-2" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                        <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                      </svg>
                      Settings
                    </div>
                  </Link>
                  {isLoggedIn && (
                    <button
                      onClick={toggleLogin}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
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
                    <Link
                      to="/login"
                      className="block w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-login mr-2" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                          <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
                          <path d="M20 12h-13l3 -3m0 6l-3 -3"></path>
                        </svg>
                        Login
                      </div>
                    </Link>
                  )}
                </div>
              </PopoverPanel>
            </Transition>
          </>
        )}
      </Popover>

      {/* Theme Toggle Button in Header */}
      <ThemeSelector />

      {/* Login/Sync Button */}
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
          <Link
            to="/login"
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
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
