import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { pageSeo } from "../seo-config";
import AllMutualFunds from "../components/all-mutual-funds/All_Mutual_funds";


export const metadata: Metadata = {
    title: pageSeo["/all-mutual-funds"]?.title,
    description: pageSeo["/all-mutual-funds"]?.description,
    keywords: pageSeo["/all-mutual-funds"]?.keywords,
    alternates: {
        canonical: pageSeo["/all-mutual-funds"]?.canonical,
    },
};

export default function AllMutualFundsPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main id="main-content" className="flex-grow">
                <AllMutualFunds />
            </main>
            <Footer />
        </div>
    );
}