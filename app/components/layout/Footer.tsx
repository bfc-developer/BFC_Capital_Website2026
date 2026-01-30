import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer
            className="text-[#334155] py-20 px-4"
            style={{ background: 'linear-gradient(0deg, #CFE4F3 0%, #FAFAFA 68.29%)' }}
        >
            <div className="container mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 mb-16">

                    {/* Column 1: Compliance & Info */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 mb-2">
                            <Image src="/Logo/CAPLOGO.svg" alt="Logo" width={100} height={100} />
                        </div>

                        <div className="space-y-4 text-[13px] leading-tight">
                            <div className="space-y-1">
                                <p className="font-bold uppercase">BFC CAPITAL PRIVATE LIMITED</p>
                                <p>SEBI-Registered Investment Adviser: INA000021669</p>
                                <p>Type of Registration: Non-Individual.</p>
                                <p>Valid till cancellation by SEBI.</p>
                                <p>AMFI Registration No. ARN-21399</p>
                            </div>

                            <div className="space-y-0.5">
                                <p className="">Grievance Cell</p>
                                <a href="https://scores.sebi.gov.in" className="hover:text-bfc-blue transition-colors break-all">https://scores.sebi.gov.in</a>
                            </div>

                            <div className="space-y-1">
                                <p className="font-bold">Principal Officer</p>
                                <p>Akash Gupta, Phone: +91 6307937533</p>
                                <p>akashgupta@bfccapital.com</p>
                            </div>

                            <div className="space-y-1">
                                <p className="font-bold">Compliance Officer:</p>
                                <p>Sunil Gupta, Phone: +91 89600 06601</p>
                                <p>sunilgupta@bfccapital.com</p>
                            </div>

                            <div className="space-y-1">
                                <p className="font-bold">Corresponding SEBI Address:</p>
                                <p>SEBI Northern Regional Office (Delhi):</p>
                                <p>NBCC Complex, Office Tower-1,</p>
                                <p>8th Floor, Plate B,</p>
                                <p>East Kidwai Nagar,</p>
                                <p>New Delhi - 110023.</p>
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Company Info & Social */}
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <h4 className="text-base font-bold text-[#475569]">Company Info</h4>
                            <div className="space-y-4 text-[13px] leading-tight">
                                <p>C.P.-61, Viraj Khand-4, Gomti Nagar, Lucknow,<br />Uttar Pradesh 226010</p>
                                <div className="space-y-1">
                                    <p><span className="font-bold">Hours:</span> Mon - Sat :- 09:30 am - 6:30 pm</p>
                                    <p>(Second & Fourth Saturday Closed)</p>
                                </div>
                                <div className="space-y-1">
                                    <p><span className="font-bold">Call:</span> +91-522-3514141</p>
                                    <p><span className="font-bold">E-mail:</span> customersupport@bfccapital.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="cursor-pointer hover:scale-110 transition-transform">
                                <Image src="/SocialMedia/insta.svg" alt="Instagram" width={36} height={36} />
                            </div>
                            <div className="cursor-pointer hover:scale-110 transition-transform">
                                <Image src="/SocialMedia/twitter.svg" alt="Twitter" width={36} height={36} />
                            </div>
                            <div className="cursor-pointer hover:scale-110 transition-transform">
                                <Image src="/SocialMedia/fb.svg" alt="Facebook" width={36} height={36} />
                            </div>
                            <div className="cursor-pointer hover:scale-110 transition-transform">
                                <Image src="/SocialMedia/YT.svg" alt="YouTube" width={36} height={36} />
                            </div>
                            <div className="cursor-pointer hover:scale-110 transition-transform">
                                <Image src="/SocialMedia/whatsapp.svg" alt="WhatsApp" width={36} height={36} />
                            </div>
                        </div>
                    </div>

                    {/* Column 3: Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-base font-bold text-[#475569]">Quick Links</h4>
                        <ul className="space-y-3 text-[13px]">
                            <li><Link href="#" className="hover:text-bfc-blue transition-colors">Best Mutual Funds to Invest in 2026</Link></li>
                            <li><Link href="#" className="hover:text-bfc-blue transition-colors">Best ELSS Funds</Link></li>
                            <li><Link href="#" className="hover:text-bfc-blue transition-colors">Best SIP Plans to Invest</Link></li>
                            <li><Link href="#" className="hover:text-bfc-blue transition-colors">Best Tax Saving Mutual Funds</Link></li>
                            <li><Link href="#" className="hover:text-bfc-blue transition-colors">Best Mutual Fund for Lumpsum Investment</Link></li>
                        </ul>
                    </div>

                </div>

                <div className="space-y-8">
                    <div className="space-y-2">
                        <p className="text-[14px] font-extrabold uppercase tracking-wide">DISCLAIMER</p>
                        <p className="text-[13px] text-gray-500 leading-tight">
                            "Investment in securities market are subject to market risks. Read all the related documents carefully before investing."
                        </p>
                    </div>

                    <div className="pt-8 border-t border-[#ABC3D7] border-opacity-[0.37] flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] font-medium text-gray-600">
                        <p>© 2026, BFC Capital. All Rights Reserved.</p>
                        <div className="flex items-center gap-8">
                            <Link href="#" className="hover:text-bfc-blue transition-colors">Privacy Policy</Link>
                            <Link href="#" className="hover:text-bfc-blue transition-colors">Terms and Conditions</Link>
                            <Link href="#" className="hover:text-bfc-blue transition-colors">Legal Disclaimer</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
