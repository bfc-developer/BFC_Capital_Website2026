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

            // Check if it is a data URL (legacy base64 support)
            if (url.startsWith("data:")) {
                // Strip data: URI prefix if present
                const base64Clean = url.replace(/^data:[a-z]+\/[a-z0-9-+]+;base64,/i, '');

                // Convert base64 to binary
                const byteCharacters = atob(base64Clean);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: "application/pdf" });

                // Create blob URL
                const blobUrl = URL.createObjectURL(blob);
                
                // Open in a new tab directly
                const newTab = window.open(blobUrl, "_blank");
                if (newTab) {
                    newTab.focus();
                } else {
                    alert("Please allow popups for this website to view the Job Description.");
                }
                
                // Cleanup blob URL after a delay
                setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
            } else {
                // It is a standard HTTP/S URL, open it in a new tab directly
                const newTab = window.open(url, "_blank");
                if (newTab) {
                    newTab.focus();
                } else {
                    alert("Please allow popups for this website to view the Job Description.");
                }
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
