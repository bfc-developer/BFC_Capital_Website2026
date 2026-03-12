import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import TargetAmount from "@/app/components/calculators/TargetAmountCalculator/TargetAmount";

export const metadata: Metadata = {
    title: "Target Amount Calculator - BFC Capital",
    description: "Find out how much you need to save to reach your financial goals with BFC Capital.",
};

export default function TargetAmountCalculatorPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <TargetAmount />
            </main>
            <Footer />
        </div>
    );
}
