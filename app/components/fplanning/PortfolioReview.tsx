"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import StepActions from "./StepActions";

interface PortfolioReviewProps {
    profileId?: string | null;
    financialPlanningId?: string | null;
    onBack?: () => void;
    showBack?: boolean;
    onSuccess?: () => void;
}

export default function PortfolioReview({
    profileId,
    onBack,
    showBack = false,
    onSuccess,
}: PortfolioReviewProps) {
    const router = useRouter();
    const [needsReview, setNeedsReview] = useState<"Yes" | "No" | "">("");
    const [remarks, setRemarks] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Prefetch existing portfolio review from dedicated collection
    useEffect(() => {
        if (!profileId) return;

        const fetchExisting = async () => {
            try {
                const res = await fetch(`https://k2b02x8c-5000.inc1.devtunnels.ms/api/portfolio-review/profile/${profileId}`);
                if (res.ok) {
                    const json = await res.json();
                    if (json.data) {
                        if (json.data.needsPortfolioReview) {
                            setNeedsReview(json.data.needsPortfolioReview);
                        }
                        if (json.data.remarks) {
                            setRemarks(json.data.remarks);
                        }
                    }
                }
            } catch (err) {
                console.error("Error loading portfolio review data:", err);
            }
        };

        fetchExisting();
    }, [profileId]);

    const handleSubmit = async () => {
        if (!needsReview) {
            toast.error("Please select whether you need a portfolio review.");
            return;
        }

        if (!profileId) {
            toast.error("Profile ID missing. Please return to Step 1 and create a profile.");
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                personalProfileId: profileId,
                needsPortfolioReview: needsReview,
                remarks: remarks.trim(),
            };

            const res = await fetch("https://k2b02x8c-5000.inc1.devtunnels.ms/api/portfolio-review", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errJson = await res.json().catch(() => ({}));
                throw new Error(errJson.message || "Failed to save portfolio review.");
            }

            toast.success("Portfolio review submitted successfully!");
            setIsSubmitted(true);
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error("Failed to submit portfolio review:", err);
            toast.error(err instanceof Error ? err.message : "Submission failed.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="space-y-6">
                <div className="w-full min-w-0 bg-white border border-[#e0dbdb] rounded-[18px] sm:rounded-[24px] lg:rounded-[33px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-4 sm:p-6 md:p-8 lg:p-10">
                    <div className="mb-4">
                        <h1 className="font-bold text-[16px] sm:text-[19px] md:text-[21px] lg:text-[25px] bg-gradient-to-r from-[#06a358] to-[#035daf] bg-clip-text text-transparent">
                            Do You Need a Portfolio Review?
                        </h1>
                    </div>

                    <div className="space-y-3 mb-5">
                        <div role="radiogroup" aria-label="Contingency Plan" className="grid grid-cols-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setNeedsReview("Yes")}
                                role="radio"
                                aria-checked={needsReview === "Yes"}
                                className={`mb-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors border-gray-200 group hover:bg-[#06A358] ${needsReview === "Yes" ? "bg-[#06A358]" : "bg-white text-gray-700"}`}
                            >
                                <span className="items-center flex gap-1">
                                    <span className={needsReview === "Yes" ? "text-white" : "text-gray-700 group-hover:text-white"}>Yes</span>
                                    <img
                                        className="w-[15px] h-[15px]"
                                        src="/financialplanning/done.png"
                                        alt="done"
                                        width={15}
                                        height={15}
                                        style={{ width: "15px", height: "15px", filter: needsReview === "Yes" ? "brightness(0) invert(1)" : "none" }}
                                    />
                                </span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setNeedsReview("No")}
                                role="radio"
                                aria-checked={needsReview === "No"}
                                className={`mb-4 flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors border-gray-200 group hover:bg-[#06A358] ${needsReview === "No" ? "bg-[#06A358]" : "bg-white text-gray-700"}`}
                            >
                                <span className="items-center flex gap-1">
                                    <span className={needsReview === "No" ? "text-white" : "text-gray-700 group-hover:text-white"}>No</span>
                                    <img
                                        className="w-[15px] h-[15px]"
                                        src="/financialplanning/close.png"
                                        alt="close"
                                        width={15}
                                        height={15}
                                        style={{ width: "15px", height: "15px", filter: needsReview === "No" ? "brightness(0) invert(1)" : "none" }}
                                    />
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="w-full h-px bg-[#e9e9e9] my-6" />

                    <div>
                        <label className="block text-[13.5px] sm:text-[14px] font-medium text-[#44475b] mb-2.5">
                            Any specific concerns or details?
                        </label>
                        <textarea
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder="Tell us More..."
                            rows={4}
                            className="w-full rounded-xl border border-gray-200 bg-gray-50/60 p-4 text-sm text-[#44475b] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#06A358]/20 focus:border-[#06A358] transition-all resize-none shadow-2xs"
                        />
                    </div>
                </div>

                {/* Submit & Back Navigation */}
                <StepActions
                    showBack={showBack}
                    onBack={onBack}
                    onContinue={handleSubmit}
                    continueLabel="Submit"
                    isSubmitting={isSubmitting}
                />
            </div>

            {/* Final Popup Modal After Successful Submission */}
            {isSubmitted && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 999999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "20px",
                        backgroundColor: "rgba(0, 0, 0, 0.35)",
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                        overflow: "hidden",
                    }}
                >
                    {/* Modal Card Extended Horizontally by 75% */}
                    <div
                        style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "28px",
                            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.22)",
                            border: "1px solid #e0dbdb",
                            width: "75%",
                            maxWidth: "1150px",
                            minWidth: "320px",
                            minHeight: "560px",
                            maxHeight: "92vh",
                            overflowY: "auto",
                            paddingTop: "56px",
                            paddingBottom: "60px",
                            paddingLeft: "40px",
                            paddingRight: "40px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            textAlign: "center",
                            position: "relative",
                            boxSizing: "border-box",
                            overflow: "hidden",
                        }}
                    >
                        {/* Candlestick Design on the White Area */}
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                backgroundImage: "url('/financialplanning/candlestick_bg.png')",
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                opacity: 0.3,
                                pointerEvents: "none",
                            }}
                        />

                        {/* Candlestick Chart SVG Watermark on the White Area */}
                        <svg
                            style={{
                                position: "absolute",
                                inset: 0,
                                width: "100%",
                                height: "100%",
                                pointerEvents: "none",
                                opacity: 0.45,
                            }}
                            viewBox="0 0 1200 600"
                            preserveAspectRatio="none"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <line x1="60" y1="390" x2="60" y2="500" stroke="#93c5fd" strokeWidth="2" opacity="0.6" />
                            <rect x="54" y="420" width="12" height="55" rx="2" fill="#bfdbfe" opacity="0.75" />

                            <line x1="120" y1="360" x2="120" y2="470" stroke="#93c5fd" strokeWidth="2" opacity="0.6" />
                            <rect x="114" y="380" width="12" height="60" rx="2" fill="#bfdbfe" opacity="0.75" />

                            <line x1="180" y1="330" x2="180" y2="440" stroke="#93c5fd" strokeWidth="2" opacity="0.6" />
                            <rect x="174" y="350" width="12" height="65" rx="2" fill="#bfdbfe" opacity="0.75" />

                            <line x1="240" y1="340" x2="240" y2="450" stroke="#93c5fd" strokeWidth="2" opacity="0.5" />
                            <rect x="234" y="360" width="12" height="60" rx="2" fill="#bfdbfe" opacity="0.7" />

                            <line x1="300" y1="290" x2="300" y2="420" stroke="#93c5fd" strokeWidth="2" opacity="0.6" />
                            <rect x="294" y="310" width="12" height="80" rx="2" fill="#bfdbfe" opacity="0.8" />

                            <line x1="360" y1="260" x2="360" y2="390" stroke="#93c5fd" strokeWidth="2" opacity="0.6" />
                            <rect x="354" y="285" width="12" height="75" rx="2" fill="#bfdbfe" opacity="0.8" />

                            <line x1="420" y1="280" x2="420" y2="400" stroke="#93c5fd" strokeWidth="2" opacity="0.5" />
                            <rect x="414" y="305" width="12" height="65" rx="2" fill="#bfdbfe" opacity="0.7" />

                            <line x1="480" y1="230" x2="480" y2="360" stroke="#93c5fd" strokeWidth="2" opacity="0.6" />
                            <rect x="474" y="250" width="12" height="85" rx="2" fill="#bfdbfe" opacity="0.8" />

                            <line x1="540" y1="210" x2="540" y2="340" stroke="#93c5fd" strokeWidth="2" opacity="0.6" />
                            <rect x="534" y="230" width="12" height="80" rx="2" fill="#bfdbfe" opacity="0.8" />

                            <line x1="600" y1="240" x2="600" y2="360" stroke="#93c5fd" strokeWidth="2" opacity="0.5" />
                            <rect x="594" y="260" width="12" height="65" rx="2" fill="#bfdbfe" opacity="0.7" />

                            <line x1="660" y1="180" x2="660" y2="310" stroke="#93c5fd" strokeWidth="2" opacity="0.6" />
                            <rect x="654" y="200" width="12" height="85" rx="2" fill="#bfdbfe" opacity="0.8" />

                            <line x1="720" y1="160" x2="720" y2="290" stroke="#93c5fd" strokeWidth="2" opacity="0.6" />
                            <rect x="714" y="180" width="12" height="80" rx="2" fill="#bfdbfe" opacity="0.8" />

                            <line x1="780" y1="190" x2="780" y2="310" stroke="#93c5fd" strokeWidth="2" opacity="0.5" />
                            <rect x="774" y="210" width="12" height="70" rx="2" fill="#bfdbfe" opacity="0.7" />

                            <line x1="840" y1="140" x2="840" y2="270" stroke="#93c5fd" strokeWidth="2" opacity="0.6" />
                            <rect x="834" y="160" width="12" height="85" rx="2" fill="#bfdbfe" opacity="0.8" />

                            <line x1="900" y1="120" x2="900" y2="250" stroke="#93c5fd" strokeWidth="2" opacity="0.6" />
                            <rect x="894" y="140" width="12" height="80" rx="2" fill="#bfdbfe" opacity="0.8" />

                            <line x1="960" y1="150" x2="960" y2="280" stroke="#93c5fd" strokeWidth="2" opacity="0.5" />
                            <rect x="954" y="170" width="12" height="75" rx="2" fill="#bfdbfe" opacity="0.7" />

                            <line x1="1020" y1="100" x2="1020" y2="230" stroke="#93c5fd" strokeWidth="2" opacity="0.6" />
                            <rect x="1014" y="120" width="12" height="85" rx="2" fill="#bfdbfe" opacity="0.85" />

                            <line x1="1080" y1="70" x2="1080" y2="200" stroke="#93c5fd" strokeWidth="2" opacity="0.6" />
                            <rect x="1074" y="90" width="12" height="90" rx="2" fill="#bfdbfe" opacity="0.85" />

                            <line x1="1140" y1="40" x2="1140" y2="170" stroke="#93c5fd" strokeWidth="2" opacity="0.6" />
                            <rect x="1134" y="60" width="12" height="85" rx="2" fill="#bfdbfe" opacity="0.85" />
                        </svg>

                        {/* Cross Button to navigate back to /financial-planning */}
                        <button
                            type="button"
                            onClick={() => router.push("/financial-planning")}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition cursor-pointer z-10"
                            aria-label="Close and return to Financial Planning"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>

                        {/* Illustration */}
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: "24px",
                                position: "relative",
                                zIndex: 10,
                            }}
                        >
                            <img
                                src="/financialplanning/Group 2362.png"
                                alt="Financial Report Ready"
                                style={{
                                    height: "260px",
                                    maxHeight: "265px",
                                    width: "auto",
                                    maxWidth: "390px",
                                    objectFit: "contain",
                                    display: "block",
                                }}
                            />
                        </div>

                        {/* Headline with BFC gradient */}
                        <h2
                            style={{
                                textAlign: "center",
                                fontWeight: 700,
                                fontSize: "28px",
                                lineHeight: "1.3",
                                marginBottom: "14px",
                                backgroundImage: "linear-gradient(to right, #06a358, #001EFE)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                position: "relative",
                                zIndex: 10,
                            }}
                        >
                            You&apos;re One Step Closer to Financial Freedom.
                        </h2>

                        {/* Subtitles */}
                        <p
                            style={{
                                textAlign: "center",
                                color: "#44475B",
                                fontSize: "16.5px",
                                fontWeight: 600,
                                marginBottom: "8px",
                                position: "relative",
                                zIndex: 10,
                            }}
                        >
                            Your personalised financial report is ready and sent on your E-mail.
                        </p>
                        <p
                            style={{
                                textAlign: "center",
                                color: "#44475B",
                                fontSize: "16.5px",
                                fontWeight: 600,
                                margin: 0,
                                position: "relative",
                                zIndex: 10,
                            }}
                        >
                            Let&apos;s turn insights into action.
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}
