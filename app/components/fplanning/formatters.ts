/**
 * Utility functions for Indian Numbering System formatting (e.g. 1,00,000)
 */

export const formatIndianAmount = (val: string | number | undefined | null, allowDecimal = false): string => {
    if (val === undefined || val === null || val === "") return "";
    const str = String(val);

    if (allowDecimal) {
        // Strip non-digits and non-dots
        const clean = str.replace(/[^0-9.]/g, "");
        if (!clean) return "";
        const parts = clean.split(".");
        const intPart = parts[0];
        const decPart = parts.length > 1 ? "." + parts.slice(1).join("") : "";
        if (!intPart && !decPart) return "";
        const formattedInt = intPart ? Number(intPart).toLocaleString("en-IN") : "0";
        return (intPart ? formattedInt : "") + decPart;
    } else {
        // Only integer digits
        const digits = str.replace(/\D/g, "");
        if (!digits) return "";
        return Number(digits).toLocaleString("en-IN");
    }
};

export const parseIndianAmount = (val: string | number | undefined | null): number => {
    if (val === undefined || val === null || val === "") return 0;
    const clean = String(val).replace(/,/g, "").trim();
    const num = Number(clean);
    return isNaN(num) ? 0 : num;
};
