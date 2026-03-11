import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { pageSeo } from "../seo-config";
import FinancialPlanning from "../components/financial-planning/FinancialPlanning";


export const metadata: Metadata = {
    title: pageSeo["/financial-planning"]?.title,
    description: pageSeo["/financial-planning"]?.description,
    keywords: pageSeo["/financial-planning"]?.keywords,
    alternates: {
        canonical: pageSeo["/financial-planning"]?.canonical,
    },
};

export default function FinancialPlanningPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <FinancialPlanning />
            </main>
            <Footer />
        </div>
    );
}