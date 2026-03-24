"use client";

import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { ChevronRight } from "lucide-react";
import RangeBar from "../../common/RangeBar";

export default function TargetAmountCalculator() {
    const questions = [
        {
            question: "Does the calculator include inflation?",
            answer:
                "No. It shows nominal returns only and does not adjust for inflation.",
        },
        {
            question: "Can I calculate both lump sum and SIP investments?",
            answer: "Yes. It provides both options so you can choose what suits your cash flow.",
        },
        {
            question: "What rate of return should I assume?",
            answer:
                "Reasonable return assumptions should be made based on asset allocation and ideally after consulting a financial advisor.",
        },
        {
            question: "Can I plan multiple goals at the same time?",
            answer: "Yes, but calculate each goal separately to maintain clarity and accuracy.",
        },
        {
            question: "How often should I review my portfolio?",
            answer: "Every 6 to 12 months, or sooner if there is a major change in income, expenses, or goals.",
        },
    ];

    const [amount, setAmount] = useState<number>(50000000);
    const [time, setTime] = useState<number>(5);
    const [rate, setRate] = useState<string | number>(16);
    const [monthlyReturn, setMonthlyReturn] = useState<number>(0.013333);
    const [monthsTime, setMonthsTime] = useState<number>(60);
    const [targetValue, setTargetValue] = useState<number>(549236);
    const [pvalue, setPV] = useState<number>(23805651);
    const [finalAmount, setFinalAmount] = useState<number>(50000000);
    const [showResults, setShowResults] = useState<boolean>(false);

    useEffect(() => {
        const monthlyrate = Number(Number(rate) / 100 / 12);
        setMonthlyReturn(monthlyrate);

        const months = time * 12;
        setMonthsTime(months);
    }, [rate, time, amount]);

    const calculateButton = () => {
        if (!amount || !rate) {
            toast.error("Please make sure all required fields are filled in.");
            return;
        } else {
            if (monthlyReturn > 0 && monthsTime > 0) {
                const pmt =
                    (monthlyReturn * amount) /
                    (Math.pow(1 + monthlyReturn, monthsTime) - 1);

                setTargetValue(pmt);

                const pv = amount / Math.pow(1 + Number(rate) / 100, time);
                setPV(pv);
                setFinalAmount(amount);
                setShowResults(true);
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
                    <ChevronRight
                        className="h-4 w-4 mx-2"
                        style={{ stroke: "url(#chevron-gradient)" }}
                    />
                    <span className="text-[#7A7A7A] font-semibold">Target Amount Calculator</span>
                </nav>
                {/* Title */}
                <h2 className="text-[40px] md:text-3xl lg:text-5xl font-bold text-[#44475B]">
                    Target Amount Calculator
                </h2>
            </div>
            <section>
                <div className="container mx-auto px-5 md:px-10 lg:px-20">
                    <div className="flex flex-col md:flex-row justify-between gap-6">

                        {/* LEFT SIDE */}
                        <div className="w-full md:w-1/2">
                            <div className="shadow-md rounded-2xl px-8 py-5 bg-[#FFFFFF]">

                                <form className="space-y-6">

                                    {/* Target Amount */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            TARGET AMOUNT
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={amount}
                                            min={0}
                                            onChange={(e) =>
                                                setAmount(parseFloat(e.target.value))
                                            }
                                            placeholder="₹ 50,00,000"
                                        />
                                    </div>

                                    {/* Investment Period */}
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-[#44475B] font-medium text-sm uppercase">
                                                INVESTMENT PERIOD
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
                                            EXPECTED RATE OF RETURN (% P.A)
                                        </label>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={rate}
                                            placeholder="16"
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
                                    <h2 className="font-primary font-semibold text-2xl leading-tight text-textdark mb-3">
                                        Result
                                    </h2>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="col-lg-6 result-item">
                                            <p className="text-[#4D4D4D]">{"Your Target Amount".toUpperCase()}</p>
                                            <h3 className="text-[#212121] font-semibold">₹ {finalAmount.toLocaleString("en-IN")}</h3>
                                        </div>
                                        <div className="col-lg-6 result-item">
                                            <p className="text-[#4D4D4D]">{"Monthly SIP investment required".toUpperCase()}</p>
                                            <h3 className="text-[#212121] font-semibold">₹{Math.round(targetValue).toLocaleString("en-IN")}</h3>
                                        </div>
                                        <div className="col-lg-6 result-item">
                                            <p className="text-[#4D4D4D]">{"One time investment required".toUpperCase()}</p>
                                            <h3 className="text-[#212121] font-semibold">₹{Math.round(pvalue).toLocaleString("en-IN")}</h3>
                                        </div>
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
                    Target Amount Calculator</h2>
                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        What is a Target Amount Calculator?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        We all have goals. Sometimes they are big and life-changing, like buying a home or funding your child’s education. Sometimes they are deeply personal, like that long-pending family vacation or the comfort of retiring on your own terms.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        The real challenge is not dreaming.<br />
                        It is answering one simple question honestly:</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        How much do I actually need to invest to reach this goal</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        That’s where most people get stuck. A small miscalculation, an unrealistic return assumption, or a delayed start can quietly push your goal further away than you realise.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        This is exactly where the Target Amount Calculator helps.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Think of it as a planning tool that brings structure to your goals. You tell it the amount you want, the time you have, and a reasonable expected return. It then tells you how much you need to invest, either as a lump sum or through a monthly SIP.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Clear numbers. Clear direction. No guesswork.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Why This Calculator Really Matters
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Financial planning often feels overwhelming because the future feels uncertain. Many investors assume they are saving enough, only to realise years later that the final corpus falls short because compounding did not work the way they imagined.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        That gap can be stressful, especially when the goal is non-negotiable, like education or retirement.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        The Target Amount Calculator helps avoid that situation. It forces clarity early. It shows you realistic numbers today, so you can take corrective action while time is still on your side.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        At BFC Capital, this is exactly how we approach planning. Not by chasing returns, but by aligning investments with clearly defined goals and time horizons.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        How to Use the Target Amount Calculator
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        The process is simple and intentionally straightforward.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Start by entering your target amount.<br />
                        For example, ₹20,00,000 for a new home.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Then set your time frame.<br />
                        Say you need the money in 8 years.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Choose an expected rate of return.<br />
                        For instance, 16 percent annually, assuming a suitable equity-oriented portfolio and a long-term view.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Click “Calculate”.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        You instantly get two clear answers:</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 font-primary'>
                        Lump Sum Needed Today: <br />₹6,01,051</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 font-primary'>
                        Monthly SIP Needed: <br />₹10,391</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        No complicated formulas. No assumptions hidden in fine print. Just a clear picture of what your goal demands.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Why Use This Calculator Instead of Guessing?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        You could try to estimate things yourself. But this tool makes planning more disciplined.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        1. It saves time by giving instant, accurate calculations.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        2. It correctly accounts for compounding, which is where most manual estimates go wrong.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        3. It allows you to test different scenarios by changing timelines, returns, or contribution amounts.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        4. It brings transparency, so you know exactly what is required, not what sounds comfortable.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        This clarity is especially important when decisions involve long-term commitments.</p>

                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        How It Helps You Plan Smarter
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        Using the Target Amount Calculator changes how you look at goals.</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>It keeps planning goal-focused instead of product-focused.</li>
                        <li>It shows both lump sum and SIP options, giving flexibility.</li>
                        <li>It uses realistic growth assumptions rather than optimistic projections.</li>
                        <li>It motivates discipline, because once you know the number, execution becomes easier.</li>
                        <li>It allows early adjustments, when small changes still make a big difference.</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        This is the kind of planning approach SEBI RIA frameworks are designed to encourage.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Tips to Get the Most Out of It
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-2 font-bold'>
                        1. Be realistic about returns: <span className="font-normal text-[15px] md:text-[17px]">Overestimating returns is the fastest way to fall short of goals.</span></p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-2 font-bold'>
                        2. Start early: <span className="font-normal text-[15px] md:text-[17px]">Time reduces pressure more effectively than higher returns ever can.</span></p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-2 font-bold'>
                        3. Review regularly: <span className="font-normal text-[15px] md:text-[17px]">Markets change, income changes, goals evolve. A review every 6 to 12 months is sensible.</span></p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 font-bold'>
                        4. Choose the right asset mix: <span className="font-normal text-[15px] md:text-[17px]">Returns depend not just on time, but also on aligning investments with risk tolerance and goal timelines.</span></p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 '>
                        At BFC Capital, portfolio reviews and goal discussions are always aligned with suitability and long-term outcomes, not short-term performance. </p>               </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Who Is This Calculator Useful For?
                    </p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Young professionals planning a car, travel, or their first home.</li>
                        <li>Parents preparing for education or marriage expenses.</li>
                        <li>Retirement planners calculating the corpus needed for financial independence.</li>
                        <li>First-time investors who want clarity on how much to start with.</li>
                        <li>Experienced investors who want to model scenarios more thoughtfully.</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        If you have a goal with a deadline, this calculator is relevant.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Turning Goals Into Achievable Milestones
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        A goal without a plan remains a wish.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        The Target Amount Calculator converts intention into structure. It tells you how much to invest, how long to stay invested, and what assumptions you are working with.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Whether the goal is ₹10 lakhs or ₹10 crore, the principle remains the same. <br />Clarity leads to confidence. Confidence leads to consistency.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        And consistency is what ultimately turns goals into outcomes.</p>
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
