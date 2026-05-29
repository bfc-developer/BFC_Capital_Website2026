import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ComplaintsTables from "../components/investor-complaints/ComplaintsTables";
import { pageSeo } from "../seo-config";
import LegalDisclaimer from "../components/legal-disclaimer/LegalDisclaimer";

export const metadata: Metadata = {
    title: pageSeo["/legal-disclaimer"]?.title,
    description: pageSeo["/legal-disclaimer"]?.description,
    keywords: pageSeo["/legal-disclaimer"]?.keywords,
    alternates: {
        canonical: pageSeo["/legal-disclaimer"]?.canonical,
    },
};


export default function LegalDisclaimerPage() {
    return (
        <div className="flex flex-col min-h-screen font-inter">
            <Navbar />
            <main id="main-content" className="flex-grow">
                <LegalDisclaimer />
            </main>
            <Footer />
        </div>
    );
}
