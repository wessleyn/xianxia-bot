import { useAuthStore } from '@stores/useAuthStore';
import { IconRefresh, IconUserCircle } from '@tabler/icons-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useDashStore from '../../stores/useDashStore';
import ThemeSelector from '../ThemeSelector';
import PopoverMenu from './PopoverMenu';

interface HeaderProps {
  isLoginPage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isLoginPage = false }) => {
  const { loginStatus } = useAuthStore();
  const { handleSync, isSyncing } = useDashStore()
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-indigo-800 to-purple-700 dark:from-indigo-900 dark:to-purple-900 text-white shadow-md">
      {/* Brand/Logo Section */}
      <PopoverMenu />

      {/* Theme Toggle Button */}
      <ThemeSelector />
      {
        // IF LOGGED IN, SHOW SYNC BUTTON
        loginStatus === 'success' ? (
          <button
            onClick={handleSync}
            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-500/80 hover:bg-indigo-600/80 rounded-md transition-colors focus:outline-none shadow-sm"
            title="Sync data and logout"
          >
            <IconRefresh size={16} stroke={2} className={`${isSyncing ? 'animate-spin' : ''}`} />
            <span className="text-xs font-medium">{
              isSyncing ? 'Syncing...' : 'Sync'
            }</span>
          </button>
        )
          : // IF NOT LOGGED IN AND  YOU'RE TO ON THE LOGIN PAGE, SHOW BACK BUTTON (back to dash)
          isLoginPage ?
          (
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500/30 hover:bg-indigo-500/50 text-white rounded-md transition-colors shadow-sm"
              title="Back to Home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M5 12l6-6m-6 6l6 6" />
              </svg>
              <span className="font-medium text-sm">Back</span>
            </button>
          ) : ( // ELSE IF NOT LOGGED IN, JUST SHOW LOGIN BUTTON
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-md transition-colors shadow-sm"
              title="Login to your account"
            >
              <IconUserCircle size={16} stroke={2} />
              <span className="font-medium text-sm">Login</span>
            </Link>
          )
      }

    </header>
  );
};

export default Header;
