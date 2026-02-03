import Image from "next/image";

export default function AboutUs() {
    return (
        <>
            <section>
                <div className="relative w-full h-full lg:h-[550px] 2xl:h-full">
                    <Image
                        src="/AboutUs/GroupPhoto.svg"
                        alt="Group Photo"
                        width={100}
                        height={100}
                        className="object-cover object-top w-[100%] h-[100%]"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700/50  to-green-500/50"></div>
                    <div className="absolute inset-0 bottom-5 md:bottom-20 flex items-end justify-center">
                        <h1 className="text-white text-[20px] md:text-4xl lg:text-5xl xxl:text-7xl font-extrabold">
                            About Us
                        </h1>
                    </div>
                </div>
            </section>

            <section className="py-5 md:py-15">
                <div className="container m-auto px-5 md:px-10 lg:px-20">
                    <div className="text-[#44475B] text-justify">
                        <p className="mb-5">Welcome to BFC Capital, where we turn your financial dreams into achievable goals. As a SEBI-registered Investment Adviser (RIA)- registration number INA000021669- we are committed to delivering transparent, compliant, and goal-oriented wealth management solutions for individuals, families, and institutions. </p>

                        <p className="mb-5">BFC Capital began its journey over 21 years ago with a singular focus: to make wealth management accessible, reliable, and insightful for every investor. From the very beginning, we recognized that financial decisions are only as strong as the clarity and knowledge behind them. This understanding has guided us in building services that not only manage assets but also educate and empower investors at every stage of their financial journey.</p>

                        <p className="mb-5">Over the years, BFC Capital has grown to manage over ₹1,000 Crore in assets under advisory, serving more than 16,000 investors. But beyond numbers, our journey is defined by trust– the trust our clients place in us, the expertise our advisors bring, and our commitment to delivering financial clarity.</p>

                        <p className="mb-5">We have consistently focused on financial awareness, retirement planning, and investor education, believing that informed investors make stronger, more confident decisions. Built on the pillars of transparency, diligence, and client-centricity, BFC Capital continues to guide investors with insights, integrity, and purpose. Our ethos is simple: empowering investors is our greatest measure of success.To further this commitment, BFC Capital has been conducting structured financial awareness programs under the Quality Circle (QC) initiative since 2010. To date, over 300 Quality Circle sessions have been successfully conducted, reinforcing our long-standing dedication to investor education.</p>

                    </div>
                    <h3 className="text-[#44475B] font-semibold text-[22px]">Our expertise:</h3>

                    <ul className="list-disc text-[#44475B] px-6 mb-5">
                        <li><strong>SEBI-Registered & Compliant:</strong> Our recommendations adhere strictly to SEBI guidelines, ensuring ethical, unbiased, and credible advice</li>
                        <li><strong>Personalized Guidance:</strong> Dedicated advisors provide tailored strategies aligned with your goals, risk appetite, and life stage</li>
                        <li><strong>Goal-Based Planning:</strong> Plan for retirement, education, wealth creation, or financial security with strategies designed for long-term growth</li>
                        <li><strong>Expert Research & Insights:</strong> Gain timely market trends, investment tips, and tactical calls backed by our in-house research team</li>
                        <li><strong>Portfolio & Wealth Management:</strong> Track, manage, and optimize your investments with clarity and ease</li>
                        <li><strong>Safe & Secure:</strong> Advanced security protocols protect all investor data and transactions</li>
                        <li><strong>Retirement Planning:</strong> Build a sustainable post-retirement income strategy covering pensions, NPS, annuities, and long-term security.</li>
                    </ul>

                    <h3 className="text-[#44475B] font-semibold text-[22px] mb-3">Who Is It For?</h3>

                    <ul className="list-disc text-[#44475B] px-6 pb-5">
                        <li>First-time investors seeking clarity, structured guidance, and confidence in mutual fund investing</li>
                        <li>Families who want a consolidated view and seamless management of all household investments</li>
                        <li>Experienced investors looking for research-backed insights, tactical calls, and advanced wealth optimization tools</li>
                        <li>Individuals preparing for retirement or building long-term financial security through SIPs, NPS, or structured portfolios</li>

                    </ul>

                    <p className="text-justify mb-5 text-[#44475B]">
                        At its core, BFC Capital Private Limited is about empowering investors with knowledge, trust, and confidence. Our mission is to make wealth management accessible, goal-oriented, and transparent– helping every client make informed financial decisions and secure a financially independent future
                    </p>
                    <p className="text-justify mb-5 text-[#44475B]">
                        BFC Capital– Your Trusted SEBI RIA for Transparent, Goal-Oriented, and Secure Investment Advisory.
                    </p>
                </div>
            </section>

        </>
    );
}