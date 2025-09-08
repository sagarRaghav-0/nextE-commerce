"use client";
import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import SaleBanner from "@/components/common/SaleBanner";
import BottomBanner from "@/components/layout/BottomBanner";
import OurCategories from "@/components/layout/OurCategories";
import OurService from "@/components/layout/OurService";
import ScrollTop from "@/components/layout/ScrollTop";
import SellRecord from "@/components/layout/SellRecord";
import Testimonials from "@/components/layout/Testimonials";
import TrendingProducts from "@/components/layout/TrendingProducts";
import Link from "next/link";



export default function Home() {




  return (

    <div className="w-full overflow-x-hidden">
      <div className="relative bg-[url('/banners/home.webp')] bg-no-repeat bg-cover min-h-screen w-full">
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

        <div className="relative z-10">
          <Header />

          <div className="text-white text-center py-26 px-6">
            <div className="inline-block text-md sm:text-sm font-semibold px-4 py-1 tracking-widest uppercase">
              Welcome to E COM
            </div>



            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mt-6 leading-snug tracking-widest text-white text-center">
              Redefining Fashion,<br />
              One Thread at a Time
            </h1>


            <p className="mt-4 text-lg tracking-widest">
              Explore timeless designs that speak your style
            </p>

            <button className="mt-6 bg-[var(--bbs-color)] hover:bg-[#f5ebdd] text-black hover:text-[#7c5c3f] font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-[0_0_20px_#f5ebdd] transition-all duration-300 tracking-wider uppercase">
              <Link href='/shop'>Shop Now</Link>
            </button>
          </div>
        </div>
      </div>

      <OurService />
      <TrendingProducts />
      <SaleBanner />
      <OurCategories />
      <SellRecord />
      <Testimonials />
      <BottomBanner />
      <ScrollTop />
      <Footer />
    </div>
  );
}
