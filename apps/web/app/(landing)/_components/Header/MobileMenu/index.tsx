'use client'

import AuthBtn from '../AuthBtn';
import NavigationLinks from '../NavigationLinks';

interface MobileMenuProps {
  isOpen: boolean;
  onLinkClick: () => void;
}

const MobileMenu = ({ 
  isOpen, 
  onLinkClick 
}: MobileMenuProps) => {
  return (
    <div
      id="mobile-menu"
      className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96 opacity-100 border-t border-gray-200 dark:border-gray-700' : 'max-h-0 opacity-0 pointer-events-none'
      } overflow-hidden`}
      aria-hidden={!isOpen}
    >
      <div className="px-4 py-4">
        <NavigationLinks mobile onMobileItemClick={onLinkClick} />
        <div className="flex justify-center pt-4 mt-2 border-t border-gray-200 dark:border-gray-700">
          <AuthBtn />
        </div>
      </div>
    </div>
  )
}

export default MobileMenu