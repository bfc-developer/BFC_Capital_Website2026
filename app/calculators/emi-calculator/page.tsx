import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import EMI from "@/app/components/calculators/EMICalculator/EMI";

import { pageSeo } from "@/app/seo-config";

export const metadata: Metadata = {
    title: pageSeo["/calculators/emi-calculator"]?.title,
    description: pageSeo["/calculators/emi-calculator"]?.description,
    keywords: pageSeo["/calculators/emi-calculator"]?.keywords,
    alternates: {
        canonical: pageSeo["/calculators/emi-calculator"]?.canonical,
    },
};

export default function EMICalculatorPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main id="main-content" className="flex-grow">
                <EMI />
            </main>
            <Footer />
        </div>
    );
}
