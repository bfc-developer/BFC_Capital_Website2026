import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function InvestorEducationPlatforms() {
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
                    <span className="text-[#7A7A7A] font-semibold">Investor Education Platforms</span>
                </nav>
                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-[#44475B] mb-6 leading-tight">
                    Access to the right knowledge and tools is essential for making informed investment decisions.
                </h1>

                <div className="space-y-4">

                    <p className="text-[#44475B]">
                        Hence, the SEBI has launched an initiative to educate investors through the SAARTHI App.
                    </p>

                    <p className="text-[#44475B] mb-4">
                        The objective of this platform is to educate and empower investors by providing simple, reliable, and unbiased financial knowledge. It aims to help users:
                    </p>
                </div>

                {/* Bullet List */}
                <ul className="pl-1 md:pl-2">
                    <li className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#44475B] mt-2.5 mr-3 shrink-0"></span>
                        <span className="text-[#44475B]">Understand basic and advanced financial concepts</span>
                    </li>
                    <li className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#44475B] mt-2.5 mr-3 shrink-0"></span>
                        <span className="text-[#44475B]">Make informed investment decisions</span>
                    </li>
                    <li className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#44475B] mt-2.5 mr-3 shrink-0"></span>
                        <span className="text-[#44475B]">Access tools and calculators for better planning</span>
                    </li>
                    <li className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-[#44475B] mt-2.5 mr-3 shrink-0"></span>
                        <span className="text-[#44475B]">Improve their overall financial awareness and health</span>
                    </li>
                </ul>

                {/* First Graphic Card */}
                <div className="pt-4 pb-6 flex justify-center">
                    <div className="w-full relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#E5E7EB]">
                        <Image
                            src="/investor-education.webp"
                            alt="SEBI Saarthi App Infographic"
                            width={4096}
                            height={2304}
                            className="w-full h-auto object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Transition paragraph */}
                <p className="pt-2 pb-2 text-[#44475B]">
                    In addition to the SAARTHI App, the Securities and Exchange Board of India has launched the SEBI Investor Website <Link href="https://investor.sebi.gov.in" target="_blank" rel="noopener noreferrer">(https://investor.sebi.gov.in)</Link>, which provides investors with a wide range of educational resources, financial calculators, and other useful tools.
                </p>

                {/* Second Graphic Card */}
                <div className="pt-4 flex justify-center">
                    <div className="w-full relative rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-[#E5E7EB]">
                        <Image
                            src="/investor-education2.webp"
                            alt="SEBI Investor Website Infographic"
                            width={2936}
                            height={1652}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}