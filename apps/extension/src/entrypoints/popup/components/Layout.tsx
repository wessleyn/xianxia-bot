import React, { ReactNode } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../stores/useAuthStore';
import Header from './Header';
import NavigationTabs from './NavigationTabs';

interface LayoutProps {
  children?: ReactNode;
  isNovelSite?: boolean;
  novelTitle?: string;
}

const tabs = [
  { name: 'Stats', path: '/' },
  { name: 'Current', path: '/current' },
  { name: 'Bookmarks', path: '/bookmarks' },
  { name: 'Downloads', path: '/downloads' },
];

const Layout: React.FC<LayoutProps> = () => {
  const location = useLocation();
  const { loginStatus } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (loginStatus === 'pending') {
      navigate('/login');
    }
  }, []);

  const isLoginPage = location.pathname.includes('/login');
  return (
    <div className="h-[450px] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <Header isLoginPage={isLoginPage} />

      {/* Only show navigation tabs if not on login page */}
      {!isLoginPage && <NavigationTabs tabs={tabs} />}

      <main className="flex-1 p-4 overflow-auto custom-scrollbar">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
