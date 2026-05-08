import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import Retirement from "@/app/components/calculators/retirement-planning-calculator/Retirement-Planning-Calculator";

import { pageSeo } from "@/app/seo-config";

export const metadata: Metadata = {
    title: pageSeo["/calculators/retirement-planning-calculator"]?.title,
    description: pageSeo["/calculators/retirement-planning-calculator"]?.description,
    keywords: pageSeo["/calculators/retirement-planning-calculator"]?.keywords,
    alternates: {
        canonical: pageSeo["/calculators/retirement-planning-calculator"]?.canonical,
    },
};

export default function RetirementPlanningPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <Retirement />
            </main>
            <Footer />
        </div>
    );
}
