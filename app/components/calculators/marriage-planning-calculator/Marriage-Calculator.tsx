"use client";

import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

import RangeBar from "@/app/components/common/RangeBar";
import { toast } from "react-toastify";
import { ChevronRight } from "lucide-react";

export default function Marriagecalculators() {
    const questions = [
        {
            question: "Does the Marriage Calculator factor in inflation?",
            answer:
                "Yes. That’s its biggest strength. A wedding costing ₹15 lakhs today can inflate to ₹50–60 lakhs in 15 years. The calculator adjusts for this rise.",
        },
        {
            question: "How can the Marriage Planning Calculator help?",
            answer:
                "It’s very useful for couples planning their own weddings in 2–5 years or parents planning for their child’s marriage some years down the line to get an approximate figure with inflation-adjusted estimates. This helps them accurately plan in advance.",
        },
        {
            question: "Can I link marriage planning with SIPs or mutual funds?",
            answer:
                "Absolutely. In fact, that’s the smartest way. For long horizons (10+ years), equity SIPs compound your money faster and beat inflation.",
        },
        {
            question: "Why is Marriage Calculator Important?",
            answer:
                "Because it’s designed around Indian wedding costs, inflation, and savings patterns. It doesn’t just give you numbers: it gives you a clear action plan.",
        },
        {
            question: "When should I start using the Marriage Planning Calculator?",
            answer:
                "The earlier, the better. Ideally, you should start the moment the goal becomes visible – whether your child is 2 years old or 12 years old. Starting early reduces the monthly burden, gives compounding more time to work, and prevents last-minute financial stress when wedding expenses peak.",
        },
    ];

    const [childAge, setChildAge] = useState(8);
    const [marriageAge, setMarriageAge] = useState(24);
    const [amountRequired, setAmountRequired] = useState(1000000);
    const [annualSaving, setAnnualSaving] = useState(500000);
    const [rateOfReturn, setRateOfReturn] = useState<string | number>(12);
    const [inflation, setInflation] = useState<string | number>(6);

    const [results, setResults] = useState({
        inflationAdjustedCost: 2540352,
        futureValue: 21376640,
        additionalFund: -18836288,
        monthlyInvest: -32723,
        lumpsum: -3072607,
    });

    const calculateResults = (e: any) => {
        e.preventDefault();
        if (!amountRequired || !rateOfReturn || !inflation) {
            toast.error("Please make sure all required fields are filled in.");
            return;
        } else {
            if (marriageAge <= childAge) {
                toast.error(
                    `⚠️ Marriage age (${marriageAge} ${marriageAge === 1 ? "year" : "years"
                    }) cannot be less than or equal to child's current age (${childAge} ${childAge === 1 ? "year" : "years"
                    }).`,
                );
            } else {
                e.preventDefault();
                const years = marriageAge - childAge;

                const inflationAdjustedCost = Math.round(
                    amountRequired * Math.pow(1 + Number(inflation) / 100, years),
                );

                const futureValue = Math.round(
                    annualSaving *
                    ((Math.pow(1 + Number(rateOfReturn) / 100, years) - 1) /
                        (Number(rateOfReturn) / 100)),
                );

                const additionalFund = inflationAdjustedCost - futureValue;

                const n = years * 12;
                const monthlyRate = Number(rateOfReturn) / 12 / 100;
                const monthlyInvest = Math.round(
                    (additionalFund * monthlyRate) / (Math.pow(1 + monthlyRate, n) - 1),
                );

                const lumpsum = Math.round(
                    additionalFund / Math.pow(1 + Number(rateOfReturn) / 100, years),
                );

                setResults({
                    inflationAdjustedCost,
                    futureValue,
                    additionalFund,
                    monthlyInvest,
                    lumpsum,
                });
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
                    }}>Marriage Planning</span>
                </nav>
                {/* Title */}
                <h2 className="text-[40px] md:text-3xl lg:text-5xl font-bold text-[#44475B]">
                    Marriage Planning
                </h2>
            </div>
            <section>
                <div className="container mx-auto px-5 md:px-10 lg:px-20">
                    <div className="flex flex-col md:flex-row justify-between gap-6">

                        {/* LEFT SIDE */}
                        <div className="w-full md:w-1/2">
                            <div className="shadow-md rounded-2xl px-8 py-5 bg-[#FFFFFF]">

                                <form className="space-y-6">
                                    {/* Investment Period */}
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
                                    {/* Investment Period */}
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-[#44475B] font-medium text-sm uppercase">
                                                Child will get married at the age
                                            </label>
                                            <span className="font-bold text-[#44475B]">
                                                {marriageAge} Yrs
                                            </span>
                                        </div>

                                        <RangeBar
                                            maxLimit={40}
                                            setValue={setMarriageAge}
                                            value={marriageAge}
                                        />

                                        <div className="flex justify-between text-sm text-[#44475B] mt-2">
                                            <span>1 Yr</span>
                                            <span>40 Yrs</span>
                                        </div>
                                    </div>

                                    {/* Monthly Saving */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Amount required for wedding as on today
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={amountRequired}
                                            min={0}
                                            onChange={(e) =>
                                                setAmountRequired(parseFloat(e.target.value))
                                            }
                                            placeholder="₹ 10,00,000"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Annual Savings
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={annualSaving}
                                            min={0}
                                            onChange={(e) =>
                                                setAnnualSaving(parseFloat(e.target.value))
                                            }
                                            placeholder="₹ 5,00,000"
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
                                            value={rateOfReturn}
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
                                                    setRateOfReturn("");
                                                    return;
                                                }

                                                const num = parseFloat(val);

                                                if (val === "." || (!isNaN(num) && num >= 0 && num <= 100)) {
                                                    setRateOfReturn(val);
                                                }
                                            }}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Expected Inflation (%)
                                        </label>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={inflation}
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
                                                    setInflation("");
                                                    return;
                                                }

                                                const num = parseFloat(val);

                                                if (val === "." || (!isNaN(num) && num >= 0 && num <= 100)) {
                                                    setInflation(val);
                                                }
                                            }}
                                        />
                                    </div>



                                    {/* Button */}
                                    <button
                                        type="button"
                                        onClick={calculateResults}
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
                                    <h2 className="font-primary font-semibold text-2xl leading-tight text-textdark mb-6">
                                        Result
                                    </h2>
                                    <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                        Inflation Adjusted Cost
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-textdark font-bold mb-4">
                                        ₹{results.inflationAdjustedCost.toLocaleString("en-IN")}
                                    </p>
                                    <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                        Future value of savings
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-textdark font-bold mb-4">
                                        ₹{results.futureValue.toLocaleString("en-IN")}
                                    </p>
                                    <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                        Additional funds required to meet expenses
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-textdark font-bold mb-4">
                                        ₹{results.additionalFund.toLocaleString("en-IN")}
                                    </p>
                                    <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                        One time investment required
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-textdark font-bold mb-4">
                                        ₹{results.lumpsum.toLocaleString("en-IN")}
                                    </p>
                                    <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                        Monthly Investment required
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-textdark font-bold">
                                        ₹{results.monthlyInvest.toLocaleString("en-IN")}
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
                <h2 className="text-center text-[20px] md:text-3xl lg:text-5xl font-bold text-[#44475B] mt-16">All You Need To Know About <br />
                    Marriage Planning Calculator</h2>
                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        What is a Marriage Calculator?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Let’s be honest for a moment.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        A decent, well-planned wedding in India today can easily cost ₹15–20 lakhs. And if social media trends, destination weddings, and bigger guest lists are anything to go by, the number doesn’t really stop there.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Now fast-forward 10–12 years.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        That same wedding could easily cost ₹40–50 lakhs. Not because you’re being extravagant, but simply because wedding costs rise much faster than normal inflation.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>This is where Prodigy Pro’s Marriage Planning Calculator, developed by BFC Capital, becomes extremely useful.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        It’s a smart, practical tool that doesn’t just tell you what a wedding may cost in the future, but also answers the more important question: <br />How much should I start saving or investing every month so that this doesn’t become stressful later?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>

                        Think of it as a financial blueprint for the big day – showing you the path from today’s savings to tomorrow’s celebration.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        How Does a Marriage Calculator Actually Help?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Most families don’t realise how sharply wedding expenses increase until the wedding year is almost here.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        You dream of a palace wedding in Andaman Island… <br />And then reality hits.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Suddenly, there’s pressure. Loans. Breaking long-term investments. Even dipping into retirement savings. And sometimes, cutting down on things you always imagined for that day.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        A wedding is an emotional, once-in-a-lifetime event. It shouldn’t turn into a financial burden. <br />
                        This is exactly where the marriage planning calculator steps in. It helps in three very practical ways.</p>


                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>1. It Shows the Real Future Cost (No Guesswork)</b> <br />
                        Let’s say a wedding costs ₹15 lakhs today.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>

                        Assume wedding inflation at around 9% (which is realistic in India). In 15 years, that same wedding may cost close to ₹54 lakhs.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>

                        That number can feel overwhelming – but seeing it early is actually empowering. It gives you time. Time to plan, invest, and spread the cost over years instead of panicking at the last minute.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>2. It Breaks a Big Goal into Simple Monthly Savings</b> <br />
                        ₹50 lakhs sounds scary. <br />₹7,000–₹8,000 a month? Much more manageable.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>

                        This calculator converts a large future expense into clear, doable monthly action. It tells you exactly how much to save or invest regularly so that the goal doesn’t feel impossible.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        This is where planning replaces anxiety.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>3. It Helps Prevent Overspending Later</b> <br />
                        We’ve all seen it happen.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Extra guests. <br />A better venue. <br />A fancier photographer. <br />Last-minute upgrades everywhere.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        When you already know your financial boundary well in advance, decisions become easier. You can choose your luxuries consciously instead of reacting emotionally at the last moment.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>

                        One important thing to note: <br />This tool works beautifully for both parents and young couples.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>

                        Parents can start planning when their children are young (10–15 years away). <br />Couples planning their own wedding in 2–5 years can use it to understand how much to set aside every month.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        How to Use Marriage Planning Calculator
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>The beauty of this tool lies in its simplicity. You just enter:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Current Age - your child’s or your own, to know the time left.</li>
                        <li>Marriage Age - expected age of marriage (e.g., 28 years).</li>
                        <li>Current Cost of Wedding - say ₹30 lakhs.</li>
                        <li>Annual Savings (if any) - Money already set aside specifically for this goal.</li>
                        <li>Expected Return Rate - depending on your investment, you need to enter the expected rate of return. Let’s say you are investing in an large cap equity mutual fund, so this figure should lie between 12-14%. </li>
                        <li>Expected Inflation Rate - usually 8-10% for Indian weddings.</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Hit calculate, and in seconds, you’ll see:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>
                            The inflation-adjusted cost of the wedding.</li>
                        <li>Future value of your savings.</li>
                        <li>The monthly SIP or one-time investment needed to cover the gap.</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        For Example:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Daughter’s age: 10 years</li>
                        <li>Marriage age: 28 years</li>
                        <li>Current wedding cost: ₹30 lakhs</li>
                        <li>Annual savings:₹ 20,000</li>
                        <li>Expected inflation: 8%</li>
                        <li>Expected returns: 14%</li>
                    </ul>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Future wedding cost after adjusting for inflation: ₹1,19,88,058 <br />Future value of existing savings: ₹13,67,881 <br />Additional funds required: ₹1,06,20,177 <br />
                        Required monthly SIP: ₹11,015 for 18 years <br />
                        Lump sum investment needed today: ₹10,04,256</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        This way, you don’t leave anything to chance.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        What Makes a Good Marriage Calculator?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Not all calculators are built with Indian realities in mind.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        Here’s why BFC Capital's Marriage Calculator stands out:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Realistic inflation assumptions for Indian weddings</li>
                        <li>Goal-based clarity – SIP or lump sum, not just numbers</li>
                        <li>Clean and simple interface – no confusing jargon</li>
                        <li>Balances other goals like education and retirement without overlap</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>It helps you plan a wedding without disturbing the rest of your financial life.</p>

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
