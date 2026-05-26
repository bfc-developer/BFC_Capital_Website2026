"use client";

import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { ApexOptions } from "apexcharts";
import RangeBar from "@/app/components/common/RangeBar";
import { toast } from "react-toastify";
import { ChevronRight } from "lucide-react";

export default function FDCalculator() {
    const questions = [
        {
            question:
                "Does the FD calculator show the maturity amount before or after tax?",
            answer:
                "It shows pre-tax returns. You’ll need to adjust for your tax slab to know the net figure.",
        },
        {
            question: "What information do I need to use the calculator?",
            answer:
                "You only need the investment amount, interest rate, compounding frequency, and investment duration.",
        },
        {
            question:
                "Can I calculate FD returns for senior citizens with higher interest rates?",
            answer:
                "Yes. Just enter the higher interest rate (usually 0.25%-0.75% more) into the calculator.",
        },
        {
            question: "Does the calculator account for TDS (Tax Deducted at Source)?",
            answer: "No. TDS needs to be accounted for separately.",
        },
        {
            question:
                "Can I choose the compounding frequency (monthly, quarterly, yearly)?",
            answer: "Yes. Monthly, quarterly, half-yearly, or annually – you choose based on the bank’s rules.",
        },
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

    // const [monthlySaving, setMonthlySaving] = useState("₹ 100,000");
    // const [rateOfReturn, setRateOfReturn] = useState("12");
    // const [period, setPeriod] = useState("Monthly");

    const compoundOptions = [
        { label: "Monthly", value: 12 },
        { label: "Quarterly", value: 4 },
        { label: "Half-Yearly", value: 2 },
        { label: "Yearly", value: 1 },
    ];

    // FD Calculator States
    const [investmentAmount, setInvestmentAmount] = useState<number>(100000);
    const [period, setPeriod] = useState<number>(10);
    const [interestRate, setInterestRate] = useState<string | number>(6);
    const [compound, setCompound] = useState<number>(12);

    const [totalAmountInvested, setTotalAmountInvested] =
        useState<number>(100000);
    const [totalInterest, setTotalInterest] = useState<number>(81940);
    const [maturityAmount, setMaturityAmount] = useState<number>(181940);

    //   const investmentAmountRef = useRef<{ validate: (value: number) => boolean }>(null);
    //   const interestRateRef = useRef<{ validate: (value: number) => boolean }>(null);

    // FD Calculation
    const calculateFD = () => {
        if (!investmentAmount || !interestRate) {
            toast.error("Please make sure all required fields are filled in.");
            return;
        } else {
            let amt = investmentAmount;
            for (let i = 1; i <= period; i++) {
                amt = amt * Math.pow(1 + Number(interestRate) / (100 * compound), compound);
                amt = parseFloat(amt.toFixed(0));
            }
            setTotalAmountInvested(investmentAmount);
            setTotalInterest(Math.round(amt - investmentAmount));
            setMaturityAmount(Math.round(amt));
        }
    };

    const submitFD = (e: React.FormEvent) => {
        e.preventDefault();
        calculateFD();
    };

    const chartState: {
        options: ApexOptions;
        series: number[];
        colors: string[];
    } = {
        options: {
            dataLabels: { enabled: false },
            colors: ["#001EFE", "#001EFE"],
            fill: {
                type: ["gradient", "gradient"],
                gradient: {
                    type: "horizontal",
                    colorStops: [
                        // Series 0 = Principal → FULL opacity gradient (blue → green)
                        [
                            { offset: 0, color: "#001EFE", opacity: 1 },
                            { offset: 100, color: "#06A358", opacity: 1 },
                        ],
                        // Series 1 = Total Interest → LOW opacity (faint lavender look)
                        [
                            { offset: 0, color: "#001EFE", opacity: 0.15 },
                            { offset: 100, color: "#001EFE", opacity: 0.15 },
                        ],
                    ],
                },
            },
            tooltip: { enabled: false },
            labels: [
                `Total Interest (${totalInterest.toLocaleString("en-IN")})`,
                `Total Invested (${totalAmountInvested.toLocaleString("en-IN")})`,
            ],
            legend: {
                show: true,
                position: "bottom",
                horizontalAlign: "center",
                fontSize: "14px",
                markers: {
                    size: 5,
                    fillColors: ["#06A358", "#001EFE"], // marker colors
                },
            },
            states: {
                hover: { filter: { type: "none" as const } },
                active: { filter: { type: "none" as const } },
            },
        },
        series: [totalInterest, totalAmountInvested],
        colors: ["#fff", "#FF4560"],
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
                            background: "linear-gradient(90deg, #024B39 39.5%, #011EFE 100%)",
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
                            <stop offset="39.5%" stopColor="#024B39" />
                            <stop offset="100%" stopColor="#011EFE" />
                        </linearGradient>
                    </svg>

                    <ChevronRight
                        className="h-4 w-4 mx-2"
                        style={{ stroke: "url(#chevron-gradient)" }}
                    />
                    <Link href="/calculators">
                        <span className="text-[#7A7A7A] font-semibold" style={{
                            background: "linear-gradient(90deg, #024B39 39.5%, #011EFE 100%)",
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
                        // background: "linear-gradient(90deg, #024B39 39.5%, #011EFE 100%)",
                        // WebkitBackgroundClip: "text",
                        // WebkitTextFillColor: "transparent",
                        // backgroundClip: "text",
                        // color: "transparent"
                    }}>FD Calculator</span>
                </nav>
                {/* Title */}
                <h2 className="text-[40px] md:text-3xl lg:text-5xl font-bold text-[#44475B]">
                    FD Calculator
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
                                            Investment Amount
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={investmentAmount}
                                            min={0}
                                            onChange={(e) =>
                                                setInvestmentAmount(parseFloat(e.target.value))
                                            }
                                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                                            onKeyDown={(e) => {
                                                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                                                    e.preventDefault();
                                                }
                                            }}
                                            placeholder="₹ 10,000"
                                        />
                                    </div>

                                    {/* Investment Period */}
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-[#44475B] font-medium text-sm uppercase">
                                                Period
                                            </label>
                                            <span className="font-bold text-[#44475B]">
                                                {period} Yrs
                                            </span>
                                        </div>

                                        <RangeBar
                                            maxLimit={30}
                                            setValue={setPeriod}
                                            value={period}
                                        />

                                        <div className="flex justify-between text-sm text-[#44475B] mt-2">
                                            <span>1 Yr</span>
                                            <span>30 Yrs</span>
                                        </div>
                                    </div>

                                    {/* Expected Rate of Return */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Interest Rate (%)
                                        </label>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={interestRate}
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
                                                    setInterestRate("");
                                                    return;
                                                }

                                                const num = parseFloat(val);

                                                if (val === "." || (!isNaN(num) && num >= 0 && num <= 100)) {
                                                    setInterestRate(val);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Compounding Period
                                        </label>
                                        <Form.Select
                                            className="text-[#212121] w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            value={compound}
                                            onChange={(e) => setCompound(Number(e.target.value))}
                                        >
                                            {compoundOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </div>

                                    {/* Button */}
                                    <button
                                        type="button"
                                        onClick={calculateFD}
                                        className="bg-[#024B39] text-white py-3 rounded-lg font-semibold hover:bg-[#024B39] transition duration-300 p-[14px] cursor-pointer"
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
                                    <label className="block text-[rgba(77, 77, 77, 1)] font-medium text-sm uppercase mb-2">
                                        Total amount invested
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-[rgba(33, 33, 33, 1)] font-bold mb-4">
                                        ₹{totalAmountInvested.toLocaleString("en-IN")}
                                    </p>
                                    <label className="block text-[rgba(77, 77, 77, 1)] font-medium text-sm uppercase mb-2">
                                        Total Interest
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-[rgba(33, 33, 33, 1)] font-bold mb-4">
                                        ₹{totalInterest.toLocaleString("en-IN")}
                                    </p>
                                    <label className="block text-[rgba(77, 77, 77, 1)] font-medium text-sm uppercase mb-2">
                                        Maturity amount
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-[rgba(33, 33, 33, 1)] font-bold mb-4">
                                        ₹{maturityAmount.toLocaleString("en-IN")}
                                    </p>

                                </div>

                                {/* Chart Card */}
                                <div className="shadow-md rounded-2xl px-5 py-4 bg-[#FFFFFF]">
                                    <Chart
                                        options={chartState.options}
                                        series={chartState.series}
                                        type="donut"
                                        width="280"
                                    />
                                </div>

                                {/* Invest Now Button */}
                                {/* <div>
                                    <Link
                                        href="https://app.prodigypro.co.in/"
                                        className="inline-block py-3 rounded-lg font-semibold transition bg-color-[#FFFFFF]"
                                    >
                                        <span className="bg-gradient-to-r from-[#024B39] to-[#011EFE] bg-clip-text text-transparent">
                                            Invest Now
                                        </span>
                                    </Link>
                                </div> */}

                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <section>
                <h2 className="text-center text-[28px] md:text-3xl lg:text-5xl font-bold text-[#44475B] mt-16">All You Need To Know About <br />
                    FD Calculator</h2>
                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        What Is a Fixed Deposit Calculator? (And Why It Deserves More Respect)
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Think of a fixed deposit like a quiet handshake with the bank.<br />
                        You’re saying, "I’ll park my money with you for a few years. You promise to give me a little extra when I come back."</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Simple. Predictable. Comfortable.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        But here's where most people slip up – figuring out how much that “little extra” actually is.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        That's where a Fixed Deposit Calculator steps in.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        Instead of relying on rough estimates, verbal assurances, or confusing formulas, the Prodigy Pro FD Calculator gives you instant clarity. You enter:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Investment amount</li>
                        <li>Interest rate</li>
                        <li>Tenure</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        And with one click, you know:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Your maturity value</li>
                        <li>Your interest earned</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        No guesswork. No assumptions. Just numbers you can trust – before you lock in your money.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 font-inter'>
                        At <b>BFC Capital</b>, this is exactly how we believe decisions should be made: clear first, commit later.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Why Does This Actually Matter?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Let’s be honest.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Nobody enjoys financial surprises – especially the unpleasant kind.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Imagine planning your child's higher education thinking your FD will grow to ₹10 lakhs, only to realise at maturity it's ₹8.5 lakhs because the returns were misunderstood.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        That gap hurts, and not because FDs are bad, but because expectations were wrong.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        The BFC Capital's FD Calculator removes that risk. It helps you plan realistically:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>A dream vacation in 3 years</li>
                        <li>A car purchase in 5 years</li>
                        <li>Or simply a safety net that won’t disappoint</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        When you know your numbers upfront, planning becomes calmer and far more confident.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        How to Use the BFC Capital's FD Calculator
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        It’s designed to be simple – no finance background required.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Step 1: Enter Your Investment Amount<br />
                        Example: ₹2,00,000</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Step 2: Select the Duration<br />
                        Example: 10 years</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Step 3: Input the Interest Rate<br />
                        Example: 8% offered by your bank or NBFC</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Step 4: Choose the Compounding Frequency<br />
                        Monthly, quarterly, half-yearly, or yearly, depending on the bank<br />
                        In this case: Quarterly</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Step 5: Click "Calculate"</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        And instantly, you’ll see:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Maturity Value: ₹4,41,608</li>
                        <li>Total Amount Invested: ₹2,00,000</li>
                        <li>Total Interest Earned: ₹2,41,608</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        No math. No errors. Just clean clarity.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        Why Use FD Calculator Instead of Doing It Yourself?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>1. Saves Time</b><br />
                        No formulas. No spreadsheets. Results in seconds.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>2. Ensures Accuracy</b><br />
                        Manual calculations often go wrong, especially with compounding. The calculator ensures precision every single time.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <b>3. Helps You Plan Better</b><br />
                        Want to experiment?</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>What if you invest for 10 years instead of 5?</li>
                        <li>What if you increase the amount?</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        The impact is visible instantly – which makes decision-making far easier.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>4. Complete Transparency</b><br />
                        You clearly see how much interest you’re earning. No hidden assumptions, no surprises at maturity.</p>

                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Final Word
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Fixed deposits are popular in India for a reason. They’re safe, predictable, and ideal for conservative investors.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        But safe doesn’t mean blind.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        The FD Calculator ensures you invest with your eyes open. Whether it’s ₹50,000 or ₹50 lakhs, it shows you the real outcome before you commit your money.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        So next time you're considering an FD, don't rely only on a banker’s promise.<br />
                        Run the numbers yourself.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Because in finance, clarity isn't just power. It's peace of mind.</p>
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
