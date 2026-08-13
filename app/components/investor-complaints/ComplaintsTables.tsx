"use client";

import React, { useState, useEffect } from 'react';

const ComplaintsTables = () => {
    const [monthlyTrendData, setMonthlyTrendData] = useState<{ monthStr: string }[]>([]);

    useEffect(() => {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth(); // 0 = Jan, 1 = Feb, ..., 11 = Dec
        const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"];
        const data = [];

        // Financial cycle: Starts in April (month index 3) and continues across year-end until next April
        // If month is May (4) or later, cycle started in April of currentYear.
        // If month is April (3) or earlier (Jan - Apr), cycle started in April of previous year.
        const fyStartYear = currentMonth >= 4 ? currentYear : currentYear - 1;

        const startDate = new Date(fyStartYear, 3, 1); // April 1st
        const endDate = new Date(currentYear, currentMonth - 1, 1); // Previous month

        const cursor = new Date(startDate);
        while (cursor <= endDate) {
            data.push({
                monthStr: `${monthNames[cursor.getMonth()]}, ${cursor.getFullYear()}`,
            });
            cursor.setMonth(cursor.getMonth() + 1);
        }

        setMonthlyTrendData(data);
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 md:py-12 md:px-15 lg:px-20">
            <div className="mb-12">
                <h2 className="font-bold text-[#44475B] mb-6 text-[20px] md:text-3xl lg:text-4xl">
                    Trend of monthly disposal of complaints
                </h2>
                <div 
                    className="overflow-x-auto rounded-lg bg-[#FFFFFF] shadow-sm border border-gray-100 rounded-[16px]"
                    tabIndex={0}
                    role="region"
                    aria-label="Monthly complaints disposal trend table container"
                >
                    <table className="w-full text-sm text-left">
                        <thead className="text-gray-800 font-bold text-xs" style={{ background: 'linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)' }}>
                            <tr className='border-b border-gray-100'>
                                <th className="px-6 py-4 text-[#4D4D4D] text-left" aria-label="Serial Number">Sr.No.</th>
                                <th className="px-6 py-4 text-[#4D4D4D] text-left">Month</th>
                                <th className="px-6 py-4 text-[#4D4D4D] text-left">Carried forward from previous month</th>
                                <th className="px-6 py-4 text-[#4D4D4D] text-left">Received</th>
                                <th className="px-6 py-4 text-[#4D4D4D] text-left">Resolved*</th>
                                <th className="px-6 py-4 text-[#4D4D4D] text-left">Pending#</th>
                            </tr>
                        </thead>

                        <tbody>
                            {monthlyTrendData.map((data, index) => (
                                <tr key={index}>
                                    <td className="px-6 py-4 text-[#212121] font-semibold text-left">{index + 1}</td>
                                    <td className="px-6 py-4 text-[#212121] font-semibold text-left">{data.monthStr}</td>
                                    <td className="px-6 py-4 text-[#212121] font-semibold text-left">0</td>
                                    <td className="px-6 py-4 text-[#212121] font-semibold text-left">0</td>
                                    <td className="px-6 py-4 text-[#212121] font-semibold text-left">0</td>
                                    <td className="px-6 py-4 text-[#212121] font-semibold text-left">0</td>
                                </tr>
                            ))}
                            <tr
                                className="text-[#4D4D4D] border-b border-gray-100"
                                style={{
                                    background:
                                        "linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)",
                                }}
                            >
                                <td className="py-[10px] text-[13px]"></td>
                                <td className="px-6 py-4 text-[#4D4D4D] text-left">
                                    Grand Total
                                </td>
                                <td className="px-6 py-4 text-[#4D4D4D] text-left">0</td>
                                <td className="px-6 py-4 text-[#4D4D4D] text-left">0</td>
                                <td className="px-6 py-4 text-[#4D4D4D] text-left">0</td>
                                <td className="px-6 py-4 text-[#4D4D4D] text-left">
                                    N/A
                                </td>
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
                <div 
                    className="overflow-x-auto rounded-lg bg-[#FFFFFF] shadow-sm border border-gray-100 rounded-[16px]"
                    tabIndex={0}
                    role="region"
                    aria-label="Annual complaints disposal trend table container"
                >
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-gray-800 font-bold text-xs" style={{ background: 'linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)' }}>
                            <tr className='border-b border-gray-100'>
                                <th className="px-6 py-4 text-[#4D4D4D] text-left" aria-label="Serial Number">Sr.No.</th>
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
                            <tr
                                className="text-[#4D4D4D] border-b border-gray-100"
                                style={{
                                    background:
                                        "linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)",
                                }}
                            >
                                <td className="py-[10px] text-[13px]"></td>
                                <td className="px-6 py-4 text-[#4D4D4D] text-left">
                                    Grand Total
                                </td>
                                <td className="px-6 py-4 text-[#4D4D4D] text-left">0</td>
                                <td className="px-6 py-4 text-[#4D4D4D] text-left">0</td>
                                <td className="px-6 py-4 text-[#4D4D4D] text-left">0</td>
                                <td className="px-6 py-4 text-[#4D4D4D] text-left">
                                    N/A
                                </td>
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
