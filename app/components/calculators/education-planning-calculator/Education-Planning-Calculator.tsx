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

export default function EducationPlanningCalculator() {
    const questions = [{
        question: "How can I calculate the future cost of my child’s education?",
        answer: "By using BFC Capital's Education Planning calculator. Enter the child’s age, education start age, duration, current costs, expected returns, and inflation rate: it gives you the future cost instantly."
    }, {
        question: "Does the Education Planning Calculator consider inflation in education costs?",
        answer: "Yes. That’s the key. A course costing ₹5 lakhs today may cost over ₹15 lakhs in 15 years. The calculator adjusts for this rise."
    }, {
        question: "What inputs are required in the Education Planning Calculator?",
        answer: "Just enter the child’s current age, target age, education duration, today’s costs, inflation, and return assumptions."
    }, {
        question: "Does the calculator show how much corpus I will need at the time of admission?",
        answer: "Yes. It not only shows the total cost but also how to reach there, monthly SIP or lump sum."
    }, {
        question: "Can the calculator estimate costs for foreign currency fluctuations in overseas education?",
        answer: "It does not automatically account for foreign currency fluctuations. Exchange rates can vary significantly over the years, and since the calculator focuses on rupee-based returns and inflation, it assumes a static currency conversion rate."
    }

    ];
    // useEffect(() => {
    //   const fetchFaqs = async () => {
    //     try {
    //       const res = await fetch(`${Base_url}/${endpoints.calculators}`);
    //       const data = await res.json();

    //       // Extract FAQ array safely
    //       const faqItems = data?.data[0]?.attributes?.sipCalculator?.FAQ || [];
    //       setQuestions(faqItems);
    //     } catch (error) {
    //       console.error("Error fetching FAQs:", error);
    //     }
    //   };

    //   fetchFaqs();
    // }, []);

    // const [monthlySaving, setMonthlySaving] = useState("₹ 10,00,000");
    // const [rateOfReturn, setRateOfReturn] = useState("₹ 5,00,000");
    // const [period, setPeriod] = useState("24");

    // Calculator state
    //   const [childAge, setChildAge] = useState<number>(8);
    //   const [startCollegeAge, setStartCollegeAge] = useState<number>(24);
    //   const [durationOfEducation, setDurationOfEducation] = useState<number>(3);
    //   const [annualSavings, setAnnualSavings] = useState<number>(500000);
    //   const [expectedRateOfReturn, setExpectedRateOfReturn] = useState<number>(12);
    //   const [expectedInflation, setExpectedInflation] = useState<number>(6);

    //   // Results
    //   const [inflationAdjustedCost, setInflationAdjustedCost] = useState<number>(0);
    //   const [additionalFunds, setAdditionalFunds] = useState<number>(0);
    //   const [monthlyInvestment, setMonthlyInvestment] = useState<number>(0);

    // PMT calculation (like Excel)

    // Calculator state
    const [childAge, setChildAge] = useState<number>(8);
    const [startCollegeAge, setStartCollegeAge] = useState<number>(24);
    const [durationOfEducation, setDurationOfEducation] = useState<number>(3);
    const [annualSavings, setAnnualSavings] = useState<number>(500000);
    const [expectedRateOfReturn, setExpectedRateOfReturn] = useState<string | number>(12);
    const [expectedInflation, setExpectedInflation] = useState<string | number>(6);

    // Results
    const [inflationAdjustedCost, setInflationAdjustedCost] = useState<number>(3416643);
    const [additionalFunds, setAdditionalFunds] = useState<number>(608521);
    const [monthlyInvestment, setMonthlyInvestment] = useState<number>(6319);

    // PMT calculation
    const calculatePMT = (
        rate: number,
        nper: number,
        pv: number,
        fv: number = 0
    ) => {
        if (rate === 0) return -(pv + fv) / nper;
        const pvif = Math.pow(1 + rate, nper);
        return -(rate * (fv + pvif * pv)) / (pvif - 1);
    };

    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();

        if (!annualSavings || !expectedInflation || !expectedRateOfReturn) {
            toast.error("Please make sure all required fields are filled in.");
            return;
        } else {
            if (childAge >= startCollegeAge) {
                toast.error("Child age must be less than college start age");
                return;
            }

            const yearsLeft = startCollegeAge - childAge;
            const FV = annualSavings * Math.pow(1 + Number(expectedInflation) / 100, yearsLeft);

            const er = Number(expectedRateOfReturn) / 100;
            const ei = Number(expectedInflation) / 100;
            const Tot = (1 + er) / (1 + ei) - 1;

            const totalAmtRequired =
                FV * ((1 - Math.pow(1 + Tot, -durationOfEducation)) / Tot);

            const nominalRateMonthly = 12 * (Math.pow(1 + er, 1 / 12) - 1);
            const lumpsum =
                totalAmtRequired / Math.pow(1 + nominalRateMonthly, yearsLeft);

            const monthLeft = yearsLeft * 12;
            const monthlyAmt = calculatePMT(
                nominalRateMonthly / 12,
                monthLeft,
                0,
                -totalAmtRequired
            );

            setInflationAdjustedCost(Math.round(totalAmtRequired));
            setAdditionalFunds(Math.round(lumpsum));
            setMonthlyInvestment(Math.round(monthlyAmt));
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
                    <Link href="/calculators">
                        <span className="text-[#7A7A7A] font-semibold" style={{
                            background: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            color: "transparent"
                        }}>Calculators</span>
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
                    }}>Education Planning Calculator</span>
                </nav>
                {/* Title */}
                <h2 className="text-[40px] md:text-3xl lg:text-5xl font-bold text-[#44475B]">
                    Education Planning Calculator
                </h2>
            </div>
            <section>
                <div className="container mx-auto px-5 md:px-10 lg:px-20">
                    <div className="flex flex-col md:flex-row justify-between gap-6">

                        {/* LEFT SIDE */}
                        <div className="w-full md:w-1/2">
                            <div className="shadow-md rounded-2xl px-8 py-5 bg-[#FFFFFF]">

                                <form className="space-y-6">

                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-[#44475B] font-medium text-sm uppercase">
                                                Child Age Today (Years)
                                            </label>
                                            <span className="font-bold text-[#44475B]">
                                                {childAge} Yrs
                                            </span>
                                        </div>

                                        <RangeBar
                                            maxLimit={30}
                                            setValue={setChildAge}
                                            value={childAge}
                                        />

                                        <div className="flex justify-between text-sm text-[#44475B] mt-2">
                                            <span>1 Yr</span>
                                            <span>30 Yrs</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-[#44475B] font-medium text-sm uppercase">
                                                College Start at age
                                            </label>
                                            <span className="font-bold text-[#44475B]">
                                                {startCollegeAge} Yrs
                                            </span>
                                        </div>

                                        <RangeBar
                                            maxLimit={30}
                                            setValue={setStartCollegeAge}
                                            value={startCollegeAge}
                                        />

                                        <div className="flex justify-between text-sm text-[#44475B] mt-2">
                                            <span>1 Yr</span>
                                            <span>30 Yrs</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-[#44475B] font-medium text-sm uppercase">
                                                Duration of education
                                            </label>
                                            <span className="font-bold text-[#44475B]">
                                                {durationOfEducation} Yrs
                                            </span>
                                        </div>

                                        <RangeBar
                                            maxLimit={8}
                                            setValue={setDurationOfEducation}
                                            value={durationOfEducation}
                                        />

                                        <div className="flex justify-between text-sm text-[#44475B] mt-2">
                                            <span>1 Yr</span>
                                            <span>8 Yrs</span>
                                        </div>
                                    </div>
                                    {/* Monthly Saving */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Approx current cost per year
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={annualSavings}
                                            min={0}
                                            onChange={(e) =>
                                                setAnnualSavings(parseFloat(e.target.value))
                                            }
                                            placeholder="₹ 10,000"
                                        />
                                    </div>

                                    {/* Expected Rate of Return */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Expected Rate of returns (%)
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
                                    {/* Expected Rate of Return */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Expected Inflation (%)
                                        </label>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={expectedInflation}
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
                                                    setExpectedInflation("");
                                                    return;
                                                }

                                                const num = parseFloat(val);

                                                if (val === "." || (!isNaN(num) && num >= 0 && num <= 100)) {
                                                    setExpectedInflation(val);
                                                }
                                            }}
                                        />
                                    </div>

                                    {/* Button */}
                                    <button
                                        type="button"
                                        onClick={handleCalculate}
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
                                    <h2 className="font-primary font-semibold text-2xl leading-tight text-[rgba(33, 33, 33, 1)] mb-6">
                                        Result
                                    </h2>
                                    <label className="block text-[rgba(77, 77, 77, 1)] font-medium text-sm uppercase mb-2">
                                        Corpus required at start of college
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-[rgba(33, 33, 33, 1)] font-bold mb-4">
                                        ₹{inflationAdjustedCost.toLocaleString("en-IN")}
                                    </p>
                                    <hr className="my-8 border-[#D0DBEA] border-[1px]" />
                                    <h4 className="text-[rgba(33, 33, 33, 1)]  font-semibold text-xl leading-tight mb-6">
                                        To meet this goal your must invest:
                                    </h4>
                                    <label className="block text-[rgba(77, 77, 77, 1)] font-medium text-sm uppercase mb-2">
                                        One time investment required
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-[rgba(33, 33, 33, 1)] font-bold mb-4">
                                        ₹{additionalFunds.toLocaleString("en-IN")}
                                    </p>
                                    <label className="block text-[rgba(77, 77, 77, 1)] text-center font-medium text-sm uppercase mb-2">
                                        Or
                                    </label>
                                    <label className="block text-[rgba(77, 77, 77, 1)] font-medium text-sm uppercase mb-2">
                                        Monthly Investment required
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-[rgba(33, 33, 33, 1)] font-bold mb-4">
                                        ₹{monthlyInvestment.toLocaleString("en-IN")}
                                    </p>

                                </div>

                                {/* Invest Now Button */}
                                <div>
                                    <Link
                                        href="https://app.prodigypro.co.in/"
                                        className="inline-block py-3 px-6 rounded-lg font-semibold transition bg-[#FFFFFF]"
                                    >
                                        <span className="bg-gradient-to-r from-[#04B488] to-[#011EFE] bg-clip-text text-transparent font-bold">
                                            Invest Now
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
                    Child Education Planning Calculator</h2>
                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        What is the Child Education Planning Calculator?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Every parent, no matter where they come from or what they earn, shares one common dream: <br /> to give their child the best possible education.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>It could be a good school in your city, a top college in India, or even higher studies abroad. The dream may differ, but one thing stays the same – education costs keep rising, year after year.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Child education planning simply means preparing for that reality today. It's about understanding what your child's education might cost in the future, setting a clear financial target, and investing in a structured way so you're never caught off guard when the time comes.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>This is where Prodigy Pro’s Child Education Planning Calculator, developed by BFC Capital, becomes incredibly helpful.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>Instead of guessing or worrying, the calculator shows you two very important things:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>How much your child's education may cost in the future, and</li>
                        <li>How much you need to save or invest now to comfortably reach that goal.</li>
                    </ul>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Why Use a Child Education Plan Calculator?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>1. Brings Clarity to Your Goal</b> <br /></p><p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Imagine this: you want your child to do an MBA. Today it costs around ₹30 lakhs in India. In 10–12 years, thanks to inflation, the same program could cross ₹45–50 lakhs. Without proper planning, that number can feel crushing, and the weight of that increases every day. The child education planning calculator tells you in advance what you’re up against.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>2. Breaks It Into Manageable Investments</b> <br /></p><p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Instead of panicking about that huge future cost, the calculator tells you how much to put aside each month or as a lump sum today. It converts an overwhelming figure into a clear, doable monthly saving target.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>3. Keeps Inflation in Check</b> <br /></p><p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Parents often save based on today’s fee structure. But in reality, education costs rise by 6–10% every year; faster than household inflation. The calculator automatically factors this in so you don’t fall short.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>4. Helps You Stay Ahead of Time</b> <br /></p><p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Say your child is 5 years old today, and you’re planning for higher studies at 18. That’s a 13-year runway. The calculator shows you how to spread your savings across those years so you’re not scrambling at the last minute.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        How to Use Child Education Planning Calculator
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Using the calculator is as simple as filling in seven blanks:</p>

                    <p className="text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4">Child's Age Today - say 12 years.</p>
                    <p className="text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4">Start College Age - usually 18.</p>
                    <p className="text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4">Duration of Education - 3 years for undergraduate, 2 years for postgraduate, so let's consider 5 years.</p>
                    <p className="text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4">Current Cost per Year - enter today's fees, let's say ₹8 lakhs/year.</p>
                    <p className="text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4">Expected Rate of Return - let's assume 14%.</p>
                    <p className="text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4">Inflation Rate - usually 6-8% for education, so let's say 8%</p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-tight font-inter mx-auto mb-4'>Calculate - and you're done.<br />
                        The calculator shows you:</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-tight font-inter mx-auto mb-4'>
                        Corpus required at start of college: ₹54.12 lakhs <br />Funds required to meet this goal: ₹25.75 lakhs as a lump sum <br />Or an SIP of ₹49,731 monthly!
                    </p>
                </div>
                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Everyday Parent Struggles This Solves
                    </p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li className="mb-4">The "It's too late" panic: Many parents wake up to the education cost reality when the child is already in Class 10th. This calculator shows what starting early can achieve with smaller contributions.</li>
                        <li className="mb-4">Rising school fees: If school fees themselves are rising by 8–10% every year, how do you expect college fees to behave? The calculator connects those dots for you.</li>
                        <li className="mb-4">The overseas dream: Suppose your child wants to study in the US, where tuition and living costs could cost ₹4 crore+ in 15 years. Without an education planning calculator, most parents either underestimate or overestimate. The calculator helps you anchor your plan in reality.</li>
                        <li className="mb-4">The trade-off trap: Parents often end up cutting into retirement savings to fund education. With a calculator-based plan, you avoid sacrificing one goal for another.</li>
                    </ul>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Education is the one gift that stays with a child for life. <br />
                        But it's also one of the biggest financial responsibilities parents carry.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        The biggest mistake isn't earning less. <br />
                        It's waiting and hoping, instead of planning.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        The Child Education Planning Calculator isn't just about numbers. It's about peace of mind. It shows you how much to save, for how long, and with what discipline – long before the pressure begins.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Start early. Stay consistent. Let time and compounding do the heavy lifting.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        When your child finally walks into their dream college, you’ll be grateful you planned – not just wished.
                    </p>
                </div>

            </section >
            <section>
                <h2 className="text-center text-[28px] md:text-3xl lg:text-5xl font-bold text-[#44475B] mt-16">FAQs</h2>
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
