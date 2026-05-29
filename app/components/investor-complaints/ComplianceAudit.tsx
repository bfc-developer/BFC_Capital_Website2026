import React from 'react';

const ComplianceAudit = () => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);

    const monthYear = `${lastMonth.toLocaleString("default", { month: "long" })}, ${lastMonth.getFullYear()}`;

    // Generate up to 6 months of data ending at lastMonth, but no earlier than Jan 2026.
    const monthNames = ["Jan", "Feb", "March", "April", "May", "June", "July", "August", "Sept", "Oct", "Nov", "Dec"];
    const monthlyTrendData = [];
    for (let i = 5; i >= 0; i--) {
        const d = new Date(lastMonth.getFullYear(), lastMonth.getMonth() - i);
        if (d.getFullYear() < 2026) continue;
        monthlyTrendData.push({
            monthStr: `${monthNames[d.getMonth()]}, ${d.getFullYear()}`,
        });
    }
    return (
        <div className="container mx-auto px-4 py-8 md:py-12 md:px-15 lg:px-20">

            <div className="mb-12 pt-4">
                <h2 className="font-bold text-[#44475B] mb-6 text-[20px] md:text-3xl lg:text-4xl">
                    Compliance Audit Status
                </h2>
                <p className='mb-4 text-[#44475B] font-semibold'>“Disclosure with respect to compliance with Annual compliance audit requirement under Regulation 19(3) of <span aria-label="Sebi">SEBI</span> (Investment Advisers) Regulations, 2013 for last financial years are as under:</p>
                <div className="overflow-x-auto rounded-lg bg-[#FFFFFF] shadow-sm border border-gray-100 rounded-[16px]">
                    <table className="w-full text-sm text-left text-[#212121]">
                        <thead>
                            <tr
                                className="text-[#334155] border-b border-gray-100"
                                style={{ background: 'linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)' }}
                            >
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold text-left" aria-label="Serial Number">Sr.No.</th>
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold text-left">Financial Year</th>
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold text-left">Compliance Audit Status</th>
                                <th className="px-6 py-4 text-[#4D4D4D] font-bold text-left">Remarks, If any</th>

                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="px-6 py-4 font-bold text-left">1</td>
                                <td className="px-6 py-4 text-[#212121] font-semibold text-left">1</td>
                                <td className="px-6 py-4 font-semibold text-left">FY 2025-26</td>
                                <td className="px-6 py-4 font-semibold text-left">N/A</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
    );
};

export default ComplianceAudit;
