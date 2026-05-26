import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import GrievanceMechanismForPWD from "@/app/components/compliances/GrievanceMechanismForPWD";

export default function GrievanceMechanismForPWDPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <GrievanceMechanismForPWD />
            </main>
            <Footer />
        </div>
    );
}
