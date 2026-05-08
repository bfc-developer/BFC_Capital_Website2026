import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import SWP from "@/app/components/calculators/swp-calculator/SWP-Calculator";

import { pageSeo } from "@/app/seo-config";

export const metadata: Metadata = {
    title: pageSeo["/calculators/swp-calculator"]?.title,
    description: pageSeo["/calculators/swp-calculator"]?.description,
    keywords: pageSeo["/calculators/swp-calculator"]?.keywords,
    alternates: {
        canonical: pageSeo["/calculators/swp-calculator"]?.canonical,
    },
};

export default function SWPCalculatorPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <SWP />
            </main>
            <Footer />
        </div>
    );
}
