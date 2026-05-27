"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import SuccessPopup from "../common/SuccessPopup";

export default function ContactUsPage() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        mobileNumber: "",
        email: "",
        subject: "",
        message: "",
        consent: false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;

        let processedValue = value;
        if (name === "fullName") {
            // Allows only alphabets and spaces
            processedValue = value.replace(/[^a-zA-Z\s]/g, "");
        } else if (name === "mobileNumber") {
            // Allows only digits
            processedValue = value.replace(/\D/g, "");
        } else if (name === "email") {
            // Basic formatting for email: no spaces, only allowed characters
            processedValue = value.replace(/\s/g, "").replace(/[^a-zA-Z0-9.@_-]/g, "");
        }

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : processedValue,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        let newErrors: Record<string, string> = {};
        let isValid = true;

        if (!formData.fullName.trim()) {
            newErrors.fullName = "Full Name is required.";
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
            newErrors.fullName = "Full Name can only contain letters and spaces.";
            isValid = false;
        }

        if (!formData.mobileNumber.trim()) {
            newErrors.mobileNumber = "Mobile Number is required.";
            isValid = false;
        } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
            newErrors.mobileNumber = "Please enter a valid 10-digit mobile number.";
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email ID is required.";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
            isValid = false;
        }

        if (!formData.message.trim()) {
            newErrors.message = "Message is required.";
            isValid = false;
        } else if (formData.message.trim().length < 10) {
            newErrors.message = "Message must be at least 10 characters long.";
            isValid = false;
        }

        if (!formData.consent) {
            newErrors.consent = "You must accept the terms to proceed.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxBkYx_6j_ONc8G8tGkaC4bYfQkPAAwd0xJBIFDwb_nqm3ASp4Iak5AfuS6uEftoD_y/exec"; // 🔁 Paste your deployed URL

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(APPS_SCRIPT_URL, {
                method: "POST",
                headers: { "Content-Type": "text/plain" }, // Apps Script requires text/plain for CORS
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (result.success) {
                setIsPopupOpen(true);
                setFormData({
                    fullName: "",
                    mobileNumber: "",
                    email: "",
                    subject: "",
                    message: "",
                    consent: false,
                });
                setErrors({});
            } else {
                console.error("Submission failed:", result.message);
                alert("Something went wrong. Please try again.");
            }
        } catch (err) {
            console.error("Network error:", err);
            alert("Unable to submit. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="w-full bg-[#f8f9fa] min-h-screen font-sans pb-10">
            {/* Success Popup */}
            <SuccessPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />

            {/* Breadcrumb & Title Section */}
            <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">

                {/* Breadcrumb */}
                <nav className="flex items-center text-sm mb-8">
                    <Link
                        href="/"
                        className="font-semibold"
                        style={{
                            background: "linear-gradient(90deg, #024B39 39.5%, #011EFE 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            color: "transparent"
                        }}
                    >
                        Home
                    </Link>
                    <svg width="0" height="0">
                        <linearGradient id="chevron-gradient" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="39.5%" stopColor="#024B39" />
                            <stop offset="100%" stopColor="#011EFE" />
                        </linearGradient>
                    </svg>

                    <ChevronRight
                        className="h-4 w-4 mx-2"
                        style={{ stroke: "url(#chevron-gradient)" }}
                    />
                    <span className="text-[#7A7A7A] font-semibold" style={{
                        // background: "linear-gradient(90deg, #024B39 39.5%, #011EFE 100%)",
                        // WebkitBackgroundClip: "text",
                        // WebkitTextFillColor: "transparent",
                        // backgroundClip: "text",
                        // color: "transparent"
                    }}>Contact Us</span>
                </nav>
                {/* Title */}
                <h2 className="text-[20px] py-[20px] mb-8 md:text-3xl lg:text-5xl font-bold text-[#44475B]">
                    Contact Us
                </h2>

                {/* Form and Map Card */}
                <div className="bg-white rounded-[2rem] shadow-[0_4px_24px_rgba(0,0,0,0.06)] flex flex-col lg:flex-row overflow-hidden max-w-[1200px]">

                    {/* Left Side - Form */}
                    <div className="w-full lg:w-[55%] p-8 lg:py-12 lg:pl-12 lg:pr-24 xl:py-16 xl:pl-16 xl:pr-28">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                            <div className="flex flex-col">
                                <label htmlFor="fullName" className="text-sm text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    className={`w-full border-b py-1.5 focus:outline-none transition-colors bg-transparent text-gray-800 ${errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#00a651]'}`}
                                />
                                {errors.fullName && <span className="text-red-500 text-xs mt-1">{errors.fullName}</span>}
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="mobileNumber" className="text-sm text-gray-700 mb-1">Mobile Number</label>
                                <input
                                    type="tel"
                                    id="mobileNumber"
                                    name="mobileNumber"
                                    value={formData.mobileNumber}
                                    onChange={handleChange}
                                    maxLength={10}
                                    className={`w-full border-b py-1.5 focus:outline-none transition-colors bg-transparent text-gray-800 ${errors.mobileNumber ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#00a651]'}`}
                                />
                                {errors.mobileNumber && <span className="text-red-500 text-xs mt-1">{errors.mobileNumber}</span>}
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-sm text-gray-700 mb-1">Email ID</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full border-b py-1.5 focus:outline-none transition-colors bg-transparent text-gray-800 ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#00a651]'}`}
                                />
                                {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="subject" className="text-sm text-gray-700 mb-1">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className={`w-full border-b py-1.5 focus:outline-none transition-colors bg-transparent text-gray-800 ${errors.subject ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#00a651]'}`}
                                />
                                {errors.subject && <span className="text-red-500 text-xs mt-1">{errors.subject}</span>}
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="message" className="text-sm text-gray-700 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows={4}
                                    className={`w-full border rounded-md p-3 focus:outline-none transition-colors bg-transparent resize-none mt-1 text-gray-800 ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-[#00a651]'}`}
                                ></textarea>
                                {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message}</span>}
                            </div>

                            {/* Consent Checkbox */}
                            <div>
                                <div className="flex items-start gap-3 mt-2">
                                    <div className="relative mt-1 flex-shrink-0 w-6 h-6">
                                        <input
                                            type="checkbox"
                                            id="consent"
                                            name="consent"
                                            checked={formData.consent}
                                            onChange={handleChange}
                                            className="peer absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                        />
                                        <div
                                            className={`w-full h-full flex items-center justify-center transition-all bg-white border rounded-[8px] peer-checked:border-transparent peer-checked:bg-[linear-gradient(270deg,#06A358,#001EFE)]
peer-checked:bg-no-repeat
peer-checked:bg-cover ${errors.consent ? 'border-red-500' : 'border-gray-300'}`}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="3.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className={`w-[14px] h-[14px] transition-opacity duration-200 ${formData.consent ? 'opacity-100' : 'opacity-0'}`}
                                            >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        </div>
                                    </div>
                                    <label htmlFor="consent" className="text-xs text-gray-500 leading-relaxed cursor-pointer">
                                        I, hereby accord my consent to process my above mentioned personal data by BFC Capital Pvt. Ltd. for the purpose of customer support/product promotion, in accordance with the provisions of DPDP Act 2023. To know more <a href="#" className="text-blue-600 underline hover:text-blue-800">click here.</a>
                                    </label>
                                </div>
                                {errors.consent && <span className="text-red-500 text-xs mt-1 block">{errors.consent}</span>}
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`mt-4 bg-[#024B39] hover:bg-[#024B39] text-white px-8 py-2.5 rounded text-sm font-medium transition-colors flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting && (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    )}
                                    {isSubmitting ? 'Submitting...' : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Side - Map */}
                    {/* Right Side - Map */}
                    <div className="w-full lg:w-[45%] lg:bg-gradient-to-r lg:from-[#0052cc] lg:to-[#00a651] lg:p-0 lg:py-8 lg:pr-8 lg:flex lg:flex-col lg:justify-stretch lg:min-h-[400px] lg:relative">

                        {/* Map container */}
                        <div className="w-full h-[420px] lg:h-full lg:bg-gray-200 lg:rounded-[1.5rem] overflow-hidden lg:flex-1 lg:relative lg:z-10 lg:shadow-[-8px_0_24px_rgba(0,0,0,0.05)] lg:-ml-12 lg:w-[calc(100%+3rem)] xl:-ml-16 xl:w-[calc(100%+4rem)]">

                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d222.47599814379984!2d81.02277120690643!3d26.85216426319041!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2e63c8d5997%3A0x33e9ebd3d6fdd310!2sBFC%20Capital%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1772784473984!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                title="BFC Capital Office Location Google Map"
                            ></iframe>

                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Support Section */}
            <div className="w-full bg-gradient-to-r from-[#0052cc] to-[#00a651] py-14 mt-16 shadow-inner">
                <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">

                    <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-10">
                        Customer Support
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 lg:gap-20">

                        {/* Phone */}
                        <div className="flex items-center gap-3 font-semibold text-base md:text-md lg:text-2xl cursor-pointer">
                            <Image src="/Contact-Us/call.png" alt="Phone" width={22} height={22} />
                            <a href="tel:+915223514141" className="text-white">
                                +91-522-3514141
                            </a>
                        </div>

                        {/* WhatsApp */}
                        <div className="flex items-center gap-3 font-semibold text-base md:text-md lg:text-2xl cursor-pointer">
                            <Image src="/Contact-Us/whatsapp.png" alt="WhatsApp" width={22} height={22} />
                            <a
                                href="https://wa.me/917347700888"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white"
                            >
                                +91-7347700888
                            </a>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-3 font-semibold text-base md:text-lg lg:text-2xl cursor-pointer">
                            <Image src="/Contact-Us/mail.png" alt="Email" width={22} height={22} />
                            <a
                                href="mailto:customersupport@bfccapital.com"
                                className="text-white"
                            >
                                customersupport@bfccapital.com
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </div >
    );
}