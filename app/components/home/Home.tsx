"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Play,
    UserPlus, Banknote, Search, PieChart, BarChart, ChevronDown
} from 'lucide-react';

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import VideoCarousel from "../common/VideoCarousel";

// --- Sub-Components ---

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            type: 'wealth',
            image: "/Home/BFC-YTThumbnail.svg",
            title: "Crafting Wealth, Curating Portfolios –",
            highlight: "20+ Years of Excellence."
        },

        {
            type: 'app',
            image: "/Home/iPhone16Pro.svg",
            title: "Your future won't build itself — start investing with Prodigy Pro today!",
            highlight: ""
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 6000); // Slightly longer for mixed content
        return () => clearInterval(timer);
    }, [slides.length]);

    const activeSlide = slides[currentSlide];

    return (
        <section
            className={`relative w-full overflow-hidden transition-all duration-700 min-h-[650px] flex items-center ${activeSlide.type === 'app' ? 'bg-gradient-to-r from-blue-700 via-bfc-blue to-bfc-green' : 'bg-gradient-to-b from-blue-50 to-white'}`}
        >
            {/* Background Images for Wealth Slides */}
            {slides.map((slide, index) => slide.type === 'wealth' && (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-50 pointer-events-none" : "opacity-0"}`}
                >
                    <div
                        className="h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${slide.image}')` }}
                    ></div>
                </div>
            ))}

            <div className="container relative mx-auto px-4 z-10 py-12">
                {activeSlide.type === 'wealth' ? (
                    <div className="animate-in fade-in zoom-in duration-500 text-center">
                        <h1 className="mx-auto max-w-5xl text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-7xl text-gradient-green-blue py-2">
                            {activeSlide.title} <br className="hidden md:block" />
                            {activeSlide.highlight}
                        </h1>

                        {/* Stats Circles */}
                        <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-8">
                            <div className="flex bg-white flex-col items-center justify-center w-40 h-40 md:w-52 md:h-52 rounded-full border-gradient-blue-green shadow-xl p-4">
                                <Image src="/Home/image1.svg" alt="" width={100} height={100} className="mb-1" />
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-tight">RIA :</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-tight">INA000021669</p>
                            </div>
                            <div className="flex bg-white flex-col items-center justify-center w-40 h-40 md:w-52 md:h-52 rounded-full border-gradient-blue-green shadow-xl p-4">
                                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800">1000+ Cr.</h3>
                                <p className="text-[10px] md:text-xs text-gray-600 font-semibold text-center mt-1 uppercase tracking-wide">Assets Under <br /> Advisory</p>
                            </div>
                            <div className="flex bg-white flex-col items-center justify-center w-40 h-40 md:w-52 md:h-52 rounded-full border-gradient-blue-green shadow-xl p-4">
                                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800">16000+</h3>
                                <p className="text-[10px] md:text-xs text-gray-600 font-semibold text-center mt-1 uppercase tracking-wide">Retail Client <br /> Base</p>
                            </div>
                            <div className="flex bg-white flex-col items-center justify-center w-40 h-40 md:w-52 md:h-52 rounded-full border-gradient-blue-green shadow-xl p-4">
                                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800">80+</h3>
                                <p className="text-[10px] md:text-xs text-gray-600 font-semibold text-center mt-1 uppercase tracking-wide">Cities</p>
                            </div>
                            <div className="flex bg-white flex-col items-center justify-center w-40 h-40 md:w-52 md:h-52 rounded-full border-gradient-blue-green shadow-xl p-4">
                                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800">22+</h3>
                                <p className="text-[10px] md:text-xs text-gray-600 font-semibold text-center mt-1 uppercase tracking-wide">Managers</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    // App Slide Content
                    <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-between text-white animate-in fade-in slide-in-from-right duration-500 w-full px-4 lg:px-0">
                        <div className="text-center lg:w-1/2 lg:text-left lg:pr-12 order-2 lg:order-1">
                            <h2 className="mb-6 text-3xl font-extrabold leading-tight md:text-5xl lg:text-6xl drop-shadow-lg max-w-2xl">
                                Your future won't build itself — start investing with Prodigy Pro today!
                            </h2>
                            <p className="mb-10 text-lg opacity-90 font-medium max-w-xl leading-relaxed">
                                Building investors' trust is one thing, maintaining it is another. We strive for both, and that's why today, we are the biggest mutual fund distributor in the region.
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                                <button className="flex items-center justify-center transition-all hover:scale-105 active:scale-95 group">
                                    <Image src="/Home/Playstore.svg" alt="Google Play" width={160} height={47} className="object-contain" />
                                </button>
                                <button className="flex items-center justify-center transition-all hover:scale-105 active:scale-95 group">
                                    <Image src="/Home/applestore.svg" alt="App Store" width={160} height={47} className="object-contain" />
                                </button>
                            </div>
                        </div>
                        <div className="relative h-[350px] w-full max-w-lg lg:h-[600px] lg:w-1/2 order-1 lg:order-2 flex items-center justify-center lg:justify-end">
                            <div className="relative w-full h-full transform hover:scale-105 transition-transform duration-500">
                                <Image
                                    src="/Home/iPhone16Pro.svg"
                                    alt="Prodigy Pro App Mockup"
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Pagination Dots */}
                <div className="mt-12 flex justify-center gap-3">
                    {slides.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentSlide(idx)}
                            className={`h-3 rounded-full transition-all duration-300 shadow-sm ${idx === currentSlide ? "w-10 bg-white" : "w-3 bg-white/50 hover:bg-white/80"}`}
                            style={{ backgroundColor: activeSlide.type === 'wealth' ? (idx === currentSlide ? '#0056B3' : '#cbd5e1') : (idx === currentSlide ? 'white' : 'rgba(255,255,255,0.4)') }}
                            aria-label={`Go to slide ${idx + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
};


const VideoSection = () => {
    const videos = [
        {
            youtubeUrl: "https://youtu.be/M59P6tNdAvA",
        },
        {
            youtubeUrl: "https://youtu.be/-H9oayFUqVk",

        },
        {
            youtubeUrl: "https://youtu.be/2dmody_8oCc",
            thumbnail: "/Home/VideoSlider/RetirementPlanningWITHSIPSWPStrategy1.svg"
        },
        {
            youtubeUrl: "https://youtu.be/WzhB2sRvr40",
            thumbnail: "/Home/VideoSlider/WhatHappens.svg"
        }
    ];

    return (
        <section
            className="w-full py-16 md:py-24 relative"
            style={{
                backgroundImage: "url('/Home/filter.svg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="container mx-auto px-4 text-center relative z-10">
                <h2 className="mb-2 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">Investment Simplified: <br />Empowering You to Invest Wisely</h2>

                <p className="mx-auto mb-12 max-w-3xl text-gray-600 leading-relaxed font-medium opacity-90">
                    Join the BFC community to learn about investing, saving, and budgeting in the easiest ways possible!
                    Whether you're a seasoned investor or just figuring out your financial journey, dive in for treasured
                    insights and expert advice. Get tips on mutual funds, saving, budgeting, and retirement planning.
                    Take control of your financial future today!
                </p>

                <VideoCarousel videos={videos} autoPlayInterval={4000} />
            </div>
        </section>
    );
};

const AdvantageSection = () => {
    const features = [
        { icon: "/Home/BFCAdvantage/PeriodicPortfolio.svg", title: "Periodic Portfolio Review", desc: "Nothing's a certainty, not even the returns you earn. That's why, twice a year, we give your portfolio a much-needed health checkup and fish out the bad investments." },
        { icon: "/Home/BFCAdvantage/TailorMade.svg", title: "Tailormade Solutions", desc: "The one size fits all approach doesn't usually work in investing. Make informed financial decisions based on the solutions tailored to complement your priorities." },
        { icon: "/Home/BFCAdvantage/AlgoBasedScheme.svg", title: "Algorithm-based Scheme Selection", desc: "Invest in schemes shortlisted by our superior AI-driven algorithm after factoring in mandatory quality, industry parameters, and investor priorities." },
        { icon: "/Home/BFCAdvantage/CompetentWealthManagers.svg", title: "Competent Wealth Managers", desc: "We pick the best of talent from the industry as that's what we want to offer each and every one of our clients - The Best!" },
        { icon: "/Home/BFCAdvantage/regularprofit.svg", title: "Regular Profit Booking", desc: "We don't let market volatility erode our clients' profits - By using internal parameters, we book profits regularly." },
        { icon: "/Home/BFCAdvantage/appWith3S.svg", title: "App with 3 S Benefits", desc: "Buy, Track & Sell Mutual Funds on the go with PRODIGY Pro - BFC's Mobile App with 3 S benefits: Speed | Safety | Simplicity." },
        { icon: "/Home/BFCAdvantage/CapGain.svg", title: "Capital Gain Immunization", desc: "Not all profits are taxable. With access to the right advice and the will to act on it, you can save more on taxes than you initially thought." },
        { icon: "/Home/BFCAdvantage/MarketSavvy.svg", title: "Market Savvy Research Team", desc: "A team that follows the markets with relentless diligence and is alert to every spike and drop in the charts, so you stay ahead of the curve at all times." },
        { icon: "/Home/BFCAdvantage/tacticalCalls.svg", title: "Tactical Calls", desc: "Gain access to the short-term calls our research team offers and maximise your returns by investing in sectors that are likely to attract profits in the near future." },
        { icon: "/Home/BFCAdvantage/ContingencyPlanning.svg", title: "Contingency Planning", desc: "Uncertainty is part of life. Contingency funds help protect your lifestyle during income disruptions and emergencies without compromising long-term goals." },
        { icon: "/Home/BFCAdvantage/360.svg", title: "360° Financial Coverage", desc: "With access to Mutual Funds, Stocks, PMS, AIFs, SIFs, Bonds, and FDs, we ensure your portfolio is structured across suitable products under one framework." },
        { icon: "/Home/BFCAdvantage/RetirementPlanning.svg", title: "Retirement Planning", desc: "BFC helps you assess future income needs, plan cash flows, and build a retirement corpus that supports financial stability and independence post retirement." }
    ];

    return (
        <section className="bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">BFC Advantage</h2>
                    <p className="mt-2 text-gray-600">Invest smart! Give your investments the BFC Advantage</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                    {features.map((feature, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center bg-white border border-[#EBEAEA] rounded-[24px] w-full max-w-[367px] h-[334px] pt-[28px] pb-[28px] px-[32px] text-center transition-all hover:shadow-md group"
                        >
                            <div className="relative h-20 w-20 flex items-center justify-center mb-[20px]">
                                <Image
                                    src={feature.icon}
                                    alt={feature.title}
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-[20px] leading-tight">{feature.title}</h3>
                            <p className="text-[15px] leading-relaxed text-gray-500 font-medium line-clamp-4">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProcessSection = () => {
    return (
        <section className="bg-white pt-16 md:pt-24 pb-8 overflow-hidden">
            <div className="container mx-auto px-4 text-center">
                <h2 className="mb-12 text-3xl font-bold text-gray-800 md:text-4xl text-[#334155]">
                    A Seamless & User-Friendly Investor Experience
                </h2>
                <div className="flex justify-center items-center">
                    <Image
                        src="/Home/seemless.svg"
                        alt="Seamless Investor Experience"
                        width={1592}
                        height={279}
                        className="w-full max-w-7xl h-auto object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

const AppTrustSection = () => {
    return (
        <section className="relative w-full bg-[linear-gradient(to_right,#001EFE_0%,#06A358_35%,#06A358_100%)] py-16 md:py-0 overflow-hidden min-h-[595px] flex items-center">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 relative flex justify-center md:justify-start">
                    <div className="relative w-full max-w-lg md:-mb-24">
                        <Image
                            src="/Home/iPhone17.svg"
                            alt="BFC App Trust"
                            width={1200}
                            height={1200}
                            className="w-full h-auto object-contain drop-shadow-2xl"
                        />
                    </div>
                </div>
                <div className="md:w-1/2 text-white mt-12 md:mt-0 md:pl-12">
                    <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight mb-6">
                        Experience you trust.<br />
                        Technology you deserve.
                    </h2>
                    <p className="text-lg opacity-90 mb-10 max-w-md leading-relaxed">
                        Built on two decades on trusted advice, now reimagined for modern investors.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="#" className="transition-transform hover:scale-105 active:scale-95">
                            <Image
                                src="/Home/Playstore.svg"
                                alt="Get it on Google Play"
                                width={160}
                                height={47}
                                className="w-[160px] h-[47px]"
                            />
                        </Link>
                        <Link href="#" className="transition-transform hover:scale-105 active:scale-95">
                            <Image
                                src="/Home/applestore.svg"
                                alt="Download on the App Store"
                                width={160}
                                height={47}
                                className="w-[160px] h-[47px]"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};



const EventsSection = () => {
    const events = [
        { image: "/Home/QC1.svg", venue: "Lineage", title: "316th Quality Circle Program by BFC Capital for Medical Professionals", date: "January 13, 2026", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum is simply dummy text of the printing and typesetting industry. " },
        { image: "/Home/QC2.svg", venue: "HPCL, Ayodhya", title: `BFC Capital's 314th Quality Circle Program "HUMSAFAR"`, date: "January 13, 2026", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum is simply dummy text of the printing and typesetting industry. " },
        { image: "/Home/QC3.svg", venue: "BSIP, Lucknow", title: "BFC Capital's 312th Quality Circle Program BSIP, Lucknow", date: "January 13, 2026", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard Lorem Ipsum is simply dummy text of the printing and typesetting industry. " }
    ];

    return (
        <section className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-extrabold text-[#334155] md:text-4xl lg:text-5xl uppercase tracking-tight">Quality Circle Programmes</h2>
                    <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto">An honest attempt to educate investors on the Dos and Don'ts of investing.</p>
                </div>
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {events.map((event, idx) => (
                        <div key={idx} className="bg-white overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col h-full">
                            <div className="h-48 w-full bg-gray-200 relative"><img src={event.image} alt={event.title} className="w-full h-full object-cover" /></div>
                            <div className="p-6 flex flex-col flex-1">
                                <p className="text-sm font-semibold text-blue-600 mb-2">Venue: {event.venue}</p>
                                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{event.title}</h3>
                                <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-4">{event.desc}</p>
                                <div className="mt-auto pt-4 border-t border-gray-100 text-xs text-gray-500 font-medium">{event.date}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-12 text-center relative">
                    <button className="px-8 py-3 bg-bfc-green text-white font-semibold rounded-full hover:bg-green-700 transition-colors relative z-10">See All →</button>

                </div>
            </div>
        </section>
    );
};

const Credentials = () => {
    const credentialData = [
        {
            logo: "/Home/image1.svg",
            alt: "SEBI",
            title: "SEBI-RIA:",
            desc: "INA000021669"
        },
        {
            logo: "/Home/AMFI.svg",
            alt: "AMFI",
            title: "AMFI Registered Mutual Fund Distributor:",
            desc: "ARN : 21399, Date of initial Registration : 31-July-2004, Current validity of ARN : 29-July-2026"
        },
        {
            logo: "/Home/BSE.svg",
            alt: "BSE",
            title: "BSE Registered Mutual Fund Distributor",
            desc: "No : 39180"
        },
        {
            logo: "/Home/NSE.svg",
            alt: "NSE",
            title: "NSE Registered Mutual Fund Distributor",
            desc: "No : MFS21399"
        }
    ];

    return (
        <section className="bg-white py-12 relative overflow-hidden">
            <div className="container mx-auto px-4 pt-8">
                <div className="bg-[#CFE4F3] border-2 border-blue-400/30 rounded-none p-10 md:p-14 shadow-sm">
                    <h2 className="text-3xl font-extrabold text-[#334155] text-center mb-16 tracking-tight">Our Credentials!</h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
                        {credentialData.map((item, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center">
                                {/* Logo Container with fixed height for alignment */}
                                <div className="h-28 w-full flex items-center justify-center mb-6">
                                    <Image
                                        src={item.logo}
                                        alt={item.alt}
                                        width={200}
                                        height={80}
                                        className="object-contain max-h-full"
                                    />
                                </div>

                                <div className="flex flex-col flex-1">
                                    {/* Title with min-height to ensure horizontal alignment of descriptions */}
                                    <div className="min-h-[3rem] flex items-center justify-center mb-1">
                                        <p className="text-[12px] font-bold text-slate-700 tracking-wide uppercase leading-tight">
                                            {item.title}
                                        </p>
                                    </div>
                                    <p className="text-[12px] font-semibold text-slate-700 leading-relaxed">
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const SuccessHighlight = () => {
    return (
        <section className="bg-bfc-green py-0 mt-16 md:mt-24">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 py-16 text-white md:pr-12">
                        <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">Over 16,000+ Happy Investors <br /><span className="opacity-90 text-2xl md:text-4xl font-normal">Trust BFC Capital.</span></h2>
                        <div className="flex items-center gap-2 mb-8"><div className="flex">{[1, 2, 3, 4, 5].map(i => (<span key={i} className="text-yellow-400 text-2xl">★</span>))}</div><span className="font-semibold text-lg">4.9/5 Rating</span></div>
                        <p className="opacity-90 text-lg leading-relaxed mb-8 max-w-xl">"Investing with BFC Capital has been a game changer. Their tailored advice and transparent approach gave me the confidence to plan for my retirement."</p>
                        <button className="bg-white text-bfc-green px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">Join our Family</button>
                    </div>
                    <div className="md:w-1/2 relative h-[400px] md:h-[500px] w-full flex justify-center md:justify-end items-end overflow-hidden md:overflow-visible">
                        <div className="relative h-full w-full max-w-md">
                            <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1000&auto=format&fit=crop" alt="Happy Investor" className="object-cover h-full w-full rounded-t-full border-4 border-white/20 shadow-2xl" />
                            <div className="absolute bottom-10 -left-6 bg-white p-4 rounded-xl shadow-lg hidden md:block"><p className="font-bold text-gray-800 text-lg">₹ 1 Cr+</p><p className="text-xs text-gray-500">Portfolio Managed</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Team = () => {
    const teamMembers = [
        { name: "Deepti Bansal", role: "Associate Partner", img: "/Home/Team/DeeptiBansal.svg" },
        { name: "Akash Gupta", role: "AVP- Research & Analysis", img: "/Home/Team/AkashGupta.svg" },
        { name: "Kavya Mehrotra", role: "Manager- Research & Analysis", img: "/Home/Team/kavya.svg" },
        { name: "Sparsh Awasthi", role: "Sr. Wealth Manager", img: "/Home/Team/sparsh.svg" },
        { name: "Naini Rastogi", role: "Wealth Manager", img: "/Home/Team/nainee 1.svg" },
        { name: "Ayush Mishra", role: "Wealth Manager", img: "/Home/Team/ayush.svg" },
        { name: "Shashank Awasthi", role: "Wealth Manager", img: "/Home/Team/shashank.svg" },
        { name: "Shubham Dubey", role: "Wealth Manager", img: "/Home/Team/shubham.svg" },
        { name: "Shivangi Yadav", role: "Wealth Manager", img: "/Home/Team/shivangi.svg" },
        { name: "Sandeep Yadav", role: "Relationship Manager", img: "/Home/Team/sandeep.svg" },
    ];
    return (
        <section className="bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-24">
                    <h2 className="text-4xl font-extrabold text-[#334155] mb-4">Meet the Team</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto font-medium leading-relaxed">
                        Money matters are serious business. Don't take them lightly. Reach out to our
                        experts and make informed financial decisions.
                    </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-20">
                    {teamMembers.map((member, idx) => (
                        <div
                            key={idx}
                            className={`flex flex-col items-center group text-center transition-all duration-500 ${idx % 2 === 1 ? 'lg:mt-12' : 'lg:mt-0'
                                }`}
                        >
                            <div className="relative aspect-[3/4] w-full mb-6 overflow-hidden rounded-none shadow-sm transition-all duration-300 group-hover:shadow-lg">
                                <Image
                                    src={member.img}
                                    alt={member.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <h3 className="font-bold text-[#334155] text-lg leading-tight mb-1">{member.name}</h3>
                            <p className="text-[14px] text-gray-500 font-medium">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "What is financial planning and why do I need it?",
            answer: (
                <div className="space-y-4 text-gray-500 leading-relaxed font-medium">
                    <p>
                        Think of financial planning as creating a roadmap for your money, its almost like planning a road trip. You wouldn't just hop in a car and drive without knowing where you're going, right? Financial planning works the same way. It's about knowing your goals, understanding your income and expenses, and figuring out the best path to reach those goals.
                    </p>
                    <p>
                        And so as for why do you need it? Well, life is full of surprises—some welcome, some... not so much. Financial planning helps you save for the things that truly matter in the long run— whether it's buying a house, sending your kids to college, or enjoying a worry-free retirement.
                    </p>
                </div>
            )
        },
        {
            question: "How does financial planning help achieve life goals?",
            answer: (
                <div className="text-gray-500 leading-relaxed font-medium">
                    <p>
                        Financial planning turns your goals into clear and structured action plans. By managing your income, savings, and investments wisely, it helps you stay on track and make your dreams— like buying a home, traveling, or retiring comfortably— a beautiful reality.
                    </p>
                </div>
            )
        },
        {
            question: "How does a financial advisor help in financial planning?",
            answer: (
                <div className="space-y-4 text-gray-500 leading-relaxed font-medium">
                    <p>
                        Think of a financial advisor as your personal guide to everything money! They help you plan, invest, save, budget, and map your money based on your risk profile ( the amount of risk you are willing to take) and time horizon ( the tenure for which you would want to stay invested to achieve your goals) with certified expertise up their sleeves.
                    </p>
                    <p>
                        At BFC CAPITAL, a SEBI Registered Investment Advisor (RIA), we help you do all of that with trusted, regulated advice to make sure your financial journey stays on the track that you have envisioned.
                    </p>
                </div>
            )
        },
        {
            question: "Are mutual funds safe for long-term wealth creation?",
            answer: (
                <div className="space-y-4 text-gray-500 leading-relaxed font-medium">

                    <p>
                        Absolutely yes! In fact mutual funds are one of the most effective tools for long-term wealth creation when you stay invested with discipline. They help you benefit from compounding, professional fund management, and diversification– making them the suitable choice for long term wealth creation.
                    </p>
                </div>
            )
        }
    ];

    return (
        <section className="bg-white py-20 pb-24">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-16 px-4">
                    <h2 className="text-4xl font-extrabold text-[#334155] mb-4">Frequently Asked Questions</h2>
                    <p className="text-gray-500 font-medium">Questions on your mind? Don't worry we have the answers!</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border-b border-gray-100 last:border-0"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full py-6 flex items-center justify-between text-left group transition-all"
                            >
                                <span className={`text-xl md:text-2xl font-bold transition-colors tracking-tight ${openIndex === index ? 'text-[#334155]' : 'text-[#334155]/80 group-hover:text-[#334155]'}`}>
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-6 h-6 text-gray-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}
                                />
                            </button>
                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                {faq.answer}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};


const ComplaintsTable = () => {
    const [showCharter, setShowCharter] = useState(false);
    const data = [
        { sr: 1, from: "Directly from Investors", lastMonth: 0, received: 0, resolved: 0, totalPending: 0, pending3Months: 0, avgTime: "NA" },
        { sr: 2, from: "SEBI (SCORES)", lastMonth: 0, received: 0, resolved: 0, totalPending: 0, pending3Months: 0, avgTime: "NA" },
        { sr: 3, from: "Other Sources (if any)", lastMonth: 0, received: 0, resolved: 0, totalPending: 0, pending3Months: 0, avgTime: "NA" },
    ];

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16 px-4">
                    <h2 className="text-4xl font-extrabold text-[#334155] tracking-tight">Number of Complaints as per SEBI Guidelines</h2>
                </div>

                <div className="max-w-6xl mx-auto overflow-x-auto shadow-sm border border-gray-100 rounded-[16px]">
                    <table className="w-full text-center border-collapse">
                        <thead>
                            <tr
                                className="text-[#334155] border-b-[1.5px] border-[#ABC3D7] border-opacity-[0.37]"
                                style={{ background: 'linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)' }}
                            >
                                <th className="py-[10px] px-[12px] text-[12px] font-extrabold uppercase tracking-tight text-left whitespace-nowrap">Sr.No.</th>
                                <th className="py-[10px] px-[12px] text-[12px] font-extrabold uppercase tracking-tight text-left whitespace-nowrap">Received from</th>
                                <th className="py-[10px] px-[12px] text-[12px] font-extrabold uppercase tracking-tight">Pending at the end<br />of last month</th>
                                <th className="py-[10px] px-[12px] text-[12px] font-extrabold uppercase tracking-tight">Received</th>
                                <th className="py-[10px] px-[12px] text-[12px] font-extrabold uppercase tracking-tight">Resolved*</th>
                                <th className="py-[10px] px-[12px] text-[12px] font-extrabold uppercase tracking-tight">Total Pending#</th>
                                <th className="py-[10px] px-[12px] text-[12px] font-extrabold uppercase tracking-tight">Pending complaints<br />{'>'} 3months</th>
                                <th className="py-[10px] px-[12px] text-[12px] font-extrabold uppercase tracking-tight">Average Resolution<br />time^ (in days)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50 text-[#334155]">
                            {data.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-[12px] px-[12px] text-sm font-bold text-left">{row.sr}</td>
                                    <td className="py-[12px] px-[12px] text-sm font-semibold text-left text-gray-700 whitespace-nowrap">{row.from}</td>
                                    <td className="py-[12px] px-[12px] text-sm font-bold">{row.lastMonth}</td>
                                    <td className="py-[12px] px-[12px] text-sm font-bold">{row.received}</td>
                                    <td className="py-[12px] px-[12px] text-sm font-bold">{row.resolved}</td>
                                    <td className="py-[12px] px-[12px] text-sm font-bold">{row.totalPending}</td>
                                    <td className="py-[12px] px-[12px] text-sm font-bold">{row.pending3Months}</td>
                                    <td className="py-[12px] px-[12px] text-sm font-bold text-gray-500">{row.avgTime}</td>
                                </tr>
                            ))}
                            <tr
                                className="font-extrabold border-t border-gray-100"
                                style={{ background: 'linear-gradient(270deg, rgba(207, 228, 243, 0.5) 0%, rgba(250, 250, 250, 0.5) 63.46%)' }}
                            >
                                <td className="py-[10px] px-[12px] text-[13px]"></td>
                                <td className="py-[10px] px-[12px] text-[13px] text-left uppercase tracking-tight">Grand Total</td>
                                <td className="py-[10px] px-[12px] text-[13px]">0</td>
                                <td className="py-[10px] px-[12px] text-[13px]">0</td>
                                <td className="py-[10px] px-[12px] text-[13px]">0</td>
                                <td className="py-[10px] px-[12px] text-[13px]">0</td>
                                <td className="py-[10px] px-[12px] text-[13px]">0</td>
                                <td className="py-[10px] px-[12px] text-[13px] text-gray-500 font-bold uppercase">NA</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="max-w-6xl mx-auto mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-4">
                    <p className="text-[13px] text-gray-500 max-w-2xl leading-relaxed italic font-medium">
                        ^ Average Resolution time is the sum total of time taken to resolve each complaint in days, in the current month divided by total number of complaints resolved in the current month.
                    </p>
                    <button
                        onClick={() => setShowCharter(!showCharter)}
                        className="bg-bfc-green text-white px-10 py-3 rounded-full font-bold hover:bg-green-700 transition-all shadow-md active:scale-95 whitespace-nowrap"
                    >
                        {showCharter ? 'View Less' : 'View More'}
                    </button>
                </div>

                {/* Investor Charter Section */}
                <div className={`transition-all duration-700 overflow-hidden ${showCharter ? 'max-h-[1000px] opacity-100 mt-24 mb-12' : 'max-h-0 opacity-0'}`}>
                    <div className="text-center mb-16 relative">
                        <h2
                            className="text-5xl font-extrabold inline-block pb-1 bg-clip-text text-transparent"
                            style={{ backgroundImage: 'linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)' }}
                        >
                            Investor Charter
                        </h2>
                        <div
                            className="w-64 h-1.5 mx-auto rounded-full mt-1"
                            style={{ background: 'linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)' }}
                        ></div>
                    </div>

                    <div className="max-w-6xl mx-auto overflow-x-auto shadow-sm border border-gray-100 rounded-[16px]">
                        <table className="w-full text-center border-collapse">
                            <thead>
                                <tr
                                    className="text-[#334155] border-b-[1.5px] border-[#ABC3D7] border-opacity-[0.37]"
                                    style={{ background: 'linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)' }}
                                >
                                    <th className="py-[10px] px-[12px] text-[13px] font-extrabold uppercase tracking-tight">Sr.No.</th>
                                    <th className="py-[10px] px-[12px] text-[13px] font-extrabold uppercase tracking-tight text-left">Financial Year</th>
                                    <th className="py-[10px] px-[12px] text-[13px] font-extrabold uppercase tracking-tight">Compliance Audit Status</th>
                                    <th className="py-[10px] px-[12px] text-[13px] font-extrabold uppercase tracking-tight text-left">Remarks, If any</th>
                                </tr>
                            </thead>
                            <tbody className="text-[#334155]">
                                <tr className="bg-white">
                                    <td className="py-[12px] px-[12px] text-sm font-bold">1</td>
                                    <td className="py-[12px] px-[12px] text-sm font-bold">FY 2025-26</td>
                                    <td className="py-[12px] px-[12px] text-sm font-bold">N/A</td>
                                    <td className="py-[12px] px-[12px] text-sm"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- Main Container ---

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
                <HeroSection />
                <VideoSection />
                <AdvantageSection />
                <ProcessSection />
                <AppTrustSection />

                <EventsSection />
                <Credentials />

                <SuccessHighlight />
                <Team />
                <FAQSection />
                <div className="bg-gray-50 pb-16">
                    <ComplaintsTable />

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
