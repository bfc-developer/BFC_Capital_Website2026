"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function GrievanceRedressal() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 md:py-12 md:px-15 lg:px-20">
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
                    <Link
                        href="/compliances"
                        className="font-semibold"
                        style={{
                            background: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            color: "transparent"
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            window.dispatchEvent(new CustomEvent("open-navbar-compliance"));
                        }}
                    >
                        Compliances
                    </Link>
                    <ChevronRight
                        className="h-4 w-4 mx-2"
                        style={{ stroke: "url(#chevron-gradient)" }}
                    />
                    <span className="text-[#7A7A7A] font-semibold">Grievance Redressal</span>
                </nav>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-[#44475B] mb-6 leading-tight">
                    SEBI requirement on Grievance Redressal / Escalation Matrix
                </h1>

                {/* Intro Paragraph */}
                <p className="text-[15px] md:text-[16px] text-[#44475B] leading-relaxed mb-8 text-justify">
                    Client&apos;s queries / complaints may arise due to lack of understanding or a deficiency of service experienced by clients. Deficiency of service may include lack of explanation, clarifications, understanding which escalates into shortfalls in the expected delivery standards, either due to inadequacy of facilities available or through the attitude of staff towards client.
                </p>

                {/* Escalation Matrix Table */}
                <div className="overflow-x-auto border border-[#E5E7EB] rounded-2xl shadow-sm mb-10">
                    <table className="min-w-full divide-y divide-[#E5E7EB] text-left text-sm text-[#44475B]">
                        <thead className="text-gray-800 font-bold text-xs" style={{ background: 'linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)' }}>
                            <tr>
                                <th scope="col" className="px-6 py-4 font-semibold text-[13px] md:text-sm leading-tight border-r border-[#E5E7EB]">
                                    Details of designation
                                </th>
                                <th scope="col" className="px-6 py-4 font-semibold text-[13px] md:text-sm leading-tight border-r border-[#E5E7EB]">
                                    Contact Person Name
                                </th>
                                <th scope="col" className="px-6 py-4 font-semibold text-[13px] md:text-sm leading-tight border-r border-[#E5E7EB]">
                                    Address
                                </th>
                                <th scope="col" className="px-6 py-4 font-semibold text-[13px] md:text-sm leading-tight border-r border-[#E5E7EB]">
                                    Contact No.
                                </th>
                                <th scope="col" className="px-6 py-4 font-semibold text-[13px] md:text-sm leading-tight border-r border-[#E5E7EB]">
                                    Email Id
                                </th>
                                <th scope="col" className="px-6 py-4 font-semibold text-[13px] md:text-sm leading-tight">
                                    Working Hours when complainant can call
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E7EB] bg-white">
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px]">
                                    Customer Support
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] whitespace-nowrap">
                                    Sejal Verma
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] min-w-[200px]">
                                    C.P. 61, Viraj Khand, Gomti Nagar, Lucknow - 226001
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] whitespace-nowrap">
                                    <a href="tel:+917347700888">  +917347700888</a>
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px]">
                                    <a href="mailto:customersupport@bfccapital.com" className="">
                                        customersupport@bfccapital.com
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] min-w-[240px]">
                                    10:00 AM to 6:00 PM<br />
                                    Mon-Sat (2nd and 4th Sat Closed)
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px]">
                                    Principal Officer
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] whitespace-nowrap">
                                    Akash Gupta
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] min-w-[200px]">
                                    C.P. 61, Viraj Khand, Gomti Nagar, Lucknow - 226001
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] whitespace-nowrap">
                                    <a href="tel:+916307937533">+91 6307937533</a>
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px]">
                                    <a href="mailto:akashgupta@bfccapital.com" className="">
                                        akashgupta@bfccapital.com
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] min-w-[240px]">
                                    10:00 AM to 6:00 PM<br />
                                    Mon-Sat (2nd and 4th Sat Closed)
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px]">
                                    Compliance Officer
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] whitespace-nowrap">
                                    Sunil Kumar Gupta
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] min-w-[200px]">
                                    C.P. 61, Viraj Khand, Gomti Nagar, Lucknow - 226001
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] whitespace-nowrap">
                                    <a href="tel:+918960006601">+91 8960006601</a>
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px]">
                                    <a href="mailto:sunilgupta@bfccapital.com" className="">
                                        sunilgupta@bfccapital.com
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] min-w-[240px]">
                                    10:00 AM to 6:00 PM<br />
                                    Mon-Sat (2nd and 4th Sat Closed)
                                </td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px]">
                                    Director
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] whitespace-nowrap">
                                    Sharad Bindal
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] min-w-[200px]">
                                    C.P. 61, Viraj Khand, Gomti Nagar, Lucknow - 226001
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px] whitespace-nowrap">
                                    <a href="tel:+919792202239">+91 9792202239</a>
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px]">
                                    <a href="mailto:sharadbindal@bfccapital.com" className="">
                                        sharadbindal@bfccapital.com
                                    </a>
                                </td>
                                <td className="px-6 py-4 text-[13px] md:text-[14px] min-w-[240px]">
                                    10:00 AM to 6:00 PM<br />
                                    Mon-Sat (2nd and 4th Sat Closed)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Footer Paragraphs */}
                <div className="text-[15px] md:text-[16px] text-[#44475B] leading-relaxed space-y-4">
                    <p className="text-justify">
                        In case you are not satisfied with our response you can lodge your grievance with SEBI at <a href="https://scores.sebi.gov.in/" target="_blank" rel="noopener noreferrer" className="">https://scores.sebi.gov.in/</a> or you may also write to any of the offices of SEBI. SCORES may be accessed through the SCORES mobile application as well, same can be downloaded from below link:
                    </p>

                    <p className="break-all">
                        <a href="https://play.google.com/store/apps/details?id=com.sebi&amp;hl=en_IN" target="_blank" rel="noopener noreferrer" className="">https://play.google.com/store/apps/details?id=com.sebi&amp;hl=en_IN
                        </a>
                    </p>

                    <p className="break-all">
                        <a href="https://apps.apple.com/in/app/sebiscores/id647884991" target="_blank" rel="noopener noreferrer" className="">https://apps.apple.com/in/app/sebiscores/id647884991
                        </a>
                    </p>

                    <p className="text-justify">
                        ODR Portal could be accessed, if unsatisfied with the response. Your attention is drawn to the SEBI circular no. SEBI/HO/OIAE/OIAE_IAD-1/P/CIR/2023/131 dated July 31, 2023, on &ldquo;Online Resolution of Disputes in the Indian Securities Market&rdquo;. A common Online Dispute Resolution Portal (&ldquo;ODR Portal&rdquo;) which harnesses conciliation and online arbitration for resolution of disputes arising in the Indian Securities Market has been established. ODR Portal can be accessed via the following link - <a href="https://smartodr.in/" target="_blank" rel="noopener noreferrer" className="">https://smartodr.in/</a>
                    </p>
                </div>
            </div>
        </>
    );
}