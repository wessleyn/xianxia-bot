'use client';

import {
    IconAlertCircle,
    IconAlertTriangle,
    IconBell,
    IconCheck,
    IconInfoCircle,
    IconSend,
    IconX
} from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { useToastStore } from '../../hooks/useToastStore';

export type ToastStatus = 'success' | 'error' | 'info' | 'warning' | 'sent' | 'notification';

export interface ToastProps {
    /**
     * Custom styles for the toast container
     */
    className?: string;
}

export const Toast: React.FC<ToastProps> = ({
    className = '',
}) => {
    const { isVisible, status, title, description, duration, hideToast } = useToastStore();

    useEffect(() => {
        if (isVisible && duration) {
            const timer = setTimeout(() => {
                hideToast();
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [isVisible, duration, hideToast]);

    if (!isVisible) return null;

    const statusConfig = {
        success: {
            icon: <IconCheck className="h-5 w-5 text-green-500" />,
            bgColor: 'bg-green-50 dark:bg-green-950/30',
            borderColor: 'border-green-200 dark:border-green-800',
            textColor: 'text-green-800 dark:text-green-300'
        },
        error: {
            icon: <IconAlertCircle className="h-5 w-5 text-red-500" />,
            bgColor: 'bg-red-50 dark:bg-red-950/30',
            borderColor: 'border-red-200 dark:border-red-800',
            textColor: 'text-red-800 dark:text-red-300'
        },
        info: {
            icon: <IconInfoCircle className="h-5 w-5 text-blue-500" />,
            bgColor: 'bg-blue-50 dark:bg-blue-950/30',
            borderColor: 'border-blue-200 dark:border-blue-800',
            textColor: 'text-blue-800 dark:text-blue-300'
        },
        warning: {
            icon: <IconAlertTriangle className="h-5 w-5 text-amber-500" />,
            bgColor: 'bg-amber-50 dark:bg-amber-950/30',
            borderColor: 'border-amber-200 dark:border-amber-800',
            textColor: 'text-amber-800 dark:text-amber-300'
        },
        sent: {
            icon: <IconSend className="h-5 w-5 text-indigo-500" />,
            bgColor: 'bg-indigo-50 dark:bg-indigo-950/30',
            borderColor: 'border-indigo-200 dark:border-indigo-800',
            textColor: 'text-indigo-800 dark:text-indigo-300'
        },
        notification: {
            icon: <IconBell className="h-5 w-5 text-purple-500" />,
            bgColor: 'bg-purple-50 dark:bg-purple-950/30',
            borderColor: 'border-purple-200 dark:border-purple-800',
            textColor: 'text-purple-800 dark:text-purple-300'
        }
    };

    const config = statusConfig[status];

    return (
        <div className="fixed top-4 right-4 z-[9999] animate-slideIn">
            <div
                className={`flex items-start gap-3 rounded-lg border p-4 shadow-lg
          ${config.bgColor} ${config.borderColor} ${className}`}
            >
                <div className="flex-shrink-0">
                    {config.icon}
                </div>
                <div className="flex-1 min-w-0">
                    {title && (
                        <h3 className={`font-medium ${config.textColor}`}>
                            {title}
                        </h3>
                    )}
                    {description && (
                        <div className={`text-sm mt-1 ${config.textColor} opacity-90`}>
                            {description}
                        </div>
                    )}
                </div>
                <button
                    onClick={hideToast}
                    className="flex-shrink-0 rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    <IconX className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                </button>
            </div>
        </div>
    );
};

export default Toast;
