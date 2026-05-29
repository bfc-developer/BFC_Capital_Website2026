import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ComplaintsTables from "../components/investor-complaints/ComplaintsTables";
import { pageSeo } from "../seo-config";

export const metadata: Metadata = {
    title: pageSeo["/Trend-of-monthly-disposal-of-complaints"]?.title,
    description: pageSeo["/Trend-of-monthly-disposal-of-complaints"]?.description,
    keywords: pageSeo["/Trend-of-monthly-disposal-of-complaints"]?.keywords,
    alternates: {
        canonical: pageSeo["/Trend-of-monthly-disposal-of-complaints"]?.canonical,
    },
};


export default function TrendOfMonthlyDisposalOfComplaintsPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main id="main-content" className="flex-grow">
                <ComplaintsTables />
            </main>
            <Footer />
        </div>
    );
}
