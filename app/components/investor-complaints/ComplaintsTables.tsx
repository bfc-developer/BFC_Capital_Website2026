import React from 'react';

const ComplaintsTables = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <h1 className="mb-2 text-3xl font-bold text-[#44475B] md:text-4xl lg:text-5xl font-inter pb-5">
                Investor Complaints: Investment Advisory
            </h1>

            {/* Table 1: Data for the month */}
            <div className="mb-12 pt-4">
                <h2 className="text-2xl font-bold text-[#44475B] mb-6 lg:text-4xl">
                    Data for the month ending January, 2026
                </h2>
                <div className="overflow-x-auto rounded-lg ">
                    <table className="w-full text-sm text-left text-[#212121]">
                        <thead>
                            <tr
                                className="text-[#334155] border-b-[1.5px] border-[#ABC3D7] border-opacity-[0.37]"
                                style={{ background: 'linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)' }}
                            >
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold">Sr.No.</th>
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold">Received from</th>
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold">Pending at the end<br />of last month</th>
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold">Received</th>
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold">Resolved*</th>
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold">Total Pending#</th>
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold">Pending complaints<br /> &gt; 3months</th>
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold">Average Resolution<br />time^ (in days)</th>
                            </tr>
                        </thead>

                        <tr>
                            <td className="px-6 py-4 font-bold">1</td>
                            <td className="px-6 py-4 text-[#212121]">Directly from Investors</td>
                            <td className="px-6 py-4 font-semibold">0</td>
                            <td className="px-6 py-4 font-semibold">0</td>
                            <td className="px-6 py-4 font-semibold">0</td>
                            <td className="px-6 py-4 font-semibold">0</td>
                            <td className="px-6 py-4 font-semibold">0</td>
                            <td className="px-6 py-4">NA</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 font-bold">2</td>
                            <td className="px-6 py-4 text-[#212121]">SEBI (SCORES)</td>
                            <td className="px-6 py-4 font-semibold">0</td>
                            <td className="px-6 py-4 font-semibold">0</td>
                            <td className="px-6 py-4 font-semibold">0</td>
                            <td className="px-6 py-4 font-semibold">0</td>
                            <td className="px-6 py-4 font-semibold">0</td>
                            <td className="px-6 py-4">NA</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 font-bold">3</td>
                            <td className="px-6 py-4 text-[#212121]">Other Sources (if any)</td>
                            <td className="px-6 py-4 font-semibold">0</td>
                            <td className="px-6 py-4 font-semibold">0</td>
                            <td className="px-6 py-4 font-semibold">0</td>
                            <td className="px-6 py-4 font-semibold">0</td>
                            <td className="px-6 py-4 font-semibold">0</td>
                            <td className="px-6 py-4">NA</td>
                        </tr>
                        <tr className="text-[#212121]" style={{ background: 'linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)' }}>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4 text-[#212121]">Grand Total</td>
                            <td className="px-6 py-4 text-[#212121] font-semibold">0</td>
                            <td className="px-6 py-4 text-[#212121] font-semibold">0</td>
                            <td className="px-6 py-4 text-[#212121] font-semibold">0</td>
                            <td className="px-6 py-4 text-[#212121] font-semibold">0</td>
                            <td className="px-6 py-4 text-[#212121] font-semibold">0</td>
                            <td className="px-6 py-4 text-[#212121] font-semibold">NA</td>
                        </tr>

                    </table>
                </div>
                <div className="mt-2 text-xs space-y-1 text-[#333333]">
                    <p>^ Average Resolution time is the sum total of time taken to resolve each complaint in days, in the current month divided by total number of complaints resolved in the current month.</p>
                </div>
            </div>

            {/* Table 2: Monthly Disposal Trend */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#44475B] mb-6 lg:text-4xl">
                    Trend of monthly disposal of complaints
                </h2>
                <div className="overflow-x-auto rounded-lg">
                    <table className="w-full text-sm text-left">
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

                        <tr>
                            <td className="px-6 py-4 text-[#212121] font-semibold">1</td>
                            <td className="px-6 py-4 text-[#212121] font-semibold">Jan, 2026</td>
                            <td className="px-6 py-4 text-[#212121] font-semibold">0</td>
                            <td className="px-6 py-4 text-[#212121] font-semibold">0</td>
                            <td className="px-6 py-4 text-[#212121] font-semibold">0</td>
                            <td className="px-6 py-4 text-[#212121] font-semibold">0</td>
                        </tr>

                    </table>
                </div>
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                    <p>*Inclusive of complaints of previous months resolved in the current month.</p>
                    <p>#Inclusive of complaints pending as on the last day of the month.</p>
                </div>
            </div>

            {/* Table 3: Annual Disposal Trend */}
            <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#44475B] mb-6 lg:text-4xl">
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

                        <tr>
                            <td className="px-6 py-4 text-[#212121]">1</td>
                            <td className="px-6 py-4 font-medium text-[#212121]">2025-26</td>
                            <td className="px-6 py-4 text-[#212121]">0</td>
                            <td className="px-6 py-4 text-[#212121]">0</td>
                            <td className="px-6 py-4 text-[#212121]">0</td>
                            <td className="px-6 py-4 text-[#212121]">0</td>
                        </tr>

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
