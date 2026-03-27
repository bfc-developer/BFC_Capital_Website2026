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
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileName, setFileName] = useState("No file chosen");
    const [formData, setFormData] = useState({
        fullName: "",
        mobileNumber: "",
        emailId: "",
        postAppliedFor: defaultPost,
    });

    const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbySoFCP9KLbkAtZOhwF-eRYF9C-4geGszP6jjUT4CICBr1FFwYpsTS-i4_EVA4YWjdXDQ/exec";

    const toBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                resolve(result.split(",")[1]);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let resumeBase64: string | null = null;
            let resumeFileName: string | null = null;
            let resumeMimeType: string | null = null;

            const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement | null;
            const file = fileInput?.files?.[0];

            if (file) {
                resumeBase64 = await toBase64(file);
                resumeFileName = file.name;
                resumeMimeType = file.type || "application/octet-stream";
            }

            const payload = {
                fullName: formData.fullName,
                mobileNumber: formData.mobileNumber,
                emailId: formData.emailId,
                postAppliedFor: formData.postAppliedFor,
                resumeBase64,
                resumeFileName,
                resumeMimeType,
            };

            await fetch(APPS_SCRIPT_URL, {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            setIsSuccessOpen(true);
            setFormData({ ...formData, fullName: "", mobileNumber: "", emailId: "" });
            setFileName("No file chosen");
            setIsChecked(false);
            if (fileInput) fileInput.value = "";

        } catch (error) {
            console.error("Submission error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
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
                            className="w-full border-b border-[#D9D9D9] text-[#44475B] py-2 focus:outline-none focus:border-[#04B488] transition-colors placeholder:text-[#44475B]"
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
                            className="w-full border-b border-[#D9D9D9] text-[#44475B] py-2 focus:outline-none focus:border-[#04B488] transition-colors placeholder:text-[#44475B]"
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
                            className="w-full border-b border-[#D9D9D9] text-[#44475B] py-2 focus:outline-none focus:border-[#04B488] transition-colors placeholder:text-[#44475B]"
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
                        I, hereby accord my consent to process my above mentioned personal data by BFC Capital Pvt. Ltd. for the purpose of customer support/product promotion, in accordance with the provisions of DPDP Act 2023. To know more <Link href="https://bfccapital.com/dpdpact" className="underline text-[#011EFE]">click here.</Link>
                    </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end mt-8">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`text-white px-8 py-2.5 rounded hover:opacity-90 transition-opacity font-medium flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                        style={{
                            background: "#04B488"
                        }}
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

            <SuccessPopup
                isOpen={isSuccessOpen}
                onClose={() => setIsSuccessOpen(false)}
            />
        </div>
    );
}
