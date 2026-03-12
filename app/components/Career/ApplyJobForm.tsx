"use client";

import React, { useState } from "react";
import SuccessPopup from "../common/SuccessPopup";
import Link from "next/link";

interface ApplyJobFormProps {
    defaultPost?: string;
}

export default function ApplyJobForm({ defaultPost = "" }: ApplyJobFormProps) {
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [fileName, setFileName] = useState("No file chosen");
    const [formData, setFormData] = useState({
        fullName: "",
        mobileNumber: "",
        emailId: "",
        postAppliedFor: defaultPost,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send data to an API
        setIsSuccessOpen(true);
    };

    return (
        <div className="bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 p-6 md:p-12 mb-20 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-[#44475B] mb-12">
                Apply for this job
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12">
                    {/* Full Name */}
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            required
                            className="w-full border-b border-[#D9D9D9] py-2 focus:outline-none focus:border-[#04B488] transition-colors placeholder:text-[#44475B]"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                    </div>

                    {/* Mobile Number */}
                    <div>
                        <input
                            type="tel"
                            placeholder="Mobile Number"
                            required
                            className="w-full border-b border-[#D9D9D9] py-2 focus:outline-none focus:border-[#04B488] transition-colors placeholder:text-[#44475B]"
                            value={formData.mobileNumber}
                            onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                        />
                    </div>

                    {/* Email ID */}
                    <div>
                        <input
                            type="email"
                            placeholder="Email ID"
                            required
                            className="w-full border-b border-[#D9D9D9] py-2 focus:outline-none focus:border-[#04B488] transition-colors placeholder:text-[#44475B]"
                            value={formData.emailId}
                            onChange={(e) => setFormData({ ...formData, emailId: e.target.value })}
                        />
                    </div>

                    {/* Post Applied For */}
                    <div>
                        <input
                            type="text"
                            placeholder="Post Applied For?"
                            readOnly
                            required
                            className="w-full border-b border-[#D9D9D9] py-2 focus:outline-none transition-colors placeholder:text-[#44475B] text-[#44475B] font-bold cursor-default"
                            value={formData.postAppliedFor}
                        />
                    </div>
                </div>

                {/* File Upload */}
                <div className="mt-8">
                    <p className="text-[#44475B] mb-3 text-sm">Upload Resume/CV</p>
                    <div className="flex items-center">
                        <label className="cursor-pointer bg-[#F8F9FA] px-6 py-2.5 border border-[#D9D9D9] rounded-l-lg text-[#44475B] text-sm hover:bg-gray-100 transition-colors shrink-0">
                            Choose File
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                className="hidden"
                                required
                                onChange={(e) => setFileName(e.target.files?.[0]?.name || "No file chosen")}
                            />
                        </label>
                        <div className="flex-1 py-2.5 px-4 text-[#7A7A7A] text-sm bg-white border-y border-r border-[#D9D9D9] rounded-r-lg truncate">
                            {fileName}
                        </div>
                    </div>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-4 mt-8">
                    <label className="relative flex cursor-pointer items-center rounded-full pt-1">
                        <input
                            type="checkbox"
                            required
                            className="peer sr-only"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                        />
                        <div
                            className={`h-5 w-5 rounded border flex items-center justify-center transition-all ${isChecked
                                    ? "border-transparent"
                                    : "border-gray-300"
                                }`}
                            style={{
                                background: isChecked
                                    ? "linear-gradient(269.9deg, #06A358 24.53%, #001EFE 156.82%)"
                                    : "transparent"
                            }}
                        >
                            {isChecked && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5 text-white"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </div>
                    </label>
                    <p className="text-sm text-[#7A7A7A] leading-relaxed">
                        I, hereby accord my consent to process my above mentioned personal data by BFC Capital Pvt. Ltd. for the purpose of customer support/product promotion, in accordance with the provisions of DPDP Act 2023. To know more <Link href="#" className="bg-gradient-to-r from-[#04B488] to-[#011EFE] bg-clip-text text-transparent underline font-medium">click here.</Link>
                    </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end mt-8">
                    <button
                        type="submit"
                        className="text-white px-8 py-2.5 rounded hover:opacity-90 transition-opacity font-medium"
                        style={{
                            background: "linear-gradient(269.9deg, #06A358 24.53%, #001EFE 156.82%)"
                        }}
                    >
                        Submit
                    </button>
                </div>
            </form>

            <SuccessPopup
                isOpen={isSuccessOpen}
                onClose={() => setIsSuccessOpen(false)}
            />
        </div>
    );
}
