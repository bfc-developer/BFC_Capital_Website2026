import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import BookSessionButton from './BookSessionButton'

export default function FinancialPlanning() {
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
                                Where Goals Meet Strategies and Dreams Meet a Promising Future
                            </h2>

                            <p className="mx-auto mb-4 max-w-6xl text-[15px] md:text-[17px] text-[#44475B] leading-relaxed font-inter opacity-90">
                                At BFC Capital, we see financial planning as more than numbers on a sheet left open. For us it’s where real-life goals meet practical strategies – and where dreams stop feeling distant or unachievable. <br />
                                As a <span aria-label="Sebi">SEBI</span> Registered Investment Adviser (RIA), our role is simple:to help you make smarter financial decisions, without pressure, bias, or confusion – so your future feels secure, not uncertain.
                            </p>
                            <BookSessionButton
                                buttonText="Book your financial planning session today"
                                className="bg-[#024B39] text-white px-6 py-2 rounded-md hover:bg-[#024B39] transition duration-300"
                            />
                        </div>
                        <div className="text-center py-2 order-1 md:order-2">
                            <Image
                                src="/Financial-Planning/Hero.webp"
                                alt="Smartphone showing Prodigy Pro financial planning interface"
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
            <section style={{ backgroundColor: '#fafafa', paddingTop: '64px', paddingBottom: '64px' }}>
                <div className="container mx-auto px-5 md:px-10 lg:px-20">
                    <h2 className="text-center font-bold" style={{ color: '#3A3F58', fontSize: '40px', marginBottom: '48px', lineHeight: '1.2' }}>
                        One SIP for all your financial needs.
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center w-full max-w-[1200px] mx-auto">
                        <div className="relative w-full max-w-[270px] h-full">
                            <div
                                className="card h-full shadow-sm border-0 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                                style={{
                                    padding: '32px 24px',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '24px',
                                    border: '1px solid #f0f0f0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'left',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
                                }}
                            >
                                <div className="card-body p-0" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <Image
                                        src="/Financial-Planning/Retirement_Planning.webp"
                                        alt="Illustration of retirement planning goal on Prodigy Pro app"
                                        width={64}
                                        height={64}
                                        className="w-[48px] h-[48px] lg:w-[56px] lg:h-[56px] xl:w-[64px] xl:h-[64px] object-contain"
                                        style={{ marginBottom: '20px' }}
                                    />
                                    <h2 style={{ color: '#44475B', fontSize: '20px', lineHeight: '1.3', marginBottom: '12px', marginTop: '0', fontWeight: 700 }}>
                                        Retirement <br /> Planning
                                    </h2>
                                    <p className="text-muted" style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.5', marginBottom: '32px', marginTop: '0', minHeight: '42px' }}>
                                        Plan your retirement corpus and secure your future
                                    </p>
                                    <div style={{ marginTop: 'auto' }}>
                                        <Link
                                            href="https://app.prodigypro.co.in/goal-planning"
                                            data-aos="fade-right"
                                            className="transition-all duration-300 hover:shadow-md"
                                            style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, backgroundColor: 'rgba(247, 247, 247, 1)', padding: '6px 14px', borderRadius: '4px', textDecoration: 'none' }}
                                        >
                                            <span style={{ background: 'linear-gradient(90deg, #024B39 39.5%, #011EFE 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                                Start Now
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full max-w-[270px] h-full">
                            <div
                                className="card h-full shadow-sm border-0 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                                style={{
                                    padding: '32px 24px',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '24px',
                                    border: '1px solid #f0f0f0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'left',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
                                }}
                            >
                                <div className="card-body p-0" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <Image
                                        src="/Financial-Planning/education 1.webp"
                                        alt="Illustration of education planning goal on Prodigy Pro app"
                                        width={64}
                                        height={64}
                                        className="w-[48px] h-[48px] lg:w-[56px] lg:h-[56px] xl:w-[64px] xl:h-[64px] object-contain"
                                        style={{ marginBottom: '20px' }}
                                    />
                                    <h2 style={{ color: '#44475B', fontSize: '20px', lineHeight: '1.3', marginBottom: '12px', marginTop: '0', fontWeight: 700 }}>
                                        Education <br /> Planning
                                    </h2>
                                    <p className="text-muted" style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.5', marginBottom: '32px', marginTop: '0', minHeight: '42px' }}>
                                        Plan education expenses and secure your child's future
                                    </p>
                                    <div style={{ marginTop: 'auto' }}>
                                        <Link
                                            href="https://app.prodigypro.co.in/goal-planning"
                                            data-aos="fade-right"
                                            className="transition-all duration-300 hover:shadow-md"
                                            style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, backgroundColor: 'rgba(247, 247, 247, 1)', padding: '6px 14px', borderRadius: '4px', textDecoration: 'none' }}
                                        >
                                            <span style={{ background: 'linear-gradient(90deg, #024B39 39.5%, #011EFE 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                                Start Now
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full max-w-[270px] h-full">
                            <div
                                className="card h-full shadow-sm border-0 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                                style={{
                                    padding: '32px 24px',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '24px',
                                    border: '1px solid #f0f0f0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'left',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
                                }}
                            >
                                <div className="card-body p-0" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <Image
                                        src="/Financial-Planning/Marriage_Planning.webp"
                                        alt="Illustration of marriage planning goal on Prodigy Pro app"
                                        width={64}
                                        height={64}
                                        className="w-[48px] h-[48px] lg:w-[56px] lg:h-[56px] xl:w-[64px] xl:h-[64px] object-contain"
                                        style={{ marginBottom: '20px' }}
                                    />
                                    <h2 style={{ color: '#44475B', fontSize: '20px', lineHeight: '1.3', marginBottom: '12px', marginTop: '0', fontWeight: 700 }}>
                                        Marriage <br />
                                        Planning
                                    </h2>
                                    <p className="text-muted" style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.5', marginBottom: '32px', marginTop: '0', minHeight: '42px' }}>
                                        Plan your dream wedding expenses or set a savings goal
                                    </p>
                                    <div style={{ marginTop: 'auto' }}>
                                        <Link
                                            href="https://app.prodigypro.co.in/goal-planning"
                                            data-aos="fade-right"
                                            className="transition-all duration-300 hover:shadow-md"
                                            style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, backgroundColor: 'rgba(247, 247, 247, 1)', padding: '6px 14px', borderRadius: '4px', textDecoration: 'none' }}
                                        >
                                            <span style={{ background: 'linear-gradient(90deg, #024B39 39.5%, #011EFE 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                                Start Now
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full max-w-[270px] h-full">
                            <div
                                className="card h-full shadow-sm border-0 hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                                style={{
                                    padding: '32px 24px',
                                    backgroundColor: '#ffffff',
                                    borderRadius: '24px',
                                    border: '1px solid #f0f0f0',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'left',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
                                }}
                            >
                                <div className="card-body p-0" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                                    <Image
                                        src="/Financial-Planning/home 1.webp"
                                        alt="Illustration of house purchase planning goal on Prodigy Pro app"
                                        width={64}
                                        height={64}
                                        className="w-[48px] h-[48px] lg:w-[56px] lg:h-[56px] xl:w-[64px] xl:h-[64px] object-contain"
                                        style={{ marginBottom: '20px' }}
                                    />
                                    <h2 style={{ color: '#44475B', fontSize: '20px', lineHeight: '1.3', marginBottom: '12px', marginTop: '0', fontWeight: 700 }}>
                                        House <br />
                                        Purchase
                                    </h2>
                                    <p className="text-muted" style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.5', marginBottom: '32px', marginTop: '0', minHeight: '42px' }}>
                                        Plan your home budget and start investing confidently
                                    </p>
                                    <div style={{ marginTop: 'auto' }}>
                                        <Link
                                            href="https://app.prodigypro.co.in/goal-planning"
                                            data-aos="fade-right"
                                            className="transition-all duration-300 hover:shadow-md"
                                            style={{ display: 'inline-block', fontSize: '12px', fontWeight: 700, backgroundColor: 'rgba(247, 247, 247, 1)', padding: '6px 14px', borderRadius: '4px', textDecoration: 'none' }}
                                        >
                                            <span style={{ background: 'linear-gradient(90deg, #024B39 39.5%, #011EFE 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                                Start Now
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <h2 className="text-center text-[28px] md:text-3xl lg:text-5xl font-bold text-[#44475B] mt-16">All You Need To Know</h2>
                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px]">
                        What Is Financial Planning and Why Does It Matter?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Before we begin, let us ask you a question<br />
                        Imagine you’ve been dreaming of going on an international vacation with your family for years. <br />
                        One day, you receive a sudden bonus of ₹3 lakhs. <br />
                        Do you immediately book flights, luxury hotels, and say “life is short”? <br />
                        Or do you stop for a moment, check your savings, <span aria-label="E M Is">EMIs</span>, upcoming goals, and then decide whether this trip fits into your bigger financial picture? <br />
                        If you instinctively chose the second option, you already understand financial planning and that too maybe without realising it. <br />And if you didn’t, that’s okay too. In fact, that’s exactly where financial planning becomes important. <br />
                        At <b>BFC Capital</b>, we believe good financial decisions are rarely rushed. They’re thought through, just like our approach for your wealth.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Understanding Financial Planning
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>Most of us have dreams that require more than just wishful thinking – they require money. Real money. <br />
                        So ask yourself:</p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <li>Do you know exactly where your monthly income goes?</li>
                        <li>Are you able to save consistently?</li>
                        <li>Or do expenses quietly eat into your earnings every month?</li>
                    </ul>

                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Financial planning helps you answer these questions honestly. <br />
                        It begins with understanding where you stand today, defining what you want tomorrow, and then creating a clear path between the two. This includes budgeting, saving, managing risks, investing wisely, planning for retirement, and taking care of short-term needs along the way. <br />
                        As a <b><span aria-label="Sebi">SEBI</span> Registered Investment Advisor</b>, BFC Capital follows an advice-first approach – meaning recommendations are made for your goals, not for selling products.</p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Why You Should Plan Your Finances?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        Asking why financial planning is important is a bit like asking why you need good health. <br />
                        Life is unpredictable. But when your finances are planned, the stress becomes manageable. <br />
                        Financial planning:
                    </p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <li>Gives direction to your short-term and long-term goals</li>
                        <li>Helps you stay in control of spending</li>
                        <li>Encourages disciplined saving</li>
                        <li>Prepares you for emergencies</li>
                        <li>Helps you manage debt without panic</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        And yes – with consistency, it can even help you retire earlier or more comfortably than you imagined.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        To Conclude
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Financial planning isn't just about money. <br />
                        It's about peace of mind, confidence, and knowing that you're prepared – whatever life throws at you. <br />
                        If you're ready to build a clear financial roadmap, <b>BFC Capital</b> is here to help.
                    </p>
                    <BookSessionButton
                        buttonText="Take the first step now!"
                        className="bg-[#024B39] text-white px-6 py-2 rounded-md hover:bg-[#024B39] transition duration-300 mt-5"
                    />
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <h2 className="text-[28px] md:text-3xl lg:text-5xl font-bold text-[#44475B] mb-8">A Holistic Approach to Your Financial Health</h2>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>Remember Virus from 3 Idiots saying, “Life is a race”? <br />We laughed then – but today, most of us are running.<br />Running to earn more. To live better. To feel secure.<br />But running without direction can leave you exhausted, not fulfilled.<br />What’s often missing isn’t effort – it’s a <b>holistic approach to financial health</b>.</p>
                </div>
                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        What’s a Holistic Approach to Your Financial Health?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-2'>
                        When your salary gets credited, what happens next?<br />
                        Bills get paid. Expenses follow. Some money is saved. Some is invested. And life moves on.<br />
                        A holistic approach goes deeper.<br />
                        It looks at your finances not in isolation, but in connection with your life—your dreams, responsibilities, family, career, and future transitions. It helps you plan not just for today, but for every stage ahead.<br />
                        In simple words, it brings meaning and intention to your money.
                    </p>

                </div>
                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        What Are the Key Components of a Holistic Financial Plan?
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        Financial decisions made today echo into the future. <br />
                        Many people enjoy their 20s without much planning—and then feel overwhelmed in their 40s when responsibilities multiply. A holistic approach doesn’t stop you from living life. It helps you live it without future regret. <br />
                        That’s exactly what structured financial planning aims to do. <br />
                        There are going to be following steps in effective financial planning. They are in order of priority and you should not jump over them.
                    </p>

                </div>
                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Unavoidable Consumption
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        The moment income hits your account, fixed expenses line up – rent, <span aria-label="E M Is">EMIs</span>, school fees, groceries, utilities.<br />
                        These aren’t optional. Planning for them is essential.<br />
                        Setting aside a defined portion of income – ideally around 25–30% – ensures stability and prevents stress month after month.
                    </p>

                </div>
                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Risk Planning
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        Life doesn’t warn you before throwing surprises.<br />
                        Health insurance protects you from rising medical costs.<br />
                        Term life insurance protects your family if something were to happen to you.<br />
                        Basic guidelines:
                    </p>
                    <ul className='list-disc pl-7 text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        <li>Health cover: (Age ÷ 5) × ₹1,00,000</li>
                        <li>Life cover: 8-10 times of annual income</li>
                    </ul>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto'>
                        At <b>BFC Capital</b>, risk planning is never treated casually… it’s a core part of responsible, <span aria-label="Sebi">SEBI</span> <abbr title="Registered Investment Advisor" aria-label="R I A">RIA</abbr> led advice.
                    </p>
                </div>
                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Contingency Funds
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Once expenses and protection are in place, emergency savings become crucial.<br />
                        An emergency fund should ideally cover 3-6 months of expenses. It acts as your financial cushion during job loss, medical emergencies, or unexpected disruptions.<br />
                        <b>Tip:</b> Keep this money easily accessible – by investing it into either in bank deposits or liquid funds.
                    </p>
                </div>
                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Goal-Based Planning
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Buying a car. Planning a wedding. Children’s education. Retirement.<br />
                        Dreams are common but achieving them requires structure.<br />
                        Goal-based planning helps you understand how much you need, by when, and how to invest accordingly, so your goals feel achievable, not overwhelming.
                    </p>
                </div>
                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Wealth Management
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        If there’s surplus income or a windfall like a bonus, inheritance, or unexpected gains, then strategic investing can help build long-term wealth and financial independence.<br />
                        Now, when you covered yourself against uncertainties, planned for your financial Goals, pause for a while and ask yourself, is there a need to invest further?<br />
                        The answer is- investing now also serves a purpose- purpose to start your passive income. Your money will be growing without you working for it.<br />
                        And slowly and gradually you will build wealth which will act as your second revenue.
                    </p>
                </div>
                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        On a Parting Note
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        A holistic financial plan may feel overwhelming at first.<br />
                        But once income and expenses are mapped, everything starts falling into place.<br />
                        Clarity replaces confusion and confidence follows.
                    </p>
                </div>

            </section >
            <section>
                <div className='container mx-auto px-5 md:px-10 lg:px-20'>
                    <h2 className="text-[28px] md:text-3xl lg:text-5xl font-bold text-[#44475B] mb-8">
                        Financial Planning for Different Life Stages
                    </h2>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Financial planning begins earlier than most people realise—and evolves throughout life.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Teenage Years (13-17)
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Develop financial awareness, saving habits, and basic financial literacy.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Young Adulthood (18-25)
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Budget income, build emergency funds, use credit responsibly, start investing, and secure basic insurance.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Early and Mid-Career (26-45)
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Plan for family responsibilities, home ownership, education expenses, and long-term wealth creation.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Pre-Retirement (45-60)
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Reduce liabilities, rebalance investments, and ensure medical preparedness.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Retirement (60+ Years)
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Focus on budgeting, income stability, capital preservation, and estate planning.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        To Conclude
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Your financial needs change with time and your strategy must evolve too.
                    </p>
                    <BookSessionButton
                        buttonText="Invest now!"
                        className="bg-[#024B39] text-white px-6 py-2 rounded-md hover:bg-[#024B39] transition duration-300 mt-5"
                    />
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <h2 className="text-[28px] md:text-3xl lg:text-5xl font-bold text-[#44475B] mb-8">
                        One SIP for Each Financial Goal
                    </h2>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Savings alone cannot fulfil major life goals.<br />
                        Strategic SIP investments aligned with timelines and risk profiles make dreams achievable.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Education:
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        For long-term goals like children’s education (15+ years), equity-oriented funds help beat inflation and build corpus.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Vacation:
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Short- to medium-term goals can be planned using debt or hybrid funds based on timelines.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        House:
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Hybrid funds work well for down payments (4–5 years), while long-term goals benefit from equity investments.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Car:
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Investment strategy depends on when the car is required—hybrid for medium term, equity for long term.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Marriage:
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        For a 5-6 year timeline, aggressive hybrid or moderate equity funds are suitable.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        Retirement:
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        Early, disciplined investing with step-up SIPs ensures a comfortable retirement. Risk is gradually reduced closer to retirement.
                    </p>
                </div>

                <div className='container mx-auto px-5 md:px-10 lg:px-20 mb-8'>
                    <p className="mx-auto mt-4 md:mt-8 mb-4 text-[18px] md:text-[24px] font-bold text-[#44475B] mb-[20px]">
                        To Conclude
                    </p>
                    <p className='text-[#44475B] text-[15px] md:text-[17px] leading-relaxed font-inter mx-auto mb-4'>
                        There is one SIP for every financial goal – when planned correctly. At BFC Capital, we structure SIPs based on goals, not guesses.<br />
                        Start your investment journey today!
                    </p>
                    <BookSessionButton
                        buttonText="Start your investment journey today!"
                        className="bg-[#024B39] text-white px-6 py-2 rounded-md hover:bg-[#024B39] transition duration-300 mt-5"
                    />
                </div>
            </section>
        </>
    )
}   