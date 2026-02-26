"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMore = () => setIsMoreOpen(!isMoreOpen);

  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-[10] w-full bg-white shadow-sm font-sans">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <Link href="/" onClick={scrollToTop}>
            <Image
              src="/Logo/CAPLOGO.svg"
              alt=""
              width={155}
              height={155}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center space-x-5 xl:space-x-[28px] relative">

          <Link href="/" className={`${isActive("/") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}> Home</Link>
          <Link href="/mutual-funds" className={`${isActive("/mutual-funds") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}> Mutual Funds</Link>
          <Link href="/sif" className={`${isActive("/sif") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}> SIF</Link>
          <Link href="/financial-planning" className={`${isActive("/financial-planning") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}> Financial Planning</Link>
          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={toggleMore}
              className="flex items-center gap-1 text-[#4B4949] font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors cursor-pointer"
            >
              More
              {/* More <ChevronDown size={16} /> */}
            </button>

            {isMoreOpen && (
              <div className="absolute top-8 left-[-5rem] bg-white shadow-lg border border-gray-100 rounded-md py-2 w-90 z-50 p-4">
                <div className="px-md-4 mb-2">
                  <Link href="/about" className={`${isActive("/about") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}> About </Link>
                  <p className="text-[#4B4949] text-[11px] font-base font-inter transition-colors text-[13px] leading-tight">Where research meets responsible advice.</p>
                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/financial-calculators" className={`${isActive("/financial-calculators") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  > Financial Calculators </Link>
                  <p className="text-[#4B4949] text-[11px] font-base font-inter transition-colors text-[13px] leading-tight">Because good decisions need good numbers.</p>
                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/blog" className={`${isActive("/blog") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  > Blog </Link>
                  <p className="text-[#4B4949] text-[11px] font-base font-inter transition-colors text-[13px] leading-tight">Insights that help you invest with confidence.</p>
                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/career" className={`${isActive("/career") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  > Career </Link>
                  <p className="text-[#4B4949] text-[11px] font-base font-inter transition-colors text-[13px] leading-tight">Do meaningful work. Build lasting value.</p>
                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/contact-us
							" className={`${isActive("/contact-us") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  > Contact Us
                  </Link>
                  <p className="text-[#4B4949] text-[11px] font-base font-inter transition-colors text-[13px] leading-tight">Start a smarter financial conversation.</p>
                </div>
              </div>
            )}
          </div>
          <Link href="/download-app" className={`${isActive("/download-app") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}> Download App</Link>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden xl:flex items-center gap-10 md:gap-10 xl:gap-20">
          <a
            href="https://app.prodigypro.co.in/"
            className="inline-block px-5 py-1.5 bg-bfc-green text-white text-sm font-inter rounded-full hover:bg-opacity-90 transition-opacity whitespace-nowrap shadow-md hover:shadow-lg"
          >
            Login / Sign-up
          </a>

          <a href="https://app.prodigypro.co.in/">
            <Image
              src="/Logo/ProdigyPro_horizontal.svg"
              alt=""
              width={145}
              height={145}
            />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden p-2 text-gray-600 hover:text-bfc-blue transition-colors focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="xl:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-5 duration-200">


          <Link href="/" className={`${isActive("/") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-inter border-b border-gray-50 hover:pl-2 transition-all`}
          >
            Home
          </Link>
          <Link href="/mutual-funds" className={`${isActive("/mutual-funds") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-inter border-b border-gray-50 hover:pl-2 transition-all`}
          >
            Mutual Funds
          </Link>
          <Link href="/sif" className={`${isActive("/sif") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-inter border-b border-gray-50 hover:pl-2 transition-all`}
          >
            SIF
          </Link>
          <Link href="/financial-planning" className={`${isActive("/financial-planning") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-inter border-b border-gray-50 hover:pl-2 transition-all`}
          >
            Financial Planning
          </Link>

          {/* Mobile More Dropdown */}
          <div>
            <button
              onClick={toggleMore}
              className="w-full flex justify-between items-center text-[#4B4949] font-[500] text-[15px] hover:text-[#001EFE] font-inter border-b border-gray-50"
            >
              More
              {/* More <ChevronDown size={16} /> */}
            </button>

            {isMoreOpen && (
              <div className="pl-4 flex flex-col gap-2 mt-2">
                <div className="px-md-4 mb-1">
                  <Link href="/about" className={`${isActive("/about") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}> About </Link>
                  <p className="text-[#4B4949] text-[11px] font-base font-inter transition-colors text-[13px]">Where research meets responsible advice.</p>
                </div>
                <div className="px-md-4 mb-1">
                  <Link href="/financial-calculators" className={`${isActive("/financial-calculators") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  > Financial Calculators </Link>
                  <p className="text-[#4B4949] text-[11px] font-base font-inter transition-colors text-[13px]">Because good decisions need good numbers.</p>
                </div>
                <div className="px-md-4 mb-1">
                  <Link href="/blog" className={`${isActive("/blog") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  > Blog </Link>
                  <p className="text-[#4B4949] text-[11px] hover:text-[#001EFE] font-base font-inter transition-colors text-[13px]">Insights that help you invest with confidence.</p>
                </div>
                <div className="px-md-4 mb-1">
                  <Link href="/career" className={`${isActive("/career") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  > Career </Link>
                  <p className="text-[#4B4949] text-[11px] font-base font-inter transition-colors text-[13px]">Do meaningful work. Build lasting value.</p>
                </div>
                <div className="px-md-4 mb-1">
                  <Link href="/contact-us
							" className={`${isActive("/contact-us") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  > Contact Us
                  </Link>
                  <p className="text-[#4B4949] text-[11px] font-base font-inter transition-colors text-[13px]">Start a smarter financial conversation.</p>
                </div>
              </div>
            )}
          </div>

          <Link href="/download-app" className={`${isActive("/download-app") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-inter border-b border-gray-50 hover:pl-2 transition-all`}
          >
            Download App
          </Link>

          <div className="mt-4">
            <a
              href="https://app.prodigypro.co.in/"
              className="w-full block text-center py-2 bg-bfc-green text-white font-inter rounded-lg shadow-md"
            >
              Login / Sign-up
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;