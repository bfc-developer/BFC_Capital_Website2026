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
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 md:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={handleClose}
    >
      <div
        className="relative max-w-5xl w-full mx-auto bg-white p-4 sm:p-6 md:p-8 shadow-2xl border border-gray-100 rounded-2xl md:rounded-[24px] max-h-[92vh] flex flex-col my-auto overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 sm:right-4 sm:top-4 cursor-pointer opacity-60 hover:opacity-100 transition-opacity z-10 p-1.5 sm:p-2 rounded-full hover:bg-gray-100"
          aria-label="Close compliance audit modal"
        >
          <Image
            src="/Home/X.svg"
            alt="Close icon"
            width={24}
            height={24}
            className="w-5 h-5 sm:w-6 sm:h-6"
          />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4 sm:mb-6 px-6 sm:px-8">
          <h2 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-extrabold text-[#44475B] tracking-tight leading-snug">
            Number of Complaints as per <span aria-label="Sebi">SEBI</span> Guidelines
          </h2>
          <p className="text-[#44475B] text-xs sm:text-sm md:text-base mt-1 sm:mt-2">
            Data for the month ending {monthYear || "..."}
          </p>
        </div>

        {/* Table Container */}
        <div
          className="w-full overflow-x-auto shadow-sm border border-gray-100 rounded-xl sm:rounded-[16px]"
          tabIndex={0}
          role="region"
          aria-label="Investor complaints table container"
        >
          <table
            className="w-full min-w-[760px] text-center border-collapse"
            aria-label="Table summarizing complaints received, pending status, and resolution time as per Sebi Guidelines"
          >
            <thead>
              <tr
                className="text-[#4D4D4D] border-b border-gray-100"
                style={{
                  background:
                    "linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)",
                }}
              >
                <th
                  className="px-3 py-2.5 sm:py-3 text-[11px] sm:text-xs w-[60px] font-extrabold tracking-tight text-center whitespace-nowrap"
                  aria-label="Serial Number"
                >
                  Sr.No.
                </th>
                <th className="px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs font-extrabold tracking-tight text-left whitespace-nowrap min-w-[180px]">
                  Received from
                </th>
                <th className="px-3 py-2.5 sm:py-3 text-[11px] sm:text-xs font-extrabold tracking-tight text-center leading-tight">
                  Pending at the end
                  <br />
                  of last month
                </th>
                <th className="px-3 py-2.5 sm:py-3 text-[11px] sm:text-xs font-extrabold tracking-tight text-center leading-tight">
                  Received
                </th>
                <th className="px-3 py-2.5 sm:py-3 text-[11px] sm:text-xs font-extrabold tracking-tight text-center leading-tight">
                  Resolved*
                </th>
                <th className="px-3 py-2.5 sm:py-3 text-[11px] sm:text-xs font-extrabold tracking-tight text-center leading-tight">
                  Total Pending#
                </th>
                <th className="px-3 py-2.5 sm:py-3 text-[11px] sm:text-xs font-extrabold tracking-tight text-center leading-tight">
                  Pending complaints
                  <br />
                  {">"} 3months
                </th>
                <th className="px-3 py-2.5 sm:py-3 text-[11px] sm:text-xs font-extrabold tracking-tight text-center leading-tight">
                  Average Resolution
                  <br />
                  time^ (in days)
                </th>
              </tr>
            </thead>
            <tbody className="text-[#212121] bg-[#FFFFFF]">
              {data.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="px-3 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-center text-gray-700">
                    {row.sr}
                  </td>
                  <td className="px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-left text-gray-700 whitespace-nowrap">
                    {row.from === "SEBI (SCORES)" ? (
                      <>
                        <span aria-label="Sebi">SEBI</span> (SCORES)
                      </>
                    ) : (
                      row.from
                    )}
                  </td>
                  <td className="px-3 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-center">
                    {row.lastMonth}
                  </td>
                  <td className="px-3 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-center">
                    {row.received}
                  </td>
                  <td className="px-3 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-center">
                    {row.resolved}
                  </td>
                  <td className="px-3 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-center">
                    {row.totalPending}
                  </td>
                  <td className="px-3 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-center">
                    {row.pending3Months}
                  </td>
                  <td className="px-3 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-[#44475B] text-center">
                    {row.avgTime}
                  </td>
                </tr>
              ))}
              <tr
                className="text-[#4D4D4D] border-t border-gray-100 bg-[#E6F0FA]"
                style={{
                  background:
                    "linear-gradient(270deg, #CFE4F3 0%, #FAFAFA 63.46%)",
                }}
              >
                <td className="px-3 py-2.5 sm:py-3 text-xs sm:text-[13px] text-center"></td>
                <td className="px-4 py-2.5 sm:py-3 text-xs sm:text-[13px] text-left font-bold tracking-tight whitespace-nowrap">
                  Grand Total
                </td>
                <td className="px-3 py-2.5 sm:py-3 text-xs sm:text-[13px] font-bold text-center">0</td>
                <td className="px-3 py-2.5 sm:py-3 text-xs sm:text-[13px] font-bold text-center">0</td>
                <td className="px-3 py-2.5 sm:py-3 text-xs sm:text-[13px] font-bold text-center">0</td>
                <td className="px-3 py-2.5 sm:py-3 text-xs sm:text-[13px] font-bold text-center">0</td>
                <td className="px-3 py-2.5 sm:py-3 text-xs sm:text-[13px] font-bold text-center">0</td>
                <td className="px-3 py-2.5 sm:py-3 text-xs sm:text-[13px] text-[#44475B] font-bold uppercase text-center">
                  N/A
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full mt-4 sm:mt-6 text-left">
          <div className="text-[11px] sm:text-xs md:text-[13px] text-[#44475B] leading-relaxed font-medium space-y-1 sm:space-y-1.5">
            <p>
              * Inclusive of complaints of previous months resolved in the current month.
            </p>
            <p>
              # Inclusive of complaints pending as on the last day of the month.
            </p>
            <p>
              ^ Average Resolution time is the sum total of time taken to resolve each complaint in days, in the current month divided by total number of complaints resolved in the current month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
