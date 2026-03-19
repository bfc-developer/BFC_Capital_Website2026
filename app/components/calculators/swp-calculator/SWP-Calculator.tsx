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

export default function SWPCalculatorComponent() {
    const questions = [
        {
            question: "How does an SWP calculator work?",
            answer:
                "An SWP calculator estimates the remaining value of your investment after regular withdrawals, factoring in expected market returns over a set period.",
        },
        {
            question: "What is the difference between SIP and SWP?",
            answer:
                "While SIP (Systematic Investment Plan) is for building a corpus over time, SWP (Systematic Withdrawal Plan) is for generating a regular income from an existing corpus.",
        },
        {
            question: "Can an SWP calculator help in retirement planning?",
            answer:
                "Absolutely. It helps you determine how much you can safely withdraw each month without exhausting your retirement savings too soon.",
        },
        {
            question: "What is the 4% rule in SWP?",
            answer:
                "A common rule of thumb where withdrawing 4% of your initial corpus annually (adjusted for inflation) is considered safe for a 30-year retirement.",
        },
        {
            question: "Are SWP withdrawals taxable?",
            answer:
                "In an SWP, only the capital gains component of the withdrawal is taxable, making it more tax-efficient than traditional fixed-income options.",
        },
    ];

    interface ChartState {
        options: ApexOptions;
        series: { name: string; data: number[] }[];
    }
    const [totalInvestment, setTotalInvestment] = useState<number>(10000000);
    const [withdrawalAmount, setWithdrawalAmount] = useState<number>(75000);
    const [withdrawalPeriod, setWithdrawalPeriod] = useState<number>(15);
    const [expectedRateOfReturn, setExpectedRateOfReturn] =
        useState<string | number>(10);

    const [totalWithdrawal, setTotalWithdrawal] = useState<number>(13500000);
    const [finalCorpus, setFinalCorpus] = useState<number>(11800000);
    const [totalInvestment1, setTotalInvestment1] = useState<number>(10000000);
    const [withdrawalAmount1, setWithdrawalAmount1] = useState<number>(75000);
    const [withdrawalPeriod1, setWithdrawalPeriod1] = useState<number>(15);

    const [chartState, setChartState] = useState<ChartState>({
        series: [
            { name: "Total Withdrawn", data: [13500000] },
            { name: "Remaining Corpus", data: [11800000] },
        ],
        options: {
            legend: {
                show: true,
                position: "top",
            },
            chart: {
                height: 350,
                type: "bar",
                stacked: true,
                background: "transparent",
                toolbar: { show: false },
                zoom: { enabled: false },
            },
            dataLabels: { enabled: false },
            stroke: {
                width: 1,
                colors: ["#fff"],
            },
            xaxis: {
                categories: ["Growth Breakdown"],
            },
            grid: { show: false },
            colors: ["#04B488", "#011EFE"],
        },
    });

    const calculateSWP = () => {
        if (!totalInvestment || !withdrawalAmount || !expectedRateOfReturn || !withdrawalPeriod) {
            toast.error("Please make sure all required fields are filled in.")
            return;
        }
        else {
            const P = totalInvestment;
            const W = withdrawalAmount;
            const r = Number(expectedRateOfReturn) / 100 / 12;
            const n = withdrawalPeriod * 12;

            // SWP Formula: Final Value = P(1+r)^n - W[((1+r)^n - 1)/r]
            const finalValue = P * Math.pow(1 + r, n) - W * ((Math.pow(1 + r, n) - 1) / r);
            const totalWithdrawn = W * n;

            setTotalWithdrawal(Math.round(totalWithdrawn));
            setFinalCorpus(Math.round(finalValue));
            setTotalInvestment1(P);
            setWithdrawalAmount1(W);
            setWithdrawalPeriod1(withdrawalPeriod);

            // Update chart dynamically
            setChartState((prevState) => ({
                series: [
                    { name: "Total Withdrawn", data: [Math.round(totalWithdrawn)] },
                    { name: "Remaining Corpus", data: [Math.round(finalValue)] },
                ],
                options: {
                    ...prevState.options,
                    xaxis: { categories: ["Growth Breakdown"] },
                    chart: {
                        type: "bar",
                        stacked: true,
                    }
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
                        // background: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
                        // WebkitBackgroundClip: "text",
                        // WebkitTextFillColor: "transparent",
                        // backgroundClip: "text",
                        // color: "transparent"
                    }}>SWP Calculator</span>
                </nav>
                {/* Title */}
                <h2 className="text-[20px] md:text-3xl lg:text-5xl font-bold text-[#44475B]">
                    SWP Calculator
                </h2>
            </div>
            <section>
                <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
                    <div className="flex flex-col md:flex-row justify-between gap-6">

                        {/* LEFT SIDE */}
                        <div className="w-full md:w-1/2">
                            <div className="shadow-md rounded-2xl px-8 py-5 bg-[#FFFFFF]">

                                <form className="space-y-6">

                                    {/* Total Investment */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            TOTAL INVESTMENT
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={totalInvestment}
                                            min={0}
                                            onChange={(e) =>
                                                setTotalInvestment(parseFloat(e.target.value))
                                            }
                                            placeholder="₹ 1,00,00,000"
                                        />
                                    </div>

                                    {/* Withdrawal Amount */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            WITHDRAWAL AMOUNT (MONTHLY)
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={withdrawalAmount}
                                            min={0}
                                            onChange={(e) =>
                                                setWithdrawalAmount(parseFloat(e.target.value))
                                            }
                                            placeholder="₹ 75,000"
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
                                            placeholder="10"
                                            onChange={(e) => {
                                                let val = e.target.value;
                                                val = val.replace(/[^0-9.]/g, "");
                                                const parts = val.split(".");
                                                if (parts.length > 2) {
                                                    val = parts[0] + "." + parts.slice(1).join("");
                                                }
                                                if (val.startsWith("0") && !val.startsWith("0.") && val.length > 1) {
                                                    val = val.replace(/^0+/, "");
                                                }
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
                                                WITHDRAWAL PERIOD
                                            </label>
                                            <span className="font-bold text-[#44475B]">
                                                {withdrawalPeriod} Yrs
                                            </span>
                                        </div>

                                        <RangeBar
                                            maxLimit={50}
                                            setValue={setWithdrawalPeriod}
                                            value={withdrawalPeriod}
                                        />

                                        <div className="flex justify-between text-sm text-[#44475B] mt-2">
                                            <span>1 Yr</span>
                                            <span>50 Yrs</span>
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <button
                                        type="button"
                                        onClick={calculateSWP}
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
                                        If you have a corpus of{" "}
                                        <strong>₹{totalInvestment1.toLocaleString("en-IN")}</strong>{" "}
                                        and withdraw{" "}
                                        <strong>₹{withdrawalAmount1.toLocaleString("en-IN")}</strong>{" "}
                                        per month for{" "}
                                        <strong>{withdrawalPeriod1} years</strong>, your total withdrawal
                                        will be{" "}
                                        <strong>
                                            ₹{totalWithdrawal.toLocaleString("en-IN")}
                                        </strong>{" "}
                                        and your remaining corpus will be{" "}
                                        <strong>₹{finalCorpus.toLocaleString("en-IN")}</strong>.
                                    </p>
                                </div>

                                {/* Chart Card */}
                                <div className="shadow-md rounded-2xl px-5 py-4 bg-[#FFFFFF]">
                                    <ReactApexChart
                                        options={chartState.options}
                                        series={chartState.series}
                                        type="bar"
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
                    SWP Calculator</h2>
                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        What Is an SWP Calculator?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Imagine this for a moment.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>You’ve done the hard part.<br />
                        You’ve saved, invested, built a solid corpus.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Now comes the real question:<br />
                        How do you actually use this money without finishing it too soon?</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Maybe you’re retired and need a steady monthly income.<br />
                        Maybe you want to fund your child’s education without breaking your investments.<br />
                        Or maybe you just want some breathing room every month, without touching your capital blindly.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>This is where a Systematic Withdrawal Plan (SWP) Calculator comes in.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>An SWP calculator shows you how much money you can withdraw from your mutual fund investments at regular intervals—monthly, quarterly, or annually—while the remaining money stays invested and continues to compound.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>In simple words, it helps you create your own salary from your investments, without the fear of outliving your savings.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>At <b>BFC Capital</b>, we often say this:<br />
                        <i>Accumulating wealth is only half the journey. Knowing how to withdraw it smartly is the real art.</i></p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        How Does an SWP Calculator Work?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>At its core, an SWP calculator balances just two things:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Your starting corpus (the money you’ve already invested)</li>
                        <li>Your regular withdrawal amount (your monthly “paycheck”)</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Along with this, it factors in:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>How often you want to withdraw</li>
                        <li>The expected rate of return from your mutual fund</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>The result?<br />
                        A clear picture of:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>How long your money can sustain your withdrawals</li>
                        <li>How much of your corpus continues to grow in the background</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>No assumptions. No guesswork. Just visibility.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        Why Use the BFC Capital's SWP Calculator?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Because it’s not just about calculations – it’s about peace of mind.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Retirement isn’t about seeing a big number in your bank account.<br />
                        It’s about knowing your monthly expenses are taken care of – calmly, consistently.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Education planning isn’t about hoarding cash.<br />
                        It’s about ensuring fees are paid every year without panic.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>The SWP Calculator lets you test your plan before life tests you. You can adjust withdrawal amounts, timelines, and expectations, all in a few clicks.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        Let’s Understand This With a Real Example
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Consider Mr. Mishra.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>He retired on 1st January 2010 with a retirement corpus of ₹1 crore. Instead of using outdated methods, he opted for a Systematic Withdrawal Plan with a .75% monthly trigger, meaning he withdrew ₹75,000 every month for expenses, with an expected annual return of 10%.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Here’s what happened:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>He enjoyed a steady monthly income of ₹75,000</li>
                        <li>Over 15 years, his total withdrawals amounted to ₹1.35 crore</li>
                        <li>And by the end of 15 years, his remaining corpus stood around ₹1.18 crore</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>This is the power of compounding, even while withdrawing regularly.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 font-bold'>The takeaway:</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>With a well-structured retirement plan using an SWP calculator, you can:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Generate steady income</li>
                        <li>Keep your capital invested</li>
                        <li>And allow market growth to work quietly in your favour</li>
                    </ul>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        Why SWP Can Change the Way You Think About Money
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 font-bold'>1. Regular Income That Feels Like a Salary</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>For retirees or anyone without a fixed paycheck, SWP brings predictability. Life doesn’t suddenly feel uncertain when your active income stops.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 font-bold'>2. You Stay in Control</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Unlike pensions or fixed deposits, you decide:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>How much to withdraw</li>
                        <li>How often to withdraw</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>The generally recommended withdrawal rate is 0.75% per month. While SWP offers flexibility, if you want your corpus to grow even while withdrawing, the withdrawal rate should not exceed 1% per month.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 font-bold'>3. Smarter Tax Treatment</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>In SWPs, only the gains are taxed, not the entire withdrawal amount. Compared to fixed deposits—where interest is fully taxed—this can make a meaningful difference.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 font-bold'>4. Your Money Keeps Compounding</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Even as you withdraw regularly, the remaining corpus stays invested and continues to earn returns. You spend today, while still building for tomorrow.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 font-bold'>5. Protection From Emotional Decisions</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Markets will rise and fall. With an SWP, you’re not forced to exit everything during downturns. Withdrawals are gradual, helping you ride volatility without panic.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        A Final Thought
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Money isn’t just about saving, it’s about using it wisely, at the right time.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Some people hoard their savings out of fear.<br />
                        Others spend too fast out of excitement.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Both often lead to regret.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>An SWP Calculator helps strike the balance. It ensures your money supports your lifestyle without quietly slipping away. Think of it as a personal paycheck system, created not by an employer, but by your own investments</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Before deciding how to use your hard-earned savings, spend two minutes with the SWP Calculator.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Because the difference between financial stress and financial freedom is rarely about how much money you have<br />
                        it’s about how well you’ve planned.</p>
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
