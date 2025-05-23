import React from 'react';
import { useAuthStore } from '../../../../stores/useAuthStore';

interface UserAvatarProps {
    size?: 'sm' | 'md' | 'lg';
}

const UserAvatar: React.FC<UserAvatarProps> = ({ size = 'sm' }) => {
    const { user } = useAuthStore();
    const sizeClasses = {
        sm: 'w-8 h-8',
        md: 'w-10 h-10',
        lg: 'w-12 h-12',
    };

    return (
        <div className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-sm`}>
            <span className="text-sm font-medium">
                {/* TODO change from User's email prefix to profile when solution pops out */}
                {user!.email!.split('@')[0].charAt(0)}
            </span>
        </div>
    );
};

export default UserAvatar;
