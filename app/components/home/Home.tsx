"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
} from "lucide-react";

import Navbar from "../layout/Navbar";
import Footer from "../layout/Footer";
import VideoCarousel from "../common/VideoCarousel";
import { useSwipeable } from "react-swipeable";
import axios from "axios";

// --- Sub-Components ---

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const changeSlide = (direction: "next" | "prev") => {
    setIsFading(true);

    setTimeout(() => {
      setCurrentSlide((prev) => {
        if (direction === "next") return (prev + 1) % slides.length;
        return prev === 0 ? slides.length - 1 : prev - 1;
      });
      setIsFading(false);
    }, 900); // 👈 fade-out duration
  };

  const nextSlide = () => changeSlide("next");
  const prevSlide = () => changeSlide("prev");

  const swipeHandlers = useSwipeable({
    onSwipedLeft: nextSlide, // 👉 left swipe
    onSwipedRight: prevSlide, // 👈 right swipe
    trackTouch: true,
    trackMouse: false,
    preventScrollOnSwipe: true,
  });

  const slides = [
    {
      type: "wealth",
      image: "/Home/BFC-YTThumbnail.webp",
      title: "Crafting Wealth, Curating Portfolios –",
      highlight: "20+ Years of Excellence.",
    },

    {
      type: "app",
      image: "/Home/iPhone16Pro.svg",
      title:
        "Your future won't build itself — start investing with Prodigy Pro today!",
      highlight: "",
    },
  ];

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      changeSlide("next");
    }, 6000);

    return () => clearInterval(timer);
  }, [isPaused]);

  const activeSlide = slides[currentSlide];

  return (
    <section
      {...swipeHandlers}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      className={`relative w-full overflow-hidden transition-all duration-1200 ease-in-out md:min-h-[600px] flex items-center ${activeSlide.type === "app" ? " bg-[linear-gradient(269.9deg,#06A358_24.53%,#001EFE_156.82%)] via-bfc-blue to-bfc-green" : "bg-gradient-to-b from-blue-50 to-white"}`}
      aria-label="Welcome banner slideshow"
    >
      {/* Background Images for Wealth Slides */}
      {/* Background Images for Wealth Slides */}
      {slides.map(
        (slide, index) =>
          slide.type === "wealth" && (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out pointer-events-none
        ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
              role="img"
              aria-label={slide.title + " " + slide.highlight}
            >
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${slide.image}')` }}
              />
            </div>
          ),
      )}

      <div
        aria-live="polite"
        className={`container relative mx-auto px-4  pb-12 pt-5 md:pt-10 xl:pt-0
  transition-opacity duration-[1200ms] ease-in-out
  ${isFading ? "opacity-0" : "opacity-100"}`}
      >
        {activeSlide.type === "wealth" ? (
          <div className=" text-center" role="group" aria-roledescription="slide" aria-label={`Slide 1 of 2: ${activeSlide.title} ${activeSlide.highlight}`}>
            <h1 className="mx-auto max-w-[350px] md:max-w-5xl font-extrabold leading-tight tracking-tight text-[20px] md:text-3xl lg:text-5xl bg-[linear-gradient(to_right,#024B39_42%,#011EFE_85%)] bg-clip-text text-transparent pb-2 font-inter">
              {activeSlide.title} <br className="hidden md:block" />
              {activeSlide.highlight}
            </h1>

            {/* Stats Circles */}
            <div className="mt-5 md:mt-10 xl:mt-15 flex flex-wrap justify-center gap-4 md:gap-10 xl:gap-15" aria-label="BFC Capital key metrics">
              <div className="flex  flex-col items-center justify-center w-25 h-25 font-inter md:w-40 md:h-40 rounded-full border-gradient-blue-green shadow-xl p-1" aria-label="Sebi Registered Investment Advisor registration number INA000021669">
                <h2 className="text-[14px] md:text-2xl font-extrabold text-[#44475B] font-inter">
                  <span aria-label="Sebi">SEBI</span>
                </h2>
                <p className="text-[7px] md:text-[12px] text-gray-600 font-semibold text-center mt-1 font-inter tracking-wide">
                  RIA : <br />INA000021669
                </p>
              </div>
              <div className="flex  flex-col items-center justify-center w-25 h-25 font-inter md:w-40 md:h-40 rounded-full border-gradient-blue-green shadow-xl p-1" aria-label="Assets Under Management: 1000+ Crores">
                <h2 className="text-[14px] md:text-2xl font-extrabold text-[#44475B] font-inter">
                  1000+ Cr.
                </h2>
                <p className="text-[7px] md:text-[12px] text-gray-600 font-semibold text-center mt-1 font-inter tracking-wide">
                  Assets Under <br /> Management
                </p>
              </div>
              <div className="flex  flex-col items-center justify-center w-25 h-25 md:w-40 md:h-40 rounded-full font-inter border-gradient-blue-green shadow-xl p-1" aria-label="Retail Client Base: 16000+">
                <h2 className="text-[14px] md:text-2xl font-extrabold text-[#44475B] font-inter">
                  16000+
                </h2>
                <p className="text-[7px] md:text-[12px]  text-gray-600 font-semibold text-center font-inter mt-1 uppercase tracking-wide">
                  Retail Client <br /> Base
                </p>
              </div>
              <div className="flex  flex-col items-center justify-center font-inter w-25 h-25 md:w-40 md:h-40 rounded-full border-gradient-blue-green shadow-xl p-1" aria-label="Presence in 80+ Cities">
                <h2 className="text-[14px] md:text-2xl font-extrabold text-[#44475B] font-inter">
                  80+
                </h2>
                <p className="text-[7px] md:text-[12px] text-gray-600 font-semibold text-center mt-1 uppercase tracking-wide">
                  Cities
                </p>
              </div>
              <div className=" flex  flex-col items-center justify-center font-inter w-25 h-25 md:w-40 md:h-40 rounded-full border-gradient-blue-green shadow-xl p-1" aria-label="More than 22 wealth managers">
                <h2 className="text-[14px] md:text-3xl font-extrabold text-[#44475B] font-inter">
                  22+
                </h2>
                <p className="text-[7px] md:text-[12px] md:text-xs text-gray-600  font-inter font-semibold text-center mt-1 uppercase tracking-wide">
                  Managers
                </p>
              </div>
            </div>
          </div>
        ) : (
          // App Slide Content
          <div
            className="flex flex-col items-center gap-1 lg:gap-12 lg:flex-row lg:justify-evenly text-white w-full px-4 lg:px-0"
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide 2 of 2: ${activeSlide.title}`}
          >
            <div className="text-center lg:w-1/2 lg:text-left lg:pr-12 order-2 lg:order-1">
              <h2 className="mb-6 font-extrabold leading-tight text-[18px] md:text-3xl lg:text-4xl xl:text-5xl drop-shadow-lg max-w-2xl">
                Smart investing starts with the right platform – meet Prodigy
                Pro.
              </h2>

              <div className=" pt-2 md:pt-5 lg:pt-7 flex justify-center lg:justify-start gap-4">
                <a
                  href="https://play.google.com/store/apps/details?id=com.bfc_mf.prodigy_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-all hover:scale-105 active:scale-95 group"
                  aria-label="Get the Prodigy Pro app on Google Play Store"
                >
                  <Image
                    src="/Home/Playstore.svg"
                    alt="Get it on Google Play Store"
                    width={160}
                    height={47}
                    className="object-contain w-[120px] md:w-full"
                  />
                </a>
                <a
                  href="https://apps.apple.com/in/app/prodigy-pro-mutual-funds-sip/id1575700744"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block transition-all hover:scale-105 active:scale-95 group"
                  aria-label="Download the Prodigy Pro app on Apple App Store"
                >
                  <Image
                    src="/Home/applestore.svg"
                    alt="Download on the Apple App Store"
                    width={160}
                    height={47}
                    className="object-contain w-[120px] md:w-full"
                  />
                </a>
              </div>
            </div>
            <div className=" order-1 lg:order-2">
              <div className="w-full h-full transform hover:scale-105 transition-transform duration-500">
                <Image
                  src="/Home/iPhone16Pro.svg"
                  alt="Prodigy Pro App displaying investment interface on iPhone"
                  width={220}
                  height={260}
                  className="drop-shadow-2xl w-[120px] md:w-[220px] lg:w-[350px] xl:w-[370px]"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Pagination Dots */}
      <div className="mt-5 flex justify-center gap-3 absolute bottom-5 md:bottom-5 lg:bottom-10 left-[48%] z-5">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-3 rounded-full transition-all duration-300 shadow-sm ${idx === currentSlide ? "w-3 " : "w-3 /50 hover:/80"}`}
            style={{
              backgroundColor:
                activeSlide.type === "wealth"
                  ? idx === currentSlide
                    ? "#0056B3"
                    : "#cbd5e1"
                  : idx === currentSlide
                    ? "white"
                    : "#818181",
            }}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={idx === currentSlide ? "true" : "false"}
          ></button>
        ))}
      </div>
    </section>
  );
};

