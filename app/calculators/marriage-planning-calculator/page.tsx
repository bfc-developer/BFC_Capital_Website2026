import type { Metadata } from "next";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import { pageSeo } from "../../seo-config";

import MarriagePlanning from "../../components/calculators/marriage-planning-calculator/Marriage-Calculator";


export const metadata: Metadata = {
    title: pageSeo["/MarriagePlanning"]?.title,
    description: pageSeo["/MarriagePlanning"]?.description,
    keywords: pageSeo["/MarriagePlanning"]?.keywords,
    alternates: {
        canonical: pageSeo["/MarriagePlanning"]?.canonical,
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