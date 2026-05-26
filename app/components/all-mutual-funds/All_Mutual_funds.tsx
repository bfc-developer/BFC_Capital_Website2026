"use client";
import { useState } from "react";
import Image from "next/image";
import { apiBaseURL, endpoints, imageUrl } from "@/app/components/urls/URLS";
import { useGlobalLoader } from "@/app/components/common/GlobalLoader";
import React from "react";
import { useEffect } from "react";
import Link from "next/link";
import FilterPanel from "../common/FilterPanel";

interface Filters {
    type?: string;
    category?: string[];
    amc?: string[];
    risk?: string;
    sortBy?: string;
}
interface SchemeItem {
    accord_scheme_code: string | number;
    scheme_name: string;
    accordAMCCode: number;
    category: string;
    threeYearsReturn: number;
    sipMinInstallmentAmount: number;
    fundSize: number;
}


export default function AllMutualFunds() {
    const firstLoad = React.useRef(true);
    const loadToEndRef = React.useRef(false); // Ref for "Prev" across pages
    const [uiPage, setUiPage] = useState(1);
    const [apiPage, setApiPage] = useState(1);
    const [startIndex, setStartIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [showFilter, setShowFilter] = useState(false);
    const [filters, setFilters] = useState<Filters>({});
    // const [loading, setLoading] = useState(false);
    const [schemes, setSchemes] = useState<SchemeItem[]>([]);
    const { showLoader, hideLoader, loading } = useGlobalLoader();
    const [pageReady, setPageReady] = useState(false);
    const fundsRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        setApiPage(1);
        setUiPage(1);
        setStartIndex(0);
    }, [filters]);

    useEffect(() => {
        const loadSchemes = async () => {
            showLoader();

            try {
                const query = new URLSearchParams({
                    page: String(apiPage),
                    pageSize: "7",
                    returns: "3",
                    sort: filters.sortBy || "",
                    risk_code: filters.risk || "",
                }).toString();

                const url = apiBaseURL + endpoints.getFilteredSchemes + `?${query}`;

                const body = {
                    amc_code: filters.amc?.map(Number) || [],
                    asset_code:
                        filters.type && !isNaN(Number(filters.type))
                            ? [Number(filters.type)]
                            : [],
                    classcode: filters.category
                        ? filters.category.map((c) => Number(c.replace("cat-", "")))
                        : [],
                };

                const res = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
                // If NOT FOUND
                if (res.status === 404) {
                    setSchemes([]); // clear existing schemes
                    // setLoading(false); // stop loading
                    return; // skip further processing
                }

                const json = await res.json();

                if (json.success) {
                    const mapped = json.data.map((item: any) => ({
                        accord_scheme_code: item.accordSchemeCode,
                        accordAMCCode: item.accordAMCCode,
                        scheme_name: item.scheme,
                        category: item.category || item.equityType || "",
                        threeYearsReturn: item.threeYearCAGR,
                        sipMinInstallmentAmount: Number(item.minSIPAmt),
                        fundSize: item.fundSize,
                    }));

                    setSchemes(mapped);

                    // Handle "Prev" logic jump to end
                    if (loadToEndRef.current) {
                        setStartIndex(Math.max(0, Math.floor((mapped.length - 1) / 7) * 7));
                        loadToEndRef.current = false;
                    } else {
                        setStartIndex(0);
                    }

                    if (json.length) {
                        setTotalPages(Math.ceil(json.length / 7));
                    }
                }
            } catch (err) {
                console.error("API ERROR", err);
                setSchemes([]);
            } finally {
                hideLoader();
                setPageReady(true); // ✅ allow render
            }
        };

        loadSchemes();
    }, [filters, apiPage]);

    // runs when filters object changes

    // const [searchText, setSearchText] = useState("");
    // const [searchResults, setSearchResults] = useState([]);

    // const handleSearch = async (query: string) => {
    //   setSearchText(query);

    //   if (query.trim().length < 2) {
    //     setSearchResults([]);
    //     return;
    //   }

    //   try {
    //     const res = await fetch(
    //       `http://192.168.18.109:8080/api/v2/prodigy-pro-website/search-schemes?text=${query}`
    //     );
    //     const json = await res.json();

    //     if (json.success) {
    //       setSearchResults(json.data);
    //     }
    //   } catch (error) {
    //     console.error("SEARCH API ERROR:", error);
    //   }
    // };
    if (!pageReady) {
        return null; // or return <FullPageLoader />
    }


    return (
        <>
            <section className="py-4 md:py-12 pb-3 shadow-sm overflow-hidden bg-[#F3F9FD]">
                <div className="container mx-auto px-5 md:px-10 lg:px-20">
                    <div className="flex md:gap-10 flex-col md:flex-row justify-center md:justify-between items-center md:px-3">
                        <div
                            className="text-center md:text-left home_smart_heading order-2 md:order-1"
                            data-aos="fade-right"
                        >
                            <h2 className="md:text-left leading-tight font-bold text-[#44475B] text-[20px] md:text-3xl lg:text-5xl">
                                Mutual Funds in India
                            </h2>

                            <p className="mx-auto mt-4 md:mt-8 mb-4 max-w-6xl text-[15px] md:text-[17px] text-[#44475B] leading-relaxed font-inter opacity-90">
                                Mutual funds in India began their journey in 1963 with the launch of UTI MF. The idea was simple yet powerful: to make investing easier for individuals who didn’t have the time, tools, or expertise to track and compare thousands of stocks on their own.
                            </p>
                            <p className="mx-auto mt-4 md:mt-8 mb-4 max-w-6xl text-[15px] md:text-[17px] text-[#44475B] leading-relaxed font-inter opacity-90">
                                Over the years, the industry has evolved steadily under SEBI’s regulatory framework, expanding its scope and strengthening investor confidence.
                            </p>
                            <p className="mx-auto mt-4 md:mt-8 max-w-6xl text-[15px] md:text-[17px] text-[#44475B] leading-relaxed font-inter opacity-90">
                                Today, the Indian mutual fund industry includes:
                            </p>
                            <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto font-bold mb-6'>
                                <li>50+ Asset Management Companies</li>
                                <li>2,000+ mutual fund schemes</li>
                            </ul>


                            <Link href="https://app.prodigypro.co.in/all-mutual-funds" className="bg-[#024B39] text-white font-medium px-8 py-2.5 rounded-md transition duration-300 mt-2">
                                Explore All Funds
                            </Link>
                        </div>
                        <div className="text-center py-2 order-1 md:order-2">
                            <Image
                                src="/All-Mutual-funds/Hero.png"
                                alt="Mobile Portfolio"
                                width={300}
                                height={600}
                                className="w-[200px] h-[300px] md:w-[630px] md:h-[400px] xl:w-[500px] xl:h-[500px] mx-auto "
                                data-aos="fade-up"
                                data-aos-duration="2000"
                            />
                        </div>

                    </div>
                </div>
            </section>

            <section className="bg-[#F3F9FD] py-10">
                <div className="container mx-auto px-5 md:px-10 lg:px-20">
                    <h4 className="font-bold text-[22px] md:text-[28px] text-[#44475B] mb-1 text-center md:text-left">
                        All Mutual Funds
                    </h4>
                    <p className="text-gray-500 text-sm md:text-[15px] mb-8 text-center md:text-left">
                        Discover mutual funds across all categories using the all mutual
                        funds screener
                    </p>

                    <div
                        className={`md:hidden ${showFilter ? "mb-6" : "mb-0"}`}
                    >
                        <div
                            className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-md shadow-sm text-sm text-gray-700 font-medium mb-3"
                            onClick={() => setShowFilter(!showFilter)}
                        >
                            <i className="fa-solid fa-sliders"></i>
                            {showFilter ? "Hide Filters" : "Show Filters"}
                        </div>

                        {showFilter && (
                            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-2">
                                <FilterPanel onFilterChange={setFilters} />
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 px-5 md:px-8 lg:px-15">
                        <div className="hidden md:block w-full md:w-1/3 lg:w-1/4 mb-4 relative z-10">
                            <div className="hidden md:block sticky top-20">
                                <FilterPanel onFilterChange={setFilters} />
                            </div>
                        </div>

                        <div className="w-full md:w-2/3 lg:w-3/4">
                            <div className="flex flex-col xl:flex-row justify-between xl:items-center mb-6 gap-4">
                                {/* <div className="font-bold text-[#44475B] text-[15px] whitespace-nowrap hidden sm:block">
                                    {schemes.length > 0 ? "Mutual Funds" : "0 Mutual Funds"}
                                </div> */}

                                <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto justify-end">
                                    {/* <div className="relative w-full sm:w-[320px]">
                                        <input type="text" placeholder="Search for mutual funds to invest..." className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md text-[13px] outline-none bg-white focus:border-[#024B39] shadow-sm text-gray-700" />
                                        <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                                    </div> */}
                                    <div className="pagination-controls flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
                                        {/* PREV BUTTON */}
                                        <button
                                            className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded text-sm transition-colors disabled:opacity-50 cursor-pointer"
                                            disabled={uiPage === 1}
                                            onClick={() => {
                                                if (startIndex - 7 >= 0) {
                                                    setStartIndex(startIndex - 7);
                                                    setUiPage(uiPage - 1);
                                                } else {
                                                    // Jump to previous API page
                                                    loadToEndRef.current = true;
                                                    setApiPage(apiPage - 1);
                                                    setUiPage(uiPage - 1);
                                                }
                                            }}
                                        >
                                            Prev
                                        </button>

                                        {/* CURRENT PAGE ONLY */}
                                        <button className="bg-[#024B39] text-white px-3 py-1.5 rounded text-sm">{uiPage}</button>

                                        {/* NEXT BUTTON */}
                                        <button
                                            className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 px-3 py-1.5 rounded text-sm transition-colors disabled:opacity-50 cursor-pointer"
                                            disabled={
                                                schemes.length < 25 && startIndex + 7 >= schemes.length
                                            }
                                            onClick={() => {
                                                if (startIndex + 7 < schemes.length) {
                                                    setStartIndex(startIndex + 7);
                                                    setUiPage(uiPage + 1);
                                                } else {
                                                    // Fetch next API page
                                                    setApiPage(apiPage + 1);
                                                    // startIndex will be reset to 0 by effect
                                                    setUiPage(uiPage + 1);
                                                }
                                            }}
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                            {/* WHEN NO SCHEMES FOUND (404 or empty result) */}
                            {!loading && schemes.length === 0 && (
                                <div className="d-flex flex-column justify-content-center align-items-center py-5 w-100">
                                    <img
                                        src="https://app.prodigypro.co.in/assets/empty-scheme-DEgi2czJ.svg"
                                        alt="No schemes found"
                                        style={{ width: "260px", height: "auto" }}
                                    />
                                    <h5 className="mt-3 text-muted text-center">
                                        No Funds Available
                                    </h5>
                                    <h6 className="mt-3 text-muted text-center">
                                        Looks like there aren't any funds display Fresh
                                        opportunities are on the way!
                                    </h6>
                                </div>
                            )}
                            <Link href="https://app.prodigypro.co.in/all-mutual-funds">
                                {schemes
                                    .slice(startIndex, startIndex + 7)
                                    .map((item, index) => (
                                        <div
                                            key={`${item.accord_scheme_code}-${index}`}
                                            className="bg-white rounded-xl shadow-[0px_2px_8px_rgba(0,0,0,0.04)] border border-gray-100 p-4 md:p-5 mb-4 hover:shadow-[0px_4px_12px_rgba(0,0,0,0.06)] transition-all mx-0 block no-underline text-inherit"
                                            data-aos="zoom-in"
                                        >
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={imageUrl + item.accordAMCCode + ".png"}
                                                        alt=""
                                                        onError={(e) => {
                                                            e.currentTarget.src =
                                                                "https://www.shutterstock.com/image-vector/amc-letter-logo-design-illustration-260nw-2312821011.jpg";
                                                        }}
                                                        className="w-[42px] h-[42px] object-contain rounded bg-white shadow-sm border border-gray-50 p-1"
                                                    />
                                                    <div>
                                                        <h6 className="font-bold text-[#44475B] text-[15px] md:text-[16px] mb-0.5 leading-tight">
                                                            {item.scheme_name}
                                                        </h6>
                                                        <small className="text-gray-500 text-[12px] font-medium">
                                                            {item.category}
                                                        </small>
                                                    </div>
                                                </div>
                                                <div className="text-gray-300 mt-1 hidden sm:block">
                                                    <i className="fa-solid fa-chevron-right text-sm"></i>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center sm:pr-8 md:pr-12">
                                                {/* Return */}
                                                <div>
                                                    <div className="text-gray-400 text-[10px] md:text-[11px] tracking-wider mb-1 font-medium">Last 3Y</div>
                                                    <div className="text-[#024B39] font-bold text-[14px] md:text-[15px]">
                                                        {item.threeYearsReturn
                                                            ? item.threeYearsReturn.toFixed(2)
                                                            : 0}%
                                                    </div>
                                                </div>

                                                {/* SIP */}
                                                <div>
                                                    <div className="text-gray-400 text-[10px] md:text-[11px] tracking-wider mb-1 font-medium">Min. SIP</div>
                                                    <div className="text-[#44475B] font-bold text-[14px] md:text-[15px]">
                                                        ₹{item.sipMinInstallmentAmount}
                                                    </div>
                                                </div>

                                                {/* Fund Size */}
                                                <div>
                                                    <div className="text-gray-400 text-[10px] md:text-[11px] tracking-wider mb-1 font-medium">Fund Size</div>
                                                    <div className="text-[#44475B] font-bold text-[14px] md:text-[15px]">
                                                        ₹{(item.fundSize / 1_00_00_000).toLocaleString('en-IN', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2
                                                        })} Cr
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <h2 className="text-[20px] md:text-3xl lg:text-4xl font-bold text-[#44475B] mb-5 md:mb-8 mt-20">
                        Invest in Mutual Funds in India 2026
                    </h2>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Thirty years ago, mutual funds in India were still evolving and finding their footing. That trajectory changed decisively in the late 1990s when SEBI stepped in, particularly from 1996 onwards, and began shaping the industry through robust regulations, clearer disclosures, and a strong focus on investor protection. Over time, this framework brought much-needed discipline and transparency, making mutual funds simpler to understand and safer to participate in. Today, investors know exactly where their money is going – right from expense ratios to portfolio disclosures and performance reporting.</p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Fast forward to January 2026, the industry now manages a record <b>₹81.01 lakh crore</b> of investor assets. What’s even more heartening is the rise of SIPs, where ordinary Indians invest a little every month with big dreams for the future. In January alone, SIP contributions touched a historic <b>₹31,000+ crores</b>, reflecting the trust it has steadily earned over the years. Behind these numbers are millions of households investing thoughtfully for education, home ownership, retirement, and long-term financial independence. Mutual funds have steadily emerged as one of India’s most reliable and accessible avenues for long-term wealth creation.</p>
                    <hr className="mutual-funds-hrd my-5 lg:my-8 w-[25%] md:w-[15%] lg:w-[10%]" />
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <h2 className="text-[20px] md:text-3xl lg:text-4xl font-bold text-[#44475B] mb-5 md:mb-8">
                        What are Mutual Funds?
                    </h2>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>A mutual fund is an investment product offered by an Asset Management Company (AMC), where money from multiple investors is pooled together and professionally managed by an experienced fund manager. This pooled capital is invested across a mix of stocks, bonds, or other securities with the aim of balancing risk and return.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        To understand this better, think of it in a simple, real-life context.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Imagine four people – Rahul, Vikram, Suresh, and Ankit. Rahul is a consultant, Vikram runs a small shop, and Suresh works in a private company. All three earn regularly but don’t have the time or expertise to track markets or manage investments on a day-to-day basis. So they approach Ankit, who understands investing, and say, “Help us manage our savings. Take informed decisions on our behalf, and charge a reasonable fee for it.”</p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Ankit pools their money, invests it thoughtfully, keeps risk in check, and manages everything with discipline and accountability. That is how a mutual fund works. Investors entrust their money to a professional fund manager, who manages it on their behalf, aiming to grow wealth over time while following a defined investment strategy.</p>
                    <hr className="mutual-funds-hrd my-5 lg:my-8 w-[25%] md:w-[15%] lg:w-[10%]" />
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <h2 className="text-[20px] md:text-3xl lg:text-4xl font-bold text-[#44475B] mb-5 md:mb-8">
                        How does a Mutual Fund Work?
                    </h2>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        When you invest in a mutual fund, you're never investing alone. There's a lot happening quietly in the background to make your money work for you.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>First, your money comes together.</b><br />
                        Mutual funds are managed by an Asset Management Company (AMC). Think of the AMC as the organiser that brings together money from thousands of everyday investors, these are people with different incomes, goals, and timelines. Instead of each person trying to build a portfolio on their own, all this money is pooled into a single fund with a clear purpose.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>Next, a professional steps in.</b><br />
                        The AMC appoints a fund manager whose role is to take responsibility for that pooled money. Based on the scheme’s objective – whether it’s growth, income, stability, or a balance of all three – the fund manager decides where to invest, how much to allocate, and when adjustments are needed. Stocks, bonds, gold, or other instruments – it’s all handled with a defined strategy and discipline.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Now, here's the part that often goes unsaid.<br />
                        Once your money is invested, returns are shaped by two equally important forces. One is the market itself, something no one can fully control. The other is the fund manager’s ability to navigate that market: how they allocate capital, manage risk, and respond to changing conditions. Over the long term, it’s the interplay of market movements and fund management skill that determines how your investment actually performs.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        That’s why choosing a mutual fund isn't just about chasing returns - it's about understanding who's managing your money and how prepared they are to handle both calm and turbulent markets.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>Let's take another simple example.</b><br />
                        Suppose you invested in a mutual fund when its NAV (Net Asset Value) was ₹25 per unit. You purchased 4,000 units, which means:<br />
                        Your total investment = ₹1,00,000<br />
                        A few months later, the markets perform well and the value of the scheme rises to ₹300 crore. As the overall value of the assets increases, the NAV moves up as well.<br />
                        New NAV = ₹30 per unit<br />
                        So your investment is now worth:<br />
                        ₹30 × 4,000 = ₹1,20,000<br />
                        Your gain = ₹20,000
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Now consider the other side.<br />
                        If markets turn volatile and the scheme's value drops to ₹220 crore, the NAV falls accordingly.<br />
                        New NAV = ₹22 per unit<br />
                        Which means:<br />
                        ₹22 × 4,000 = ₹88,000<br />
                        Your loss = ₹12,000
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        In both scenarios, the fund manager continues to charge a fee for managing the fund. This cost isn't paid separately - it is already factored into the NAV you see every day.<br />
                        This is why mutual fund returns are influenced by market performance as well as how effectively the fund is managed.
                    </p>
                    <hr className="mutual-funds-hrd my-5 lg:my-8 w-[25%] md:w-[15%] lg:w-[10%]" />
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <h2 className="text-[20px] md:text-3xl lg:text-4xl font-bold text-[#44475B] mb-5 md:mb-8">
                        Who Can Invest in Mutual Funds?
                    </h2>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Short answer: almost everyone!
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Whether you're a salaried professional juggling EMIs, a student just starting out, a business owner managing cash flows, a homemaker planning ahead, or even a teenager taking their first step into investing, mutual funds are open to you. As long as the basic KYC formalities are completed, you're good to go.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Now, here's the fine print (the kind that actually matters).
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Certain categories – like NRIs, PIOs, or foreign nationals, may need to clear a few additional checks. These aren't roadblocks, just regulatory guardrails. The exact requirements can vary based on current regulations and the individual fund house's policies.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        So if you're a resident Indian with valid documents, you can begin your mutual fund journey anytime, no special permissions, no complicated hoops. And if you're an NRI or fall into a special category, it's simply about understanding the rules before you start.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Either way, investing isn’t about whether you can begin – it’s about knowing how to begin the right way. And that’s where the right guidance makes all the difference.
                    </p>
                    <hr className="mutual-funds-hrd my-5 lg:my-8 w-[25%] md:w-[15%] lg:w-[10%]" />
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <h2 className="text-[20px] md:text-3xl lg:text-4xl font-bold text-[#44475B] mb-5 md:mb-8">
                        How Do You Invest in a Mutual Fund?
                    </h2>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        The good news: getting started is far easier than most people think!
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Before you invest, there are just a few basics to have in place. Think of this as your entry - nothing complicated, just standard paperwork to make sure everything stays secure and transparent.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-2'>
                        You'll need:
                    </p>
                    <ul className='list-disc pl-5 md:pl-8 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 space-y-2'>
                        <li><b>A valid PAN card</b></li>
                        <li><b>An Aadhaar card linked to your mobile number</b></li>
                        <li><b>A cancelled cheque to link your bank account</b></li>
                        <li><b>An active KYC (Know Your Customer) status</b></li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Once these are sorted, the actual investing part is straightforward. No endless forms, no confusing processes - just a few simple steps and you're ready to begin!
                    </p>
                    <hr className="mutual-funds-hrd my-5 lg:my-8 w-[25%] md:w-[15%] lg:w-[10%] border-t-2 border-[#5462F6]" />
                </div>
                <div className="container mx-auto px-5 md:px-10 lg:px-20">
                    <h2 className="text-[20px] md:text-3xl lg:text-4xl font-bold text-[#44475B] mb-5 md:mb-8">
                        Types of Mutual Funds
                    </h2>
                    <h3 className="text-[18px] md:text-2xl lg:text-3xl font-bold text-[#44475B] mt-8 mb-8">
                        Based on the strategy
                    </h3>
                    <p className="text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 text-justify relative z-10">
                        <strong>Active Fund </strong> <br />
                        An active fund is managed by a professional fund manager who takes investment decisions based on research, market views, and strategy. The goal is to do better than the benchmark by selecting the right stocks or bonds at the right time.
                        <br />
                        <br />
                        <strong>Passive Fund </strong> <br />
                        A passive fund simply follows a market index. Instead of trying to beat the market, it mirrors the index’s performance. Since there’s limited fund manager involvement, these funds typically come with lower costs.
                    </p>

                    <h3 className="text-[18px] md:text-2xl lg:text-3xl font-bold text-[#44475B] mt-8 mb-8">
                        Based on the structure
                    </h3>
                    <p className="text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 text-justify relative z-10">
                        <strong>Open-Ended Fund </strong> <br />
                        You can invest or redeem anytime from these funds. These funds offer high liquidity and flexibility in general.<br />
                        <br />
                        <strong>Close-Ended Fund </strong> <br />
                        These funds have a fixed maturity period. Investments can be made only during the NFO period, however they can be traded on stock exchanges.
                        <br />
                        <br />
                        <strong>Interval Fund</strong>
                        <br />
                        Allows buying or selling only during specific time windows. A mixed structure combining features of open and closed-ended funds.
                    </p>

                    <h3 className="text-[18px] md:text-2xl lg:text-3xl font-bold text-[#44475B] mt-8 mb-8">
                        Based on the investment option
                    </h3>
                    <p className="text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 text-justify relative z-10">
                        <strong>Growth Fund </strong> <br />
                        Growth funds focus on building wealth over time by aiming for capital appreciation. They are best suited for investors who have a long-term horizon and are comfortable staying invested through market highs and lows, knowing that patience often pays off.
                        <br />
                        <br />
                        <strong>Income Fund </strong> <br />
                        Income funds are designed to generate regular income through interest and dividend payouts. These funds are generally preferred by conservative investors who value stability and predictable cash flows over aggressive growth.
                    </p>

                    <h3 className="text-[18px] md:text-2xl lg:text-3xl font-bold text-[#44475B] mt-8 mb-8">
                        Based on the asset class
                    </h3>

                    <h4 className="text-[16px] md:text-xl lg:text-2xl font-bold text-[#44475B]">
                        Equity Mutual Funds
                    </h4>
                    <p className="text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 text-justify relative z-10">
                        Equity mutual funds primarily invest in shares of companies. The objective is long-term capital growth, which is why these funds are best suited for investors with a longer time horizon and the ability to ride out short-term market ups and downs.
                    </p>
                    <p className="text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 text-justify relative z-10">
                        <b>Types of Equity Mutual Funds</b>
                        <br />
                        <strong>1. Large Cap Fund </strong> <br />
                        These funds invest at least 80% of their assets in large, well-established companies with strong market presence. They are generally considered more stable within the equity space.
                        <br />
                        Watch video: <a href="https://youtu.be/GXKf8KtWBd8?si=dbmW50fF9JTYqklC" className="underline">https://youtu.be/GXKf8KtWBd8?si=dbmW50fF9JTYqklC</a>
                        <br />
                        <br />
                        <strong>2. Mid-Cap Funds </strong> <br />
                        Mid-cap funds invest a minimum of 65% in mid-sized companies that have the potential to grow into tomorrow’s leaders. They can offer higher growth, along with higher volatility.
                        <br />
                        Watch video: <a href="https://youtu.be/2OGzXyJ2vsw?si=tt4vH3PVKPdUsZgP" className="underline">https://youtu.be/2OGzXyJ2vsw?si=tt4vH3PVKPdUsZgP</a>
                        <br />
                        <br />
                        <strong>3. Small Cap Fund </strong> <br />
                        These funds invest at least 65% in smaller companies that are still in their growth phase. Returns can be rewarding over the long term, but patience is essential.
                        <br />
                        Watch video: <a href="https://youtu.be/unLdVy5EKD0?si=72-2yNJAsGGWFF1N" className="underline">https://youtu.be/unLdVy5EKD0?si=72-2yNJAsGGWFF1N</a>
                        <br />
                        <br />
                        <strong>4. Multi-Cap Fund </strong> <br />
                        Multi-cap funds spread investments across large-, mid-, and small-cap stocks, with at least 25% allocated to each category. This allows diversification across market segments.
                        <br />
                        Watch video: <a href="https://youtu.be/z25r7Z3qJys?si=z6tzi8Z2eydwTqnT" className="underline">https://youtu.be/z25r7Z3qJys?si=z6tzi8Z2eydwTqnT</a>
                        <br />
                        <br />
                        <strong>5. Thematic / Sector Funds </strong> <br />
                        These funds invest a minimum of 80% in companies belonging to a specific sector or theme, such as IT, healthcare, or infrastructure. Performance depends heavily on how that sector or theme plays out.
                        <br />
                        <br />
                        <strong>6. Equity Linked Savings Scheme (ELSS) </strong> <br />
                        ELSS funds are equity-oriented tax-saving funds that qualify for deductions under Section 80C of the Income Tax Act, 1961. Investors can claim deductions of up to ₹1.5 lakh in a financial year. These funds invest at least 80% in equities and come with a lock-in period of three years.
                        <br />
                        <br />
                        <strong>7. Index funds </strong> <br />
                        These funds aim to replicate the performance of a particular market index rather than outperform it. Returns move in line with the index being tracked.
                        <br />
                        Watch video: <a href="https://youtu.be/C8eEJkrTamA?si=A1-Xv2eoFDNETCOg" className="underline">https://youtu.be/C8eEJkrTamA?si=A1-Xv2eoFDNETCOg</a>
                        <br />
                        <br />
                        <strong>8. Focused Funds </strong> <br />
                        Focused funds invest in a limited number of stocks (maximum 30), with at least 65% allocated to equity and equity-related instruments. The idea is conviction-driven investing rather than broad diversification.
                        <br />
                        <br />
                        <strong>9. Value Funds </strong> <br />
                        Value funds follow a strategy of investing in companies that appear undervalued relative to their fundamentals. At least 65% of the portfolio is invested in equities.
                        <br />
                        Watch video: <a href="https://youtu.be/NzmJvuxWo74?si=c0dhmvf6u8PCMIwW" className="underline">https://youtu.be/NzmJvuxWo74?si=c0dhmvf6u8PCMIwW</a>
                        <br />
                        <br />
                        <strong>10. Contra Funds </strong> <br />
                        Contra funds take a contrarian approach, investing in stocks that are currently out of favour but may perform well over the long term. These funds invest a minimum of 65% in equities.
                        <br />
                        <br />
                        <strong>11. Dividend Yield Funds </strong> <br />
                        These funds focus on companies with a consistent history of paying dividends. As per SEBI classification, they invest at least 65% in equity and equity-related instruments, aiming to combine income generation with capital appreciation.
                        <br />
                        <br />
                        <strong>12. Flexi Cap funds </strong> <br />
                        Flexi-cap funds invest a minimum of 65% in equities but have complete freedom to move across large-, mid-, and small-cap stocks based on market conditions. This flexibility allows fund managers to adapt strategies as markets change.
                        <br />
                        Watch video: <a href="https://youtu.be/xaxxguXXwI0?si=vjKpn2DqRyOusiP1" className="underline">https://youtu.be/xaxxguXXwI0?si=vjKpn2DqRyOusiP1</a>
                        <br />
                        <br />
                        <strong>13. Large & Mid Cap Funds </strong> <br />
                        These funds invest at least 35% in large-cap companies and 35% in mid-cap companies, offering a blend of stability and growth potential.
                        <br />Watch video: <a href="https://youtu.be/takrWEBnBU8?si=oIoc-tPB3dXb3lEt" className="underline">https://youtu.be/takrWEBnBU8?si=oIoc-tPB3dXb3lEt</a>
                        <br /><br />
                        <strong>14. ETFs </strong> <br />
                        These are investment funds that track an index, commodity, or asset basket and trade on stock exchanges like shares.

                    </p>

                    <h4 className="text-[16px] md:text-xl lg:text-2xl font-bold text-[#44475B] mt-8">
                        Debt Mutual Funds
                    </h4>
                    <p className="text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 text-justify relative z-10">
                        These mutual funds make investments in government securities, bonds, and other fixed-income securities. Compared to equity mutual funds, these funds are the best option for steady returns with less risk.
                    </p>
                    <p className="text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 text-justify relative z-10">

                        <strong>1. Overnight Funds: {" "}</strong>
                        These funds invest in Overnight securities/ Securities having a maturity of 1 day.
                        <br />

                        <strong>2. Liquid Funds: {" "}</strong>
                        These funds invest in Debt and money market securities with a maturity of up to 91 days only.
                        <br />

                        <strong>3. Ultra Short Duration Funds: {" "}</strong>
                        These funds invest in Securities with a Macaulay duration of the portfolio between 3 months- 6 months.
                        <br />

                        <strong>4. Low Duration Funds: {" "}</strong>
                        These funds invest in Securities with a Macaulay duration of the portfolio between 6 months- 12 months.
                        <br />

                        <strong>5. Money Market Funds: {" "}</strong>
                        These funds invest in Money Market instruments having a maturity of up to 1 Year.
                        <br />

                        <strong>6. Short Duration Funds: {" "}</strong>

                        These funds invest in Securities with a Macaulay duration of 1 to 3 years.
                        <br />

                        <strong>7. Medium Duration Funds: {" "}</strong>

                        These funds invest in Securities with a Macaulay duration of the portfolio between 3 years- 4 years.
                        <br />

                        <strong>8. Medium to Long Duration Funds: {" "}</strong>
                        These funds invest in Securities with a Macaulay duration of the portfolio between 4 years- 7 years.
                        <br />

                        <strong>9. Long Duration Funds: {" "}</strong>
                        These funds invest in Securities with a Macaulay duration of the portfolio greater than 7 years.
                        <br />

                        <strong>10. Dynamic Bond Funds: {" "}</strong>

                        These funds do not have any restrictions on maturity profiles and have the flexibility to dynamically manage the portfolio across short-, medium-, and long-term debt instruments based on the interest rate outlook.
                        <br />

                        <strong>11. Corporate Bond Funds: {" "}</strong>
                        These funds keep a Minimum of 80% of their investment in corporate bonds only in AA+ and above-rated corporate bonds.
                        <br />

                        <strong>12. Credit Risk Funds: {" "}</strong>

                        These funds keep a Minimum of 65% of their investment in corporate bonds, only in AA and below-rated corporate bonds.
                        <br />

                        <strong>13. Banking and PSU Funds: {" "}</strong>
                        These funds keep a Minimum of 80% in Debt instruments of banks, Public Sector Undertakings, Public Financial Institutions, and Municipal Bonds.
                        <br />

                        <strong>14. Gilt Funds: {" "}</strong>
                        These funds keep a Minimum of 80% of their investment in G-secs or government securities.
                        <br />

                        <strong>15. Gilt Funds with 10-year constant duration: {" "}</strong>
                        These funds keep a Minimum of 80% of their investment in G-secs, such that the Macaulay duration of the portfolio is equal to 10 years.
                        <br />

                        <strong>16. Floater Funds: {" "}</strong>
                        These funds keep a Minimum of 65% of their investment in floating rate instruments (including fixed rate instruments converted to floating rate exposures using swaps/ derivatives).
                    </p>

                    <h4 className="text-[16px] md:text-xl lg:text-2xl font-bold text-[#44475B] mt-8">
                        Hybrid Funds
                    </h4>
                    <p className="text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 text-justify relative z-10">
                        These funds carry a mix of both equity and debt. They combine both equity and debt to balance risk and return. These funds are suitable for investors who can take moderate risk with a balanced approach.
                    </p>
                    <p className="text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 text-justify relative z-10">
                        <strong>1. Conservative Hybrid Funds: {" "}</strong>
                        These funds keep 10% to 25% of their investment in equity & equity-related instruments, and 75% to 90% in Debt instruments.
                        <br />

                        <strong>2. Balanced Hybrid Funds: {" "}</strong>
                        These funds keep 40% to 60% of their investment in equity & equity-related instruments, and 40% to 60% in Debt instruments.
                        <br />

                        <strong>3. Aggressive Hybrid Funds: {" "}</strong>

                        These funds keep 65% to 80% of their investment in equity & equity-related instruments, and 20% to 35% in Debt instruments.
                        <br />

                        <strong>
                            4. Dynamic Asset Allocation or Balanced Advantage Funds: {" "}
                        </strong>
                        These funds keep Investment in equity/ debt that is managed dynamically (0% to 100% in equity & equity-related instruments, and 0% to 100% in Debt instruments).
                        <br />

                        <strong>5. Multi-Asset Allocation Funds: {" "}</strong>

                        These funds keep investment in at least 3 asset classes with a minimum allocation of at least 10% in each asset class.
                        <br />

                        <strong>6. Arbitrage Funds: {" "}</strong>
                        Arbitrage funds are hybrid mutual funds that generate returns by using the strategy of simultaneously buying and selling securities in different markets to take advantage of different prices.
                        <br />

                        <strong>7. Equity Savings Funds: {" "}</strong>
                        These funds keep investment in Equity and equity-related instruments (min.65%), Debt instruments (min.10%), and Derivatives.
                    </p>

                    <hr className="mutual-funds-hrd my-5 lg:my-8 w-[25%] md:w-[15%] lg:w-[10%] border-t-2 border-[#5462F6]" />
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <h2 className="text-[20px] md:text-3xl lg:text-4xl font-bold text-[#44475B] mb-5 md:mb-8">
                        Advantages of Mutual Funds
                    </h2>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <b>Professional Fund Management</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        You don’t need to track markets or follow financial news every day. That’s handled by professional fund managers who research, plan, and manage your investments with discipline.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <b>Liquidity</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Need flexibility? Most mutual funds allow you to pause, switch, or withdraw part of your investment without long lock-ins, making it easier to adapt as life changes.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <b>Return Potential</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        With inflation steadily rising, parking money only in savings accounts or FDs may not be enough. Mutual funds offer the potential to grow your money at a pace that can outstay inflation over the long term.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <b>Affordability</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        You don’t need a large sum to get started. Even a small monthly SIP—say ₹500—can begin your wealth-building journey. There’s a mutual fund for almost everyone, regardless of income or life stage.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <b>Diversification</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Mutual funds spread your money across multiple companies and sectors. If one investment underperforms, others can help cushion the impact.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <b>Well-Regulated</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        In India, mutual funds operate under strict oversight by the Securities and Exchange Board of India (SEBI), ensuring transparency, investor protection, and clear disclosure norms.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <b>Safety with Perspective</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Mutual funds are a transparent and well-regulated way to start investing. While they are not risk-free, the structure and regulations help investors make informed decisions with clarity.
                    </p>

                    <hr className="mutual-funds-hrd my-5 lg:my-8 w-[25%] md:w-[15%] lg:w-[10%] border-t-2 border-[#5462F6]" />
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <h2 className="text-[20px] md:text-3xl lg:text-4xl font-bold text-[#44475B] mb-5 md:mb-8">
                        Disadvantages of Mutual Funds
                    </h2>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        <b>Market Risk</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Mutual funds are not risk-free. Since they invest in market-linked instruments, their value can move up or down in the short term. That’s why understanding your own risk appetite before investing is just as important as choosing the fund itself.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        <b>Lock-in Periods</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Some mutual fund schemes, such as ELSS, come with a mandatory lock-in period. During this time, you won’t be able to withdraw your investment, even if markets move or personal priorities change.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        <b>Over-diversification</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Holding too many similar mutual fund schemes can actually work against you. When portfolios overlap excessively, returns may get diluted without meaningfully reducing risk. It can also make your investments harder to track and manage, adding complexity where simplicity would work better.
                    </p>

                    <hr className="mutual-funds-hrd my-5 lg:my-8 w-[25%] md:w-[15%] lg:w-[10%] border-t-2 border-[#5462F6]" />
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <h2 className="text-[20px] md:text-3xl lg:text-4xl font-bold text-[#44475B] mb-5 md:mb-8">
                        Ways to Invest in Mutual Funds
                    </h2>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        <b>SIP (Systematic Investment Plan)</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        SIP lets you invest a fixed amount in mutual funds at regular intervals. You don’t need to time the market – just invest consistently and let compounding work over time. With SIPs starting from as little as ₹250, it’s an easy and stress-free way for beginners to start investing.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        <b>Lump Sum Investment</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Lump sum investing means putting a larger amount into a mutual fund in one go. It’s typically used when you have surplus funds, such as a bonus, windfall, or retirement corpus, and are comfortable investing at once.
                    </p>

                    <hr className="mutual-funds-hrd my-5 lg:my-8 w-[25%] md:w-[15%] lg:w-[10%] border-t-2 border-[#5462F6]" />
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <h2 className="text-[20px] md:text-3xl lg:text-4xl font-bold text-[#44475B] mb-5 md:mb-8">
                        Things to Remember Before Investing in Mutual Funds
                    </h2>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Before you invest, it helps to pause and get a few basics right. Mutual funds work best when they align with you – not just with market trends.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        <b>Know your risk profile and investment objectives</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        Start by understanding your risk appetite, investment horizon, and financial goals. Together, these define the kind of investor you are and guide you towards suitable schemes.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>Key takeaway:</b> If all of this feels overwhelming, don’t rely on guesswork – this is exactly where BFC Capital, a SEBI-registered Investment Adviser (RIA), steps in to bring structure, clarity, and confidence to your financial decisions.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        <b>Look beyond past returns</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        Performance matters, but not just headline returns. What really counts is how consistently a fund has performed across different market phases.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>Key takeaway:</b> Steady performers often age better than short-term stars.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        <b>Understand the risks involved</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        Every mutual fund carries some level of risk – even debt funds. Be aware of factors like volatility, credit risk, and interest rate sensitivity before investing.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>Key takeaway:</b> A longer investment horizon can help smooth out short-term ups and downs.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        <b>Check for lock-in and liquidity</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        Some schemes come with lock-in periods or exit loads, which can restrict early withdrawals.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>Key takeaway:</b> Always match your investments with your liquidity needs.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        <b>Be mindful of the expense ratio</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        The Total Expense Ratio (TER) is the annual cost of running a mutual fund and is already built into the NAV you see.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>Key takeaway:</b> A lower or higher TER doesn’t automatically mean better or worse performance.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        <b>Know who’s managing your money</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        Look at the track record of the fund manager and the credibility of the AMC. Experience and consistency matter more than popularity.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>Key takeaway:</b> Good processes outlast individual names.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        <b>Understand the tax impact</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        Capital gains tax and dividend taxation can affect your final returns.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>Key takeaway:</b> Mutual fund taxation can be nuanced – professional advice can help you avoid surprises.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        <b>Seek professional guidance when needed</b>
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-1'>
                        If you’re unsure, a SEBI-registered investment advisor can help you build the right mix and stay disciplined during market swings.
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>Key takeaway:</b> Markets deal in numbers, but outcomes are shaped by behaviour. That’s where BFC Capital, a SEBI-registered Investment Adviser (RIA), helps investors stay rational, consistent, and aligned with their long-term goals.
                    </p>

                    <hr className="mutual-funds-hrd my-5 lg:my-8 w-[25%] md:w-[15%] lg:w-[10%] border-t-2 border-[#5462F6]" />
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-10'>
                    <h2 className="text-[20px] md:text-3xl lg:text-4xl font-bold text-[#44475B] mb-5 md:mb-8">
                        Mutual Funds vs Other Tax-Saving Options
                    </h2>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        At BFC Capital, as a SEBI-registered Investment Adviser (RIA), we believe that with the recent changes in the tax framework, traditional tax-saving instruments should no longer be viewed primarily as tools to reduce tax liability.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Instruments such as ELSS, PPF, NPS, and similar schemes now need to be evaluated through the lens of long-term financial goals, liquidity needs, and overall portfolio alignment rather than tax benefits alone.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Under the new tax regime, individuals already enjoy tax exemption on income up to ₹12 lakh, and ₹12.75 lakh for salaried individuals after accounting for the standard deduction of ₹75,000 – without having to lock money into specific tax-saving products. As a result, investing in these schemes does not offer any additional tax advantage beyond what’s already available.
                    </p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        <b>Tax efficiency is now a by-product of good financial planning – not the starting point.</b>
                    </p>
                </div>

            </section >
            <section className="container mx-auto px-0 md:px-10 lg:px-20 mb-10">
                <div
                    className="download_prodgy_app w-full flex flex-col md:flex-row shadow-lg overflow-hidden"
                    style={{
                        backgroundImage: "url('/All-Mutual-funds/lines.png'), linear-gradient(269.9deg, #06A358 24.53%, #001EFE 156.82%)",
                        backgroundRepeat: "no-repeat, no-repeat",
                        backgroundSize: "cover, cover",
                        backgroundPosition: "center, center",
                        borderRadius: "20px"
                    }}
                    data-aos="fade-up"
                    data-aos-duration="300"
                >
                    <div className="w-full md:w-[65%] xl:w-[55%] z-10 flex flex-col justify-center py-5 xl:py-16">
                        <div className="px-5 md:pl-10 lg:pl-[80px]">
                            <h2
                                className="md:text-left leading-tight font-bold text-white text-[28px] md:text-3xl lg:text-[42px] xl:text-[48px] mt-10 mb-10"
                                data-aos="fade-left"
                                data-aos-anchor-placement="center-bottom"
                                data-aos-duration="1200"
                            >
                                Your future won't<br className="hidden md:block" /> build itself — start<br className="hidden md:block" /> investing with<br className="hidden md:block" /> Prodigy Pro today!
                            </h2>
                            <div className="mt-8 flex flex-wrap gap-3 mb-8">
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.bfc_mf.prodigy_app"
                                    className="transition-transform hover:-translate-y-1 block"
                                    data-aos="fade-right"
                                    data-aos-anchor-placement="center-bottom"
                                    data-aos-duration="1500"
                                >
                                    <Image
                                        src="/Home/Playstore.svg"
                                        alt="Get it on Google Play"
                                        width={200}
                                        height={60}
                                        className="w-[150px] xl:w-[200px]"
                                    />
                                </a>
                                <a
                                    href="https://apps.apple.com/in/app/prodigy-pro-mutual-funds-sip/id1575700744"
                                    className="transition-transform hover:-translate-y-1 block"
                                    data-aos="fade-right"
                                    data-aos-anchor-placement="center-bottom"
                                    data-aos-duration="1200"
                                >
                                    <Image
                                        src="/Home/applestore.svg"
                                        alt="Download on the App Store"
                                        width={200}
                                        height={60}
                                        className="w-[150px] xl:w-[200px]"
                                    />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="w-full md:w-[35%] xl:w-[45%] relative min-h-[350px] md:min-h-0 hidden md:block">
                        <Image
                            src="/All-Mutual-funds/Phone.png"
                            alt="Phone"
                            fill
                            className="object-contain object-right-bottom translate-y-[5px]"
                            data-aos="fade-left"
                            data-aos-duration="1000"
                        />
                    </div>
                </div>
                <div className="bg_hight_prodgy__home"></div>
            </section>
        </>

    );
}