const VideoSection = () => {
  const [isVideoActive, setIsVideoActive] = useState(false);
  const videos = [
    {
      youtubeUrl: "https://youtu.be/M59P6tNdAvA",
    },
    {
      youtubeUrl: "https://youtu.be/-H9oayFUqVk",
    },
    {
      youtubeUrl: "https://youtu.be/2dmody_8oCc",
      thumbnail: "/Home/VideoSlider/RetirementPlanningWITHSIPSWPStrategy1.svg",
    },
    {
      youtubeUrl: "https://youtu.be/WzhB2sRvr40",
      thumbnail: "/Home/VideoSlider/WhatHappens.svg",
    },
  ];
  useEffect(() => {
    if (!isVideoActive) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isVideoActive]);
  return (
    <section
      className="w-full py-5 md:py-15 relative"
      style={{
        backgroundImage: "url('/Home/filter.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      aria-label="Investment video tutorials and guides"
    >
      <div className="container mx-auto px-5 md:px-10 lg:px-20 text-center relative ">
        <h2 className="md:mb-2 font-bold text-[#44475B] text-[20px] md:text-3xl lg:text-5xl font-inter">
          Investment Simplified: <br />
          Empowering You to Invest Wisely
        </h2>

        <p className="mx-auto mb-12 max-w-6xl text-[15px] md:text-[17px] text-[#44475B] leading-relaxed font-inter opacity-90 font-inter">
          Join the BFC community to learn about investing, saving, and budgeting in the easiest ways possible! Whether you're a seasoned investor or just figuring out your financial journey, dive in for treasured insights and expert advice. Get tips on mutual funds, saving, budgeting, and retirement planning. Take control of your financial future today!
        </p>

        <VideoCarousel videos={videos} autoPlayInterval={2000} />
      </div>
    </section>
  );
};

const AdvantageSection = () => {
  const features = [
    {
      icon: "/Home/BFCAdvantage/PeriodicPortfolio.svg",
      title: "Periodic Portfolio Review",
      desc: "Nothing's a certainty, not even the returns you earn. That's why, twice a year, we give your portfolio a much-needed health checkup and fish out the bad investments.",
    },
    {
      icon: "/Home/BFCAdvantage/TailorMade.svg",
      title: "Tailormade Solutions",
      desc: "The one size fits all approach doesn't usually work in investing. Make informed financial decisions based on the solutions tailored to complement your priorities.",
    },
    {
      icon: "/Home/BFCAdvantage/AlgoBasedScheme.svg",
      title: "Algorithm-based Scheme Selection",
      desc: "Invest in schemes shortlisted by our superior AI-driven algorithm after factoring in mandatory quality, industry parameters, and investor priorities.",
    },
    {
      icon: "/Home/BFCAdvantage/CompetentWealthManagers.svg",
      title: "Competent Wealth Managers",
      desc: "We pick the best of talent from the industry as that's what we want to offer each and every one of our clients - The Best!",
    },
    {
      icon: "/Home/BFCAdvantage/regularprofit.svg",
      title: "Regular Profit Booking",
      desc: "We don't let market volatility erode our clients' profits - By using internal parameters, we book profits regularly.",
    },
    {
      icon: "/Home/BFCAdvantage/appWith3S.svg",
      title: "App with 3 S Benefits",
      desc: (
        <>
          Buy, Track & Sell Mutual Funds on the go with{" "}
          <Link href="https://app.prodigypro.co.in" className="text-[#001EFE] underline hover:text-[#001EFE]/80 font-medium" aria-label="PRODIGY Pro online portal">
            PRODIGY Pro
          </Link>{" "}
          - BFC's Mobile App with 3 S benefits: Speed | Safety | Simplicity.
        </>
      ),
    },
    {
      icon: "/Home/BFCAdvantage/CapGain.svg",
      title: "Capital Gain Immunization",
      desc: "Not all profits are taxable. With access to the right advice and the will to act on it, you can save more on taxes than you initially thought.",
    },
    {
      icon: "/Home/BFCAdvantage/MarketSavvy.svg",
      title: "Market Savvy Research Team",
      desc: "A team that follows the markets with relentless diligence and is alert to every spike and drop in the charts, so you stay ahead of the curve at all times.",
    },
    {
      icon: "/Home/BFCAdvantage/tacticalCalls.svg",
      title: "Tactical Calls",
      desc: "Gain access to the short-term calls our research team offers and maximise your returns by investing in sectors that are likely to attract profits in the near future.",
    },
    {
      icon: "/Home/BFCAdvantage/ContingencyPlanning.svg",
      title: "Contingency Planning",
      desc: "Uncertainty is part of life. Contingency funds help protect your lifestyle during income disruptions and emergencies without compromising long-term goals.",
    },
    {
      icon: "/Home/BFCAdvantage/360.svg",
      title: "360° Financial Coverage",
      desc: "With access to Mutual Funds, Stocks, PMS, AIFs, SIFs, Bonds, and FDs, we ensure your portfolio is structured across suitable products under one framework.",
    },
    {
      icon: "/Home/BFCAdvantage/RetirementPlanning.svg",
      title: "Retirement Planning",
      desc: "BFC helps you assess future income needs, plan cash flows, and build a retirement corpus that supports financial stability and independence post retirement.",
    },
  ];

  return (
    <section className="py-5 md:py-15" aria-label="BFC Advantage features and benefits">
      <div className="container mx-auto px-5 md:px-10 lg:px-20">
        <div className="mb-10 md:mb-16 text-center">
          <h2 className="font-bold text-[#44475B] text-[20px] md:text-3xl lg:text-5xl">
            BFC Advantage
          </h2>
          <p className="md:mt-2 text-gray-600 text-[15px] md:text-[17px]">
            Invest smart! Give your investments the BFC Advantage
          </p>
        </div>
        <div className="grid gap-3 md:gap-x-8 md:gap-y-12 grid-cols-2 lg:grid-cols-3 justify-items-center">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center  border border-[#EBEAEA] rounded-[15px] md:rounded-[24px] w-full pt-[10px] md:pt-[28px] pb-[10px] md:pb-[28px] px-[10px] md:px-[32px] text-center transition-all hover:shadow-md group bg-[#FFFFFF]"
            >
              <div className="relative items-center justify-center mb-[20px]">
                <Image
                  src={feature.icon}
                  alt=""
                  role="presentation"
                  width={80}
                  height={80}
                  className="object-contain w-[40px] sm:w-[50px] md:w-[80px] lg:w-full"
                />
              </div>
              <h3 className="text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px] leading-tight">
                {feature.title}
              </h3>
              <p className="text-[13px] md:text-[17px] leading-4 md:leading-6 text-[#44475B] font-inter">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProcessSection = () => {
  return (
    <section className=" py-5 md:pt-0 md:pb-10 overflow-hidden" aria-label="Seamless investor experience layout">
      <div className=" mx-auto text-center">
        <h2 className="mb-6 md:mb-12  font-bold text-[20px] md:text-3xl lg:text-5xl text-[#44475B]">
          A Seamless & User-Friendly Investor Experience
        </h2>
        <div className="flex justify-center py-4 md:mb-5 items-center">
          <Image
            src="/Home/seemless.svg"
            alt="Flow diagram illustrating the seamless and user-friendly investor registration and investment journey"
            width={100}
            height={250}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

const AppTrustSection = () => {
  return (
    <section 
      className="relative w-full pb-3 lg:pb-0 sm:py-3 md:py-5 lg:py-0 overflow-hidden items-center"
      style={{
        backgroundColor: '#047D43',
        background: 'linear-gradient(269.9deg,#047D43 24.53%,#001EFE 156.82%)'
      }}
      aria-label="Technology and investment experience trust details"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between ">
        <div className="md:w-1/2 relative flex justify-center md:justify-start">
          <div className="">
            <Image
              src="/Home/iPhone17.webp"
              alt="iPhone mockups showcasing the user-friendly interface of Prodigy Pro investment app"
              width={1200}
              height={1200}
              className="w-full h-auto max-w-[300px] sm:max-w-[400px] lg:max-w-[575px] object-contain drop-shadow-2xl"
            />
          </div>
        </div>
        <div className="md:w-1/2 text-white mt-5 md:mt-0 md:pl-12 align-self-center">
          <div className="text-center md:text-start">
            <h2 className="text-[20px] md:text-[25px] lg:text-[33px] xl:text-[45px] font-extrabold leading-tight mb-3">
              Experience you trust. <br />
              Technology you deserve.
            </h2>
            <p className="text-base font-inter mb-5 md:mb-10 leading-5">
              Built on two decades of trusted advice, now reimagined for modern
              investors.
            </p>
          </div>
          <div className="flex justify-center md:justify-start flex-wrap gap-4 mb-2">
            <Link
              href="https://play.google.com/store/apps/details?id=com.bfc_mf.prodigy_app"
              target="_blank"
              className="transition-transform hover:scale-105 active:scale-95"
              aria-label="Get the Prodigy Pro app on Google Play Store"
            >
              <Image
                src="/Home/Playstore.svg"
                alt="Get it on Google Play Store"
                width={160}
                height={47}
                className="w-[160px] h-[47px] lg:w-full"
              />
            </Link>
            <Link
              href="https://apps.apple.com/in/app/prodigy-pro-mutual-funds-sip/id1575700744"
              target="_blank"
              className="transition-transform hover:scale-105 active:scale-95"
              aria-label="Download the Prodigy Pro app on Apple App Store"
            >
              <Image
                src="/Home/applestore.svg"
                alt="Download on the Apple App Store"
                width={160}
                height={47}
                className="w-[160px] h-[47px] lg:w-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const EventsSection = () => {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://bfccapital.com/event/wp-json/quality/circle1/programmes"
        );

        const formattedEvents = res.data.map((item: any) => ({
          image: item.image,
          venue: item.venue || "Lucknow",
          title: item.title,
          date: item.date,
          desc: item.excerpt.replace(/(<([^>]+)>)/gi, ""),
          link: item.link,
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="py-5 md:py-15" aria-label="Quality Circle Programmes and Investor Education">
      <div className="container mx-auto px-5 md:px-10 lg:px-20">
        <div className="mb-5 md:mb-16 text-center">
          <h2 className="font-extrabold text-[#44475B] text-[20px] md:text-3xl lg:text-5xl tracking-tight">
            Quality Circle Programmes
          </h2>
          <p className="md:mt-4 text-[#44475B] text-[15px] md:text-[17px] leading-5 max-w-2xl mx-auto">
            An honest attempt to educate investors on the Dos and Don'ts of
            investing.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event, idx) => (

            <div
              key={idx}
              className=" overflow-hidden rounded p-3 shadow-md hover:shadow-lg transition-shadow border border-gray-100 flex flex-col h-full bg-[#FFFFFF]"
            >
              <Link href={event.link} aria-label={`Read details about event: ${event.title}`}>
                <div className="w-full bg-gray-200 relative">
                  <img
                    src={event.image}
                    alt={`Cover illustration representing the event ${event.title}`}
                    className="w-full h-[350px] object-cover"
                  />
                </div>
                <div className="pt-3 flex flex-col flex-1">
                  <p className="text-sm font-semibold text-blue-600 mb-2">
                    Venue: {event.venue}
                  </p>
                  <h3 className="md:text-xl font-bold text-[#44475B] mb-2 md:mb-3 line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-2 md:mb-4 flex-1 line-clamp-4">
                    {event.desc}
                  </p>
                  <div className="mt-auto pt-4 text-xs text-[#44475B] font-medium">
                    {event.date}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-10 md:mt-12 text-center relative">
          <a
            href="https://bfccapital.com/event/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-2 bg-bfc-green text-white font-base rounded-full transition-colors relative "
            aria-label="See all Quality Circle Programme events"
          >
            See All →
          </a>
        </div>
      </div>
    </section>
  );
};

const Credentials = () => {
  const credentialData = [
    {
      logo: "/Home/SEBI.svg",
      alt: "Sebi Logo",
      title: "Sebi Registered Investment Advisor",
      desc: "INA000021669",
    },
    {
      logo: "/Home/AMFI.svg",
      alt: "AMFI Logo",
      title: "AMFI Registered Mutual Fund Distributor & SIF Distributor",
      desc: "ARN : 21399",
    },
    {
      logo: "/Home/BSE.svg",
      alt: "BSE Logo",
      title: "BSE Registered Mutual Fund Distributor",
      desc: "Member Id : 39180",
    },
    {
      logo: "/Home/NSE.svg",
      alt: "NSE Logo",
      title: "NSE Registered Mutual Fund Distributor",
      desc: "Member Id : MFS21399",
    },
  ];

  return (
    <section className="py-5 md:py-0 relative " aria-label="Our Credentials and Regulatory Registrations">
      <div className=" mx-auto md:pt-8">
        <div className="bg-[#CFE4F3] rounded-none p-10 md:p-14 shadow-sm">
          <div className="container w-full m-auto">
            <h2 className="text-[20px] md:text-3xl lg:text-5xl font-extrabold text-[#44475B] text-center mb-10 md:mb-16 tracking-tight">
              Our Credentials!
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
              {credentialData.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center"
                >
                  {/* Logo Container with fixed height for alignment */}
                  <div className="h-28 w-full flex items-center justify-center mb-6">
                    <Image
                      src={item.logo}
                      alt={item.alt}
                      width={200}
                      height={80}
                      className="md:object-contain h-full w-full md:w-full md:max-h-full"
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <div className="min-h-[3rem] flex justify-center mb-1">
                      <div className="">
                        <p className="text-[11px] font-bold text-slate-700 tracking-wide leading-tight">
                          {item.title}
                        </p>
                        <p className="text-[11px] font-semibold text-slate-700 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SuccessHighlight = () => {
  return (
    <div className=" pt-10 md:pt-15 lg:pt-48">
      <section
        className="py-5 md:py-20 overflow-visible relative"
        style={{
          backgroundColor: "#047D43",
          background:
            "linear-gradient(269.9deg, #047D43 24.53%, #001EFE 156.82%)",
        }}
        aria-label="Client success highlight and testimonial video"
      >
        <div className="container mx-auto px-4 max-w-7xl relative">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2 w-full text-white order-2 lg:order-1">
              <h2 className="text-2xl md:text-5xl font-extrabold leading-[1.2] mb-3 md:mb-8 max-w-xl">
                The BFC Experience:
                <br className="hidden md:block" />
                20 Years of Wealth
                <br className="hidden md:block" />
                Wisdom
              </h2>

              <div className="flex items-center gap-1 mb-6 text-yellow-500" role="img" aria-label="Rated 5 out of 5 stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <div className="space-y-6 mb-7 md:mb-10">
                <p className="text-[12px] md:text-[16px] leading-relaxed max-w-md">
                  Based in Bengaluru, I've been investing with BFC Capital via
                  the Prodigy Pro app for five years. Gained financial
                  confidence and trust, great team, seamless app, and truly
                  positive experience overall.
                </p>
                <div className="w-8 h-px bg-white/50" role="presentation" aria-hidden="true"></div>
                <div>
                  <p className="font-extrabold text-[14px] md:text-[20px]">
                    Mitya Moitra
                  </p>
                  <p className="opacity-95 text-xs md:text-[15px]">Lucknow</p>
                </div>
              </div>

              <button className=" text-bfc-blue px-5 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all shadow-md group text-[13px] bg-[#FFFFFF]" onClick={() => window.open("https://www.youtube.com/playlist?list=PLfOMOlOYTqnXx3yxcrbxx0uMN2_xTt4Rj", "_blank")} aria-label="See all client testimonials">

                See All
                <span className="text-bfc-blue group-hover:translate-x-1 transition-transform" aria-hidden="true">
                  →
                </span>

              </button>
            </div>
            <div className="md:w-1/2 relative order-1 lg:order-2">
              <div className="lg:absolute right-10 top-0 lg:-top-24 opacity-40 z-0 hidden md:block">
                <Image
                  src="/Home/particle.svg"
                  alt=""
                  role="presentation"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
              <div className="md:-mt-40">
                <div className="relative cursor-pointer">
                  <Image
                    src="/Home/TestimonialHome.svg"
                    alt="Mitya Moitra sharing experience about BFC Capital and Prodigy Pro"
                    width={120}
                    height={120}
                    className="w-[180px] md:w-[300px] lg:w-[400px] m-auto h-full"
                  />
                  {/* Play Button Overlay */}
                  <Link href="https://youtube.com/shorts/TD4Sf-Vo-BU?si=TEcAgF1lWsj5Gs6G" aria-label="Play Mitya Moitra's testimonial video on YouTube">
                    <div className="absolute inset-0 bg-transparent flex items-center justify-center transition-colors transition-all hover:scale-110">
                      <div className="w-10 h-10 md:w-16 md:h-16  rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <Image src="/Home/Vector.svg" alt="Play Video" width={120} height={120} className="w-10 h-10 md:w-16 md:h-16  rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Team = () => {
  const teamMembers = [
    {
      name: "Anurag Jaiswal",
      role: "Wealth Manager",
      img: "/Home/Team/Anurag.jpeg",
    },
    {
      name: "Akash Gupta",
      role: "AVP- Research & Analysis",
      img: "/Home/Team/AkashGupta.webp",
    },
    {
      name: "Kavya Mehrotra",
      role: "Sr. Manager- Research & Analysis",
      img: "/Home/Team/kavya.webp",
    },
    {
      name: "Sparsh Awasthi",
      role: "Sr. Wealth Manager",
      img: "/Home/Team/Sparsh.webp",
    },
    {
      name: "Nainie Rastogi",
      role: "Wealth Manager",
      img: "/Home/Team/nainee 1.webp",
    },
    {
      name: "Ayush Mishra",
      role: "Wealth Manager",
      img: "/Home/Team/Ayush.webp",
    },
    {
      name: "Shashank Awasthi",
      role: "Wealth Manager",
      img: "/Home/Team/Shashank.webp",
    },
    {
      name: "Shubham Dubey",
      role: "Wealth Manager",
      img: "/Home/Team/Shubham.webp",
    },
    {
      name: "Shivangi Yadav",
      role: "Wealth Manager",
      img: "/Home/Team/Shivangi.webp",
    },
    {
      name: "Sandeep Yadav",
      role: "Wealth Manager",
      img: "/Home/Team/Sandeep.webp",
    },
  ];
  return (
    <section className="py-5 md:py-15" aria-label="BFC Capital wealth management experts team">
      <div className="container mx-auto px-5 md:px-10 lg:px-20">
        <div className="text-center mb-10 md:mb-24">
          <h2 className="text-[20px] md:text-3xl lg:text-5xl font-extrabold text-[#44475B] mb-4">
            Meet the Experts
          </h2>
          <p className="text-[#44475B] max-w-2xl mx-auto font-base leading-5 text-[15px] md:text-[17px]">
            Money matters are serious business. Don't take them lightly. Reach
            out to our experts and make informed financial decisions.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-10 md:gap-y-20">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center group text-center transition-all duration-500 ${idx % 2 === 1 ? "lg:mt-12" : "lg:mt-0"
                }`}
            >
              <div className="relative aspect-[3/4] w-full min-h-[180px] sm:min-h-[220px] md:min-h-[280px] lg:min-h-[220px] xl:min-h-[280px] mb-6 overflow-hidden rounded-none shadow-sm transition-all duration-300 group-hover:shadow-lg">
                <Image
                  src={member.img}
                  alt={`Portrait of ${member.name}, ${member.role}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-bold text-[#334155] text-lg leading-tight mb-1">
                {member.name}
              </h3>
              <p className="text-[14px] text-[#44475B] font-medium">
                {member.role}
              </p>
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
        <div className="space-y-4 text-[#44475B] leading-relaxed font-base">
          <p>
            Think of financial planning as creating a roadmap for your money,
            its almost like planning a road trip. You wouldn't just hop in a car
            and drive without knowing where you're going, right? Financial
            planning works the same way. It's about knowing your goals,
            understanding your income and expenses, and figuring out the best
            path to reach those goals.
          </p>
          <p>
            And so as for why do you need it? Well, life is full of
            surprises—some welcome, some... not so much. Financial planning
            helps you save for the things that truly matter in the long run—
            whether it's buying a house, sending your kids to college, or
            enjoying a worry-free retirement.
          </p>
        </div>
      ),
    },
    {
      question: "How does financial planning help achieve life goals?",
      answer: (
        <div className="text-[#44475B] leading-relaxed font-base">
          <p>
            Financial planning turns your goals into clear and structured action
            plans. By managing your income, savings, and investments wisely, it
            helps you stay on track and make your dreams— like buying a home,
            traveling, or retiring comfortably— a beautiful reality.
          </p>
        </div>
      ),
    },
    {
      question: "How does a financial advisor help in financial planning?",
      answer: (
        <div className="space-y-4 text-[#44475B] leading-relaxed font-base">
          <p>
            Think of a financial advisor as your personal guide to everything
            money! They help you plan, invest, save, budget, and map your money
            based on your risk profile ( the amount of risk you are willing to
            take) and time horizon ( the tenure for which you would want to stay
            invested to achieve your goals) with certified expertise up their
            sleeves.
          </p>
          <p>
            At BFC CAPITAL, a <span aria-label="Sebi">SEBI</span> Registered Investment Advisor (RIA), we help
            you do all of that with trusted, regulated advice to make sure your
            financial journey stays on the track that you have envisioned.
          </p>
        </div>
      ),
    },
    {
      question: "Are mutual funds safe for long-term wealth creation?",
      answer: (
        <div className="space-y-4 text-[#44475B] leading-relaxed font-base">
          <p>
            Absolutely yes! In fact mutual funds are one of the most effective
            tools for long-term wealth creation when you stay invested with
            discipline. They help you benefit from compounding, professional
            fund management, and diversification– making them the suitable
            choice for long term wealth creation.
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className=" py-5 md:py-5 pb-10 md:pb-15" aria-label="Frequently Asked Questions">
      <div className="container mx-auto px-5 md:px-10 lg:px-20">
        <div className="text-center mb-5 md:mb-16 px-4">
          <h2 className="text-[20px] md:text-3xl lg:text-5xl font-extrabold text-[#44475B] md:mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#44475B] font-base text-[15px] md:text-[17px] leading-5">
            Questions on your mind? Don't worry we have the answers!
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-100 last:border-0">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full py-2 md:py-6 flex items-center justify-between text-left group transition-all"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span
                  className={`text-[15px] md:text-[25px] lg:text-xl font-bold transition-colors tracking-tight ${openIndex === index ? "text-[#334155]" : "text-[#334155]/80 group-hover:text-[#334155]"}`}
                >
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-[#44475B] transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all text-[#44475B] duration-300 ease-in-out text-[15px] md:text-[17px] leading-5 ${openIndex === index
                  ? "max-h-[500px] opacity-100 pb-8"
                  : "max-h-0 opacity-0"
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
  const [monthYear, setMonthYear] = useState("");

  useEffect(() => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    setMonthYear(`${lastMonth.toLocaleString("default", { month: "long" })}, ${lastMonth.getFullYear()}`);
  }, []);

  const data = [
    {
      sr: 1,
      from: "Directly from Investors",
      lastMonth: 0,
      received: 0,
      resolved: 0,
      totalPending: 0,
      pending3Months: 0,
      avgTime: "N/A",
    },
    {
      sr: 2,
      from: "SEBI (SCORES)",
      lastMonth: 0,
      received: 0,
      resolved: 0,
      totalPending: 0,
      pending3Months: 0,
      avgTime: "N/A",
    },
    {
      sr: 3,
      from: "Other Sources (if any)",
      lastMonth: 0,
      received: 0,
      resolved: 0,
      totalPending: 0,
      pending3Months: 0,
      avgTime: "N/A",
    },
  ];

  return (
    <section className="py-5 md:py-0 " aria-label="Sebi Investor Complaints and Disclosures">
      <div className="container mx-auto px-4">
        <div className="text-center mb-5 md:mb-12 px-4">
          <h2 className="text-[20px] md:text-3xl lg:text-5xl font-extrabold text-[#44475B] tracking-tight">
            Number of Complaints as per <span aria-label="Sebi">SEBI</span> Guidelines
          </h2>
          <p className="text-[#44475B] mt-4">Data for the month ending {monthYear || "..."}</p>
        </div>

        <div 
          className="max-w-6xl mx-auto overflow-x-auto shadow-sm border border-gray-100 rounded-[16px]"
          tabIndex={0}
          role="region"
          aria-label="Investor complaints table container"
        >
          <table className="w-full text-center border-collapse" aria-label="Table summarizing complaints received, pending status, and resolution time as per Sebi Guidelines">
            <thead>
              <tr
                className="text-[#4D4D4D] border-b border-gray-100 bg-[#E6F0FA]"
                style={{
                  background:
                    "linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)",
                }}
              >
                <th className="py-[10px] text-[12px] w-[70px]  font-extrabold tracking-tight text-center whitespace-nowrap" aria-label="Serial Number">
                  Sr.No.
                </th>
                <th className="py-[10px] text-[12px] font-extrabold tracking-tight text-left whitespace-nowrap text-left">
                  Received from
                </th>
                <th className="py-[10px] text-[12px] font-extrabold tracking-tight text-left">
                  Pending at the end
                  <br />
                  of last month
                </th>
                <th className="py-[10px] text-[12px] font-extrabold tracking-tight text-left">
                  Received
                </th>
                <th className="py-[10px] text-[12px] font-extrabold tracking-tight text-left">
                  Resolved*
                </th>
                <th className="py-[10px] text-[12px] font-extrabold tracking-tight text-left">
                  Total Pending#
                </th>
                <th className="py-[10px] text-[12px] font-extrabold tracking-tight text-left">
                  Pending complaints
                  <br />
                  {">"} 3months
                </th>
                <th className="py-[10px] text-[12px] font-extrabold tracking-tight text-left">
                  Average Resolution
                  <br />
                  time^ (in days)
                </th>
              </tr>
            </thead>
            <tbody className="text-[#212121] bg-[#FFFFFF]">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-[12px] px-[17px] text-sm font-bold text-left">
                    {row.sr}
                  </td>
                  <td className="py-[12px] text-sm font-semibold text-left text-gray-700 whitespace-nowrap">
                    {row.from === "SEBI (SCORES)" ? (
                      <>
                        <span aria-label="Sebi">SEBI</span> (SCORES)
                      </>
                    ) : (
                      row.from
                    )}
                  </td>
                  <td className="py-[12px] text-sm font-bold text-left">
                    {row.lastMonth}
                  </td>
                  <td className="py-[12px] text-sm font-bold text-left">
                    {row.received}
                  </td>
                  <td className="py-[12px] text-sm font-bold text-left">
                    {row.resolved}
                  </td>
                  <td className="py-[12px] text-sm font-bold text-left">
                    {row.totalPending}
                  </td>
                  <td className="py-[12px] text-sm font-bold text-left">
                    {row.pending3Months}
                  </td>
                  <td className="py-[12px] text-sm font-bold text-[#44475B] text-left">
                    {row.avgTime}
                  </td>
                </tr>
              ))}
              <tr
                className="text-[#4D4D4D] border-b border-gray-100 bg-[#E6F0FA]"
                style={{
                  background:
                    "linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)",
                }}
              >
                <td className="py-[10px] text-[13px]"></td>
                <td className="py-[10px] text-[13px] text-left font-bold tracking-tight text-left">
                  Grand Total
                </td>
                <td className="py-[10px] text-[13px] font-bold text-left">0</td>
                <td className="py-[10px] text-[13px] font-bold text-left">0</td>
                <td className="py-[10px] text-[13px] font-bold text-left">0</td>
                <td className="py-[10px] text-[13px] font-bold text-left">0</td>
                <td className="py-[10px] text-[13px] font-bold text-left">0</td>
                <td className="py-[10px] text-[13px] text-[#44475B] font-bold uppercase text-left">
                  N/A
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="max-w-6xl mx-auto mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 px-4">
          <p className="text-[13px] text-[#44475B] max-w-2xl leading-relaxed font-medium">
            * Inclusive of complaints of previous months resolved in the current month. <br />
            # Inclusive of complaints pending as on the last day of the month <br />
            ^ Average Resolution time is the sum total of time taken to resolve each complaint in days, in the current month divided by total number of complaints resolved in the current month.
          </p>
          <Link href="/trend-of-monthly-disposal-of-complaints" className="bg-[#024B39] text-white px-10 py-3 rounded-full font-bold transition-all shadow-md active:scale-95 whitespace-nowrap inline-block text-center" aria-label="View full monthly complaints disposal report">
            View More
          </Link>
        </div>

        {/* Investor Charter Section */}
        <div
          className={`transition-all duration-700 overflow-hidden max-h-[1000px] opacity-100 mt-14 mb-12`}
          aria-label="Compliance Audit Status section"
        >
          <div className="text-center mb-16 relative">

            <h2 className="text-[20px] md:text-3xl lg:text-5xl font-extrabold text-[#44475B] tracking-tight">
              Compliance Audit Status
            </h2>
          </div>

          <div 
            className="max-w-6xl mx-auto overflow-x-auto shadow-sm border border-gray-100 rounded-[16px]"
            tabIndex={0}
            role="region"
            aria-label="Compliance audit status table container"
          >
            <table className="w-full text-center border-collapse" aria-label="Compliance Audit Status details by Financial Year">
              <thead>
                <tr
                  className="text-[#4D4D4D] border-b border-gray-100 bg-[#E6F0FA]"
                  style={{
                    background:
                      "linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)",
                  }}
                >
                  <th className="py-[10px] px-[12px] text-[13px] font-extrabold tracking-tight text-left" aria-label="Serial Number">
                    Sr.No.
                  </th>
                  <th className="py-[10px] text-[13px] font-extrabold tracking-tight text-left">
                    Financial Year
                  </th>
                  <th className="py-[10px] px-[15px] text-[13px] font-extrabold tracking-tight text-left">
                    Compliance Audit Status
                  </th>
                  <th className="py-[10px] text-[13px] font-extrabold tracking-tight text-left">
                    Remarks, If any
                  </th>
                </tr>
              </thead>
              <tbody className="text-[#212121] bg-[#FFFFFF]">
                <tr className="">
                  <td className="py-[12px] px-[12px] text-sm font-bold text-left">1</td>
                  <td className="py-[12px] text-sm font-bold text-left">
                    FY 2025-26
                  </td>
                  <td className="py-[12px] px-[15px] text-sm font-bold text-left">N/A</td>
                  <td className="py-[12px] text-sm font-bold text-left">N/A</td>
                </tr>
              </tbody>
            </table>

          </div>
          <div className="max-w-6xl mx-auto mt-8 flex flex-col md:flex-row justify-end items-start md:items-center gap-6 px-4">
            <Link href="/compliance-audit-status" className="bg-[#024B39] text-white px-10 py-3 rounded-full font-bold transition-all shadow-md active:scale-95 whitespace-nowrap inline-block text-center" aria-label="View full compliance audit status report">
              View More
            </Link>
          </div>
        </div>


        {/* Client Level segrigation Report */}
        <div
          className={`transition-all duration-700 overflow-hidden max-h-[1000px] opacity-100 mt-14 mb-12`}
          aria-label="Client Level Segregation Report section"
        >
          <div className="text-center mb-16 relative">

            <h2 className="text-[20px] md:text-3xl lg:text-5xl font-extrabold text-[#44475B] tracking-tight">
              Client Level Segregation Report
            </h2>
          </div>

          <div 
            className="max-w-6xl mx-auto overflow-x-auto shadow-sm border border-gray-100 rounded-[16px]"
            tabIndex={0}
            role="region"
            aria-label="Client level segregation report table container"
          >
            <table className="w-full text-center border-collapse" aria-label="Client Level Segregation Report details by Financial Year">
              <thead>
                <tr
                  className="text-[#4D4D4D] border-b border-gray-100 bg-[#E6F0FA]"
                  style={{
                    background:
                      "linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)",
                  }}
                >
                  <th className="py-[10px] px-[12px] text-[13px] font-extrabold tracking-tight text-left" aria-label="Serial Number">
                    Sr.No.
                  </th>
                  <th className="py-[10px] text-[13px] font-extrabold tracking-tight text-left">
                    Financial Year
                  </th>
                  <th className="py-[10px] px-[15px] text-[13px] font-extrabold tracking-tight text-left">
                    Audit Report
                  </th>
                  <th className="py-[10px] text-[13px] font-extrabold tracking-tight text-left">
                    Client Level Segregation Report
                  </th>
                </tr>
              </thead>
              <tbody className="text-[#212121] bg-[#FFFFFF]">
                <tr className="">
                  <td className="py-[12px] px-[12px] text-sm font-bold text-left">1</td>
                  <td className="py-[12px] text-sm font-bold text-left">
                    FY 2025-26
                  </td>
                  <td className="py-[12px] px-[15px] text-sm font-bold text-left">Compliance Report</td>
                  <td className="py-[12px] text-sm font-bold text-left">Client Level Segregation Report</td>
                </tr>
              </tbody>
            </table>

          </div>
          <div className="max-w-6xl mx-auto mt-8 flex flex-col md:flex-row justify-end items-start md:items-center gap-6 px-4">
            <Link href="/client-level-segregation" className="bg-[#024B39] text-white px-10 py-3 rounded-full font-bold transition-all shadow-md active:scale-95 whitespace-nowrap inline-block text-center" aria-label="View full client level segregation report">
              View More
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

// --- Main Container ---

const Home = () => {
  const [showPopup, setShowPopup] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (showPopup) {
      // Prevent body scroll when popup is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore body scroll when popup is closed
      document.body.style.overflow = "unset";
    }

    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showPopup]);

  useEffect(() => {
    if (showPopup) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      
      const timer = setTimeout(() => {
        if (modalRef.current) {
          const focusable = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length > 0) {
            (focusable[0] as HTMLElement).focus();
          }
        }
      }, 100);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setShowPopup(false);
          return;
        }

        if (e.key === "Tab") {
          if (!modalRef.current) return;
          const focusable = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;

          const firstElement = focusable[0] as HTMLElement;
          const lastElement = focusable[focusable.length - 1] as HTMLElement;

          if (e.shiftKey) {
            if (document.activeElement === firstElement) {
              lastElement.focus();
              e.preventDefault();
            }
          } else {
            if (document.activeElement === lastElement) {
              firstElement.focus();
              e.preventDefault();
            }
          }
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        clearTimeout(timer);
        window.removeEventListener("keydown", handleKeyDown);
        if (previousFocusRef.current) {
          previousFocusRef.current.focus();
        }
      };
    }
  }, [showPopup]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShowPopup(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of footer is visible
      },
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main id="main-content" className="flex-grow overflow-x-hidden">
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
        <ComplaintsTable />
      </main>
      <div ref={footerRef}>
        <Footer />
      </div>

      {/* Beware of Impersonation Popup */}
      {showPopup && (
        <div ref={modalRef} className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 overflow-x-hidden overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="impersonation-title">
          <div className="relative w-full max-w-3xl bg-[#FFFFFF] p-6 md:p-8 lg:p-10 shadow-2xl rounded-[30px] max-h-[90vh] flex flex-col overflow-x-hidden">
            {/* Close Button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute right-4 top-4 cursor-pointer opacity-60 hover:opacity-100 transition-opacity z-10 p-2"
              aria-label="Close impersonation alert dialog"
            >
              <Image src="/Home/X.svg" alt="Close icon" width={30} height={30} />
            </button>

            {/* Content Container - Scrollable with hidden scrollbar */}
            <div className="overflow-y-auto overflow-x-hidden">
              {/* Title */}
              <h2 id="impersonation-title" className="text-[#44475B] text-2xl md:text-[32px] font-bold mb-2 leading-tight font-inter">
                Beware of Impersonation
              </h2>

              {/* Main Text Content */}
              <div className="text-[#44475B] text-[13px] md:text-[14px] space-y-4 font-normal">
                <p className="mb-0 font-inter">
                  This is to inform the general public that BFC Capital,
                  including its affiliates, subsidiaries, employees, directors,
                  key managerial personnel, authorised representatives, and its
                  product Prodigy Pro (collectively referred to as "BFC
                  Capital"), does not:
                </p>

                <ul className="space-y-1 pl-1 mb-0">
                  <li className="flex items-start gap-2 mb-0">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#44475B] flex-shrink-0"></span>
                    <span>
                      Solicit or accept cash or payments outside its official
                      and authorised banking channels
                    </span>
                  </li>
                  <li className="flex items-start gap-2 mb-0">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#44475B] flex-shrink-0"></span>
                    <span>Assure or guarantee returns on any investment</span>
                  </li>
                  <li className="flex items-start gap-2 mb-0">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#44475B] flex-shrink-0"></span>
                    <span>
                      Provide unsolicited investment advice, stock tips,
                      cryptocurrency advice, derivatives strategies, or any form
                      of "assured income" or "quick profit" schemes
                    </span>
                  </li>
                  <li className="flex items-start gap-2 mb-0">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#44475B] flex-shrink-0"></span>
                    <span>
                      Operate or authorise any WhatsApp groups, Telegram
                      channels, social media groups, or third-party platforms
                      offering investment advice, meetings, employment, or
                      services in exchange for payment
                    </span>
                  </li>
                </ul>

                <p className="mb-0">
                  Prodigy Pro is an official product developed and operated by
                  BFC Capital.
                </p>
                <p className="mb-0">
                  Any individual or entity claiming to represent BFC Capital or
                  Prodigy Pro outside authorised channels should be treated as
                  unauthorised and fraudulent.
                </p>
                <p className="mb-0">
                  Official communications of BFC Capital and Prodigy Pro are
                  issued only through verified channels:
                </p>

                {/* Links Section */}
                <div className="space-y-4 mt-2">
                  <div className="space-y-0.5">
                    <p className="mb-0 break-words">
                      <span className="text-[#001EFE] font-medium">
                        Website:
                      </span>{" "}
                      <a
                        href="https://bfccapital.com/"
                        className="hover:text-[#001EFE]"
                      >
                        https://bfccapital.com/
                      </a>
                    </p>
                    <p className="mb-0 break-words">
                      <span className="text-[#001EFE] font-medium">
                        Facebook:
                      </span>{" "}
                      <a
                        href="https://www.facebook.com/bfccapital/"
                        className="hover:text-[#001EFE]"
                      >
                        https://www.facebook.com/bfccapital/
                      </a>
                    </p>
                    <p className="mb-0 break-words">
                      <span className="text-[#001EFE] font-medium">
                        Instagram:
                      </span>{" "}
                      <a
                        href="https://www.instagram.com/bfccapitalpvtltd/"
                        className="hover:text-[#001EFE]"
                      >
                        https://www.instagram.com/bfccapitalpvtltd/
                      </a>
                    </p>
                    <p className="mb-0 break-words">
                      <span className="text-[#001EFE] font-medium">
                        LinkedIn:
                      </span>{" "}
                      <a
                        href="https://www.linkedin.com/company/bfccapitalpvtltd/"
                        className="hover:text-[#001EFE]"
                      >
                        https://www.linkedin.com/company/bfccapitalpvtltd/
                      </a>
                    </p>
                    <p className="mb-0 break-words">
                      <span className="text-[#001EFE] font-medium">
                        Twitter:
                      </span>{" "}
                      <a
                        href="https://x.com/BFCCapital/"
                        className="hover:text-[#001EFE]"
                      >
                        https://x.com/BFCCapital/
                      </a>
                    </p>
                    <p className="mb-0 break-words">
                      <span className="text-[#001EFE] font-medium">
                        YouTube:
                      </span>{" "}
                      <a
                        href="https://www.youtube.com/@bfccapitalpvtltd"
                        className="hover:text-[#001EFE]"
                      >
                        https://www.youtube.com/@bfccapitalpvtltd
                      </a>
                    </p>
                  </div>

                  <div className="space-y-0.5">
                    <p className="mb-0 break-words">
                      <span className="text-[#001EFE] font-medium">
                        Website:
                      </span>{" "}
                      <a
                        href="https://prodigypro.co.in/"
                        className="hover:text-[#001EFE]"
                      >
                        https://prodigypro.co.in/
                      </a>
                    </p>
                    <p className="mb-0 break-words">
                      <span className="text-[#001EFE] font-medium">
                        Facebook:
                      </span>{" "}
                      <a
                        href="https://www.facebook.com/bfcprodigy/"
                        className="hover:text-[#001EFE]"
                      >
                        https://www.facebook.com/bfcprodigy/
                      </a>
                    </p>
                    <p className="mb-0 break-words">
                      <span className="text-[#001EFE] font-medium">
                        Instagram:
                      </span>{" "}
                      <a
                        href="https://www.instagram.com/bfcprodigypro/"
                        className="hover:text-[#001EFE]"
                      >
                        https://www.instagram.com/bfcprodigypro/
                      </a>
                    </p>
                    <p className="mb-0 break-words">
                      <span className="text-[#001EFE] font-medium">
                        Twitter:
                      </span>{" "}
                      <a
                        href="https://x.com/BFCProdigy_Pro"
                        className="hover:text-[#001EFE]"
                      >
                        https://x.com/BFCProdigy_Pro
                      </a>
                    </p>
                    <p className="mb-0 break-words">
                      <span className="text-[#001EFE] font-medium">
                        LinkedIn:
                      </span>{" "}
                      <a
                        href="https://www.linkedin.com/company/bfcprodigypro/"
                        className="hover:text-[#001EFE]"
                      >
                        https://www.linkedin.com/company/bfcprodigypro/
                      </a>
                    </p>
                    <p className="mb-0 break-words">
                      <span className="text-[#001EFE] font-medium">
                        YouTube:
                      </span>{" "}
                      <a
                        href="https://www.youtube.com/@bfcprodigypro"
                        className="hover:text-[#001EFE]"
                      >
                        https://www.youtube.com/@bfcprodigypro
                      </a>
                    </p>
                  </div>
                </div>

                <p className="mt-1 mb-0">
                  Members of the public are advised to exercise due caution.
                </p>
                <p className="mb-0">
                  In case of any impersonation or suspicious activity, please:
                </p>

                <ul className="space-y-1 pl-1 mb-0">
                  <li className="flex items-start gap-2 mb-0">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#44475B] flex-shrink-0"></span>
                    <span>
                      Report the matter to appropriate law enforcement
                      authorities
                    </span>
                  </li>
                  <li className="flex items-start gap-2 mb-0">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#44475B] flex-shrink-0"></span>
                    <span>
                      Inform BFC Capital immediately at:{" "}
                      <a
                        href="mailto:customersupport@bfccapital.com"
                        className="text-[#001EFE]"
                      >
                        customersupport@bfccapital.com
                      </a>
                    </span>
                  </li>
                </ul>

                <p className="mt-4 mb-0">
                  BFC Capital shall not be responsible for any loss arising from
                  transactions conducted through unauthorised persons or
                  platforms.
                </p>
              </div>

              {/* Button */}
              <div className="flex justify-end pt-4 pb-2">
                <button
                  onClick={() => setShowPopup(false)}
                  className="cursor-pointer bg-[#06A358] text-white px-8 py-2 rounded-full font-inter text-sm transition-colors shadow-sm hover:bg-[#058a48]"
                  aria-label="Acknowledge impersonation warning and close alert dialog"
                >
                  I Understand
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
