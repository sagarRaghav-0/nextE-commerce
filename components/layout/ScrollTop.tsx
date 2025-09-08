'use client';
import { useEffect, useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="fixed bottom-5 right-5 z-[9999] bg-[var(--btn-color)] cursor-pointer text-white p-3 rounded-md shadow-md hover:bg-lime-700 transition"
                    aria-label="Scroll to top"
                >
                    <FaChevronUp />
                </button>
            )}
        </>
    );
};

export default ScrollToTop;
