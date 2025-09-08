'use client'

import emailjs from "emailjs-com";
import { useRef } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const ContactSection = () => {
    const form = useRef<HTMLFormElement>(null);

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!form.current) return;

        emailjs
            .sendForm(
                "service_hezi2vh",   // 🔹 Your EmailJS Service ID
                "template_9fe4c1q",  // 🔹 Your EmailJS Template ID
                form.current,        // ✅ Now correctly typed
                "Cx2JRCjCvN-Owy2y6"  // 🔹 Your EmailJS Public Key
            )
            .then(
                (result) => {
                    console.log(result.text);
                    alert("✅ Message sent successfully!");
                    form.current?.reset(); // clear form
                },
                (error) => {
                    console.error(error.text);
                    alert("❌ Failed to send message, please try again.");
                }
            );
    };

    return (
        <section className="grid md:grid-cols-2 gap-10 px-6 md:px-16 py-10 md:py-20 items-start">
            {/* Left: Contact Info */}
            <div className="space-y-10 text-gray-800">
                <h2 className="text-3xl md:text-4xl font-bold">Send us Message</h2>

                <div className="space-y-8 text-[15px]">
                    {/* Phone */}
                    <div className="flex items-center gap-4">
                        <div className="bg-[var(--bbs-color)] p-4 rounded-full text-xl text-black">
                            <FaPhoneAlt />
                        </div>
                        <div>
                            <h4 className="font-bold">Phone</h4>
                            <p>8307256030</p>
                        </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-4">
                        <div className="bg-[var(--bbs-color)] p-4 rounded-full text-xl text-black">
                            <FaEnvelope />
                        </div>
                        <div>
                            <h4 className="font-bold">Email</h4>
                            <p>rajatb9355@gmail.com</p>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-center gap-4">
                        <div className="bg-[var(--bbs-color)] p-4 rounded-full text-xl text-black">
                            <FaMapMarkerAlt />
                        </div>
                        <div>
                            <h4 className="font-bold">Address</h4>
                            <p>H-3, New Model Town Ext.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Contact Form */}
            <form ref={form} onSubmit={sendEmail} className="space-y-6 w-full">
                <div className="grid md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        name="user_name"
                        placeholder="Name *"
                        required
                        className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-black"
                    />

                    <input
                        type="tel"
                        name="user_phone"
                        placeholder="Phone *"
                        required
                        className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-black"
                    />
                </div>


                <input
                    type="email"
                    name="user_email"
                    placeholder="Email *"
                    required
                    className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-black"
                />

                <textarea
                    name="message"
                    placeholder="Message"
                    rows={5}
                    required
                    className="border border-gray-300 px-4 py-3 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-black"
                ></textarea>

                <button
                    type="submit"
                    className="bg-[#94c01f] hover:bg-[var(--btn-color)] text-white font-semibold py-3 px-8 rounded-md transition"
                >
                    Submit
                </button>
            </form>
        </section>
    );
};

export default ContactSection;
