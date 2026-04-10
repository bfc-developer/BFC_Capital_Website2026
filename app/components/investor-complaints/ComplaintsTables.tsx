import React from 'react';

const ComplaintsTables = () => {
    const now = new Date();

    const month = now.toLocaleString("default", { month: "long" });
    const year = now.getFullYear();

    const monthYear = `${month}, ${year}`;
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 md:px-15 lg:px-20">
            <h1 className="mb-2 text-[25px] md:text-3xl lg:text-5xl font-bold text-[#44475B] font-inter md:pb-5">
                Investor Complaints: Investment Advisory
            </h1>

            <div className="mb-12 pt-4">
                <h2 className="font-bold text-[#44475B] mb-6 text-[20px] md:text-3xl lg:text-4xl">
                    Data for the month ending {monthYear}
                </h2>
                <div className="overflow-x-auto rounded-lg bg-[#FFFFFF] shadow-sm border border-gray-100 rounded-[16px]">
                    <table className="w-full text-sm text-left text-[#212121]">
                        <thead>
                            <tr
                                className="text-[#334155] border-b border-gray-100"
                                style={{ background: 'linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)' }}
                            >
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold text-left">Sr.No.</th>
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold text-left">Received from</th>
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold text-left">Pending at the end<br />of last month</th>
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold text-left">Received</th>
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold text-left">Resolved*</th>
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold text-left">Total Pending#</th>
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold text-left">Pending complaints<br /> &gt; 3months</th>
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold text-left">Average Resolution<br />time^ (in days)</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="px-6 py-4 font-bold text-left">1</td>
                                <td className="px-6 py-4 text-[#212121] font-semibold text-left">Directly from Investors</td>
                                <td className="px-6 py-4 font-semibold text-left">0</td>
                                <td className="px-6 py-4 font-semibold text-left">0</td>
                                <td className="px-6 py-4 font-semibold text-left">0</td>
                                <td className="px-6 py-4 font-semibold text-left">0</td>
                                <td className="px-6 py-4 font-semibold text-left">0</td>
                                <td className="px-6 py-4 text-left font-semibold">N/A</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-bold text-left">2</td>
                                <td className="px-6 py-4 text-[#212121] font-semibold text-left">SEBI (SCORES)</td>
                                <td className="px-6 py-4 font-semibold text-left">0</td>
                                <td className="px-6 py-4 font-semibold text-left">0</td>
                                <td className="px-6 py-4 font-semibold text-left">0</td>
                                <td className="px-6 py-4 font-semibold text-left">0</td>
                                <td className="px-6 py-4 font-semibold text-left">0</td>
                                <td className="px-6 py-4 text-left font-semibold">N/A</td>
                            </tr>
                            <tr>
                                <td className="px-6 py-4 font-bold text-left">3</td>
                                <td className="px-6 py-4 text-[#212121] font-semibold text-left">Other Sources (if any)</td>
                                <td className="px-6 py-4 font-semibold text-left">0</td>
                                <td className="px-6 py-4 font-semibold text-left">0</td>
                                <td className="px-6 py-4 font-semibold text-left">0</td>
                                <td className="px-6 py-4 font-semibold text-left">0</td>
                                <td className="px-6 py-4 font-semibold text-left">0</td>
                                <td className="px-6 py-4 text-left font-semibold">N/A</td>
                            </tr>
                            <tr className="text-[#212121] border-t border-gray-100" style={{ background: 'linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)' }}>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4 text-[#212121] font-semibold text-left">Grand Total</td>
                                <td className="px-6 py-4 text-[#212121] font-semibold text-left">0</td>
                                <td className="px-6 py-4 text-[#212121] font-semibold text-left">0</td>
                                <td className="px-6 py-4 text-[#212121] font-semibold text-left">0</td>
                                <td className="px-6 py-4 text-[#212121] font-semibold text-left">0</td>
                                <td className="px-6 py-4 text-[#212121] font-semibold text-left">0</td>
                                <td className="px-6 py-4 text-[#212121] font-semibold text-left">N/A</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
                <div className="mt-2 text-xs space-y-1 text-[#333333]">
                    <p>* Inclusive of complaints of previous months resolved in the current month. <br />
                        # Inclusive of complaints pending as on the last day of the month <br />
                        ^ Average Resolution time is the sum total of time taken to resolve each complaint in days, in the current month divided by total number of complaints resolved in the current month.</p>
                </div>
            </div>

            <div className="mb-12">
                <h2 className="font-bold text-[#44475B] mb-6 text-[20px] md:text-3xl lg:text-4xl">
                    Trend of monthly disposal of complaints
                </h2>
                <div className="overflow-x-auto rounded-lg bg-[#FFFFFF] shadow-sm border border-gray-100 rounded-[16px]">
                    <table className="w-full text-sm text-left">
                        <thead className="text-gray-800 font-bold text-xs" style={{ background: 'linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)' }}>
                            <tr className='border-b border-gray-100'>
                                <th className="px-6 py-4 text-[#4D4D4D] text-left">Sr.No.</th>
                                <th className="px-6 py-4 text-[#4D4D4D] text-left">Month</th>
                                <th className="px-6 py-4 text-[#4D4D4D] text-left">Carried forward from previous month</th>
                                <th className="px-6 py-4 text-[#4D4D4D] text-left">Received</th>
                                <th className="px-6 py-4 text-[#4D4D4D] text-left">Resolved*</th>
                                <th className="px-6 py-4 text-[#4D4D4D] text-left">Pending#</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="px-6 py-4 text-[#212121] font-semibold text-left">1</td>
                                <td className="px-6 py-4 text-[#212121] font-semibold text-left">Jan, 2026</td>
                                <td className="px-6 py-4 text-[#212121] font-semibold text-left">0</td>
                                <td className="px-6 py-4 text-[#212121] font-semibold text-left">0</td>
                                <td className="px-6 py-4 text-[#212121] font-semibold text-left">0</td>
                                <td className="px-6 py-4 text-[#212121] font-semibold text-left">0</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
                <div className="mt-2 text-xs text-gray-500 space-y-1">
                    <p>*Inclusive of complaints of previous months resolved in the current month.</p>
                    <p>#Inclusive of complaints pending as on the last day of the month.</p>
                </div>
            </div>

            <div className="mb-12">
                <h2 className="font-bold text-[#44475B] mb-6 text-[20px] md:text-3xl lg:text-4xl">
                    Trend of annually disposal of complaints
                </h2>
                <div className="overflow-x-auto rounded-lg bg-[#FFFFFF] shadow-sm border border-gray-100 rounded-[16px]">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-gray-800 font-bold text-xs" style={{ background: 'linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)' }}>
                            <tr className='border-b border-gray-100'>
                                <th className="px-6 py-4 text-[#4D4D4D] text-left">Sr.No.</th>
                                <th className="px-6 py-4 text-[#4D4D4D] text-left">Year</th>
                                <th className="px-6 py-4 text-[#4D4D4D] text-left">Carried forward from previous year</th>
                                <th className="px-6 py-4 text-[#4D4D4D] text-left">Received</th>
                                <th className="px-6 py-4 text-[#4D4D4D] text-left">Resolved**</th>
                                <th className="px-6 py-4 text-[#4D4D4D] text-left">Pending##</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="px-6 py-4 text-[#212121] text-left font-semibold">1</td>
                                <td className="px-6 py-4 font-medium text-[#212121] text-left font-semibold">2025-26</td>
                                <td className="px-6 py-4 text-[#212121] text-left font-semibold">0</td>
                                <td className="px-6 py-4 text-[#212121] text-left font-semibold">0</td>
                                <td className="px-6 py-4 text-[#212121] text-left font-semibold">0</td>
                                <td className="px-6 py-4 text-[#212121] text-left font-semibold">0</td>
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
