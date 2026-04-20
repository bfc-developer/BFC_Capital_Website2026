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

export default function CostOfDelay() {
    const questions = [
        {
            question: "What does “cost of delay” mean?",
            answer:
                "It refers to the potential wealth you forgo by starting your SIP later instead of earlier.",
        },
        {
            question: "Does a short delay really matter?",
            answer:
                "Yes. Even a one-year delay can significantly impact long-term compounding.",
        },
        {
            question: "Can I compare different delay periods?",
            answer: "Yes. You can evaluate 1-year, 2-year, or longer delays.",
        },
        {
            question: "What SIP amount should I use?",
            answer: "Any amount you are comfortable investing regularly. Starting small is perfectly fine.",
        },
        {
            question: "What return should I assume?",
            answer:
                "Returns should be based on long-term expectations and discussed with your investment advisor.",
        },
    ];

    const [myCurrentAge, setMyCurrentAge] = useState<number>(25);
    const [monthlySIP, setMonthlySIP] = useState<number>(10000);
    const [investTillImAge, setInvestTillImAge] = useState<number>(60);
    const [ROR, setROR] = useState<string | number>(12.5);
    const [delayAge, setDelayAge] = useState<number>(10);
    const [realProfit, setRealProfit] = useState<number>(74362477);
    const [fakeProfit, setFakeProfit] = useState<number>(20753115);
    const [difference, setDifference] = useState<number>(53609362);
    const [realTotalInvestment, setRealTotalInvestment] =
        useState<number>(4200000);
    const [fakeTotalInvestment, setFakeTotalInvestment] =
        useState<number>(3000000);
    // Test Line for deployment
    const [myCurrentAge1, setMyCurrentAge1] = useState<number>(25);
    const [investTillImAge1, setInvestTillImAge1] = useState<number>(60);
    const [delayAge1, setDelayAge1] = useState<number>(10);
    const calculateButton = () => {
        if (!monthlySIP || !ROR) {
            toast.error("Please make sure all required fields are filled in.")
            return;
        }
        else {
            if (investTillImAge < myCurrentAge) {
                toast.error(
                    "Please ensure that ‘Invest Till I Am’ is greater than your current age."
                );
            } else if (investTillImAge - myCurrentAge < delayAge) {
                const availableYears = investTillImAge - myCurrentAge;

                toast.error(
                    `⚠️ Delay (${delayAge} ${delayAge === 1 ? "year" : "years"
                    }) cannot be greater than available investment period (${availableYears} ${availableYears === 1 ? "year" : "years"
                    }).`
                );
            } else {
                const P = monthlySIP;
                const n = (investTillImAge - myCurrentAge) * 12;
                const r = Number(ROR) / 100 / 12;

                // FV = P * ((1+r)^n - 1) / r * (1+r)
                const fv = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);

                setRealProfit(fv);
                const ni = (investTillImAge - myCurrentAge - delayAge) * 12;

                const fv1 = P * ((Math.pow(1 + r, ni) - 1) / r) * (1 + r);

                setFakeProfit(fv1);
                setDifference(fv - fv1);
                setRealTotalInvestment(monthlySIP * n);
                setFakeTotalInvestment(monthlySIP * ni);
                setDelayAge1(delayAge);
                setInvestTillImAge1(investTillImAge);
                setMyCurrentAge1(myCurrentAge);
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
                    {/* <span className="text-[#7A7A7A] font-semibold" style={{
                        background: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent"
                    }}>Calculators</span> */}
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
                    }}>Cost of Delay in SIP Calculator</span>
                </nav>
                {/* Title */}
                <h2 className="text-[40px] md:text-3xl lg:text-5xl font-bold text-[#44475B]">
                    Cost of Delay in SIP Calculator
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
                                                YOUR CURRENT AGE
                                            </label>
                                            <span className="font-bold text-[#44475B]">
                                                {myCurrentAge} Yrs
                                            </span>
                                        </div>

                                        <RangeBar
                                            maxLimit={65}
                                            setValue={setMyCurrentAge}
                                            value={myCurrentAge}
                                        />

                                        <div className="flex justify-between text-sm text-[#44475B] mt-2">
                                            <span>1 Yr</span>
                                            <span>65 Yrs</span>
                                        </div>
                                    </div>
                                    {/* Monthly Saving */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            YOU WANT TO START A MONTHLY SIP OF
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={monthlySIP}
                                            min={0}
                                            onChange={(e) =>
                                                setMonthlySIP(parseFloat(e.target.value))
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
                                                YOU WANT TO STAY INVESTED TILL
                                            </label>
                                            <span className="font-bold text-[#44475B]">
                                                {investTillImAge} Yrs
                                            </span>
                                        </div>

                                        <RangeBar
                                            maxLimit={80}
                                            setValue={setInvestTillImAge}
                                            value={investTillImAge}
                                        />

                                        <div className="flex justify-between text-sm text-[#44475B] mt-2">
                                            <span>1 Yr</span>
                                            <span>80 Yrs</span>
                                        </div>
                                    </div>

                                    {/* Expected Rate of Return */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Expected Rate of Return (% P.A.)
                                        </label>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={ROR}
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
                                                    setROR("");
                                                    return;
                                                }

                                                const num = parseFloat(val);

                                                if (val === "." || (!isNaN(num) && num >= 0 && num <= 100)) {
                                                    setROR(val);
                                                }
                                            }}
                                        />
                                    </div>

                                    {/* Investment Period */}
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-[#44475B] font-medium text-sm uppercase">
                                                YOU DELAY STARTING YOUR SIP BY
                                            </label>
                                            <span className="font-bold text-[#44475B]">
                                                {delayAge} Yrs
                                            </span>
                                        </div>

                                        <RangeBar
                                            maxLimit={40}
                                            setValue={setDelayAge}
                                            value={delayAge}
                                        />

                                        <div className="flex justify-between text-sm text-[#44475B] mt-2">
                                            <span>1 Yr</span>
                                            <span>40 Yrs</span>
                                        </div>
                                    </div>

                                    {/* Button */}
                                    <button
                                        type="button"
                                        onClick={calculateButton}
                                        className="bg-[#04B488] text-white py-3 rounded-lg font-semibold hover:bg-[#008f45] transition duration-300 p-[14px]"
                                    >
                                        Check Impact
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

                                    <div className="row pt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="col-lg-6 mb-2">
                                            <div className="border border-2 rounded-lg p-3 cost-investment-cards border-gray-200">
                                                <span className="rounded-lg px-4 text-[#06A358] bg-[#E6F6EE] font-bold">
                                                    {" "}
                                                    👍 Start Age : {Number(myCurrentAge1)}
                                                </span>
                                                <p className="text-[#44475B] font-medium">FINAL VALUE OF INVESTMENT</p>
                                                <h3 className="text-[#06A358] font-bold font-primary text-2xl">
                                                    ₹{Math.round(realProfit).toLocaleString("en-IN")}
                                                </h3>
                                                <p className="text-[#44475B] font-medium">
                                                    Total Investment:₹{" "}
                                                    {Math.round(realTotalInvestment).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="col-lg-6">
                                            <div className="border border-2 rounded-lg p-3 cost-investment-cards border-gray-200">
                                                <span className=" rounded-lg px-4 text-[#CB414E] bg-[#FAECED] font-bold">
                                                    {" "}
                                                    👎 Start Age :{" "}
                                                    {Number(delayAge1) + Number(myCurrentAge1)}
                                                </span>
                                                <p className="text-[#44475B] font-medium">FINAL VALUE OF INVESTMENT</p>
                                                <h3 className="text-[#CB414E] font-bold font-primary text-2xl">
                                                    ₹{Math.round(fakeProfit).toLocaleString("en-IN")}
                                                </h3>
                                                <p className="text-[#44475B] font-medium">
                                                    Total Investment:₹{" "}
                                                    {Math.round(fakeTotalInvestment).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-4">
                                        <div className="text-center">
                                            <span className="text-[#44475B] font-medium">
                                                {"Loss Due to Delay in Investment".toUpperCase()}
                                            </span>
                                            <h2 className="text-[#CB414E] text-2xl font-bold py-2">
                                                ₹{Math.round(difference).toLocaleString("en-IN")}
                                            </h2>
                                        </div>
                                        <p className="">
                                            If you invest{" "}
                                            <strong>
                                                ₹{Number(monthlySIP).toLocaleString("en-IN")}
                                            </strong>{" "}
                                            every month for{" "}
                                            <strong>
                                                {Number(investTillImAge1) - Number(myCurrentAge1)} years{" "}
                                            </strong>
                                            at an expected return of <strong>{ROR}%</strong> annually,
                                            your total contribution amounts to{" "}
                                            <strong>
                                                ₹
                                                {Math.round(realTotalInvestment).toLocaleString(
                                                    "en-IN"
                                                )}
                                            </strong>{" "}
                                            and can grow to a corpus of{" "}
                                            <strong>
                                                ₹{Math.round(realProfit).toLocaleString("en-IN")}
                                            </strong>
                                            . But if you <strong>delay</strong> your SIP by{" "}
                                            <strong>
                                                {delayAge1} {delayAge1 === 1 ? "year" : "years"}
                                            </strong>{" "}
                                            and invest for only{" "}
                                            <strong>
                                                {Number(investTillImAge1) -
                                                    Number(myCurrentAge1) -
                                                    Number(delayAge1)}
                                            </strong>{" "}
                                            out of those{" "}
                                            {Number(investTillImAge1) - Number(myCurrentAge1)} years,
                                            your corpus reduces to{" "}
                                            <strong>
                                                ₹{Math.round(fakeProfit).toLocaleString("en-IN")}.
                                            </strong>
                                        </p>
                                    </div>
                                </div>

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
                    Cost of Delay in SIP Calculator</h2>
                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        What Is the Cost of Delay in SIP Calculator?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Procrastination is a sin - at least in investing it is.<br />
                        Most people don’t reject investing.<br />
                        They just postpone it.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>“I’ll start once my salary improves.”<br />
                        “Expenses are high right now.”<br />
                        “Let life settle down a bit.”</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>These reasons sound sensible. They even feel responsible.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>But investing has one silent rule:<br />
                        time does not wait for certainty.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>The Cost of Delay in SIP Calculator helps you understand something most investors realise only much later, that delaying your SIP doesn’t just reduce returns, it quietly erodes the power of compounding you can never get back.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>This calculator isn’t designed to create pressure.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>It’s designed to create clarity, so you can take informed decisions today instead of corrective decisions years later.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Why This Calculator Matters
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>We tend to overestimate the value of time because its impact isn’t visible immediately.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>A one-year delay feels harmless.<br />
                        After all, what difference can 12 months make?</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>In long-term investing, it makes a disproportionate difference.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Compounding doesn’t accelerate because you invest more money, it accelerates because money gets more time to grow.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>A delayed SIP means:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Fewer instalments</li>
                        <li>Shorter compounding window</li>
                        <li>Lower final corpus, even if returns remain the same</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>And once time is lost, it cannot be recovered.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>This calculator shows you—clearly and objectively—how much that delay actually costs.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        What the Cost of Delay Calculator Shows You
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>With one simple calculation, you can see:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>How your corpus changes if you start today vs later</li>
                        <li>The financial impact of delaying by 1, 2, or 5 years</li>
                        <li>How compounding works harder with time than with higher contributions</li>
                        <li>Why “starting small early” often beats “starting big later”</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>There’s no judgement here, only numbers and perspective.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        How to Use the BFC Capital's Cost of Delay Calculator
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>The calculator is intentionally simple.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-3'>You only need to enter:</p>
                    <ol className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 list-decimal pl-5 space-y-4'>
                        <li>
                            Monthly SIP Amount<br />
                            Example: ₹10,000
                        </li>
                        <li>
                            Expected Rate of Return<br />
                            Example: 16% per annum
                        </li>
                        <li>
                            The age till which you want to stay invested<br />
                            Example: 45 years
                        </li>
                        <li>
                            Delay in Starting the SIP<br />
                            Example: 1 year
                        </li>
                        <li>
                            Your Age<br />
                            Example: 25 years
                        </li>
                    </ol>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Click Calculate, and you’ll see two outcomes side by side.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>Example Result</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Total Investment (no delay): ₹24,00,000</li>
                        <li>Corpus Value (no delay): ₹1,74,94,609</li>
                        <li>Total Investment (with 1-year delay): ₹22,80,000</li>
                        <li>Corpus Value (with delay): ₹1,48,12,007</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Difference: ₹26,82,602</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Nothing dramatic changed – same SIP amount, same return, same total period.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Only the start date shifted.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>That’s the real cost of delay.</p>

                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Why Investors Find This Calculator Useful
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>This tool helps bridge the gap between intention and action.</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-tight font-inter mx-auto mb-4 space-y-2'>
                        <li>
                            <b>It converts time into numbers</b><br />
                            Something abstract becomes measurable.
                        </li>
                        <li>
                            <b>It highlights opportunity cost</b><br />
                            Not what you invest, but what you miss out on.
                        </li>
                        <li>
                            <b>It improves planning decisions</b><br />
                            You can adjust SIP amounts, timelines, or goals with clarity.
                        </li>
                        <li>
                            <b>It supports disciplined investing</b><br />
                            Seeing long-term impact often strengthens commitment.
                        </li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>For many investors, this is the moment where “someday” becomes “now”.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        How It Helps You Plan Smarter
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>At BFC Capital, we often remind investors of one simple truth:</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Wealth is built more by patience than by prediction.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>The Cost of Delay Calculator helps you:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Appreciate the role of time in long-term wealth creation</li>
                        <li>Make realistic, informed investment choices</li>
                        <li>Avoid future regret by acting earlier, even if modestly</li>
                        <li>Stay aligned with long-term financial goals</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>It doesn’t push you to invest more.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>It helps you invest more wisely.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Practical Tips While Using This Calculator
                    </p>
                    <ol className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 list-decimal pl-5'>
                        <li>
                            <b>Start early, even with a smaller SIP</b><br />
                            Time has a bigger impact than size.
                        </li>
                        <li>
                            <b>Use realistic return assumptions</b><br />
                            Long-term expectations should be sensible and goal-aligned.
                        </li>
                        <li>
                            <b>Compare multiple delay scenarios</b><br />
                            The difference between 1 year and 5 years can be significant.
                        </li>
                        <li>
                            <b>Review your plan periodically</b><br />
                            As income grows, your SIP can evolve.
                        </li>
                        <li>
                            <b>Use Prodigy Pro, developed by BFC Capital, a SEBI Registered RIA for periodic portfolio reviews</b><br />
                            Timely course corrections matter more than perfect timing.
                        </li>
                    </ol>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Who Is This Calculator For?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>This calculator is especially useful for:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Young professionals delaying their first SIP</li>
                        <li>Self-employed individuals with irregular income</li>
                        <li>Parents planning long-term goals for children</li>
                        <li>Investors restarting after a long break</li>
                        <li>Anyone who believes they still “have time”</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>If wealth creation is a goal, even a distant one, this tool is relevant.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Start Today. Let Time Work for You.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Delaying investments is rarely intentional, but it can be costly!</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>The Cost of Delay in SIP Calculator doesn’t create urgency. <br /> It creates awareness.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>Whether your goal is:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Buying a home</li>
                        <li>Funding education</li>
                        <li>Building retirement security</li>
                        <li>Or achieving long-term financial independence</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>Starting earlier quietly makes everything easier later.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Because while money can be added, time cannot be replaced.</p>
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
