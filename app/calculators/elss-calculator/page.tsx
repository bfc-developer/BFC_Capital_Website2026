import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import ELSSCalculator from "@/app/components/calculators/elss-calculator/ELSS-Calculator";

export const metadata: Metadata = {
    title: "ELSS Calculator - BFC Capital",
    description: "Calculate your tax savings with ELSS investments using BFC Capital's ELSS calculator.",
};

export default function ELSSCalculatorPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <ELSSCalculator />
            </main>
            <Footer />
        </div>
    );
}
