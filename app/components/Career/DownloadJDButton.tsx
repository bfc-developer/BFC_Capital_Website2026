"use client";

import React from "react";

interface Props {
    url: string;
    fileName: string;
}

export default function DownloadJDButton({ url, fileName }: Props) {
    const handleDownload = (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            if (!url) return;
            // Open the PDF URL directly in a new tab
            const newTab = window.open(url, "_blank");
            if (newTab) {
                newTab.focus();
            } else {
                alert("Please allow popups for this website to view the Job Description.");
            }
        } catch (error) {
            console.error("Failed to open JD", error);
            alert("Failed to view the Job Description. Please try again.");
        }
    };

    return (
        <button 
            onClick={handleDownload}
            className="text-[#011EFE] text-lg hover:underline block cursor-pointer bg-transparent border-none p-0 text-left"
            aria-label="Click here to download and view the detailed Job Description PDF"
        >
            Click here to view detailed JD
        </button>
    );
}
