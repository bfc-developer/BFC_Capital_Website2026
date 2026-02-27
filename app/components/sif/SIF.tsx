import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function SIF() {
    return (
        <>
            <section className="py-4 md:py-12 pb-3  shadow-sm overflow-hidden bg-[linear-gradient(1800deg,#CFE4F3,#FAFAFA)]">
                <div className="container mx-auto px-5 md:px-10 lg:px-20">
                    <div className="flex md:gap-10 flex-col md:flex-row justify-center md:justify-between items-center md:px-3">
                        <div
                            className="text-center md:text-left home_smart_heading order-2 md:order-1"
                            data-aos="fade-right"
                        >
                            <h2 className="md:text-left leading-tight font-bold text-[#44475B] text-[20px] md:text-3xl lg:text-5xl">
                                Specialized Investment Funds
                            </h2>

                            <p className="mx-auto mt-4 md:mt-8 mb-4 max-w-6xl text-[15px] md:text-[17px] text-[#44475B] leading-relaxed font-inter opacity-90">
                                SIFs are where investing gets smarter!
                            </p>

                            <p className="mx-auto mb-4 max-w-6xl text-[15px] md:text-[17px] text-[#44475B] leading-relaxed font-inter opacity-90">
                                Built around strategy, not chaos. No look-alikes, no clutter, just one focused fund per idea. Discover this next-gen category on Prodigy Pro, and invest with the clarity, flexibility, and expert guidance your money truly deserves!
                            </p>
                            <button className="bg-[#04B488] text-white px-6 py-2 rounded-md hover:bg-[#04B488]/80 transition duration-300">
                                Invest Now!
                            </button>
                        </div>
                        <div className="text-center py-2 order-1 md:order-2">
                            <Image
                                src="/SIF/SIFHero.png"
                                alt="Mobile Portfolio"
                                width={300}
                                height={600}
                                className="w-[200px] h-[300px] md:w-[500px] md:h-[400px] lg:w-[500px] lg:h-[500px] mx-auto "
                                data-aos="fade-up"
                                data-aos-duration="2000"
                            />
                        </div>

                    </div>
                </div>
            </section>
            <section>

                <h2 className="text-center text-[20px] md:text-3xl lg:text-5xl font-bold text-[#44475B] mt-16">All You Need To Know </h2>
                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        What Are SIFs: Specialized Investment Funds
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>You’ve probably heard of Mutual Funds. Maybe even PMS. <br />But now, there’s a new investment option that sits right between the two – bringing structure from mutual funds and flexibility from PMS.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>These are Specialized Investment Funds (SIFs), the newest addition to India’s investment ecosystem, introduced by SEBI.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>SIFs aren’t just another category you add to a list. They’re built very differently. <br />They are strategy-first products – which means every SIF begins with a clear investment idea, and only then is the portfolio designed around it.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>In traditional mutual funds, you often see multiple schemes that look different on paper but behave almost the same. With SIFs, SEBI has addressed this directly. <br />Each strategy category is allowed only one SIF. No duplication. No overlap. No confusion.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>In many ways, SIFs represent the next step in mutual fund investing – disciplined in structure, flexible in execution, and designed for investors who want their money to follow a clear, well-thought-out strategy.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        Get Started With BFC Capital
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>At BFC Capital, investing in SIFs is not about following what’s trending. It’s about choosing the right strategy for where you are and where you want to go financially.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        As a SEBI-Registered Investment Adviser (RIA), BFC Capital approaches SIFs through a structured advisory lens. Every recommendation is made after understanding your goals, risk comfort, and investment horizon – not before.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>When you begin your SIF journey with us, our role is simple: help you gain clarity.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>We help you understand:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <li>Which SIF strategy actually fits your portfolio</li>
                        <li>How it works alongside your existing investments</li>
                        <li>What role it plays in long-term wealth creation</li>
                    </ul>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        There’s no product push and no rushed decisions. Just thoughtful conversations, honest advice, and recommendations that are meant to make sense for you.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        And if you’re unsure where to begin, our relationship managers and wealth managers are always available – real people, real discussions, and real guidance.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        How Do SIFs Work
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>SIFs operate under SEBI’s Mutual Fund Regulations, 1996, and at a structural level, they function much like mutual funds.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Investors who meet the minimum investment requirement of ₹10 lakh pool their money into a fund. This capital is then managed by an experienced fund manager who uses advanced investment strategies with the aim of generating better risk-adjusted returns.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Where SIFs truly stand apart is in how much flexibility they are allowed.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>Unlike traditional mutual funds, SIFs can:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <li>Take both long and short positions</li>
                        <li>Use derivatives as part of their strategy</li>
                        <li>Invest in unlisted securities</li>
                        <li>Allocate dynamically across equity, debt, and other assets</li>
                    </ul>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Traditional mutual funds are usually built around asset classes. <br />SIFs are built around a defined investment strategy.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        The idea is straightforward: decide the strategy first, and then build the portfolio around it.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>

                        To keep things clean and transparent, SEBI allows only one SIF per strategy category, ensuring that every fund has a clear identity and purpose.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        How To Invest In SIFs
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Investing in Specialized Investment Funds is simple and seamless through Prodigy Pro, the digital investing platform developed by BFC Capital.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Prodigy Pro is built to make strategy-driven products like SIFs accessible – without losing out on compliance, transparency, or expert support.</p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>Here’s how you can get started:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <li>Log in to the Prodigy Pro app</li>
                        <li>Go to the Explore Funds section</li>
                        <li>Tap on the SIF icon or search for “SIF”</li>
                        <li>Review available schemes with detailed strategy notes, performance insights, and risk disclosures</li>
                        <li>Choose your preferred SIF and invest in a few secure steps</li>
                    </ul>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        If you prefer guidance, Prodigy Pro also connects you directly with BFC Capital’s certified wealth managers. They help you understand the strategy, assess suitability, and ensure the investment fits into your overall financial plan.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        You can invest independently – or with expert support. The choice is always yours.</p>

                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        Investment Strategies Allowed For SIFs
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        SIFs bring a higher level of sophistication to fund investing. SEBI has clearly defined seven strategy categories under which SIFs can operate:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <li>Equity Long-Short Fund</li>
                        <li>Equity Ex-Top 100 Long-Short Fund</li>
                        <li>Sector Rotation Long-Short Fund</li>
                        <li>Debt Long-Short Fund</li>
                        <li>Sectoral Debt Long-Short Fund</li>
                        <li>Active Asset Allocator Long-Short Fund</li>
                        <li>Hybrid Long-Short Fund</li>
                    </ul>


                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Each category is restricted to one SIF only, ensuring that every fund stays focused, transparent, and true to its stated strategy.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        SEBI Regulations and Minimum Investment Rule
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        Every SIF operates under strict regulatory oversight.</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <li>Minimum investment starts at ₹10 lakh per investor</li>
                        <li>SIPs, STPs, and SWPs are permitted as long as the investment value remains above ₹10 lakh</li>
                        <li>If market movements bring the value below ₹10 lakh, it is treated as a passive breach, not a violation</li>
                        <li>Subscriptions may be daily, weekly, or quarterly</li>
                        <li>Redemptions can take up to 15 working days</li>
                        <li>Closed-ended SIFs must be listed on recognised stock exchanges</li>
                    </ul>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Regular disclosures around portfolio composition, risk levels, and strategy performance ensure transparency at every stage.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        Features of SIFs
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        SIFs aren’t meant for everyone – and that’s exactly what makes them powerful.</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <li>Strategy-led investing instead of generic asset allocation</li>
                        <li>Ability to use long-short, hybrid, and tactical approaches</li>
                        <li>Fully regulated within SEBI’s compliance framework</li>
                        <li>₹10 lakh minimum investment, positioning SIFs as a serious, high-conviction product</li>
                        <li>Structured redemption windows that balance liquidity and stability</li>
                        <li>Mandatory exchange listing for closed-ended schemes</li>
                        <li>Systematic investment options available after the initial investment</li>
                    </ul>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        With SIFs, investors get the discipline of mutual funds and the strategic depth of PMS, all within a regulated environment.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        Risk Mitigation in SIFs
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        SIFs don’t eliminate risk – but they are designed to manage it intelligently.</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <li>Long-short strategies help reduce downside impact</li>
                        <li>Debt exposure can provide stability during volatile phases</li>
                        <li>SEBI-defined limits keep strategies within controlled boundaries</li>
                        <li>Regular reporting and stress testing ensure ongoing visibility</li>
                    </ul>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        At BFC Capital, this framework is strengthened by advisors who focus not just on returns, but on how risk behaves – so you always understand what you’re invested in, and why.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        Points to Consider Before Investing in SIFs
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>SIFs are built for investors who are comfortable with market-linked products and have a long-term view.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        They may be suitable if you:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <li>Can invest ₹10 lakh or more</li>
                        <li>Understand derivatives and tactical strategies</li>
                        <li>Are comfortable with strategy-driven investing</li>
                        <li>Do not need immediate liquidity</li>
                    </ul>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        They may not be ideal for first-time investors or those seeking low-risk, capital-protected options.</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Before investing, it’s important to assess your risk profile, investment horizon, and financial goals. Professional advice can make a meaningful difference here.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        Experience SIFs Exclusively on Prodigy Pro
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Specialized Investment Funds represent the future of managed investing – structured, transparent, and strategy-led..</p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>At BFC Capital, we are proud to be among the few firms in India authorised to offer SIFs through a fully compliant advisory and distribution framework. Our team includes professionals NISM-certified specifically for Specialized Investment Funds, ensuring every recommendation is backed by regulatory expertise and deep product understanding.</p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Through the Prodigy Pro app, developed by BFC Capital, investors gain seamless access to SIFs – supported by expert guidance, transparent processes, and disciplined execution.</p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>This isn’t product-led investing. <br />This is strategy-led wealth creation.</p>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4 font-bold'>Your strategy. <br />Your advisor. <br />Your long-term advantage.</p>
                </div>

            </section >
        </>
    )
}   