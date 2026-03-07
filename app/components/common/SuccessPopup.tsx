import React from "react";

interface SuccessPopupProps {
    isOpen: boolean;
    onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity">
            <div
                className="relative w-full max-w-2xl rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl overflow-hidden"
                style={{
                    background: "linear-gradient(269.9deg, #06A358 24.53%, #001EFE 156.82%)"
                }}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                    aria-label="Close popup"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                    Thank you for<br />getting in touch!
                </h2>

                <p className="text-lg md:text-xl font-medium mt-6 text-white/90">
                    We'll connect with you within the next 24 hours to take this forward.
                </p>
            </div>
        </div>
    );
};

export default SuccessPopup;
