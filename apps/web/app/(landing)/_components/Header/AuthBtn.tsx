'use client'

import { useAuthModalStore } from "@store/useAuthModalStore";

const AuthBtn = () => {
    const { openModal } = useAuthModalStore();

  return (
        <button
            onClick={() => openModal('login')}
            className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 px-7 py-3 text-base font-medium text-white hover:from-purple-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
        >
            CULTIVATE
        </button>)
}

export default AuthBtn