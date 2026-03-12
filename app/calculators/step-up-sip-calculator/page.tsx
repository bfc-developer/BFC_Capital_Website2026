import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import StepUp from "@/app/components/calculators/Step-UpSIPCalculator/StepUp";

export const metadata: Metadata = {
    title: "Step-Up SIP Calculator - BFC Capital",
    description: "See how increasing your SIP contributions periodically can boost your wealth with BFC Capital.",
};

export default function StepUpSIPCalculatorPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <StepUp />
            </main>
            <Footer />
        </div>
    );
}
