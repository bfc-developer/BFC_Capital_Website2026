import Image from "next/image";

export default function AboutUs() {
    interface WealthManagementTeam {
        name: string;
        role: string;
        image: string;
        bio?: string;
    }

    const wealthManagementTeam: WealthManagementTeam[] = [
        {
            name: "Deepti Bansal",
            role: "Associate Partner",
            image: "/AboutUs/WealthManagementTeam/Deepti.svg",
            bio: "For those who don't know her, Deepti is a cheerful individual with a perpetual smile. If you're in severe need of financial advice, there's a strong chance you'll run into her. She is an expert at formulating flawless investing strategies and is an avid reader."
        },
        {
            name: "Sparsh Awasthi",
            role: "Sr. Wealth Manager",
            image: "/AboutUs/WealthManagementTeam/Sparsh.svg",
            bio: "Sparsh is your friendly neighbourhood financial superhero! With his expert knowledge, passion for helping clients reach their goals, and impressive public speaking skills, he’s here to save the day from financial worries. Sparsh’s dedication to providing personalised guidance and his commitment to building strong client relationships make him a valuable member of our team.",
        },
        {
            name: "Nainie Rastogi",
            role: "Wealth Manager",
            image: "/AboutUs/WealthManagementTeam/Nainie.svg",
            bio: "Nainie is a seasoned results driven professional with six years of experience in Trade/Forex Sales, CRM, and Strategic Growth. She has worked with leading institutions like HDFC Bank and Axis Bank. Presently working as Wealth Manager in BFC Capital, she is handling more than 50 HNI’s/semi HNI’s clients totalling an AUM of around 56 Crs."
        },
        {
            name: "Ayush Mishra",
            role: "Wealth Manager",
            image: "/AboutUs/WealthManagementTeam/Ayush.svg",
            bio: "With a unique understanding of financial expertise and human behavior, Ayush stands out as a wealth manager. With several years of experience in wealth management and Behavioural Finance, he is Presently working as Wealth Manager in BFC Capital and is handling more than 70 HNI’s and semi HNI’s clients totalling an AUM of around 47 Crs."
        },
        {
            name: "Shashank Awasthi",
            role: "Wealth Manager",
            image: "/AboutUs/WealthManagementTeam/Shashank.svg",
            bio: "Shashank is a growth-driven professional with strong decision-making skills and sharp product analysis abilities. A natural leader, he excels at simplifying complex topics and building lasting client relationships. An Executive MBA graduate from ISB Hyderabad—ranked among the world’s top B-schools—he brings over 4 years of experience in the finance sector."
        },
        {
            name: "Shubham Dubey",
            role: "Wealth Manager",
            image: "/AboutUs/WealthManagementTeam/Shubham.svg",
            bio: "Shubham works closely with clients to turn financial goals into clear, achievable plans. With a Chartered Accountancy background and a natural comfort with numbers, he simplifies complex financial decisions and builds strategies that balance growth, tax efficiency, and long-term stability."
        },
        {
            name: "Shivangi Yadav",
            role: "Wealth Manager",
            image: "/AboutUs/WealthManagementTeam/Shivangi.svg",
            bio: "Shivangi works closely with clients to make financial planning simple, practical, and approachable. She believes in empowering individuals with clear knowledge and thoughtful guidance, helping them make confident money decisions. Known for her strong communication skills and client-first mindset, she focuses on building trust and supporting long-term financial well-being."
        },
        {
            name: "Sandeep Yadav",
            role: "Relationship Manager",
            image: "/AboutUs/WealthManagementTeam/Sandeep.svg",
            bio: "Sandeep brings a steady, client-focused approach to portfolio management and financial planning. He works closely with clients to understand their goals and design tailored solutions that balance performance, risk, and long-term value. Known for his attention to detail and strong relationship-building skills, Sandeep prioritises accuracy, compliance, and trust in every client interaction."
        },
    ];

    const operationsTeam: WealthManagementTeam[] = [
        {
            name: "Vertika Singh",
            role: "AVP - Operations",
            image: "/AboutUs/Operations/Vertika.svg",
            bio: "Vertika is a perfect fit for the operations team because of her unwavering focus. She has developed into an expert in investing procedures thanks to her curiosity and desire to learn."
        },
        {
            name: "Vanshika Gupta",
            role: "Vanshika Gupta",
            image: "/AboutUs/Operations/Vanshika.svg",
            bio: "Vanshika is a voracious reader. And what does she read? Regulatory guidelines, compliance norms, and process updates. What draws her to read them? First, it's her duty to stay current, and second, because she's a nerd who can't stop learning."
        },
    ];

    const hrAccountsTeam: WealthManagementTeam[] = [
        {
            name: "Ravi Singh",
            role: "AVP - HR",
            image: "/AboutUs/HrAndAccounts/Ravi.svg",
            bio: "Building a competent team requires an eye for talent. Fortunately, we know just the guy. Identifying skills comes to Ravi instinctually. Over the years, he has introduced numerous amazing individuals to BFC Capital, courtesy his innate ability to identify the right people for the job."
        },
        {
            name: "Manoj Mishra",
            role: "AVP - Accounts",
            image: "/AboutUs/HrAndAccounts/Manoj.svg",
            bio: "Working balance sheets, prepping the payrolls and keeping track of our liabilities and obligations has been Manoj’s business since he set foot in our office for the first time. He rightfully owns this set of responsibilities, and that’s what makes him the asset he is."
        },
    ];

    const customerSupportTeam: WealthManagementTeam[] = [
        {
            name: "Sejal Verma",
            role: "Manager-Customer Support",
            image: "/AboutUs/CustomerSupport/Sejal.svg",
            bio: "Sejal Verma heads our Customer Support department with a calm, focused approach and a genuine commitment to client satisfaction. As Manager- Customer Support at BFC CAPITAL, she ensures that every query is handled with clarity, efficiency, and a personal touch. Known for her patience, problem-solving mindset, and ability to simplify even the most complex concerns."
        },
    ];

    const researchTeam: WealthManagementTeam[] = [
        {
            name: "Akash Gupta",
            role: "AVP- Research & Analysis",
            image: "/AboutUs/Research/Akash.svg",
            bio: "Akash has been a core part of BFC Capital’s research function for over six years, consistently contributing depth, perspective, and rigor to investment decision-making. Renowned for his reliability, steady judgment, and disciplined approach, he emphasizes clarity, data integrity, and thorough analysis that delivers insights investors can trust over time."
        },
        {
            name: "Kavya Mehrotra",
            role: "Manager- Research & Analysis",
            image: "/AboutUs/Research/Kavya.svg",
            bio: "Kavya brings clarity and care to the way investment decisions are researched at BFC Capital. She enjoys breaking down complex market data into insights that genuinely help clients make confident, long-term choices. Known for her calm, methodical approach, she values precision, continuous learning, and the impact thoughtful research can have on real financial journeys."
        },
        {
            name: "Uttam Kumar Singh",
            role: "Equity Dealer",
            image: "/AboutUs/Research/Uttam.svg",
            bio: "Uttam, we cannot think of a more apt name for someone so bent on achieving perfection. Be it researching company performances or balancing portfolios, Uttam knows how to get the job done in the neatest way possible."
        },
    ];

    const digitalMarketingTeam: WealthManagementTeam[] = [
        {
            name: "Nitesh Rai",
            role: "Sr. Manager - Digital Marketing",
            image: "/AboutUs/DigitalMarketing/Nitesh.svg",
            bio: "There are people who are passionate about what they do, and then there’s Nitesh. He’ll practically spend nights deep searching the internet, acquainting himself with latest SEO protocols, studying demographics, identifying his target audience and devising infallible digital marketing ideas."
        },
        {
            name: "Amulya Ratan",
            role: "Manager - Digital Marketing",
            image: "/AboutUs/DigitalMarketing/Amulya.svg",
            bio: "Amulya’s inquisitive mind and research capabilities make him the perfect fold for Nitesh. BFC Capital’s outreach campaigns are so much more effective due to his will to excel and unfazed resolve. On a personal front, he is a foodie who doesn’t mind travelling miles to quench his hunger for rare delicacies."
        },
        {
            name: "Surabhi Gupta",
            role: "Lead Graphic Designer",
            image: "/AboutUs/DigitalMarketing/Surbhi.svg",
            bio: "Flyers, brochures, creatives or print collateral, ask and you shall receive. Long story short, Surabhi is our in-house graphics wizard, and thankfully she’s damn good at it. Those who know her personally also know that she’s a brilliant artist. Obviously!"
        },
    ];

    const technicalSupportTeam: WealthManagementTeam[] = [
        {
            name: "Navneet Singh",
            role: "Sr. Web Developer",
            image: "/AboutUs/TechnicalSupportTeam/Navneet.svg",
            bio: "Despite his young age, Navneet is an asset for Team BFC. Why? Because he is a multi-tasker, who champions meeting deadlines. You name it: coding, troubleshooting or designing, the boy will deliver, no questions asked."
        },
        {
            name: "Pallavi Singh",
            role: "Sr. Web Developer",
            image: "/AboutUs/TechnicalSupportTeam/Pallavi.svg",
            bio: "The never-ending cues of coding that keep our app and website functioning are a language Pallavi understands. To us, however, they're no different than random graffiti. Yes, she's a lifesaver. God knows what we'd do without her."
        },
        {
            name: "Vivek Kumar",
            role: "Sr. Web Developer",
            image: "/AboutUs/TechnicalSupportTeam/Vivek.svg",
            bio: "Maintaining a digital presence means ensuring the systems function appropriately around the year. We’re so thankful for having someone as dependable as Vivek at our disposal. Besides being a whiz at cleaning bugs and real-time troubleshooting, Vivek is also a gadget geek."
        },
        {
            name: "Chitranshu Srivastava",
            role: "Sr. Software Developer",
            image: "/AboutUs/TechnicalSupportTeam/Chitranshu.svg",
            bio: "Offering technical assistance to Team BFC's clients across platforms is a consuming errand, something Chitranshu does so well that he makes it look effortless. Of course, he is a man of multifaceted competencies. How else would he make it happen?"
        },
        {
            name: "Mohd. Zuhaib Khan",
            role: "Sr. Software Engineer",
            image: "/AboutUs/TechnicalSupportTeam/Zuhaib.svg",
            bio: "Mohd. Zuhaib Khan is an experienced iOS Developer with a strong command over Swift, UIKit, and modern Apple development frameworks. He specializes in building smooth, intuitive, and high-performance mobile applications. With a focus on clean architecture and user-centric design, Zuhaib consistently delivers reliable, scalable, and well-crafted iOS solutions."
        },
    ];

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
                    <div className="text-[#44475B] text-justify text-[15px] md:text-[17px] leading-relaxed">
                        <p className="mb-5">Welcome to BFC Capital, where we turn your financial dreams into achievable goals. As a SEBI-registered Investment Adviser (RIA)- registration number INA000021669- we are committed to delivering transparent, compliant, and goal-oriented wealth management solutions for individuals, families, and institutions. </p>

                        <p className="mb-5">BFC Capital began its journey over 21 years ago with a singular focus: to make wealth management accessible, reliable, and insightful for every investor. From the very beginning, we recognized that financial decisions are only as strong as the clarity and knowledge behind them. This understanding has guided us in building services that not only manage assets but also educate and empower investors at every stage of their financial journey.</p>

                        <p className="mb-5">Over the years, BFC Capital has grown to manage over ₹1,000 Crore in assets under advisory, serving more than 16,000 investors. But beyond numbers, our journey is defined by trust– the trust our clients place in us, the expertise our advisors bring, and our commitment to delivering financial clarity.</p>

                        <p className="mb-5">We have consistently focused on financial awareness, retirement planning, and investor education, believing that informed investors make stronger, more confident decisions. Built on the pillars of transparency, diligence, and client-centricity, BFC Capital continues to guide investors with insights, integrity, and purpose. Our ethos is simple: empowering investors is our greatest measure of success.To further this commitment, BFC Capital has been conducting structured financial awareness programs under the Quality Circle (QC) initiative since 2010. To date, over 300 Quality Circle sessions have been successfully conducted, reinforcing our long-standing dedication to investor education.</p>

                    </div>
                    <h3 className="text-[#44475B] font-semibold text-[22px]">Our expertise:</h3>

                    <ul className="list-disc text-[#44475B] px-6 mb-5 text-justify text-[15px] md:text-[17px] leading-relaxed">
                        <li><strong>SEBI-Registered & Compliant:</strong> Our recommendations adhere strictly to SEBI guidelines, ensuring ethical, unbiased, and credible advice</li>
                        <li><strong>Personalized Guidance:</strong> Dedicated advisors provide tailored strategies aligned with your goals, risk appetite, and life stage</li>
                        <li><strong>Goal-Based Planning:</strong> Plan for retirement, education, wealth creation, or financial security with strategies designed for long-term growth</li>
                        <li><strong>Expert Research & Insights:</strong> Gain timely market trends, investment tips, and tactical calls backed by our in-house research team</li>
                        <li><strong>Portfolio & Wealth Management:</strong> Track, manage, and optimize your investments with clarity and ease</li>
                        <li><strong>Safe & Secure:</strong> Advanced security protocols protect all investor data and transactions</li>
                        <li><strong>Retirement Planning:</strong> Build a sustainable post-retirement income strategy covering pensions, NPS, annuities, and long-term security.</li>
                    </ul>

                    <h3 className="text-[#44475B] font-semibold text-[22px] mb-3">Who Is It For?</h3>

                    <ul className="list-disc text-[#44475B] px-6 pb-5 text-justify text-[15px] md:text-[17px] leading-relaxed">
                        <li>First-time investors seeking clarity, structured guidance, and confidence in mutual fund investing</li>
                        <li>Families who want a consolidated view and seamless management of all household investments</li>
                        <li>Experienced investors looking for research-backed insights, tactical calls, and advanced wealth optimization tools</li>
                        <li>Individuals preparing for retirement or building long-term financial security through SIPs, NPS, or structured portfolios</li>

                    </ul>

                    <p className="text-justify mb-5 text-[#44475B] text-justify text-[15px] md:text-[17px] leading-relaxed">
                        At its core, BFC Capital Private Limited is about empowering investors with knowledge, trust, and confidence. Our mission is to make wealth management accessible, goal-oriented, and transparent– helping every client make informed financial decisions and secure a financially independent future
                    </p>
                    <p className="text-justify mb-5 text-[#44475B] text-justify text-[15px] md:text-[17px] leading-relaxed">
                        BFC Capital– Your Trusted SEBI RIA for Transparent, Goal-Oriented, and Secure Investment Advisory.
                    </p>
                </div>
            </section>

            <section className="bg-white py-5 md:py-15">
                <div className="container m-auto px-5 md:px-10 lg:px-20">
                    <h2 className="text-[#44475B] text-center text-[25px] md:text-3xl lg:text-4xl font-bold mb-10">
                        Wealth Management Team
                    </h2>
                    <div className="flex flex-wrap justify-center gap-10">
                        {wealthManagementTeam.map((member, index) => (
                            <div key={index} className="flex flex-col items-center text-center w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2.5rem)]">
                                <div className="w-full relative mb-4 overflow-hidden group">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={400}
                                        height={500}
                                        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white text-[8px] md:text-[14px] lg:text-[16px] md:leading-relaxed text-justify">
                                            {member.bio || `${member.name} is a dedicated ${member.role} at BFC Capital, committed to providing excellence and helping clients reach their goals.`}
                                        </p>
                                    </div>
                                </div>
                                <h4 className="text-[#44475B] font-bold text-[15px] md:text-[20px] lg:text-[24px] mb-1">{member.name}</h4>
                                <p className="text-[#44475B] text-[12px] text-[14px] lg:text-[17px] leading-relaxed">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white py-5 md:py-15">
                <div className="container m-auto px-5 md:px-10 lg:px-20">
                    <h2 className="text-[#44475B] text-center text-[25px] md:text-3xl lg:text-4xl font-bold mb-10">
                        Operations
                    </h2>
                    <div className="flex flex-wrap justify-center gap-10">
                        {operationsTeam.map((member, index) => (
                            <div key={index} className="flex flex-col items-center text-center w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2.5rem)]">
                                <div className="w-full relative mb-4 overflow-hidden group">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={400}
                                        height={500}
                                        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white text-[8px] md:text-[14px] lg:text-[16px] md:leading-relaxed text-justify">
                                            {member.bio || `${member.name} is a dedicated ${member.role} at BFC Capital, committed to providing excellence and helping clients reach their goals.`}
                                        </p>
                                    </div>
                                </div>
                                <h4 className="text-[#44475B] font-bold text-[15px] md:text-[20px] lg:text-[24px] mb-1">{member.name}</h4>
                                <p className="text-[#44475B] text-[12px] text-[14px] lg:text-[17px] leading-relaxed">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white py-5 md:py-15">
                <div className="container m-auto px-5 md:px-10 lg:px-20">
                    <h2 className="text-[#44475B] text-center text-[25px] md:text-3xl lg:text-4xl font-bold mb-10">
                        HR & Accounts
                    </h2>
                    <div className="flex flex-wrap justify-center gap-10">
                        {hrAccountsTeam.map((member, index) => (
                            <div key={index} className="flex flex-col items-center text-center w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2.5rem)]">
                                <div className="w-full relative mb-4 overflow-hidden group">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={400}
                                        height={500}
                                        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white text-[8px] md:text-[14px] lg:text-[16px] md:leading-relaxed text-justify">
                                            {member.bio || `${member.name} is a dedicated ${member.role} at BFC Capital, committed to providing excellence and helping clients reach their goals.`}
                                        </p>
                                    </div>
                                </div>
                                <h4 className="text-[#44475B] font-bold text-[15px] md:text-[20px] lg:text-[24px] mb-1">{member.name}</h4>
                                <p className="text-[#44475B] text-[12px] text-[14px] lg:text-[17px] leading-relaxed">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white py-5 md:py-15">
                <div className="container m-auto px-5 md:px-10 lg:px-20">
                    <h2 className="text-[#44475B] text-center text-[25px] md:text-3xl lg:text-4xl font-bold mb-10">
                        Customer Support
                    </h2>
                    <div className="flex flex-wrap justify-center gap-10">
                        {customerSupportTeam.map((member, index) => (
                            <div key={index} className="flex flex-col items-center text-center w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2.5rem)]">
                                <div className="w-full relative mb-4 overflow-hidden group">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={400}
                                        height={500}
                                        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white text-[8px] md:text-[14px] lg:text-[16px] md:leading-relaxed text-justify">
                                            {member.bio || `${member.name} is a dedicated ${member.role} at BFC Capital, committed to providing excellence and helping clients reach their goals.`}
                                        </p>
                                    </div>
                                </div>
                                <h4 className="text-[#44475B] font-bold text-[15px] md:text-[20px] lg:text-[24px] mb-1">{member.name}</h4>
                                <p className="text-[#44475B] text-[12px] text-[14px] lg:text-[17px] leading-relaxed">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white py-5 md:py-15">
                <div className="container m-auto px-5 md:px-10 lg:px-20">
                    <h2 className="text-[#44475B] text-center text-[25px] md:text-3xl lg:text-4xl font-bold mb-10">
                        Research Team
                    </h2>
                    <div className="flex flex-wrap justify-center gap-10">
                        {researchTeam.map((member, index) => (
                            <div key={index} className="flex flex-col items-center text-center w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2.5rem)]">
                                <div className="w-full relative mb-4 overflow-hidden group">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={400}
                                        height={500}
                                        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white text-[8px] md:text-[14px] lg:text-[16px] md:leading-relaxed text-justify">
                                            {member.bio || `${member.name} is a dedicated ${member.role} at BFC Capital, committed to providing excellence and helping clients reach their goals.`}
                                        </p>
                                    </div>
                                </div>
                                <h4 className="text-[#44475B] font-bold text-[15px] md:text-[20px] lg:text-[24px] mb-1">{member.name}</h4>
                                <p className="text-[#44475B] text-[12px] text-[14px] lg:text-[17px] leading-relaxed">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white py-5 md:py-15">
                <div className="container m-auto px-5 md:px-10 lg:px-20">
                    <h2 className="text-[#44475B] text-center text-[25px] md:text-3xl lg:text-4xl font-bold mb-10">
                        Digital Marketing Team
                    </h2>
                    <div className="flex flex-wrap justify-center gap-10">
                        {digitalMarketingTeam.map((member, index) => (
                            <div key={index} className="flex flex-col items-center text-center w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2.5rem)]">
                                <div className="w-full relative mb-4 overflow-hidden group">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={400}
                                        height={500}
                                        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white text-[8px] md:text-[14px] lg:text-[16px] md:leading-relaxed text-justify">
                                            {member.bio || `${member.name} is a dedicated ${member.role} at BFC Capital, committed to providing excellence and helping clients reach their goals.`}
                                        </p>
                                    </div>
                                </div>
                                <h4 className="text-[#44475B] font-bold text-[15px] md:text-[20px] lg:text-[24px] mb-1">{member.name}</h4>
                                <p className="text-[#44475B] text-[12px] text-[14px] lg:text-[17px] leading-relaxed">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white py-5 md:py-15">
                <div className="container m-auto px-5 md:px-10 lg:px-20">
                    <h2 className="text-[#44475B] text-center text-[25px] md:text-3xl lg:text-4xl font-bold mb-10">
                        Technical Support Team
                    </h2>
                    <div className="flex flex-wrap justify-center gap-10">
                        {technicalSupportTeam.map((member, index) => (
                            <div key={index} className="flex flex-col items-center text-center w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2.5rem)] ">
                                <div className="w-full relative mb-4 overflow-hidden group">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        width={400}
                                        height={500}
                                        className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <p className="text-white text-[8px] md:text-[14px] lg:text-[16px] md:leading-relaxed text-justify">
                                            {member.bio || `${member.name} is a dedicated ${member.role} at BFC Capital, committed to providing excellence and helping clients reach their goals.`}
                                        </p>
                                    </div>
                                </div>
                                <h4 className="text-[#44475B] font-bold text-[15px] md:text-[20px] lg:text-[24px] mb-1">{member.name}</h4>
                                <p className="text-[#44475B] text-[12px] text-[14px] lg:text-[17px] leading-relaxed">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </>
    );
}