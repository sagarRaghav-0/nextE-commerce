import React from 'react';

const SellRecord = () => {
    return (
        <div className="bg-[var(--bbs-color)] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 mb-15 py-10 gap-10">

            <div className="w-full md:w-1/2 h-[400px] md:h-[500px] bg-[url('/banners/bbi.webp')] bg-cover bg-center rounded-lg shadow-md" />

            <div className="w-full md:w-1/2 text-black space-y-6">
                <h4 className="text-3xl md:text-4xl font-bold leading-tight">
                    Your Sacred <br />  Space for Inner Peace
                </h4>

                <p className="text-sm md:text-base  font-extralight tracking-wide leading-relaxed opacity-90">
                    At Divine Essence, we believe in nurturing the soul through sacred
                    rituals and mindful living. Whether you’re on a spiritual journey or
                     seeking everyday calm, our handpicked selection of spiritual tools, 
                     crystals, and incense is designed to bring peace, purpose, and power to your space.
                </p>

                <hr className="my-4 border-white opacity-30" />

                <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                        <h5 className="text-3xl ">98%</h5>
                        <p className="text-sm opacity-90 mt-1">Returning Customer</p>
                    </div>
                    <div className="text-center">
                        <h5 className="text-3xl ">103K</h5>
                        <p className="text-sm opacity-90 mt-1">Spiritual Tools Delivered</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellRecord;
