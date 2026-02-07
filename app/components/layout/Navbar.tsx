"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Mutual Funds", href: "/mutual-funds" },
    { name: "Financial Planning", href: "/financial-planning" },
    { name: "About", href: "/about" },
    { name: "More", href: "/more" },
    { name: "Download App", href: "/download-app" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-[10] w-full bg-white shadow-sm font-sans">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Link href="/" onClick={scrollToTop}>
              <Image
                src="/Logo/CAPLOGO.svg"
                alt=""
                width={155}
                height={155}
              />
            </Link>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-5 xl:space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-bfc-blue font-base font-inter text-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons (Desktop) */}
        <div className="hidden lg:flex items-center gap-10 md:gap-10 xl:gap-20">
          <a
            href="https://app.prodigypro.co.in/"
            className="inline-block px-5 py-1.5 bg-bfc-green text-white text-sm font-inter rounded-full hover:bg-opacity-90 transition-opacity whitespace-nowrap shadow-md hover:shadow-lg"
          >
            Login / Sign-up
          </a>

          <div className="flex items-center gap-1">
            <a href="https://app.prodigypro.co.in/">
              <Image
                src="/Logo/ProdigyPro_horizontal.svg"
                alt=""
                width={145}
                height={145}
              />
            </a>

          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 text-gray-600 hover:#001EFE transition-colors focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-800 font-inter text-medium py-2 border-b border-gray-50 hover:#001EFE hover:pl-2 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-4">
            <button className="w-full py-2 bg-bfc-green text-white font-inter rounded-lg shadow-md">
              Login / Sign-up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
