import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function TermsAndConditions() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 md:px-45">

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
                <span className="text-[#7A7A7A]">Terms & Conditions</span>
            </nav>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#44475B] mb-8">
                Terms & Conditions – Prodigy Pro
            </h1>

            {/* Content */}
            <div className="space-y-6 text-[#44475B] leading-relaxed text-justify">
                <p>
                    BFC Capital is a SEBI Registered Investment Advisor (SEBI-RIA) that provides investment advisory services to users. Through its technology platform, BFC Capital facilitates access to mutual fund schemes, allowing users to independently execute transactions in mutual fund units based on their own decisions and/or advisory recommendations received.
                </p>
                <p>
                    A user’s investment account shall be activated only after BFC Capital completes verification of the personal information provided at the time of enrolment, in accordance with the Know Your Client (“KYC”) guidelines issued by the Securities and Exchange Board of India (“SEBI”).
                </p>
                <p>
                    The software and hardware underlying the website and mobile application, including all internet-related software required to access the platform, are the legal property of their respective vendors. Permission granted by BFC Capital to access the website or mobile application does not confer any proprietary or ownership rights in such software or hardware. Users agree not to modify, translate, disassemble, decompile, reverse engineer, or create derivative works based on the underlying software or hardware.
                </p>
                <p>
                    BFC Capital reserves the absolute right to amend or modify these Terms and Conditions at any time without prior notice. Any such changes shall be effective immediately upon being updated. It is the user’s responsibility to periodically review the Terms and Conditions to remain informed of any updates.
                </p>
                <p>
                    The user irrevocably and unconditionally consents to BFC Capital and the respective mutual funds and/or Registrars and Transfer Agents (RTAs) collecting and sharing transaction-related data pertaining to investments made through BFC Capital’s online platform, for the purpose of processing and managing user transactions.
                </p>
                <p>

                    Certain mutual fund schemes may be subject to exit loads, as specified in the respective Scheme Information Documents (SID), Key Information Memorandum (KIM), and addendums thereto, collectively referred to as “Scheme Related Documents.” Users are advised to read all Scheme Related Documents carefully before undertaking any transaction through the mobile application.
                </p>
                <p>

                    While BFC Capital will make reasonable efforts to ensure continuous availability of its systems, it does not guarantee uninterrupted access at all times. BFC Capital shall make best efforts to resolve issues arising from network failures, technical disruptions, virus attacks, or similar causes. However, BFC Capital shall not be liable for any loss, damage, cost, charges, or expenses arising directly or indirectly due to system unavailability.
                </p>
                <p>
                    All disputes arising out of or in connection with these Terms and Conditions shall be subject to the exclusive jurisdiction of the courts located in Lucknow. These Terms and Conditions shall be governed by and construed in accordance with the laws of India.
                </p>
            </div>
        </div>
    );
}
