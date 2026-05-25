import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { pageSeo } from "../seo-config";
import ComplianceAudit from "../components/investor-complaints/ComplianceAudit";

export const metadata: Metadata = {
    title: pageSeo["/compliance-audit-status"]?.title,
    description: pageSeo["/compliance-audit-status"]?.description,
    keywords: pageSeo["/compliance-audit-status"]?.keywords,
    alternates: {
        canonical: pageSeo["/compliance-audit-status"]?.canonical,
    },
};


export default function ComplianceAuditStatusPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-gray-50">
            <Navbar />
            <main className="flex-grow">
                <ComplianceAudit />
            </main>
            <Footer />
        </div>
    );
}
