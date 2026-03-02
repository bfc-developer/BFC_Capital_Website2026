import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";

import { pageSeo } from "@/app/seo-config";
import Sipcalculators from "@/app/components/calculators/sip-calculator/SIP-Calculator";



export const metadata: Metadata = {
    title: pageSeo["/about-us"]?.title,
    description: pageSeo["/about-us"]?.description,
    keywords: pageSeo["/about-us"]?.keywords,
    alternates: {
        canonical: pageSeo["/about-us"]?.canonical,
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