import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { pageSeo } from "../seo-config";
import AboutUs from "../components/about-us/AboutUs";


export const metadata: Metadata = {
    title: pageSeo["/about"]?.title,
    description: pageSeo["/about"]?.description,
    keywords: pageSeo["/about"]?.keywords,
    alternates: {
        canonical: pageSeo["/about"]?.canonical,
    },
};

export default function AboutUsPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <AboutUs />
            </main>
            <Footer />
        </div>
    );
}