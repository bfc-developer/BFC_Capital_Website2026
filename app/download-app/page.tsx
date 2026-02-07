import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { pageSeo } from "../seo-config";
import DownloadApp from "../components/download-app/DownloadApp";

export const metadata: Metadata = {
    title: pageSeo["/download-app"]?.title,
    description: pageSeo["/download-app"]?.description,
    keywords: pageSeo["/download-app"]?.keywords,
    alternates: {
        canonical: pageSeo["/download-app"]?.canonical,
    },
};


export default function DownloadAppPage() {
    return (
        <div className="flex flex-col min-h-screen font-inter">
            <Navbar />
            <main className="flex-grow">
                <DownloadApp />
            </main>
            <Footer />
        </div>
    );
}
