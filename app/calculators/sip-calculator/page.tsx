import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";

import { pageSeo } from "@/app/seo-config";
import Sipcalculators from "@/app/components/calculators/sip-calculator/SIP-Calculator";



export const metadata: Metadata = {
    title: pageSeo["/calculators/sip-calculator"]?.title,
    description: pageSeo["/calculators/sip-calculator"]?.description,
    keywords: pageSeo["/calculators/sip-calculator"]?.keywords,
    alternates: {
        canonical: pageSeo["/calculators/sip-calculator"]?.canonical,
    },
};

export default function AboutUsPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <Sipcalculators />
            </main>
            <Footer />
        </div>
    );
}