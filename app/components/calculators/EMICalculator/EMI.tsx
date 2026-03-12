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

export default function EMICalculator() {
    const questions = [
        {
            question: "How accurate are SIP Calculator results?",
            answer:
                "It’s mostly accurate. The calculator gives you a projected figure, not a guaranteed figure.",
        },
        {
            question: "Can the SIP Calculator help in retirement planning?",
            answer:
                "Yes, it does by estimating how much money your regular investments can grow over time, showing the corpus you can accumulate by retirement. This allows you to set monthly investment goals and track your progress. SIP Calculators also highlight the importance of starting early and staying invested consistently.",
        },
        {
            question: "What inputs are required in a SIP Calculator?",
            answer:
                "Usually, the monthly savings, expected rate of return and investment horizon or time duration of the SIP are all you need to enter to get results.",
        },
        {
            question: "Is SIP 100% safe?",
            answer:
                "No, a SIP is not completely risk-free, as all investments in the equity market carry some risk. However, SIPs do help reduce risk compared to lump-sum investments by spreading investments over time, known as rupee cost averaging, and reducing the impact of market volatility, especially over the long term",
        },
        {
            question: "Can I invest 100 rupees in SIP?",
            answer:
                "Some schemes allow you to start your SIPs with an amount as low as 100 rupees as well, making SIPs affordable and within reach of every kind of investor.",
        },
    ];

    interface ChartState {
        options: ApexOptions;
        series: { name: string; data: number[] }[];
    }
    const [investmentPeriod, setInvestmentPeriod] = useState<number>(10);
    const [monthlySaving, setMonthlySaving] = useState<number>(10000);
    const [monthlySaving1, setMonthlySaving1] = useState<number>(10000);
    const [expectedRateOfReturn, setExpectedRateOfReturn] =
        useState<string | number>(16.5);

    const [gains, setGains] = useState<number>(3017292);
    const [totalYear, setTotalYear] = useState<number>(10);
    const [totalGains, setTotalGains] = useState<number>(3058780);
    const [totalMonthlySaving, setTotalMonthlySaving] = useState<number>(1200000);
    const [oneMonthSaving, setOneMonthSaving] = useState<number>(10000);
    const [investmentPeriod1, setInvestmentPeriod1] = useState<number>(10);

    const yearInString = (currentTotalYear: number = totalYear): string[] => {
        let xAxisArray: string[] = [];
        if (currentTotalYear > 16) {
            for (let i = 1; i <= currentTotalYear; i += 2) xAxisArray.push(i + "Y");
            if (currentTotalYear % 2 === 0) xAxisArray.push(currentTotalYear + "Y");
        } else {
            for (let i = 1; i <= currentTotalYear; i++) xAxisArray.push(i + "Y");
        }
        return xAxisArray;
    };

    const valueForGraph = (data: number, currentTotalYear: number = totalYear): number[] => {
        let graphValue: number[] = [];
        if (currentTotalYear > 16) {
            for (let i = currentTotalYear; i > 0; i -= 2)
                graphValue.push(Math.round(data / i));
            if (currentTotalYear % 2 === 0) graphValue.push(Math.round(data));
        } else {
            for (let i = currentTotalYear; i > 0; i--) graphValue.push(Math.round(data / i));
        }
        return graphValue;
    };

    const [chartState, setChartState] = useState<ChartState>({
        series: [
            { name: "Market Value", data: valueForGraph(gains + totalMonthlySaving) },
            { name: "Invested Amount", data: valueForGraph(totalMonthlySaving) },
        ],
        options: {
            legend: {
                show: false,
            },
            chart: {
                height: 350,
                type: "area",
                background: "transparent",
                toolbar: { show: false },
                zoom: { enabled: false },
            },
            dataLabels: { enabled: false },
            stroke: {
                curve: "monotoneCubic",
                width: [2, 2],
                colors: ["#357AF6", "#57BE65"],
            },
            xaxis: { categories: yearInString() },
            grid: { show: false },
        },
    });

    const calculateSip = () => {
        if (!monthlySaving || !expectedRateOfReturn) {
            toast.error("Please make sure all required fields are filled in.")
            return;
        }
        else {
            let monthlyRate = Number(expectedRateOfReturn) / 12 / 100;
            let months = investmentPeriod * 12;
            let futureValue =
                ((monthlySaving * (Math.pow(1 + monthlyRate, months) - 1)) /
                    monthlyRate) *
                (1 + monthlyRate);

            let mainResults = Math.round(futureValue);
            let totalSaving = monthlySaving * months;
            let gain = mainResults - totalSaving;

            setGains(Math.round(gain));
            setTotalYear(investmentPeriod);
            setTotalMonthlySaving(totalSaving);
            setTotalGains(totalSaving + gain);
            setInvestmentPeriod1(investmentPeriod);
            setMonthlySaving1(monthlySaving);

            // Update chart dynamically
            setChartState((prevState) => ({
                series: [
                    { name: "Market Value", data: valueForGraph(totalSaving + gain, investmentPeriod) },
                    { name: "Invested Amount", data: valueForGraph(totalSaving, investmentPeriod) },
                ],
                options: {
                    ...prevState.options,
                    xaxis: { categories: yearInString(investmentPeriod) },
                },
            }));
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
                    <span className="text-[#7A7A7A] font-semibold" style={{
                        background: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent"
                    }}>Calculators</span>
                    <ChevronRight
                        className="h-4 w-4 mx-2"
                        style={{ stroke: "url(#chevron-gradient)" }}
                    />
                    <span className="text-[#7A7A7A] font-semibold" style={{
                        background: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent"
                    }}>SIP Calculator</span>
                </nav>
                {/* Title */}
                <h2 className="text-[20px] md:text-3xl lg:text-5xl font-bold text-[#44475B]">
                    SIP Calculator
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
                                            MONTHLY SAVING
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={monthlySaving}
                                            min={0}
                                            onChange={(e) =>
                                                setMonthlySaving(parseFloat(e.target.value))
                                            }
                                            placeholder="₹ 10,000"
                                        />
                                    </div>

                                    {/* Expected Rate of Return */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            EXPECTED RATE OF RETURN (% P.A)
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

                                    {/* Investment Period */}
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-[#44475B] font-medium text-sm uppercase">
                                                INVESTMENT PERIOD
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

                                    {/* Button */}
                                    <button
                                        type="button"
                                        onClick={calculateSip}
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
                                        <strong>₹{monthlySaving1.toLocaleString("en-IN")}</strong>{" "}
                                        per month for a period of{" "}
                                        <strong>{investmentPeriod1} years</strong>, your investment
                                        amount will be{" "}
                                        <strong>
                                            ₹{totalMonthlySaving.toLocaleString("en-IN")}
                                        </strong>{" "}
                                        and the maturity amount will grow to{" "}
                                        <strong>₹{totalGains.toLocaleString("en-IN")}</strong>.
                                    </p>
                                </div>

                                {/* Chart Card */}
                                <div className="shadow-md rounded-2xl px-5 py-4 bg-[#FFFFFF]">
                                    <ReactApexChart
                                        options={chartState.options}
                                        series={chartState.series}
                                        type="area"
                                        height={350}
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
                    SIP Calculator</h2>
                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        What is an SIP Calculator?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Let’s keep this simple. <br />
                        Imagine you put aside ₹3,000 every month in a piggy bank. After one year, you’d have ₹36,000. No surprises there.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Now imagine if that same money didn’t just sit quietly in a corner, but actually worked for you. It earned returns. And then those returns started earning returns too.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        That’s what investing does.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        One of the easiest and most comfortable ways to start investing is through an SIP (Systematic Investment Plan). And to understand where your SIP could realistically take you, you need a tool that shows the picture clearly. That’s where the Prodigy Pro SIP Calculator, developed by BFC Capital – a SEBI-registered investment advisor (RIA), comes in.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>A SIP Calculator is a simple online tool that helps you estimate how much your regular monthly investments may grow over time. Think of it like checking Google Maps before starting a journey– you may not know every turn, but at least you know where you’re headed.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        How Can a SIP Calculator Help You?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Investing without a plan is like saying, “Let’s just drive and see where we land.” Sounds fun, but not when your money is involved. <br />A SIP calculator brings clarity where confusion usually exists.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        It helps you set clear goals</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Maybe you want ₹50 lakhs for your child’s higher education in 20 years. <br />Or ₹15 lakhs for a wedding after 3 years. <br />Instead of guessing, the calculator tells you how much you need to invest every month to realistically reach those goals.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>It shows you the real power of compounding <br />
                        This is where things get interesting. For example, if you invest ₹5,000 every month for 10 years and earn an average return of 12%:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <li>Total amount invested: ₹6 lakhs</li>
                        <li>Approximate value after 10 years: ₹11.5 lakhs</li>
                    </ul>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        You didn’t double your effort. Time and compounding did the heavy lifting for you.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 font-bold italic'>
                        It helps build discipline</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>

                        Once you know your target and the monthly amount required, investing stops feeling random. <br />You’re less likely to break your SIP for short-term expenses because now your money has a purpose. SIPs work best when they run quietly in the background – automatically, consistently, and without emotional decisions.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        How Do SIP Calculators Work?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>At its heart, an SIP calculator is built on one powerful idea: <b>compounding</b>.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>You invest a fixed amount every month – no guesswork, no market timing. <br />That money starts earning returns. <br />Those returns don’t just sit there; they get reinvested and begin earning returns of their own.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Over time, this creates a snowball effect. What starts as small, disciplined monthly investments can quietly grow into meaningful wealth.
                        The SIP calculator simply does the number-crunching for you. It shows you what consistency and time can do, without you having to open a spreadsheet or stress over calculations.</p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        At BFC Capital, we believe the real magic isn’t in predicting markets, but in staying invested long enough for compounding to do its job.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        How to Use the Prodigy Pro’s Systematic Investment Plan Calculator?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>The Prodigy Pro’s SIP Calculator is designed to be beginner-friendly and quick. All it takes are three inputs:</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Monthly Savings - e.g., ₹8,000/month.</p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Investment Period - say 10 years.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Expected Return Rate - let’s assume approx-16%.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Hit Calculate, and you’ll instantly see:</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Amount Invested – total money you contributed.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Market Value – total future value you might get after 10 years.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Returns – the profit earned over your investment value.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>Example:</b>
                        ₹8,000/month × 10 years @ 16% return <br />Invested: ₹9,60,000  <br />Future Value: ~₹23.71 lakhs!</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        That’s compounding doing its job silently.</p>

                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        Systematic Investment Plans (SIPs) in India
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        SIPs are one of the easiest and most trusted ways to invest in mutual funds. <br />Instead of investing a large amount in one go, you invest a fixed sum every month on a chosen date – directly from your bank account. No chasing markets, no complicated decisions. Even ₹100 a month is enough to get started, and some SIPs allow you to begin with just ₹100.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>So why do SIPs work especially well in India?</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <li>They fit perfectly into how most of us earn and spend.</li>
                        <li>For salaried individuals, SIPs build a habit of investing – quietly and consistently – much like a monthly bill you pay to your future self.</li>
                        <li>They also take away the pressure of trying to “buy at the right time.” Markets go up, markets go down – but SIPs keep you invested through it all, smoothing out volatility over time.</li>
                        <li>And most importantly, SIPs are designed for long-term goals that truly matter: your child’s education, buying a home, or building a comfortable retirement.</li>
                    </ul>


                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        At BFC Capital, we see SIPs not as a product, but as a behaviour shift, from worrying about markets to trusting the power of time and consistency.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        Types of SIPs
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        SIPs aren’t rigid at all! <br />You can choose what suits your lifestyle.</p>


                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>Step-Up SIP</b> <br />
                        Start small and increase gradually. Example: begin with ₹5,000/month, increase by ₹1000 every year as your salary grows.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>Top-Up SIP</b> <br />
                        Add extra whenever you can. Got a yearly bonus? Add ₹15,000 to your SIP. No compulsion, just flexibility to boost returns.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        Why use Prodigy Pro’s online SIP calculator over others?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Because investing isn’t just about numbers. It’s about clarity and confidence.</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <li> <b>See the long-term picture</b> <br />It helps you understand how something as small as ₹500 a month today can quietly grow into lakhs over time. No hype, just realistic long-term clarity.</li>
                        <li> <b>Plan with a purpose</b> <br />Have a specific goal in mind? The calculator shows how much you need to invest to reach it, so your SIP isn’t random. It’s intentional.</li>
                        <li> <b>Simple to use</b> <br />Clean, quick, and easy to understand. No jargon, no clutter. Just the numbers that actually matter.</li>
                        <li> <b>Make smarter choices before you commit</b> <br />Compare different SIP amounts and timelines before starting, so you invest with confidence, not guesswork.</li>
                        <li> <b>Complete transparency</b> <br />You clearly see how much you’ve invested and how much you’ve earned. No surprises. No hidden assumptions.</li>
                    </ul>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>

                        At the end of the day, money management comes down to two simple things: clarity and consistency. <br />Whether you are planning for your child’s future, your dream home, or simply building a safety cushion for tomorrow, this tool removes guesswork and replaces it with a clear, practical roadmap.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        At BFC Capital, a SEBI Registered Investment Adviser, we believe investing does not have to feel complicated or exclusive. It is about taking small, consistent steps and staying the course.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>

                        So the next time investing feels “too complex” or “only meant for experts,” remember this. All it takes is a fixed amount, a fixed date, and a simple tool like Prodigy Pro’s SIP calculator to start building wealth that keeps working even while you sleep</p>
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
