"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Play,
    FileText, Lightbulb, Grid, UserCheck, TrendingUp, Smartphone, TrendingDown, Users, BarChart3, ShieldAlert, BadgeIndianRupee, RockingChair,
    UserPlus, Banknote, Search, PieChart, BarChart
} from 'lucide-react';

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";

// --- Sub-Components ---

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            type: 'wealth',
            image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
            title: "Crafting Wealth, Curating Portfolios –",
            highlight: "20+ Years of Excellence."
        },

        {
            type: 'app',
            image: null,
            title: "Prodigy Pro",
            highlight: "Start Investing Today"
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
            className={`relative w-full overflow-hidden transition-all duration-700 min-h-[650px] flex items-center ${activeSlide.type === 'app' ? 'bg-gradient-to-r from-teal-600 to-green-500' : 'bg-gradient-to-b from-blue-50 to-white'}`}
        >
            {/* Background Images for Wealth Slides */}
            {slides.map((slide, index) => slide.type === 'wealth' && (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-10 pointer-events-none" : "opacity-0"}`}
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
                        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl text-bfc-blue">
                            {activeSlide.title} <br className="hidden md:block" />
                            <span className="text-bfc-green">{activeSlide.highlight}</span>
                        </h1>

                        {/* Stats Circles */}
                        <div className="mt-16 flex flex-wrap justify-center gap-6 md:gap-12">
                            <div className="flex bg-white flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full border-[6px] border-bfc-green/20 hover:border-bfc-green transition-colors shadow-lg p-4">
                                <span className="text-3xl font-bold text-gray-800">SEBI</span>
                                <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">Registered</p>
                                <p className="text-xs text-gray-600 font-medium text-center">RIA : INA000021669</p>
                            </div>
                            <div className="flex bg-white flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full border-[6px] border-bfc-green/20 hover:border-bfc-green transition-colors shadow-lg p-4">
                                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800">1000+ <span className="text-lg">Cr.</span></h3>
                                <p className="text-xs md:text-sm text-gray-600 font-medium text-center mt-1">Assets Under Advisory</p>
                            </div>
                            <div className="flex bg-white flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full border-[6px] border-bfc-green/20 hover:border-bfc-green transition-colors shadow-lg p-4">
                                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800">16000+</h3>
                                <p className="text-xs md:text-sm text-gray-600 font-medium text-center mt-1">Retail Client Base</p>
                            </div>
                            <div className="flex bg-white flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full border-[6px] border-bfc-blue/20 hover:border-bfc-blue transition-colors shadow-lg p-4">
                                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800">80+</h3>
                                <p className="text-xs md:text-sm text-gray-600 font-medium text-center mt-1">Cities</p>
                            </div>
                            <div className="flex bg-white flex-col items-center justify-center w-40 h-40 md:w-48 md:h-48 rounded-full border-[6px] border-bfc-blue/20 hover:border-bfc-blue transition-colors shadow-lg p-4">
                                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800">22+</h3>
                                <p className="text-xs md:text-sm text-gray-600 font-medium text-center mt-1">Managers</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    // App Slide Content
                    <div className="flex flex-col items-center gap-12 lg:flex-row lg:justify-between text-white animate-in fade-in slide-in-from-right duration-500">
                        <div className="relative h-[400px] w-full max-w-md lg:h-[500px] lg:w-1/2 order-2 lg:order-1">
                            <div className="absolute left-0 top-10 h-full w-3/4 -rotate-6 transform overflow-hidden rounded-[2rem] border-8 border-gray-800 bg-white shadow-2xl z-10 transition-transform hover:rotate-0 hover:scale-105 duration-300">
                                <img src="https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=1000&auto=format&fit=crop" alt="App Screen 1" className="h-full w-full object-cover" />
                            </div>
                            <div className="absolute right-0 top-0 h-full w-3/4 rotate-12 transform overflow-hidden rounded-[2rem] border-8 border-gray-800 bg-gray-100 shadow-xl opacity-90 transition-transform hover:rotate-6 hover:scale-105 duration-300">
                                <img src="https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1000&auto=format&fit=crop" alt="App Screen 2" className="h-full w-full object-cover" />
                            </div>
                        </div>
                        <div className="text-center lg:w-1/2 lg:text-left lg:pl-12 order-1 lg:order-2">
                            <h2 className="mb-6 text-3xl font-bold leading-tight md:text-5xl drop-shadow-md">Your future won't build itself — start investing with Prodigy Pro today!</h2>
                            <p className="mb-10 text-lg opacity-95 font-medium">Building investors' trust is one thing, maintaining it is another. We strive for both, and that's why today, we are the biggest mutual fund distributor in the region.</p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                                <button className="flex items-center gap-3 rounded-lg bg-black/20 px-4 py-2 hover:bg-black/30 transition-colors border border-white/30 backdrop-blur-sm">
                                    <div className="text-left"><p className="text-[10px] uppercase font-semibold">Get it on</p><p className="text-xl font-bold leading-none">Google Play</p></div>
                                </button>
                                <button className="flex items-center gap-3 rounded-lg bg-black/20 px-4 py-2 hover:bg-black/30 transition-colors border border-white/30 backdrop-blur-sm">
                                    <div className="text-left"><p className="text-[10px] uppercase font-semibold">Download on the</p><p className="text-xl font-bold leading-none">App Store</p></div>
                                </button>
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
    return (
        <section className="w-full bg-white py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
                <h2 className="mb-2 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">Investment Simplified:</h2>
                <h2 className="mb-6 text-3xl font-bold text-gray-700 md:text-4xl lg:text-5xl opacity-80">Empowering You to Invest Wisely</h2>
                <p className="mx-auto mb-12 max-w-3xl text-gray-600 leading-relaxed">
                    Join the BFC community to learn about investing, saving, and budgeting in the easiest ways possible!
                    Whether you're a seasoned investor or just figuring out your financial journey, dive in for treasured
                    insights and expert advice. Get tips on mutual funds, saving, budgeting, and retirement planning.
                    Take control of your financial future today!
                </p>
                <div className="relative mx-auto max-w-4xl overflow-hidden rounded-xl bg-gray-900 shadow-2xl aspect-video group cursor-pointer">
                    <div className="absolute inset-0 bg-cover bg-center opacity-80 group-hover:opacity-60 transition-opacity" style={{ backgroundImage: "url('https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg')" }}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-transform group-hover:scale-110">
                            <Play fill="currentColor" className="ml-1 h-8 w-8" />
                        </div>
                    </div>
                    <div className="absolute bottom-8 left-0 right-0 text-center">
                        <h3 className="text-white font-bold text-2xl drop-shadow-md">INDIA @ GROWTH MODE</h3>
                    </div>
                </div>
            </div>
        </section>
    );
};

const AdvantageSection = () => {
    const features = [
        { icon: <FileText className="h-8 w-8 text-bfc-blue" />, title: "Periodic Portfolio Review", desc: "Nothing's a certainty, not even the returns you earn. That's why, twice a year, we give your portfolio a much-needed health checkup and fish out the bad investments." },
        { icon: <Lightbulb className="h-8 w-8 text-bfc-green" />, title: "Tailormade Solutions", desc: "The one size fits all approach doesn't usually work in investing. Make informed financial decisions based on the solutions tailored to complement your priorities." },
        { icon: <Grid className="h-8 w-8 text-bfc-blue" />, title: "Algorithm-based Scheme Selection", desc: "Invest in schemes shortlisted by our superior AI-driven algorithm after factoring in mandatory quality, industry parameters, and investor priorities." },
        { icon: <UserCheck className="h-8 w-8 text-bfc-green" />, title: "Competent Wealth Managers", desc: "We pick the best of talent from the industry as that's what we want to offer each and every one of our clients - The Best!" },
        { icon: <TrendingUp className="h-8 w-8 text-bfc-blue" />, title: "Regular Profit Booking", desc: "We don't let market volatility erode our clients' profits - By using internal parameters, we book profits regularly." },
        { icon: <Smartphone className="h-8 w-8 text-bfc-green" />, title: "App with 3 S Benefits", desc: "Buy, Track & Sell Mutual Funds on the go with PRODIGY Pro - BFC's Mobile App with 3 S benefits: Speed | Safety | Simplicity." },
        { icon: <TrendingDown className="h-8 w-8 text-bfc-blue" />, title: "Capital Gain Immunization", desc: "Not all profits are taxable. With access to the right advice and the will to act on it, you can save more on taxes than you initially thought." },
        { icon: <Users className="h-8 w-8 text-bfc-green" />, title: "Market Savvy Research Team", desc: "A team that follows the markets with relentless diligence and is alert to every spike and drop in the charts, so you stay ahead of the curve at all times." },
        { icon: <BarChart3 className="h-8 w-8 text-bfc-blue" />, title: "Tactical Calls", desc: "Gain access to the short-term calls our research team offers and maximise your returns by investing in sectors that are likely to attract profits in the near future." },
        { icon: <ShieldAlert className="h-8 w-8 text-bfc-green" />, title: "Contingency Planning", desc: "Uncertainty is part of life. Contingency funds help protect your lifestyle during income disruptions and emergencies without compromising long-term goals." },
        { icon: <BadgeIndianRupee className="h-8 w-8 text-bfc-blue" />, title: "360° Financial Coverage", desc: "With access to Mutual Funds, Stocks, PMS, AIFs, SIFs, Bonds, and FDs, we ensure your portfolio is structured across suitable products under one framework." },
        { icon: <RockingChair className="h-8 w-8 text-bfc-green" />, title: "Retirement Planning", desc: "BFC helps you assess future income needs, plan cash flows, and build a retirement corpus that supports financial stability and independence post retirement." }
    ];

    return (
        <section className="bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">BFC Advantage</h2>
                    <p className="mt-2 text-gray-600">Invest smart! Give your investments the BFC Advantage</p>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, idx) => (
                        <div key={idx} className="group flex flex-col items-center rounded-2xl bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-1 hover:shadow-md border border-gray-100">
                            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 group-hover:bg-blue-100 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="mb-3 text-lg font-bold text-gray-800">{feature.title}</h3>
                            <p className="text-sm leading-relaxed text-gray-600">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const ProcessSection = () => {
    return (
        <section className="bg-white py-20 overflow-hidden">
            <div className="container mx-auto px-4">
                <h2 className="mb-20 text-center text-3xl font-bold text-gray-800 md:text-4xl text-bfc-blue">
                    A Seamless & User-Friendly Investor Experience
                </h2>
                <div className="relative text-center hidden lg:block h-64">
                    <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 z-0">
                        <svg viewBox="0 0 1200 120" fill="none" preserveAspectRatio="none" className="w-full h-32">
                            <path d="M0,60 C300,150 300,-30 600,60 S900,150 1200,60" stroke="url(#gradient)" strokeWidth="8" fill="none" />
                            <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#0056B3" />
                                    <stop offset="100%" stopColor="#00A65A" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    <div className="absolute left-[5%] top-[10%] z-10 flex flex-col items-center">
                        <h3 className="mb-2 text-lg font-bold text-bfc-blue w-40">Create Investment Account</h3>
                        <div className="h-4 w-4 rounded-full bg-blue-600 ring-4 ring-white"></div>
                        <UserPlus className="mt-4 h-8 w-8 text-blue-600" />
                    </div>
                    <div className="absolute left-[28%] bottom-[10%] z-10 flex flex-col-reverse items-center">
                        <h3 className="mt-2 text-lg font-bold text-bfc-blue w-32">Select Scheme</h3>
                        <div className="h-4 w-4 rounded-full bg-bfc-green ring-4 ring-white"></div>
                        <UserPlus className="mb-4 h-8 w-8 text-bfc-green" />
                    </div>
                    <div className="absolute left-[50%] top-[40%] z-10 flex flex-col items-center">
                        <h3 className="mb-2 text-lg font-bold text-bfc-blue">Invest</h3>
                        <div className="h-4 w-4 rounded-full bg-blue-600 ring-4 ring-white"></div>
                        <Banknote className="mt-4 h-8 w-8 text-blue-600" />
                    </div>
                    <div className="absolute right-[28%] bottom-[10%] z-10 flex flex-col-reverse items-center">
                        <h3 className="mt-2 text-lg font-bold text-bfc-blue w-32">Monitor Portfolio</h3>
                        <div className="h-4 w-4 rounded-full bg-bfc-green ring-4 ring-white"></div>
                        <PieChart className="mb-4 h-8 w-8 text-bfc-green" />
                    </div>
                    <div className="absolute right-[5%] top-[10%] z-10 flex flex-col items-center">
                        <h3 className="mb-2 text-lg font-bold text-bfc-blue w-32">Review Portfolio</h3>
                        <div className="h-4 w-4 rounded-full bg-blue-600 ring-4 ring-white"></div>
                        <BarChart className="mt-4 h-8 w-8 text-blue-600" />
                    </div>
                </div>
                <div className="lg:hidden flex flex-col gap-8 max-w-sm mx-auto">
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">1</div>
                        <span className="font-bold text-gray-800">Create Investment Account</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">2</div>
                        <span className="font-bold text-gray-800">Select Scheme</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">3</div>
                        <span className="font-bold text-gray-800">Invest</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">4</div>
                        <span className="font-bold text-gray-800">Monitor Portfolio</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">5</div>
                        <span className="font-bold text-gray-800">Review Portfolio</span>
                    </div>
                </div>
            </div>
        </section>
    );
};



const EventsSection = () => {
    const events = [
        { image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop", venue: "Lineage", title: "316th Quality Circle Program by BFC Capital for Medical Professionals", date: "January 13, 2026", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard." },
        { image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=1000&auto=format&fit=crop", venue: "HPCL, Ayodhya", title: "BFC Capital's 314th Quality Circle Program \"HUMSAFAR\"", date: "January 13, 2026", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry." },
        { image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=1000&auto=format&fit=crop", venue: "BSIP, Lucknow", title: "BFC Capital's 312th Quality Circle Program BSIP, Lucknow", date: "January 13, 2026", desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard." }
    ];

    return (
        <section className="bg-gray-50 py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-800 md:text-4xl text-bfc-blue">Quality Circle Programmes</h2>
                    <p className="mt-2 text-gray-600">An honest attempt to educate investors on the Dos and Don'ts of investing.</p>
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
                <div className="mt-12 text-center"><button className="px-8 py-3 bg-bfc-green text-white font-semibold rounded-full hover:bg-green-700 transition-colors">See All →</button></div>
            </div>
        </section>
    );
};

const Partners = () => {
    return (
        <section className="bg-white py-10 border-t border-b border-gray-100">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-80 grayscale transition-all hover:grayscale-0">
                    <div className="flex flex-col items-center gap-2"><div className="text-4xl font-extrabold text-blue-900 tracking-tighter">SEBI</div><span className="text-[10px] font-bold text-gray-500">REGISTERED</span></div>
                    <div className="flex items-center gap-2"><div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xs">AMFI</div><div className="text-xl font-bold text-gray-700">AMFI</div></div>
                    <div className="text-3xl font-bold text-blue-600">BSE</div>
                    <div className="flex items-center gap-2"><div className="h-10 w-10 relative"><div className="absolute inset-0 border-4 border-orange-500 rounded-full"></div></div><div className="text-2xl font-bold text-gray-800">NSE</div></div>
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
        { name: "Anjali Gupta", role: "Wealth Manager", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop" },
        { name: "Rahul Sharma", role: "Sr. Research Analyst", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop" },
        { name: "Priya Singh", role: "Investment Advisor", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
        { name: "Amit Patel", role: "Portfolio Manager", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" },
        { name: "Sneha Reddy", role: "Client Relations", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop" },
    ];
    return (
        <section className="bg-white py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">Our Wealth Partners</h2>
                    <p className="mt-2 text-gray-600 max-w-2xl mx-auto">Experienced professionals dedicated to growing your wealth with integrity and expertise.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-8">
                    {teamMembers.map((member, idx) => (
                        <div key={idx} className="flex flex-col items-center group w-40 md:w-48 text-center">
                            <div className="h-40 w-40 md:h-48 md:w-48 rounded-lg overflow-hidden mb-4 shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                                <img src={member.img} alt={member.name} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <h3 className="font-bold text-gray-800">{member.name}</h3>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">{member.role}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Insights = () => {
    const insights = [
        { title: "Market Outlook 2026: What to Expect?", date: "Jan 24, 2026", category: "Market" },
        { title: "Why SIPs are your best bet against volatility", date: "Jan 20, 2026", category: "Education" },
        { title: "Understanding Tax Implications on Mutual Funds", date: "Jan 15, 2026", category: "Taxation" },
        { title: "BFC Capital wins Best Advisor Award", date: "Jan 10, 2026", category: "News" },
    ];
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Financial Insights</h2>
                    <a href="#" className="text-bfc-green font-semibold hover:underline">View All</a>
                </div>
                <div className="space-y-4">
                    {insights.map((item, idx) => (
                        <div key={idx} className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow flex justify-between items-center border-l-4 border-bfc-blue">
                            <div>
                                <p className="text-xs font-bold text-bfc-green mb-1 uppercase tracking-wide">{item.category}</p>
                                <h3 className="text-lg font-semibold text-gray-800 hover:text-bfc-blue cursor-pointer">{item.title}</h3>
                            </div>
                            <div className="text-sm text-gray-400 whitespace-nowrap ml-4">{item.date}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const NFOTable = () => {
    const nfos = [
        { name: "SBI Energy Opportunities Fund", type: "Equity", open: "Jan 12", close: "Jan 25" },
        { name: "HDFC Manufacturing Fund", type: "Equity", open: "Jan 15", close: "Jan 29" },
        { name: "Kotak Special Opportunities Fund", type: "Thematic", open: "Jan 18", close: "Feb 01" },
    ];
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-5xl">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800">New Fund Offers (NFO)</h2>
                    <p className="text-gray-500 mt-2">Open for subscription now</p>
                </div>
                <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-100">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="p-4 font-semibold">Scheme Name</th>
                                <th className="p-4 font-semibold">Category</th>
                                <th className="p-4 font-semibold">Open Date</th>
                                <th className="p-4 font-semibold">Close Date</th>
                                <th className="p-4 font-semibold text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                            {nfos.map((nfo, idx) => (
                                <tr key={idx} className="hover:bg-blue-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-800">{nfo.name}</td>
                                    <td className="p-4 text-gray-600 px-2 py-1"><span className="bg-gray-100 px-2 py-1 rounded text-xs border border-gray-200">{nfo.type}</span></td>
                                    <td className="p-4 text-gray-600">{nfo.open}</td>
                                    <td className="p-4 text-gray-600">{nfo.close}</td>
                                    <td className="p-4 text-center">
                                        <button className="px-4 py-1.5 bg-bfc-green text-white text-sm font-bold rounded shadow hover:bg-green-700 transition-colors">Invest Now</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-center mt-6"><a href="#" className="text-bfc-blue font-semibold hover:underline">View All NFOs →</a></div>
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

                <EventsSection />
                <Partners />
                <SuccessHighlight />
                <Team />
                <div className="bg-gray-50 pb-16">
                    <NFOTable />
                    <Insights />
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
