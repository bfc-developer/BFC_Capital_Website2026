"use client";

import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import Accordion from "react-bootstrap/Accordion";
import RangeBar from "../../common/RangeBar";
import { toast } from "react-toastify";
import { ChevronRight } from "lucide-react";

// Utility functions (from your original code)
const pmtvalue = (
    rate: number,
    nper: number,
    pv: number,
    fv: number,
    type: number,
) => {
    if (rate === 0) return -(pv + fv) / nper;
    const pvif = Math.pow(1 + rate, nper);
    let pmt = (-rate * (fv + pvif * pv)) / ((-1 + pvif) * (1 + rate * type));
    return pmt;
};

const RetirementPresentValue = (
    rate: number,
    nper: number,
    pmt: number,
    fv: number,
    type: number,
) => {
    let pv;
    if (rate === 0) pv = -fv - pmt * nper;
    else {
        const pvif = Math.pow(1 + rate, nper);
        pv = (-fv - (pmt * (1 + rate * type) * (pvif - 1)) / rate) / pvif;
    }
    return pv;
};

export default function RetirementPlanningCalculator() {
    const questions = [
        {
            question: "What is the ideal retirement age to plan for?",
            answer:
                "The ideal age depends on you, retirement age is subjective from person to person and you should be the one to decide when you want to retire and to help you plan for that this calculator has everything you will need.",
        },
        {
            question: "How much money will I need to retire comfortably?",
            answer:
                "It depends on your lifestyle, but the calculator personalizes the answer using your expenses and inflation.",
        },
        {
            question: "How does inflation impact my retirement planning?",
            answer:
                "Because your ₹50,000 lifestyle today could cost over ₹2.5 lakh a month in 30 years. Ignoring inflation is the biggest mistake.",
        },
        {
            question: "Does the calculator consider life expectancy?",
            answer:
                "Yes. It ensures your corpus lasts for the years you expect to live post-retirement.",
        },
        {
            question: "Can I plan for early retirement using this calculator?",
            answer:
                "Yes. Just enter your preferred retirement age and it will show the bigger savings you’ll need to fund more years without income.",
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

    // const [monthlySaving, setMonthlySaving] = useState("₹ 10,00,000");
    // const [rateOfReturn, setRateOfReturn] = useState("₹ 5,00,000");
    // const [period, setPeriod] = useState("24");

    // 🧮 Input states
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [monthlyExpenses, setMonthlyExpenses] = useState(30000);
    const [expectedInflationRate, setExpectedInflationRate] = useState<string | number>(6);
    const [currentSaving, setCurrentSaving] = useState(5000);
    const [existingCorpus, setExistingCorpus] = useState(200000);
    const [preRetirementReturns, setPreRetirementReturns] = useState<string | number>(12);
    const [postRetirementReturns, setPostRetirementReturns] = useState<string | number>(7);
    const [lifeExpectancy, setLifeExpectancy] = useState(20);

    // 📊 Output states
    const [yearToRetirement, setYearToRetirement] = useState(30);
    const [amountPostRetirementPM, setAmountPostRetirementPM] = useState(172305);
    const [corppusToBeAchive, setCorppusToBeAchive] = useState(37702271);
    const [
        corpusYouWillAccumalateWithCurrentSaving,
        setCorpusYouWillAccumalateWithCurrentSaving,
    ] = useState(17474821);
    const [
        corpusYouWillAccumalateWithExistingSaving,
        setCorpusYouWillAccumalateWithExistingSaving,
    ] = useState(5081744);
    const [sortfallAmount, setSortfallAmount] = useState(15145707);
    const [extraSavingPM, setExtraSavingPM] = useState(4963);
    const [isCalculated, setIsCalculated] = useState(false);

    // 🔹 Handle Calculate Button
    const handleCalculate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (
            !monthlyExpenses ||
            !expectedInflationRate ||
            !currentSaving ||
            !existingCorpus ||
            !preRetirementReturns ||
            !postRetirementReturns ||
            !lifeExpectancy
        ) {
            toast.error("Please make sure all required fields are filled in.");
            return;
        } else {
            if (currentAge >= retirementAge) {
                toast.error("Retirement Age must be greater than Current Age");
            } else {
                let retirement_yr = retirementAge - currentAge;
                let inflationR = 0.01 * Number(expectedInflationRate);
                let postRetirementReturn = 0.01 * Number(postRetirementReturns);
                let onePlusinflationR = 1 + inflationR;
                let onePluspostRetirementReturn = 1 + postRetirementReturn;
                let inflationAdjust =
                    onePluspostRetirementReturn / onePlusinflationR - 1;
                let inflationAdjustReturn = inflationAdjust / 12;
                let lifeExpectancy_yr = lifeExpectancy * 12;

                let fvvalue =
                    monthlyExpenses * Math.pow(onePlusinflationR, retirement_yr);
                let corpusAchieved = await RetirementPresentValue(
                    inflationAdjustReturn,
                    lifeExpectancy_yr,
                    -fvvalue,
                    0,
                    1,
                );

                let investment = currentSaving;
                let monthlyRate = Number(preRetirementReturns) / 12 / 100;
                let months = retirement_yr * 12;

                let corpus_month =
                    (investment * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate;
                corpus_month = Math.round(corpus_month);

                let pre_ret = 0.01 * Number(preRetirementReturns);
                let log = 1 + pre_ret;
                let n = 1 / 12.0;
                let pow = Math.pow(log, n);
                let nom = 12.0 * (pow - 1);
                let logg = 1 + nom;
                pow = Math.pow(logg, retirement_yr);

                let corpus_exist = existingCorpus * pow;
                let shortfall_amt = corpusAchieved - (corpus_month + corpus_exist);

                let nomialRate =
                    12.0 * (Math.pow(1 + Number(preRetirementReturns) * 0.01, 1 / 12.0) - 1);
                let nominalRateMonthly = parseFloat((nomialRate / 12).toFixed(9));
                let newsipamt = await pmtvalue(
                    nominalRateMonthly,
                    months,
                    0,
                    -shortfall_amt,
                    0,
                );

                setYearToRetirement(retirement_yr);
                setAmountPostRetirementPM(Math.round(fvvalue));
                setCorppusToBeAchive(Math.round(corpusAchieved));
                setCorpusYouWillAccumalateWithCurrentSaving(Math.round(corpus_month));
                setCorpusYouWillAccumalateWithExistingSaving(Math.round(corpus_exist));
                setSortfallAmount(Math.round(shortfall_amt));
                setExtraSavingPM(Math.round(newsipamt));
                setIsCalculated(true);
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
                    }}>Retirement Calculator</span>
                </nav>
                {/* Title */}
                <h2 className="text-[40px] md:text-3xl lg:text-5xl font-bold text-[#44475B]">
                    Retirement Calculator
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
                                                Current Age
                                            </label>
                                            <span className="font-bold text-[#44475B]">
                                                {currentAge} Yrs
                                            </span>
                                        </div>

                                        <RangeBar
                                            maxLimit={90}
                                            setValue={setCurrentAge}
                                            value={currentAge}
                                        />

                                        <div className="flex justify-between text-sm text-[#44475B] mt-2">
                                            <span>1 Yr</span>
                                            <span>90 Yrs</span>
                                        </div>
                                    </div>
                                    {/* Investment Period */}
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <label className="text-[#44475B] font-medium text-sm uppercase">
                                                Expected retirement age
                                            </label>
                                            <span className="font-bold text-[#44475B]">
                                                {retirementAge} Yrs
                                            </span>
                                        </div>

                                        <RangeBar
                                            maxLimit={80}
                                            setValue={setRetirementAge}
                                            value={retirementAge}
                                        />

                                        <div className="flex justify-between text-sm text-[#44475B] mt-2">
                                            <span>1 Yr</span>
                                            <span>80 Yrs</span>
                                        </div>
                                    </div>

                                    {/* Monthly Saving */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Monthly expenses for current lifestyle
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={monthlyExpenses}
                                            min={0}
                                            onChange={(e) =>
                                                setMonthlyExpenses(parseFloat(e.target.value))
                                            }
                                            placeholder="₹ 30,000"
                                        />
                                    </div>

                                    {/* Expected Rate of Return */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Expected Inflation Rate (%)
                                        </label>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={
                                                expectedInflationRate
                                            }
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
                                                    setExpectedInflationRate("");
                                                    return;
                                                }

                                                const num = parseFloat(val);

                                                if (val === "." || (!isNaN(num) && num >= 0 && num <= 100)) {
                                                    setExpectedInflationRate(val);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Current Savings per month
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={currentSaving}
                                            min={0}
                                            onChange={(e) =>
                                                setCurrentSaving(parseFloat(e.target.value))
                                            }
                                            placeholder="₹ 5,000"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Existing Corpus
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={existingCorpus}
                                            min={0}
                                            onChange={(e) =>
                                                setExistingCorpus(parseFloat(e.target.value))
                                            }
                                            placeholder="₹ 10,000"
                                        />
                                    </div>

                                    {/* Expected Rate of Return */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Expected pre-retirement returns (%)
                                        </label>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={preRetirementReturns}
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
                                                    setPreRetirementReturns("");
                                                    return;
                                                }

                                                const num = parseFloat(val);

                                                if (val === "." || (!isNaN(num) && num >= 0 && num <= 100)) {
                                                    setPreRetirementReturns(val);
                                                }
                                            }}
                                        />
                                    </div>
                                    {/* Expected Rate of Return */}
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Expected post-retirement returns (%)
                                        </label>
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={postRetirementReturns}
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
                                                    setPostRetirementReturns("");
                                                    return;
                                                }

                                                const num = parseFloat(val);

                                                if (val === "." || (!isNaN(num) && num >= 0 && num <= 100)) {
                                                    setPostRetirementReturns(val);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[#44475B] font-medium text-sm uppercase mb-2">
                                            Life Expectancy post-retirement (Yrs)
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#44475B]"
                                            value={lifeExpectancy}
                                            min={0}
                                            onChange={(e) =>
                                                setLifeExpectancy(parseFloat(e.target.value))
                                            }
                                            placeholder="₹ 10,000"
                                        />
                                    </div>


                                    {/* Button */}
                                    <button
                                        type="button"
                                        onClick={handleCalculate}
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
                                    <h2 className="font-primary font-semibold text-2xl leading-tight text-[rgba(33, 33, 33, 1)] mb-6">
                                        Result
                                    </h2>
                                    <label className="block text-[#4D4D4D] font-medium text-sm uppercase mb-2">
                                        Year to retirement
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-[#212121] font-bold mb-4">
                                        {yearToRetirement.toLocaleString("en-IN")}
                                    </p>
                                    {/* <hr className="my-8 border-[#D0DBEA] border-[1px]" /> */}
                                    {/* <h4 className="text-[rgba(33, 33, 33, 1)]  font-semibold text-xl leading-tight mb-6">
                                        Amount required P.M.- Post Retirement
                                    </h4> */}
                                    <label className="block text-[rgba(77, 77, 77, 1)] font-medium text-sm uppercase mb-2">
                                        Amount required P.M.- Post Retirement
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-[#212121] font-bold mb-4">
                                        ₹{amountPostRetirementPM.toLocaleString("en-IN")}
                                    </p>
                                    <label className="block text-[rgba(77, 77, 77, 1)] font-medium text-sm uppercase mb-2">
                                        Corpus to be achieved @ Retirement
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-[#212121] font-bold mb-4">
                                        ₹{corppusToBeAchive.toLocaleString("en-IN")}
                                    </p>
                                    {/* <label className="block text-[rgba(77, 77, 77, 1)] text-center font-medium text-sm uppercase mb-2">
                                        Or
                                    </label> */}
                                    <label className="block text-[rgba(77, 77, 77, 1)] font-medium text-sm uppercase mb-2">
                                        Corpus you will accumulate with current savings per month
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-[#212121] font-bold mb-4">
                                        ₹{corpusYouWillAccumalateWithCurrentSaving.toLocaleString("en-IN")}
                                    </p>
                                    <label className="block text-[rgba(77, 77, 77, 1)] font-medium text-sm uppercase mb-2">
                                        Corpus you will accumulate with existing savings
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-[#212121] font-bold mb-4">
                                        ₹{corpusYouWillAccumalateWithExistingSaving.toLocaleString("en-IN")}
                                    </p>
                                    <label className="block text-[rgba(77, 77, 77, 1)] font-medium text-sm uppercase mb-2">
                                        Shortfall in amount
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-[#212121] font-bold mb-4">
                                        ₹{sortfallAmount.toLocaleString("en-IN")}
                                    </p>
                                    <label className="block text-[rgba(77, 77, 77, 1)] font-medium text-sm uppercase mb-2">
                                        Extra savings per month required
                                    </label>
                                    <p className="font-primary text-base md:text-lg leading-relaxed text-[#212121] font-bold mb-4">
                                        ₹{extraSavingPM.toLocaleString("en-IN")}
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
                <h2 className="text-center text-[28px] md:text-3xl lg:text-5xl font-bold text-[#44475B] mt-16">All You Need To Know About <br />
                    Retirement Calculator</h2>
                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        What is a Retirement Calculator?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Here’s an uncomfortable truth (that most of us want to ignore).</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Most people spend more time planning a week-long vacation or for an anniversary than planning for retirement. Yet retirement isn’t a possibility. It’s definite. One day, the salary stops. Expenses don’t.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Medical bills won’t wait.<br />
                        Inflation won’t slow down.<br />
                        Your lifestyle won’t magically shrink just because you stopped working.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        So the real question is simple:<br />
                        Will your money last as long as you do?</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        This is exactly where a retirement calculator comes in. It removes guesswork and replaces it with clarity. It shows you how much you’ll actually need, where you currently stand, and what needs to change now so you don’t spend your later years dependent on others.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        The Prodigy Pro’s Retirement Calculator, developed by BFC Capital – a SEBI RIA, is built to answer these questions honestly – without sugarcoating.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        How Does the Retirement Calculator Help You?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        There are plenty of retirement calculators online. Most of them throw big numbers at you and leave you confused, but the Prodigy Pro Retirement Calculator is designed for real Indian investors. It doesn’t just throw random numbers at you; it adjusts for inflation, compares your savings against your goals, and highlights the gap you need to fill.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Here’s why it stands out:</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>Customized Projections:</b> It tailors results to your lifestyle, savings habits, and long-term goals.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>Inflation-Adjusted Figures:</b> It accounts for rising costs, so your numbers are realistic, not optimistic.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>Shortfall Insights:</b> It shows the gap between what you’ve saved and what you still need to save.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>Grounded in Indian Reality:</b> It reflects Indian inflation, investment returns, and retirement lifestyles.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        In essence, it bridges the gap between the life you imagine and the money you’ll actually need.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        How to Use Retirement Calculator
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 text-justify'>
                        Using the calculator is pretty straightforward and the simple for you, but the outcome can be  equally eye-opening:</p>
                    <p className="text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 text-justify">Enter your current age and the age at which you want to retire ideally. <br /><br />
                        Fill in your current monthly expenses, groceries, rent, utilities, healthcare, lifestyle expenses etc..<br /><br />
                        Add the inflation rate on priority, because ₹60,000 today won’t mean the same 20 years later, so it;s important you add the correct inflation rate.<br /><br />
                        Enter your monthly savings and any existing corpus (EPF, PPF, mutual funds, etc.) in any.<br /><br />
                        Input your expected returns, usually higher before retirement, lower after.<br /><br />
                        Add your life expectancy to see how long the money needs to last.<br /><br />

                        Click calculate, and get your roadmap: years left to retire, corpus required, shortfall, and how much extra you must save.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        It’s not just numbers, it’s a reality check.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        A Simple Example</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Say a 20-year-old wants to retire at 40. Their lifestyle costs ₹50,000 a month, inflation is 6%, and they save ₹10,000 monthly with an existing ₹2,00,000 corpus. With returns of 12% pre-retirement and 7% post-retirement, and a 20-year life expectancy after retirement, here’s what the calculator reveals:</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        They’ll need ₹3.5 crore at retirement.<br /> <br />
                        Their current savings will grow to ₹98.92 lakh.<br /> <br />
                        The shortfall: ₹2.34 crore.<br /> <br />
                        To fix it, they must increase savings from ₹10,000 to about ₹25,753 a month.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        It’s uncomfortable to see, but it’s better to confront it today than to struggle later.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Why People Trust the Retirement Calculator
                    </p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Simple to use – even if you’re new to investing</li>
                        <li>Built for Indian realities, not global templates</li>
                        <li>Instant adjustments – change one number and see the impact</li>
                        <li>Action-oriented – tells you what to do next, not just what’s wrong</li>
                        <li>Credible framework – designed with long-term financial discipline in mind</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Retirement isn’t a birthday.<br />
                        It’s a financial milestone.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        You don’t retire when you turn 60.<br />
                        You retire when your savings say you can.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        The BFC Capital’s Retirement Calculator isn’t here to scare you. It’s here to wake you up – early enough to do something about it.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        A comfortable retirement is not about luck or inheritance. It’s about planning, consistency, and facing the numbers honestly.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Spend two minutes today with the calculator.<br />
                        Because the earlier you confront reality, the more peaceful your golden years can actually be.</p>
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
