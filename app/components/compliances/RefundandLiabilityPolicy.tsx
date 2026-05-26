"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function RefundAndLiabilityPolicy() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 md:py-12 md:px-15 lg:px-20">
                {/* Breadcrumb */}
                <nav className="flex items-center text-sm mb-8">
                    <Link
                        href="/"
                        className="font-semibold"
                        style={{
                            background: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
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
                            <stop offset="39.5%" stopColor="#04B488" />
                            <stop offset="100%" stopColor="#011EFE" />
                        </linearGradient>
                    </svg>

                    <ChevronRight
                        className="h-4 w-4 mx-2"
                        style={{ stroke: "url(#chevron-gradient)" }}
                    />
                    <Link
                        href="/compliances"
                        className="font-semibold"
                        style={{
                            background: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            color: "transparent"
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            window.dispatchEvent(new CustomEvent("open-navbar-compliance"));
                        }}
                    >
                        Compliances
                    </Link>
                    <ChevronRight
                        className="h-4 w-4 mx-2"
                        style={{ stroke: "url(#chevron-gradient)" }}
                    />
                    <span className="text-[#7A7A7A] font-semibold">Refund &amp; Liability Policy</span>
                </nav>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-[#44475B] mb-6 leading-tight">
                    Refund &amp; Liability Policy
                </h1>

                {/* Intro Paragraphs */}
                <div className="text-[15px] md:text-[16px] text-[#44475B] leading-relaxed mb-8 text-justify">
                    <p>
                        Either party may terminate the advisory agreement by providing thirty (30) days&apos; prior written notice.
                    </p>
                    <p>
                        Any advance fees paid shall be refunded in accordance with the refund policy mentioned below.
                    </p>
                </div>

                {/* Sections */}
                <div className="space-y-8 text-[#44475B]">
                    {/* Section 1 */}
                    <div className="">
                        <h2 className="text-xl md:text-[22px] font-bold text-[#44475B] leading-snug mb-4">
                            1. Refund Policy
                        </h2>
                        <ul className="list-disc pl-6 text-[15px] md:text-[16px] leading-relaxed text-justify">
                            <li>
                                Fees shall be charged on a pro-rata basis for the period services have been rendered.
                            </li>
                            <li>
                                Any outstanding dues shall become immediately payable by the client.
                            </li>
                            <li>
                                In cases where fees have been received in advance for future periods, the Investment Adviser may retain up to one quarter of the agreed fees as a breakage fee, and the balance, if any, shall be refunded.
                            </li>
                            <li>
                                Fees charged for any specific task or service are non-refundable once the advice or service has been delivered.
                            </li>
                        </ul>
                    </div>

                    {/* Section 2 */}
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-[22px] font-bold text-[#44475B] leading-snug">
                            2. Processing Time
                        </h2>
                        <p className="text-[15px] md:text-[16px] leading-relaxed text-justify">
                            Approved refunds, if applicable, will be processed within a period of 10 working days from the date of approval and shall be credited to the original payment method.
                        </p>
                    </div>

                    {/* Section 3 */}
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-[22px] font-bold text-[#44475B] leading-snug">
                            3. No Guarantee of Returns
                        </h2>
                        <p className="text-[15px] md:text-[16px] leading-relaxed text-justify">
                            Investment advisory services are provided on a best-effort basis. The Investment Adviser does not guarantee any returns or capital protection. Refunds are not issued based on market losses or disagreement with the advice
                        </p>
                    </div>

                    {/* Section 4 */}
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-[22px] font-bold text-[#44475B] leading-snug">
                            4. Limitation of Liability
                        </h2>
                        <div className="space-y-4">
                            <p className="text-[15px] md:text-[16px] leading-relaxed text-justify">
                                As per applicable regulations, the Investment Adviser shall not be held liable for any losses incurred by the client due to:
                            </p>
                            <ul className="list-disc pl-6 text-[15px] md:text-[16px] leading-relaxed text-justify">
                                <li>
                                    Market fluctuations
                                </li>
                                <li>
                                    Decline in the value of assets
                                </li>
                                <li>
                                    Non-performance or underperformance of securities/funds
                                </li>
                                <li>
                                    Any other market-related factors
                                </li>
                                <li>
                                    All investment decisions made by the client based on the advice are at the client&apos;s own discretion and risk.
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 5 */}
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-[22px] font-bold text-[#44475B] leading-snug">
                            5. Regulatory Compliance
                        </h2>
                        <p className="text-[15px] md:text-[16px] leading-relaxed text-justify">
                            This policy is framed in accordance with applicable guidelines and regulations issued by the Securities and Exchange Board of India (SEBI).
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}