'use client';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';
import BottomBanner from '@/components/layout/BottomBanner';
import ScrollToTop from '@/components/layout/ScrollTop';
import Image from 'next/image';
import { FaCheckCircle, FaOm } from 'react-icons/fa';

const About = () => {
    return (
        <div className="w-screen overflow-x-hidden">
            {/* Hero Banner */}
            <div className="relative bg-[url('/banners/aboutbanner.webp')] bg-no-repeat bg-cover md:min-h-screen min-h-fit w-full">
                <div className="absolute inset-0 bg-black opacity-30 z-0"></div>

                <div className="relative z-10 sm:px-5">
                    <Header />
                    <div className="text-white text-center md:py-26  py-20  px-6">
                        <div className="inline-block text-sm font-semibold px-4 py-1  tracking-[0.4em] uppercase">
                            About Us
                        </div>

                        <h1 className="text-3xl md:text-6xl font-bold mt-6 leading-tight tracking-widest">
                            We are Passionate <br />
                            About Our Work
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="grid md:grid-cols-2 grid-cols-1 gap-10 px-6 md:px-16 py-15  md:py-20 items-center">
                {/* Left Image */}
                <div className="relative w-full h-[500px] rounded-xl overflow-hidden shadow-md">
                    <Image
                        src="/banners/about1.jpg"
                        alt="About Plants"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>


                {/* Right Text */}
                <div className="flex flex-col space-y-8">
                    <div>
                        <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight tracking-wider">
                            We strive to provide our <br />
                            customers with the highest quality
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            E Com Co. was founded in 1960 by a group of plant enthusiasts who
                            recognized the positive impact that plants can have on our lives. Whether
                            it’s purifying the air, reducing stress, or simply adding a touch of beauty to
                            your environment, plants are more than just decoration—they’re a lifestyle.
                        </p>
                    </div>

                    <hr className="border-gray-300" />

                    {/* Testimonial */}
                    <div className="leading-relaxed">
                        <p className="text-lg italic text-gray-500 mb-4">
                            “We love what we do & create partnerships with our clients to ensure their
                            digital transformation is positioned for long-term success.”
                        </p>
                        <div className="flex items-center gap-3">
                            <Image
                                src="/ceo/1.webp"
                                alt="Karen Lynn"
                                width={50}
                                height={50}
                                className="rounded-full"
                            />
                            <div>
                                <p className="font-semibold text-gray-800">Rajat</p>
                                <p className="text-sm text-gray-500">CEO & Co-founder @ Company</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#f0f7d7] md:py-20 py-10 px-7 md:px-16">
                <h2 className="text-2xl md:text-4xl font-bold text-center md:mb-14 mb-10 leading-snug">
                    Our Core Values that Drive <br />
                    Everything We Do
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {[
                        {
                            title: 'Mindful Craftsmanship',
                            text: 'Each item is created or selected with intention, care, and spiritual significance to enhance your sacred space.',
                        },
                        {
                            title: 'Sacred Team Energy',
                            text: 'Our team works in harmony, bringing positive energy into everything we create, pack, and deliver.',
                        },
                        {
                            title: 'Divine Innovation',
                            text: 'We merge ancient wisdom with modern simplicity to bring you soulful tools for your spiritual journey.',
                        },
                        {
                            title: 'Purity & Authenticity',
                            text: 'We ensure every product is pure, ethically sourced, and aligned with ancient spiritual traditions.',
                        },
                        {
                            title: 'Soulful Satisfaction',
                            text: 'We go beyond customer satisfaction—we aim to uplift, heal, and inspire every soul we serve.',
                        },
                        {
                            title: 'Simplicity in Rituals',
                            text: 'We design our experience and tools to support simple, peaceful, and effective daily spiritual practice.',
                        },
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col md:flex-row justify-center text-center md:text-left items-center gap-4">
                            <div className="bg-black text-white rounded-full w-19 h-10  flex items-center justify-center">
                                <FaOm size={18} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-lg text-gray-900">{item.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{item.text}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>



            <div className="grid md:grid-cols-2 grid-cols-1 gap-10 px-6 md:px-16 md:py-20 py-10 items-center">
                {/* Left Image */}

                <div className="flex flex-col space-y-8">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight tracking-wider">
                            Our Mission
                        </h2>
                        <p className="text-gray-600 leading-relaxed">
                            Our mission is to help individuals reconnect with their inner peace by offering
                            spiritually empowering products. From sacred incense to healing crystals,
                            we guide every soul toward mindfulness, balance, and a higher vibration.
                        </p>
                    </div>

                    <hr className="border-gray-300" />

                    {/* Values */}


                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700 font-medium">
                        <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-600" size={24} />
                            <span>Authentic & Blessed Products</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-600" size={24} />
                            <span>Eco-Conscious Packaging</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-600" size={24} />
                            <span>Guided by Spiritual Values</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCheckCircle className="text-green-600" size={24} />
                            <span>Trusted by Devotees</span>
                        </div>
                    </div>
                </div>


                {/* Right Text */}
                <div className="relative w-full h-[400px]  md:h-[500px] rounded-lg overflow-hidden shadow-md">
                    <Image
                        src="/banners/about2.jpg"
                        alt="Spiritual Decor"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                    />
                </div>
            </div>



            <BottomBanner />
            <ScrollToTop />
            <Footer />

        </div>
    );
};

export default About;
