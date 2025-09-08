import Image from 'next/image';

const Testimonials = () => {
    return (
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 px-5 mb-16 tracking-wider">
            {/* Left Side */}
            <div className="flex flex-col gap-10">
                <div className="border-2 border-gray-300 p-5 md:p-7 rounded-4xl">
                    <h3 className="text-2xl md:text-4xl mb-4">What Our Customers Say</h3>
                    <p className="text-sm">
                        Discover the reasons why people love us and become your go-to partner.
                    </p>
                </div>

                <div className="border-2 border-gray-300 p-7 rounded-4xl flex flex-col gap-3">
                    <Image src="/tshirt/1.webp" alt="Client" width={40} height={40} />
                    <p className="text-sm">Your Client</p>
                    <p className="md:text-xl">
                        I am absolutely thrilled with the service I received from their company! They were attentive,
                        responsive, and genuinely cared about meeting my needs. I highly recommend them.
                    </p>
                </div>
            </div>

            {/* Right Side */}
            <div className="flex flex-col gap-10 border-2 border-gray-300 p-7 rounded-4xl">
                {[1, 2].map((_, index) => (
                    <div key={index} className="flex flex-col gap-3">
                        <Image src="/tshirt/1.webp" alt="Client" width={40} height={40} />
                        <p className="text-sm">Your Client</p>
                        <p className="md:text-xl">
                            I am absolutely thrilled with the service I received from their company! They were attentive,
                            responsive, and genuinely cared about meeting my needs. I highly recommend them.
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
