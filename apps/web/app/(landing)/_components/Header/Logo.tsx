import LogoSvg from "@assets/svg/monk-man.svg"
import Image from "next/image"
import Link from "next/link"

const Logo = () => {
    return (
        <Link className="clip bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-4 flex items-center" href="/">
            <span className="sr-only">Sanctuary</span>
            <Image src={LogoSvg} alt="logo" className="w-12 h-12" />
            <div className="flex items-center ml-2">
                <span className="text-[4rem]">X</span>
                <span className="ml-2 text-3xl font-bold tracking-wide" style={{ lineHeight: '3rem' }}>ianxu</span>
            </div>
        </Link>
    )
}

export default Logo