"use client";
import React, { useState, useEffect } from 'react';
import SuccessPopup from '../common/SuccessPopup';

interface BookSessionButtonProps {
    buttonText: string;
    className?: string;
}

export default function BookSessionButton({ buttonText, className }: BookSessionButtonProps) {
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [consent, setConsent] = useState(false);
    const [errors, setErrors] = useState<{ name?: string, email?: string, mobile?: string, consent?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isBookingModalOpen) {
            document.body.style.overflow = 'hidden';
            setName(''); setEmail(''); setMobile(''); setConsent(false); setErrors({});
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; }
    }, [isBookingModalOpen]);

    const validate = () => {
        let newErrors: any = {};
        if (!name.trim()) newErrors.name = 'Required';
        if (!email.trim() || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) newErrors.email = 'Valid email required';
        if (!mobile.trim() || !/^\d{10}$/.test(mobile)) newErrors.mobile = 'Valid 10-digit mobile required';
        if (!consent) newErrors.consent = 'Required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxf8XuWvVM-Q51zbNWsVvTSyFKs7KvY6WtKXobCNVosjZlq_iZoKSkzwFFSua9vvplehw/exec"; // 👈 paste your URL

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);

        try {
            await fetch(APPS_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors", // required for Apps Script
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, mobile, email, consent }),
            });

            // no-cors means we can't read the response, but if no error is thrown, it worked
            setIsBookingModalOpen(false);
            setIsSuccessPopupOpen(true);

        } catch (err) {
            console.error("Submission failed:", err);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsBookingModalOpen(true)}
                className={className}
            >
                {buttonText}
            </button>

            {isBookingModalOpen && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm transition-opacity">
                    <div className="relative w-full max-w-3xl bg-white rounded-3xl p-8 md:p-14 shadow-2xl overflow-hidden max-h-[95vh]">
                        <button
                            onClick={() => setIsBookingModalOpen(false)}
                            className="absolute top-6 right-6 text-gray-400 hover:text-gray-800 transition-colors"
                            aria-label="Close popup"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>

                        <div className="text-center mb-12">
                            <h2
                                className="text-[28px] md:text-[40px] font-bold mb-3 leading-tight inline-block"
                                style={{
                                    background: "linear-gradient(90deg, #024B39 39.5%, #011EFE 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                    color: "transparent"
                                }}
                            >
                                A Thoughtful Start to<br className="hidden md:block" /> Your Financial Journey!
                            </h2>
                            <p className="text-[#44475B] text-[16px] md:text-[18px] font-medium mt-1">
                                Good financial decisions don’t begin with products; they begin with conversations.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="max-w-[100%] mx-auto text-left flex flex-col items-center">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 mb-12 w-full">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className={`w-full border-b py-2 text-[#44475B] outline-none transition-colors ${errors.name ? 'border-red-500' : 'border-gray-300 focus:border-[#024B39]'}`}
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.name}</p>}
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Mobile Number"
                                        value={mobile}
                                        onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                        className={`w-full border-b py-2 text-[#44475B] outline-none transition-colors ${errors.mobile ? 'border-red-500' : 'border-gray-300 focus:border-[#024B39]'}`}
                                    />
                                    {errors.mobile && <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.mobile}</p>}
                                </div>
                                <div className="relative md:col-span-1">
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`w-full border-b py-2 text-[#44475B] outline-none transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300 focus:border-[#024B39]'}`}
                                    />
                                    {errors.email && <p className="text-red-500 text-xs mt-1 absolute -bottom-5">{errors.email}</p>}
                                </div>
                            </div>

                            <div className="mb-12 text-left w-full">
                                <label className="flex items-start gap-4 cursor-pointer relative group">
                                    <div className="relative flex items-center justify-center mt-1 w-[22px] h-[22px] shrink-0">
                                        <input
                                            type="checkbox"
                                            className="peer appearance-none w-[22px] h-[22px] rounded-[4px] shrink-0 border-[2px] border-[#024B39] checked:border-transparent transition-all outline-none"
                                            checked={consent}
                                            onChange={(e) => setConsent(e.target.checked)}
                                        />
                                        <div
                                            className={`absolute inset-0 rounded-[4px] pointer-events-none transition-opacity flex items-center justify-center ${consent ? "opacity-100" : "opacity-0"}`}
                                            style={{ background: "linear-gradient(269.9deg, #06A358 24.53%, #001EFE 156.82%)" }}
                                        >
                                            <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-[15px] text-[#44475B] leading-[1.6]">
                                            I hereby consent to the processing of my personal information by BFC Capital Pvt. Ltd. for financial planning communication, consultation, and related follow-ups, in accordance with the provisions of DPDP Act, 2023.
                                        </span>
                                        {errors.consent && <p className="text-red-500 text-xs mt-1 block">{errors.consent}</p>}
                                    </div>
                                </label>
                            </div>

                            <div className="text-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`bg-[#024B39] text-white px-10 py-3 rounded-md hover:bg-[#024B39] transition duration-300 font-medium text-[16px] flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting && (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    )}
                                    {isSubmitting ? 'Submitting...' : 'Request a Call Back'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <SuccessPopup
                isOpen={isSuccessPopupOpen}
                onClose={() => setIsSuccessPopupOpen(false)}
            />
        </>
    );
}
