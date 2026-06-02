import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { pageSeo } from "../seo-config";
import ClientLevelSegregation from "../components/investor-complaints/ClientLevelSegregation";

export const metadata: Metadata = {
    // title: pageSeo["/client-level-segregation"]?.title,
    // description: pageSeo["/client-level-segregation"]?.description,
    // keywords: pageSeo["/client-level-segregation"]?.keywords,
    alternates: {
        canonical: pageSeo["/client-level-segregation"]?.canonical,
    },
};


export default function ClientLevelSegregationPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main id="main-content" className="flex-grow">
                <ClientLevelSegregation />
            </main>
            <Footer />
        </div>
    );
}
