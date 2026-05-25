import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import InvestorEducationPlatforms from "@/app/components/compliances/InvestorEducationPlatforms";

export default function InvestorEducationPlatformsPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <InvestorEducationPlatforms />
            </main>
            <Footer />
        </div>
    );
}
