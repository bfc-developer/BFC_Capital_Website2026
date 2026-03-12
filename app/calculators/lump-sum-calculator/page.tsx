import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import Lumpsum from "@/app/components/calculators/LumpSumCalculator/Lumpsum";

export const metadata: Metadata = {
    title: "Lump Sum Calculator - BFC Capital",
    description: "Calculate the future value of your one-time investments with BFC Capital's lump sum calculator.",
};

export default function LumpSumCalculatorPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <Lumpsum />
            </main>
            <Footer />
        </div>
    );
}
