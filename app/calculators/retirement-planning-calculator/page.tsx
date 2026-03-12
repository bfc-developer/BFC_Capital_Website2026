import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import Retirement from "@/app/components/calculators/retirement-planning-calculator/Retirement-Planning-Calculator";

export const metadata: Metadata = {
    title: "Retirement Planning Calculator - BFC Capital",
    description: "Plan your golden years with BFC Capital's retirement planning calculator.",
};

export default function RetirementPlanningPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <Retirement />
            </main>
            <Footer />
        </div>
    );
}
