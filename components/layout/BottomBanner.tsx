import Link from 'next/link'

const BottomBanner = () => {
    return (
        <div className="relative w-full overflow-hidden mb-15">
            <div className="relative bg-[url('/banners/bottombanner.webp')] bg-no-repeat bg-cover bg-center w-full text-center flex flex-col items-center justify-center text-[#f1f1f1] md:py-24 py-10">

                <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

                <div className="relative z-10 px-4">
                    <h3 className="text-2xl md:text-5xl font-bold tracking-wider">
                        Ready to Find your Perfect Match?
                    </h3>
                    <p className="mt-4 md:text-lg ">
                        Browse our online store or visit us in person to experience the beauty of nature.
                    </p>

                    <Link href='/shop' >

                        <button className="cursor-pointer mt-6 bg-transparent hover:bg-[#f1f1f1] text-white hover:text-[#030303] border border-white py-3 px-8 rounded-full transition-all duration-300 tracking-wider capitalize">
                            Shop Now

                        </button>
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default BottomBanner
