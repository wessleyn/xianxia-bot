import { Logo } from '@components/Logo';
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Layout: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  const tabs = [
    { name: 'Stats', path: '/' },
    { name: 'Current', path: '/current' },
    { name: 'Bookmarks', path: '/bookmarks' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="w-[380px] h-[450px] bg-gray-50 text-gray-900 flex flex-col">
      <header className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-800 to-purple-700 text-white shadow-md">
        <div className="flex items-center">
          <Logo />
          <span className="ml-2 text-2xl font-bold">Xianxu</span>
        </div>
        <div className="relative">
          {isLoggedIn ? (
            <>
              <button
                onClick={toggleDropdown}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-sm">U</span>
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border">
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={toggleLogin}
                  >
                    Logout
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Profile
                  </button>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Settings
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={toggleLogin}
              className="text-sm px-4 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition-colors"
            >
              Login
            </button>
          )}
        </div>
      </header>

      <nav className="flex border-b bg-white shadow-sm">
        {tabs.map(tab => (
          <Link
            key={tab.path}
            to={tab.path}
            className={`flex-1 py-3 text-center text-sm ${isActive(tab.path)
              ? 'border-b-2 border-indigo-600 font-medium text-indigo-600'
              : 'text-gray-500 hover:text-indigo-500 transition-colors'
              }`}
          >
            {tab.name}
          </Link>
        ))}
      </nav>

      <main className="flex-1 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
