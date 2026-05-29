import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import TargetAmount from "@/app/components/calculators/TargetAmountCalculator/TargetAmount";

import { pageSeo } from "@/app/seo-config";

export const metadata: Metadata = {
    title: pageSeo["/calculators/target-amount-calculator"]?.title,
    description: pageSeo["/calculators/target-amount-calculator"]?.description,
    keywords: pageSeo["/calculators/target-amount-calculator"]?.keywords,
    alternates: {
        canonical: pageSeo["/calculators/target-amount-calculator"]?.canonical,
    },
};

export default function TargetAmountCalculatorPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main id="main-content" className="flex-grow">
                <TargetAmount />
            </main>
            <Footer />
        </div>
    );
}
