import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAuthStore } from '../../../../stores/useAuthStore';
import NavigationMenu from './NavigationMenu';

const PopoverMenu = () => {
    const { loginStatus, user } = useAuthStore();

    const isLoggedIn = loginStatus === 'success';
    return (
        <Popover className="relative">
            {({ open }) => (
                <>
                    <PopoverButton
                        className="flex items-center focus:outline-none"
                        title={isLoggedIn ? "User Profile" : "Xianxu"}
                    >
                        {/* TODO: change this for avatar support */}
                        {
                            isLoggedIn ? (
                                <>
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white shadow-sm">
                                        <span className="text-sm font-medium">{user!.email!.split('@')[0].charAt(0)}</span>
                                    </div>
                                    <span className="ml-2 text-lg font-medium">{user!.email!.split('@')[0]}</span>
                                </>
                            ) : (
                                <>
                                    <Logo />
                                    <span className="ml-2 text-2xl font-bold">Xianxu</span>
                                </>
                            )
                        }
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
                            <NavigationMenu />
                        </PopoverPanel>
                    </Transition>
                </>
            )}
        </Popover>
    );
};

export default PopoverMenu;
