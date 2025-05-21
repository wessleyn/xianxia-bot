import Logo from '@assets/monk-man.svg'
// import ThemeToggle from "@repo/ui/components/ThemeToggle"
import Image from "next/image"
import Link from "next/link"
import AuthBtn from './AuthBtn'
import DynamicAuth from "./DynamicAuth"

const links = [
    { original: 'platforms', xianxia: 'REALMS' },
    { original: 'trending', xianxia: 'TRENDING' },
    { original: 'demo', xianxia: 'DEMO' }
]

const Header = () => {

    return (
        <header className="bg-white dark:bg-gray-800 rounded-lg shadow-md py-4 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 sticky top-0 z-50">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <Link className="clip bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-4 flex items-center" href="#">
                            <span className="sr-only">Sanctuary</span>
                            <Image src={Logo} alt="logo" className="w-12 h-12" />
                            <div className="flex items-center ml-2">
                                <span className="text-[4rem]">X</span>
                                <span className="ml-2 text-3xl font-bold tracking-wide" style={{ lineHeight: '3rem' }}>ianxu</span>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden md:block">
                        <nav aria-label="Global">
                            <ul className="flex items-center gap-8 text-base">
                                {
                                    links.map((link) => (
                                        <li key={link.original}>
                                            <Link
                                                className="text-gray-700 dark:text-gray-300 transition hover:text-purple-600 dark:hover:text-purple-400 font-medium tracking-wide"
                                                href="#"
                                            >
                                                {link.xianxia}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="sm:flex sm:gap-6 items-center">
                            <div className="flex justify-center">
                                {/* <ThemeToggle /> */}
                            </div>

                            <div className="hidden sm:flex">
                               <AuthBtn/>
                            </div>
                        </div>

                        <div className="block md:hidden">
                            <button
                                className="rounded-full bg-gray-100 dark:bg-gray-700 p-3 text-gray-600 dark:text-gray-300 transition hover:text-purple-600 dark:hover:text-purple-400"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="size-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Auth Modal */}
            <DynamicAuth />
        </header>
    )
}

export default Header