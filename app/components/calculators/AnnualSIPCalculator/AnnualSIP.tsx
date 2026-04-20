"use client";
import { useEffect, useState } from "react";

import { Form, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
// import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { ChevronRight } from "lucide-react";
import RangeBar from "@/app/components/common/RangeBar";
import { toast } from "react-toastify";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});

interface ChartState {
    options: ApexOptions;
    series: { name: string; data: number[] }[];
}

export default function AnnualSIP() {
    const questions = [
        {
            question: "Does the calculator include inflation?",
            answer:
                "No. It shows nominal returns. Inflation should be considered separately while setting your goal amount.",
        },
        {
            question: "Can I calculate multiple goals at the same time?",
            answer:
                "Yes, but each goal should be calculated separately for better clarity.",
        },
        {
            question: "What rate of return should I use?",
            answer:
                "Reasonable assumptions should be made based on asset allocation and ideally after consulting a financial advisor.",
        },
        {
            question: "How often should I review my portfolio?",
            answer:
                "Every 6 to 12 months, or sooner if there is a major change in income, expenses, or goals.",
        },
        {
            question: "Can I adjust the annual investment amount?",
            answer:
                "Yes. You can experiment with higher or lower contributions to see how the final corpus changes.",
        },
    ];

    const [amount, setAmount] = useState<number>(100000);
    const [time, setTime] = useState<number>(10);
    const [rate, setRate] = useState<string | number>(12);
    const [result, setResult] = useState<number>(1965458.328);
    const [chartState, setChartState] = useState<ChartState | null>(null);
    const [finalAmount, setFinalAmount] = useState<number>(1000000);

    useEffect(() => {
        const months = time * 12;
    }, [rate, time, amount]);
    useEffect(() => {
        calculateButton();
    }, []);

    const buildYearSeries = (
        yearlyAmount: number,
        rate: number,
        years: number,
    ) => {
        const invested: number[] = [];
        const gain: number[] = [];

        let corpus = 0;

        for (let year = 1; year <= years; year++) {
            // 1️⃣ Invest at START of year
            corpus += yearlyAmount;

            // 2️⃣ Grow entire corpus for the year
            corpus = corpus * (1 + rate / 100);

            const totalInvested = yearlyAmount * year;

            invested.push(Math.round(totalInvested));
            gain.push(Math.round(corpus - totalInvested));
        }

        return { invested, gain };
    };

    // const yearsArray: number[] = Array.from({ length: 15 }, (_, i) => i + 1);

    const calculateButton = () => {
        if (!amount || !rate) {
            toast.error("Please make sure all required fields are filled in.");
            return;
        } else {
            const P = amount;
            const n = time;
            const r = Number(rate) / 100;

            // FV = P * ((1+r)^n - 1) / r * (1+r)
            const fv = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

            setResult(fv);
            setFinalAmount(amount * time);

            const { invested: investedArr, gain: gainArr } = buildYearSeries(
                amount,
                Number(rate),
                time,
            );

            const yearsArray: number[] = Array.from(
                { length: time },
                (_, i) => i + 1,
            );

            const state: ChartState = {
                series: [
                    {
                        name: "Invested Value",
                        data: investedArr,
                    },
                    {
                        name: "Gain",
                        data: gainArr,
                    },
                ],
                options: {
                    legend: {
                        show: false,
                    },

                    chart: {
                        type: "bar",
                        stacked: true,
                        height: 1000,
                        toolbar: {
                            show: false,
                        },
                    },
                    colors: ["#001EFE", "#001EFE"],
                    fill: {
                        type: ["gradient", "gradient"],
                        gradient: {
                            type: "horizontal",
                            colorStops: [
                                // Series 0 — same gradient, low opacity
                                [
                                    { offset: 0, color: "#001EFE", opacity: 0.2 },
                                    { offset: 100, color: "#06A358", opacity: 0.2 },
                                ],
                                // Series 1 — same gradient, full opacity
                                [
                                    { offset: 0, color: "#001EFE", opacity: 1 },
                                    { offset: 100, color: "#06A358", opacity: 1 },
                                ],
                            ],
                        },
                    },
                    plotOptions: {
                        bar: {
                            borderRadius: 3,
                            borderRadiusApplication: "end",
                            horizontal: false,
                        },
                    },
                    tooltip: {
                        shared: true,
                        intersect: false,
                        custom: function ({ series, dataPointIndex }: any) {
                            const investedVal = series[0][dataPointIndex] ?? 0;
                            const gain = series[1][dataPointIndex] ?? 0;
                            const current = investedVal + gain;
                            const year = yearsArray[dataPointIndex];

                            const formatValue = (v: number) => {
                                if (v >= 10000000) return `₹${(v / 10000000).toFixed(2)}Cr`;
                                if (v >= 100000) return `₹${(v / 100000).toFixed(2)}L`;
                                if (v >= 1000) return `₹${(v / 1000).toFixed(2)}K`;
                                return `₹${v.toLocaleString("en-IN")}`;
                            };

                            return `
          <div style="padding:8px; border-radius:8px; border:1px solid #e6e9ff; background:#fff;">
            <div><b>Year: ${year}</b></div>
            <div>Current Value: ${formatValue(current)}</div>
            <div>Invested Value: ${formatValue(investedVal)}</div>
            <div>Gain: <span style="color:green;">${formatValue(
                                gain,
                            )}</span></div>
          </div>
        `;
                        },
                    },
                    xaxis: { categories: yearsArray, axisTicks: { show: false } },
                    yaxis: {
                        labels: {
                            show: true,
                            formatter: function (value: number) {
                                if (value >= 100000) {
                                    return (value / 100000).toFixed(0) + "L";
                                }
                                return value.toString();
                            },
                        },
                    },
                    grid: { show: false },
                    dataLabels: { enabled: false },

                },
            };
            setChartState(state);
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
                    }}>Annual SIP Calculator</span>
                </nav>
                {/* Title */}
                <h2 className="text-[40px] md:text-3xl lg:text-5xl font-bold text-[#44475B]">
                    Annual SIP Calculator
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
                                            How much you can invest Yearly
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={amount}
                                            min={0}
                                            onChange={(e) =>
                                                setAmount(parseFloat(e.target.value))
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
                                                How many Years will you continue the investment
                                            </label>
                                            <span className="font-bold text-[#44475B]">
                                                {time} Yrs
                                            </span>
                                        </div>

                                        <RangeBar
                                            maxLimit={30}
                                            setValue={setTime}
                                            value={time}
                                        />

                                        <div className="flex justify-between text-sm text-[#44475B] mt-2">
                                            <span>1 Yr</span>
                                            <span>30 Yrs</span>
                                        </div>
                                    </div>

                                    {/* Expected Rate of Return */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Expected Rate Of Return (% p.a)
                                        </label>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={rate}
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
                                                    setRate("");
                                                    return;
                                                }

                                                const num = parseFloat(val);

                                                if (val === "." || (!isNaN(num) && num >= 0 && num <= 100)) {
                                                    setRate(val);
                                                }
                                            }}
                                        />
                                    </div>



                                    {/* Button */}
                                    <button
                                        type="button"
                                        onClick={calculateButton}
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
                                            <label className="block text-[rgba(77, 77, 77, 1)] font-medium text-sm uppercase mb-2">
                                                Amount Invested
                                            </label>
                                            <p className="font-primary text-base md:text-lg leading-relaxed text-[rgba(33, 33, 33, 1)] font-bold mb-4">
                                                ₹ {finalAmount.toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block text-[rgba(77, 77, 77, 1)] font-medium text-sm uppercase mb-2">
                                                Future Value of Investment
                                            </label>
                                            <p className="font-primary text-base md:text-lg leading-relaxed text-[rgba(33, 33, 33, 1)] font-bold mb-4">
                                                ₹{Math.round(result).toLocaleString("en-IN")}
                                            </p>
                                        </div>
                                    </div>
                                </div>


                                <div className="row mt-2">
                                    <div className="col-lg-12 co-sm-12 col-md-12 ">
                                        <div className="card border-0 shadow p-0">
                                            <div className="card-body">
                                                {chartState ? (
                                                    <>
                                                        <ReactApexChart
                                                            options={chartState.options}
                                                            series={chartState.series}
                                                            type="bar"
                                                            height={250}
                                                        />
                                                        <p style={{ textAlign: "center" }}>
                                                            Assuming returns of {rate}%
                                                        </p>
                                                    </>
                                                ) : (
                                                    <div className="text-center text-muted py-5">
                                                        Calculate to view chart
                                                    </div>
                                                )}
                                            </div>
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
                                            Invest Now
                                        </span>
                                    </Link>
                                </div>

                            </div>
                        </div>

                    </div>
                </div >
            </section >
            <section>
                <h2 className="text-center text-[28px] md:text-3xl lg:text-5xl font-bold text-[#44475B] mt-16">All You Need To Know About <br />
                    Annual SIP Calculator</h2>
                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        What is an Annual SIP Calculator?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>We all talk about the power of compounding. Invest regularly, stay patient, and over time, money starts working harder than you ever could. But when investments are made once a year instead of monthly, things can get a little unclear.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>How much will your annual investments actually grow into?<br />
                        Is your yearly contribution enough for the goal you have in mind?<br />
                        And are your expectations realistic?</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>This is where the Annual SIP Calculator becomes useful.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Think of it as a reality check for your yearly investments. You enter how much you plan to invest every year, how long you will stay invested, and a reasonable expected rate of return. The calculator then shows you what kind of corpus your discipline can create over time.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>No complex maths. No confusing assumptions. Just clarity.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Why the Annual SIP Calculator Matters
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Long-term planning often feels comfortable in the beginning. You tell yourself, "I am investing every year, so things should work out."</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>But years later, many investors realise that the final amount is lower than expected. Not because they did something wrong, but because small assumptions were never checked early on.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Imagine investing ₹2 lakh every year for 15 years for your child's education, only to realise later that the corpus is not enough. At that stage, time is no longer on your side.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>The Annual SIP Calculator helps prevent this. It shows you upfront what your annual discipline can realistically achieve and whether adjustments are needed.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>At BFC Capital, this kind of clarity is central to how we plan. As a SEBI Registered Investment Advisor, the focus is always on suitability, realistic expectations, and goal alignment rather than optimistic projections.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        How to Use Annual SIP Calculator
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>The process is intentionally simple.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Enter your annual investment amount.<br />For example, ₹5,00,000 per year.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Set your investment horizon.<br />For instance, 15 years until you need the money.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Choose an expected rate of return.<br />Say 14 percent annually, depending on the asset mix chosen.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Click "Calculate".<br />The calculator immediately shows you your estimated future value, and also reflects total invested amount.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Total Invested Amount: ₹ 75,00,000</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Future Corpus: <br /> ₹ 2,49,90,176</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>That's it. No confusion. Just a clear picture of what your annual investing habit can build over time.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Why Use This Calculator Instead of Estimating Yourself?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Many investors roughly estimate returns or rely on past experiences. This often leads to either overconfidence or unnecessary worry.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>1. This calculator helps because it saves time with instant results.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>2. It calculates compounding accurately, which is where most estimates go wrong.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>3. It allows you to test scenarios by changing investment amounts or timelines.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>4. It keeps everything transparent so you know exactly what your plan looks like.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>This approach encourages informed decisions instead of hopeful assumptions.</p>

                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        How Does It Help You Plan Smarter?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>Using the Annual SIP Calculator brings structure to your planning.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>1. It keeps your focus on goals rather than products.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>2. It adapts easily to different annual contribution amounts.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>3. It uses simple and reasonable return assumptions.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>4. It motivates consistency by showing the outcome of discipline.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>5. It allows early course correction while changes are still manageable.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>This is especially important for long-term goals where small improvements today can make a big difference later.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Tips for Using the Calculator Effectively
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>1. Use realistic return expectations based on asset allocation and risk tolerance.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>2. Start early. Even modest annual investments benefit enormously from time.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>3. Review your plan every 6 to 12 months or when life circumstances change.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>4. Diversify across suitable asset classes to balance growth and risk.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>A calculator shows possibilities. Good advice helps align those possibilities with real-life situations.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Who Should Use the Annual SIP Calculator?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>1. Young professionals planning yearly investments for future goals.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>2. Parents investing annually for education or marriage expenses.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>3. Retirement planners estimating wealth creation through yearly discipline.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>4. First-time investors who want clarity before committing.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>5. Experienced investors who want to model different annual investment scenarios.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>If you invest once a year with a goal in mind, this tool is relevant for you.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        See Your Annual Discipline Turn Into Progress
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>A goal without a plan often remains just an intention.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>The Annual SIP Calculator helps convert intention into structure. It shows how your yearly contributions grow, how compounding supports your effort, and where adjustments may be required.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Whether it is ₹50,000 per year or ₹2 lakh per year, the principle stays the same. <br />Clarity builds confidence. Confidence builds consistency.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>And consistency is what ultimately delivers results.</p>
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
