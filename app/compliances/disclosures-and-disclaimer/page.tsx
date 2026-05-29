import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import DisclosureAndDisclaimer from "@/app/components/compliances/DisclosuresandDisclaimer";

export default function DisclosureAndDisclaimerPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main id="main-content" className="flex-grow">
                <DisclosureAndDisclaimer />
            </main>
            <Footer />
        </div>
    );
}
