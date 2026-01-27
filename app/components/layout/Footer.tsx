import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 md:py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">

                    {/* Column 1: Brand */}
                    <div>
                        <div className="text-2xl font-bold bg-white text-bfc-blue inline-block px-2 py-1 mb-4 rounded">BFC CAPITAL</div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Crafting Wealth, Curating Portfolios. We help you make informed financial decisions with our expert advice and technology-driven solutions.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/financial-planning" className="hover:text-white transition-colors">Financial Planning</Link></li>
                            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Calculators */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Calculators</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link href="/sip-calculator" className="hover:text-white transition-colors">SIP Calculator</Link></li>
                            <li><Link href="/lumpsum-calculator" className="hover:text-white transition-colors">Lumpsum Calculator</Link></li>
                            <li><Link href="/retirement-calculator" className="hover:text-white transition-colors">Retirement Calculator</Link></li>
                            <li><Link href="/tax-calculator" className="hover:text-white transition-colors">Tax Calculator</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Reach Us */}
                    <div>
                        <h4 className="text-lg font-bold mb-4">Reach Us</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <span>📍</span>
                                <span>CP-61, Viraj Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span>📞</span>
                                <span>+91-522-4026913</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span>✉️</span>
                                <span>contact@bfccapital.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} BFC Capital Pvt Ltd. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
