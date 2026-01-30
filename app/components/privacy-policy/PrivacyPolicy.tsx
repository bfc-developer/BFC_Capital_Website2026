import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 md:px-45">

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
                <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                <span className="text-gray-500">Privacy Policy</span>
            </nav>
        </div>
    );
}