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
                        className="object-cover object-top w-[100%] md:h-[100%] lg:h-[100%] xl:h-[100%]"
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

            <section>
                <div className="font-[#44475B]">
                    <p>Welcome to BFC Capital, where we turn your financial dreams into achievable goals. As a SEBI-registered Investment Adviser (RIA)- registration number INA000021669- we are committed to delivering transparent, compliant, and goal-oriented wealth management solutions for individuals, families, and institutions. </p>
                    <p>BFC Capital began its journey over 21 years ago with a singular focus: to make wealth management accessible, reliable, and insightful for every investor. From the very beginning, we recognized that financial decisions are only as strong as the clarity and knowledge behind them. This understanding has guided us in building services that not only manage assets but also educate and empower investors at every stage of their financial journey.</p>
                    <p>Over the years, BFC Capital has grown to manage over ₹1,000 Crore in assets under advisory, serving more than 16,000 investors. But beyond numbers, our journey is defined by trust– the trust our clients place in us, the expertise our advisors bring, and our commitment to delivering financial clarity.</p>
                    <p>We have consistently focused on financial awareness, retirement planning, and investor education, believing that informed investors make stronger, more confident decisions. Built on the pillars of transparency, diligence, and client-centricity, BFC Capital continues to guide investors with insights, integrity, and purpose. Our ethos is simple: empowering investors is our greatest measure of success.To further this commitment, BFC Capital has been conducting structured financial awareness programs under the Quality Circle (QC) initiative since 2010. To date, over 300 Quality Circle sessions have been successfully conducted, reinforcing our long-standing dedication to investor education.</p>
                </div>
                <h3 className="font-[#44475B] font-semibold">Our expertise:</h3>
                <div className="font-[#44475B]">
                    <ul className="list-disc">
                        <li>SEBI-Registered & Compliant: Our recommendations adhere strictly to SEBI guidelines, ensuring ethical, unbiased, and credible advice</li>
                        <li>Personalized Guidance: Dedicated advisors provide tailored strategies aligned with your goals, risk appetite, and life stage</li>
                        <li>Goal-Based Planning: Plan for retirement, education, wealth creation, or financial security with strategies designed for long-term growth</li>
                        <li>Expert Research & Insights: Gain timely market trends, investment tips, and tactical calls backed by our in-house research team</li>
                        <li>Portfolio & Wealth Management: Track, manage, and optimize your investments with clarity and ease</li>
                        <li>Safe & Secure: Advanced security protocols protect all investor data and transactions</li>
                        <li>Retirement Planning: Build a sustainable post-retirement income strategy covering pensions, NPS, annuities, and long-term security.</li>
                    </ul>
                    <hr />
                </div>
                <h3 className="font-[#44475B] font-semibold">Who Is It For?</h3>
                <div className="font-[#44475B]">
                    <ul>
                        <li>First-time investors seeking clarity, structured guidance, and confidence in mutual fund investing</li>
                        <li>Families who want a consolidated view and seamless management of all household investments</li>
                        <li>Experienced investors looking for research-backed insights, tactical calls, and advanced wealth optimization tools</li>
                        <li>Individuals preparing for retirement or building long-term financial security through SIPs, NPS, or structured portfolios</li>
                        <p>At its core, BFC Capital Private Limited is about empowering investors with knowledge, trust, and confidence. Our mission is to make wealth management accessible, goal-oriented, and transparent– helping every client make informed financial decisions and secure a financially independent future.</p>
                        <p>BFC Capital– Your Trusted SEBI RIA for Transparent, Goal-Oriented, and Secure Investment Advisory.</p>
                    </ul>
                </div>
                <h2 className="font-[#44475B] font-bold">Wealth Management Team</h2>

            </section>
        </>
    );
}