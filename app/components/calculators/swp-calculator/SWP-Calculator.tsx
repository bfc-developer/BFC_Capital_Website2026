"use client";

import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import dynamic from "next/dynamic";
import axios from "axios";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
    ssr: false,
});
import { ApexOptions } from "apexcharts";
import RangeBar from "@/app/components/common/RangeBar";
import { toast } from "react-toastify";
import { ChevronRight } from "lucide-react";
import { endpoints } from "../../urls/URLS";

export default function SWPCalculatorComponent() {
    const questions = [
        {
            question: "What is the difference between SWP and SIP?",
            answer:
                "SIP builds wealth by investing regularly. SWP distributes wealth by withdrawing regularly. SIP is about growing money; SWP is about enjoying it.",
        },
        {
            question: "Does the calculator show how long my investment will last?",
            answer:
                "Yes. It estimates how long your corpus can sustain your withdrawals based on expected returns.",
        },
        {
            question:
                "Can I calculate the remaining corpus after regular withdrawals?",
            answer:
                "Yes. The calculator clearly shows how much of your investment remains invested over time.",
        },
        {
            question:
                "Does the calculator account for capital appreciation?",
            answer:
                "Yes. It assumes your investments continue to earn returns even as withdrawals happen.",
        },
        {
            question: "Can I use this calculator for retirement income planning?",
            answer:
                "Absolutely. That’s one of its strongest use cases, helping you withdraw monthly income without running out of savings too early.",
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

    // Input states
    // Input states
    const [lumpsumAmount, setLumpsumAmount] = useState<number>(65000);
    const [investmentPeriod, setInvestmentPeriod] = useState<number>(5);
    const [expectedReturn, setExpectedReturn] = useState<string | number>(8);
    const [withdrawalAmount, setWithdrawalAmount] = useState<string | number>(15000);
    const [withdrawalPercentage, setWithdrawalPercentage] =
        useState<string | number>(23.08);
    const [byAmount, setByAmount] = useState<boolean>(true);

    // Result states
    const [totalBalanceAmount, setTotalBalanceAmount] = useState<number>(617);
    const [totalWithdrawalAmount, setTotalWithdrawalAmount] =
        useState<number>(60000);
    const [totalProfit, setTotalProfit] = useState<number>(1107);

    // Hydration-safe formatted numbers
    const [formattedBalance, setFormattedBalance] = useState<string>("");
    const [formattedWithdrawal, setFormattedWithdrawal] = useState<string>("");
    const [formattedProfit, setFormattedProfit] = useState<string>("");



    // Handlers
    const handleWithdrawalBy = (isAmount: boolean) => {
        setByAmount(isAmount);
        setWithdrawalAmount("");
        setWithdrawalPercentage("");
    };

    const handleLumpsumChange = (value: number) => {
        if (value > 100_000_000) return;
        setLumpsumAmount(value);
        if (byAmount && withdrawalAmount !== "" && Number(withdrawalAmount) > 0) {
            const num = typeof withdrawalAmount === "string" ? parseFloat(withdrawalAmount) : withdrawalAmount;
            setWithdrawalPercentage((num * 100) / value);
        } else if (!byAmount && withdrawalPercentage !== "" && Number(withdrawalPercentage) > 0) {
            const num = typeof withdrawalPercentage === "string" ? parseFloat(withdrawalPercentage) : withdrawalPercentage;
            setWithdrawalAmount((num / 100) * value);
        }
    };

    const handleWithdrawalAmountChange = (value: string | number) => {
        if (value === "") {
            setWithdrawalAmount("");
            setWithdrawalPercentage("");
            return;
        }
        let numericValue = typeof value === "string" ? parseFloat(value) : value;
        if (isNaN(numericValue)) return;
        if (numericValue > lumpsumAmount) {
            numericValue = lumpsumAmount;
            value = lumpsumAmount.toString();
        }
        setWithdrawalAmount(value);
        setWithdrawalPercentage((numericValue * 100) / lumpsumAmount);
    };

    const handleWithdrawalPercentageChange = (value: string | number) => {
        if (value === "") {
            setWithdrawalPercentage("");
            setWithdrawalAmount("");
            return;
        }
        let numericValue = typeof value === "string" ? parseFloat(value) : value;
        if (isNaN(numericValue)) return;
        if (numericValue > 100) {
            numericValue = 100;
            value = "100";
        }
        setWithdrawalPercentage(value);
        setWithdrawalAmount((numericValue / 100) * lumpsumAmount);
    };

    const calculateResult = async () => {

        if (!lumpsumAmount || !expectedReturn || !withdrawalAmount) {
            toast.error("Please make sure all required fields are filled in.")
            return;
        }
        else {
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjeWhrZHU4dW1mY2o5NHhrIiwiaWF0IjoxNzY0NzQxODQxfQ.VhRKw4h9gU4vybAt2LhTp-bH1g2Z2A0t1K-_-L2_jKE"
            const res = await axios.post<any>("https://prodigypro-new.bfcsofttech.in/api/v2/calculators/swp", {
                monthlyWithdrawl: Math.round(Number(withdrawalAmount)),
                period: Number(investmentPeriod),
                interestRate: Number(expectedReturn),
                lumpsum: Math.round(Number(lumpsumAmount))
            },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

            // console.log("ggggg", res.data.data)

            setTotalBalanceAmount(res.data?.data?.total_balance_amount);
            setTotalWithdrawalAmount(res.data?.data?.total_withdrawal_amount);
            setTotalProfit(res.data?.data?.total_profit);
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
                    }}>SWP Calculator</span>
                </nav>
                {/* Title */}
                <h2 className="text-[40px] md:text-3xl lg:text-5xl font-bold text-[#44475B]">
                    SWP Calculator
                </h2>
            </div>
            <section>
                <div className="container mx-auto px-5 md:px-10 lg:px-20">
                    <div className="flex flex-col md:flex-row justify-between gap-6">

                        {/* LEFT SIDE */}
                        <div className="w-full md:w-1/2">
                            <div className="shadow-md rounded-2xl px-8 py-5 bg-[#FFFFFF]">

                                <form className="space-y-6">

                                    {/* Total Investment */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Lumpsum Amount
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={lumpsumAmount}
                                            min={0}
                                            onChange={(e) =>
                                                setLumpsumAmount(parseFloat(e.target.value))
                                            }
                                            onWheel={(e) => (e.target as HTMLInputElement).blur()}
                                            onKeyDown={(e) => {
                                                if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                                                    e.preventDefault();
                                                }
                                            }}
                                            placeholder="₹ 1,00,00,000"
                                        />
                                    </div>
                                    {/* Investment Period */}
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-[#44475B] font-medium text-sm uppercase">
                                                Investment Period
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

                                    {/* Withdrawal Amount */}
                                    {/* <div>
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
                                    </div> */}

                                    {/* Expected Rate of Return */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Expected Return (%)
                                        </label>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={expectedReturn}
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
                                                    setExpectedReturn("");
                                                    return;
                                                }
                                                const num = parseFloat(val);
                                                if (val === "." || (!isNaN(num) && num >= 0 && num <= 100)) {
                                                    setExpectedReturn(val);
                                                }
                                            }}
                                        />
                                    </div>
                                    {/* Withdrawal By */}
                                    <Form.Group className="block text-[#44475B] font-medium text-sm uppercase mb-4">
                                        <Form.Label className="uppercase text-[#44475B] mb-2">Set Withdrawal By</Form.Label>
                                        <div className="flex gap-3 mb-2">
                                            <Button
                                                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                                type="button"
                                                onClick={() => handleWithdrawalBy(true)}
                                                style={byAmount ? {
                                                    background: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
                                                    color: "white"
                                                } : {
                                                    background: "white",
                                                    border: "1px solid #D0DBEA",
                                                    color: "transparent",
                                                    backgroundImage: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
                                                    WebkitBackgroundClip: "text",
                                                    WebkitTextFillColor: "transparent",
                                                    backgroundClip: "text"
                                                }}
                                            >
                                                Amount
                                            </Button>
                                            <Button
                                                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                                type="button"
                                                onClick={() => handleWithdrawalBy(false)}
                                                style={!byAmount ? {
                                                    background: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
                                                    color: "white"
                                                } : {
                                                    background: "white",
                                                    border: "1px solid #D0DBEA",
                                                    color: "transparent",
                                                    backgroundImage: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
                                                    WebkitBackgroundClip: "text",
                                                    WebkitTextFillColor: "transparent",
                                                    backgroundClip: "text"
                                                }}
                                            >
                                                Percentage (%)
                                            </Button>
                                        </div>
                                    </Form.Group>

                                    {/* Withdrawal Input */}
                                    <Form.Group className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                        <Form.Label className="uppercase text-[#44475B] mb-2">
                                            {byAmount
                                                ? "Monthly Withdrawal Amount"
                                                : "Monthly Withdrawal (% p.m)"}
                                        </Form.Label>
                                        <div className="relative flex items-center">
                                            {byAmount && <span className="absolute left-3 text-[#585c75]">₹</span>}
                                            <Form.Control
                                                type="text"
                                                inputMode="decimal"
                                                value={byAmount ? withdrawalAmount : withdrawalPercentage}
                                                className={`w-full border rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B] ${byAmount ? 'pl-8 pr-4' : 'pl-4 pr-8'}`}
                                                onChange={(e) => {
                                                    let val = e.target.value.replace(/[^0-9.]/g, "");
                                                    const parts = val.split(".");
                                                    if (parts.length > 2) {
                                                        val = parts[0] + "." + parts.slice(1).join("");
                                                    }
                                                    if (val.startsWith("0") && !val.startsWith("0.") && val.length > 1) {
                                                        val = val.replace(/^0+/, "");
                                                    }
                                                    if (byAmount) {
                                                        handleWithdrawalAmountChange(val);
                                                    } else {
                                                        handleWithdrawalPercentageChange(val);
                                                    }
                                                }}
                                                placeholder={byAmount ? "15000" : "23.08"}
                                            />
                                            {!byAmount && <span className="absolute right-4 text-[#585c75] font-semibold">%</span>}
                                        </div>

                                        <div className="flex justify-between mt-2 text-[#7A7A7A] text-sm">
                                            <span>
                                                {byAmount
                                                    ? `Percentage: ${withdrawalPercentage !== "" ? Number(withdrawalPercentage).toFixed(2) : "0.00"}%`
                                                    : `Amount: ₹${withdrawalAmount !== "" ? Number(withdrawalAmount).toLocaleString("en-IN") : "0"}`}
                                            </span>
                                        </div>
                                    </Form.Group>
                                    {/* Investment Period
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-[#44475B] font-medium text-sm uppercase">
                                                Investment Period
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
                                    </div> */}

                                    {/* Button */}
                                    <button
                                        type="button"
                                        onClick={calculateResult}
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
                                    <h2 className="font-primary font-bold text-2xl leading-tight text-[rgba(33, 33, 33, 1)] mb-6">
                                        Result
                                    </h2>
                                    <label className="block text-[#4D4D4D] font-medium uppercase mb-2">
                                        Total Balance Amount
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-[rgba(33, 33, 33, 1)] font-bold mb-4 text-xl">
                                        ₹{totalBalanceAmount.toLocaleString("en-IN")}
                                    </p>
                                    {/* <hr className="my-8 border-[#D0DBEA] border-[1px]" /> */}
                                    {/* <h4 className="text-[rgba(33, 33, 33, 1)]  font-semibold text-xl leading-tight mb-6">
                                        Amount required P.M.- Post Retirement
                                    </h4> */}
                                    <label className="block text-[#4D4D4D] font-medium uppercase mb-2">
                                        Total withdrawal amount
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-[rgba(33, 33, 33, 1)] font-bold mb-4 text-xl">
                                        ₹{totalWithdrawalAmount.toLocaleString("en-IN")}
                                    </p>
                                    <label className="block text-[#4D4D4D] font-medium uppercase mb-2">
                                        Total Profit
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-[rgba(33, 33, 33, 1)] font-bold mb-4 text-xl">
                                        ₹{totalProfit.toLocaleString("en-IN")}
                                    </p>
                                </div>

                                {/* Chart Card */}
                                {/* <div className="shadow-md rounded-2xl px-5 py-4 bg-[#FFFFFF]">
                                    <ReactApexChart
                                        options={chartState.options}
                                        series={chartState.series}
                                        type="bar"
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
                </div>
            </section>
            <section>
                <h2 className="text-center text-[28px] md:text-3xl lg:text-5xl font-bold text-[#44475B] mt-16">All You Need To Know About <br />
                    SWP Calculator</h2>
                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
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
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>An SWP calculator shows you how much money you can withdraw from your mutual fund investments at regular intervals–monthly, quarterly, or annually–while the remaining money stays invested and continues to compound.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>In simple words, it helps you create your own salary from your investments, without the fear of outliving your savings.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>At <b>BFC Capital</b>, we often say this:<br />
                        <i>Accumulating wealth is only half the journey. Knowing how to withdraw it smartly is the real art.</i></p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        How Does an SWP Calculator Work?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>At its core, an SWP calculator balances just two things:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Your starting corpus (the money you’ve already invested)</li>
                        <li>Your regular withdrawal amount (your monthly “paycheck”)</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>Along with this, it factors in:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>How often you want to withdraw</li>
                        <li>The expected rate of return from your mutual fund</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>The result?<br />
                        A clear picture of:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>How long your money can sustain your withdrawals</li>
                        <li>How much of your corpus continues to grow in the background</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>No assumptions. No guesswork. Just visibility.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
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
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Let’s Understand This With a Real Example
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Consider Mr. Mishra.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>He retired on 1st January 2010 with a retirement corpus of ₹1 crore. Instead of using outdated methods, he opted for a Systematic Withdrawal Plan with a 0.75% monthly trigger, meaning he withdrew ₹75,000 every month for expenses, with an expected annual return of 10%.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>Here’s what happened:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>He enjoyed a steady monthly income of ₹75,000</li>
                        <li>Over 15 years, his total withdrawals amounted to ₹1.35 crore</li>
                        <li>And by the end of 15 years, his remaining corpus stood around ₹1.18 crore</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>This is the power of compounding, even while withdrawing regularly.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>The takeaway:</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>With a well-structured retirement plan using an SWP calculator, you can:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Generate steady income</li>
                        <li>Keep your capital invested</li>
                        <li>And allow market growth to work quietly in your favour</li>
                    </ul>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Why SWP Can Change the Way You Think About Money
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto font-bold'>1. Regular Income That Feels Like a Salary</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>For retirees or anyone without a fixed paycheck, SWP brings predictability. Life doesn’t suddenly feel uncertain when your active income stops.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto font-bold'>2. You Stay in Control</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>Unlike pensions or fixed deposits, you decide:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <li>How much to withdraw</li>
                        <li>How often to withdraw</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>The generally recommended withdrawal rate is 0.75% per month. While SWP offers flexibility, if you want your corpus to grow even while withdrawing, the withdrawal rate should not exceed 1% per month.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto font-bold'>3. Smarter Tax Treatment</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>In SWPs, only the gains are taxed, not the entire withdrawal amount. Compared to fixed deposits—where interest is fully taxed—this can make a meaningful difference.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto font-bold'>4. Your Money Keeps Compounding</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Even as you withdraw regularly, the remaining corpus stays invested and continues to earn returns. You spend today, while still building for tomorrow.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto font-bold'>5. Protection From Emotional Decisions</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Markets will rise and fall. With an SWP, you’re not forced to exit everything during downturns. Withdrawals are gradual, helping you ride volatility without panic.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
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
