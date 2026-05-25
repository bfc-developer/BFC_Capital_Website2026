import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import InvestorCharter from "@/app/components/compliances/InvestorCharter";

export default function InvestorCharterPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <InvestorCharter />
            </main>
            <Footer />
        </div>
    );
}
