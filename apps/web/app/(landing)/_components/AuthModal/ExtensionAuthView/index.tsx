'use client';

import { DialogPanel } from '@headlessui/react';
import { useAuthModalStore } from '../../../../_store/useAuthModalStore';
import Closing from './Closing';
import Redirect from './Redirect';

const ExtensionAuthView = () => {
  const { isAuthenticated } = useAuthModalStore()

  return (
    <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-6 text-left align-middle shadow-xl transition-all">
      {isAuthenticated ? <Closing /> : <Redirect />}
    </DialogPanel>
  );
};

export default ExtensionAuthView;
