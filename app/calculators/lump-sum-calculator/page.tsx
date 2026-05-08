import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import Lumpsum from "@/app/components/calculators/LumpSumCalculator/Lumpsum";

import { pageSeo } from "@/app/seo-config";

export const metadata: Metadata = {
    title: pageSeo["/calculators/lump-sum-calculator"]?.title,
    description: pageSeo["/calculators/lump-sum-calculator"]?.description,
    keywords: pageSeo["/calculators/lump-sum-calculator"]?.keywords,
    alternates: {
        canonical: pageSeo["/calculators/lump-sum-calculator"]?.canonical,
    },
};

export default function LumpSumCalculatorPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <Lumpsum />
            </main>
            <Footer />
        </div>
    );
}
