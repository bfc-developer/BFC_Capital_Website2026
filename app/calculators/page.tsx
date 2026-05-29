import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { pageSeo } from "../seo-config";
import Calculators from "../components/calculators/Calculator";


export const metadata: Metadata = {
    title: pageSeo["/calculators"]?.title,
    description: pageSeo["/calculators"]?.description,
    keywords: pageSeo["/calculators"]?.keywords,
    alternates: {
        canonical: pageSeo["/calculators"]?.canonical,
    },
};

export default function CalculatorsPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main id="main-content" className="flex-grow">
                <Calculators />
            </main>
            <Footer />
        </div>
    );
}