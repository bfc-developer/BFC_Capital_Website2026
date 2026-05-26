import Link from "next/link";
import { ChevronRight } from "lucide-react";
export default function BankDetails() {
    return (
        <>
            <div className="container mx-auto px-4 py-8 md:py-12 md:px-15 lg:px-20">
                {/* Breadcrumb */}
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
                    <span
                        className="font-semibold"
                        style={{
                            background: "linear-gradient(90deg, #024B39 39.5%, #011EFE 100%)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            color: "transparent"
                        }}
                    >
                        Compliances
                    </span>
                    <ChevronRight
                        className="h-4 w-4 mx-2"
                        style={{ stroke: "url(#chevron-gradient)" }}
                    />
                    <span className="text-[#7A7A7A] font-semibold">Bank Details</span>
                </nav>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-[#44475B] mb-6 leading-tight">
                    Details of the Company&rsquo;s Bank Account
                </h1>

                {/* Bank Details Table */}
                <div className="overflow-x-auto border border-[#E5E7EB] rounded-2xl shadow-sm mb-8">
                    <table className="min-w-full divide-y divide-[#E5E7EB] text-center text-sm text-[#44475B]">
                        <thead className="text-gray-800 font-bold text-xs" style={{ background: 'linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)' }}>
                            <tr>
                                <th scope="col" className="px-6 py-4 font-bold text-[13px] md:text-sm leading-tight border-r border-[#E5E7EB]">
                                    A/C Holder Name
                                </th>
                                <th scope="col" className="px-6 py-4 font-bold text-[13px] md:text-sm leading-tight border-r border-[#E5E7EB]">
                                    Bank Name
                                </th>
                                <th scope="col" className="px-6 py-4 font-bold text-[13px] md:text-sm leading-tight border-r border-[#E5E7EB]">
                                    Bank Account No.
                                </th>
                                <th scope="col" className="px-6 py-4 font-bold text-[13px] md:text-sm leading-tight border-r border-[#E5E7EB]">
                                    IFSC Code
                                </th>
                                <th scope="col" className="px-6 py-4 font-bold text-[13px] md:text-sm leading-tight border-r border-[#E5E7EB]">
                                    Branch
                                </th>
                                <th scope="col" className="px-6 py-4 font-bold text-[13px] md:text-sm leading-tight">
                                    Valid UPI Id
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            <tr className="font-semibold text-[#000000]">
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px]">
                                    BFC CAPITAL PRIVATE LIMITED
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px]">
                                    IDFC First Bank
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px]">
                                    10278121060
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px]">
                                    IDFB0021266
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px]">
                                    Alambagh, Lucknow
                                </td>
                                <td className="px-6 py-4 border-r border-[#E5E7EB] text-[13px] md:text-[14px]">
                                    bfccapital.ia@valididfc
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Info Text */}
                <div className="text-[15px] md:text-[16px] text-[#44475B] leading-relaxed space-y-4">
                    <p>
                        Please use the verified bank account and UPI details below for payment of Investment Advisor (IA) fees.
                    </p>
                    <p>
                        This is the company&rsquo;s official and verified UPI handle for all investment advisory fee-related transactions.
                    </p>
                </div>
            </div>
        </>
    );
}