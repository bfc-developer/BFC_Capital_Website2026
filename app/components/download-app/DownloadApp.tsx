import Link from "next/link";
import Image from "next/image";


export default function DownloadApp() {
    return (
        <>

            <section className="py-4 md:py-12 pb-3  shadow-sm overflow-hidden bg-[linear-gradient(to_right,#FAFAFA_45%,#CFE4F3_100%)]">
                <div className="container mx-auto px-5 md:px-10 lg:px-20">
                    <div className="flex md:gap-10 flex-col md:flex-row justify-center md:justify-between items-center md:px-3">
                        <div className="py-2 order-2 md:order-1">
                            <div
                                className="text-center md:text-left home_smart_heading"
                                data-aos="fade-right"
                            >
                                <h2 className="md:text-left leading-tight font-bold text-[#44475B] text-[20px] md:text-3xl lg:text-5xl">
                                    Prodigy Pro – Thoughtful investing, Built for clarity.
                                </h2>

                                <p className="mx-auto mt-4 md:mt-8 mb-4 max-w-6xl text-[15px] md:text-[17px] text-[#44475B] leading-relaxed font-inter opacity-90">
                                    Investing works best when it is calm, structured, and informed.
                                    Prodigy Pro brings that philosophy to your fingertips.
                                </p>

                                <p className="mx-auto mb-4 max-w-6xl text-[15px] md:text-[17px] text-[#44475B] leading-relaxed font-inter opacity-90">
                                    Built for investors who value process over noise.
                                </p>
                            </div>

                            <div className="flex gap-3 justify-center md:justify-start">
                                <Link
                                    href="https://play.google.com/store/apps/details?id=com.bfc_mf.prodigy_app"
                                    target="_blank"
                                    data-aos="fade-up"
                                >
                                    <Image
                                        src="/DownloadApp/PlayStoreBlack.svg"
                                        alt="Google Play"
                                        width={150}
                                        height={45}
                                    />
                                </Link>

                                <Link
                                    href="https://apps.apple.com/in/app/prodigy-pro-mutual-funds-sip/id1575700744"
                                    target="_blank"
                                    data-aos="fade-up"
                                >
                                    <Image
                                        src="/DownloadApp/AppStoreBlack.svg"
                                        alt="App Store"
                                        width={150}
                                        height={45}
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="text-center py-2 order-1 md:order-2">
                            <Image
                                src="/DownloadApp/Hero.svg"
                                alt="Mobile Portfolio"
                                width={300}
                                height={600}
                                className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] mx-auto "
                                data-aos="fade-up"
                                data-aos-duration="2000"
                            />
                        </div>

                    </div>
                </div>
            </section>

            <section className="py-10 md:py-15">
                <div className="container mx-auto px-5 md:px-10 lg:px-20">

                    <div className="text-center py-2 md:py-5">
                        <h2 className="leading-tight font-bold text-[#44475B] text-[20px] md:text-3xl lg:text-5xl">Why Prodigy Pro</h2>
                    </div>

                    <div className="bg-white flex flex-wrap my-5 md:my-10 gap-5 md:gap-0 justify-center align-center items-center shadow-sm rounded-[20px] overflow-hidden">

                        <div className="w-full md:w-6/12 pt-3 md:pt-12 order-2 md:order-1">
                            <div className="p-3 md:px-12 text-center md:text-left">

                                <div className="w-full md:w-3/4">

                                    <h3 className="text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px] leading-tight">
                                        A clear view of your portfolio
                                    </h3>

                                    <p className="mx-auto mt-2 md:mt-6 mb-4 max-w-6xl text-[15px] md:text-[17px] text-[#44475B] leading-relaxed font-inter opacity-90">
                                        Track your investments in real time with a clean dashboard.
                                    </p>

                                    <div className="bg-[#F7F7F7] w-fit mt-4">
                                        <Link
                                            href="https://app.prodigypro.co.in/"
                                            className="inline-flex items-center text-[15px] md:text-[17px] gap-2 text-blue-600 font-medium px-5 py-2 rounded-sm bg-[#F7F7F7] hover:shadow-md transition duration-300 bg-[linear-gradient(to_right,#04B488_42%,#011EFE_85%)] bg-clip-text text-transparent"
                                            data-aos="fade-right"
                                        >
                                            Start Investing Now
                                            <span className="text-lg">→</span>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-6/12 bg-[#CFE4F3] pt-5 md:pt-12 relative order-1 md:order-2 text-center">

                            <Image
                                src="/DownloadApp/ClearView.svg"
                                alt="Mobile Portfolio"
                                width={400}
                                height={600}
                                className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] mx-auto"
                                data-aos="fade-up"
                                data-aos-duration="2000"
                            />

                        </div>

                    </div>

                    <div className="bg-white flex flex-wrap my-5 md:my-10 gap-5 md:gap-0 justify-center align-center items-center shadow-sm rounded-[20px] overflow-hidden">

                        <div className="w-full md:w-6/12 bg-[#CFE4F3] pt-5 md:pt-12 relative text-center">
                            <Image
                                src="/DownloadApp/ClearView.svg"
                                alt="Mobile Portfolio"
                                width={400}
                                height={600}
                                className="w-[250px] h-[250px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px] mx-auto"
                                data-aos="fade-up"
                                data-aos-duration="2000"
                            />
                        </div>

                        <div className="w-full md:w-6/12 pt-3 md:pt-12">
                            <div className="p-3 md:px-12 text-center md:text-left">

                                <div className="w-full md:w-3/4">

                                    <h3 className="text-[15px] md:text-[24px] font-bold text-[#44475B] mb-[10px] md:mb-[20px] leading-tight">
                                        A clear view of your portfolio
                                    </h3>

                                    <p className="mx-auto mt-2 md:mt-6 mb-4 max-w-6xl text-[15px] md:text-[17px] text-[#44475B] leading-relaxed font-inter opacity-90">
                                        Track your investments in real time with a clean dashboard.
                                    </p>

                                    <div className="bg-[#F7F7F7] w-fit mt-4">
                                        <Link
                                            href="https://app.prodigypro.co.in/"
                                            className="inline-flex items-center text-[15px] md:text-[17px] gap-2 text-blue-600 font-medium px-5 py-2 rounded-sm bg-[#F7F7F7] hover:shadow-md transition duration-300 bg-[linear-gradient(to_right,#04B488_42%,#011EFE_85%)] bg-clip-text text-transparent"
                                            data-aos="fade-right"
                                        >
                                            Start Investing Now
                                            <span className="text-lg">→</span>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </section>

            <section className="pb-5 md:pb-12">
                <div className="container mx-auto px-5 md:px-10 lg:px-20">

                    <div className="text-center md:text-left">

                        <h2 className="leading-tight font-bold text-[#44475B] text-[20px] md:text-3xl lg:text-5xl">
                            Backed by discipline. Guided by regulation.
                        </h2>

                        <p className="mx-auto mt-4 md:mt-8 mb-4 max-w-6xl text-[15px] md:text-[17px] text-[#44475B] leading-relaxed font-inter opacity-90">
                            Prodigy Pro is offered through BFC Capital, a SEBI Registered
                            Investment Advisor (RIA). <br />
                            Advice is structured, documented, and aligned with your long-term interest.
                        </p>

                    </div>

                </div>
            </section>


        </>
    )
}