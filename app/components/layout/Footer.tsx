import Link from 'next/link';
import { Instagram, Twitter, Facebook, Youtube, MessageCircle } from 'lucide-react';

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
                            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                                <div className="w-5 h-5 rounded-full border-2 border-[#E11D48] flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-[#E11D48]"></div>
                                </div>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-[#E11D48]">BFC CAPITAL</span>
                        </div>

                        <div className="space-y-4 text-[13px] leading-relaxed">
                            <div className="space-y-1">
                                <p className="font-extrabold uppercase">BFC CAPITAL PRIVATE LIMITED</p>
                                <p>SEBI-Registered Investment Adviser: INA000021669</p>
                                <p>Type of Registration: Non-Individual.</p>
                                <p>Valid till cancellation by SEBI.</p>
                                <p>AMFI Registration No. ARN-21399</p>
                            </div>

                            <div className="space-y-0.5">
                                <p className="font-bold">Grievance Cell</p>
                                <a href="https://scores.sebi.gov.in" className="hover:text-bfc-blue transition-colors underline break-all">https://scores.sebi.gov.in</a>
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
                            <div className="space-y-4 text-[13px] leading-relaxed">
                                <p>C.P.-61, Viraj Khand-4, Gomti Nagar, Lucknow,<br />Uttar Pradesh 226010</p>
                                <div className="space-y-1">
                                    <p><span className="font-bold">Hours:</span> Mon - Sat :- 09:30 am - 6:30 pm</p>
                                    <p className="text-gray-500 italic">(Second & Fourth Saturday Closed)</p>
                                </div>
                                <div className="space-y-1">
                                    <p><span className="font-bold">Call:</span> +91-522-3514141</p>
                                    <p><span className="font-bold">E-mail:</span> customersupport@bfccapital.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-full bg-[#00A389] flex items-center justify-center text-white cursor-pointer hover:bg-opacity-80 transition-all">
                                <Instagram size={18} />
                            </div>
                            <div className="w-9 h-9 rounded-full bg-[#1DA1F2] bg-white border border-gray-100 shadow-sm flex items-center justify-center text-[#1DA1F2] cursor-pointer hover:shadow-md transition-all">
                                <Twitter size={18} />
                            </div>
                            <div className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center text-white cursor-pointer hover:bg-opacity-80 transition-all">
                                <Facebook size={18} />
                            </div>
                            <div className="w-9 h-9 rounded-full bg-[#FF0000] flex items-center justify-center text-white cursor-pointer hover:bg-opacity-80 transition-all">
                                <Youtube size={18} />
                            </div>
                            <div className="w-9 h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white cursor-pointer hover:bg-opacity-80 transition-all">
                                <MessageCircle size={18} />
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
                        <p className="text-[13px] text-gray-500 leading-relaxed italic">
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
