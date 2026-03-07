import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import { pageSeo } from "../seo-config";
import ContactUsPage from "../components/contact-us/Contact-Us";


export const metadata: Metadata = {
    title: pageSeo["/contact-us"]?.title,
    description: pageSeo["/contact-us"]?.description,
    keywords: pageSeo["/contact-us"]?.keywords,
    alternates: {
        canonical: pageSeo["/contact-us"]?.canonical,
    },
};

export default function AboutUsPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <ContactUsPage />
            </main>
            <Footer />
        </div>
    );
}