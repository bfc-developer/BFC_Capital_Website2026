import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import EMI from "@/app/components/calculators/EMICalculator/EMI";

export const metadata: Metadata = {
    title: "EMI Calculator - BFC Capital",
    description: "Plan your loans effectively with BFC Capital's free EMI calculator.",
};

export default function EMICalculatorPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <EMI />
            </main>
            <Footer />
        </div>
    );
}
