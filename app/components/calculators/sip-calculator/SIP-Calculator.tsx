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

export default function Sipcalculators() {
    const questions = [
        {
            question: "How accurate are SIP Calculator results?",
            answer:
                "No, it’s an estimate. Returns in mutual funds depend on market performance, so the calculator gives you a projected figure, not a guarantee.",
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

    const yearInString = (): string[] => {
        let xAxisArray: string[] = [];
        if (totalYear > 16) {
            for (let i = 1; i <= totalYear; i += 2) xAxisArray.push(i + "Y");
            if (totalYear % 2 === 0) xAxisArray.push(totalYear + "Y");
        } else {
            for (let i = 1; i <= totalYear; i++) xAxisArray.push(i + "Y");
        }
        return xAxisArray;
    };

    const valueForGraph = (data: number): number[] => {
        let graphValue: number[] = [];
        if (totalYear > 16) {
            for (let i = totalYear; i > 0; i -= 2)
                graphValue.push(Math.round(data / i));
            if (totalYear % 2 === 0) graphValue.push(Math.round(data));
        } else {
            for (let i = totalYear; i > 0; i--) graphValue.push(Math.round(data / i));
        }
        return graphValue;
    };

    const [chartState, setChartState] = useState<ChartState>({
        series: [
            { name: "Market Value", data: valueForGraph(gains + totalMonthlySaving) },
            { name: "Invested Amount", data: valueForGraph(totalMonthlySaving) },
        ],
        options: {
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
            setChartState({
                series: [
                    { name: "Market Value", data: valueForGraph(totalSaving + gain) },
                    { name: "Invested Amount", data: valueForGraph(totalSaving) },
                ],
                options: {
                    ...chartState.options,
                    xaxis: { categories: yearInString() },
                },
            });
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
                                SIP Calculator
                            </li>
                        </ol>
                    </nav>

                    <div
                        className="smart_heading_prodgy text-start mt-4"
                        data-aos="fade-right"
                    >
                        <h2 className="py-1 text-start">SIP Calculator</h2>
                    </div>

                    <div className="row py-md-4 justify-content-between py-2">
                        <div className="col-md-6 col-12 py-2">
                            <div className="sip_calculators_prodgy me-lg-3">
                                <Form>
                                    {/* Monthly Saving */}
                                    <Form.Group className="mb-3">
                                        <Form.Label className="">MONTHLY SAVING</Form.Label>
                                        <Form.Control
                                            type="number"
                                            value={monthlySaving}
                                            min={0}
                                            onChange={(e) =>
                                                setMonthlySaving(parseFloat(e.target.value))
                                            }
                                            placeholder="₹ 10,000"
                                        />
                                    </Form.Group>

                                    {/* Expected Rate of Return */}
                                    <Form.Group className="mb-3">
                                        <Form.Label className="">
                                            EXPECTED RATE OF RETURN (% P.A)
                                        </Form.Label>
                                        <Form.Control
                                            type="text" // 👈 IMPORTANT: not number
                                            inputMode="decimal" // 👈 still shows numeric keyboard on mobile
                                            value={
                                                expectedRateOfReturn
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
                                                    setExpectedRateOfReturn("");
                                                    return;
                                                }

                                                const num = parseFloat(val);

                                                if (val === "." || (!isNaN(num) && num >= 0 && num <= 100)) {
                                                    setExpectedRateOfReturn(val);
                                                }
                                            }}
                                        />
                                    </Form.Group>

                                    {/* Investment Period */}
                                    <Form.Group className="mb-4">
                                        <Form.Label className=" d-flex justify-content-between">
                                            <span>INVESTMENT PERIOD</span>
                                            <span
                                                className="fw-bolder normal-case"
                                            >
                                                {investmentPeriod} Yrs
                                            </span>
                                        </Form.Label>
                                        {/* <Form.Range
                      min="1"
                      max="30"
                      value={investmentPeriod}
                      onChange={(e) =>
                        setInvestmentPeriod(parseFloat(e.target.value))
                      }
                    /> */}

                                        <RangeBar
                                            maxLimit={30}
                                            setValue={setInvestmentPeriod}
                                            value={investmentPeriod}
                                        />
                                        <div className="d-flex justify-content-between small text-muted">
                                            <span>1 Yr</span>
                                            <span>30 Yrs</span>
                                        </div>
                                    </Form.Group>

                                    {/* Button */}
                                    <Button
                                        variant="primary"
                                        className="prodgybtn"
                                        onClick={calculateSip}
                                    >
                                        Calculate
                                    </Button>
                                </Form>
                            </div>
                        </div>
                        <div className="col-md-6 col-12 py-2">
                            <div className="ps-lg-3">
                                <div
                                    className="sip-calculate-results mb-4"
                                    data-aos="fade-left"
                                >
                                    <h2>Result</h2>
                                    <p>
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

                                <div
                                    className="sip-calculator-chartprodgy mb-2"
                                    data-aos="fade-left"
                                >
                                    {/* <Image
                    src="/images/calculator/sip-chart.png"
                    alt="Prodigy Splash Screen"
                    width={1000}
                    height={300}
                    className="img-fluid"
                    data-aos="fade-up"
                    data-aos-duration="500"
                  /> */}

                                    <div className="card-body">
                                        <ReactApexChart
                                            options={chartState.options}
                                            series={chartState.series}
                                            type="area"
                                            height={350}
                                        />
                                    </div>
                                </div>
                                <div className="social_yb rounded" data-aos="fade-left">
                                    <Link
                                        href="https://app.prodigypro.co.in/"
                                        className="rounded calc_invest_btn"
                                    >
                                        <b>Invest Now</b>{" "}
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
                                        All You Need To Know About SIP Calculator
                                    </h2>

                                    <h3>What is an SIP Calculator?</h3>
                                    <p className="">
                                        Let’s start simple. Imagine you put aside ₹5,000 every month
                                        in a piggy bank. After 12 months, you’d have ₹60,000, sounds
                                        fair, right?  But in the world of investing, that piggy bank
                                        isn’t just storing your money; it’s actually growing it!And
                                        one of the most affordable, comfortable, and systematic ways
                                        of growing your money is through an SIP, and this is where
                                        Prodigy Pro’s SIP calculator comes in.
                                    </p>
                                    <p>
                                        A Systematic Investment Plan (SIP) Calculator is an online
                                        tool that tells you approximately how much your monthly
                                        investments can grow over time. Just like a map shows you
                                        the destination before you start driving, this calculator
                                        shows you your estimated future wealth before you start
                                        investing.
                                    </p>
                                    <h3>How Can a SIP Calculator Help You?</h3>
                                    <p>
                                        Investing without a plan is like setting off on a road trip
                                        without Google Maps; Imagine where you’d end up without any
                                        direction at all! Now, the same goes for your investments as
                                        well, and this is exactly where this tool comes in handy!The
                                        SIP calculator keeps you on track by:
                                    </p>
                                    <p>
                                        Setting Clear Goals Want ₹25 lakhs for your child’s
                                        education in 15 years? Or 20 lakhs for your wedding after 5
                                        years? The calculator will tell you how much to invest
                                        monthly to get there.
                                    </p>
                                    <p>
                                        Showing the Power of Compounding For example, ₹5,000/month
                                        for 10 years at 12% return grows to around ₹11.6 lakhs. You
                                        invested ₹6 lakhs, but compounding created an extra ₹5.6
                                        lakhs for you in terms of profit.
                                    </p>
                                    <p>
                                        Building Discipline Once you know your target and the
                                        monthly investment needed, it’s easier to stick with the
                                        plan and avoid impulsive decisions like withdrawing your
                                        money to meet personal expenses. SIPs are the best way to
                                        build investing discipline due to their recurring and
                                        automated nature.
                                    </p>
                                    <h3>How Do SIP Calculators Work?</h3>
                                    <p>
                                        At its core, an SIP calculator uses one simple theory:
                                        compounding.
                                    </p>
                                    <ul className="listshow_prodigy12">
                                        <li>Every month, you invest a fixed amount.</li>
                                        <li>That money earns returns.</li>
                                        <li>
                                            Those returns are reinvested and start earning returns of
                                            their own.
                                        </li>
                                    </ul>
                                    <p>
                                        Over time, this snowball effect turns small contributions
                                        into big wealth. The calculator just automates the math, so
                                        you don’t need a spreadsheet.
                                    </p>

                                    <h3>
                                        How to Use the Prodigy Pro’s Systematic Investment Plan
                                        Calculator?
                                    </h3>
                                    <p>
                                        The Prodigy Pro’s SIP Calculator is designed to be
                                        beginner-friendly and quick. All it takes are three inputs:
                                    </p>
                                    <p>Monthly Savings - e.g., ₹5,000/month.</p>
                                    <p>Investment Period - say 10 years.</p>
                                    <p>Expected Return Rate - let’s assume approx-12%.</p>
                                    <p>Hit Calculate and you’ll instantly see:</p>
                                    <p>Amount Invested – total money you contributed.</p>
                                    <p>
                                        Market Value – total future value you might get after 10
                                        years.
                                    </p>
                                    <p>Returns – the profit earned over your investment value.</p>
                                    <p>
                                        <strong>Example: </strong> <br />
                                        ₹5,000/month × 10 years @ 12% return <br />
                                        Invested: ₹6,00,000 <br />
                                        Future Value: ~₹11.6 lakhs!
                                    </p>
                                    <p>That’s compounding doing its job silently.</p>
                                    <h3>Systematic Investment Plans (SIPs) in India</h3>
                                    <p>
                                        SIPs are one of the simplest and most popular ways to invest
                                        in mutual funds. Instead of putting all your money as a lump
                                        sum, you invest a fixed amount regularly on a fixed date
                                        from a bank account. Even ₹500/month is enough to start;
                                        some SIPs begin with as little as ₹ 250.
                                    </p>
                                    <p>Why they work so well in India? Here’s why: </p>
                                    <ul className="listshow_prodigy12">
                                        <li>
                                            They encourage discipline among salaried individuals.
                                        </li>
                                        <li>
                                            They reduce the stress of market timing since you invest
                                            at regular intervals.
                                        </li>
                                        <li>
                                            They are perfect for long-term goals like education,
                                            buying a house, or retirement.
                                        </li>
                                    </ul>
                                    <h3>Types of SIPs</h3>
                                    <p>
                                        SIPs aren’t rigid at all! <br /> You can choose what suits
                                        your lifestyle.
                                    </p>
                                    <p>
                                        <strong>Step-Up SIP </strong> <br />
                                        Start small and increase gradually. Example: begin with
                                        ₹2,000/month, increase by ₹500 every year as your salary
                                        grows.
                                    </p>
                                    <p>
                                        <strong>Top-Up SIP </strong> <br />
                                        Add extra whenever you can. Got a Diwali bonus? Add ₹10,000
                                        to your SIP. No compulsion, just flexibility to boost
                                        returns.
                                    </p>
                                    <h3>
                                        Why use Prodigy Pro’s online SIP calculator over others?
                                    </h3>
                                    <ul className="listshow_prodigy12">
                                        <li>
                                            Long-Term Clarity: Shows how your ₹500 today can become
                                            lakhs tomorrow.
                                        </li>
                                        <li>
                                            Structured Goal Planning: Calculate how much you need to
                                            reach a specific target.
                                        </li>
                                        <li>User-Friendly: Clean, quick, no jargon.</li>
                                        <li>
                                            Smarter Decisions: Compare different SIP amounts before
                                            committing.
                                        </li>
                                        <li>
                                            Transparency:  Clearly shows invested vs. earned, so no
                                            surprises.
                                        </li>
                                    </ul>
                                    <p>
                                        At the end of the day, money management is really about two
                                        things: clarity and consistency. The SIP Calculator is like
                                        that honest friend who doesn’t sugarcoat the truth but shows
                                        you exactly where your money can take you if you stay
                                        disciplined. Whether it’s saving for your child’s future,
                                        your dream home, or just building a safety cushion for
                                        tomorrow, this simple tool removes the guesswork and
                                        replaces it with a clear roadmap.
                                    </p>
                                    <p>
                                        Think of it this way: your piggy bank grows only when you
                                        put something in. But with SIPs, your piggy bank is not just
                                        storing, it’s working 24/7 for you. And that’s where the
                                        magic of compounding-and a simple calculator-changes the
                                        game.
                                    </p>
                                    <p>
                                        So the next time you feel investing is “too complicated” or
                                        “meant only for experts,” remember this: all it takes is a
                                        fixed sum, a fixed date, and a small tool like Prodigy Pro’s
                                        SIP calculator to start building wealth that works while you
                                        sleep.
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
