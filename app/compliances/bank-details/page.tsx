import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import BankDetails from "@/app/components/compliances/BankDetails";

export default function BankDetailsPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main id="main-content" className="flex-grow">
                <BankDetails />
            </main>
            <Footer />
        </div>
    );
}
