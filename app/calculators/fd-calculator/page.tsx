import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import FD from "@/app/components/calculators/FDCalculator/FD";

export const metadata: Metadata = {
    title: "FD Calculator - BFC Capital",
    description: "Calculate your Fixed Deposit returns with BFC Capital's free FD calculator.",
};

export default function FDCalculatorPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <FD />
            </main>
            <Footer />
        </div>
    );
}
