import Link from 'next/link';
import React from 'react';
import { FaCreditCard, FaTruckMoving, FaBox, FaHeart } from 'react-icons/fa';

const services = [
    {
        icon: <FaCreditCard className="w-8 h-8 text-black" />,
        title: 'Secure Payment',
        desc: 'Elementum feugiat diam',
    },
    {
        icon: <FaTruckMoving className="w-8 h-8 text-black" />,
        title: 'Free Shipping',
        desc: 'For $50 order',
    },
    {
        icon: <FaBox className="w-8 h-8 text-black" />,
        title: 'Delivered with Care',
        desc: 'Lacinia pellentesque leo',
    },
    {
        icon: <FaHeart className="w-8 h-8 text-black" />,
        title: 'Excellent Service',
        desc: 'Blandit gravida viverra',
    },
];

const OurService = () => {
    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-4 py-10 max-w-7xl mx-auto">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-center text-center tracking-widest leading-relaxed"
                    >
                        <div className="bg-[var(--bbs-color)] p-4 mb-4 rounded-full">
                            <Link href="">{service.icon}</Link>
                        </div>
                        <h2 className="font-medium text-xl sm:text-2xl">{service.title}</h2>
                        <p className="text-sm text-gray-600 mt-1">{service.desc}</p>
                    </div>
                ))}
            </div>
            <hr className="my-2 border-gray-300" />
        </>
    );
};

export default OurService;
