import { Logo } from '@components/Logo';
import React from 'react';
import { useAuthStore } from '../../../../../../stores/useAuthStore';

const BrandLogo: React.FC = () => {
    const { isLoggedIn, user } = useAuthStore();
    return isLoggedIn ? (
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
    );
};

export default BrandLogo;
