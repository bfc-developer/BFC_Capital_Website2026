import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const calculators = [
    {
        title: "SIP Calculator",
        desc: "Know returns from SIP or plan a future goal",
        img: "/calculator/sip-calculator.png",
        link: "/calculators/sip-calculator",
    },
    {
        title: "Marriage Planning",
        desc: "Plan your dream wedding expenses or set a savings goal",
        img: "/calculator/marriage-planning.png",
        link: "/calculators/marriage-planning-calculator",
    },
    {
        title: "Education Planning",
        desc: "Estimate future education costs and start saving wisely",
        img: "/calculator/education-planning.png",
        link: "/calculators/education-planning-calculator",
    },
    {
        title: "Lump Sum Calculator",
        desc: "See how your investments can grow over time",
        img: "/calculator/lumpsum-calculator.png",
        link: "/calculators/lump-sum-calculator",
    },
    {
        title: "Retirement Calculator",
        desc: "Plan your retirement corpus and secure your future",
        img: "/calculator/retirement-calculator.png",
        link: "/calculators/retirement-planning-calculator",
    },
    {
        title: "EMI Calculator",
        desc: "Calculate your monthly EMI amount",
        img: "/calculator/emi-calculator.png",
        link: "/calculators/emi-calculator",
    },
    {
        title: "FD Calculator",
        desc: "Calculate FD Interest Rates & Return Online",
        img: "/calculator/fd-calculator.png",
        link: "/calculators/fd-calculator",
    },
    {
        title: "ELSS Calculator",
        desc: "Know your tax savings and potential returns with ELSS",
        img: "/calculator/elss-calculator.png",
        link: "/calculators/elss-calculator",
    },
    {
        title: "SWP Calculator",
        desc: "Plan your regular withdrawals for a steady income",
        img: "/calculator/swp-calculator.png",
        link: "/calculators/swp-calculator",
    },
    {
        title: "Target Amount Calculator",
        desc: "Reach pre-planned targets with precision.",
        img: "/calculator/target-amount-sip.png",
        link: "/calculators/target-amount-calculator",
    },
    {
        title: "Annual SIP Calculator",
        desc: "Estimate annual SIP growth easily in a few clicks.",
        img: "/calculator/annual-sip-calculator.png",
        link: "/calculators/annual-sip-calculator",
    },
    {
        title: "Step-UP SIP Calculator",
        desc: "Calculate the value of SIPs with yearly increase.",
        img: "/calculator/step-sip-calculator.png",
        link: "/calculators/step-up-sip-calculator",
    },
    {
        title: "Cost of Delay in SIP Calculator",
        desc: "Starting late costs more than you think– calculate now!",
        img: "/calculator/cost-of-delay-in-sip-calculator.png",
        link: "/calculators/cost-of-delay-in-sip-calculator",
    },
];
export default function Calculators() {
    return (
        <>
            <div className="flex flex-col min-h-screen font-inter">

                <main id="main-content" className="flex-grow">
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
                            <ChevronRight className="h-4 w-4 mx-2 text-[#7A7A7A]" />
                            <span className="text-[#7A7A7A]">Calculators</span>
                        </nav>

                        {/* Title */}
                        <h1 className="text-[25px] md:text-3xl lg:text-4xl font-bold text-[#44475B] mb-5 md:mb-8">
                            Calculators
                        </h1>



                        <div className="grid gap-3 md:gap-x-8 md:gap-y-12 grid-cols-2 lg:grid-cols-3 justify-items-center">
                            {calculators.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.link}
                                    className="flex flex-col border border-[#EBEAEA] rounded-[15px] md:rounded-[24px] w-full pt-[10px] md:pt-[28px] pb-[10px] md:pb-[28px] px-[10px] md:px-[32px] text-center transition-all hover:shadow-md group bg-[#FFFFFF]"
                                >
                                    <div className="relative items-center justify-center mb-[20px]">
                                        <Image
                                            src={item.img}
                                            alt={item.title}
                                            width={60}
                                            height={60}
                                            className="object-contain group-hover:scale-105 transition duration-300"
                                        />
                                    </div>

                                    <div className="text-start">
                                        <h3 className="text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px] leading-tight">
                                            {item.title}
                                        </h3>
                                        <p className="text-[13px] md:text-[17px] leading-4 md:leading-6 text-[#44475B] font-inter">
                                            {item.desc}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                    </div>
                </main>

            </div >
        </>
    );
}