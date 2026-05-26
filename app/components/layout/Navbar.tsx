"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  // const [isRiaOpen, setIsRiaOpen] = useState(false);
  const [isComplianceOpen, setIsComplianceOpen] = useState(false);
  const [isproductsOpen, setIsproductsOpen] = useState(false);
  const [isFinancialCalculatorsOpen, setIsFinancialCalculatorsOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleMore = () => {
    setIsMoreOpen(!isMoreOpen);
    setIsComplianceOpen(false);
    setIsproductsOpen(false);
    setIsFinancialCalculatorsOpen(false);
  };
  const toggleCompliance = () => {
    setIsComplianceOpen(!isComplianceOpen);
    setIsMoreOpen(false);
    setIsproductsOpen(false);
    setIsFinancialCalculatorsOpen(false);
  };
  const toggleProducts = () => {
    setIsproductsOpen(!isproductsOpen);
    setIsMoreOpen(false);
    setIsComplianceOpen(false);
    setIsFinancialCalculatorsOpen(false);
  };
  const toggleFinancialCalculators = () => {
    setIsFinancialCalculatorsOpen(!isFinancialCalculatorsOpen);
    setIsMoreOpen(false);
    setIsComplianceOpen(false);
    setIsproductsOpen(false);
  };

  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
    setIsMoreOpen(false);
    setIsComplianceOpen(false);
    setIsproductsOpen(false);
    setIsFinancialCalculatorsOpen(false);
    // setIsRiaOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleOpenCompliance = () => {
      setIsComplianceOpen(true);
      setIsMenuOpen(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("open-navbar-compliance", handleOpenCompliance);
    return () => {
      window.removeEventListener("open-navbar-compliance", handleOpenCompliance);
    };
  }, []);

  const isActive = (path: string) => pathname === path;
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-[999] w-full bg-white shadow-sm font-sans">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <Link href="/" onClick={scrollToTop}>
            <Image
              src="/Logo/CAPLOGO.svg"
              alt="BFC Capital Logo"
              width={155}
              height={155}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center space-x-5 xl:space-x-[28px] relative">

          <Link href="/" className={`${isActive("/") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}> Home</Link>
          <div className="relative">
            <button
              onClick={toggleProducts}
              className="flex items-center gap-1 text-[#4B4949] font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors cursor-pointer"
            >
              Products
              <ChevronDown size={14} className={`transform transition-transform duration-200 ${isproductsOpen ? "rotate-180" : ""}`} />
            </button>
            {isproductsOpen && (
              <div className="absolute top-8 left-[-5rem] bg-white shadow-lg border border-gray-100 rounded-md py-2 w-90 z-50 p-4">
                <div className="px-md-4 mb-2">
                  <Link href="/all-mutual-funds" className={`${isActive("/all-mutual-funds") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}>Mutual Funds</Link>

                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/sif" className={`${isActive("/sif") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  >SIF</Link>
                </div>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={toggleFinancialCalculators}
              className="flex items-center gap-1 text-[#4B4949] font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors cursor-pointer"
            >
              Financial Calculators
              <ChevronDown size={14} className={`transform transition-transform duration-200 ${isFinancialCalculatorsOpen ? "rotate-180" : ""}`} />
            </button>
            {isFinancialCalculatorsOpen && (
              <div className="absolute top-8 left-[-5rem] bg-white shadow-lg border border-gray-100 rounded-md py-2 w-90 z-50 p-4">
                <div className="px-md-4 mb-2">
                  <Link href="/calculators/sip-calculator" className={`${isActive("/calculators/sip-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}>SIP Calculator</Link>

                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/calculators/marriage-planning-calculator" className={`${isActive("/calculators/marriage-planning-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  >Marriage Planning</Link>
                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/calculators/education-planning-calculator" className={`${isActive("/calculators/education-planning-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}>Education Planning</Link>

                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/calculators/lump-sum-calculator" className={`${isActive("/calculators/lump-sum-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  >Lump Sum Calculator</Link>
                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/calculators/retirement-planning-calculator" className={`${isActive("/calculators/retirement-planning-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}>Retirement Calculator</Link>

                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/calculators/emi-calculator" className={`${isActive("/calculators/emi-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  >EMI Calculator</Link>
                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/calculators/fd-calculator" className={`${isActive("/calculators/fd-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}>FD Calculator</Link>

                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/calculators/elss-calculator" className={`${isActive("/calculators/elss-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  >ELSS Calculator</Link>
                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/calculators/swp-calculator" className={`${isActive("/calculators/swp-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  >SWP Calculator</Link>
                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/calculators/target-amount-calculator" className={`${isActive("/calculators/target-amount-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}>Target Amount Calculator</Link>

                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/calculators/annual-sip-calculator" className={`${isActive("/calculators/annual-sip-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  >Annual SIP Calculator</Link>
                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/calculators/step-up-sip-calculator" className={`${isActive("/calculators/step-up-sip-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  >Step-UP SIP Calculator</Link>
                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/calculators/cost-of-delay-in-sip-calculator" className={`${isActive("/calculators/cost-of-delay-in-sip-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}>Cost of Delay in SIP Calculator</Link>

                </div>
              </div>
            )}
          </div>
          <Link href="/financial-planning" className={`${isActive("/financial-planning") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}>Financial Planning</Link>
          {/* <Link href="/compliances" className={`${isActive("/compliances") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}>Compliances</Link> */}
          <div className="relative">
            <button
              onClick={toggleCompliance}
              className="flex items-center gap-1 text-[#4B4949] font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors cursor-pointer"
            >
              Compliances
              <ChevronDown size={14} className={`transform transition-transform duration-200 ${isComplianceOpen ? "rotate-180" : ""}`} />
            </button>


            {isComplianceOpen && (
              <div className="absolute top-8 left-[-5rem] bg-white shadow-lg border border-gray-100 rounded-md py-2 w-90 z-50 p-4">
                <div className="px-md-4 mb-2">
                  <Link href="/compliances/investor-charter" className={`${isActive("/compliances/investor-charter") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}>Investor Charter</Link>

                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/compliances/grievance-redressal" className={`${isActive("/compliances/grievance-redressal") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  >Grievance Redressal</Link>
                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/compliances/grievance-mechanism-for-PWD" className={`${isActive("/compliances/grievance-mechanism-for-PWD") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  >Grievance Mechanism  For PWD</Link>
                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/compliances/disclosures-and-disclaimer" className={`${isActive("/compliances/disclosures-and-disclaimer") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  >Disclosures and Disclaimer</Link>
                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/compliances/investor-education-platforms" className={`${isActive("/compliances/investor-education-platforms") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  >Investor Education Platforms </Link>
                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/compliances/bank-details" className={`${isActive("/compliances/bank-details") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  >Bank Details
                  </Link>
                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/compliances/refund-and-liability-policy" className={`${isActive("/compliances/refund-and-liability-policy") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  >Refund and Liability Policy</Link>
                </div>
              </div>
            )}
          </div>
          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={toggleMore}
              className="flex items-center gap-1 text-[#4B4949] font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors cursor-pointer"
            >
              More
              <ChevronDown size={14} className={`transform transition-transform duration-200 ${isMoreOpen ? "rotate-180" : ""}`} />
            </button>

            {isMoreOpen && (
              <div className="absolute top-8 left-[-5rem] bg-white shadow-lg border border-gray-100 rounded-md py-2 w-90 z-50 p-4">
                <div className="px-md-4 mb-2">
                  <Link href="/about" className={`${isActive("/about") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}> About </Link>
                  <p className="text-[#4B4949] text-[11px] font-base font-inter transition-colors text-[13px] leading-tight">Where research meets responsible advice.</p>
                </div>
                <div className="px-md-4 mb-2">
                  <Link href="/calculators" className={`${isActive("/calculators") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
                  > Financial Calculators </Link>
                  <p className="text-[#4B4949] text-[11px] font-base font-inter transition-colors text-[13px] leading-tight">Because good decisions need good numbers.</p>
                </div>
                <div className="px-md-4 mb-2">
                  <Link href="https://bfccapital.com/blog" className={`${isActive("/blog") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-base font-inter transition-colors`}
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
            className="inline-block px-5 py-1.5 bg-[#024B39] text-white text-sm font-inter rounded-full transition-opacity whitespace-nowrap shadow-md hover:shadow-lg"
          >
            Login / Sign-up
          </a>

          <a href="https://app.prodigypro.co.in/">
            <Image
              src="/Logo/ProdigyPro_horizontal.svg"
              alt="ProdigyPro Logo"
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
        <div className="xl:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-6 flex flex-col gap-4 animate-in slide-in-from-top-5 duration-200 max-h-[calc(100vh-5rem)] overflow-y-auto">

          <Link href="/" className={`${isActive("/") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-inter border-b border-gray-50 pb-2 hover:pl-2 transition-all`}
          >
            Home
          </Link>

          {/* Products Accordion */}
          <div className="border-b border-gray-50 pb-2">
            <button
              onClick={toggleProducts}
              className="w-full flex justify-between items-center text-[#4B4949] font-[500] text-[15px] hover:text-[#001EFE] font-inter cursor-pointer"
            >
              <span>Products</span>
              <ChevronDown size={16} className={`transform transition-transform duration-200 ${isproductsOpen ? "rotate-180 text-[#001EFE]" : ""}`} />
            </button>
            {isproductsOpen && (
              <div className="pl-4 flex flex-col gap-3 mt-3 animate-in fade-in duration-200 border-l border-gray-100 ml-1">
                <Link href="/all-mutual-funds" className={`${isActive("/all-mutual-funds") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>
                  Mutual Funds
                </Link>
                <Link href="/sif" className={`${isActive("/sif") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>
                  SIF
                </Link>
              </div>
            )}
          </div>

          {/* Financial Calculators Accordion */}
          <div className="border-b border-gray-50 pb-2">
            <button
              onClick={toggleFinancialCalculators}
              className="w-full flex justify-between items-center text-[#4B4949] font-[500] text-[15px] hover:text-[#001EFE] font-inter cursor-pointer"
            >
              <span>Financial Calculators</span>
              <ChevronDown size={16} className={`transform transition-transform duration-200 ${isFinancialCalculatorsOpen ? "rotate-180 text-[#001EFE]" : ""}`} />
            </button>
            {isFinancialCalculatorsOpen && (
              <div className="pl-4 flex flex-col gap-3 mt-3 animate-in fade-in duration-200 border-l border-gray-100 ml-1">
                <Link href="/calculators/sip-calculator" className={`${isActive("/calculators/sip-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>SIP Calculator</Link>
                <Link href="/calculators/marriage-planning-calculator" className={`${isActive("/calculators/marriage-planning-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>Marriage Planning</Link>
                <Link href="/calculators/education-planning-calculator" className={`${isActive("/calculators/education-planning-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>Education Planning</Link>
                <Link href="/calculators/lump-sum-calculator" className={`${isActive("/calculators/lump-sum-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>Lump Sum Calculator</Link>
                <Link href="/calculators/retirement-planning-calculator" className={`${isActive("/calculators/retirement-planning-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>Retirement Calculator</Link>
                <Link href="/calculators/emi-calculator" className={`${isActive("/calculators/emi-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>EMI Calculator</Link>
                <Link href="/calculators/fd-calculator" className={`${isActive("/calculators/fd-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>FD Calculator</Link>
                <Link href="/calculators/elss-calculator" className={`${isActive("/calculators/elss-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>ELSS Calculator</Link>
                <Link href="/calculators/swp-calculator" className={`${isActive("/calculators/swp-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>SWP Calculator</Link>
                <Link href="/calculators/target-amount-calculator" className={`${isActive("/calculators/target-amount-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>Target Amount Calculator</Link>
                <Link href="/calculators/annual-sip-calculator" className={`${isActive("/calculators/annual-sip-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>Annual SIP Calculator</Link>
                <Link href="/calculators/step-up-sip-calculator" className={`${isActive("/calculators/step-up-sip-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>Step-UP SIP Calculator</Link>
                <Link href="/calculators/cost-of-delay-in-sip-calculator" className={`${isActive("/calculators/cost-of-delay-in-sip-calculator") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>Cost of Delay in SIP Calculator</Link>
              </div>
            )}
          </div>

          <Link href="/financial-planning" className={`${isActive("/financial-planning") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-inter border-b border-gray-50 pb-2 hover:pl-2 transition-all`}
          >
            Financial Planning
          </Link>

          {/* Compliances Accordion */}
          <div className="border-b border-gray-50 pb-2">
            <button
              onClick={toggleCompliance}
              className="w-full flex justify-between items-center text-[#4B4949] font-[500] text-[15px] hover:text-[#001EFE] font-inter cursor-pointer"
            >
              <span>Compliances</span>
              <ChevronDown size={16} className={`transform transition-transform duration-200 ${isComplianceOpen ? "rotate-180 text-[#001EFE]" : ""}`} />
            </button>
            {isComplianceOpen && (
              <div className="pl-4 flex flex-col gap-3 mt-3 animate-in fade-in duration-200 border-l border-gray-100 ml-1">
                <Link href="/compliances/investor-charter" className={`${isActive("/compliances/investor-charter") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>Investor Charter</Link>
                <Link href="/compliances/grievance-redressal" className={`${isActive("/compliances/grievance-redressal") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>Grievance Redressal</Link>
                <Link href="/compliances/grievance-mechanism-for-pwd" className={`${isActive("/compliances/grievance-mechanism-for-pwd") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>Grievance Mechanism For PWD</Link>
                <Link href="/compliances/disclosures-and-disclaimer" className={`${isActive("/compliances/disclosures-and-disclaimer") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>Disclosures and Disclaimer</Link>
                <Link href="/compliances/investor-education-platforms" className={`${isActive("/compliances/investor-education-platforms") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>Investor Education Platforms</Link>
                <Link href="/compliances/bank-details" className={`${isActive("/compliances/bank-details") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>Bank Details</Link>
                <Link href="/compliances/refund-and-liability-policy" className={`${isActive("/compliances/refund-and-liability-policy") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>Refund and Liability Policy</Link>
              </div>
            )}
          </div>

          {/* More Accordion */}
          <div className="border-b border-gray-50 pb-2">
            <button
              onClick={toggleMore}
              className="w-full flex justify-between items-center text-[#4B4949] font-[500] text-[15px] hover:text-[#001EFE] font-inter cursor-pointer"
            >
              <span>More</span>
              <ChevronDown size={16} className={`transform transition-transform duration-200 ${isMoreOpen ? "rotate-180 text-[#001EFE]" : ""}`} />
            </button>
            {isMoreOpen && (
              <div className="pl-4 flex flex-col gap-3 mt-3 animate-in fade-in duration-200 border-l border-gray-100 ml-1">
                <div>
                  <Link href="/about" className={`${isActive("/about") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>About</Link>
                  <p className="text-[#4B4949] text-[11px] font-inter transition-colors mt-0.5 leading-tight">Where research meets responsible advice.</p>
                </div>
                <div>
                  <Link href="/calculators" className={`${isActive("/calculators") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>Financial Calculators</Link>
                  <p className="text-[#4B4949] text-[11px] font-inter transition-colors mt-0.5 leading-tight">Because good decisions need good numbers.</p>
                </div>
                <div>
                  <Link href="https://bfccapital.com/blog" className={`${isActive("/blog") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>Blog</Link>
                  <p className="text-[#4B4949] text-[11px] font-inter transition-colors mt-0.5 leading-tight">Insights that help you invest with confidence.</p>
                </div>
                <div>
                  <Link href="/career" className={`${isActive("/career") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>Career</Link>
                  <p className="text-[#4B4949] text-[11px] font-inter transition-colors mt-0.5 leading-tight">Do meaningful work. Build lasting value.</p>
                </div>
                <div>
                  <Link href="/contact-us" className={`${isActive("/contact-us") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[14px] hover:text-[#001EFE] font-inter transition-colors`}>Contact Us</Link>
                  <p className="text-[#4B4949] text-[11px] font-inter transition-colors mt-0.5 leading-tight">Start a smarter financial conversation.</p>
                </div>
              </div>
            )}
          </div>

          <Link href="/download-app" className={`${isActive("/download-app") ? "text-[#001EFE]" : "text-[#4B4949]"} font-[500] text-[15px] hover:text-[#001EFE] font-inter border-b border-gray-50 pb-2 hover:pl-2 transition-all`}
          >
            Download App
          </Link>

          <div className="mt-4 flex flex-col gap-4">
            <a
              href="https://app.prodigypro.co.in/"
              className="w-full text-center py-2.5 bg-[#024B39] text-white text-[15px] font-[500] font-inter rounded-full shadow-md hover:bg-[#024B39] transition-all hover:shadow-lg active:scale-95 duration-200"
            >
              Login / Sign-up
            </a>

            <div className="flex justify-center items-center mt-2 border-t border-gray-100 pt-4">
              <a href="https://app.prodigypro.co.in/" className="hover:opacity-90 transition-opacity">
                <Image
                  src="/Logo/ProdigyPro_horizontal.svg"
                  alt="ProdigyPro Logo"
                  width={130}
                  height={130}
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;