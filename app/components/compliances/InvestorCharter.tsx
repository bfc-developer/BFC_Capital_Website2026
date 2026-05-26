"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function InvestorCharter() {
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
                    <span className="text-[#7A7A7A] font-semibold">Investor Charter</span>
                </nav>

                {/* Title */}
                <h1 className="text-[40px] md:text-3xl lg:text-[40px] font-bold text-[#44475B] text-center mb-10">
                    Investor Charter
                </h1>

                {/* Content */}
                <div className="space-y-4 text-[#44475B]">
                    {/* Section A */}
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-[22px] font-bold text-[#44475B] leading-snug">
                            A. Vision and Mission Statements for investors
                        </h2>
                        <ul className="list-disc pl-6 space-y-4 text-[15px] md:text-[16px]">
                            <li>
                                <span className="font-bold">Vision</span>
                                <div className="pl-1 text-[15px] md:text-[16px] text-[#44475B] leading-relaxed">
                                    Invest with knowledge & safety.
                                </div>
                            </li>
                            <li>
                                <span className="font-bold">Mission</span>
                                <div className="pl-1 text-[15px] md:text-[16px] text-[#44475B] leading-relaxed">
                                    Every investor should be able to invest in right investment products based on their needs,<br />
                                    manage and monitor them to meet their goals, access reports and enjoy financial wellness.
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Section B */}
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-[22px] font-bold text-[#44475B] leading-snug">
                            B. Details of business transacted by the Investment Adviser with respect to the investors
                        </h2>
                        <ul className="list-disc pl-6 text-[15px] md:text-[16px] text-[#44475B] leading-relaxed">
                            <li>
                                To enter into an agreement with the client providing all details including fee details, aspects of Conflict of interest disclosure and maintaining confidentiality of information.
                            </li>
                            <li>
                                To do a proper and unbiased risk – profiling and suitability assessment of the client.
                            </li>
                            <li>
                                To conduct audit annually.
                            </li>
                            <li>
                                To disclose the status of complaints on its website.
                            </li>
                            <li>
                                To disclose the name, proprietor name, type of registration, registration number, validity, complete address with telephone numbers and associated SEBI Office details (i.e. Head office/ regional/ local Office) on its website.
                            </li>
                            <li>
                                To employ only qualified and certified employees.
                            </li>
                            <li>
                                To deal with clients only from official number
                            </li>
                            <li>
                                To maintain records of interactions, with all clients including prospective clients (prior to onboarding), where any conversation related to advice has taken place.
                            </li>
                            <li>
                                To ensure that all advertisements are in adherence to the provisions of the Advertisement Code for Investment Advisers
                            </li>
                            <li>
                                Not to discriminate in terms of services provided, among clients opting for same/similar products/services offered by investment adviser.
                            </li>
                        </ul>
                    </div>

                    {/* Section C */}
                    <div className="">
                        <h2 className="text-xl md:text-[22px] font-bold text-[#44475B] leading-snug mb-4">
                            C. Details of services provided to investors (No Indicative Timelines)
                        </h2>
                        <ul className="list-disc pl-6 text-[15px] md:text-[16px] text-[#44475B] leading-relaxed">
                            <li>
                                <span className="font-bold">Onboarding of Clients</span>
                                <ul className="list-disc pl-6">
                                    <li>Sharing of agreement copy</li>
                                    <li>Completing KYC of clients</li>
                                </ul>
                            </li>
                            <li>
                                <span className="font-bold">Disclosure to Clients</span>
                                <ul className="list-disc pl-6">
                                    <li>To provide full disclosure about its business, affiliations, compensation in the agreement.</li>
                                    <li>To not access client&apos;s accounts or holdings for offering advice.</li>
                                    <li>To disclose the risk profile to the client.</li>
                                    <li>To disclose any conflict of interest of the investment advisory activities with any other activities of the investment adviser.</li>
                                    <li>To disclose the extent of use of Artificial Intelligence tools in providing investment advisory services.</li>
                                </ul>
                            </li>
                            <li>
                                To provide investment advice to the client based on the risk-profiling of the clients and  suitability of the client.
                            </li>
                            <li>
                                To treat all advisory clients with honesty and integrity.
                            </li>
                            <li>
                                To make adequate disclosure to the investor of all material facts such as risks, obligations, costs, etc. relating to the products or securities advised by the adviser.
                            </li>
                            <li>
                                To provide clear guidance and adequate caution notice to clients when providing investment advice for dealing in complex and high-risk financial products/services.
                            </li>
                            <li>
                                To ensure confidentiality of information shared by clients unless such information is required to be provided in furtherance of discharging legal obligations or a client has provided specific consent to share such information.
                            </li>
                            <li>
                                To disclose the timelines for the various services provided by the investment adviser to clients and ensure adherence to the said timelines.
                            </li>
                        </ul>
                    </div>

                    {/* Section D */}
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-[22px] font-bold text-[#44475B] leading-snug">
                            D. Details of grievance redressal mechanism and how to access it
                        </h2>
                        <div className="text-[15px] md:text-[16px] text-[#44475B] leading-relaxed space-y-6">
                            <div>
                                <p className="mb-4 px-3">
                                    1. Investor can lodge complaint/grievance against Investment Adviser in the following ways:
                                </p>
                                <div className="pl-6 space-y-4">
                                    <p className="underline">
                                        Mode of filing the complaint with investment adviser
                                    </p>
                                    <p>
                                        In case of any grievance / complaint, an investor may approach the concerned Investment Adviser who shall strive to redress the grievance immediately, but not later than 21 days of the receipt of the grievance.
                                    </p>
                                    <p className="underline">
                                        Mode of filing the complaint on SCORES or with Investment Adviser Administration and Supervisory Body (IAASB)
                                    </p>
                                    <div className="space-y-4">
                                        <p>
                                            i. SCORES 2.0 (a web based centralized grievance redressal system of SEBI for facilitating effective grievance redressal in time-bound manner) (<a href="https://scores.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="hover:underline">https://scores.sebi.gov.in</a>)
                                        </p>
                                        <div className="">
                                            <p>
                                                Two level review for complaint/grievance against investment adviser:
                                            </p>
                                            <ul className="list-disc pl-6">
                                                <li>First review done by designated body (IAASB)</li>
                                            </ul>
                                            <p className="pl-6">Second review done by SEBI</p>
                                        </div>
                                        <p>
                                            ii. Email to designated email ID of IAASB
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p>
                                2. If the Investor is not satisfied with the resolution provided by the Market Participants, then the Investor has the option to file the complaint/ grievance on SMARTODR platform for its resolution through online conciliation or arbitration.
                            </p>

                            <div className="space-y-4">
                                <p>
                                    3. With regard to physical complaints, investors may send their complaints to:
                                </p>
                                <p className="font-bold pl-6">
                                    Office of Investor Assistance and Education,<br />
                                    Securities and Exchange Board of India, SEBI Bhavan, Plot No. C4-A, &lsquo;G&rsquo; Block,<br />
                                    Bandra-Kurla Complex, Bandra (E), Mumbai - 400 051
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Section E */}
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-[22px] font-bold text-[#44475B] leading-snug">
                            E. Rights of investors
                        </h2>
                        <ul className="list-disc pl-6 text-[15px] md:text-[16px] text-[#44475B] leading-relaxed">
                            <li>Right to Privacy and Confidentiality</li>
                            <li>Right to Transparent Practices</li>
                            <li>Right to fair and Equitable Treatment</li>
                            <li>Right to Adequate Information</li>
                            <li>Right to Initial and Continuing Disclosure</li>
                            <li>Right to receive information about all the statutory and regulatory disclosures.</li>
                            <li>Right to Fair &amp; True Advertisement</li>
                            <li>Right to Awareness about Service Parameters and Turnaround Times</li>
                            <li>Right to be informed of the timelines for each service</li>
                            <li>Right to be Heard and Satisfactory Grievance Redressal</li>
                            <li>Right to have timely redressal</li>
                            <li>Right to Suitability of the Financial Products</li>
                            <li>Right to Exit from Financial product or service in accordance with the terms of agreement with the investment adviser</li>
                            <li>Right to receive clear guidance and caution notice when dealing in Complex and High-Risk Financial Products and Services</li>
                            <li>
                                Additional Rights to vulnerable consumers
                                <ul className="pl-2 list-none">
                                    <li>- Right to get access to services in a suitable manner even if differently abled</li>
                                </ul>
                            </li>
                            <li>Right to provide feedback on the financial products and services used</li>
                            <li>Right against coercive, unfair, and one-sided clauses in financial agreements</li>
                        </ul>
                    </div>

                    {/* Section F */}
                    <div className="space-y-4">
                        <h2 className="text-xl md:text-[22px] font-bold text-[#44475B] leading-snug">
                            F. Expectations from the investors (Responsibilities of investors)
                        </h2>
                        <ul className="list-disc pl-6 text-[15px] md:text-[16px] text-[#44475B] leading-relaxed">
                            <li className="space-y-2 mb-4">
                                <span className="font-bold">Do&rsquo;s</span>
                                <ul className="list-none">
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">i.</span>
                                        <span>Always deal with SEBI registered Investment Advisers.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">ii.</span>
                                        <span>Ensure that the Investment Adviser has a valid registration certificate.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">iii.</span>
                                        <div className="space-y-2">
                                            <p>Check for SEBI registration number.</p>
                                            <p className="text-gray-600">
                                                Please refer to the list of all SEBI registered Investment Advisers which is available on SEBI website in the following link:<br />
                                                <a href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&amp;in tmId=13)" target="_blank" rel="noopener noreferrer" className="hover:underline break-all">
                                                    https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&amp;in tmId=13)
                                                </a>
                                            </p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">iv.</span>
                                        <div className="space-y-2">
                                            <p>Pay only advisory fees to your Investment Adviser. Make payments of advisory fees through banking channels only and maintain duly signed receipts mentioning the details of your payments.</p>
                                            <p className="text-gray-600">You may make payment of advisory fees through Centralised Fee Collection Mechanism (CeFCoM) of IAASB if investment adviser has opted for the mechanism.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">v.</span>
                                        <span>Always ask for your risk profiling before accepting investment advice. Insist that Investment Adviser provides advisory strictly on the basis of your risk profiling and take into account available investment alternatives.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">vi.</span>
                                        <span>Ask all relevant questions and clear your doubts with your Investment Adviser before acting on advice.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">vii.</span>
                                        <span>Assess the risk–return profile of the investment as well as the liquidity and safety aspects before making investments.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">viii.</span>
                                        <span>Insist on getting the terms and conditions in writing duly signed and stamped. Read these terms and conditions carefully particularly regarding advisory fees, advisory plans, category of recommendations etc. before dealing with any Investment Adviser.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">ix.</span>
                                        <span>Be vigilant in your transactions.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">x.</span>
                                        <span>Approach the appropriate authorities for redressal of your doubts / grievances.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">xi.</span>
                                        <span>Inform SEBI about Investment Advisers offering assured or guaranteed returns.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">xii.</span>
                                        <span>Always be aware that you have the right to exit the service of an Investment Adviser</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">xiii.</span>
                                        <span>Always be aware that you have the right to seek clarifications and clear guidance on advice</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">xiv.</span>
                                        <span>Always be aware that you have the right to provide feedback to the Investment Adviser in respect of services received.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">xv.</span>
                                        <span>Always be aware that you will not be bound by any clause, prescribed by the investment adviser, which is contravening any regulatory provisions.</span>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <span className="font-bold">Don&rsquo;ts</span>
                                <ul className="list-none">
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">i.</span>
                                        <span>Don&rsquo;t fall for stock tips offered under the pretext of investment advice.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">ii.</span>
                                        <span>Do not provide funds for investment to the Investment Adviser.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">iii.</span>
                                        <span>Don&rsquo;t fall for the promise of indicative or exorbitant or assured returns by the Investment Advisers. Don&rsquo;t let greed overcome rational investment decisions.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">iv.</span>
                                        <span>Don&rsquo;t fall prey to luring advertisements or market rumors.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">v.</span>
                                        <span>Avoid doing transactions only on the basis of phone calls or messages from any Investment adviser or its representatives.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">vi.</span>
                                        <span>Don&rsquo;t take decisions just because of repeated messages and calls by Investment Advisers.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">vii.</span>
                                        <span>Do not fall prey to limited period discount or other incentive, gifts, etc. offered by Investment advisers.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">viii.</span>
                                        <span>Don&rsquo;t rush into making investments that do not match your risk taking appetite andinvestment goals.</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="w-6 shrink-0">ix.</span>
                                        <span>Do not share login credential and password of your trading, demat or bank accounts with the Investment Adviser.</span>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
