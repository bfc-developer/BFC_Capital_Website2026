import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer
            className="text-[#334155] pt-40 pb-20 px-4"
            style={{ background: 'linear-gradient( #FAFAFA , #CFE4F3)' }}
        >
            <div className="container mx-auto md:px-5">
                <div className="mb-4 flex justify-start pb-4">
                    <Image src="/Logo/CAPLOGO.svg" alt="BFC Capital Logo" width={100} height={100}
                        className='w-[70%] md:w-[50%] h-[50%] md:h-[45px] object-contain object-left' />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-8">

                    {/* Column 1: Compliance & Info */}
                    <div className="space-y-6">

                        <div className="space-y-4 text-[13px] leading-tight">
                            <div className="space-y-1 ">
                                <h3 className="font-bold uppercase text-[#44475B] text-[19px]">BFC CAPITAL PRIVATE LIMITED</h3>
                                <div className="text-[14px] md:text-[17px] leading-relaxed lg:leading-6">
                                    <p>SEBI-Registered Investment Adviser: INA000021669</p>
                                    <p>BSE Enlistment <abbr title="Number">No.</abbr>: 2414</p>
                                    <p>CIN of the IA: U67120UP2004PTC028628</p>
                                    <p>Type of Registration: Non-Individual.</p>
                                    <p>Valid till cancellation by SEBI.</p>
                                    <p>AMFI Registration <abbr title="Number">No.</abbr> ARN-21399</p>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h2 className="font-bold text-[#44475B] text-[17px]">Principal Officer:</h2>
                                <div className="text-[14px] md:text-[17px] leading-relaxed lg:leading-6">
                                    <p>Akash Gupta, <a href="tel:+916307937533" className="hover:text-[#001EFE]">Phone: +91 6307937533</a></p>
                                    <p><a href="mailto:akashgupta@bfccapital.com" className="hover:text-[#001EFE]">akashgupta@bfccapital.com</a></p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h2 className="font-bold text-[#44475B] text-[17px]">Compliance Officer:</h2>
                                <div className="text-[14px] md:text-[17px] leading-relaxed lg:leading-6">
                                    <p>Sunil Gupta</p>
                                    <p><a href="mailto:sunilgupta@bfccapital.com" className="hover:text-[#001EFE]">sunilgupta@bfccapital.com</a></p>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h2 className="font-bold text-[#44475B] text-[17px]">Grievance Cell</h2>
                                <div className="text-[14px] md:text-[17px] leading-relaxed lg:leading-6">
                                    <p className="pb-4">SEBI SCORES:<a href="https://scores.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#001EFE] underline">https://scores.sebi.gov.in</a></p>
                                    <p>SMART ODR :<a href="https://smartodr.in/login" target="_blank" rel="noopener noreferrer" className="hover:text-[#001EFE] underline">https://smartodr.in/login</a></p>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h2 className="font-bold text-[#44475B] text-[17px]">Corresponding SEBI Address:</h2>
                                <div className="text-[14px] md:text-[17px] leading-relaxed lg:leading-6">
                                    <p>SEBI Northern Regional Office (Delhi): NBCC</p>
                                    <p>Complex, Office Tower–1, 8th Floor, Plate B,</p>
                                    <p>East Kidwai Nagar, New Delhi – 110023.</p>
                                </div>
                            </div>
                            {/* <div className="space-y-1">
                                <h2 className="font-bold text-[#44475B] text-[17px]">

                                    SEBI Investor Website:{" "}
                                    <a
                                        href="https://investor.sebi.gov.in/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline hover:text-[#001EFE] underline font-normal whitespace-nowrap"
                                    >
                                        https://investor.sebi.gov.in
                                    </a>
                                </h2>
                            </div> */}
                        </div>
                    </div>

                    {/* Column 2: Company Info & Social */}
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <h3 className="text-[20px] font-bold text-[#475569]">Company Info</h3>
                            <div className="space-y-4 text-[14px] md:text-[17px] leading-relaxed lg:leading-6">
                                <p>C.P.-61, Viraj Khand-4, Gomti Nagar, Lucknow,<br />Uttar Pradesh 226010</p>
                                <div className="space-y-1">
                                    <p><span className="font-bold">Hours:</span> Mon - Sat :- 09:30 am - 6:30 pm</p>
                                    <p>(Second & Fourth Saturday Closed)</p>
                                </div>
                                <div className="space-y-1">
                                    <p><span className="font-bold">Call:</span> +91-522-3514141</p>
                                    <p><span className="font-bold">E-mail:</span> <a href="mailto:customersupport@bfccapital.com" className="hover:text-[#001EFE]">customersupport@bfccapital.com</a></p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="cursor-pointer hover:scale-110 transition-transform">
                                <Link href=" https://www.instagram.com/bfccapitalpvtltd/?hl=en" target="_blank" rel="noopener noreferrer">
                                    <Image src="/SocialMedia/insta.svg" alt="Instagram" width={36} height={36} className='' />
                                </Link>
                            </div>
                            <div className="cursor-pointer hover:scale-110 transition-transform">
                                <Link href="https://x.com/BFCCapital" target="_blank" rel="noopener noreferrer">
                                    <Image src="/SocialMedia/twitter.svg" alt="Twitter" width={36} height={36} />
                                </Link>
                            </div>
                            <div className="cursor-pointer hover:scale-110 transition-transform">
                                <Link href="https://www.facebook.com/bfccapital" target="_blank" rel="noopener noreferrer">
                                    <Image src="/SocialMedia/fb.svg" alt="Facebook" width={36} height={36} />
                                </Link>
                            </div>
                            <div className="cursor-pointer hover:scale-110 transition-transform">
                                <Link href="https://www.youtube.com/@bfccapitalpvtltd" target="_blank" rel="noopener noreferrer">
                                    <Image src="/SocialMedia/YT.svg" alt="YouTube" width={36} height={36} />
                                </Link>
                            </div>
                            <div className="cursor-pointer hover:scale-110 transition-transform">
                                <Link href="https://api.whatsapp.com/send/?phone=%2B917347700888&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
                                    <Image src="/SocialMedia/whatsapp.svg" alt="WhatsApp" width={36} height={36} />
                                </Link>
                            </div>
                            <div className="cursor-pointer hover:scale-110 transition-transform">
                                <Link href=" https://www.linkedin.com/company/bfccapitalpvtltd/" target="_blank" rel="noopener noreferrer">
                                    <Image src="/SocialMedia/LinkedIn.svg" alt="LinkedIn" width={36} height={36} />
                                </Link>
                            </div>
                            <div className="cursor-pointer hover:scale-110 transition-transform">
                                <Link href="https://www.threads.com/@bfccapitalpvtltd" target="_blank" rel="noopener noreferrer">
                                    <Image src="/SocialMedia/Threads.svg" alt="Threads" width={36} height={36} />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div className="space-y-6">
                        <h3 className="text-[20px] font-bold text-[#475569]">Quick Links</h3>
                        <ul className="space-y-1 text-[14px] md:text-[17px] leading-relaxed lg:leading-6">
                            <li><Link href="/all-mutual-funds" className="hover:text-bfc-blue transition-colors">Mutual Funds</Link></li>
                            <li><Link href="/sif" className="hover:text-bfc-blue transition-colors">SIF</Link></li>
                            <li><Link href="/financial-planning" className="hover:text-bfc-blue transition-colors">Financial Planning</Link></li>
                            <li><Link href="/calculators" className="hover:text-bfc-blue transition-colors">Financial Calculators</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="space-y-8 mb-4">
                    <div className="space-y-2">
                        <p className="text-[17px] font-extrabold uppercase tracking-wide mb-0">Standard warning</p>
                        <p className="text-[14px] md:text-[17px] leading-relaxed lg:leading-6 text-[#44475B]">
                            “Investment in securities market are subject to market risks. Read all the related documents carefully before investing.”
                        </p>
                    </div>

                </div>

                <div className="space-y-8">

                    <div className="space-y-2">
                        <p className="text-[17px] font-extrabold uppercase tracking-wide mb-0">DISCLAIMER</p>
                        <p className="text-[14px] md:text-[17px] leading-relaxed lg:leading-6 text-[#44475B]">
                            “Registration granted by SEBI, membership of BSE and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors”
                        </p>
                    </div>

                    <div className="pt-8 border-t border-[#ABC3D7] border-opacity-[0.37] flex flex-col md:flex-row justify-between items-center gap-4 text-[14px] md:text-[17px] leading-relaxed lg:leading-6 text-gray-600">
                        <p>© 2026, BFC Capital. All Rights Reserved.</p>
                        <div className="flex items-center gap-8 text-[14px] md:text-[17px] leading-relaxed lg:leading-6">
                            <Link href="/privacy-policy" className="hover:text-[#001EFE] transition-colors">Privacy Policy</Link>
                            <Link href="/terms&conditions" className="hover:text-[#001EFE] transition-colors">Terms and Conditions</Link>
                            <Link href="/legal-disclaimer" className="hover:text-[#001EFE] transition-colors">Legal Disclaimer</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;