import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CareerPage from "../components/Career/CareerPage";

export default function Career() {
    return (
        <>
            <div className="flex flex-col min-h-screen font-sans bg-gray-50">
                <Navbar />
                <main id="main-content" className="flex-grow">
                    <CareerPage />
                </main>
                <Footer />
            </div>
        </>
    );
}