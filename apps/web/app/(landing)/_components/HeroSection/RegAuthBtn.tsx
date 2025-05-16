'use client'

import { useAuthModalStore } from "@store/useAuthModalStore";

const RegAuthBtn = () => {
    const { openModal } = useAuthModalStore();

  return (
        <button
          onClick={() => openModal('register')}
            className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 px-5 py-1 text-base font-medium text-white hover:from-purple-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
        >
            Signup
        </button>)
}

export default RegAuthBtn