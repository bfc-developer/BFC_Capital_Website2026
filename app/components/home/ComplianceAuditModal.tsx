"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ComplianceAuditModalProps {
  /** Optional delay in milliseconds before the modal opens (default: 400ms) */
  delay?: number;
}

export default function ComplianceAuditModal({
  delay = 400,
}: ComplianceAuditModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [monthYear, setMonthYear] = useState("");

  useEffect(() => {
    // Show only once per browser session
    const hasSeen = sessionStorage.getItem("hasSeenComplianceAuditModal");
    if (hasSeen) return;

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  // Lock background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
    setMonthYear(
      `${lastMonth.toLocaleString("default", { month: "long" })}, ${lastMonth.getFullYear()}`
    );
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenComplianceAuditModal", "true");
  };

  const data = [
    {
      sr: 1,
      from: "Directly from Investors",
      lastMonth: 0,
      received: 0,
      resolved: 0,
      totalPending: 0,
      pending3Months: 0,
      avgTime: "N/A",
    },
    {
      sr: 2,
      from: "SEBI (SCORES)",
      lastMonth: 0,
      received: 0,
      resolved: 0,
      totalPending: 0,
      pending3Months: 0,
      avgTime: "N/A",
    },
    {
      sr: 3,
      from: "Other Sources (if any)",
      lastMonth: 0,
      received: 0,
      resolved: 0,
      totalPending: 0,
      pending3Months: 0,
      avgTime: "N/A",
    },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4 py-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <div
        className="relative max-w-6xl w-full mx-auto bg-white p-6 md:p-8 shadow-2xl border border-gray-100 rounded-[24px] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 cursor-pointer opacity-60 hover:opacity-100 transition-opacity z-10 p-2"
          aria-label="Close compliance audit modal"
        >
          <Image src="/Home/X.svg" alt="Close icon" width={28} height={28} />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6 px-4">
          <h2 className="text-[20px] md:text-2xl lg:text-3xl font-extrabold text-[#44475B] tracking-tight">
            Number of Complaints as per <span aria-label="Sebi">SEBI</span> Guidelines
          </h2>
          <p className="text-[#44475B] text-sm md:text-base mt-2">
            Data for the month ending {monthYear || "..."}
          </p>
        </div>

        {/* Table Container */}
        <div
          className="w-full overflow-x-auto shadow-sm border border-gray-100 rounded-[16px]"
          tabIndex={0}
          role="region"
          aria-label="Investor complaints table container"
        >
          <table
            className="w-full text-center border-collapse"
            aria-label="Table summarizing complaints received, pending status, and resolution time as per Sebi Guidelines"
          >
            <thead>
              <tr
                className="text-[#4D4D4D] border-b border-gray-100 bg-[#E6F0FA]"
                style={{
                  background:
                    "linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)",
                }}
              >
                <th
                  className="py-[10px] text-[12px] w-[70px] font-extrabold tracking-tight text-center whitespace-nowrap"
                  aria-label="Serial Number"
                >
                  Sr.No.
                </th>
                <th className="py-[10px] text-[12px] font-extrabold tracking-tight text-left whitespace-nowrap">
                  Received from
                </th>
                <th className="py-[10px] text-[12px] font-extrabold tracking-tight text-left">
                  Pending at the end
                  <br />
                  of last month
                </th>
                <th className="py-[10px] text-[12px] font-extrabold tracking-tight text-left">
                  Received
                </th>
                <th className="py-[10px] text-[12px] font-extrabold tracking-tight text-left">
                  Resolved*
                </th>
                <th className="py-[10px] text-[12px] font-extrabold tracking-tight text-left">
                  Total Pending#
                </th>
                <th className="py-[10px] text-[12px] font-extrabold tracking-tight text-left">
                  Pending complaints
                  <br />
                  {">"} 3months
                </th>
                <th className="py-[10px] text-[12px] font-extrabold tracking-tight text-left">
                  Average Resolution
                  <br />
                  time^ (in days)
                </th>
              </tr>
            </thead>
            <tbody className="text-[#212121] bg-[#FFFFFF]">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-[12px] px-[17px] text-sm font-bold text-left">
                    {row.sr}
                  </td>
                  <td className="py-[12px] text-sm font-semibold text-left text-gray-700 whitespace-nowrap">
                    {row.from === "SEBI (SCORES)" ? (
                      <>
                        <span aria-label="Sebi">SEBI</span> (SCORES)
                      </>
                    ) : (
                      row.from
                    )}
                  </td>
                  <td className="py-[12px] text-sm font-bold text-left">
                    {row.lastMonth}
                  </td>
                  <td className="py-[12px] text-sm font-bold text-left">
                    {row.received}
                  </td>
                  <td className="py-[12px] text-sm font-bold text-left">
                    {row.resolved}
                  </td>
                  <td className="py-[12px] text-sm font-bold text-left">
                    {row.totalPending}
                  </td>
                  <td className="py-[12px] text-sm font-bold text-left">
                    {row.pending3Months}
                  </td>
                  <td className="py-[12px] text-sm font-bold text-[#44475B] text-left">
                    {row.avgTime}
                  </td>
                </tr>
              ))}
              <tr
                className="text-[#4D4D4D] border-b border-gray-100 bg-[#E6F0FA]"
                style={{
                  background:
                    "linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)",
                }}
              >
                <td className="py-[10px] text-[13px]"></td>
                <td className="py-[10px] text-[13px] text-left font-bold tracking-tight">
                  Grand Total
                </td>
                <td className="py-[10px] text-[13px] font-bold text-left">0</td>
                <td className="py-[10px] text-[13px] font-bold text-left">0</td>
                <td className="py-[10px] text-[13px] font-bold text-left">0</td>
                <td className="py-[10px] text-[13px] font-bold text-left">0</td>
                <td className="py-[10px] text-[13px] font-bold text-left">0</td>
                <td className="py-[10px] text-[13px] text-[#44475B] font-bold uppercase text-left">
                  N/A
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
