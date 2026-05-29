import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import EducationPlanning from "@/app/components/calculators/education-planning-calculator/Education-Planning-Calculator";

import { pageSeo } from "@/app/seo-config";

export const metadata: Metadata = {
    title: pageSeo["/calculators/education-planning-calculator"]?.title,
    description: pageSeo["/calculators/education-planning-calculator"]?.description,
    keywords: pageSeo["/calculators/education-planning-calculator"]?.keywords,
    alternates: {
        canonical: pageSeo["/calculators/education-planning-calculator"]?.canonical,
    },
};

export default function EducationPlanningPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main id="main-content" className="flex-grow">
                <EducationPlanning />
            </main>
            <Footer />
        </div>
    );
}
