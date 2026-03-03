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

export default function Marriagecalculators() {
    const questions = [
        {
            question: "Does the Marriage Calculator factor in inflation?",
            answer:
                "Yes. That’s its biggest strength. A wedding costing ₹15 lakhs today can inflate to ₹50–60 lakhs in 15 years. The calculator adjusts for this rise.",
        },
        {
            question: "How can the Marriage Planning Calculator help?",
            answer:
                "It’s very useful for couples planning their own weddings in 2–5 years or parents planning for their child’s marriage some years down the line to get an approximate figure with inflation-adjusted estimates. This helps them accurately plan in advance.",
        },
        {
            question: "Can I link marriage planning with SIPs or mutual funds?",
            answer:
                "Absolutely. In fact, that’s the smartest way. For long horizons (10+ years), equity SIPs compound your money faster and beat inflation.",
        },
        {
            question: "Why is Marriage Calculator Important?",
            answer:
                "Because it’s designed around Indian wedding costs, inflation, and savings patterns. It doesn’t just give you numbers: it gives you a clear action plan.",
        },
    ];

    const [childAge, setChildAge] = useState(8);
    const [marriageAge, setMarriageAge] = useState(24);
    const [amountRequired, setAmountRequired] = useState(1000000);
    const [annualSaving, setAnnualSaving] = useState(50000);
    const [rateOfReturn, setRateOfReturn] = useState<string | number>(12);
    const [inflation, setInflation] = useState<string | number>(6);

    const [results, setResults] = useState({
        inflationAdjustedCost: 2540352,
        futureValue: 2137664,
        additionalFund: 402688,
        monthlyInvest: 700,
        lumpsum: 65687,
    });

    const calculateResults = (e: any) => {
        e.preventDefault();
        if (!amountRequired || !annualSaving || !rateOfReturn || !inflation) {
            toast.error("Please make sure all required fields are filled in.");
            return;
        } else {
            if (marriageAge <= childAge) {
                toast.error(
                    `⚠️ Marriage age (${marriageAge} ${marriageAge === 1 ? "year" : "years"
                    }) cannot be less than or equal to child's current age (${childAge} ${childAge === 1 ? "year" : "years"
                    }).`,
                );
            } else {
                e.preventDefault();
                const years = marriageAge - childAge;

                const inflationAdjustedCost = Math.round(
                    amountRequired * Math.pow(1 + Number(inflation) / 100, years),
                );

                const futureValue = Math.round(
                    annualSaving *
                    ((Math.pow(1 + Number(rateOfReturn) / 100, years) - 1) /
                        (Number(rateOfReturn) / 100)),
                );

                const additionalFund = inflationAdjustedCost - futureValue;

                const n = years * 12;
                const monthlyRate = Number(rateOfReturn) / 12 / 100;
                const monthlyInvest = Math.round(
                    (additionalFund * monthlyRate) / (Math.pow(1 + monthlyRate, n) - 1),
                );

                const lumpsum = Math.round(
                    additionalFund / Math.pow(1 + Number(rateOfReturn) / 100, years),
                );

                setResults({
                    inflationAdjustedCost,
                    futureValue,
                    additionalFund,
                    monthlyInvest,
                    lumpsum,
                });
            }
        }
    };

    return (
        <>
            <section className="pt-4 overflow-hidden">
                <div className="container">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb small">
                            <li className="breadcrumb-item">
                                <Link href="/">Home</Link>
                            </li>
                            <li className="breadcrumb-item">
                                <Link href={"/calculators"}>Calculators</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Marriage Planning
                            </li>
                        </ol>
                    </nav>

                    <div
                        className="smart_heading_prodgy text-start"
                        data-aos="fade-right"
                    >
                        <h2 className="py-1 text-start">Marriage Planning</h2>
                    </div>

                    <div className="row py-md-4 justify-content-between py-2">
                        <div className="col-md-6 col-12 py-2">
                            <div className="sip_calculators_prodgy me-lg-3">
                                <Form onSubmit={calculateResults}>
                                    {/* Child Age */}
                                    <Form.Group className="mb-4">
                                        <Form.Label className="d-flex justify-content-between">
                                            <span>Child Age Today (Years)</span>
                                            <span
                                                className="fw-bolder normal-case"
                                            >
                                                {childAge} Yrs
                                            </span>
                                        </Form.Label>
                                        {/* <Form.Range
                      min="1"
                      max="30"
                      value={childAge}
                      onChange={(e) => setChildAge(parseInt(e.target.value))}
                    /> */}
                                        <RangeBar
                                            maxLimit={30}
                                            setValue={setChildAge}
                                            value={childAge}
                                        />
                                        <div className="d-flex justify-content-between small text-muted">
                                            <span>1 Yr</span>
                                            <span>30 Yrs</span>
                                        </div>
                                    </Form.Group>

                                    {/* Marriage Age */}
                                    <Form.Group className="mb-4">
                                        <Form.Label className="d-flex justify-content-between">
                                            <span>Child will get married at the age</span>
                                            <span className="fw-bolder normal-case">{marriageAge} Yrs</span>
                                        </Form.Label>
                                        {/* <Form.Range
                      min="1"
                      max="30"
                      value={marriageAge}
                      onChange={(e) => setMarriageAge(parseInt(e.target.value))}
                    /> */}
                                        <RangeBar
                                            maxLimit={40}
                                            setValue={setMarriageAge}
                                            value={marriageAge}
                                        />
                                        <div className="d-flex justify-content-between small text-muted">
                                            <span>1 Yr</span>
                                            <span>40 Yrs</span>
                                        </div>
                                    </Form.Group>

                                    {/* Amount Required */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Amount required for wedding as on today
                                        </Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={amountRequired}
                                            min={0}
                                            onChange={(e) =>
                                                setAmountRequired(parseFloat(e.target.value))
                                            }
                                        />
                                    </Form.Group>

                                    {/* Annual Saving */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Annual Savings</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={annualSaving}
                                            min={0}
                                            onChange={(e) =>
                                                setAnnualSaving(parseFloat(e.target.value))
                                            }
                                        />
                                    </Form.Group>

                                    {/* Rate of Return */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Expected Rate of returns (%)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            inputMode="decimal"
                                            value={rateOfReturn}
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
                                    </Form.Group>

                                    {/* Inflation */}
                                    <Form.Group className="mb-3">
                                        <Form.Label>Expected Inflation (%)</Form.Label>
                                        <Form.Control
                                            type="text"
                                            inputMode="decimal"
                                            value={inflation}
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
                                                    setInflation("");
                                                    return;
                                                }

                                                const num = parseFloat(val);

                                                if (val === "." || (!isNaN(num) && num >= 0 && num <= 100)) {
                                                    setInflation(val);
                                                }
                                            }}
                                        />
                                    </Form.Group>

                                    {/* Button */}
                                    <Button variant="primary" className="prodgybtn" type="submit">
                                        Calculate
                                    </Button>
                                </Form>
                            </div>
                        </div>

                        {/* Results */}
                        <div className="col-md-6 col-12 py-2">
                            <div className="ps-lg-3">
                                <div
                                    className="sip-calculate-results mb-0"
                                    data-aos="fade-left"
                                >
                                    <div className="result-container marriageplanning">
                                        <h2>Result</h2>
                                        <div className="result-item">
                                            <p>INFLATION ADJUSTED COST</p>
                                            <h3>
                                                ₹{results.inflationAdjustedCost.toLocaleString("en-IN")}
                                            </h3>
                                        </div>
                                        <div className="result-item">
                                            <p>FUTURE VALUE OF SAVINGS</p>
                                            <h3>₹{results.futureValue.toLocaleString("en-IN")}</h3>
                                        </div>
                                        <div className="result-item">
                                            <p>ADDITIONAL FUNDS REQUIRED TO MEET EXPENSES</p>
                                            <h3>₹{results.additionalFund.toLocaleString("en-IN")}</h3>
                                        </div>
                                        <div className="result-item">
                                            <p>ONE TIME INVESTMENT REQUIRED</p>
                                            <h3>₹{results.lumpsum.toLocaleString("en-IN")}</h3>
                                        </div>
                                        <div className="result-item">
                                            <p>MONTHLY INVESTMENT REQUIRED</p>
                                            <h3>₹{results.monthlyInvest.toLocaleString("en-IN")}</h3>
                                        </div>
                                    </div>
                                </div>

                                <div className="social_yb rounded" data-aos="fade-left">
                                    <Link
                                        href="https://app.prodigypro.co.in/"
                                        className="rounded fw-normal calc_invest_btn"
                                    >
                                        <b>Invest Now</b>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container my-md-5 d-flex justify-content-center"></div>

            <section className="pb-5 pt-md-2 pt-0">
                <div className="container">
                    <div className="row">
                        <div
                            className="col-md-8 col-12 order-md-1 order-2 py-2"
                            data-aos="fade-up"
                        >
                            <div className="me-lg-5 px-md-0 px-2">
                                <div className="sip-calculator-aboutProdgy text-start">
                                    <h2 className="w-75 pb-3">
                                        All You Need To Know About Marriage Calculator
                                    </h2>

                                    <h3>What is a Marriage Calculator?</h3>
                                    <p className="">
                                        Picture this: today, a well-organised wedding in India can
                                        easily cost ₹15–20 lakhs, and keeping in mind the trends on
                                        social media, maybe even more. Fast forward 10–12 years the
                                        same wedding may cross ₹40–50 lakhs because wedding costs
                                        rise much faster than general inflation.
                                    </p>

                                    <p className="">
                                        That’s where Prodigy Pro’s Marriage Planning Calculator
                                        steps in. It’s a smart online tool that doesn’t just show
                                        you the future value of wedding expenses but also tells you
                                        how much you should start saving or investing monthly to
                                        meet that goal without stress.
                                    </p>
                                    <p className="">
                                        Think of it as your personal wedding budget maker, as it
                                        gives you the exact route from today’s savings to tomorrow’s
                                        big day.
                                    </p>
                                    <h3>How Can a Marriage Calculator Help You Plan Better?</h3>
                                    <p>
                                        Most families don’t realise how steep wedding costs can
                                        climb until it’s too late and they get burdened with too
                                        many expenses and too little money to spend. Imagine
                                        dreaming of getting married in Udaipur, only to realise you
                                        cannot afford it. Why? Because you never planned accordingly
                                        for it! This often leads to loans, withdrawing money from
                                        retirement savings, or even cutting down on the dream
                                        celebration. Your wedding is a big deal, and nothing should
                                        prevent you from getting married the way you have always
                                        envisioned! <br />
                                        The marriage planning calculator can help you make that
                                        dream a reality by doing three powerful things:
                                    </p>
                                    <p>1. Accurate Future Cost Estimation</p>
                                    <p>
                                        Say your daughter’s wedding would cost ₹15 lakhs today.
                                        Assuming an inflation rate of 9%, expenses will rise to
                                        approximately ₹55 lakhs in 15 years. Without a clear plan,
                                        this amount can seem overwhelming. But when you see the
                                        number in advance, you know exactly what you’re working
                                        towards.
                                    </p>
                                    <p>2. Tells You How Much to Save Monthly</p>
                                    <p>
                                        Instead of getting overwhelmed by seeing a huge future cost,
                                        the Prodigy Pro calculator breaks it down into simple,
                                        actionable steps. It tells you exactly how much you need to
                                        save and invest regularly so that the big number feels less
                                        intimidating. In other words, it converts a seemingly
                                        impossible goal into a manageable monthly commitment you can
                                        actually stick to.
                                    </p>
                                    <p>3. Prevents Overspending</p>
                                    <p>
                                        Many families overshoot budgets in the last few months-extra
                                        guests, a fancier venue, better photography packages. By
                                        fixing a realistic number early with the calculator, you
                                        already know your boundaries and can plan luxuries
                                        accordingly.
                                    </p>
                                    <p>
                                        One amazing fact about this tool is that it's completely
                                        flexible for both parents and young couples. Parents can
                                        start saving when children are young (10–15 years away from
                                        the event), while couples planning their own wedding in 2–5
                                        years can use it to know how much to set aside each month.
                                    </p>

                                    <h3>How to Use Prodigy Pro’s Marriage Planning Calculator</h3>
                                    <p>
                                        The beauty of this tool lies in its simplicity. You just
                                        enter:
                                    </p>
                                    <ul className="listshow_prodigy12">
                                        <li>
                                            Current Age - your child’s or your own, to know the time
                                            left.
                                        </li>
                                        <li>
                                            Marriage Age - expected age of marriage (e.g., 25 years).
                                        </li>
                                        <li>Current Cost of Wedding - say ₹15 lakhs.</li>
                                        <li>
                                            Annual Savings (if any) - Money already set aside
                                            specifically for this goal.
                                        </li>
                                        <li>
                                            Expected Return Rate - depending on your investment, you
                                            need to enter the expected rate of return. Let’s say you
                                            are investing in an equity mutual fund, so this figure
                                            should lie between 12-14%.
                                        </li>
                                        <li>
                                            Expected Inflation Rate - usually 8-10% for Indian
                                            weddings.
                                        </li>
                                    </ul>
                                    <p>Hit calculate, and in seconds, you’ll see:</p>
                                    <ul className="listshow_prodigy12">
                                        <li>The inflation-adjusted cost of the wedding.</li>
                                        <li>Future value of your savings.</li>
                                        <li>
                                            The monthly SIP or one-time investment needed to cover the
                                            gap.
                                        </li>
                                    </ul>
                                    <p>For Example:</p>
                                    <ul className="listshow_prodigy12">
                                        <li>Daughter’s age: 10 years</li>
                                        <li>Marriage age: 25 years</li>
                                        <li>Current wedding cost: ₹15 lakhs</li>
                                        <li>Annual savings:₹ 20,000</li>
                                        <li>Expected inflation: 9%</li>
                                        <li>Expected returns: 14%</li>
                                    </ul>
                                    <p>
                                        Future wedding cost after adjusting for inflation: ₹54.6
                                        lakhs
                                        <br />
                                        Future value of existing savings: ₹8.76 lakhs <br />
                                        Additional funds required: ₹45.8 Lakhs <br />
                                        Required monthly SIP: ₹7,572 for 15 years <br />
                                        Lump sum investment needed today: ₹6,42,605
                                    </p>
                                    <p>This way, you don’t leave anything to chance.</p>
                                    <h3>How to Choose the Right Marriage Calculator</h3>
                                    <p>
                                        Not all calculators are created equal. Here’s what makes
                                        Prodigy Pro’s Marriage Calculator stand out:
                                    </p>
                                    <p>
                                        Inflation Accuracy - It lets you set realistic inflation
                                        rates for wedding costs (8–12%).
                                    </p>
                                    <p>
                                        Goal-Based Savings - It tells you not just “how much” but
                                        “how” to save monthly SIP or lump sum investing.
                                    </p>
                                    <p>
                                        Simple, Clear Design - No jargon, no complications. Just
                                        numbers you can understand.
                                    </p>
                                    <p>
                                        Integrates with Other Goals - You can plan a wedding without
                                        derailing education or retirement goals.
                                    </p>
                                    <p>
                                        Weddings are emotional, once-in-a-lifetime events. But
                                        emotions shouldn’t translate into financial stress. Prodigy
                                        Pro’s Marriage Calculator gives you the clarity to enjoy the
                                        big day without last-minute compromises or debt.
                                    </p>
                                    <p>
                                        Think of it this way: would you plan a wedding menu without
                                        knowing the number of guests? Of course not. Then why plan
                                        finances without knowing the future cost?
                                    </p>
                                    <p>
                                        Start today, run the numbers, and let your money quietly
                                        work in the background. When the day finally comes, you’ll
                                        be able to celebrate with joy, not worry.
                                    </p>
                                </div>

                                <div className="py-4 smart_heading_prodgy">
                                    <h2 className="text-start">FAQs</h2>
                                    <p className="text-start w-100">
                                        Questions on your mind? Dont worry we have the answers!
                                    </p>
                                </div>

                                <div className="accordion_prodgy_home">
                                    <Accordion flush>
                                        {questions.map((item, index) => (
                                            <Accordion.Item eventKey={index.toString()} key={index}>
                                                <Accordion.Header>{item.question}</Accordion.Header>
                                                <Accordion.Body>{item.answer}</Accordion.Body>
                                            </Accordion.Item>
                                        ))}
                                    </Accordion>
                                </div>
                            </div>
                        </div>

                        <div
                            className="col-md-4 col-12 order-md-2 order-1 py-2 position-relative"
                            data-aos="zoom-in"
                        >

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
