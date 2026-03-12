import type { Metadata } from "next";
import Navbar from "@/app/components/layout/Navbar";
import Footer from "@/app/components/layout/Footer";
import EducationPlanning from "@/app/components/calculators/education-planning-calculator/Education-Planning-Calculator";

export const metadata: Metadata = {
    title: "Education Planning Calculator - BFC Capital",
    description: "Plan for your child's future education with BFC Capital's education planning calculator.",
};

export default function EducationPlanningPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <EducationPlanning />
            </main>
            <Footer />
        </div>
    );
}
