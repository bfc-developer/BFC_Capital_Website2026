import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ComplaintsTables from "../components/investor-complaints/ComplaintsTables";
import { pageSeo } from "../seo-config";

export const metadata: Metadata = {
    title: pageSeo["/investor-complaints"]?.title,
    description: pageSeo["/investor-complaints"]?.description,
    keywords: pageSeo["/investor-complaints"]?.keywords,
    alternates: {
        canonical: pageSeo["/investor-complaints"]?.canonical,
    },
};


export default function InvestorComplaintsPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <ComplaintsTables />
            </main>
            <Footer />
        </div>
    );
}
