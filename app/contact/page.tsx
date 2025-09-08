import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import BottomBanner from "@/components/layout/BottomBanner";
import ContactSection from "@/components/layout/Contact";
import ScrollToTop from "@/components/layout/ScrollTop";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";



const Contact = () => {
    return (
        <div>
            <Header />

            <div className="relative bg-[url('/banners/contactbanner.webp')] md:py-30 py-20 flex items-center justify-center bg-no-repeat bg-cover">
                <div className="absolute inset-0 bg-black opacity-35 z-0"></div>
                <div className="text-white text-center px-6 z-40">
                    <div className="inline-block text-sm font-semibold px-4 py-1  tracking-[0.4em] uppercase">
                        Contact us
                    </div>

                    <h1 className="text-4xl md:text-6xl font-bold mt-6 leading-tight tracking-widest">
                        Let’s Connect
                    </h1>
                </div>
            </div>
            <ContactSection />

            <div className='bg-[var(--bbs-color)]  flex flex-col items-center space-y-5 py-10 md:py-20 '>
                <h2>Follow us @Ekamya Co.</h2>
                <div className='flex gap-10 '>
                    <FaFacebook size={40} />
                    <FaInstagram size={40} />
                    <FaTwitter size={40} />
                    <FaYoutube size={40} />
                </div>
            </div>
            <BottomBanner />
            <ScrollToTop />
            <Footer />

        </div>
    )
}

export default Contact
