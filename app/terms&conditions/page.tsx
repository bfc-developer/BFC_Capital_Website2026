import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import TermsAndConditions from "../components/terms&conditions/TermsAndConditions";
import { pageSeo } from "../seo-config";


export const metadata: Metadata = {
    title: pageSeo["/terms&conditions"]?.title,
    description: pageSeo["/terms&conditions"]?.description,
    keywords: pageSeo["/terms&conditions"]?.keywords,
    alternates: {
        canonical: pageSeo["/terms&conditions"]?.canonical,
    },
};

export default function TermsAndConditionsPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <TermsAndConditions />
            </main>
            <Footer />
        </div>
    );
}