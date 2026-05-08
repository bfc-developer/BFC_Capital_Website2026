import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import CostOfDelay from "@/app/components/calculators/CostofDelayinSIPCalculator/CostOfDelay";

import { pageSeo } from "@/app/seo-config";

export const metadata: Metadata = {
    title: pageSeo["/calculators/cost-of-delay-in-sip-calculator"]?.title,
    description: pageSeo["/calculators/cost-of-delay-in-sip-calculator"]?.description,
    keywords: pageSeo["/calculators/cost-of-delay-in-sip-calculator"]?.keywords,
    alternates: {
        canonical: pageSeo["/calculators/cost-of-delay-in-sip-calculator"]?.canonical,
    },
};

export default function CostOfDelayPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <CostOfDelay />
            </main>
            <Footer />
        </div>
    );
}
