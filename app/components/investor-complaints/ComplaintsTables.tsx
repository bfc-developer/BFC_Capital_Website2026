import React from 'react';

const ComplaintsTables = () => {
    return (
        <div className="container mx-auto px-4 py-12 max-w-5xl">
            <h1 className="text-3xl font-bold text-gray-800 mb-12 text-center text-bfc-blue">
                Investor Complaints: Investment Advisory
            </h1>

            {/* Table 1: Data for the month */}
            <div className="mb-12">
                <h2 className="text-xl font-bold text-gray-700 mb-6">
                    Data for the month ending January, 2026
                </h2>
                <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="bg-blue-100 text-gray-800 uppercase font-bold text-xs">
                            <tr>
                                <th className="px-6 py-4">Sr.No.</th>
                                <th className="px-6 py-4">Received from</th>
                                <th className="px-6 py-4">Pending at the end<br />of last month</th>
                                <th className="px-6 py-4">Received</th>
                                <th className="px-6 py-4">Resolved*</th>
                                <th className="px-6 py-4">Total Pending#</th>
                                <th className="px-6 py-4">Pending complaints<br /> &gt; 3months</th>
                                <th className="px-6 py-4">Average Resolution<br />time^ (in days)</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                                <td className="px-6 py-4">1</td>
                                <td className="px-6 py-4 font-medium">Directly from Investors</td>
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
                            <tr className="bg-gray-50 font-bold">
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4">Grand Total</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">NA</td>
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
                <h2 className="text-xl font-bold text-gray-700 mb-6">
                    Trend of monthly disposal of complaints
                </h2>
                <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="bg-blue-100 text-gray-800 uppercase font-bold text-xs">
                            <tr>
                                <th className="px-6 py-4">Sr.No.</th>
                                <th className="px-6 py-4">Month</th>
                                <th className="px-6 py-4">Carried forward from previous month</th>
                                <th className="px-6 py-4">Received</th>
                                <th className="px-6 py-4">Resolved*</th>
                                <th className="px-6 py-4">Pending#</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                                <td className="px-6 py-4">1</td>
                                <td className="px-6 py-4 font-medium">Jan, 2026</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
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
                <h2 className="text-xl font-bold text-gray-700 mb-6">
                    Trend of annually disposal of complaints
                </h2>
                <div className="overflow-x-auto rounded-lg shadow border border-gray-200">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="bg-blue-100 text-gray-800 uppercase font-bold text-xs">
                            <tr>
                                <th className="px-6 py-4">Sr.No.</th>
                                <th className="px-6 py-4">Year</th>
                                <th className="px-6 py-4">Carried forward from previous year</th>
                                <th className="px-6 py-4">Received</th>
                                <th className="px-6 py-4">Resolved**</th>
                                <th className="px-6 py-4">Pending##</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            <tr>
                                <td className="px-6 py-4">1</td>
                                <td className="px-6 py-4 font-medium">2025-26</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
                                <td className="px-6 py-4">0</td>
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
