import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import AnnualSIP from "@/app/components/calculators/AnnualSIPCalculator/AnnualSIP";

import { pageSeo } from "@/app/seo-config";

export const metadata: Metadata = {
    title: pageSeo["/calculators/annual-sip-calculator"]?.title,
    description: pageSeo["/calculators/annual-sip-calculator"]?.description,
    keywords: pageSeo["/calculators/annual-sip-calculator"]?.keywords,
    alternates: {
        canonical: pageSeo["/calculators/annual-sip-calculator"]?.canonical,
    },
};

export default function AnnualSIPPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main id="main-content" className="flex-grow">
                <AnnualSIP />
            </main>
            <Footer />
        </div>
    );
}
