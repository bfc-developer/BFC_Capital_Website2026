import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import AnnualSIP from "@/app/components/calculators/AnnualSIPCalculator/AnnualSIP";

export const metadata: Metadata = {
    title: "Annual SIP Calculator - BFC Capital",
    description: "Calculate your annual SIP returns with BFC Capital's free calculator.",
};

export default function AnnualSIPPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <AnnualSIP />
            </main>
            <Footer />
        </div>
    );
}
