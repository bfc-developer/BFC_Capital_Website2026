import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import FD from "@/app/components/calculators/FDCalculator/FD";

import { pageSeo } from "@/app/seo-config";

export const metadata: Metadata = {
    title: pageSeo["/calculators/fd-calculator"]?.title,
    description: pageSeo["/calculators/fd-calculator"]?.description,
    keywords: pageSeo["/calculators/fd-calculator"]?.keywords,
    alternates: {
        canonical: pageSeo["/calculators/fd-calculator"]?.canonical,
    },
};

export default function FDCalculatorPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main id="main-content" className="flex-grow">
                <FD />
            </main>
            <Footer />
        </div>
    );
}
