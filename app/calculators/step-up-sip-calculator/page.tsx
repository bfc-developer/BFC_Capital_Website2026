import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import StepUp from "@/app/components/calculators/Step-UpSIPCalculator/StepUp";

import { pageSeo } from "@/app/seo-config";

export const metadata: Metadata = {
    title: pageSeo["/calculators/step-up-sip-calculator"]?.title,
    description: pageSeo["/calculators/step-up-sip-calculator"]?.description,
    keywords: pageSeo["/calculators/step-up-sip-calculator"]?.keywords,
    alternates: {
        canonical: pageSeo["/calculators/step-up-sip-calculator"]?.canonical,
    },
};

export default function StepUpSIPCalculatorPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main id="main-content" className="flex-grow">
                <StepUp />
            </main>
            <Footer />
        </div>
    );
}
