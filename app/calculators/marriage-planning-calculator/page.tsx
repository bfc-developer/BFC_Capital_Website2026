import type { Metadata } from "next";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import { pageSeo } from "../../seo-config";

import MarriagePlanning from "../../components/calculators/marriage-planning-calculator/Marriage-Calculator";


export const metadata: Metadata = {
    title: pageSeo["/calculators/marriage-planning-calculator"]?.title,
    description: pageSeo["/calculators/marriage-planning-calculator"]?.description,
    keywords: pageSeo["/calculators/marriage-planning-calculator"]?.keywords,
    alternates: {
        canonical: pageSeo["/calculators/marriage-planning-calculator"]?.canonical,
    },
};

export default function MarriagePlanningPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <MarriagePlanning />
            </main>
            <Footer />
        </div>
    );
}