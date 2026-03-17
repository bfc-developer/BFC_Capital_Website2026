"use client";

import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import dynamic from "next/dynamic";


// Dynamically import ApexChart to avoid SSR "window is not defined" error
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});
import { ApexOptions } from "apexcharts";
import RangeBar from "@/app/components/common/RangeBar";
import { toast } from "react-toastify";
import { ChevronRight } from "lucide-react";

export default function LumpsumCalculator() {
    const questions = [
        {
            question: "What is the difference between a lump sum and an SIP?",
            answer:
                "Lump sum means investing a large amount at once. SIP involves investing smaller amounts at regular intervals. Lump sum works well when you have surplus cash, while SIP encourages discipline and suits salaried investors with steady monthly income.",
        },
        {
            question:
                "How accurate is the calculator for estimating mutual fund returns?",
            answer:
                "The calculations are mathematically accurate, but returns are estimates, not guarantees. Actual returns depend on market performance.",
        },
        {
            question: "What is the maximum investment duration supported?",
            answer:
                "There’s no fixed limit. You can choose 10, 20, even 30 years, it is fully customisable.",
        },
        {
            question: "Is there any minimum amount needed for a lump sum investment?",
            answer: "Yes. Most mutual funds require a minimum lump sum investment of ₹5,000.",
        },
        {
            question: "When is the right time to invest a lump sum in mutual funds?",
            answer: "There is no “perfect” time. Lump-sum investments work best when you have surplus money and a long enough time horizon to ride out market ups and downs. At BFC Capital, the focus is always on aligning the investment approach with your goals, risk tolerance, and time horizon and not on timing the market.",
        },
    ];

    // form states
    const [investAmount, setInvestAmount] = useState("50000");
    const [investAmount1, setInvestAmount1] = useState("50000");
    const [rateOfReturn, setRateOfReturn] = useState<string | number>(12);
    const [rateOfReturn1, setRateOfReturn1] = useState<number>(12);
    const [period, setPeriod] = useState<any>(10);
    const [period1, setPeriod1] = useState<any>(10);

    // result states
    const [result, setResult] = useState<{
        invested: number;
        maturity: number;
        gain: number;
    }>({ invested: 0, maturity: 0, gain: 0 });

    const [chartData, setChartData] = useState<{
        options: ApexOptions;
        series: any[];
    }>({
        options: {},
        series: [],
    });
    useEffect(() => {
        handleCalculate();
    }, []);
    // calculate function
    const handleCalculate = () => {
        if (!investAmount || !rateOfReturn) {
            toast.error("Please make sure all required fields are filled in.");
            return;
        } else {
            setRateOfReturn1(Number(rateOfReturn));
            setInvestAmount1(investAmount);
            const principal = parseFloat(investAmount);
            const rate = rateOfReturn;
            const years = parseFloat(period);

            if (isNaN(principal) || isNaN(Number(rate)) || isNaN(years)) return;

            // compound interest for lumpsum
            const maturityAmount = principal * Math.pow(1 + Number(rate) / 100, years);
            const investedAmount = principal;
            const gain = maturityAmount - investedAmount;

            setResult({
                invested: Math.round(investedAmount),
                maturity: Math.round(maturityAmount),
                gain: Math.round(gain),
            });

            // --- Build yearly data for chart ---
            const investedArr: number[] = [];
            const gainArr: number[] = [];
            for (let i = 1; i <= years; i++) {
                const startOfYear = Math.round(
                    principal * Math.pow(1 + Number(rate) / 100, i - 1),
                );
                const endOfYear = Math.round(principal * Math.pow(1 + Number(rate) / 100, i));
                investedArr.push(startOfYear);
                gainArr.push(endOfYear - startOfYear);
            }

            const yearsArray = Array.from({ length: years }, (_, i) => i + 1);

            const chartOptions: ApexOptions = {
                chart: { type: "bar", stacked: true, toolbar: { show: false } },
                colors: ["#06A358", "#001EFE"],
                plotOptions: {
                    bar: {
                        borderRadius: 4,
                        borderRadiusApplication: "end",
                        horizontal: false,
                    },
                },
                dataLabels: { enabled: false },
                xaxis: {
                    categories: yearsArray,
                    axisTicks: { show: false },
                },
                yaxis: {
                    labels: {
                        formatter: (val) => {
                            if (val >= 10000000) return `${(val / 10000000).toFixed(1)}Cr`;
                            if (val >= 100000) return `${(val / 100000).toFixed(1)}L`;
                            if (val >= 1000) return `${(val / 1000).toFixed(0)}K`;
                            return `${val}`;
                        },
                    },
                },
                tooltip: {
                    shared: true,
                    intersect: false,
                    custom: function ({ series, dataPointIndex }: any) {
                        const investedVal = series[0][dataPointIndex] ?? 0;
                        const gainVal = series[1][dataPointIndex] ?? 0;
                        const total = investedVal + gainVal;
                        const year = yearsArray[dataPointIndex];

                        const fmt = (v: number) => {
                            if (v >= 10000000) return `₹${(v / 10000000).toFixed(2)}Cr`;
                            if (v >= 100000) return `₹${(v / 100000).toFixed(2)}L`;
                            if (v >= 1000) return `₹${(v / 1000).toFixed(2)}K`;
                            return `₹${v.toLocaleString("en-IN")}`;
                        };

                        return `
                        <div style="padding:8px;border-radius:8px;border:1px solid #e6e9ff;background:#fff;">
                            <div><b>Year ${year}</b></div>
                            <div>Total Value: ${fmt(total)}</div>
                            <div>Invested: ${fmt(investedVal)}</div>
                            <div>Gain: <span style="color:green;">${fmt(
                            gainVal,
                        )}</span></div>
                        </div>
                    `;
                    },
                },
                legend: { show: false },
                grid: { show: false },
            };

            setChartData({
                series: [
                    { name: "Invested Value", data: investedArr },
                    { name: "Gain", data: gainArr },
                ],
                options: chartOptions,
            });
            setPeriod1(period);
        }
    };


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

    const [monthlySaving, setMonthlySaving] = useState("1000");
    // const [rateOfReturn, setRateOfReturn] = useState("12");
    // const [period, setPeriod] = useState("10");
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
                    }}>Lump Sum Calculator</span>
                </nav>
                {/* Title */}
                <h2 className="text-[20px] md:text-3xl lg:text-5xl font-bold text-[#44475B]">
                    Lump Sum Calculator
                </h2>
            </div>
            <section>
                <div className="container mx-auto px-4 md:px-15 lg:px-20">

                    <div className="flex flex-col md:flex-row justify-between gap-6">

                        {/* LEFT SIDE */}
                        <div className="w-full md:w-1/2">
                            <div className="shadow-md rounded-2xl px-8 py-5 bg-[#FFFFFF]">

                                <form className="space-y-6">

                                    {/* Monthly Saving */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Invest
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={investAmount}
                                            min={0}
                                            onChange={(e) => setInvestAmount(e.target.value)}
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

                                    <p className="font-primary text-base md:text-lg leading-relaxed text-textdark">
                                        If you invest{" "}
                                        <strong>
                                            ₹{Number(investAmount1).toLocaleString("en-IN")}
                                        </strong>{" "}
                                        for a period of {period1} years at a{" "}
                                        <strong>{rateOfReturn1}%</strong> annual return, the
                                        maturity amount will grow to{" "}
                                        <strong>₹{result.maturity.toLocaleString("en-IN")}</strong>.
                                    </p>
                                </div>

                                {/* Chart Card */}
                                <div className="shadow-md rounded-2xl px-5 py-4 bg-[#FFFFFF]">
                                    {chartData.series.length > 0 ? (
                                        <>
                                            <ReactApexChart
                                                options={chartData.options}
                                                series={chartData.series}
                                                type="bar"
                                                height={350}
                                            />
                                            <p style={{ textAlign: "center" }}>
                                                Assuming returns of {rateOfReturn}%
                                            </p>
                                        </>
                                    ) : (
                                        <div className="text-center text-muted py-5">
                                            Calculate to view chart
                                        </div>
                                    )}
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
                <h2 className="text-center text-[20px] md:text-3xl lg:text-5xl font-bold text-[#44475B] mt-16">All You Need To Know About <br />Lump Sum Calculator</h2>
                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        What Is a Lump Sum Calculator?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Investing isn&apos;t about parking money.<br />It&apos;s about putting it to work – patiently, purposefully, and profitably.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Now, not everyone likes monthly SIPs. Some people receive a bonus, an inheritance, sell a property, or simply have disciplined savings sitting idle in the bank. When that happens, the natural question is:</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>“What if I invest this amount all at once?”</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>That’s where a Lump Sum Calculator comes in.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Think of it as a reality check, or better, a crystal ball. It shows you how big your one-time investment can become if you give it time and let compounding do its job.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>For example:</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>You have ₹10,00,000 lying idle, earning around 3% in a savings account.<br />Now plug the same amount into a lump sum calculator and assume a 14% return over 10 years and suddenly, you see it crossing ₹37,00,000.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Same money. Very different outcome.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>That perspective is exactly what this tool gives you.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>At BFC Capital, we often remind investors:<br />It&apos;s not just how much you invest, it’s how long you let it work.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        How Does a Lump Sum Calculator Work?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>At its heart, the lump sum calculator is powered by one simple concept: compounding.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Your money earns returns.<br />Those returns are reinvested.<br />And over time, growth starts accelerating.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>You just need three inputs:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Investment Amount – the one-time amount you’re investing</li>
                        <li>Expected Rate of Return – say 10%, 12%, or 14%, depending on the fund</li>
                        <li>Time Horizon – 5 years, 10 years, 20 years… or longer</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Click calculate, and the tool instantly shows you:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Present Value (what you invested)</li>
                        <li>Future Value (what it can grow into)</li>
                        <li>Gain (the wealth created over time)</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'><b>Example</b><br />₹10,00,000 invested for 10 years at 14% grows to ₹37,07,221</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>No drama. No trading. Just steady compounding doing its thing.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        Lump Sum vs SIP: What’s the Difference?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Both are valid ways to invest in mutual funds, but the difference lies in how you enter the market.</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li><b>Lump Sum:</b><br />You invest a large amount at one go, typically from savings, bonuses, or windfalls.</li>
                        <li><b>SIP:</b><br />You invest smaller amounts regularly, monthly, quarterly, half-yearly, etc.</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>So, which one is better?</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>There’s no universal answer.</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Have spare cash and patience? Lump sum can work well.</li>
                        <li>Prefer discipline and risk averaging? SIP makes more sense.</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Good planning often uses both, depending on cash flows and goals.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        How Can a Lump Sum Calculator Help You?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>This isn’t just a calculator. It’s a decision compass.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 font-bold'>1. Clear Goal Planning</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Retirement. Your child’s post graduation. That seaside villa in Mumbai.<br />The calculator shows how far one smart investment can take you.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 font-bold'>2. Clarity Over Guesswork</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Instead of “this should be enough,” you get real numbers and realistic estimates.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 font-bold'>3. Keeps You Invested for the Long Term</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Watching your money snowball over decades builds respect for compounding, and reduces the urge to exit early.</p>

                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        How to Use Lump Sum Calculator
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>It’s refreshingly simple.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Step 1: Enter your investment amount<br />Example: ₹10,00,000</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Step 2: Select your time horizon<br />Example: 10 years</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Step 3: Enter expected return<br />Example: 14%</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Step 4: Click “Calculate”</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>And instantly, you’ll see:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Initial Investment: ₹10,00,000</li>
                        <li>Future Value: ₹37,07,221</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Your money growing more than 3.5x in 15 years – not as savings, but as wealth.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        Advantages of Using a Lump Sum Calculator
                    </p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Saves Time: No Excel sheets or formulas</li>
                        <li>Builds Confidence: Decisions backed by numbers</li>
                        <li>Accuracy: Uses standard compounding logic</li>
                        <li>Goal-Oriented: Helps align today’s money with tomorrow’s needs</li>
                        <li>Discipline Booster: Seeing long-term growth discourages impulsive exits</li>
                    </ul>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        Final Thoughts
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        A Lump Sum Calculator turns vague financial hopes into clear, number-backed plans.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Whether you’re new to investing or already familiar with the markets, this tool ensures you’re not investing blindly or relying on assumptions.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        So the next time you receive a bonus, profit, or windfall, don’t let it sit idle.<br />
                        Run it through the lump sum calculator.<br />
                        Explore the possibilities.<br />
                        And then decide with confidence.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Because investing isn’t about chance.<br />
                        It’s about clarity, planning, and conviction, and this calculator gives you all three.</p>
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
