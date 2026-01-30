import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PrivacyPolicy from "../components/privacy-policy/PrivacyPolicy";
import { pageSeo } from "../seo-config";


export const metadata: Metadata = {
    title: pageSeo["/privacy-policy"]?.title,
    description: pageSeo["/privacy-policy"]?.description,
    keywords: pageSeo["/privacy-policy"]?.keywords,
    alternates: {
        canonical: pageSeo["/privacy-policy"]?.canonical,
    },
};

export default function PrivacyPolicyPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <PrivacyPolicy />
            </main>
            <Footer />
        </div>
    );
}