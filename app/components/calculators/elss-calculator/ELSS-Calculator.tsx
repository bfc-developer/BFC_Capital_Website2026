"use client";

import { useEffect, useState } from "react";

import { Form, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { ChevronRight } from "lucide-react";

export default function ELSSCalculatorComponent() {
    const questions = [
        {
            question: "How does an ELSS calculator work?",
            answer:
                "It uses your investment amount and tax bracket to instantly show how much tax you’ll save under Section 80C.",
        },
        {
            question:
                "What is the lock-in period for ELSS, and does the calculator consider it?",
            answer:
                "Yes. ELSS has a 3-year lock-in, the shortest among all 80C options, and the calculator factors this in.",
        },
        {
            question:
                "What is the maximum tax deduction I can claim under Section 80C?",
            answer:
                "₹1.5 lakh per financial year. Any investment beyond this limit does not qualify for additional deduction.",
        },
        {
            question:
                "How accurate are the projected returns shown in the ELSS calculator?",
            answer:
                "The calculator estimates tax savings, not market returns. Since ELSS invests in equities, actual returns can vary.",
        },
        {
            question: "Is ELSS better than PPF or other tax-saving instruments?",
            answer:
                "It depends on your goal. PPF offers fixed, low-risk returns. ELSS carries higher risk but significantly higher long-term wealth potential.",
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

    const [investmentAmount, setInvestmentAmount] = useState<number>(125000); // default value
    const [taxSlab, setTaxSlab] = useState<number>(20); // default tax slab
    const [totalTaxSaved, setTotalTaxSaved] = useState<number>(26000);

    const calculateTaxSaved = () => {
        if (!investmentAmount || !taxSlab) {
            toast.error("Please make sure all required fields are filled in.");
            return;
        } else {
            // Max eligible investment is 1.5 L
            const taxInvestment =
                investmentAmount > 150000 ? 150000 : investmentAmount;

            // Tax saved according to slab
            const taxValue = (taxInvestment * taxSlab) / 100;

            // Additional 4% cess
            const taxValuePercent = (taxValue * 4) / 100;

            const finalValue = Math.round(taxValue + taxValuePercent);

            setTotalTaxSaved(finalValue);
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
                    }}>ELSS Calculator</span>
                </nav>
                {/* Title */}
                <h2 className="text-[40px] md:text-3xl lg:text-5xl font-bold text-[#44475B]">
                    ELSS Calculator
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
                                        <label className="block text-[#44475B] font-medium uppercase mb-2">
                                            Investment Amount (Years)
                                        </label>
                                        <input
                                            type="number"
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#212121]"
                                            value={investmentAmount}
                                            min={0}
                                            onChange={(e) =>
                                                setInvestmentAmount(parseFloat(e.target.value))
                                            }
                                            placeholder="₹ 10,000"
                                        />
                                        <div className="d-flex justify-content-between small text-[#7A7A7A]">
                                            <span>
                                                Maximum eligible amount for tax deduction u/s 80C is 1.5
                                                L
                                            </span>
                                        </div>
                                    </div>
                                    {/* Expected Rate of Return */}
                                    <Form.Group className="mb-3">
                                        <Form.Label className="block text-[#44475B] font-medium uppercase mb-2">Your Tax Slab</Form.Label>
                                        <Form.Select
                                            value={taxSlab}
                                            onChange={(e) => setTaxSlab(Number(e.target.value))}
                                            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-[#212121]"
                                        >
                                            <option value={5}>5%</option>
                                            <option value={20}>20%</option>
                                            <option value={30}>30%</option>
                                        </Form.Select>

                                        <div className="d-flex justify-content-between small text-[#7A7A7A]">
                                            <span>Inclusive of all cess</span>
                                        </div>
                                    </Form.Group>

                                    {/* Button */}
                                    <button
                                        type="button"
                                        onClick={calculateTaxSaved}
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
                                        <p>Total Tax Saved U/S 80(C)</p>
                                        <h3 className="font-semibold">₹{totalTaxSaved.toLocaleString("en-IN")}</h3>
                                    </p>
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
                </div>
            </section>
            <section>
                <h2 className="text-center text-[28px] md:text-3xl lg:text-5xl font-bold text-[#44475B] mt-16">All You Need To Know About <br />
                    ELSS Calculator</h2>
                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        What Is an ELSS Calculator?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Let’s admit it.<br />
                        For most people in India, tax planning begins and ends in March – when panic kicks in and money is parked somewhere just to save tax.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>That’s precisely where an ELSS Calculator becomes useful.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>An ELSS (Equity Linked Savings Scheme) Calculator is a simple tool that tells you one thing very clearly:<br />
                        How much tax you actually save by investing in ELSS mutual funds.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Since ELSS investments qualify for deductions under Section 80C of the Income Tax Act (up to ₹1.5 lakh), the calculator removes all guesswork. No formulas. No assumptions. Just instant clarity.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>With the ELSS Calculator, you only need two inputs:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li><b>The amount you plan to invest</b></li>
                        <li><b>Your tax slab</b></li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>And in seconds, it shows you your exact tax saving – including cess.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 font-inter'>At <b>BFC Capital</b>, this is how we like investors to approach tax planning:<br />
                        Understand first. Invest later.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        How Does an ELSS Calculator Work?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>The logic is refreshingly simple.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>Your tax saving depends on:</p>
                    <ol className='list-decimal pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>How much you invest</li>
                        <li>Which tax slab you fall into</li>
                    </ol>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>For example:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>If you invest ₹1,00,000 and you’re in the 20% tax slab, you save about ₹20,800</li>
                        <li>If you’re in the 30% tax slab, the same investment saves you ₹31,200</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>The calculation itself isn’t complicated – but doing it manually every time is tedious and error-prone. The calculator does it instantly and accurately, every single time.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        How Does ELSS Calculator Actually Help You?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>This isn’t just about numbers. It’s about better decision-making.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto font-bold'>1. Clear, Honest Tax Benefits</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>No more rough estimates or “around this much” answers. You see the exact tax saving, which makes your decision fact-based, not emotional.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto font-bold'>2. Pushes You Towards Early Planning</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Why wait till March and invest in a hurry?<br />
                        Using the calculator early lets you plan ELSS investments across the year – even via SIPs – bringing discipline and reducing risk.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto font-bold'>3. Tailored to Your Tax Slab</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Someone in the 30% slab benefits far more than someone in the 5% slab. The calculator personalises results so you’re not comparing apples with oranges.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto font-bold'>4. Beginner-Friendly by Design</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Even if tax jargon makes your head spin, this tool doesn’t. You can use it comfortably in under a minute.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        How to Use ELSS Calculator
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>No learning curve. No confusion.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto font-bold'>Step 1: Enter the Investment Amount</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Put in the amount you’re planning to invest in ELSS.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto font-bold'>Step 2: Select Your Tax Slab</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Choose between 5%, 20%, or 30%.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto font-bold'>Step 3: Click “Calculate”</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Instantly see how much tax you’ll save.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>Example 1</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Investment: ₹90,000</li>
                        <li>Tax Slab: 20%</li>
                        <li>Tax Saved: ₹18,720</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>Example 2</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>Investment: ₹1,50,000</li>
                        <li>Tax Slab: 30%</li>
                        <li>Tax Saved: ₹46,800</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Within seconds, the impact is clear.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Final Thoughts (Read This Before You Invest)
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Tax planning doesn’t have to be rushed, confusing, or stressful.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>The ELSS Calculator helps you:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <li>See your tax savings clearly</li>
                        <li>Plan investments smartly</li>
                        <li>Explore SIPs in ELSS instead of last-minute lump sums</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>But here’s an important advisory note.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Before jumping into ELSS or any tax-saving instrument, take a moment to understand which tax regime you’re in. With the new tax regime, investing in ELSS may not even be necessary for everyone.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>That’s why we strongly recommend watching the linked video before you invest. Good tax planning isn’t about saving blindly, it’s about choosing what actually makes sense for you.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[#17px] leading-relaxed font-inter mx-auto mb-4'>Because real tax planning isn’t just about saving today.<br />
                        It’s about building intelligently for tomorrow.</p>
                </div>


            </section >
            <section>
                <h2 className="text-center text-[28px] md:text-3xl lg:text-5xl font-bold text-[#44475B] mt-16">FAQs</h2>
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
