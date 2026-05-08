import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import ELSSCalculator from "@/app/components/calculators/elss-calculator/ELSS-Calculator";

import { pageSeo } from "@/app/seo-config";

export const metadata: Metadata = {
    title: pageSeo["/calculators/elss-calculator"]?.title,
    description: pageSeo["/calculators/elss-calculator"]?.description,
    keywords: pageSeo["/calculators/elss-calculator"]?.keywords,
    alternates: {
        canonical: pageSeo["/calculators/elss-calculator"]?.canonical,
    },
};

export default function ELSSCalculatorPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <ELSSCalculator />
            </main>
            <Footer />
        </div>
    );
}
