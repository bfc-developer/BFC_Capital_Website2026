"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function GrievanceMechanismForPWD() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 md:py-12 md:px-15 lg:px-20">
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
                    <span
                        className="font-semibold"
                        style={{
                            background: "linear-gradient(90deg, #024B39 39.5%, #011EFE 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            color: "transparent"
                        }}
                    >
                        Compliances
                    </span>
                    <ChevronRight
                        className="h-4 w-4 mx-2"
                        style={{ stroke: "url(#chevron-gradient)" }}
                    />
                    <span className="text-[#7A7A7A] font-semibold">Grievance Mechanism For PWD</span>
                </nav>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-[#44475B] mb-6 leading-tight">
                    Grievance Redressal Mechanism – Accessibility Compliance (SEBI Circular dated July 31, 2025)
                </h1>

                {/* Intro Paragraph */}
                <p className="text-[15px] md:text-[16px] text-[#44475B] leading-relaxed mb-8 text-justify">
                    In compliance with the SEBI circular, BFC Capital Pvt. Ltd. has established a dedicated grievance redressal mechanism to address accessibility-related complaints from persons with disabilities (PwDs).
                </p>

                {/* Main Content Sections */}
                <div className="space-y-8 text-[#44475B]">
                    {/* Section 1 */}
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-[22px] font-bold text-[#44475B] leading-snug">
                            1. Dedicated Channels
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-[15px] md:text-[16px] leading-relaxed">
                            <li>
                                Email: <a href="mailto:akashgupta@bfccapital.com" className="">akashgupta@bfccapital.com</a>
                            </li>
                            <li>
                                Helpline: <a href="tel:+91-6307937533">+91-6307937533</a> (operational Mon–Fri, 9:30 AM – 6:00 PM)
                            </li>
                            <li>
                                Web Form: Available on <a href="https://www.bfccapital.com" target="_blank" rel="noopener noreferrer" className="">www.bfccapital.com</a>
                            </li>
                        </ul>
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-[22px] font-bold text-[#44475B] leading-snug">
                            2. Process
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-[15px] md:text-[16px] leading-relaxed">
                            <li>
                                All accessibility-related grievances will be acknowledged within 2 working days.
                            </li>
                            <li>
                                Resolution/response will be provided within 15 working days.
                            </li>
                            <li>
                                Complex issues requiring longer timelines will be communicated clearly to the complainant.
                            </li>
                        </ul>
                    </div>

                    {/* Section 3 */}
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-[22px] font-bold text-[#44475B] leading-snug">
                            3. Escalation Matrix
                        </h2>
                        <ul className="list-disc pl-6 space-y-2 text-[15px] md:text-[16px] leading-relaxed">
                            <li>
                                Level 1: Compliance Officer Mr. Sunil Kumar Gupta, Email: <a href="mailto:sunilgupta@bfccapital.com" className="">sunilgupta@bfccapital.com</a>, Contact: <a href="tel:+91-8960006601">+91-8960006601</a>
                            </li>
                            <li>
                                Level 2: Director Mr. Sharad Bindal, Emaill: <a href="mailto:sharadbindal@bfccapital.com" className="">sharadbindal@bfccapital.com</a>, Contact: <a href="tel:+91-9792202239">+91-9792202239</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}