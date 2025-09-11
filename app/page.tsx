"use client";

import Image from "next/image";
import Link from "next/link";

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

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      {/* Banner Section */}
      <div className="relative w-full min-h-screen">
        {/* Background Image */}
        <Image
          src="/banners/home.webp"
          alt="Home Banner"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

        {/* Content */}
        <div className="relative z-10">
          <Header />

          <div className="text-white text-center flex flex-col h-screen items-center justify-center px-4 space-y-5 mt-[-3rem]">
            <div className="inline-block text-sm sm:text-sm font-semibold px-4  tracking-widest uppercase">
              Welcome to E COM
            </div>

            <h1 className="text-2xl sm:text-5xl md:text-6xl font-bold  leading-snug tracking-widest text-white text-center">
              Redefining Fashion,<br />
              One Thread at a Time
            </h1>

            <p className=" text-lg tracking-widest">
              Explore timeless designs that speak your style
            </p>

            <Link href="/shop">
              <button className=" bg-[var(--bbs-color)] hover:bg-[#f5ebdd] text-black hover:text-[#7c5c3f] font-semibold py-3 px-8 rounded-full shadow-md hover:shadow-[0_0_20px_#f5ebdd] transition-all duration-300 tracking-wider uppercase cursor-pointer">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Other Sections */}
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
