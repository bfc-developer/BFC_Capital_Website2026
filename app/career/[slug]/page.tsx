import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ApplyJobForm from "../../components/Career/ApplyJobForm";
import DownloadJDButton from "../../components/Career/DownloadJDButton";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    try {
        const res = await fetch("https://hrms-bfc-capital2026.vercel.app/api/job-postings", { cache: "no-store" });
        const data = await res.json();
        return (data.jobPostings || []).map((job: any) => ({
            slug: job.jobRole.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        }));
    } catch (e) {
        return [];
    }
}

export default async function JobDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    let job = null;
    try {
        const res = await fetch("https://hrms-bfc-capital2026.vercel.app/api/job-postings", { cache: "no-store" });
        const data = await res.json();
        job = (data.jobPostings || []).find((j: any) =>
            j.jobRole.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug
        );
    } catch (e) {
        console.error("Failed to fetch jobs", e);
    }

    if (!job) {
        notFound();
    }

    const {
        jobRole,
        heading,
        preface,
        skillsRequired,
        location,
        package: pkg,
        exp,
        vacancyType,
        qualification,
        jdFileName,
        jdFileBase64
    } = job;

    const renderJobDetails = () => {
        return (
            <>
                <h1 className="text-3xl md:text-4xl font-bold text-[#44475B] mb-8">
                    {heading || `${heading}`}
                </h1>

                {preface && (
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-[#44475B] mb-4">Preface :</h3>
                        <p className="text-[#7A7A7A] leading-relaxed whitespace-pre-line">
                            {preface}
                        </p>
                    </div>
                )}

                {skillsRequired && (
                    <div className="mb-8">
                        <h3 className="text-xl font-bold text-[#44475B] mb-4">Skills Required :</h3>
                        <ul className="text-[#7A7A7A] space-y-2 list-disc pl-5 marker:text-gray-400">
                            {skillsRequired.split(/,|\n/).map((skill: string, index: number) => {
                                const trimmed = skill.trim();
                                if (!trimmed) return null;
                                return <li key={index}>{trimmed}</li>;
                            })}
                        </ul>
                    </div>
                )}

                <div className="mb-8 space-y-2 text-[#44475B]">
                    {location && <p><span className="font-bold">Job Location :</span> <span className="text-[#7A7A7A]">{location}</span></p>}
                    <p><span className="font-bold">Address :</span> <span className="text-[#7A7A7A]">CP-61 Viraj Khand, Gomti Nagar, Lucknow (UP)-226010</span></p>
                    {vacancyType && <p><span className="font-bold">Vacancy Type :</span> <span className="text-[#7A7A7A]">{vacancyType}</span></p>}
                    {pkg && <p><span className="font-bold">Package :</span> <span className="text-[#7A7A7A]">{pkg}</span></p>}
                    {exp && <p><span className="font-bold">Minimum Experience :</span> <span className="text-[#7A7A7A]">{exp}</span></p>}
                    {qualification && <p><span className="font-bold">Qualification :</span> <span className="text-[#7A7A7A]">{qualification}</span></p>}
                </div>

                <div className="mb-12">
                    <p className="text-[#44475B] text-lg mb-2">
                        You can send in your resume to <a href="mailto:hrd@bfccapital.com" className="text-[#011EFE]">hrd@bfccapital.com</a>
                    </p>
                    {jdFileBase64 && (
                        <DownloadJDButton
                            base64Data={jdFileBase64}
                            fileName={jdFileName || `${jobRole.replace(/\s+/g, '_')}_JD.pdf`}
                        />
                    )}
                </div>

                <ApplyJobForm defaultPost={jobRole} />
            </>
        );
    };

    const getJobTitle = () => {
        return jobRole;
    };

    return (
        <div className="flex flex-col min-h-screen font-sans bg-[#F8F9FA]">
            <Navbar />

            <main className="flex-grow">
                <div className="container mx-auto px-4 md:px-8 py-8 md:py-12 max-w-6xl">
                    <nav className="flex items-center text-sm mb-8">
                        <Link
                            href="/"
                            className="font-semibold"
                            style={{
                                background: "linear-gradient(90deg, #024B39 39.5%, #011EFE 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                color: "transparent"
                            }}
                        >
                            Home
                        </Link>
                        <svg width="0" height="0">
                            <linearGradient id="chevron-gradient" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="39.5%" stopColor="#024B39" />
                                <stop offset="100%" stopColor="#011EFE" />
                            </linearGradient>
                        </svg>

                        <ChevronRight
                            className="h-4 w-4 mx-2"
                            style={{ stroke: "url(#chevron-gradient)" }}
                        />
                        <Link
                            href="/career"
                            className="font-semibold"
                            style={{
                                background: "linear-gradient(90deg, #024B39 39.5%, #011EFE 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                color: "transparent"
                            }}
                        >
                            Career
                        </Link>
                        <ChevronRight
                            className="h-4 w-4 mx-2"
                            style={{ stroke: "url(#chevron-gradient)" }}
                        />
                        <span className="text-[#7A7A7A] font-semibold">{getJobTitle()}</span>
                    </nav>

                    {renderJobDetails()}
                </div>
            </main>

            <Footer />
        </div>
    );
}
