import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PrivacyPolicy() {
    return (
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
                <ChevronRight className="h-4 w-4 mx-2 text-[#7A7A7A]" />
                <span className="text-[#7A7A7A]">Privacy Policy</span>
            </nav>

            {/* Title */}
            <h1 className="text-[25px] md:text-3xl lg:text-4xl font-bold text-[#44475B] mb-5 md:mb-8">
                Privacy Policy
            </h1>

            {/* Content */}
            <div className="space-y-6 text-[#44475B] leading-relaxed text-justify">
                <p className="text-justify text-[15px] md:text-[17px] leading-relaxed">
                    BFC Capital is a SEBI-registered Investment Adviser (RIA)-- Registration Number INA000021669– committed to providing transparent, compliant, and goal-oriented wealth management solutions. With decades of experience, we offer investment guidance, mutual funds, SIPs, portfolio management, and financial planning support to individuals, families, and institutions. <br />
                    We at BFC Capital are committed to protecting the privacy and security of your personal data. Your privacy is of utmost importance to us.
                    This Privacy Policy explains how “We” Collect, Use, Process and Disclose the information you may have provided or may have registered on our mobile application “Prodigy Pro” and/or our website www.bfccapital.com with the intention of availing the services, products and content offered by “Us”. This data collection is an automated process that takes place when the app and/or our website are accessed via any mobile or device with internet connectivity, among other means. <br />
                    Under this Privacy Policy, the term "User" is for the purposes referring to “You”, be it in the capacity of an individual, a guest user, browser and/or the representative of an entity, who visits, accesses, uses, downloads, deals with, or avails “Our” Products & Services and/or transacts through any of our Platforms. To this effect, wherever the context so requires, "You" or "Your" shall mean “User” and the term "We", "Us" & "Our" shall signify “BFC Capital” (the Company).
                </p>
            </div>
            <h2 className="text-[18px] md:text-[24px] font-bold mt-8 text-[#44475B] pb-4 mb-4">1. Information Collected</h2>
            <ul className="text-[#44475B] list-disc ml-7 text-justify text-[15px] md:text-[17px] leading-relaxed">
                <li>Information You Provide – During your initial visit to our Platforms, the Company shall seek certain personal information from “You” on a voluntary basis. This information is sought at various points across the Platform. In certain cases, the information provided by “You” is not limited to registering or setting up an account (Investment Journey). This includes entering your details on the App and/or the website to avail the services offered by “Us”, to buy any financial product that is offered by “Us”, providing feedback & opinion about the product and services that are currently available or maybe offered in future.</li>

                <li>Throughout “Your” Investment Journey, “You” may be required to provide certain information mandatorily (such as KYC information or other regulatory requirements). Any such information disclosed by “You”, may be disclosed willingly on a voluntary basis and without any coercion.</li>
            </ul>
            <div className="w-24 h-[2] bg-[#011EFE] rounded my-3 md:my-5 lg:my-8"></div>

            <h2 className="text-[18px] md:text-[24px] font-bold mt-8 text-[#44475B] pb-4 mb-4">2. Investment Journey</h2>
            <p className="text-[#44475B] mb-4 text-justify text-[15px] md:text-[17px] leading-relaxed">The following information needs to be provided by “You“ mandatorily and voluntarily, when starting “Your” investment journey on our platforms:</p>
            <ul className="text-[#44475B] list-disc ml-7 text-justify text-[15px] md:text-[17px]">
                <li>Mobile Number, First Name, Last Name, PAN, e-Mail Address, Date of Birth. AADHAR, Address.</li>
                <li>Income Slab, Profession, Address Details, Father's Name, Mother's Name, Tax Residency, Birth Country, Nationality, Nominee Details, Gender, Marital Status.</li>
                <li>Bank Account Number, “Your” Name on Bank Passbook/Cheque and IFSC of the Bank.</li>
            </ul>
            <div className="w-24 h-[2] bg-[#011EFE] rounded my-3 md:my-5 lg:my-8"></div>

            <h2 className="text-[18px] md:text-[24px] font-bold mt-8 text-[#44475B] pb-4 mb-4">3. KYC Details</h2>
            <p className="text-[#44475B] text-justify text-[15px] md:text-[17px] leading-relaxed">Based on your explicit consent, we may fetch your KYC details from regulatory repositories such as CDSL Ventures Limited (CVL KRA) or other authorized agencies to ensure compliance with applicable laws and regulations.</p>
            <div className="w-24 h-[2] bg-[#011EFE] rounded my-3 md:my-5 lg:my-8"></div>

            <h2 className="text-[18px] md:text-[24px] font-bold mt-8 text-[#44475B] pb-4 mb-4">4. Other Information</h2>
            <p className="text-[#44475B] mb-4">Cookies & Other Similar Technologies</p>
            <ul className="text-[#44475B] list-disc ml-7 text-justify text-[15px] md:text-[17px] leading-relaxed">
                <li>To improve the responsiveness of “Our” Platforms, and to make the User Experience effectively seamless and/or to analyse the efficacy of our services; “We” may use cookies, or other similar electronic tools to collect information. Please note, unless “You” voluntarily identify yourself (through registration, for example), we will have no way of identifying who “You” are, even if “We” assign a cookie to “Your” computer or device. The only personal information a cookie can obtain is the information “You” voluntarily provide.</li>
                <li>Any Information provided by “You” and/or collected from other sources shall be deemed confidential by “Us”, provided it is not freely available and/or accessible in the public domain like comments, messages, blogs, scribbles available on social platforms, such as Facebook, Twitter, etc. Also, if any information posted, uploaded, conveyed, communicated by “You” on the public sections of these websites becomes published content, it shall not be considered confidential and/or personal or personally identifiable information.</li>
            </ul>
            <div className="w-24 h-[2] bg-[#011EFE] rounded my-3 md:my-5 lg:my-8"></div>

            <h2 className="text-[18px] md:text-[24px] font-bold mt-8 text-[#44475B] pb-4 mb-4">5. User Data Policy</h2>
            <ul className="text-[#44475B] list-disc ml-7 text-justify text-[15px] md:text-[17px] leading-relaxed">
                <li>Users have the right to request for the deletion of their personal data held by “Us”. To initiate the account deletion process, users can contact us via email at <a href="mailto:dataprotectionbfc@gmail.com" className="underline">dataprotectionbfc@gmail.com</a> or submit a data deletion request through our website using the following link: <a href="https://bfccapital.com/contact-us" target="_blank" rel="noopener noreferrer" className="underline">https://bfccapital.com/contact-us</a>.</li>
                <li>We are committed to addressing your concerns and inquiries promptly and transparently.</li>
                <li>Upon receiving a data deletion request, We will verify the identity of the requester to ensure the security of user information. Following successful verification, we will proceed with the deletion of the user's account data from our systems within a reasonable timeframe.</li>
                <li>It’s important to note that certain data may need to be retained for legal or legitimate business purposes even after account deletion. However, any data retained will be used solely for these specific purposes and will not be accessible or used for any other reason.</li>
                <li>Users have the right to request for the Correction of their personal data held by "Us". To initiate the date correction process, users can contact us via email at <a href="mailto:dataprotectionbfc@gmail.com" className="underline">dataprotectionbfc@gmail.com</a> or submit a data correction request through our website using the following link: <a href="https://bfccapital.com/contact-us" target="_blank" rel="noopener noreferrer" className="underline">https://bfccapital.com/contact-us</a>.</li>
                <li>Upon receiving a personal data correction request, We will verify the identity of the requester to ensure the security of user information. Following successful verification, we will proceed with the correction of the user's account data from our systems within a reasonable timeframe.</li>
            </ul>
            <div className="w-24 h-[2] bg-[#011EFE] rounded my-3 md:my-5 lg:my-8"></div>

            <h2 className="text-[18px] md:text-[24px] font-bold mt-8 text-[#44475B] pb-4 mb-4">6. Data Protection Officer</h2>
            <p className="text-[#44475B]  text-justify text-[15px] md:text-[17px] leading-relaxed">Ms. Vertika Singh has been appointed as Data Protection Officer for the compliance of the DPDP Act 2023. She can be contacted at <a href="mailto:dataprotectionbfc@gmail.com" className="underline">dataprotectionbfc@gmail.com</a> for any query, concern, grievance related to protection, processing, erase, correction of your personal data.</p>
            <div className="w-24 h-[2] bg-[#011EFE] rounded my-3 md:my-5 lg:my-8"></div>

            <h2 className="text-[18px] md:text-[24px] font-bold mt-8 text-[#44475B] pb-4 mb-4">7. Changes in Privacy Policy</h2>
            <p className="text-[#44475B] text-justify text-[15px] md:text-[17px] leading-relaxed">“We” may update and/or modify this “Privacy Policy” from time to time to incorporate necessary changes in technology, applicable laws, or any other variant. In any case, “We” reserve the right to change (at any point of time) the terms of this Privacy Policy. Any changes “We” make shall take effect immediately, after getting posted on our Platform. Although we will make reasonable efforts to keep you posted on any updates to this Privacy Policy, to make sure that you are aware of any changes, we advise “You” to review this policy periodically for the latest version. Continued use of “Our” Sites or Services, after such notice, will be deemed acceptance of such changes on “Your” part.</p>

        </div>
    );
}