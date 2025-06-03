'use client'

import ThemeToggle from "@components/ThemeToggle"
import { useEffect, useState } from "react"
import AuthBtn from "./AuthBtn"
import DynamicAuth from "./DynamicAuth"
import Logo from "./Logo"
import MobileMenu from "./MobileMenu"
import MobileMenuButton from "./MobileMenu/MobileMenuButton"
import NavigationLinks from "./NavigationLinks"

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Close mobile menu when screen size changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [mobileMenuOpen]);

    const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <header className="bg-white dark:bg-gray-800 rounded-lg shadow-md py-4 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 sticky top-0 z-50">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <Logo />
                    </div>

                    <div className="hidden md:block">
                        <NavigationLinks />
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="sm:flex sm:gap-6 items-center">
                            <div className="flex justify-center">
                                <ThemeToggle />
                            </div>

                            <div className="hidden sm:flex">
                                <AuthBtn />
                            </div>
                        </div>

                        <div className="block md:hidden">
                            <MobileMenuButton
                                isOpen={mobileMenuOpen}
                                onClick={toggleMobileMenu}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <MobileMenu
                isOpen={mobileMenuOpen}
                onLinkClick={closeMobileMenu}
            />

            {/* Auth Modal */}
            <DynamicAuth />
        </header>
    )
}

export default Header