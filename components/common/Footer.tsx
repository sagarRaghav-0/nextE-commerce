import Link from "next/link";

import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (

        <footer className="bg-transparent sticky top-0 z-50 tracking-widest">
            <div className="flex flex-col md:flex-row items-center justify-between  px-6 py-6 md:py-10 mx-auto max-w-7xl ">

                {/* Logo */}
                <Link href="/" className="text-xl font-bold mb-5 mb:mb-0 tracking-wide ">
                    E COM
                </Link>

                {/* Navigation */}
                <div className="flex flex-col   md:flex-row items-center justify-between  gap-x-10">
                    <nav className="flex mb-5 md:mb-0  gap-8 text-md font-medium ">
                        <Link href="/">Home</Link>
                        <Link href="/shop">Shop</Link>
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>
                    </nav>

                    <div className="flex gap-10">
                        <div className="flex gap-6 items-center justify-center">
                            <Link href='/'><FaFacebook className="w-5 h-5 " /></Link>
                            <Link href='/'><FaInstagram className="w-5 h-5 " /></Link>
                            <Link href='/'><FaYoutube className="w-6 h-6" /></Link>
                            <Link href='/'><FaTwitter className="w-5 h-5 " /></Link>

                        </div>
                    </div>
                </div>
            </div>
            <hr className="my-2 border-gray-300" />

            <div className="text-center text-sm text-gray-500 py-5">
                <p>Copyright © 2025 <strong>E COM</strong> | All rights reserved</p>
            </div>
        </footer>


    )
}

export default Footer
