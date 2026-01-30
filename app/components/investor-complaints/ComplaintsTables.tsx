import React from 'react';

const ComplaintsTables = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <h1 className="mb-2 text-3xl font-bold text-[#44475B] md:text-4xl lg:text-5xl font-inter pb-5">
                Investor Complaints: Investment Advisory
            </h1>

            {/* Table 1: Data for the month */}
            <div className="mb-12 pt-4">
                <h2 className="text-2xl font-bold text-[#4D4D4D] mb-6">
                    Data for the month ending January, 2026
                </h2>
                <div className="overflow-x-auto rounded-lg ">
                    <table className="w-full text-sm text-left text-[#212121]">
                        <thead className="text-gray-800 uppercase font-bold text-xs" style={{ background: 'linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)' }}>
                            <tr>
                                <th className="px-6 py-4 text-[#4D4D4D]">Sr.No.</th>
                                <th className="px-6 py-4 text-[#4D4D4D]">Received from</th>
                                <th className="px-6 py-4 text-[#4D4D4D]">Pending at the end<br />of last month</th>
                                <th className="px-6 py-4 text-[#4D4D4D]">Received</th>
                                <th className="px-6 py-4 text-[#4D4D4D]">Resolved*</th>
                                <th className="px-6 py-4 text-[#4D4D4D]">Total Pending#</th>
                                <th className="px-6 py-4 text-[#4D4D4D]">Pending complaints<br /> &gt; 3months</th>
                                <th className="px-6 py-4 text-[#4D4D4D]">Average Resolution<br />time^ (in days)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                                <td className="px-6 py-4">1</td>
                                <td className="px-6 py-4 font-medium text-[#4D4D4D]">Directly from Investors</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">NA</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4">2</td>
                                <td className="px-6 py-4 font-medium">SEBI (SCORES)</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">NA</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4">3</td>
                                <td className="px-6 py-4 font-medium">Other Sources (if any)</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">NA</td>
                            </tr>
                            <tr className="font-bold border-t text-[#212121]" style={{ background: 'linear-gradient(270deg, rgba(207, 228, 243, 0.5) 0%, rgba(250, 250, 250, 0.5) 63.46%)' }}>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4 text-[#212121]">Grand Total</td>
                                <td className="px-6 py-4 text-[#212121]">0</td>
                                <td className="px-6 py-4 text-[#212121]">0</td>
                                <td className="px-6 py-4 text-[#212121]">0</td>
                                <td className="px-6 py-4 text-[#212121]">0</td>
                                <td className="px-6 py-4 text-[#212121]">0</td>
                                <td className="px-6 py-4 text-[#212121]">NA</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                    <p>^ Average Resolution time is the sum total of time taken to resolve each complaint in days, in the current month divided by total number of complaints resolved in the current month.</p>
                </div>
            </div>

            {/* Table 2: Monthly Disposal Trend */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#4D4D4D] mb-6">
                    Trend of monthly disposal of complaints
                </h2>
                <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-gray-800 uppercase font-bold text-xs" style={{ background: 'linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)' }}>
                            <tr>
                                <th className="px-6 py-4 text-[#4D4D4D]">Sr.No.</th>
                                <th className="px-6 py-4 text-[#4D4D4D]">Month</th>
                                <th className="px-6 py-4 text-[#4D4D4D]">Carried forward from previous month</th>
                                <th className="px-6 py-4 text-[#4D4D4D]">Received</th>
                                <th className="px-6 py-4 text-[#4D4D4D]">Resolved*</th>
                                <th className="px-6 py-4 text-[#4D4D4D]">Pending#</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                                <td className="px-6 py-4 text-[#4D4D4D]">1</td>
                                <td className="px-6 py-4 text-[#4D4D4D] font-medium">Jan, 2026</td>
                                <td className="px-6 py-4 text-[#4D4D4D]">0</td>
                                <td className="px-6 py-4 text-[#4D4D4D]">0</td>
                                <td className="px-6 py-4 text-[#4D4D4D]">0</td>
                                <td className="px-6 py-4 text-[#4D4D4D]">0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                    <p>*Inclusive of complaints of previous months resolved in the current month.</p>
                    <p>#Inclusive of complaints pending as on the last day of the month.</p>
                </div>
            </div>

            {/* Table 3: Annual Disposal Trend */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#4D4D4D] mb-6">
                    Trend of annually disposal of complaints
                </h2>
                <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-gray-800 uppercase font-bold text-xs" style={{ background: 'linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)' }}>
                            <tr>
                                <th className="px-6 py-4 text-[#4D4D4D]">Sr.No.</th>
                                <th className="px-6 py-4 text-[#4D4D4D]">Year</th>
                                <th className="px-6 py-4 text-[#4D4D4D]">Carried forward from previous year</th>
                                <th className="px-6 py-4 text-[#4D4D4D]">Received</th>
                                <th className="px-6 py-4 text-[#4D4D4D]">Resolved**</th>
                                <th className="px-6 py-4 text-[#4D4D4D]">Pending##</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                                <td className="px-6 py-4 text-[#212121]">1</td>
                                <td className="px-6 py-4 font-medium text-[#212121]">2025-26</td>
                                <td className="px-6 py-4 text-[#212121]">0</td>
                                <td className="px-6 py-4 text-[#212121]">0</td>
                                <td className="px-6 py-4 text-[#212121]">0</td>
                                <td className="px-6 py-4 text-[#212121]">0</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                    <p>**Inclusive of complaints of previous years resolved in the current year.</p>
                    <p>## Inclusive of complaints pending as on the last day of the year.</p>
                </div>
            </div>

        </div>
    );
};

export default ComplaintsTables;
