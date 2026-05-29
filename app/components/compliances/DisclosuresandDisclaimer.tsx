"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function DisclosureAndDisclaimer() {
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
                    <span className="text-[#7A7A7A] font-semibold">Disclosure &amp; Disclaimers</span>
                </nav>

                {/* Title */}
                <h1 className="text-[32px] font-bold text-[#44475B] mb-8">
                    Disclosure
                </h1>

                {/* Content */}
                <div className="text-[15px] md:text-[16px] text-[#44475B] leading-relaxed space-y-6 text-justify">
                    <p>
                        1. We are a SEBI-registered investment adviser (Registration <abbr title="Number">No.</abbr> INA000021669) operating on a hybrid model. In addition to our advisory registration, we also hold a valid AMFI registration bearing number 21399. Initial registration date was 31st July 2004, and is valid up to 29 July, 2029. It is renewed from time to time in accordance with applicable regulatory requirements.
                    </p>

                    <p>
                        2. No penalties/directions have been issued by the SEBI under the SEBI Act or any other regulatory body against us.
                    </p>

                    <p>
                        3. For our advisory clients, we do not recommend any stockbroker or other intermediary, nor do we receive any consideration, remuneration, or compensation in any form whatsoever from such entities.
                    </p>

                    <p className="pt-2">
                        However, under our distribution services offered to clients, we may receive commissions in accordance with applicable regulations, which are as follows;
                    </p>
                </div>

                {/* Commission Table */}
                <div className="overflow-x-auto border border-[#E5E7EB] rounded-2xl shadow-sm mt-8">
                    <table className="min-w-full divide-y divide-[#E5E7EB] text-left text-sm text-[#44475B]">
                        <thead className="text-gray-800 font-bold text-xs" style={{ background: 'linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)' }}>
                            <tr>
                                <th scope="col" className="px-6 py-4 font-bold text-[13px] md:text-sm leading-tight border-r border-[#E5E7EB]">
                                    AMC Name
                                </th>
                                <th scope="col" className="px-6 py-4 font-bold text-[13px] md:text-sm leading-tight border-r border-[#E5E7EB] text-center">
                                    Equity (% pa.)
                                </th>
                                <th scope="col" className="px-6 py-4 font-bold text-[13px] md:text-sm leading-tight border-r border-[#E5E7EB] text-center">
                                    Hybrid (% pa.)
                                </th>
                                <th scope="col" className="px-6 py-4 font-bold text-[13px] md:text-sm leading-tight text-center">
                                    Debt (% pa.)
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E7EB] bg-white">
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    360 ONE Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.70-1.13
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    1.15-1.16
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.04-0.21
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Aditya Birla Sun Life Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.91- 1.37
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.57-1.09
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.08-0.90
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Axis Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.70-1.20
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.64-1.40
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.02-0.89
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Bajaj Finserv Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    1.14-1.81
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.71-1.42
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.50-0.75
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Bandhan Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    1.00-1.65
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.75-1.45
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.06-1.10
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Bank Of India Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    1.30-1.65
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.65-1.65
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.03-0.75
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Baroda BNP Paribas Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.90-1.65
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.80-1.85
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.10-1.25
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Canara Robeco Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.10-1.60
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    1.25-1.4
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.02-1.30
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    DSP Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.75-1.40
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.70.1.25
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.05-0.70
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Edelweiss Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.85-1.48
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.93-1.25
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.04-0.65
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Franklin Templeton Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.37-1.52
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.62-1.29
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.04-0.69
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    HDFC Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.54-1.07
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.42-0.81
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.08-0.68
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Helios Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    1.05-1.70
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.53-1.70
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.04
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    HSBC Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.85-1.40
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.54-1.31
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.7-0.81
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    ICICI Prudential Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.36-1.06
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.40-0.76
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.04-0.60
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Invesco Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.975-1.229
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    1.017-1.568
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.127-0.466
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    ITI Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    1.32-1.71
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.71-1.71
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.08-0.89
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    JM Financial Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    1.19-1.85
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.76-1.45
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.45-0.76
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Kotak Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.16-1.39
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.86-1
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.08-0.9
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    LIC Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    1.40-1.80
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.08-0.24
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.05-0.75
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Mahindra Manulife Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    1.30-1.85
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.70-1.75
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.05-1.20
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Mirae Asset Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.51-1.48
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.68-1.27
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.08-0.72
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Motilal Oswal Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.12-1.65
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    1.06-1.45
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.18-0.94
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Nippon India Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.50-1.40
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    1.00-1.27
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.05-1.05
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    PGIM India Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    1.18-1.83
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.83-1.83
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.01-1.18
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    PPFAS Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.34-1.00
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.30-0.34
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.08
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Quant Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.51-0.97
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.81-1.16
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.04-0.76
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    SBI Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.339-1.203
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.466-0.788
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.042-0.780
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Sundaram Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.51-1.19
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    1.02-0
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.17-1.02
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Tata Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    1.00-1.40
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    1.05-1.35
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.05-0.75
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    Union Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    1.11-1.62
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.59-1.44
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.08-0.64
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    UTI Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.95-1.60
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.60-1.30
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.30-1.18
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] font-semibold">
                                    WhiteOak Capital Mutual Fund
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    1.05-1.65
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.70-1.50
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] text-center whitespace-nowrap font-semibold">
                                    0.10-0.50
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Continued Disclosure Content */}
                <div className="text-[15px] md:text-[16px] text-[#44475B] leading-relaxed space-y-6 text-justify mt-8">
                    <p>
                        4. Investments in debt instruments are subject to reinvestment risks as interest rates prevailing on the interest amount or maturity due dates may differ from the original coupon of the bond, which might result in the proceeds being invested at a lower rate.
                    </p>
                    <p>
                        5. If a client seeks our view on specific positions, we may share our opinion on the securities. This shall be treated strictly as an opinion, not investment advice. Clients should use their own judgment while making decisions. We shall not be liable for any losses arising from this opinion.
                    </p>
                    <p>
                        6. The names of the products/nature of investments do not in any manner indicate their prospects or returns. The performance in the equity products may be adversely affected by the performance of individual companies, changes in the market and industry-specific and macro-economic factors.
                    </p>
                    <p>
                        7. Investment in the market is subject to market risk, though best attempts are made to predict markets; no surety of return or accuracy of any kind is guaranteed.
                    </p>
                    <p>
                        8. The performance of the investments/products may be affected by changes in Government policies, general levels of interest rates and risks associated with trading volumes, liquidity and settlement systems in equity and debt markets.
                    </p>
                    <p>
                        9. We do not provide any profit/loss sharing services, guaranteed profit services, Demat services.
                    </p>
                </div>

                {/* Second Disclosure/Disclaimer Title */}
                <h2 className="text-[32px] font-bold text-[#44475B] mt-12 mb-8">
                    Disclosure
                </h2>

                {/* Disclaimer Content */}
                <div className="text-[15px] md:text-[16px] text-[#44475B] leading-relaxed space-y-6 text-justify">
                    <p>
                        1. All the information on this website - <a href="https://bfccapital.com/" target="_blank" rel="noopener noreferrer" className="">https://bfccapital.com/</a> - is published in good faith and for general information purposes only. BFC Capital does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website (BFC Capital) is strictly at your own risk.
                    </p>
                    <p>
                        2. BFC Capital will not be liable for any losses and/or damages in connection with the use of our website.
                    </p>
                    <p>
                        3. From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites.
                    </p>
                    <p>
                        4. Site owners and content may change without notice, and may occur before we have the opportunity to remove a link that may have gone &apos;bad&apos;. Please also be aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control.
                    </p>
                    <p>
                        5. Please be sure to check the Privacy Policies of these sites as well as their &ldquo;Terms of Service&rdquo; before engaging in any business or uploading any information.
                    </p>
                    <p>
                        6. Additionally, registration granted by SEBI, enlistment as an IA with the exchange and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
                    </p>
                    <p>
                        7. The securities quoted, if any, are for illustration only and are not recommended.
                    </p>
                    <p className="font-bold">
                        8. Investments in the securities market are subject to market risks. Read all the related documents carefully before investing.
                    </p>
                </div>
            </div>
        </>
    );
}