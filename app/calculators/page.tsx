import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { pageSeo } from "../seo-config";

import Sipcalculators from "../components/calculators/sip-calculator/SIP-Calculator";


export const metadata: Metadata = {
    title: pageSeo["/SIPcalculators"]?.title,
    description: pageSeo["/SIPcalculators"]?.description,
    keywords: pageSeo["/SIPcalculators"]?.keywords,
    alternates: {
        canonical: pageSeo["/SIPcalculators"]?.canonical,
    },
};

export default function SIPcalculatorsPage() {
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