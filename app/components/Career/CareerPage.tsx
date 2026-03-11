
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function CareerPage() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 md:py-12 md:px-15 lg:px-20">

                {/* Breadcrumb */}
                <nav className="flex items-center text-sm mb-8">
                    <Link
                        href="/"
                        className="font-semibold"
                        style={{
                            background: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            color: "transparent"
                        }}
                    >
                        Home
                    </Link>
                    <ChevronRight className="h-4 w-4 mx-2 text-[#7A7A7A]" />
                    <span className="text-[#7A7A7A]">Career</span>
                </nav>

                {/* Title */}
                <h1 className="text-[25px] md:text-3xl lg:text-4xl font-bold text-[#44475B] mb-5 md:mb-8">
                    Career
                </h1>
            </div>
        </>
    );
}