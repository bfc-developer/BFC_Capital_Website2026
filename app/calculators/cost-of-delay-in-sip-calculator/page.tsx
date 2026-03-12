import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import CostOfDelay from "@/app/components/calculators/CostofDelayinSIPCalculator/CostOfDelay";

export const metadata: Metadata = {
    title: "Cost of Delay in SIP Calculator - BFC Capital",
    description: "Calculate the cost of delaying your SIP investments with BFC Capital.",
};

export default function CostOfDelayPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <CostOfDelay />
            </main>
            <Footer />
        </div>
    );
}
