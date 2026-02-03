import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function LegalDisclaimer() {
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
                <span className="text-[#7A7A7A]">Legal Disclaimer</span>
            </nav>
            {/* Title */}
            <h2 className="text-[20px] md:text-3xl lg:text-4xl font-bold text-[#44475B] mb-5 md:mb-8">
                Legal Disclaimer
            </h2>
            <div className="text-[15px] md:text-[17px] space-y-6 text-[#44475B] leading-relaxed text-justify">
                <p>
                    If you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at customersupport@bfccapital.com
                </p>
            </div>
            <div className="w-24 h-[2] bg-[#011EFE] rounded my-3 md:my-5 lg:my-8"></div>

            {/* Title */}
            <h2 className="text-[20px] md:text-3xl lg:text-4xl font-bold text-[#44475B] mb-5 md:mb-8">
                Disclaimers for BFC Capital
            </h2>
            <div className="space-y-6 text-[#44475B] leading-relaxed text-justify text-[15px] md:text-[17px] ">
                <p>
                    All the information on this website - https://bfccapital.com/ - is published in good faith and for general information purpose only. BFC Capital does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website (BFC Capital), is strictly at your own risk. BFC Capital will not be liable for any losses and/or damages in connection with the use of our website. From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone 'bad'. Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their "Terms of Service" before engaging in any business or uploading any information.
                </p>
            </div>
            <div className="w-24 h-[2] bg-[#011EFE] rounded my-3 md:my-5 lg:my-8"></div>
            {/* Title */}
            <h2 className="text-[20px] md:text-3xl lg:text-4xl font-bold text-[#44475B] mb-5 md:mb-8">
                Consent
            </h2>
            <div className="space-y-6 text-[#44475B] leading-relaxed text-justify  text-[15px] md:text-[17px] leading-relaxed">
                <p>
                    By using our website, you hereby consent to our disclaimer and agree to its terms.
                </p>
            </div>
            <div className="w-24 h-[2] bg-[#011EFE] rounded my-3 md:my-5 lg:my-8"></div>
            {/* Title */}
            <h2 className="text-[20px] md:text-3xl lg:text-4xl font-bold text-[#44475B] mb-8">
                Update
            </h2>
            <div className="space-y-6 text-[#44475B] leading-relaxed text-justify  text-[15px] md:text-[17px] leading-relaxed">
                <p>
                    Should we update, amend or make any changes to this document, those changes will be prominently posted here.
                </p>
            </div>
        </div>

    );
}