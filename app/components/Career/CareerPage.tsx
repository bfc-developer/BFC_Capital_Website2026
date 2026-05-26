import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Briefcase, MapPin, ArrowRight } from "lucide-react";

export default async function CareerPage() {
    const res = await fetch("https://hrms-bfc-capital2026.vercel.app/api/job-postings", { cache: 'no-store' });
    const data = await res.json();
    const jobOpenings = data.jobPostings;
    // const jobOpenings = [
    //     {
    //         title: "Wealth Manager",
    //         experience: "Min. 1 Year",
    //         location: "Lucknow",
    //         slug: "wealth-manager",
    //     },
    //     {
    //         title: "Relationship Manager",
    //         experience: "Min. 1 Year",
    //         location: "Lucknow",
    //         slug: "relationship-manager",
    //     },
    // {
    //     title: "Virtual Relationship Manager",
    //     experience: "Min. 1 Year",
    //     location: "Lucknow",
    //     slug: "virtual-relationship-manager",
    // },
    // {
    //     title: "Business Development Manager",
    //     experience: "Min. 1 Year",
    //     location: "Lucknow",
    //     slug: "business-development-manager",
    // },
    // ];

    return (
        <div className="flex flex-col w-full">
            {/* Hero Section */}
            {/* On mobile, use a min-height so content doesn't get cut off. On md and lg, use calc(100vh - 80px) assuming navbar is 80px */}
            <div className="relative w-full aspect-[16/7]">
                {/* Background Image */}
                <Image
                    src="/Career/blurPeople.webp"
                    alt="Career Background"
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                />

                {/* Gradient Overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(269.9deg, rgba(6, 163, 88, 0.8) 24.53%, rgba(0, 30, 254, 0.8) 156.82%)"
                    }}
                />

                {/* Hero Content */}
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6 md:px-12 py-12 md:py-0 max-w-5xl mx-auto">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        Career
                    </h1>
                    <p className="text-white text-base md:text-lg lg:text-xl font-medium leading-relaxed max-w-4xl">
                        We deal in the field of Wealth Management and therefore quality of the company
                        depends upon the quality of manpower working with it. The company regularly and
                        continuously strives to upgrade the skills and efficiency of its work force and provides
                        its employees a process-driven atmosphere to perform. The HR Policies of the company
                        are one of the best in the industry and are known for their transparency.
                    </p>
                </div>
            </div>

            {/* Current Openings Section */}
            <div className="container mx-auto px-4 py-16 md:py-20 lg:px-20">
                <h2 className="text-[20px] md:text-3xl lg:text-5xl font-bold text-[#44475B] mb-10">
                    Current Openings

                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

                    {jobOpenings?.map((job: any, index: number) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow duration-300"
                        >
                            <h3 className="text-xl font-semibold text-[#44475B] mb-6 min-h-[56px]">
                                {job.jobRole}
                            </h3>

                            <div className="space-y-3 mb-8 flex-grow">
                                <div className="flex items-center gap-2 text-[#7A7A7A]">
                                    <Image src="/Career/portfolio2.png" alt="Experience" width={20} height={20} />
                                    <span className="text-sm">Exp. - {job.exp}</span>
                                </div>
                                <div className="flex items-center gap-2 text-[#7A7A7A]">
                                    <Image src="/Career/pin1.png" alt="Location" width={20} height={20} />
                                    <span className="text-sm">{job.location}</span>
                                </div>
                            </div>

                            <Link href={`/career/${job.jobRole.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="w-full bg-gray-50 flex items-center justify-center py-2.5 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors group">
                                <span className="bg-gradient-to-r from-[#024B39] to-[#011EFE] bg-clip-text text-transparent group-hover:opacity-80">
                                    View More
                                </span>
                                <ArrowRight className="w-4 h-4 ml-2 text-[#011EFE] group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}