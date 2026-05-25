import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import GrievanceRedressal from "@/app/components/compliances/GrievanceRedressal";

export default function GrievanceRedressalPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <GrievanceRedressal />
            </main>
            <Footer />
        </div>
    );
}
