"use client";

import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});
import { ApexOptions } from "apexcharts";
import RangeBar from "@/app/components/common/RangeBar";
import { toast } from "react-toastify";
import { ChevronRight } from "lucide-react";
import { SipWithAnnualIncrease_URL } from "../../urls/URLS";

// const Chart = dynamic(() => import("react-apexcharts"), {
//   ssr: false,
// });

import axios from "axios";

export default function StepUpCalculator() {
    const questions = [
        {
            question: "Does the calculator account for inflation?",
            answer:
                "No. It shows nominal returns only. Inflation should be considered separately while planning your goal amount.",
        },
        {
            question: "Can I test different annual step-up percentages?",
            answer:
                "Yes. You can change the percentage to see how it impacts your future corpus.",
        },
        {
            question: "What rate of return should I assume?",
            answer:
                "Reasonable assumptions should be made based on asset allocation and ideally after consulting a financial advisor.",
        },
        {
            question: "How often should I review my portfolio?",
            answer: "At least once a year, or whenever there is a change in income or goals.",
        },
        {
            question: "Does it clearly show the benefit of stepping up SIPs?",
            answer:
                "Yes. It compares total investment, growth, and future value with and without annual increases.",
        },
    ];

    const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);
    const [loanAmount, setLoanAmount] = useState<number>(1000000);
    const [interest, setInterest] = useState<string | number>(9.8);
    const [expectedRateOfReturn, setExpectedRateOfReturn] = useState<string | number>(12);
    const [monthyEmi, setMonthyEmi] = useState<number>(15000000);
    const [principal, setPrincipal] = useState<number>(973699);
    const [totalinterest, setTotalInterest] = useState<number>(15973699);
    const [totalAmount, setTotalAmount] = useState<number>(12000000);
    const [resultLoanAmount, setResultLoanAmount] = useState<number>(12627902);
    const [totalGrowth, setTotalGrowth] = useState<number>(627902);

    const calculateSip = async () => {
        if (!loanAmount || !expectedRateOfReturn || !interest) {
            toast.error("Please make sure all required fields are filled in.");
            return;
        } else {
            try {
                const res = await axios.post(SipWithAnnualIncrease_URL, {
                    monthlySip: loanAmount,
                    totalMonth: investmentPeriod * 12, // months
                    expectedReturn: Number(interest),
                    annualSipIncrease: Number(expectedRateOfReturn),
                });

                console.log("SIP Result:", res.data);
                const d: any = res.data;

                setMonthyEmi(d.data.invested_amount);
                setPrincipal(d.data.growth_value);
                setTotalInterest(d.data.maturity_amount);
                setTotalGrowth(d.data.stepup_growth_value);
                setTotalAmount(d.data.stepup_invested_amount);
                setResultLoanAmount(d.data.stepup_maturity_amount);
            } catch (error) {
                console.error("SIP calculation failed:", error);
            }
        }
    };

    return (
        <>
            <div className="container mx-auto px-4 py-8 md:py-12 md:px-15 lg:px-20">
                {/* Breadcrumb */}
                <nav className="flex items-center text-sm mb-8">
                    <Link
                        href="/"
                        className="font-semibold"
                        style={{
                            background: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
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
                            <stop offset="39.5%" stopColor="#04B488" />
                            <stop offset="100%" stopColor="#011EFE" />
                        </linearGradient>
                    </svg>

                    <ChevronRight
                        className="h-4 w-4 mx-2"
                        style={{ stroke: "url(#chevron-gradient)" }}
                    />
                    <Link
                        href="/calculators"
                        className="font-semibold"
                        style={{
                            background: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            color: "transparent"
                        }}
                    >
                        Calculators
                    </Link>
                    <ChevronRight
                        className="h-4 w-4 mx-2"
                        style={{ stroke: "url(#chevron-gradient)" }}
                    />
                    <span className="text-[#7A7A7A] font-semibold" style={{
                        // background: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
                        // WebkitBackgroundClip: "text",
                        // WebkitTextFillColor: "transparent",
                        // backgroundClip: "text",
                        // color: "transparent"
                    }}>Step-Up SIP Calculator</span>
                </nav>
                {/* Title */}
                <h2 className="text-[40px] md:text-3xl lg:text-5xl font-bold text-[#44475B]">
                    Step-Up SIP Calculator
                </h2>
            </div>
            <section>
                <div className="container mx-auto px-5 md:px-10 lg:px-20">
                    <div className="flex flex-col md:flex-row justify-between gap-6">

                        {/* LEFT SIDE */}
                        <div className="w-full md:w-1/2">
                            <div className="shadow-md rounded-2xl px-8 py-5 bg-[#FFFFFF]">

                                <form className="space-y-6">

                                    {/* Monthly Saving */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            How much you can invest through monthly SIP?
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={loanAmount}
                                            min={0}
                                            onChange={(e) =>
                                                setLoanAmount(parseFloat(e.target.value))
                                            }
                                            placeholder="₹ 10,000"
                                        />
                                    </div>

                                    {/* Investment Period */}
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-[#44475B] font-medium text-sm uppercase">
                                                How many years will you continue the SIP?
                                            </label>
                                            <span className="font-bold text-[#44475B]">
                                                {investmentPeriod} Yrs
                                            </span>
                                        </div>

                                        <RangeBar
                                            maxLimit={30}
                                            setValue={setInvestmentPeriod}
                                            value={investmentPeriod}
                                        />

                                        <div className="flex justify-between text-sm text-[#44475B] mt-2">
                                            <span>1 Yr</span>
                                            <span>30 Yrs</span>
                                        </div>
                                    </div>

                                    {/* Expected Rate of Return */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Expected Return (% p.a)
                                        </label>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={interest}
                                            placeholder="16.5"
                                            onChange={(e) => {
                                                let val = e.target.value;

                                                // Remove invalid characters (keep digits and one dot)
                                                val = val.replace(/[^0-9.]/g, "");

                                                // Prevent multiple dots
                                                const parts = val.split(".");
                                                if (parts.length > 2) {
                                                    val = parts[0] + "." + parts.slice(1).join("");
                                                }

                                                // Remove leading zeros like 012 -> 12 (but allow 0.x)
                                                if (
                                                    val.startsWith("0") &&
                                                    !val.startsWith("0.") &&
                                                    val.length > 1
                                                ) {
                                                    val = val.replace(/^0+/, "");
                                                }

                                                // Allow empty while typing
                                                if (val === "") {
                                                    setInterest("");
                                                    return;
                                                }

                                                const num = parseFloat(val);

                                                if (val === "." || (!isNaN(num) && num >= 0 && num <= 100)) {
                                                    setInterest(val);
                                                }
                                            }}
                                        />
                                    </div>

                                    {/* Expected Rate of Return */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Annual Step Up Percentage (% p.a)
                                        </label>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={expectedRateOfReturn}
                                            placeholder="16.5"
                                            onChange={(e) => {
                                                let val = e.target.value;

                                                // Remove invalid characters (keep digits and one dot)
                                                val = val.replace(/[^0-9.]/g, "");

                                                // Prevent multiple dots
                                                const parts = val.split(".");
                                                if (parts.length > 2) {
                                                    val = parts[0] + "." + parts.slice(1).join("");
                                                }

                                                // Remove leading zeros like 012 -> 12 (but allow 0.x)
                                                if (
                                                    val.startsWith("0") &&
                                                    !val.startsWith("0.") &&
                                                    val.length > 1
                                                ) {
                                                    val = val.replace(/^0+/, "");
                                                }

                                                // Allow empty while typing
                                                if (val === "") {
                                                    setExpectedRateOfReturn("");
                                                    return;
                                                }

                                                const num = parseFloat(val);

                                                if (val === "." || (!isNaN(num) && num >= 0 && num <= 100)) {
                                                    setExpectedRateOfReturn(val);
                                                }
                                            }}
                                        />
                                    </div>

                                    {/* Button */}
                                    <button
                                        type="button"
                                        onClick={calculateSip}
                                        className="bg-[#04B488] text-white py-3 rounded-lg font-semibold hover:bg-[#008f45] transition duration-300 p-[14px]"
                                    >
                                        Calculate
                                    </button>

                                </form>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="w-full md:w-1/2 text-[#44475B]">
                            <div className="space-y-4">

                                {/* Result Card */}
                                <div className="shadow-md rounded-2xl px-5 py-4 bg-[#FFFFFF]">
                                    <h2 className="font-primary font-bold text-2xl leading-tight text-textdark mb-3">
                                        Result
                                    </h2>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <p className="fs12px mb-0 mt-3 text-[#44475B] font-medium">
                                                TOTAL SIP AMOUNT INVESTED WITHOUT ANNUAL INCREASE
                                            </p>
                                            <h4 className="mt-1 font-bold text-[#212121] text-xl">
                                                ₹{Math.round(monthyEmi).toLocaleString("en-IN")}
                                            </h4>
                                        </div>
                                        <div className="col-lg-6">
                                            <p className="fs12px mb-0 mt-3 text-[#44475B] font-medium">
                                                TOTAL GROWTH WITHOUT ANNUAL INCREASE
                                            </p>
                                            <h4 className="mt-1 font-bold text-[#212121] text-xl">
                                                ₹{Math.round(principal).toLocaleString("en-IN")}
                                            </h4>
                                        </div>
                                        <div className="col-lg-6">
                                            <p className="fs12px mb-0 mt-3 text-[#44475B] font-medium">
                                                TOTAL FUTURE VALUE (SIP INVESTMENT + RETURNS, NO ANNUAL
                                                INCREASE)
                                            </p>
                                            <h4 className="mt-1 font-bold text-[#212121] text-xl">
                                                ₹{Math.round(totalinterest).toLocaleString("en-IN")}
                                            </h4>
                                        </div>
                                        <div className="col-lg-6">
                                            <p className="fs12px mb-0 mt-3 text-[#44475B] font-medium">
                                                TOTAL SIP AMOUNT INVESTED WITH ANNUAL INCREASE
                                            </p>
                                            <h4 className="mt-1 font-bold text-[#212121] text-xl">
                                                ₹{Math.round(totalAmount).toLocaleString("en-IN")}
                                            </h4>
                                        </div>
                                        <div className="col-lg-6">
                                            <p className="fs12px mb-0 mt-3 text-[#44475B] font-medium">
                                                TOTAL GROWTH WITH ANNUAL INCREASE
                                            </p>
                                            <h4 className="mt-1 font-bold text-[#212121] text-xl">
                                                ₹{Math.round(totalGrowth).toLocaleString("en-IN")}
                                            </h4>
                                        </div>
                                        <div className="col-lg-6">
                                            <p className="fs12px mb-0 mt-3 text-[#44475B] font-medium">
                                                TOTAL FUTURE VALUE (SIP + GROWTH, WITH ANNUAL INCREASE)
                                            </p>
                                            <h4 className="mt-1 font-bold text-[#212121] text-xl">
                                                ₹{Math.round(resultLoanAmount).toLocaleString("en-IN")}
                                            </h4>
                                        </div>
                                    </div>
                                </div>

                                {/* Chart Card */}
                                {/* <div className="shadow-md rounded-2xl px-5 py-4 bg-[#FFFFFF]">
                                    <ReactApexChart
                                        options={chartState.options}
                                        series={chartState.series}
                                        type="area"
                                        height={350}
                                    />
                                </div> */}

                                {/* Invest Now Button */}
                                <div>
                                    <Link
                                        href="https://app.prodigypro.co.in/"
                                        className="inline-block py-3 px-6 rounded-lg font-semibold transition bg-[#FFFFFF]"
                                    >
                                        <span className="bg-gradient-to-r from-[#04B488] to-[#011EFE] bg-clip-text text-transparent font-bold">
                                            Start Investing
                                        </span>
                                    </Link>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section>
                <h2 className="text-center text-[28px] md:text-3xl lg:text-5xl font-bold text-[#44475B] mt-16">All You Need To Know About <br />
                    Step-Up SIP Calculator</h2>
                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        What is a Step-Up SIP Calculator?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Most investors start a SIP with the right intention. You pick an amount, set it up, and feel good about being disciplined. But life does not stay the same. Salaries grow, responsibilities change, and goals become bigger.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        That is where a regular SIP can quietly fall short.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        A Step-Up SIP Calculator recognises a simple reality. You are not meant to invest the same amount forever. As your income grows, your investments should grow too.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        This calculator shows what happens when you increase your SIP every year by a fixed percentage. Even a small annual increase can significantly improve your final corpus. Over time, the difference can be far larger than most people expect.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Think of it as planning growth in line with your life, not in isolation.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Why This Calculator Matters
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Most people underestimate two things.<br />
                        How much their income can grow over time.<br />
                        And how powerful small annual increases can be when combined with compounding.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        A fixed SIP might feel comfortable today, but ten or fifteen years later, it may not be enough for goals like a home, a child’s education, or retirement. <br />This is the gap the Step-Up SIP Calculator helps you see early.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        It shows you how your contributions increase year after year and how returns compound on a growing investment base. Suddenly, long-term goals feel more structured and achievable.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        At BFC Capital, this approach fits naturally with SEBI RIA principles. Planning is done around goals, future income potential, and suitability rather than static assumptions.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        How to Use Step-Up SIP Calculator
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        The calculator is designed to stay simple and intuitive.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Enter your starting monthly SIP.<br />
                        For example, ₹35,000.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Set your investment horizon.<br />
                        Say 20 years.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Choose an expected rate of return.<br />
                        For instance, 12.5 percent annually based on a suitable portfolio.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Decide your annual step-up percentage.<br />
                        For example, a 12 percent yearly increase.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Click “Calculate”.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        You will immediately see a comparison between a regular SIP and a step-up SIP.
                    </p>
                    <div className="mb-4 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter">
                        <p className=''>Without Step-Up</p>
                        <p>
                            Total SIP Invested: ₹84,00,000<br />
                            Total Growth: ₹2,58,03,958<br />
                            Future Value: ₹3,42,03,958
                        </p>
                    </div>
                    <div className="mb-4 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter">
                        <p className=''>With Step-Up</p>
                        <p>
                            Total SIP Invested: ₹3,02,62,025<br />
                            Total Growth: ₹5,02,57,200<br />
                            Future Value: ₹8,05,19,226
                        </p>
                    </div>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        The difference is clear and is almost more than 2x. Not because of higher returns, but because of disciplined increases over time.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Why Use This Calculator?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        A regular SIP is a good start. A step-up SIP is a smarter evolution.
                    </p>
                    <ol className='list-decimal pl-5 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>This calculator helps because it shows realistic growth with rising contributions.</li>
                        <li>It motivates consistency by highlighting the impact of small annual increases.</li>
                        <li>It allows flexibility to test different step-up rates and time horizons.</li>
                        <li>It provides accurate calculations, so planning feels reliable.</li>
                        <li>It supports long-term thinking rather than short-term comfort.</li>
                    </ol>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Instead of guessing whether you are doing enough, you see the numbers clearly.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        How Does It Help You Achieve Your Goals?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        The Step-Up SIP Calculator brings structure to long-term planning.
                    </p>
                    <ol className='list-decimal pl-5 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>It keeps your target corpus visible throughout the journey.</li>
                        <li>It encourages gradual increases that are easier to sustain.</li>
                        <li>It shows how compounding works on both returns and contributions.</li>
                        <li>It allows early adjustments if the plan looks inadequate.</li>
                        <li>It simplifies planning for major life goals without stress.</li>
                    </ol>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        This approach reduces pressure later by taking smarter action earlier.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Tips to Get the Most Out of the Calculator
                    </p>
                    <ol className='list-decimal pl-5 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Use reasonable return assumptions based on asset allocation and risk tolerance.</li>
                        <li>Start early so compounding and step-ups have more time to work.</li>
                        <li>Review your SIP annually as income and goals evolve.</li>
                        <li>Diversify across suitable asset classes to balance growth and risk.</li>
                    </ol>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        A calculator provides direction. Periodic review ensures relevance.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Who Can Benefit from a Step-Up SIP?
                    </p>
                    <ol className='list-decimal pl-5 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Young professionals who expect steady income growth.</li>
                        <li>Parents planning long-term expenses like education or marriage.</li>
                        <li>Retirement planners who want their savings pace to match career growth.</li>
                        <li>First-time investors understanding the value of increasing SIPs.</li>
                        <li>Experienced investors testing strategies to optimise wealth creation.</li>
                    </ol>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        If your income is likely to rise over time, a step-up SIP deserves serious consideration.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        See How Small Increases Create Big Outcomes
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Wealth creation rarely comes from one big decision. It usually comes from many small, consistent ones.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        The Step-Up SIP Calculator shows how a simple annual increase can lead to a significantly higher corpus. It helps you visualise progress, stay motivated, and plan with confidence.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Whether it is ₹25,000 per month with a 10 percent annual increase or any other combination, the principle remains the same.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Grow your investments as your life grows.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        That is how long-term goals become achievable milestones.
                    </p>
                </div>
            </section >
            <section>
                <h2 className="text-center text-[28px] md:text-3xl lg:text-5xl font-bold text-[#44475B] mt-16 mb-4">FAQs</h2>
                <p className="text-center  text-[#44475B] mb-4">Questions on your mind? Dont worry we have the answers!</p>
                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    {questions.map((item, index) => (
                        <div key={index}>
                            <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 font-bold'>{item.question}</p>
                            <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>{item.answer}</p>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}
