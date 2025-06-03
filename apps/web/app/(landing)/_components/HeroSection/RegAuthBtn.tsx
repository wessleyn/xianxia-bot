"use client";

import { useAuthModalStore } from "@store/useAuthModalStore";

const RegAuthBtn = () => {
  const { openModal, setCanClose } = useAuthModalStore();

  const handleSignup = () => {
    setCanClose(true); // Allow closing by clicking outside
    openModal("register");
  };

  return (
    <button
      onClick={handleSignup}
      className="rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-2 text-base font-medium text-white hover:from-purple-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
    >
      Signup
    </button>
  );
};

export default RegAuthBtn;