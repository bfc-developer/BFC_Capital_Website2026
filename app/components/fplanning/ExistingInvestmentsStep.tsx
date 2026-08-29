"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { Plus, Trash2 } from "lucide-react";
import StepActions from "./StepActions";
import { apiBaseURL, endpoints } from "../urls/URLS";

interface Entry {
    id: number;

    // FixedDeposits
    fdBankName?: string;
    fdTenure?: string;
    fdAmount?: string;
    fdRoi?: string;
    fdMaturityDate?: string;
    fdMaturityValue?: string;

    // Stocks
    stockName?: string;
    stockCategory?: string;
    stockAvgBuyPrice?: string;
    stockQuantity?: string;
    stockAmount?: string;
    stockCurrentValue?: string;
    stockRoi?: string;
    stockHoldingPeriod?: string;

    // MF
    mfCategory?: string;
    mfCategoryCode?: number;
    mfSubCategory?: string;
    mfSubCategoryCode?: number;
    mfAmc?: string;
    mfAmcCode?: number;
    mfSchemeName?: string;
    mfMode?: string;
    mfAmount?: string;
    mfCurrentValue?: string;
    mfExpectedReturn?: string;
    mfDate?: string;
    mfHoldingPeriod?: string;
    mfSchemesList?: string[];
    mfAmcsList?: any[];

    // Real Estate
    reType?: string;
    reCity?: string;
    reLocality?: string;
    reAmount?: string;
    reCurrentValue?: string;
    reLoanAmount?: string;
    reLoanRoi?: string;
    reExpectedReturn?: string;

    // Gold
    goldForm?: string;
    goldQuantity?: string;
    goldPurchaseYear?: string;
    goldPurchaseValue?: string;
    goldCurrentValue?: string;
    goldExpectedReturn?: string;

    // Silver
    silverForm?: string;
    silverQuantity?: string;
    silverPurchaseYear?: string;
    silverPurchaseValue?: string;
    silverCurrentValue?: string;
    silverExpectedReturn?: string;

    // Other
    otherName?: string;
    otherDetails?: string;
    otherDate?: string;
    otherAmount?: string;
    otherCurrentValue?: string;
    otherExpectedReturn?: string;
    otherFileName?: string;
}

interface AssetItem {
    id: number;
    assetClass: string;
    items: Entry[];
}

const WMS_SUB_CATEGORIES: Record<string, string[]> = {
    "Equity": [
        "Multi Cap Fund", "Flexi Cap Fund", "Large Cap Fund", "Large & Mid Cap Fund",
        "Mid Cap Fund", "Small Cap Fund", "Dividend Yield Fund", "Value Fund",
        "Contra Fund", "Focused Fund", "Sectoral/Thematic Fund", "ELSS"
    ],
    "Hybrid": [
        "Conservative Hybrid", "Balanced Hybrid", "Aggressive Hybrid", "Dynamic Asset Allocation",
        "Multi Asset Allocation", "Arbitrage Fund", "Equity Savings Fund"
    ],
    "Debt": [
        "Overnight Fund", "Liquid Fund", "Money Market Fund", "Ultra Short Duration",
        "Low Duration Fund", "Short Duration Fund", "Medium Duration Fund", "Medium to Long Duration",
        "Long Duration Fund", "Dynamic Bond Fund", "Corporate Bond Fund", "Credit Risk Fund",
        "Banking & PSU Fund", "Gilt Fund", "Gilt 10Y Fund", "Floater Fund"
    ],
    "Commodity": [
        "Gold Fund", "Silver Fund"
    ]
};

// Mapping of Expected Return (%) and Ideal Investment Horizon based on Category and Sub-Category
const WMS_RETURNS_AND_HORIZON_BY_CATEGORY: Record<string, Record<string, { returns: string; horizon: string }>> = {
    "Equity": {
        "Multi Cap Fund": { horizon: "7", returns: "15" },
        "Flexi Cap Fund": { horizon: "7", returns: "15" },
        "Large Cap Fund": { horizon: "7", returns: "14" },
        "Large & Mid Cap Fund": { horizon: "7", returns: "15" },
        "Mid Cap Fund": { horizon: "8", returns: "17" },
        "Small Cap Fund": { horizon: "10", returns: "18" },
        "Dividend Yield Fund": { horizon: "6", returns: "13" },
        "Value Fund": { horizon: "8", returns: "15" },
        "Contra Fund": { horizon: "8", returns: "15" },
        "Focused Fund": { horizon: "8", returns: "14" },
        "Sectoral/Thematic Fund": { horizon: "8", returns: "17" },
        "ELSS": { horizon: "7", returns: "15" }
    },
    "Hybrid": {
        "Conservative Hybrid": { horizon: "2", returns: "8" },
        "Balanced Hybrid": { horizon: "4", returns: "11" },
        "Aggressive Hybrid": { horizon: "5", returns: "13" },
        "Dynamic Asset Allocation": { horizon: "4", returns: "11" },
        "Multi Asset Allocation": { horizon: "5", returns: "12" },
        "Arbitrage Fund": { horizon: "1", returns: "6.5" },
        "Equity Savings Fund": { horizon: "3", returns: "9" }
    },
    "Debt": {
        "Overnight Fund": { horizon: "1", returns: "5" },
        "Liquid Fund": { horizon: "0.25", returns: "6" },
        "Money Market Fund": { horizon: "1", returns: "6" },
        "Ultra Short Duration": { horizon: "0.5", returns: "6" },
        "Low Duration Fund": { horizon: "1", returns: "6" },
        "Short Duration Fund": { horizon: "3", returns: "7" },
        "Medium Duration Fund": { horizon: "4", returns: "7" },
        "Medium to Long Duration": { horizon: "7", returns: "6" },
        "Long Duration Fund": { horizon: "7", returns: "7" },
        "Dynamic Bond Fund": { horizon: "7", returns: "7" },
        "Corporate Bond Fund": { horizon: "7", returns: "7" },
        "Credit Risk Fund": { horizon: "3", returns: "8" },
        "Banking & PSU Fund": { horizon: "3", returns: "7" },
        "Gilt Fund": { horizon: "15", returns: "7" },
        "Gilt 10Y Fund": { horizon: "10", returns: "7" },
        "Floater Fund": { horizon: "", returns: "6" }
    },
    "Commodity": {
        "Gold Fund": { horizon: "", returns: "10" },
        "Silver Fund": { horizon: "", returns: "10" }
    }
};

const normalizeCategoryKey = (category?: string): string => {
    if (!category) return "";
    const clean = category.trim().toLowerCase();
    if (clean.includes("equity")) return "Equity";
    if (clean.includes("hybrid")) return "Hybrid";
    if (clean.includes("debt")) return "Debt";
    if (clean.includes("commodity")) return "Commodity";
    if (clean.includes("other")) return "Commodity";
    return category.trim();
};

const getCategorySubCategoryExpectedReturn = (
    category?: string,
    subCategory?: string
): { returns: string; horizon: string } | null => {
    if (!subCategory) return null;
    const catKey = normalizeCategoryKey(category);
    const subClean = subCategory.trim().toLowerCase();

    // 1. Look up in the normalized category
    if (catKey && WMS_RETURNS_AND_HORIZON_BY_CATEGORY[catKey]) {
        const catMap = WMS_RETURNS_AND_HORIZON_BY_CATEGORY[catKey];
        const matchKey = Object.keys(catMap).find(k => k.trim().toLowerCase() === subClean);
        if (matchKey) return catMap[matchKey];
    }

    // 2. Fallback search across all categories
    for (const c of Object.keys(WMS_RETURNS_AND_HORIZON_BY_CATEGORY)) {
        const catMap = WMS_RETURNS_AND_HORIZON_BY_CATEGORY[c];
        const matchKey = Object.keys(catMap).find(k => k.trim().toLowerCase() === subClean);
        if (matchKey) return catMap[matchKey];
    }

    return null;
};

// Backward-compatible flat map
const WMS_RETURNS_AND_HORIZON: Record<string, { returns: string; horizon: string }> = Object.assign(
    {},
    ...Object.values(WMS_RETURNS_AND_HORIZON_BY_CATEGORY)
);

interface ExistingInvestmentsStepProps {
    profileId?: string | null;
    onNext?: () => void;
    onBack?: () => void;
    showBack?: boolean;
}

