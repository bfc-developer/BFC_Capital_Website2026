import React, { useEffect, useRef } from "react";

interface SuccessPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ isOpen, onClose }) => {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const previousFocusRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (isOpen) {
            // Save the currently focused element
            previousFocusRef.current = document.activeElement as HTMLElement;
            // Delay slightly to ensure browser has updated layout
            const timer = setTimeout(() => {
                if (headingRef.current) {
                    headingRef.current.focus();
                }
            }, 100);
            return () => clearTimeout(timer);
        } else {
            // Return focus when closing
            if (previousFocusRef.current) {
                previousFocusRef.current.focus();
            }
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
            <div
                className="relative w-full max-w-2xl rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden"
                style={{
                    background: "linear-gradient(269.9deg, #06A358 24.53%, #001EFE 156.82%)"
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="success-popup-title"
                aria-describedby="success-popup-desc"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors cursor-pointer"
                    aria-label="Close popup"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <h2 
                    id="success-popup-title" 
                    ref={headingRef}
                    tabIndex={-1}
                    className="text-4xl md:text-5xl font-bold mb-4 leading-tight focus:outline-none"
                >
                    Thank you for<br />getting in touch!
                </h2>

                <p id="success-popup-desc" className="text-lg md:text-xl font-medium mt-6 text-white/90">
                    We'll connect with you within the next 24 hours to take this forward.
                </p>
            </div>
        </div>
    );
};

export default SuccessPopup;
