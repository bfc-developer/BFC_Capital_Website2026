import Link from "next/link";
import Image from "next/image";


export default function DownloadApp() {
    return (
        <>
            <section className="py-md-5 pb-3 bg_color_prodgy overflow-hidden">
                <div className="container">
                    <div className="row justify-content-center align-items-center px-md-3">
                        <div className="col-md-7 py-2 order-md-1 order-2">
                            <div
                                className="text-md-start home_smart_heading"
                                data-aos="fade-right"
                            >
                                <h2 className="text-md-start">
                                    Prodigy Pro – Thoughtful investing, Built for clarity.
                                </h2>
                                <p className="text-muted text-md-start mb-md-4 py-1 mt-4">
                                    Investing works best when it is calm, structured, and informed.Prodigy Pro brings that philosophy to your fingertips – a platform designed to help you make better decisions, stay disciplined, and remain focused on long-term outcomes.
                                </p>
                                <p>
                                    Built for investors who value process over noise.
                                </p>
                            </div>

                            {/* App Store Buttons */}
                            <div className="d-flex gap-3 justify-content-md-start justify-content-center">
                                <Link href="https://play.google.com/store/apps/details?id=com.bfc_mf.prodigy_app" target="_blank" data-aos="fade-up">
                                    <Image
                                        src="/DownloadApp/PlayStoreBlack.svg"
                                        alt="Google Play"
                                        width={150}
                                        height={45}
                                    />
                                </Link>
                                <Link href="https://apps.apple.com/in/app/prodigy-pro-mutual-funds-sip/id1575700744" target="_blank" data-aos="fade-up">
                                    <Image
                                        src="/DownloadApp/AppStoreBlack.svg"
                                        alt="App Store"
                                        width={150}
                                        height={45}
                                    />
                                </Link>
                            </div>
                        </div>

                        <div className="col-md-5 col-7 text-center py-2 order-md-2 order-1">
                            <Image
                                src="/DownloadApp/Hero.svg"
                                alt="Mobile Portfolio"
                                width={300}
                                height={600}
                                className="img-fluid  m-auto"
                                data-aos="fade-up"
                                data-aos-duration="2000"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    {/* <div className="text-center smart_heading_prodgy mb-5">
                        <h2 className="" data-aos="zoom-in"
                            data-aos-duration="500">Real-Time Portfolio Review</h2>
                        <p className="w-md-50" data-aos="zoom-in"
                            data-aos-duration="600">
Review your portfolio anytime, as many times as you want, completely free of cost. Get accurate, real-time insights so you’re always in control of your investments- and your future too!                        </p>
                    </div> */}
                    <h2>Why Prodigy Pro</h2>

                    <div className="portfolio_shadow_portionss">
                        <div className="row">
                            <div className="col-md-6 pt-md-5 pt-3 order-md-1 order-2">
                                <div className="px-md-5 px-3">
                                    <div className="w-md-75 w-100">
                                        <h4 className="text-dark">A clear view of your portfolio</h4>
                                        <div className="mb-0 text-dark client_review_prodgy12">
                                            Track your investments in real time with a clean, consolidated dashboard. No clutter. No confusion. Just a precise picture of where you stand.
                                        </div>
                                        <div className="social_yb">
                                            <Link
                                                href="https://app.prodigypro.co.in/"
                                                className="rounded-0 py-2 fw-bold"
                                                data-aos="fade-right"
                                            >
                                                Start Investing Now <i className="bi bi-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 bg_color_prodgy pt-5 position-relative order-md-2 order-1">
                                <Image
                                    src="/DownloadApp/ClearView.svg"
                                    alt="Mobile Portfolio"
                                    width={400}
                                    height={600}
                                    className="img-fluid  m-auto imasges-1-portfolio"
                                    data-aos="fade-up"
                                    data-aos-duration="2000"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="portfolio_shadow_portionss my-5">
                        <div className="row">
                            <div className="col-md-6 pt-md-5 pt-3 order-md-2 order-2">
                                <div className="px-md-5 px-3">
                                    <div className="w-md-75 w-100">
                                        <h4 className="text-dark">Invest with purpose, not guesswork</h4>
                                        <div className="mb-0 text-dark client_review_prodgy12">
                                            Define goals – retirement, education, wealth creation – and see how your investments align with them. Planning becomes practical, not theoretical.
                                        </div>

                                        <div className="social_yb">
                                            <Link
                                                href="https://app.prodigypro.co.in/"
                                                className="rounded-0 py-2 fw-bold"
                                                data-aos="fade-right"
                                            >
                                                Get Personalised Plan
                                                <i className="bi bi-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 bg_color_prodgy pt-5 position-relative order-md-1 order-1">
                                <Image
                                    src="/DownloadApp/InvestWithPurpose.svg"
                                    alt="Mobile Portfolio"
                                    width={350}
                                    height={600}
                                    className="img-fluid  m-auto imasges-1-portfolio"
                                    data-aos="fade-up"
                                    data-aos-duration="2000"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="portfolio_shadow_portionss">
                        <div className="row">
                            <div className="col-md-6 pt-md-5 pt-3 order-md-1 order-2">
                                <div className="px-md-5 px-3">
                                    <div className="w-md-75 w-100">
                                        <h4 className="text-dark">
                                            Recommendations that respect your profile
                                        </h4>
                                        <div className="mb-0 text-dark client_review_prodgy12">
                                            Every suggestion is aligned to your risk appetite and time horizon. No generic lists. No one-size-fits-all advice.
                                        </div>
                                        <div className="social_yb">
                                            <Link
                                                className="rounded-0 py-2 fw-bold"
                                                href="https://app.prodigypro.co.in/"
                                                data-aos="fade-right"
                                            >
                                                Start Investing<i className="bi bi-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 bg_color_prodgy pt-5 position-relative order-md-2 order-1">
                                <Image
                                    src="/DownloadApp/RecommendationsThatRespectYourProfile.svg"
                                    alt="Mobile Portfolio"
                                    width={350}
                                    height={600}
                                    className="img-fluid  m-auto imasges-1-portfolio"
                                    data-aos="fade-up"
                                    data-aos-duration="2000"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="portfolio_shadow_portionss my-5">
                        <div className="row">
                            <div className="col-md-6 pt-md-5 pt-3 order-md-2 order-2">
                                <div className="px-md-5 px-3">
                                    <div className="w-md-75 w-100">
                                        <h4 className="text-dark">Timely alerts and reviews that matter</h4>
                                        <div className="mb-0 text-dark client_review_prodgy12">
                                            Get early signals on underperforming schemes and portfolio deviations through regular portfolio reviews, so decisions are proactive, not reactive.
                                        </div>

                                        <div className="social_yb">
                                            <Link
                                                href="https://app.prodigypro.co.in/"
                                                className="rounded-0 py-2 fw-bold"
                                                data-aos="fade-right"
                                            >
                                                Review Now
                                                <i className="bi bi-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 bg_color_prodgy pt-5 position-relative order-md-1 order-1">
                                <Image
                                    src="/DownloadApp/TimelyAlerts.svg"
                                    alt="Mobile Portfolio"
                                    width={350}
                                    height={600}
                                    className="img-fluid  m-auto imasges-1-portfolio"
                                    data-aos="fade-up"
                                    data-aos-duration="2000"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="portfolio_shadow_portionss">
                        <div className="row">
                            <div className="col-md-6 pt-md-5 pt-3 order-md-1 order-2">
                                <div className="px-md-5 px-3">
                                    <div className="w-md-75 w-100">
                                        <h4 className="text-dark">One view for the entire family</h4>
                                        <div className="mb-0 text-dark client_review_prodgy12">
                                            Manage investments across family members from a single login, with complete transparency and control.
                                        </div>

                                        <div className="social_yb">
                                            <Link
                                                href="https://app.prodigypro.co.in/"
                                                className="rounded-0 py-2 fw-bold"
                                                data-aos="fade-right"
                                            >
                                                Start Investing Now <i className="bi bi-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 bg_color_prodgy pt-5 position-relative order-md-2 order-1">
                                <Image
                                    src="/DownloadApp/OneView.svg"
                                    alt="Mobile Portfolio"
                                    width={400}
                                    height={600}
                                    className="img-fluid  m-auto imasges-1-portfolio"
                                    data-aos="fade-up"
                                    data-aos-duration="2000"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="portfolio_shadow_portionss my-5">
                        <div className="row">
                            <div className="col-md-6 pt-md-5 pt-3 order-md-2 order-md-2 order-2">
                                <div className="px-md-5 px-3">
                                    <div className="w-md-75 w-100">
                                        <h4 className="text-dark">
                                            Stay informed on new opportunities
                                        </h4>
                                        <div className="mb-0 text-dark client_review_prodgy12">
                                            Track live NFOs and explore them with context, not pressure.
                                        </div>

                                        <div className="social_yb">
                                            <Link
                                                href="https://app.prodigypro.co.in/"
                                                className="rounded-0 py-2 fw-bold"
                                                data-aos="fade-right"
                                            >
                                                Start Investing Now
                                                <i className="bi bi-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 bg_color_prodgy pt-5 position-relative order-md-1 order-1">
                                <Image
                                    src="/DownloadApp/StayInformed.svg"
                                    alt="Mobile Portfolio"
                                    width={350}
                                    height={600}
                                    className="img-fluid  m-auto imasges-1-portfolio"
                                    data-aos="fade-up"
                                    data-aos-duration="2000"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="portfolio_shadow_portionss">
                        <div className="row">
                            <div className="col-md-6 pt-md-5 pt-3 order-md-1 order-2">
                                <div className="px-md-5 px-3">
                                    <div className="w-md-75 w-100">
                                        <h4 className="text-dark">Simple comparisons, better choices</h4>
                                        <div className="mb-0 text-dark client_review_prodgy12">
                                            Compare schemes objectively and understand what truly differentiates one option from another.
                                        </div>

                                        <div className="social_yb">
                                            <Link
                                                href="https://app.prodigypro.co.in/"
                                                className="rounded-0 py-2 fw-bold"
                                                data-aos="fade-right"
                                            >Start Investing Now
                                                <i className="bi bi-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 bg_color_prodgy pt-5 position-relative order-md-2 order-1">
                                <Image
                                    src="/DownloadApp/SimpleComparisons.svg"
                                    alt="Mobile Portfolio"
                                    width={400}
                                    height={600}
                                    className="img-fluid  m-auto imasges-1-portfolio"
                                    data-aos="fade-up"
                                    data-aos-duration="2000"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="portfolio_shadow_portionss my-5">
                        <div className="row">
                            <div className="col-md-6 pt-md-5 pt-3 order-md-2 order-2">
                                <div className="px-md-5 px-3">
                                    <div className="w-md-75 w-100">
                                        <h4 className="text-dark">Start small. Stay consistent.</h4>
                                        <div className="mb-0 text-dark client_review_prodgy12">
                                            Begin SIPs with as little as ₹100 and build discipline without strain.
                                        </div>

                                        <div className="social_yb">
                                            <Link
                                                href="https://app.prodigypro.co.in/"
                                                className="rounded-0 py-2 fw-bold"
                                                data-aos="fade-right"
                                            >
                                                Start Investing Now
                                                <i className="bi bi-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 bg_color_prodgy pt-5 position-relative order-md-1 order-1">
                                <Image
                                    src="/DownloadApp/StartSmall.svg"
                                    alt="Mobile Portfolio"
                                    width={350}
                                    height={600}
                                    className="img-fluid  m-auto imasges-1-portfolio"
                                    data-aos="fade-up"
                                    data-aos-duration="2000"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="portfolio_shadow_portionss">
                        <div className="row">
                            <div className="col-md-6 pt-md-5 pt-3 order-md-1 order-2">
                                <div className="px-md-5 px-3">
                                    <div className="w-md-75 w-100">
                                        <h4 className="text-dark">Planning tools that work in the real world</h4>
                                        <div className="mb-0 text-dark client_review_prodgy12">
                                            Use intuitive calculators to estimate future needs and track progress with realism, not optimism.
                                        </div>

                                        <div className="social_yb">
                                            <Link
                                                href="https://app.prodigypro.co.in/"
                                                className="rounded-0 py-2 fw-bold"
                                                data-aos="fade-right"
                                            >
                                                Start Investing Now <i className="bi bi-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 bg_color_prodgy pt-5 position-relative order-md-2 order-1">
                                <Image
                                    src="/DownloadApp/PlanningToolsThatWork.svg"
                                    alt="Mobile Portfolio"
                                    width={400}
                                    height={600}
                                    className="img-fluid  m-auto imasges-1-portfolio"
                                    data-aos="fade-up"
                                    data-aos-duration="2000"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="portfolio_shadow_portionss my-5">
                        <div className="row">
                            <div className="col-md-6 pt-md-5 pt-3 order-md-2 order-2">
                                <div className="px-md-5 px-3">
                                    <div className="w-md-75 w-100">
                                        <h4 className="text-dark">Secure, seamless execution</h4>
                                        <div className="mb-0 text-dark client_review_prodgy12">
                                            Digital onboarding, smooth transactions, and bank-grade security – designed to stay out of your way.
                                        </div>

                                        <div className="social_yb">
                                            <Link
                                                href="https://app.prodigypro.co.in/"
                                                className="rounded-0 py-2 fw-bold"
                                                data-aos="fade-right"
                                            >
                                                Start Investing Now
                                                <i className="bi bi-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 bg_color_prodgy pt-5 position-relative order-md-1 order-1">
                                <Image
                                    src="/DownloadApp/SecureSeamless.svg"
                                    alt="Mobile Portfolio"
                                    width={350}
                                    height={600}
                                    className="img-fluid  m-auto imasges-1-portfolio"
                                    data-aos="fade-up"
                                    data-aos-duration="2000"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container pt-md-3">
                    <div className="home_smart_heading" data-aos="zoom-in">
                        <h2 className="">
                            Backed by discipline. Guided by regulation.
                        </h2>
                        <p>Prodigy Pro is offered through BFC Capital, a SEBI Registered Investment Advisor (RIA). <br />Advice is structured, documented, and aligned with your long-term interest – not product commissions.</p>
                    </div>
                </div>
            </section>
        </>
    )
}