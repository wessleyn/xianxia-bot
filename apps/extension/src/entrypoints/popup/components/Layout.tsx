import React, { ReactNode } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import useViewStore from '../stores/useViewStore';
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
  const { currentView } = useViewStore()
  const navigate = useNavigate();

  useEffect(() => {
    switch (currentView) {
      case 'novelSite':
        navigate('novel')
        break;
      case 'novelToc':
        navigate('toc')
        break;
      case 'novelCh':
        navigate('chapter')
        break;
      default:
        loginStatus === 'pending' && navigate('/login');

    }
  }, [currentView]);

  const isDashTab = tabs.find((tab) => {
    if (location.pathname === '/') {
      return true
    } else {
      return tab.path.includes(location.pathname)
    }
  }) !== undefined
  
  return (
    <div className="h-[450px] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
      <Header isLoginPage={location.pathname.includes('/login')} />

      {isDashTab && <NavigationTabs tabs={tabs} />}
      <main className={`flex-1 ${isDashTab ? 'p-4' : 'p-0'} overflow-auto custom-scrollbar`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
