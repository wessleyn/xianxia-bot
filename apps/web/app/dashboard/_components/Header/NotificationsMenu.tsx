'use client'

import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import { IconAlertCircle, IconBell, IconCheckbox, IconMessage } from '@tabler/icons-react';
import { Fragment, useState } from 'react';

type NotificationType = 'message' | 'task' | 'alert';

interface Notification {
    id: number;
    title: string;
    description: string;
    time: string;
    type: NotificationType;
    read: boolean;
}

const initialNotifications: Notification[] = [
    {
        id: 1,
        title: 'New message received',
        description: 'You have a new message from user @JohnDoe',
        time: '5 min ago',
        type: 'message',
        read: false
    },
    {
        id: 2,
        title: 'Task completed',
        description: 'Your scheduled task has been completed',
        time: '1 hour ago',
        type: 'task',
        read: true
    },
    {
        id: 3,
        title: 'System update',
        description: 'System maintenance scheduled for tonight',
        time: '3 hours ago',
        type: 'alert',
        read: false
    }
]

const NotificationsMenu = () => {
    const [notifications, setNotifications] = useState(initialNotifications);
    const unreadCount = notifications.filter(n => !n.read).length;

    const markAsRead = (id: number) => {
        setNotifications(prevNotifications =>
            prevNotifications.map(notif =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    const getNotificationIcon = (type: NotificationType) => {
        switch (type) {
            case 'message':
                return <IconMessage className="h-5 w-5 text-blue-500" />;
            case 'task':
                return <IconCheckbox className="h-5 w-5 text-green-500" />;
            case 'alert':
                return <IconAlertCircle className="h-5 w-5 text-orange-500" />;
            default:
                return <IconBell className="h-5 w-5 text-gray-500" />;
        }
    };

    return (
        <Menu as="div" className="relative inline-block text-left">
            <div>
                <MenuButton className={({ open }) => `
                    p-2 rounded-md 
                    ${open ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'} 
                    focus:outline-none relative
                `}>
                    <IconBell size={20} />
                    {unreadCount > 0 && (
                        <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-800"></span>
                    )}
                </MenuButton>
            </div>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <MenuItems className="absolute right-0 mt-2 w-80 origin-top-right divide-y divide-gray-200 dark:divide-gray-700 rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none max-h-96 overflow-y-auto">
                    <div className="px-4 py-3 flex justify-between items-center">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Notifications</p>
                        {unreadCount > 0 && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                {unreadCount} new
                            </span>
                        )}
                    </div>

                    <div>
                        {notifications.length > 0 ? (
                            notifications.map((notification) => (
                                <MenuItem key={notification.id}>
                                    {({ focus, close }) => (
                                        <button
                                            className={`${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                                                } ${!notification.read ? 'bg-gray-50 dark:bg-gray-750' : ''
                                                } w-full text-left px-4 py-2 flex items-start gap-3`}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (!notification.read) {
                                                    markAsRead(notification.id);
                                                } else {
                                                    close();
                                                }
                                            }}
                                        >
                                            <div className="flex-shrink-0 mt-1">
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {notification.title}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                                    {notification.description}
                                                </p>
                                                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                                                    {notification.time}
                                                </p>
                                            </div>
                                            {!notification.read && (
                                                <div className="ml-2 flex-shrink-0">
                                                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                                </div>
                                            )}
                                        </button>
                                    )}
                                </MenuItem>
                            ))
                        ) : (
                            <div className="px-4 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                                No notifications
                            </div>
                        )}
                    </div>

                    <div className="py-1">
                        <MenuItem>
                            {({ focus }) => (
                                <button
                                    className={`${focus ? 'bg-gray-100 dark:bg-gray-700' : ''
                                        } text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white w-full px-4 py-2 text-sm font-medium flex justify-center items-center`}
                                >
                                    View all notifications
                                </button>
                            )}
                        </MenuItem>
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
    )
}

export default NotificationsMenu