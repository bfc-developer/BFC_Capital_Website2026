"use client";

import { useEffect, useState } from "react";
import RangeBar from "../../common/RangeBar";
import { Form, Button } from "react-bootstrap";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
// ✅ Dynamically import ApexChart (client-side only)

// ✅ Dynamically import ApexChart (client-side only)
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

import { toast } from "react-toastify";

export default function EMICalculator() {
    const questions = [
        {
            question: "Can I calculate EMI for a car loan using this tool?",
            answer:
                "Yes, just enter your car loan amount, tenure, and interest rate. Within seconds, you’ll know your exact EMI.",
        },
        {
            question: "How does loan tenure affect EMI amount?",
            answer:
                "Longer tenure means smaller EMI but higher total interest. Shorter tenure means higher EMI but less total cost.",
        },
        {
            question:
                "What inputs are required in the Education Planning Calculator?",
            answer:
                "Just enter the child’s current age, target age, education duration, today’s costs, inflation, and return assumptions.",
        },
        {
            question: "Does the EMI Calculator show interest and principal breakup?",
            answer:
                "Absolutely. You’ll see how much of your EMI goes into paying interest vs the actual loan.",
        },
        {
            question: "Can I calculate EMIs for multiple loans at once?",
            answer:
                "You can’t do it all at once, but you can run the calculator separately for each loan and add them up to see your total monthly outgo.",
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
    // const [period, setPeriod] = useState("10");

    // -------------------- CALCULATION STATES --------------------
    const [loanAmount, setLoanAmount] = useState<number>(100000);
    const [interest, setInterest] = useState<string | number>(12);
    const [period, setPeriod] = useState<number>(10);

    const [monthlyEmi, setMonthlyEmi] = useState<number>(1434);
    const [principal, setPrincipal] = useState<number>(100000);
    const [totalInterest, setTotalInterest] = useState<number>(72165);
    const [totalAmount, setTotalAmount] = useState<number>(172165);

    // -------------------- EMI CALCULATION --------------------
    const handleCalculate = (e: React.FormEvent) => {
        e.preventDefault();

        if (!loanAmount || !interest) {
            toast.error("Please make sure all required fields are filled in.");
            return;
        } else {
            const totalMonths = period * 12;
            const monthlyRate = Number(interest) / 12 / 100;

            const emi =
                (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
                (Math.pow(1 + monthlyRate, totalMonths) - 1);

            const totalAmt = emi * totalMonths;
            const totalInt = totalAmt - loanAmount;

            setMonthlyEmi(Math.trunc(emi));
            setPrincipal(loanAmount);
            setTotalInterest(Math.trunc(totalInt));
            setTotalAmount(Math.trunc(totalAmt));
        }
    };

    const formatINRShort = (v: number) => {
        if (v >= 10000000) return `${(v / 10000000).toFixed(1)}Cr`;
        if (v >= 100000) return `${(v / 100000).toFixed(1)}L`;
        if (v >= 1000) return `${(v / 1000).toFixed(1)}K`;
        return v.toLocaleString("en-IN");
    };

    // -------------------- CHART DATA --------------------
    const chartOptions: ApexOptions = {
        dataLabels: { enabled: false },
        tooltip: { enabled: false },
        colors: ["#1A35FE", "#CCD2FF"],
        labels: [
            `Principal Amount (${formatINRShort(principal)})`,
            `Total Interest (${formatINRShort(totalInterest)})`,
        ],

        legend: {
            show: true,
            position: "bottom" as "bottom" | "top" | "left" | "right",
            horizontalAlign: "center",
            fontSize: "14px",
            markers: { size: 12 }, // ✅ correct
        },
        states: {
            hover: { filter: { type: "none" } },
            active: { filter: { type: "none" } },
        },
    };
    const chartSeries = [principal, totalInterest];

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
                    }}>EMI Calculator</span>
                </nav>
                {/* Title */}
                <h2 className="text-[20px] md:text-3xl lg:text-5xl font-bold text-[#44475B]">
                    EMI Calculator
                </h2>
            </div>
            <section>
                <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
                    <div className="flex flex-col md:flex-row justify-between gap-6">

                        {/* LEFT SIDE */}
                        <div className="w-full md:w-1/2">
                            <div className="shadow-md rounded-2xl px-8 py-5 bg-[#FFFFFF]">

                                <form className="space-y-6">

                                    {/* Monthly Saving */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Loan Amount
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

                                    {/* Expected Rate of Return */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Interest Rate (%)
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

                                    {/* Button */}
                                    <button
                                        type="button"
                                        onClick={handleCalculate}
                                        className="bg-[#04B488] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition p-[14px]"
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
                                    <h2 className="font-primary font-semibold text-2xl leading-tight text-textdark mb-3">
                                        Result
                                    </h2>

                                    <div className="row">
                                        <div className="col-6 result-container marriageplanning">
                                            <div className="result-item">
                                                <p>Your monthly EMI</p>
                                                <h3>₹{monthlyEmi.toLocaleString("en-IN")}</h3>
                                            </div>
                                        </div>
                                        <div className="col-6 result-container marriageplanning">
                                            <div className="result-item">
                                                <p>principle</p>
                                                <h3>₹{principal.toLocaleString("en-IN")}</h3>
                                            </div>
                                        </div>
                                        <div className="col-6 result-container marriageplanning">
                                            <div className="result-item">
                                                <p>Total Interest</p>
                                                <h3>₹{totalInterest.toLocaleString("en-IN")}</h3>
                                            </div>
                                        </div>
                                        <div className="col-6 result-container marriageplanning">
                                            <div className="result-item">
                                                <p>Total Amount</p>
                                                <h3>₹{totalAmount.toLocaleString("en-IN")}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Chart Card */}
                                <div className="shadow-md rounded-2xl px-5 py-4 bg-[#FFFFFF]">
                                    <Chart
                                        options={chartOptions}
                                        series={chartSeries}
                                        type="donut"
                                        width="100%"
                                    />
                                </div>

                                {/* Invest Now Button */}
                                <div>
                                    <Link
                                        href="https://app.prodigypro.co.in/"
                                        className="inline-block py-3 rounded-lg font-semibold transition bg-color-[#FFFFFF]"
                                    >
                                        <span className="bg-gradient-to-r from-[#04B488] to-[#011EFE] bg-clip-text text-transparent">
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
                    EMI Calculator</h2>
                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        What Is an EMI Calculator?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Picture this.<br />
                        Dhruv and Shruti, newly married, standing inside a sample flat. The builder tells them that the flat costs 50 lakhs; all they have to do is give the EMIs. Sounds easy, right?</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Sounds harmless. Almost casual.<br />
                        Until the EMI number is spoken out loud – and suddenly, reality checks in.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Can our salaries really stretch this far?<br />
                        What if expenses go up?<br />
                        What if one income is disrupted?</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        This is exactly where an EMI calculator steps in – quietly, honestly, and without sales talk.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        At <b>BFC Capital</b>, we’ve seen one pattern repeat itself over decades:<br />
                        People don’t struggle because loans are bad.<br />
                        They struggle because loans are taken without clarity.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        An EMI (Equated Monthly Installment) is the fixed amount you pay every month to your lender. It includes:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li className="font-bold">A portion of your principal</li>
                        <li className="font-bold">A portion of the interest</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        An EMI calculator simply tells you the truth upfront – before you commit.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 font-inter'>
                        No waiting for a bank officer.<br />
                        No complicated formulas.<br />
                        No “we’ll manage somehow” optimism.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 font-inter'>
                        Just clean, instant numbers that help you decide responsibly.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        How an EMI Calculator Actually Helps You
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Loans aren't just financial decisions.<br />
                        They're emotional ones – a home, security, comfort, responsibility.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        But beneath every loan is a silent question:<br />
                        “Will this EMI choke my monthly life?”</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Here's how an EMI calculator answers that question clearly.</p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>1. It Gives You Financial Clarity</b><br />
                        Say you’re considering a ₹20 lakh home loan.<br />
                        Without a calculator, you’re guessing. With one, you know.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        The EMI calculator shows you the approximate monthly outgo — no sugar-coating.<br />
                        That clarity alone saves people from years of stress.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        At BFC Capital, we firmly believe:<br />
                        <i>A loan should fit into your life – not take it over.</i></p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>2. It Saves Time & Costly Errors</b><br />
                        Manual calculations often miss the real villain: interest over time.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        We've seen people shocked years later when they realise they've paid lakhs more than expected – simply because no one showed them the full picture.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        An EMI calculator does this instantly and accurately.<br />
                        No human bias. No rounding errors. Just facts.</p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>3. It Helps You Plan Life Around the EMI</b><br />
                        Let's say you earn ₹1,00,000 per month.<br />
                        The calculator shows your EMI will be ₹35,000.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        That immediately answers:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>How much is left for household expenses?</li>
                        <li>Can you still invest?</li>
                        <li>Will emergencies break the budget?</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        This is the difference between hoping and planning.</p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>4. It Lets You Compare Loan Offers Properly</b><br />
                        Banks love advertising “low interest rates.”<br />
                        But a 0.5% difference can quietly cost you thousands every year.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Using the calculator, you can compare:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>9% vs 9.5% interest</li>
                        <li>5-year vs 10-year tenure</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Small tweaks. Big long-term impact.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        This is why, as a SEBI RIA, BFC Capital always encourages comparison before commitment not regret after.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        How to Use EMI Calculator – It’s Easier Than You Think!
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Honestly, it’s easier than scrolling Instagram.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 uppercase font-bold text-sm'>
                        Step 1: Enter the Loan Amount</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        ₹20 lakh for a car, or ₹50 lakh for a home.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 uppercase font-bold text-sm'>
                        Step 2: Enter the Interest Rate</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Use your bank’s quoted rate. Exploring? Enter 9-10%.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 uppercase font-bold text-sm'>
                        Step 3: Choose the Tenure</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Shorter tenure -&gt; higher EMI, lower interest</li>
                        <li>Longer tenure -&gt; lower EMI, higher total cost</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 uppercase font-bold text-sm'>
                        Step 4: Click Calculate</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        You instantly see:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Monthly EMI</li>
                        <li>Interest vs principal breakup</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        No confusion. No assumptions.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        A Simple, Real-Life Scenario
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Meet Eshaan.<br />
                        He's salaried and planning a ₹10 lakh home loan at 10% interest for 12 years.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Here’s what the calculator shows:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Principal Amount: ₹10 lakh</li>
                        <li>Monthly EMI: ₹11,950</li>
                        <li>Total Interest Payable: ₹7.2 lakh</li>
                        <li>Total Amount Payable: ₹17.20 lakh</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        This one calculation does something powerful – it shows Eshaan the full cost of his decision.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        He also notices that:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>A 12-year tenure lowers EMI</li>
                        <li>But increases total interest significantly</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Now he’s choosing with confidence, not pressure.</p>

                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        Why People Rely on EMI Calculators
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Think of it as a calm financial advisor that never gets tired.</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Instant results: no waiting</li>
                        <li>Clear visual breakup of interest vs principal</li>
                        <li>Works for all loans: home, car, personal, business</li>
                        <li>Supports prepayment planning: see how much interest you save</li>
                        <li>Accurate and reliable: unlike verbal assurances</li>
                    </ul>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        A Final Thought from BFC Capital
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Loans are not bad.<br />
                        Unplanned loans are.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Every EMI is a promise you make to your future self.<br />
                        And that promise should be backed by clarity, not optimism.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Before signing anything, spend two minutes with an EMI calculator.<br />
                        Because when your numbers are sorted, life feels lighter – and decisions feel calmer.</p>
                </div>

            </section >
            <section>
                <h2 className="text-center text-[20px] md:text-3xl lg:text-5xl font-bold text-[#44475B] mt-16">FAQs</h2>
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
