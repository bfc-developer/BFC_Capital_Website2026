import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { GradientSpinner } from "../../components/common/GlobalLoader";

export default function Loading() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-[#F8F9FA]">
            <Navbar />
            <main className="flex-grow flex items-center justify-center">
                <div className="flex flex-col items-center">
                    <GradientSpinner />
                </div>
            </main>
            <Footer />
        </div>
    );
}
