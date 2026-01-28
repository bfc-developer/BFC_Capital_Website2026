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
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm font-sans">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold tracking-tight text-red-500">
              <Image
                src="/Logo/CAPLOGO.svg"
                alt=""
                width={150}
                height={150}
              />
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-bfc-blue font-medium text-sm transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-6">
          <button className="px-6 py-2 bg-bfc-green text-white text-sm font-semibold rounded-full hover:bg-opacity-90 transition-opacity whitespace-nowrap shadow-md hover:shadow-lg">
            Login / Sign-up
          </button>
          <div className="flex items-center gap-1">
            <Image
              src="/Logo/ProdigyPro_horizontal.svg"
              alt=""
              width={150}
              height={150}
            />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-bfc-blue transition-colors focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-4 flex flex-col gap-4 animate-in slide-in-from-top-5 duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-800 font-medium text-lg py-2 border-b border-gray-50 hover:text-bfc-blue hover:pl-2 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-4">
            <button className="w-full py-3 bg-bfc-green text-white font-bold rounded-lg shadow-md">
              Login / Sign-up
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