export default function ExistingInvestmentsStep({
    profileId,
    onNext,
    onBack,
    showBack = false,
}: ExistingInvestmentsStepProps) {
    const [assets, setAssets] = useState<AssetItem[]>([
        {
            id: Date.now(),
            assetClass: "",
            items: [],
        },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [generalError, setGeneralError] = useState<string>("");

    const addAsset = () => {
        setGeneralError("");
        setAssets((prev) => [
            ...prev,
            {
                id: Date.now(),
                assetClass: "",
                items: [],
            },
        ]);
    };

    const updateAsset = (id: number, value: string) => {
        setGeneralError("");
        setAssets((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    if (!value) {
                        return {
                            id: item.id,
                            assetClass: "",
                            items: [],
                        };
                    }
                    const defaultEntry: Entry = { id: Date.now() + Math.random() };
                    if (value === "Real Estate") {
                        defaultEntry.reExpectedReturn = "8";
                    } else if (value === "Gold") {
                        defaultEntry.goldExpectedReturn = "10";
                    } else if (value === "Silver") {
                        defaultEntry.silverExpectedReturn = "10";
                    } else if (value === "FixedDeposits") {
                        defaultEntry.fdRoi = "6";
                    }
                    return {
                        id: item.id,
                        assetClass: value,
                        items: [defaultEntry]
                    };
                }
                return item;
            })
        );
        // Clear errors when asset class is modified
        setErrors((prev) => {
            const next = { ...prev };
            delete next[`${id}_assetClass`];
            return next;
        });
    };

    const updateAssetField = (cardId: number, itemId: number, field: keyof Entry, value: any) => {
        setGeneralError("");
        setAssets((prev) =>
            prev.map((card) =>
                card.id === cardId
                    ? {
                        ...card,
                        items: card.items.map((item) =>
                            item.id === itemId
                                ? { ...item, [field]: value }
                                : item
                        )
                    }
                    : card
            )
        );
        // Clear specific error
        setErrors((prev) => ({
            ...prev,
            [`${itemId}_${field}`]: "",
        }));
    };

    const removeAsset = (id: number) => {
        if (assets.length <= 1) return; // At least one asset card must remain
        setGeneralError("");
        const cardToRemove = assets.find((item) => item.id === id);
        setAssets((prev) =>
            prev.filter((item) => item.id !== id)
        );
        // Clean up errors for this asset and all its items
        setErrors((prev) => {
            const next = { ...prev };
            Object.keys(next).forEach((key) => {
                if (key.startsWith(`${id}_`)) {
                    delete next[key];
                }
            });
            if (cardToRemove) {
                cardToRemove.items.forEach((item) => {
                    Object.keys(next).forEach((key) => {
                        if (key.startsWith(`${item.id}_`)) {
                            delete next[key];
                        }
                    });
                });
            }
            return next;
        });
    };

    const addSubItem = (cardId: number, assetClass: string) => {
        const defaultEntry: Entry = { id: Date.now() + Math.random() };
        if (assetClass === "Real Estate") {
            defaultEntry.reExpectedReturn = "8";
        } else if (assetClass === "Gold") {
            defaultEntry.goldExpectedReturn = "10";
        } else if (assetClass === "Silver") {
            defaultEntry.silverExpectedReturn = "10";
        } else if (assetClass === "FixedDeposits") {
            defaultEntry.fdRoi = "6";
        }
        setAssets((prev) =>
            prev.map((card) =>
                card.id === cardId
                    ? { ...card, items: [...card.items, defaultEntry] }
                    : card
            )
        );
    };

    const removeSubItem = (cardId: number, itemId: number) => {
        setAssets((prev) =>
            prev.map((card) => {
                if (card.id === cardId) {
                    return {
                        ...card,
                        items: card.items.filter((item) => item.id !== itemId)
                    };
                }
                return card;
            })
        );
        // Clean up errors for this item
        setErrors((prev) => {
            const next = { ...prev };
            Object.keys(next).forEach((key) => {
                if (key.startsWith(`${itemId}_`)) {
                    delete next[key];
                }
            });
            return next;
        });
    };

    const [apiCategories, setApiCategories] = useState<any[]>([]);
    const [apiSubCategories, setApiSubCategories] = useState<any[]>([]);
    const [apiAmcs, setApiAmcs] = useState<any[]>([]);
    const [wmsCategories, setWmsCategories] = useState<any[]>([
        { category: "Equity", asset_code: 1 },
        { category: "Hybrid", asset_code: 2 },
        { category: "Debt", asset_code: 3 },
        { category: "Commodity", asset_code: 4 },
        { category: "Other", asset_code: 5 }
    ]);

    useEffect(() => {
        // Fetch Categories
        fetch(apiBaseURL + endpoints.getassettypefilter)
            .then(res => res.json())
            .then(json => {
                if (json.success && Array.isArray(json.data)) {
                    setApiCategories(json.data);
                }
            })
            .catch(err => console.error("Error loading categories:", err));

        // Fetch SubCategories
        fetch(apiBaseURL + endpoints.getassetlist)
            .then(res => res.json())
            .then(json => {
                if (json.success && Array.isArray(json.data)) {
                    setApiSubCategories(json.data);
                }
            })
            .catch(err => console.error("Error loading subcategories:", err));

        // Fetch AMCs
        fetch(apiBaseURL + endpoints.getAMCList)
            .then(res => res.json())
            .then(json => {
                if (json.success && Array.isArray(json.data)) {
                    setApiAmcs(json.data);
                }
            })
            .catch(err => console.error("Error loading AMCs:", err));

        // Fetch WMS Categories
        fetch("https://0tjhjpc5-7000.inc1.devtunnels.ms/api/users/get-category", {
            headers: {
                "X-Tunnel-Skip-Anti-Phishing-Threshold": "true"
            }
        })
            .then(res => res.json())
            .then(json => {
                if (json.success && json.data && Array.isArray(json.data.category)) {
                    setWmsCategories(json.data.category);
                }
            })
            .catch(err => console.error("Error loading WMS categories:", err));
    }, []);

    const fetchWmsAmcsForAsset = async (cardId: number, itemId: number, assetCode: number) => {
        try {
            const payload = { asset_code: Number(assetCode) };
            const base64Payload = btoa(JSON.stringify(payload));
            const response = await fetch("https://0tjhjpc5-7000.inc1.devtunnels.ms/api/users/get-amc-by-category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Tunnel-Skip-Anti-Phishing-Threshold": "true"
                },
                body: JSON.stringify({ data: base64Payload }),
            });
            const json = await response.json();
            let rawAmcs: any[] = [];
            if (json.data) {
                if (Array.isArray(json.data)) {
                    rawAmcs = json.data;
                } else if (Array.isArray(json.data.amcList)) {
                    rawAmcs = json.data.amcList;
                } else if (Array.isArray(json.data.amc)) {
                    rawAmcs = json.data.amc;
                }
            }
            if (json.success && rawAmcs.length > 0) {
                setAssets((prev) =>
                    prev.map((card) =>
                        card.id === cardId
                            ? {
                                ...card,
                                items: card.items.map((item) =>
                                    item.id === itemId
                                        ? { ...item, mfAmcsList: rawAmcs }
                                        : item
                                )
                            }
                            : card
                    )
                );
                return;
            }
        } catch (error) {
            console.error("Error fetching WMS AMCs:", error);
        }
        // Fallback: Set empty list if WMS fails
        setAssets((prev) =>
            prev.map((card) =>
                card.id === cardId
                    ? {
                        ...card,
                        items: card.items.map((item) =>
                            item.id === itemId
                                ? { ...item, mfAmcsList: [] }
                                : item
                        )
                    }
                    : card
            )
        );
    };

    const fetchWmsSchemesForAsset = async (cardId: number, itemId: number, amcCode: any, catCode?: number, subCategoryName?: string) => {
        try {
            const amcCodeNum = Number(amcCode);
            if (isNaN(amcCodeNum)) {
                console.error("fetchWmsSchemesForAsset: Invalid amcCode", amcCode);
                return;
            }
            const payload = { amccode: amcCodeNum };
            console.log("fetchWmsSchemesForAsset payload:", payload);
            const response = await fetch("https://0tjhjpc5-7000.inc1.devtunnels.ms/api/users/get-scheme", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Tunnel-Skip-Anti-Phishing-Threshold": "true"
                },
                body: JSON.stringify(payload),
            });
            const json = await response.json();
            console.log("fetchWmsSchemesForAsset API response:", json);
            let rawSchemes: any[] = [];
            if (json.data) {
                if (Array.isArray(json.data)) {
                    rawSchemes = json.data;
                } else if (Array.isArray(json.data.schemeDetails)) {
                    rawSchemes = json.data.schemeDetails;
                } else if (Array.isArray(json.data.scheme)) {
                    rawSchemes = json.data.scheme;
                } else if (Array.isArray(json.data.schemeList)) {
                    rawSchemes = json.data.schemeList;
                }
            }
            if (json.success && rawSchemes.length > 0) {
                const schemeNames = Array.from(
                    new Set(
                        rawSchemes.map((s: any) => s.s_name || s.scheme_name || s.scheme || s.schemename)
                    )
                ).filter(Boolean) as string[];
                console.log("fetchWmsSchemesForAsset mapped schemes list:", schemeNames);
                setAssets((prev) =>
                    prev.map((card) =>
                        card.id === cardId
                            ? {
                                ...card,
                                items: card.items.map((item) =>
                                    item.id === itemId
                                        ? { ...item, mfSchemesList: schemeNames }
                                        : item
                                )
                            }
                            : card
                    )
                );
                return;
            } else {
                console.warn("fetchWmsSchemesForAsset conditions not met:", {
                    success: json.success,
                    hasData: !!json.data,
                    rawSchemesLength: rawSchemes.length
                });
            }
        } catch (error) {
            console.error("Error fetching WMS schemes:", error);
        }
        // Fallback: Call standard local scheme filter if WMS fails (so the user is never stuck)
        if (catCode && subCategoryName) {
            fetchSchemesForAsset(cardId, itemId, catCode, subCategoryName, amcCode);
        }
    };

    // Prefetch WMS AMCs and schemes for loaded Mutual Funds once assets are available
    useEffect(() => {
        if (assets.length === 0) return;

        assets.forEach((card) => {
            if (card.assetClass === "Mutual Funds (MF)") {
                card.items.forEach((item) => {
                    if (item.mfCategoryCode && (!item.mfAmcsList || item.mfAmcsList.length === 0)) {
                        fetchWmsAmcsForAsset(card.id, item.id, item.mfCategoryCode);
                    }
                    if (item.mfAmcCode && (!item.mfSchemesList || item.mfSchemesList.length === 0)) {
                        fetchWmsSchemesForAsset(card.id, item.id, item.mfAmcCode, item.mfCategoryCode, item.mfSubCategory);
                    }
                });
            }
        });
    }, [assets]);

    const fetchSchemesForAsset = async (cardId: number, itemId: number, catCode: number, subCategoryName: string, amcCode: number) => {
        try {
            const matchingClasscodes = apiSubCategories
                .filter((sub) => sub.category === subCategoryName && sub.asset_code === catCode)
                .map((sub) => sub.classcode);

            console.log("fetchSchemesForAsset inputs:", { cardId, itemId, catCode, subCategoryName, amcCode, matchingClasscodes });

            const query = new URLSearchParams({
                page: "1",
                pageSize: "1000",
                returns: "3",
                sort: "1",
                risk_code: "",
            }).toString();
            const url = apiBaseURL + endpoints.getFilteredSchemes + `?${query}`;
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    amc_code: [Number(amcCode)],
                    asset_code: [Number(catCode)],
                    classcode: matchingClasscodes,
                }),
            });

            // Handle 404 Not Found
            if (response.status === 404) {
                setAssets((prev) =>
                    prev.map((card) =>
                        card.id === cardId
                            ? {
                                ...card,
                                items: card.items.map((item) =>
                                    item.id === itemId
                                        ? { ...item, mfSchemesList: [] }
                                        : item
                                )
                            }
                            : card
                    )
                );
                return;
            }

            const json = await response.json();
            console.log("fetchSchemesForAsset API output:", json);
            if (json.success && Array.isArray(json.data)) {
                setAssets((prev) =>
                    prev.map((card) =>
                        card.id === cardId
                            ? {
                                ...card,
                                items: card.items.map((item) =>
                                    item.id === itemId
                                        ? { ...item, mfSchemesList: json.data.map((s: any) => s.scheme) }
                                        : item
                                )
                            }
                            : card
                    )
                );
            } else {
                // API returned success:false — clear the schemes list
                setAssets((prev) =>
                    prev.map((card) =>
                        card.id === cardId
                            ? {
                                ...card,
                                items: card.items.map((item) =>
                                    item.id === itemId
                                        ? { ...item, mfSchemesList: [] }
                                        : item
                                )
                            }
                            : card
                    )
                );
            }
        } catch (error) {
            console.error("Error fetching schemes:", error);
        }
    };

    // Load existing investments for prefill
    useEffect(() => {
        if (!profileId) return;
        fetch(`http://localhost:5000/api/existing-investments/profile/${profileId}`)
            .then((res) => res.json())
            .then((resData) => {
                if (resData.success && resData.data) {
                    if (Array.isArray(resData.data.assets) && resData.data.assets.length > 0) {
                        const grouped: Record<string, Entry[]> = {};
                        resData.data.assets.forEach((asset: any) => {
                            const cls = asset.assetClass || "Other Assest Classes";
                            if (!grouped[cls]) {
                                grouped[cls] = [];
                            }
                            const entry: Entry = {
                                id: asset._id || Date.now() + Math.random(),
                                fdBankName: asset.fdBankName || "",
                                fdTenure: asset.fdTenure || "",
                                fdAmount: asset.fdAmount !== undefined ? String(asset.fdAmount) : "",
                                fdRoi: asset.fdRoi !== undefined ? String(asset.fdRoi) : "",
                                fdMaturityDate: asset.fdMaturityDate ? asset.fdMaturityDate.split("T")[0] : "",
                                fdMaturityValue: asset.fdMaturityValue !== undefined ? String(asset.fdMaturityValue) : "",

                                stockName: asset.stockName || "",
                                stockCategory: asset.stockCategory || "",
                                stockAvgBuyPrice: asset.stockAvgBuyPrice !== undefined ? String(asset.stockAvgBuyPrice) : "",
                                stockQuantity: asset.stockQuantity !== undefined ? String(asset.stockQuantity) : "",
                                stockAmount: asset.stockAmount !== undefined ? String(asset.stockAmount) : "",
                                stockCurrentValue: asset.stockCurrentValue !== undefined ? String(asset.stockCurrentValue) : "",
                                stockRoi: asset.stockRoi !== undefined ? String(asset.stockRoi) : "",
                                stockHoldingPeriod: asset.stockHoldingPeriod !== undefined ? String(asset.stockHoldingPeriod) : "",

                                mfCategory: asset.mfCategory || "",
                                mfCategoryCode: asset.mfCategoryCode || undefined,
                                mfSubCategory: asset.mfSubCategory || "",
                                mfSubCategoryCode: asset.mfSubCategoryCode || undefined,
                                mfAmc: asset.mfAmc || "",
                                mfAmcCode: asset.mfAmcCode || undefined,
                                mfSchemeName: asset.mfSchemeName || "",
                                mfMode: asset.mfMode || "",
                                mfAmount: asset.mfAmount !== undefined ? String(asset.mfAmount) : "",
                                mfCurrentValue: asset.mfCurrentValue !== undefined ? String(asset.mfCurrentValue) : "",
                                mfExpectedReturn: asset.mfExpectedReturn !== undefined && asset.mfExpectedReturn !== ""
                                    ? String(asset.mfExpectedReturn)
                                    : (getCategorySubCategoryExpectedReturn(asset.mfCategory, asset.mfSubCategory)?.returns || ""),
                                mfDate: asset.mfDate ? asset.mfDate.split("T")[0] : "",
                                mfHoldingPeriod: asset.mfHoldingPeriod !== undefined && asset.mfHoldingPeriod !== ""
                                    ? String(asset.mfHoldingPeriod)
                                    : (getCategorySubCategoryExpectedReturn(asset.mfCategory, asset.mfSubCategory)?.horizon || ""),
                                mfSchemesList: [],
                                mfAmcsList: [],

                                reType: asset.reType || "",
                                reCity: asset.reCity || "",
                                reLocality: asset.reLocality || "",
                                reAmount: asset.reAmount !== undefined ? String(asset.reAmount) : "",
                                reCurrentValue: asset.reCurrentValue !== undefined ? String(asset.reCurrentValue) : "",
                                reLoanAmount: asset.reLoanAmount !== undefined ? String(asset.reLoanAmount) : "",
                                reLoanRoi: asset.reLoanRoi !== undefined ? String(asset.reLoanRoi) : "",
                                reExpectedReturn: asset.reExpectedReturn !== undefined ? String(asset.reExpectedReturn) : "",

                                goldForm: asset.goldForm || "",
                                goldQuantity: asset.goldQuantity !== undefined ? String(asset.goldQuantity) : "",
                                goldPurchaseYear: asset.goldPurchaseYear !== undefined ? String(asset.goldPurchaseYear) : "",
                                goldPurchaseValue: asset.goldPurchaseValue !== undefined ? String(asset.goldPurchaseValue) : "",
                                goldCurrentValue: asset.goldCurrentValue !== undefined ? String(asset.goldCurrentValue) : "",
                                goldExpectedReturn: asset.goldExpectedReturn !== undefined ? String(asset.goldExpectedReturn) : "",

                                silverForm: asset.silverForm || "",
                                silverQuantity: asset.silverQuantity !== undefined ? String(asset.silverQuantity) : "",
                                silverPurchaseYear: asset.silverPurchaseYear !== undefined ? String(asset.silverPurchaseYear) : "",
                                silverPurchaseValue: asset.silverPurchaseValue !== undefined ? String(asset.silverPurchaseValue) : "",
                                silverCurrentValue: asset.silverCurrentValue !== undefined ? String(asset.silverCurrentValue) : "",
                                silverExpectedReturn: asset.silverExpectedReturn !== undefined ? String(asset.silverExpectedReturn) : "",

                                otherName: asset.otherName || "",
                                otherDetails: asset.otherDetails || "",
                                otherDate: asset.otherDate ? asset.otherDate.split("T")[0] : "",
                                otherAmount: asset.otherAmount !== undefined ? String(asset.otherAmount) : "",
                                otherCurrentValue: asset.otherCurrentValue !== undefined ? String(asset.otherCurrentValue) : "",
                                otherExpectedReturn: asset.otherExpectedReturn !== undefined ? String(asset.otherExpectedReturn) : "",
                                otherFileName: asset.otherFileName || "",
                            };
                            grouped[cls].push(entry);
                        });

                        const loadedAssets = Object.keys(grouped).map((cls) => {
                            return {
                                id: Date.now() + Math.random(),
                                assetClass: cls,
                                items: grouped[cls],
                            };
                        });
                        setAssets(loadedAssets);
                    }
                }
            })
            .catch((err) => console.error("Error fetching existing investments:", err));
    }, [profileId]);

    // Prefetch schemes for loaded Mutual Funds once subcategories and assets are available
    useEffect(() => {
        if (apiSubCategories.length === 0 || assets.length === 0) return;

        assets.forEach((card) => {
            if (card.assetClass === "Mutual Funds (MF)") {
                card.items.forEach((item) => {
                    if (
                        item.mfCategoryCode &&
                        item.mfSubCategory &&
                        item.mfAmcCode &&
                        (!item.mfSchemesList || item.mfSchemesList.length === 0)
                    ) {
                        fetchSchemesForAsset(
                            card.id,
                            item.id,
                            item.mfCategoryCode,
                            item.mfSubCategory,
                            item.mfAmcCode
                        );
                    }
                });
            }
        });
    }, [apiSubCategories, assets]);

    const calculateTotal = () => {
        let total = 0;
        assets.forEach((card) => {
            card.items.forEach((item) => {
                if (card.assetClass === "FixedDeposits") {
                    total += Number(item.fdAmount) || 0;
                } else if (card.assetClass === "Stocks") {
                    total += Number(item.stockAmount) || 0;
                } else if (card.assetClass === "Mutual Funds (MF)") {
                    total += Number(item.mfAmount) || 0;
                } else if (card.assetClass === "Real Estate") {
                    total += Number(item.reAmount) || 0;
                } else if (card.assetClass === "Gold") {
                    total += Number(item.goldPurchaseValue) || 0;
                } else if (card.assetClass === "Silver") {
                    total += Number(item.silverPurchaseValue) || 0;
                } else if (card.assetClass === "Other Assest Classes") {
                    total += Number(item.otherAmount) || 0;
                }
            });
        });
        return total;
    };

    const handleFileChange = (cardId: number, itemId: number, file: File | null) => {
        updateAssetField(cardId, itemId, "otherFileName", file ? file.name : "");
    };

    const handleContinue = async () => {
        if (!profileId) {
            alert("No Personal Profile ID found. Please complete the Personal Profile step first.");
            return;
        }

        if (!assets || assets.length === 0) {
            setGeneralError("Your Existing Investments details are mandatory. Please select and fill details for at least one investment.");
            return;
        }

        const newErrors: Record<string, string> = {};

        // Frontend validation
        assets.forEach((card) => {
            if (!card.assetClass) {
                newErrors[`${card.id}_assetClass`] = "Please select an asset class.";
                return;
            }

            if (!card.items || card.items.length === 0) {
                newErrors[`${card.id}_assetClass`] = "Please add at least one entry for this asset class.";
                return;
            }

            card.items.forEach((a) => {
                if (card.assetClass === "FixedDeposits") {
                    if (!a.fdBankName?.trim()) {
                        newErrors[`${a.id}_fdBankName`] = "Bank name is required.";
                    } else if (/\d/.test(a.fdBankName)) {
                        newErrors[`${a.id}_fdBankName`] = "Bank name cannot contain numbers.";
                    }
                    if (!a.fdTenure?.trim()) newErrors[`${a.id}_fdTenure`] = "Tenure is required.";
                    if (!a.fdAmount || Number(a.fdAmount) <= 0) newErrors[`${a.id}_fdAmount`] = "Please enter a valid amount.";
                    if (!a.fdRoi || Number(a.fdRoi) < 0) newErrors[`${a.id}_fdRoi`] = "Please enter a valid ROI.";
                    if (!a.fdMaturityDate) newErrors[`${a.id}_fdMaturityDate`] = "Maturity Date is required.";
                    if (!a.fdMaturityValue || Number(a.fdMaturityValue) <= 0) newErrors[`${a.id}_fdMaturityValue`] = "Please enter a valid maturity value.";
                } else if (card.assetClass === "Stocks") {
                    if (!a.stockName?.trim()) newErrors[`${a.id}_stockName`] = "Stock name is required.";
                    if (!a.stockCategory) newErrors[`${a.id}_stockCategory`] = "Category is required.";
                    if (!a.stockAvgBuyPrice || Number(a.stockAvgBuyPrice) <= 0) newErrors[`${a.id}_stockAvgBuyPrice`] = "Please enter average buy price.";
                    if (!a.stockQuantity || Number(a.stockQuantity) <= 0) newErrors[`${a.id}_stockQuantity`] = "Please enter quantity.";
                    if (!a.stockAmount || Number(a.stockAmount) <= 0) newErrors[`${a.id}_stockAmount`] = "Please enter investment amount.";
                    if (!a.stockCurrentValue || Number(a.stockCurrentValue) <= 0) newErrors[`${a.id}_stockCurrentValue`] = "Please enter current value.";
                    if (!a.stockRoi || Number(a.stockRoi) < 0) newErrors[`${a.id}_stockRoi`] = "Please enter rate of return.";
                    if (!a.stockHoldingPeriod || Number(a.stockHoldingPeriod) <= 0) newErrors[`${a.id}_stockHoldingPeriod`] = "Please enter holding period.";
                } else if (card.assetClass === "Mutual Funds (MF)") {
                    if (!a.mfCategory) newErrors[`${a.id}_mfCategory`] = "Category is required.";
                    if (!a.mfSubCategory) newErrors[`${a.id}_mfSubCategory`] = "Sub Category is required.";
                    if (!a.mfAmc) newErrors[`${a.id}_mfAmc`] = "AMC is required.";
                    if (!a.mfSchemeName) newErrors[`${a.id}_mfSchemeName`] = "Scheme name is required.";
                    if (!a.mfMode?.trim()) newErrors[`${a.id}_mfMode`] = "Mode is required.";
                    if (!a.mfAmount || Number(a.mfAmount) <= 0) newErrors[`${a.id}_mfAmount`] = "Please enter amount.";
                    if (!a.mfCurrentValue || Number(a.mfCurrentValue) <= 0) newErrors[`${a.id}_mfCurrentValue`] = "Please enter current value.";
                    if (!a.mfExpectedReturn || Number(a.mfExpectedReturn) < 0) newErrors[`${a.id}_mfExpectedReturn`] = "Please enter expected return.";
                    if (!a.mfDate) newErrors[`${a.id}_mfDate`] = "Date is required.";
                    if (!a.mfHoldingPeriod || Number(a.mfHoldingPeriod) <= 0) newErrors[`${a.id}_mfHoldingPeriod`] = "Please enter holding period.";
                } else if (card.assetClass === "Real Estate") {
                    if (!a.reType) newErrors[`${a.id}_reType`] = "Type is required.";
                    if (!a.reCity?.trim()) {
                        newErrors[`${a.id}_reCity`] = "City is required.";
                    } else if (/\d/.test(a.reCity)) {
                        newErrors[`${a.id}_reCity`] = "City name cannot contain numbers.";
                    }
                    if (!a.reLocality?.trim()) newErrors[`${a.id}_reLocality`] = "Locality is required.";
                    if (!a.reAmount || Number(a.reAmount) <= 0) newErrors[`${a.id}_reAmount`] = "Please enter amount.";
                    if (!a.reCurrentValue || Number(a.reCurrentValue) <= 0) newErrors[`${a.id}_reCurrentValue`] = "Please enter current value.";
                    if (a.reLoanAmount === undefined || a.reLoanAmount === "") newErrors[`${a.id}_reLoanAmount`] = "Please specify loan amount (use 0 if none).";
                    if (a.reLoanRoi === undefined || a.reLoanRoi === "") newErrors[`${a.id}_reLoanRoi`] = "Please specify loan interest rate (use 0 if none).";
                    if (!a.reExpectedReturn || Number(a.reExpectedReturn) < 0) newErrors[`${a.id}_reExpectedReturn`] = "Please enter rate of return.";
                } else if (card.assetClass === "Gold") {
                    if (!a.goldForm) newErrors[`${a.id}_goldForm`] = "Form of Gold is required.";
                    if (!a.goldQuantity || Number(a.goldQuantity) <= 0) newErrors[`${a.id}_goldQuantity`] = "Please enter quantity.";
                    if (!a.goldPurchaseYear || Number(a.goldPurchaseYear) < 1900) newErrors[`${a.id}_goldPurchaseYear`] = "Please enter purchase year.";
                    if (!a.goldPurchaseValue || Number(a.goldPurchaseValue) <= 0) newErrors[`${a.id}_goldPurchaseValue`] = "Please enter purchase value.";
                    if (!a.goldCurrentValue || Number(a.goldCurrentValue) <= 0) newErrors[`${a.id}_goldCurrentValue`] = "Please enter current value.";
                    if (!a.goldExpectedReturn || Number(a.goldExpectedReturn) < 0) newErrors[`${a.id}_goldExpectedReturn`] = "Please enter rate of return.";
                } else if (card.assetClass === "Silver") {
                    if (!a.silverForm) newErrors[`${a.id}_silverForm`] = "Form of Silver is required.";
                    if (!a.silverQuantity || Number(a.silverQuantity) <= 0) newErrors[`${a.id}_silverQuantity`] = "Please enter quantity.";
                    if (!a.silverPurchaseYear || Number(a.silverPurchaseYear) < 1900) newErrors[`${a.id}_silverPurchaseYear`] = "Please enter purchase year.";
                    if (!a.silverPurchaseValue || Number(a.silverPurchaseValue) <= 0) newErrors[`${a.id}_silverPurchaseValue`] = "Please enter purchase value.";
                    if (!a.silverCurrentValue || Number(a.silverCurrentValue) <= 0) newErrors[`${a.id}_silverCurrentValue`] = "Please enter current value.";
                    if (!a.silverExpectedReturn || Number(a.silverExpectedReturn) < 0) newErrors[`${a.id}_silverExpectedReturn`] = "Please enter rate of return.";
                } else if (card.assetClass === "Other Assest Classes") {
                    if (!a.otherName?.trim()) newErrors[`${a.id}_otherName`] = "Asset name is required.";
                    if (!a.otherDetails?.trim()) newErrors[`${a.id}_otherDetails`] = "Details are required.";
                    if (!a.otherDate) newErrors[`${a.id}_otherDate`] = "Date is required.";
                    if (!a.otherAmount || Number(a.otherAmount) <= 0) newErrors[`${a.id}_otherAmount`] = "Please enter cost.";
                    if (!a.otherCurrentValue || Number(a.otherCurrentValue) <= 0) newErrors[`${a.id}_otherCurrentValue`] = "Please enter current value.";
                    if (!a.otherExpectedReturn || Number(a.otherExpectedReturn) < 0) newErrors[`${a.id}_otherExpectedReturn`] = "Please enter rate of return.";
                }
            });
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setGeneralError("Please fill in all mandatory fields marked with * before continuing.");
            const firstErrorKey = Object.keys(newErrors)[0];
            const errorElement = document.getElementById(firstErrorKey);
            if (errorElement) {
                errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
                errorElement.focus();
            }
            return;
        }

        setGeneralError("");
        setIsSubmitting(true);
        try {
            // Formulate payload converting frontend text inputs to types expected by API
            const flatAssets: any[] = [];
            assets.forEach((card) => {
                card.items.forEach((a) => {
                    const formatted: any = {
                        assetClass: card.assetClass,
                    };
                    if (card.assetClass === "FixedDeposits") {
                        formatted.fdBankName = a.fdBankName;
                        formatted.fdTenure = a.fdTenure;
                        formatted.fdAmount = Number(a.fdAmount);
                        formatted.fdRoi = Number(a.fdRoi);
                        formatted.fdMaturityDate = a.fdMaturityDate ? new Date(a.fdMaturityDate) : undefined;
                        formatted.fdMaturityValue = Number(a.fdMaturityValue);
                    } else if (card.assetClass === "Stocks") {
                        formatted.stockName = a.stockName;
                        formatted.stockCategory = a.stockCategory;
                        formatted.stockAvgBuyPrice = Number(a.stockAvgBuyPrice);
                        formatted.stockQuantity = Number(a.stockQuantity);
                        formatted.stockAmount = Number(a.stockAmount);
                        formatted.stockCurrentValue = Number(a.stockCurrentValue);
                        formatted.stockRoi = Number(a.stockRoi);
                        formatted.stockHoldingPeriod = Number(a.stockHoldingPeriod);
                    } else if (card.assetClass === "Mutual Funds (MF)") {
                        let resolvedSubCode = a.mfSubCategoryCode;
                        if (!resolvedSubCode && a.mfSubCategory) {
                            const found = apiSubCategories.find(
                                (sub) => sub.category === a.mfSubCategory && sub.asset_code === a.mfCategoryCode
                            );
                            if (found) {
                                resolvedSubCode = found.classcode;
                            }
                        }

                        formatted.mfCategory = a.mfCategory;
                        formatted.mfCategoryCode = a.mfCategoryCode;
                        formatted.mfSubCategory = a.mfSubCategory;
                        formatted.mfSubCategoryCode = resolvedSubCode;
                        formatted.mfAmc = a.mfAmc;
                        formatted.mfAmcCode = a.mfAmcCode;
                        formatted.mfSchemeName = a.mfSchemeName;
                        formatted.mfMode = a.mfMode;
                        formatted.mfAmount = Number(a.mfAmount);
                        formatted.mfCurrentValue = Number(a.mfCurrentValue);
                        formatted.mfExpectedReturn = Number(a.mfExpectedReturn);
                        formatted.mfDate = a.mfDate ? new Date(a.mfDate) : undefined;
                        formatted.mfHoldingPeriod = Number(a.mfHoldingPeriod);
                    } else if (card.assetClass === "Real Estate") {
                        formatted.reType = a.reType;
                        formatted.reCity = a.reCity;
                        formatted.reLocality = a.reLocality;
                        formatted.reAmount = Number(a.reAmount);
                        formatted.reCurrentValue = Number(a.reCurrentValue);
                        formatted.reLoanAmount = Number(a.reLoanAmount) || 0;
                        formatted.reLoanRoi = Number(a.reLoanRoi) || 0;
                        formatted.reExpectedReturn = Number(a.reExpectedReturn);
                    } else if (card.assetClass === "Gold") {
                        formatted.goldForm = a.goldForm;
                        formatted.goldQuantity = Number(a.goldQuantity);
                        formatted.goldPurchaseYear = Number(a.goldPurchaseYear);
                        formatted.goldPurchaseValue = Number(a.goldPurchaseValue);
                        formatted.goldCurrentValue = Number(a.goldCurrentValue);
                        formatted.goldExpectedReturn = Number(a.goldExpectedReturn);
                    } else if (card.assetClass === "Silver") {
                        formatted.silverForm = a.silverForm;
                        formatted.silverQuantity = Number(a.silverQuantity);
                        formatted.silverPurchaseYear = Number(a.silverPurchaseYear);
                        formatted.silverPurchaseValue = Number(a.silverPurchaseValue);
                        formatted.silverCurrentValue = Number(a.silverCurrentValue);
                        formatted.silverExpectedReturn = Number(a.silverExpectedReturn);
                    } else if (card.assetClass === "Other Assest Classes") {
                        formatted.otherName = a.otherName;
                        formatted.otherDetails = a.otherDetails;
                        formatted.otherDate = a.otherDate ? new Date(a.otherDate) : undefined;
                        formatted.otherAmount = Number(a.otherAmount);
                        formatted.otherCurrentValue = Number(a.otherCurrentValue);
                        formatted.otherExpectedReturn = Number(a.otherExpectedReturn);
                        formatted.otherFileName = a.otherFileName;
                    }
                    flatAssets.push(formatted);
                });
            });

            if (flatAssets.length === 0) {
                setGeneralError("Your Existing Investments details are mandatory. Please fill in details for at least one investment.");
                setIsSubmitting(false);
                return;
            }

            const payload = {
                personalProfileId: profileId,
                assets: flatAssets,
            };

            const response = await fetch("http://localhost:5000/api/existing-investments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errBody = await response.json().catch(() => ({}));
                throw new Error(errBody.msg || errBody.message || "Failed to submit existing investments");
            }

            if (onNext) onNext();
        } catch (err) {
            alert("Error saving details: " + (err instanceof Error ? err.message : String(err)));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="rounded-[24px] border border-[#E5E5E5] bg-white p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-center gap-2">
                <h3 className="col-span-8 font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[25px] bg-gradient-to-r from-[#06a358] to-[#001EFE] bg-clip-text text-transparent pb-3">
                    Your Existing Investments
                </h3>

                <div className="col-span-1 items-center text-end rounded-[10px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-1 md:p-2">
                    <div className="flex items-center gap-1 justify-end px-5">
                        <img className="w-[15px] h-[15px]" src="/financialplanning/moneybag.png" alt="moneybag" />
                        <p className="text-[#06A358] font-semibold">Total: ₹{calculateTotal().toLocaleString("en-IN")}</p>
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-[#e9e9e9] mt-5 sm:mt-5 mb-5 sm:mb-6" />

            {/* General Error Banner */}
            {generalError && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-[12px] flex items-center gap-2.5 text-red-600 text-[13px] font-semibold animate-pulse">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{generalError}</span>
                </div>
            )}

            {/* Asset List */}
            <div className="space-y-5">
                {assets.map((asset) => (
                    <div key={asset.id} className="flex gap-4 items-end">
                        <div className="flex-1">
                            <div className="flex gap-4 items-end justify-between mb-4">
                                <label className="block text-sm font-medium text-[#44475B]">
                                    Select Asset Class <span className="text-red-600"> *</span>
                                </label>
                                {assets.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeAsset(asset.id)}
                                        className="cursor-pointer h-10 w-10 rounded-full bg-[#DB4437] text-white flex items-center justify-center hover:bg-red-700 transition"
                                        title="Remove Asset Class"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>

                            <select
                                id={`${asset.id}_assetClass`}
                                value={asset.assetClass}
                                onChange={(e) => updateAsset(asset.id, e.target.value)}
                                className={`h-[48px] w-full rounded-[10px] border bg-white px-4 text-sm text-[#44475B] outline-none transition ${errors[`${asset.id}_assetClass`] ? "border-red-500 focus:border-red-500" : "border-[#E8E8E8] focus:border-[#04B488]"
                                    }`}
                            >
                                <option value="">--Select--</option>
                                {[
                                    "FixedDeposits",
                                    "Stocks",
                                    "Mutual Funds (MF)",
                                    "Real Estate",
                                    "Gold",
                                    "Silver",
                                    "Other Assest Classes",
                                ]
                                    .filter(
                                        (option) =>
                                            option === asset.assetClass ||
                                            !assets.some((a) => a.assetClass === option)
                                    )
                                    .map((option) => (
                                        <option key={option} value={option}>
                                            {option === "FixedDeposits" ? "Fixed Deposits (FDs)" : option}
                                        </option>
                                    ))}
                            </select>
                            {errors[`${asset.id}_assetClass`] && (
                                <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_assetClass`]}</p>
                            )}

                            {/* Render items of this asset class */}
                            {asset.assetClass && (
                                <div className="space-y-5 mt-5">
                                    {asset.items.map((item, idx) => (
                                        <div key={item.id} className="relative bg-[#fdfdfd] border border-[#f0f0f0] p-5 rounded-[16px]">
                                            {asset.items.length > 1 && (
                                                <div className="absolute top-3 right-3 z-10">
                                                    <button
                                                        type="button"
                                                        onClick={() => removeSubItem(asset.id, item.id)}
                                                        className="cursor-pointer h-8 w-8 rounded-full bg-[#DB4437] text-white flex items-center justify-center hover:bg-red-700 transition"
                                                    >
                                                        <Trash2 size={15} />
                                                    </button>
                                                </div>
                                            )}

                                            {/* Fixed Deposits Inputs */}
                                            {asset.assetClass === "FixedDeposits" && (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5">
                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Name of the Bank/Institution <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_fdBankName`}
                                                            type="text"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_fdBankName`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="Name"
                                                            value={item.fdBankName || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "fdBankName", e.target.value.replace(/\d/g, ""))}
                                                        />
                                                        {errors[`${item.id}_fdBankName`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_fdBankName`]}</p>}
                                                    </div>

                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Tenure <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_fdTenure`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_fdTenure`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="Years"
                                                            value={item.fdTenure || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "fdTenure", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_fdTenure`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_fdTenure`]}</p>}
                                                    </div>

                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Investment Amount <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_fdAmount`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_fdAmount`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="₹ Amount"
                                                            value={item.fdAmount || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "fdAmount", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_fdAmount`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_fdAmount`]}</p>}
                                                    </div>

                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            ROI (%) <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_fdRoi`}
                                                            type="number"
                                                            step="0.01"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_fdRoi`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="Rate"
                                                            value={item.fdRoi || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "fdRoi", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_fdRoi`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_fdRoi`]}</p>}
                                                    </div>

                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Maturity Date <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_fdMaturityDate`}
                                                            type="date"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_fdMaturityDate`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            value={item.fdMaturityDate || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "fdMaturityDate", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_fdMaturityDate`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_fdMaturityDate`]}</p>}
                                                    </div>

                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Maturity Value <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_fdMaturityValue`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_fdMaturityValue`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="₹ Amount"
                                                            value={item.fdMaturityValue || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "fdMaturityValue", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_fdMaturityValue`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_fdMaturityValue`]}</p>}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Stocks Inputs */}
                                            {asset.assetClass === "Stocks" && (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5">
                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Name of Stock <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_stockName`}
                                                            type="text"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_stockName`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="Name"
                                                            value={item.stockName || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "stockName", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_stockName`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_stockName`]}</p>}
                                                    </div>

                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Category <span className="text-red-600"> *</span>
                                                        </label>
                                                        <select
                                                            id={`${item.id}_stockCategory`}
                                                            className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] focus:outline-none transition-colors ${errors[`${item.id}_stockCategory`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            value={item.stockCategory || ""}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                updateAssetField(asset.id, item.id, "stockCategory", val);
                                                                if (val === "Large Cap") {
                                                                    if (!item.stockRoi) updateAssetField(asset.id, item.id, "stockRoi", "14");
                                                                    if (!item.stockHoldingPeriod) updateAssetField(asset.id, item.id, "stockHoldingPeriod", "7");
                                                                } else if (val === "Mid Cap") {
                                                                    if (!item.stockRoi) updateAssetField(asset.id, item.id, "stockRoi", "17");
                                                                    if (!item.stockHoldingPeriod) updateAssetField(asset.id, item.id, "stockHoldingPeriod", "8");
                                                                } else if (val === "Small Cap") {
                                                                    if (!item.stockRoi) updateAssetField(asset.id, item.id, "stockRoi", "18");
                                                                    if (!item.stockHoldingPeriod) updateAssetField(asset.id, item.id, "stockHoldingPeriod", "10");
                                                                }
                                                            }}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="Large Cap">Large Cap</option>
                                                            <option value="Mid Cap">Mid Cap</option>
                                                            <option value="Small Cap">Small Cap</option>
                                                        </select>
                                                        {errors[`${item.id}_stockCategory`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_stockCategory`]}</p>}
                                                    </div>

                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Avg Buy Price <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_stockAvgBuyPrice`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_stockAvgBuyPrice`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="₹ Price"
                                                            value={item.stockAvgBuyPrice || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "stockAvgBuyPrice", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_stockAvgBuyPrice`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_stockAvgBuyPrice`]}</p>}
                                                    </div>

                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Quantity <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_stockQuantity`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_stockQuantity`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="Qty"
                                                            value={item.stockQuantity || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "stockQuantity", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_stockQuantity`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_stockQuantity`]}</p>}
                                                    </div>

                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Investment Amount <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_stockAmount`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_stockAmount`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="₹ Amount"
                                                            value={item.stockAmount || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "stockAmount", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_stockAmount`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_stockAmount`]}</p>}
                                                    </div>

                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            ₹ C.V of Investment (Approx) <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_stockCurrentValue`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_stockCurrentValue`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="₹ Value"
                                                            value={item.stockCurrentValue || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "stockCurrentValue", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_stockCurrentValue`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_stockCurrentValue`]}</p>}
                                                    </div>

                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Avg Rate of Return (%) <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_stockRoi`}
                                                            type="number"
                                                            step="0.01"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_stockRoi`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="Rate"
                                                            value={item.stockRoi || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "stockRoi", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_stockRoi`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_stockRoi`]}</p>}
                                                    </div>

                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Holding Period <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_stockHoldingPeriod`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_stockHoldingPeriod`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="Years"
                                                            value={item.stockHoldingPeriod || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "stockHoldingPeriod", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_stockHoldingPeriod`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_stockHoldingPeriod`]}</p>}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Mutual Funds (MF) Inputs */}
                                            {asset.assetClass === "Mutual Funds (MF)" && (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5">
                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Category <span className="text-red-600"> *</span>
                                                        </label>
                                                        <select
                                                            id={`${item.id}_mfCategory`}
                                                            value={item.mfCategory || ""}
                                                            onChange={(e) => {
                                                                const cat = wmsCategories.find((c) => String(c.category) === e.target.value);
                                                                if (cat) {
                                                                    updateAssetField(asset.id, item.id, "mfCategory", cat.category);
                                                                    updateAssetField(asset.id, item.id, "mfCategoryCode", cat.asset_code);
                                                                    fetchWmsAmcsForAsset(asset.id, item.id, cat.asset_code);
                                                                } else {
                                                                    updateAssetField(asset.id, item.id, "mfCategory", "");
                                                                    updateAssetField(asset.id, item.id, "mfCategoryCode", undefined);
                                                                    updateAssetField(asset.id, item.id, "mfAmcsList", []);
                                                                }
                                                                updateAssetField(asset.id, item.id, "mfSubCategory", "");
                                                                updateAssetField(asset.id, item.id, "mfSubCategoryCode", undefined);
                                                                updateAssetField(asset.id, item.id, "mfAmc", "");
                                                                updateAssetField(asset.id, item.id, "mfAmcCode", undefined);
                                                                updateAssetField(asset.id, item.id, "mfSchemeName", "");
                                                                updateAssetField(asset.id, item.id, "mfSchemesList", []);
                                                                updateAssetField(asset.id, item.id, "mfExpectedReturn", "");
                                                                updateAssetField(asset.id, item.id, "mfHoldingPeriod", "");
                                                            }}
                                                            className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] focus:outline-none transition-colors ${errors[`${item.id}_mfCategory`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                        >
                                                            <option value="" disabled>Select Category</option>
                                                            {wmsCategories.map((cat) => (
                                                                <option key={cat.asset_code} value={cat.category}>
                                                                    {cat.category}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors[`${item.id}_mfCategory`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_mfCategory`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Sub Category <span className="text-red-600"> *</span>
                                                        </label>
                                                        <select
                                                            id={`${item.id}_mfSubCategory`}
                                                            value={item.mfSubCategory || ""}
                                                            onChange={(e) => {
                                                                const subCategoryName = e.target.value;
                                                                updateAssetField(asset.id, item.id, "mfSubCategory", subCategoryName);

                                                                const matchingSub = apiSubCategories.find(
                                                                    (sub) => sub.category === subCategoryName && sub.asset_code === item.mfCategoryCode
                                                                );
                                                                if (matchingSub) {
                                                                    updateAssetField(asset.id, item.id, "mfSubCategoryCode", matchingSub.classcode);
                                                                } else {
                                                                    updateAssetField(asset.id, item.id, "mfSubCategoryCode", undefined);
                                                                }

                                                                const mapping = getCategorySubCategoryExpectedReturn(item.mfCategory, subCategoryName);
                                                                if (mapping) {
                                                                    updateAssetField(asset.id, item.id, "mfExpectedReturn", mapping.returns);
                                                                    updateAssetField(asset.id, item.id, "mfHoldingPeriod", mapping.horizon);
                                                                } else {
                                                                    updateAssetField(asset.id, item.id, "mfExpectedReturn", "");
                                                                    updateAssetField(asset.id, item.id, "mfHoldingPeriod", "");
                                                                }

                                                                updateAssetField(asset.id, item.id, "mfAmc", "");
                                                                updateAssetField(asset.id, item.id, "mfAmcCode", undefined);
                                                                updateAssetField(asset.id, item.id, "mfSchemeName", "");
                                                                updateAssetField(asset.id, item.id, "mfSchemesList", []);
                                                            }}
                                                            className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] focus:outline-none transition-colors ${errors[`${item.id}_mfSubCategory`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                        >
                                                            <option value="" disabled>Select Sub Category</option>
                                                            {(WMS_SUB_CATEGORIES[normalizeCategoryKey(item.mfCategory) || item.mfCategory || ""] || []).map((subCategoryName) => (
                                                                <option key={subCategoryName} value={subCategoryName}>
                                                                    {subCategoryName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors[`${item.id}_mfSubCategory`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_mfSubCategory`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            AMC Name <span className="text-red-600"> *</span>
                                                        </label>
                                                        <select
                                                            id={`${item.id}_mfAmc`}
                                                            value={item.mfAmc || ""}
                                                            onChange={(e) => {
                                                                const currentAmcList = item.mfAmcsList || [];
                                                                const amc = currentAmcList.find((a) => String(a.s_name || a.amc_name || a.amc) === e.target.value);
                                                                if (amc) {
                                                                    const amcName = amc.s_name || amc.amc_name || amc.amc;
                                                                    const amcCode = amc.amc_code;
                                                                    updateAssetField(asset.id, item.id, "mfAmc", amcName);
                                                                    updateAssetField(asset.id, item.id, "mfAmcCode", amcCode);
                                                                    updateAssetField(asset.id, item.id, "mfSchemeName", "");
                                                                    fetchWmsSchemesForAsset(asset.id, item.id, amcCode, item.mfCategoryCode, item.mfSubCategory);
                                                                } else {
                                                                    updateAssetField(asset.id, item.id, "mfAmc", "");
                                                                    updateAssetField(asset.id, item.id, "mfAmcCode", undefined);
                                                                    updateAssetField(asset.id, item.id, "mfSchemeName", "");
                                                                    updateAssetField(asset.id, item.id, "mfSchemesList", []);
                                                                }
                                                            }}
                                                            className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] focus:outline-none transition-colors ${errors[`${item.id}_mfAmc`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                        >
                                                            <option value="" disabled>Select AMC</option>
                                                            {(item.mfAmcsList || []).map((amc) => {
                                                                const amcName = amc.s_name || amc.amc_name || amc.amc;
                                                                const amcCode = amc.amc_code;
                                                                return (
                                                                    <option key={amcCode} value={amcName}>
                                                                        {amcName}
                                                                    </option>
                                                                );
                                                            })}
                                                        </select>
                                                        {errors[`${item.id}_mfAmc`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_mfAmc`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Scheme Name <span className="text-red-600"> *</span>
                                                        </label>
                                                        <select
                                                            id={`${item.id}_mfSchemeName`}
                                                            value={item.mfSchemeName || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "mfSchemeName", e.target.value)}
                                                            className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] focus:outline-none transition-colors ${errors[`${item.id}_mfSchemeName`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                        >
                                                            <option value="">Select Scheme</option>
                                                            {item.mfSchemesList?.map((schemeName) => (
                                                                <option key={schemeName} value={schemeName}>
                                                                    {schemeName}
                                                                </option>
                                                            ))}
                                                        </select>
                                                        {errors[`${item.id}_mfSchemeName`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_mfSchemeName`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Mode of Investment <span className="text-red-600"> *</span>
                                                        </label>
                                                        <select
                                                            id={`${item.id}_mfMode`}
                                                            className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] focus:outline-none transition-colors ${errors[`${item.id}_mfMode`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            value={item.mfMode || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "mfMode", e.target.value)}
                                                        >
                                                            <option value="" disabled>Select Mode</option>
                                                            <option value="Lumpsum">Lumpsum</option>
                                                            <option value="SIP">SIP</option>
                                                        </select>
                                                        {errors[`${item.id}_mfMode`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_mfMode`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Amount Invested <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_mfAmount`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_mfAmount`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="₹ Amount"
                                                            value={item.mfAmount || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "mfAmount", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_mfAmount`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_mfAmount`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Current Value <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_mfCurrentValue`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_mfCurrentValue`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="₹ Value"
                                                            value={item.mfCurrentValue || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "mfCurrentValue", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_mfCurrentValue`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_mfCurrentValue`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Expected Return (%) <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_mfExpectedReturn`}
                                                            type="number"
                                                            step="0.01"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_mfExpectedReturn`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="%"
                                                            value={item.mfExpectedReturn || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "mfExpectedReturn", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_mfExpectedReturn`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_mfExpectedReturn`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Date of Investment <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_mfDate`}
                                                            type="date"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_mfDate`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            value={item.mfDate || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "mfDate", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_mfDate`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_mfDate`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Holding Period (Yrs) <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_mfHoldingPeriod`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_mfHoldingPeriod`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="Year"
                                                            value={item.mfHoldingPeriod || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "mfHoldingPeriod", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_mfHoldingPeriod`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_mfHoldingPeriod`]}</p>}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Real Estate Inputs */}
                                            {asset.assetClass === "Real Estate" && (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5">
                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Type <span className="text-red-600"> *</span>
                                                        </label>
                                                        <select
                                                            id={`${item.id}_reType`}
                                                            className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] focus:outline-none transition-colors ${errors[`${item.id}_reType`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            value={item.reType || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "reType", e.target.value)}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="Plot">Plot</option>
                                                            <option value="Flat">Flat</option>
                                                            <option value="House">House</option>
                                                            <option value="Commercial">Commercial</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                        {errors[`${item.id}_reType`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_reType`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            City <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_reCity`}
                                                            type="text"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_reCity`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="Enter City"
                                                            value={item.reCity || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "reCity", e.target.value.replace(/\d/g, ""))}
                                                        />
                                                        {errors[`${item.id}_reCity`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_reCity`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Locality <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_reLocality`}
                                                            type="text"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_reLocality`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="Enter Locality"
                                                            value={item.reLocality || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "reLocality", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_reLocality`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_reLocality`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Investment Amount <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_reAmount`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_reAmount`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="₹ Amount"
                                                            value={item.reAmount || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "reAmount", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_reAmount`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_reAmount`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Current estimated market value <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_reCurrentValue`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_reCurrentValue`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="₹ Value"
                                                            value={item.reCurrentValue || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "reCurrentValue", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_reCurrentValue`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_reCurrentValue`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Loan's (If any) <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_reLoanAmount`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_reLoanAmount`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="₹ Amount"
                                                            value={item.reLoanAmount !== undefined ? item.reLoanAmount : ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "reLoanAmount", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_reLoanAmount`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_reLoanAmount`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Rate of Interest on Loan (%) <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_reLoanRoi`}
                                                            type="number"
                                                            step="0.01"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_reLoanRoi`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="ROI"
                                                            value={item.reLoanRoi !== undefined ? item.reLoanRoi : ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "reLoanRoi", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_reLoanRoi`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_reLoanRoi`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Avg Rate of Return (%) <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_reExpectedReturn`}
                                                            type="number"
                                                            step="0.01"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_reExpectedReturn`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="8%"
                                                            value={item.reExpectedReturn || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "reExpectedReturn", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_reExpectedReturn`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_reExpectedReturn`]}</p>}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Gold Inputs */}
                                            {asset.assetClass === "Gold" && (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5">
                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Form of Gold <span className="text-red-600"> *</span>
                                                        </label>
                                                        <select
                                                            id={`${item.id}_goldForm`}
                                                            className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] focus:outline-none transition-colors ${errors[`${item.id}_goldForm`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            value={item.goldForm || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "goldForm", e.target.value)}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="Jewellery">Jewellery</option>
                                                            <option value="Coins">Coins</option>
                                                            <option value="Bars">Bars</option>
                                                            <option value="Gold ETF">Gold ETF</option>
                                                            <option value="SGB">SGB</option>
                                                            <option value="Digital Gold">Digital Gold</option>
                                                        </select>
                                                        {errors[`${item.id}_goldForm`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_goldForm`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Quantity (Grams) <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_goldQuantity`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_goldQuantity`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="Grams"
                                                            value={item.goldQuantity || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "goldQuantity", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_goldQuantity`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_goldQuantity`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Purchase Year <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_goldPurchaseYear`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_goldPurchaseYear`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="Year"
                                                            value={item.goldPurchaseYear || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "goldPurchaseYear", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_goldPurchaseYear`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_goldPurchaseYear`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Purchase Value <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_goldPurchaseValue`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_goldPurchaseValue`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="₹ Value"
                                                            value={item.goldPurchaseValue || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "goldPurchaseValue", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_goldPurchaseValue`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_goldPurchaseValue`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Current value (Approx.) <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_goldCurrentValue`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_goldCurrentValue`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="₹ Value"
                                                            value={item.goldCurrentValue || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "goldCurrentValue", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_goldCurrentValue`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_goldCurrentValue`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Avg Rate of Return (%) <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_goldExpectedReturn`}
                                                            type="number"
                                                            step="0.01"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_goldExpectedReturn`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="%"
                                                            value={item.goldExpectedReturn || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "goldExpectedReturn", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_goldExpectedReturn`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_goldExpectedReturn`]}</p>}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Silver Inputs */}
                                            {asset.assetClass === "Silver" && (
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5">
                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Form of Silver <span className="text-red-600"> *</span>
                                                        </label>
                                                        <select
                                                            id={`${item.id}_silverForm`}
                                                            className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] focus:outline-none transition-colors ${errors[`${item.id}_silverForm`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            value={item.silverForm || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "silverForm", e.target.value)}
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="Jewellery">Jewellery</option>
                                                            <option value="Coins">Coins</option>
                                                            <option value="Bars">Bars</option>
                                                            <option value="Silver ETF">Silver ETF</option>
                                                            <option value="SGB">SGB</option>
                                                            <option value="Digital Silver">Digital Silver</option>
                                                        </select>
                                                        {errors[`${item.id}_silverForm`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_silverForm`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Quantity (Grams) <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_silverQuantity`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_silverQuantity`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="Grams"
                                                            value={item.silverQuantity || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "silverQuantity", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_silverQuantity`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_silverQuantity`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Purchase Year <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_silverPurchaseYear`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_silverPurchaseYear`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="Year"
                                                            value={item.silverPurchaseYear || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "silverPurchaseYear", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_silverPurchaseYear`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_silverPurchaseYear`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Purchase Value <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_silverPurchaseValue`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_silverPurchaseValue`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="₹ Value"
                                                            value={item.silverPurchaseValue || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "silverPurchaseValue", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_silverPurchaseValue`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_silverPurchaseValue`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Current value (Approx.) <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_silverCurrentValue`}
                                                            type="number"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_silverCurrentValue`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="₹ Value"
                                                            value={item.silverCurrentValue || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "silverCurrentValue", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_silverCurrentValue`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_silverCurrentValue`]}</p>}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Avg Rate of Return (%) <span className="text-red-600"> *</span>
                                                        </label>
                                                        <input
                                                            id={`${item.id}_silverExpectedReturn`}
                                                            type="number"
                                                            step="0.01"
                                                            className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_silverExpectedReturn`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                }`}
                                                            placeholder="%"
                                                            value={item.silverExpectedReturn || ""}
                                                            onChange={(e) => updateAssetField(asset.id, item.id, "silverExpectedReturn", e.target.value)}
                                                        />
                                                        {errors[`${item.id}_silverExpectedReturn`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_silverExpectedReturn`]}</p>}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Other Asset Classes Inputs */}
                                            {asset.assetClass === "Other Assest Classes" && (
                                                <div>
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5">
                                                        <div className="mb-3">
                                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                                Other Assest Classes <span className="text-red-600"> *</span>
                                                            </label>
                                                            <input
                                                                id={`${item.id}_otherName`}
                                                                type="text"
                                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_otherName`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                    }`}
                                                                placeholder="Asset Name"
                                                                value={item.otherName || ""}
                                                                onChange={(e) => updateAssetField(asset.id, item.id, "otherName", e.target.value)}
                                                            />
                                                            {errors[`${item.id}_otherName`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_otherName`]}</p>}
                                                        </div>

                                                        <div className="mb-3">
                                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                                Details <span className="text-red-600"> *</span>
                                                            </label>
                                                            <input
                                                                id={`${item.id}_otherDetails`}
                                                                type="text"
                                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_otherDetails`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                    }`}
                                                                placeholder="Description"
                                                                value={item.otherDetails || ""}
                                                                onChange={(e) => updateAssetField(asset.id, item.id, "otherDetails", e.target.value)}
                                                            />
                                                            {errors[`${item.id}_otherDetails`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_otherDetails`]}</p>}
                                                        </div>

                                                        <div className="mb-3">
                                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                                Investment Date <span className="text-red-600"> *</span>
                                                            </label>
                                                            <input
                                                                id={`${item.id}_otherDate`}
                                                                type="date"
                                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_otherDate`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                    }`}
                                                                value={item.otherDate || ""}
                                                                onChange={(e) => updateAssetField(asset.id, item.id, "otherDate", e.target.value)}
                                                            />
                                                            {errors[`${item.id}_otherDate`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_otherDate`]}</p>}
                                                        </div>

                                                        <div className="mb-3">
                                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                                Invested Value <span className="text-red-600"> *</span>
                                                            </label>
                                                            <input
                                                                id={`${item.id}_otherAmount`}
                                                                type="number"
                                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_otherAmount`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                    }`}
                                                                placeholder="₹ Cost"
                                                                value={item.otherAmount || ""}
                                                                onChange={(e) => updateAssetField(asset.id, item.id, "otherAmount", e.target.value)}
                                                            />
                                                            {errors[`${item.id}_otherAmount`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_otherAmount`]}</p>}
                                                        </div>

                                                        <div className="mb-3">
                                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                                Current Value <span className="text-red-600"> *</span>
                                                            </label>
                                                            <input
                                                                id={`${item.id}_otherCurrentValue`}
                                                                type="number"
                                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_otherCurrentValue`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                    }`}
                                                                placeholder="₹ Value"
                                                                value={item.otherCurrentValue || ""}
                                                                onChange={(e) => updateAssetField(asset.id, item.id, "otherCurrentValue", e.target.value)}
                                                            />
                                                            {errors[`${item.id}_otherCurrentValue`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_otherCurrentValue`]}</p>}
                                                        </div>

                                                        <div className="mb-3">
                                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                                Avg Rate of Return (%) <span className="text-red-600"> *</span>
                                                            </label>
                                                            <input
                                                                id={`${item.id}_otherExpectedReturn`}
                                                                type="number"
                                                                step="0.01"
                                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`${item.id}_otherExpectedReturn`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                                    }`}
                                                                placeholder="%"
                                                                value={item.otherExpectedReturn || ""}
                                                                onChange={(e) => updateAssetField(asset.id, item.id, "otherExpectedReturn", e.target.value)}
                                                            />
                                                            {errors[`${item.id}_otherExpectedReturn`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${item.id}_otherExpectedReturn`]}</p>}
                                                        </div>
                                                    </div>

                                                    <div className="my-4 w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#06A358] transition-colors flex items-center gap-2">
                                                        <label className="flex items-center justify-center bg-[#d9d9d9] border-[0.5px] border-[#b1b1b1] rounded-[5px] w-[60px] h-[20px] text-[10px] text-[#44475b] cursor-pointer flex-shrink-0">
                                                            Browse...
                                                            <input type="file" className="hidden" onChange={(e) => handleFileChange(asset.id, item.id, e.target.files?.[0] || null)} />
                                                        </label>
                                                        <span className="text-[10px] text-[#8b8b8b] whitespace-nowrap truncate">
                                                            {item.otherFileName || "No file selected."}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                    {/* Add Button for this Asset Class */}
                                    <button
                                        type="button"
                                        onClick={() => addSubItem(asset.id, asset.assetClass)}
                                        className="w-full h-12 rounded-xl border border-dashed border-[#06A358] bg-white flex items-center justify-center gap-2 text-[#06A358] font-medium cursor-pointer hover:bg-[#06A358]/5 transition-all mt-2"
                                    >
                                        <Plus size={18} />
                                        {asset.assetClass === "FixedDeposits" && "Add Fixed Deposit"}
                                        {asset.assetClass === "Stocks" && "Add Stock"}
                                        {asset.assetClass === "Mutual Funds (MF)" && "Add Scheme"}
                                        {asset.assetClass === "Real Estate" && "Add Property"}
                                        {asset.assetClass === "Gold" && "Add Gold Asset"}
                                        {asset.assetClass === "Silver" && "Add Silver Asset"}
                                        {asset.assetClass === "Other Assest Classes" && "Add Other Asset"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Asset Button */}
            <div className="mt-6 rounded-xl border border-[#EAEAEA] p-5">
                <button
                    type="button"
                    onClick={addAsset}
                    disabled={assets.length >= 7}
                    className="w-full h-14 rounded-xl border border-[#E5E5E5] bg-white shadow-sm flex items-center justify-center gap-2 text-[#666] font-medium cursor-pointer hover:bg-gradient-to-r from-[#06A358] to-[#001EFE] hover:text-white transition-all disabled:opacity-50"
                >
                    <Plus size={18} />
                    Add Asset
                </button>
            </div>

            {/* StepActions Footer */}
            <div className="mt-8 border-t border-[#e9e9e9] pt-6">
                <StepActions
                    showBack={showBack}
                    onBack={onBack}
                    onContinue={handleContinue}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    );
}
