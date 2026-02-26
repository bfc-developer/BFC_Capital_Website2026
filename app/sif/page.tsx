import type { Metadata } from "next";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SIF from "../components/sif/SIF";
import { pageSeo } from "../seo-config";


export const metadata: Metadata = {
    title: pageSeo["/sif"]?.title,
    description: pageSeo["/sif"]?.description,
    keywords: pageSeo["/sif"]?.keywords,
    alternates: {
        canonical: pageSeo["/sif"]?.canonical,
    },
};

export default function SIFPage() {
    return (
        <>
            <Navbar />
            <SIF />
            <Footer />
        </>
    );
}