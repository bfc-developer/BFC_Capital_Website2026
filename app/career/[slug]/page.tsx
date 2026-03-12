import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ApplyJobForm from "../../components/Career/ApplyJobForm";
import { notFound } from "next/navigation";

export function generateStaticParams() {
    return [
        { slug: "wealth-manager" },
        { slug: "relationship-manager" },
        { slug: "virtual-relationship-manager" },
        { slug: "business-development-manager" },
    ];
}

export default async function JobDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const renderJobDetails = () => {
        switch (slug) {
            case "wealth-manager":
                return (
                    <>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#44475B] mb-8">
                            Position:- Wealth Manager
                        </h1>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#44475B] mb-4">Preface :</h3>
                            <p className="text-[#7A7A7A] leading-relaxed">
                                The WM will be required to move into the market and promote services of the company, brief people about the utility of our services and handle operational and technical issues of our existing clientele.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#44475B] mb-4">Skills Required :</h3>
                            <ul className="text-[#7A7A7A] space-y-2 list-disc pl-5 marker:text-gray-400">
                                <li>Convincing Skills | Analytical Skills | Inter-Personal Skills</li>
                                <li>Interest towards Sales & Field Activities</li>
                                <li>Self Motivated | Extrovert | Confident</li>
                                <li>Inclination towards Finance</li>
                            </ul>
                        </div>

                        <div className="mb-8 space-y-2 text-[#44475B]">
                            <p><span className="font-bold">Job Location :</span> <span className="text-[#7A7A7A]">Lucknow, Uttar Pradesh</span></p>
                            <p><span className="font-bold">Address :</span> <span className="text-[#7A7A7A]">CP-61 Viraj Khand, Gomti Nagar, Lucknow (UP)-226010</span></p>
                            <p><span className="font-bold">Vacancy Type :</span> <span className="text-[#7A7A7A]">Full Time</span></p>
                            <p><span className="font-bold">Package :</span> <span className="text-[#7A7A7A]">Rs. 5 L to 9 L per annum</span></p>
                            <p><span className="font-bold">Experience :</span> <span className="text-[#7A7A7A]">Min Exp – 1 year +</span></p>
                            <p><span className="font-bold">Qualification :</span> <span className="text-[#7A7A7A]">MBA in Marketing / Finance</span></p>
                        </div>

                        <div className="mb-12">
                            <p className="text-[#44475B] text-lg mb-2">
                                You can send in your resume to <a href="mailto:hrd@bfccapital.com" className="text-[#011EFE]">hrd@bfccapital.com</a>
                            </p>
                            <Link href="#" className="text-[#011EFE] text-lg hover:underline block">
                                Click here to view detailed JD
                            </Link>
                        </div>

                        <ApplyJobForm defaultPost="Wealth Manager" />
                    </>
                );

            case "relationship-manager":
                return (
                    <>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#44475B] mb-8">
                            Position:- Relationship Manager
                        </h1>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#44475B] mb-4">Preface :</h3>
                            <p className="text-[#7A7A7A] leading-relaxed">
                                The RM will be required to move into the market and promote services of the company, brief people about the utility of our services and handle operational and technical issues of our existing clientele.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#44475B] mb-4">Skills Required :</h3>
                            <ul className="text-[#7A7A7A] space-y-2 list-disc pl-5 marker:text-gray-400">
                                <li>Convincing Skills | Analytical Skills | Inter-Personal Skills</li>
                                <li>Interest towards Sales & Field Activities</li>
                                <li>Self Motivated | Extrovert | Confident</li>
                                <li>Inclination towards Finance</li>
                            </ul>
                        </div>

                        <div className="mb-8 space-y-2 text-[#44475B]">
                            <p><span className="font-bold">Job Location :</span> <span className="text-[#7A7A7A]">Lucknow, Uttar Pradesh</span></p>
                            <p><span className="font-bold">Address :</span> <span className="text-[#7A7A7A]">CP-61 Viraj Khand, Gomti Nagar, Lucknow (UP)-226010</span></p>
                            <p><span className="font-bold">Vacancy Type :</span> <span className="text-[#7A7A7A]">Full Time</span></p>
                            <p><span className="font-bold">Package :</span> <span className="text-[#7A7A7A]">Rs. 2 L to 3.5 L per annum</span></p>
                            <p><span className="font-bold">Experience :</span> <span className="text-[#7A7A7A]">Min Exp – 1 year +</span></p>
                            <p><span className="font-bold">Qualification :</span> <span className="text-[#7A7A7A]">Graduate / MBA in Marketing / Finance</span></p>
                        </div>

                        <div className="mb-12">
                            <p className="text-[#44475B] text-lg mb-2">
                                You can send in your resume to <a href="mailto:hrd@bfccapital.com" className="text-[#011EFE]">hrd@bfccapital.com</a>
                            </p>
                            <Link href="#" className="text-[#011EFE] text-lg hover:underline block">
                                Click here to view detailed JD
                            </Link>
                        </div>

                        <ApplyJobForm defaultPost="Relationship Manager" />
                    </>
                );

            case "virtual-relationship-manager":
                return (
                    <>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#44475B] mb-2">
                            Position:- Virtual Relationship Manager
                        </h1>
                        <p className="text-[#7A7A7A] text-sm mb-8">Note: Female Candidates Only</p>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#44475B] mb-4">Preface :</h3>
                            <p className="text-[#7A7A7A] leading-relaxed">
                                The VRM will be required to attend Leads assigned to her on Call and promote services of the company, brief Clients about the Benefits of associating with us and handle operational and technical issues of Acquired Clients
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#44475B] mb-4">Skills Required :</h3>
                            <ul className="text-[#7A7A7A] space-y-2 list-disc pl-5 marker:text-gray-400">
                                <li>Convincing Skills | Analytical Skills | Inter-Personal Skills</li>
                                <li>Interest towards Sales</li>
                                <li>Inclination towards Finance</li>
                                <li>Ability to make 60-80 Telephonic Calls per Day</li>
                            </ul>
                        </div>

                        <div className="mb-8 space-y-2 text-[#44475B]">
                            <p><span className="font-bold">Job Location :</span> <span className="text-[#7A7A7A]">Hybrid Model : Work from Office + Home</span></p>
                            <p><span className="font-bold">Address :</span> <span className="text-[#7A7A7A]">CP-61 Viraj Khand, Gomti Nagar, Lucknow (UP)-226010</span></p>
                            <p><span className="font-bold">Vacancy Type :</span> <span className="text-[#7A7A7A]">Full Time</span></p>
                            <p><span className="font-bold">Package :</span> <span className="text-[#7A7A7A]">Rs. 1.5 L to 2.5 L per annum + Incentive</span></p>
                            <p><span className="font-bold">Experience :</span> <span className="text-[#7A7A7A]">1 year</span></p>
                            <p><span className="font-bold">Qualification :</span> <span className="text-[#7A7A7A]">Graduation</span></p>
                        </div>

                        <div className="mb-12">
                            <p className="text-[#44475B] text-lg mb-2">
                                You can send in your resume to <a href="mailto:hrd@bfccapital.com" className="text-[#011EFE]">hrd@bfccapital.com</a>
                            </p>
                            <Link href="#" className="text-[#011EFE] text-lg hover:underline block">
                                Click here to view detailed JD
                            </Link>
                        </div>

                        <ApplyJobForm defaultPost="Virtual Relationship Manager" />
                    </>
                );

            case "business-development-manager":
                return (
                    <>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#44475B] mb-8">
                            Position:- Business Development Manager (BDM)
                        </h1>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#44475B] mb-4">Who Are We?</h3>
                            <p className="text-[#7A7A7A] leading-relaxed mb-4">
                                Group BFC made its foray as a corporate entity primarily into two domains, BFC Capital and BFC Publications, almost a decade ago. Over the given period, the group’s publishing venture, BFC Publications has grown exponentially, morphing into a brand. It currently boasts a leading position in the country’s literary scene. This success in turn, has allowed BFC Group, its parent company to rapidly expand its operations. The group’s ever expanding and dynamic team has consistently played a key role in all this success. This point forth, BFC Group is primarily looking into pan-India expansion and broadcasting.
                            </p>
                            <h3 className="text-xl font-bold text-[#44475B] mb-4">BFC Capital</h3>
                            <p className="text-[#7A7A7A] leading-relaxed">
                                BFC Capital is a premier Wealth Management company that has been creating its own niche in the space for a good sixteen years, serving and handholding corporate and retail clients in their wealth-building efforts.
                                <br /><br />
                                We are the pioneers of Mutual Funds distribution in the country, with a core team of promising Retail/Corporate Investment Planners for Wealth planning and Financial Planning. We, as of now, are overseeing and managing an AUM worth more than Rs. 5.5 Billion. With over 15,000 retail and 150+ institutional clients under our wing.
                                <br /><br />
                                In a recent tally released, BFC Capital was listed as "One of the Top 25 Most Promising Wealth Management Consultants" of the country.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#44475B] mb-4">What Are We Looking For?</h3>
                            <div className="text-[#7A7A7A] space-y-1">
                                <p><span className="font-bold text-[#44475B]">Role :</span> Business Development Manager</p>
                                <p><span className="font-bold text-[#44475B]">Job Location :</span> Lucknow, Uttar Pradesh</p>
                                <p><span className="font-bold text-[#44475B]">Minimum Qualification :</span> Graduation</p>
                                <p><span className="font-bold text-[#44475B]">Minimum Experience :</span> NA</p>
                            </div>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#44475B] mb-4">Responsibilities :</h3>
                            <ul className="text-[#7A7A7A] space-y-2 list-disc pl-5 marker:text-gray-400">
                                <li>Marketing Campaigns</li>
                                <li>Generating Leads for Revenue Team</li>
                                <li>Planning and Executing Marketing Activities</li>
                                <li>Tapping Various Segments</li>
                                <li>Creating Brand Awareness</li>
                                <li>Corporate walks</li>
                            </ul>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#44475B] mb-4">Why Join Us?</h3>
                            <p className="text-[#7A7A7A] leading-relaxed">
                                We're assuming you may have a few apprehensions about associating with a company with a modest footprint. It's understandable. That said, working with us has its perks. For starters, BFC Capital is known for providing its employees a better work-life balance while holding up to its core values. Also, the path towards aggressively marketing our services isn't completely laid out just yet. This means unlike most conventional companies out there, where one's work frame is working against the clock... a pre-decided frame to achieve these goals and they're not running out., but surely do set forth milestones for team down the line to match your own parameters and expectations we set. In This draws all our team leaders and vertical heads are allowed endless prodding when it comes down to pushing the boundaries out. We have a very open & liberal work culture, allowing each team member to function as per their individual style and take a breather every now and then by participating in team outings.
                            </p>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#44475B] mb-4">Benefits & Perks :</h3>
                            <ul className="text-[#7A7A7A] space-y-2 list-disc pl-5 marker:text-gray-400">
                                <li>On Job Training</li>
                                <li>Team Outings</li>
                                <li>Soft skills Training</li>
                                <li>Appealing Variables for Meeting Milestones</li>
                            </ul>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-[#44475B] mb-4">Skill set Required :</h3>
                            <ul className="text-[#7A7A7A] space-y-2 list-disc pl-5 marker:text-gray-400">
                                <li>Convincing Skills | Analytical Skills | Inter-Personal Skills</li>
                                <li>Must be Presentable</li>
                                <li>Must own a 2/4 Wheeler</li>
                                <li>Amiable Communication Skills</li>
                            </ul>
                        </div>

                        <div className="mb-12">
                            <h3 className="text-xl font-bold text-[#44475B] mb-4">What We Give You</h3>
                            <p className="text-[#44475B] space-y-2">
                                <span className="font-bold">Package :</span> <span className="text-[#7A7A7A]">Rs. 2 L to 5 L per annum (Fixed) + Annual Appraisal</span><br /><br />
                                <span className="font-bold">Company Website :</span> <Link href="https://bfccapital.com" className="text-[#011EFE] hover:underline">https://bfccapital.com</Link><br />
                                <span className="font-bold">Contact Details_HR :</span> <a href="mailto:hrd@bfccapital.com" className="text-[#011EFE]">hrd@bfccapital.com</a>
                            </p>
                        </div>

                        <ApplyJobForm defaultPost="Business Development Manager" />
                    </>
                );

            default:
                notFound();
        }
    };

    const getJobTitle = () => {
        return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <div className="flex flex-col min-h-screen font-sans bg-[#F8F9FA]">
            <Navbar />

            <main className="flex-grow">
                <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 max-w-6xl">
                    {/* Breadcrumb */}
                    <nav className="flex items-center text-sm mb-8">
                        <Link
                            href="/"
                            className="font-semibold"
                            style={{
                                background: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                color: "transparent"
                            }}
                        >
                            Home
                        </Link>
                        <svg width="0" height="0">
                            <linearGradient id="chevron-gradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="39.5%" stopColor="#04B488" />
                                <stop offset="100%" stopColor="#011EFE" />
                            </linearGradient>
                        </svg>

                        <ChevronRight
                            className="h-4 w-4 mx-2"
                            style={{ stroke: "url(#chevron-gradient)" }}
                        />
                        <span className="text-[#7A7A7A] font-semibold" style={{
                            background: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            color: "transparent"
                        }}>Career</span>
                        <ChevronRight
                            className="h-4 w-4 mx-2"
                            style={{ stroke: "url(#chevron-gradient)" }}
                        />
                        <span className="text-[#7A7A7A] font-semibold" style={{
                            // background: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
                            // WebkitBackgroundClip: "text",
                            // WebkitTextFillColor: "transparent",
                            // backgroundClip: "text",
                            // color: "transparent"
                        }}>{getJobTitle()}</span>
                    </nav>

                    {renderJobDetails()}
                </div>
            </main>

            <Footer />
        </div>
    );
}
