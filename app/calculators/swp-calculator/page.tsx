import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import SWP from "@/app/components/calculators/swp-calculator/SWP-Calculator";

export const metadata: Metadata = {
    title: "SWP Calculator - BFC Capital",
    description: "Calculate your Systematic Withdrawal Plan (SWP) with BFC Capital's free calculator.",
};

export default function SWPCalculatorPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <SWP />
            </main>
            <Footer />
        </div>
    );
}
