'use client'

import { useAuthModalStore } from "@store/useAuthModalStore";
import { useEffect } from "react";

interface AutoAuthProps {
  mode?: 'login' | 'register';
  callback?: string;
}

const AutoAuth = ({ mode = 'login', callback }: AutoAuthProps) => {
  const { openModal, closeModal, setRedirectUrl, setCanClose, isFromExtension } = useAuthModalStore()
 console.log('In auth, isFromExtension:', isFromExtension)
  useEffect(() => {

    if (!isFromExtension && callback) {
      setRedirectUrl(callback);
    }

    // Prevent closing the modal
    setCanClose(false);

    // Open modal with the specified mode
    openModal(isFromExtension ? 'extension' : mode);

    // When component unmounts, allow modal closing again
    return () => {
      setCanClose(true);
      closeModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, callback, isFromExtension])

  return null;
}

export default AutoAuth