"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { Plus, Trash2 } from "lucide-react";
import StepActions from "./StepActions";
import { apiBaseURL, endpoints } from "../urls/URLS";

interface AssetItem {
    id: number;
    assetClass: string;
    
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
    const [assets, setAssets] = useState<AssetItem[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const addAsset = () => {
        setAssets((prev) => [
            ...prev,
            {
                id: Date.now(),
                assetClass: "",
            },
        ]);
    };

    const updateAsset = (id: number, value: string) => {
        setAssets((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { id: item.id, assetClass: value } // reset fields when class changes
                    : item
            )
        );
        // Clear errors when asset class is modified
        setErrors({});
    };

    const updateAssetField = (id: number, field: keyof AssetItem, value: any) => {
        setAssets((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, [field]: value }
                    : item
            )
        );
        // Clear specific error
        setErrors((prev) => ({
            ...prev,
            [`${id}_${field}`]: "",
        }));
    };

    const removeAsset = (id: number) => {
        setAssets((prev) =>
            prev.filter((item) => item.id !== id)
        );
        // Clean up errors for this asset
        setErrors((prev) => {
            const next = { ...prev };
            Object.keys(next).forEach((key) => {
                if (key.startsWith(`${id}_`)) {
                    delete next[key];
                }
            });
            return next;
        });
    };

    const [apiCategories, setApiCategories] = useState<any[]>([]);
    const [apiSubCategories, setApiSubCategories] = useState<any[]>([]);
    const [apiAmcs, setApiAmcs] = useState<any[]>([]);

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
    }, []);

    const fetchSchemesForAsset = async (id: number, catCode: number, subCategoryName: string, amcCode: number) => {
        try {
            const matchingClasscodes = apiSubCategories
                .filter((sub) => sub.category === subCategoryName && sub.asset_code === catCode)
                .map((sub) => sub.classcode);

            console.log("fetchSchemesForAsset inputs:", { id, catCode, subCategoryName, amcCode, matchingClasscodes });

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
                    prev.map((item) =>
                        item.id === id ? { ...item, mfSchemesList: [] } : item
                    )
                );
                return;
            }

            const json = await response.json();
            console.log("fetchSchemesForAsset API output:", json);
            if (json.success && Array.isArray(json.data)) {
                setAssets((prev) =>
                    prev.map((item) =>
                        item.id === id
                            ? { ...item, mfSchemesList: json.data.map((s: any) => s.scheme) }
                            : item
                    )
                );
            } else {
                // API returned success:false — clear the schemes list
                setAssets((prev) =>
                    prev.map((item) =>
                        item.id === id ? { ...item, mfSchemesList: [] } : item
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
        fetch(`https://k2b02x8c-5000.inc1.devtunnels.ms/api/existing-investments/profile/${profileId}`)
            .then((res) => res.json())
            .then((resData) => {
                if (resData.success && resData.data) {
                    if (Array.isArray(resData.data.assets)) {
                        const loadedAssets = resData.data.assets.map((asset: any) => {
                            return {
                                id: asset._id || Date.now() + Math.random(),
                                assetClass: asset.assetClass,
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
                                mfExpectedReturn: asset.mfExpectedReturn !== undefined ? String(asset.mfExpectedReturn) : "",
                                mfDate: asset.mfDate ? asset.mfDate.split("T")[0] : "",
                                mfHoldingPeriod: asset.mfHoldingPeriod !== undefined ? String(asset.mfHoldingPeriod) : "",
                                mfSchemesList: [],

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

        assets.forEach((item) => {
            if (
                item.assetClass === "Mutual Funds (MF)" &&
                item.mfCategoryCode &&
                item.mfSubCategory &&
                item.mfAmcCode &&
                (!item.mfSchemesList || item.mfSchemesList.length === 0)
            ) {
                fetchSchemesForAsset(
                    item.id,
                    item.mfCategoryCode,
                    item.mfSubCategory,
                    item.mfAmcCode
                );
            }
        });
    }, [apiSubCategories, assets.length]);

    const calculateTotal = () => {
        let total = 0;
        assets.forEach((asset) => {
            if (asset.assetClass === "FixedDeposits") {
                total += Number(asset.fdAmount) || 0;
            } else if (asset.assetClass === "Stocks") {
                total += Number(asset.stockAmount) || 0;
            } else if (asset.assetClass === "Mutual Funds (MF)") {
                total += Number(asset.mfAmount) || 0;
            } else if (asset.assetClass === "Real Estate") {
                total += Number(asset.reAmount) || 0;
            } else if (asset.assetClass === "Gold") {
                total += Number(asset.goldPurchaseValue) || 0;
            } else if (asset.assetClass === "Silver") {
                total += Number(asset.silverPurchaseValue) || 0;
            } else if (asset.assetClass === "Other Assest Classes") {
                total += Number(asset.otherAmount) || 0;
            }
        });
        return total;
    };

    const handleFileChange = (id: number, file: File | null) => {
        updateAssetField(id, "otherFileName", file ? file.name : "");
    };

    const handleContinue = async () => {
        if (!profileId) {
            alert("No Personal Profile ID found.");
            return;
        }

        const newErrors: Record<string, string> = {};

        // Frontend validation
        assets.forEach((a) => {
            if (!a.assetClass) {
                newErrors[`${a.id}_assetClass`] = "Please select an asset class.";
                return;
            }

            if (a.assetClass === "FixedDeposits") {
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
            } else if (a.assetClass === "Stocks") {
                if (!a.stockName?.trim()) newErrors[`${a.id}_stockName`] = "Stock name is required.";
                if (!a.stockCategory) newErrors[`${a.id}_stockCategory`] = "Category is required.";
                if (!a.stockAvgBuyPrice || Number(a.stockAvgBuyPrice) <= 0) newErrors[`${a.id}_stockAvgBuyPrice`] = "Please enter average buy price.";
                if (!a.stockQuantity || Number(a.stockQuantity) <= 0) newErrors[`${a.id}_stockQuantity`] = "Please enter quantity.";
                if (!a.stockAmount || Number(a.stockAmount) <= 0) newErrors[`${a.id}_stockAmount`] = "Please enter investment amount.";
                if (!a.stockCurrentValue || Number(a.stockCurrentValue) <= 0) newErrors[`${a.id}_stockCurrentValue`] = "Please enter current value.";
                if (!a.stockRoi || Number(a.stockRoi) < 0) newErrors[`${a.id}_stockRoi`] = "Please enter rate of return.";
                if (!a.stockHoldingPeriod || Number(a.stockHoldingPeriod) <= 0) newErrors[`${a.id}_stockHoldingPeriod`] = "Please enter holding period.";
            } else if (a.assetClass === "Mutual Funds (MF)") {
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
            } else if (a.assetClass === "Real Estate") {
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
            } else if (a.assetClass === "Gold") {
                if (!a.goldForm) newErrors[`${a.id}_goldForm`] = "Form of Gold is required.";
                if (!a.goldQuantity || Number(a.goldQuantity) <= 0) newErrors[`${a.id}_goldQuantity`] = "Please enter quantity.";
                if (!a.goldPurchaseYear || Number(a.goldPurchaseYear) < 1900) newErrors[`${a.id}_goldPurchaseYear`] = "Please enter purchase year.";
                if (!a.goldPurchaseValue || Number(a.goldPurchaseValue) <= 0) newErrors[`${a.id}_goldPurchaseValue`] = "Please enter purchase value.";
                if (!a.goldCurrentValue || Number(a.goldCurrentValue) <= 0) newErrors[`${a.id}_goldCurrentValue`] = "Please enter current value.";
                if (!a.goldExpectedReturn || Number(a.goldExpectedReturn) < 0) newErrors[`${a.id}_goldExpectedReturn`] = "Please enter rate of return.";
            } else if (a.assetClass === "Silver") {
                if (!a.silverForm) newErrors[`${a.id}_silverForm`] = "Form of Silver is required.";
                if (!a.silverQuantity || Number(a.silverQuantity) <= 0) newErrors[`${a.id}_silverQuantity`] = "Please enter quantity.";
                if (!a.silverPurchaseYear || Number(a.silverPurchaseYear) < 1900) newErrors[`${a.id}_silverPurchaseYear`] = "Please enter purchase year.";
                if (!a.silverPurchaseValue || Number(a.silverPurchaseValue) <= 0) newErrors[`${a.id}_silverPurchaseValue`] = "Please enter purchase value.";
                if (!a.silverCurrentValue || Number(a.silverCurrentValue) <= 0) newErrors[`${a.id}_silverCurrentValue`] = "Please enter current value.";
                if (!a.silverExpectedReturn || Number(a.silverExpectedReturn) < 0) newErrors[`${a.id}_silverExpectedReturn`] = "Please enter rate of return.";
            } else if (a.assetClass === "Other Assest Classes") {
                if (!a.otherName?.trim()) newErrors[`${a.id}_otherName`] = "Asset name is required.";
                if (!a.otherDetails?.trim()) newErrors[`${a.id}_otherDetails`] = "Details are required.";
                if (!a.otherDate) newErrors[`${a.id}_otherDate`] = "Date is required.";
                if (!a.otherAmount || Number(a.otherAmount) <= 0) newErrors[`${a.id}_otherAmount`] = "Please enter cost.";
                if (!a.otherCurrentValue || Number(a.otherCurrentValue) <= 0) newErrors[`${a.id}_otherCurrentValue`] = "Please enter current value.";
                if (!a.otherExpectedReturn || Number(a.otherExpectedReturn) < 0) newErrors[`${a.id}_otherExpectedReturn`] = "Please enter rate of return.";
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            const firstErrorKey = Object.keys(newErrors)[0];
            const errorElement = document.getElementById(firstErrorKey);
            if (errorElement) {
                errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
                errorElement.focus();
            }
            return;
        }

        setIsSubmitting(true);
        try {
            // Formulate payload converting frontend text inputs to types expected by API
            const payload = {
                personalProfileId: profileId,
                assets: assets.map((a) => {
                    const formatted: any = {
                        assetClass: a.assetClass,
                    };
                    if (a.assetClass === "FixedDeposits") {
                        formatted.fdBankName = a.fdBankName;
                        formatted.fdTenure = a.fdTenure;
                        formatted.fdAmount = Number(a.fdAmount);
                        formatted.fdRoi = Number(a.fdRoi);
                        formatted.fdMaturityDate = a.fdMaturityDate ? new Date(a.fdMaturityDate) : undefined;
                        formatted.fdMaturityValue = Number(a.fdMaturityValue);
                    } else if (a.assetClass === "Stocks") {
                        formatted.stockName = a.stockName;
                        formatted.stockCategory = a.stockCategory;
                        formatted.stockAvgBuyPrice = Number(a.stockAvgBuyPrice);
                        formatted.stockQuantity = Number(a.stockQuantity);
                        formatted.stockAmount = Number(a.stockAmount);
                        formatted.stockCurrentValue = Number(a.stockCurrentValue);
                        formatted.stockRoi = Number(a.stockRoi);
                        formatted.stockHoldingPeriod = Number(a.stockHoldingPeriod);
                    } else if (a.assetClass === "Mutual Funds (MF)") {
                        formatted.mfCategory = a.mfCategory;
                        formatted.mfCategoryCode = a.mfCategoryCode;
                        formatted.mfSubCategory = a.mfSubCategory;
                        formatted.mfSubCategoryCode = a.mfSubCategoryCode;
                        formatted.mfAmc = a.mfAmc;
                        formatted.mfAmcCode = a.mfAmcCode;
                        formatted.mfSchemeName = a.mfSchemeName;
                        formatted.mfMode = a.mfMode;
                        formatted.mfAmount = Number(a.mfAmount);
                        formatted.mfCurrentValue = Number(a.mfCurrentValue);
                        formatted.mfExpectedReturn = Number(a.mfExpectedReturn);
                        formatted.mfDate = a.mfDate ? new Date(a.mfDate) : undefined;
                        formatted.mfHoldingPeriod = Number(a.mfHoldingPeriod);
                    } else if (a.assetClass === "Real Estate") {
                        formatted.reType = a.reType;
                        formatted.reCity = a.reCity;
                        formatted.reLocality = a.reLocality;
                        formatted.reAmount = Number(a.reAmount);
                        formatted.reCurrentValue = Number(a.reCurrentValue);
                        formatted.reLoanAmount = Number(a.reLoanAmount) || 0;
                        formatted.reLoanRoi = Number(a.reLoanRoi) || 0;
                        formatted.reExpectedReturn = Number(a.reExpectedReturn);
                    } else if (a.assetClass === "Gold") {
                        formatted.goldForm = a.goldForm;
                        formatted.goldQuantity = Number(a.goldQuantity);
                        formatted.goldPurchaseYear = Number(a.goldPurchaseYear);
                        formatted.goldPurchaseValue = Number(a.goldPurchaseValue);
                        formatted.goldCurrentValue = Number(a.goldCurrentValue);
                        formatted.goldExpectedReturn = Number(a.goldExpectedReturn);
                    } else if (a.assetClass === "Silver") {
                        formatted.silverForm = a.silverForm;
                        formatted.silverQuantity = Number(a.silverQuantity);
                        formatted.silverPurchaseYear = Number(a.silverPurchaseYear);
                        formatted.silverPurchaseValue = Number(a.silverPurchaseValue);
                        formatted.silverCurrentValue = Number(a.silverCurrentValue);
                        formatted.silverExpectedReturn = Number(a.silverExpectedReturn);
                    } else if (a.assetClass === "Other Assest Classes") {
                        formatted.otherName = a.otherName;
                        formatted.otherDetails = a.otherDetails;
                        formatted.otherDate = a.otherDate ? new Date(a.otherDate) : undefined;
                        formatted.otherAmount = Number(a.otherAmount);
                        formatted.otherCurrentValue = Number(a.otherCurrentValue);
                        formatted.otherExpectedReturn = Number(a.otherExpectedReturn);
                        formatted.otherFileName = a.otherFileName;
                    }
                    return formatted;
                }),
            };

            const response = await fetch("https://k2b02x8c-5000.inc1.devtunnels.ms/api/existing-investments", {
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

            {/* Asset List */}
            <div className="space-y-5">
                {assets.map((asset) => (
                    <div key={asset.id} className="flex gap-4 items-end">
                        <div className="flex-1">
                            <div className="flex gap-4 items-end justify-between mb-4">
                                <label className="block text-sm font-medium text-[#44475B]">
                                    Select Asset Class <span className="text-red-600"> *</span>
                                </label>
                                <button
                                    type="button"
                                    onClick={() => removeAsset(asset.id)}
                                    className="cursor-pointer h-10 w-10 rounded-full bg-[#DB4437] text-white flex items-center justify-center"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <select
                                id={`${asset.id}_assetClass`}
                                value={asset.assetClass}
                                onChange={(e) => updateAsset(asset.id, e.target.value)}
                                className={`h-[48px] w-full rounded-[10px] border bg-white px-4 text-sm text-[#44475B] outline-none transition ${
                                    errors[`${asset.id}_assetClass`] ? "border-red-500 focus:border-red-500" : "border-[#E8E8E8] focus:border-[#04B488]"
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

                            {/* Fixed Deposits Inputs */}
                            {asset.assetClass === "FixedDeposits" && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5">
                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Name of the Bank/Institution <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_fdBankName`}
                                                type="text"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_fdBankName`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="Name"
                                                value={asset.fdBankName || ""}
                                                onChange={(e) => updateAssetField(asset.id, "fdBankName", e.target.value.replace(/\d/g, ""))}
                                            />
                                            {errors[`${asset.id}_fdBankName`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_fdBankName`]}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Tenure <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_fdTenure`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_fdTenure`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="Years"
                                                value={asset.fdTenure || ""}
                                                onChange={(e) => updateAssetField(asset.id, "fdTenure", e.target.value)}
                                            />
                                            {errors[`${asset.id}_fdTenure`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_fdTenure`]}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Investment Amount <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_fdAmount`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_fdAmount`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="₹ Amount"
                                                value={asset.fdAmount || ""}
                                                onChange={(e) => updateAssetField(asset.id, "fdAmount", e.target.value)}
                                            />
                                            {errors[`${asset.id}_fdAmount`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_fdAmount`]}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                ROI (%) <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_fdRoi`}
                                                type="number"
                                                step="0.01"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_fdRoi`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="Rate"
                                                value={asset.fdRoi || ""}
                                                onChange={(e) => updateAssetField(asset.id, "fdRoi", e.target.value)}
                                            />
                                            {errors[`${asset.id}_fdRoi`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_fdRoi`]}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Maturity Date <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_fdMaturityDate`}
                                                type="date"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_fdMaturityDate`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                value={asset.fdMaturityDate || ""}
                                                onChange={(e) => updateAssetField(asset.id, "fdMaturityDate", e.target.value)}
                                            />
                                            {errors[`${asset.id}_fdMaturityDate`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_fdMaturityDate`]}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Maturity Value <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_fdMaturityValue`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_fdMaturityValue`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="₹ Amount"
                                                value={asset.fdMaturityValue || ""}
                                                onChange={(e) => updateAssetField(asset.id, "fdMaturityValue", e.target.value)}
                                            />
                                            {errors[`${asset.id}_fdMaturityValue`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_fdMaturityValue`]}</p>}
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-[#e9e9e9] mt-5 sm:mt-5 mb-4 sm:mb-4" />
                                </>
                            )}

                            {/* Stocks Inputs */}
                            {asset.assetClass === "Stocks" && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5">
                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Name of Stock <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_stockName`}
                                                type="text"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_stockName`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="Name"
                                                value={asset.stockName || ""}
                                                onChange={(e) => updateAssetField(asset.id, "stockName", e.target.value)}
                                            />
                                            {errors[`${asset.id}_stockName`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_stockName`]}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Category <span className="text-red-600"> *</span>
                                            </label>
                                            <select
                                                id={`${asset.id}_stockCategory`}
                                                className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_stockCategory`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                value={asset.stockCategory || ""}
                                                onChange={(e) => updateAssetField(asset.id, "stockCategory", e.target.value)}
                                            >
                                                <option value="">Select</option>
                                                <option value="Large Cap">Large Cap</option>
                                                <option value="Mid Cap">Mid Cap</option>
                                                <option value="Small Cap">Small Cap</option>
                                            </select>
                                            {errors[`${asset.id}_stockCategory`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_stockCategory`]}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Avg Buy Price <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_stockAvgBuyPrice`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_stockAvgBuyPrice`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="₹ Price"
                                                value={asset.stockAvgBuyPrice || ""}
                                                onChange={(e) => updateAssetField(asset.id, "stockAvgBuyPrice", e.target.value)}
                                            />
                                            {errors[`${asset.id}_stockAvgBuyPrice`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_stockAvgBuyPrice`]}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Quantity <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_stockQuantity`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_stockQuantity`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="Qty"
                                                value={asset.stockQuantity || ""}
                                                onChange={(e) => updateAssetField(asset.id, "stockQuantity", e.target.value)}
                                            />
                                            {errors[`${asset.id}_stockQuantity`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_stockQuantity`]}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Investment Amount <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_stockAmount`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_stockAmount`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="₹ Amount"
                                                value={asset.stockAmount || ""}
                                                onChange={(e) => updateAssetField(asset.id, "stockAmount", e.target.value)}
                                            />
                                            {errors[`${asset.id}_stockAmount`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_stockAmount`]}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                ₹ C.V of Investment (Approx) <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_stockCurrentValue`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_stockCurrentValue`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="₹ Value"
                                                value={asset.stockCurrentValue || ""}
                                                onChange={(e) => updateAssetField(asset.id, "stockCurrentValue", e.target.value)}
                                            />
                                            {errors[`${asset.id}_stockCurrentValue`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_stockCurrentValue`]}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Avg Rate of Return (%) <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_stockRoi`}
                                                type="number"
                                                step="0.01"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_stockRoi`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="Rate"
                                                value={asset.stockRoi || ""}
                                                onChange={(e) => updateAssetField(asset.id, "stockRoi", e.target.value)}
                                            />
                                            {errors[`${asset.id}_stockRoi`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_stockRoi`]}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Holding Period <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_stockHoldingPeriod`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_stockHoldingPeriod`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="Years"
                                                value={asset.stockHoldingPeriod || ""}
                                                onChange={(e) => updateAssetField(asset.id, "stockHoldingPeriod", e.target.value)}
                                            />
                                            {errors[`${asset.id}_stockHoldingPeriod`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_stockHoldingPeriod`]}</p>}
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-[#e9e9e9] mt-5 sm:mt-5 mb-4 sm:mb-4" />
                                </>
                            )}

                            {/* Mutual Funds (MF) Inputs */}
                            {asset.assetClass === "Mutual Funds (MF)" && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5">
                                        <div className="mb-3">
                                             <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                 Category <span className="text-red-600"> *</span>
                                             </label>
                                             <select
                                                 id={`${asset.id}_mfCategory`}
                                                 value={asset.mfCategory || ""}
                                                 onChange={(e) => {
                                                     const cat = apiCategories.find((c) => String(c.asset_type) === e.target.value);
                                                     if (cat) {
                                                         updateAssetField(asset.id, "mfCategory", cat.asset_type);
                                                         updateAssetField(asset.id, "mfCategoryCode", cat.asset_code);
                                                     } else {
                                                         updateAssetField(asset.id, "mfCategory", "");
                                                         updateAssetField(asset.id, "mfCategoryCode", undefined);
                                                     }
                                                     updateAssetField(asset.id, "mfSubCategory", "");
                                                     updateAssetField(asset.id, "mfSubCategoryCode", undefined);
                                                     updateAssetField(asset.id, "mfAmc", "");
                                                     updateAssetField(asset.id, "mfAmcCode", undefined);
                                                     updateAssetField(asset.id, "mfSchemeName", "");
                                                     updateAssetField(asset.id, "mfSchemesList", []);
                                                 }}
                                                 className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] focus:outline-none transition-colors ${
                                                     errors[`${asset.id}_mfCategory`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                 }`}
                                             >
                                                 <option value="" disabled>Select Category</option>
                                                 {apiCategories.map((cat) => (
                                                     <option key={cat.asset_code} value={cat.asset_type}>
                                                         {cat.asset_type}
                                                     </option>
                                                 ))}
                                             </select>
                                             {errors[`${asset.id}_mfCategory`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_mfCategory`]}</p>}
                                         </div>

                                         <div className="mb-3">
                                             <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                 Sub Category <span className="text-red-600"> *</span>
                                             </label>
                                             <select
                                                 id={`${asset.id}_mfSubCategory`}
                                                 value={asset.mfSubCategory || ""}
                                                 onChange={(e) => {
                                                     const sub = apiSubCategories.find((s) => String(s.category) === e.target.value && s.asset_code === asset.mfCategoryCode);
                                                     if (sub) {
                                                         updateAssetField(asset.id, "mfSubCategory", sub.category);
                                                         updateAssetField(asset.id, "mfSubCategoryCode", sub.classcode);
                                                     } else {
                                                         updateAssetField(asset.id, "mfSubCategory", "");
                                                         updateAssetField(asset.id, "mfSubCategoryCode", undefined);
                                                     }
                                                     updateAssetField(asset.id, "mfAmc", "");
                                                     updateAssetField(asset.id, "mfAmcCode", undefined);
                                                     updateAssetField(asset.id, "mfSchemeName", "");
                                                     updateAssetField(asset.id, "mfSchemesList", []);
                                                 }}
                                                 className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] focus:outline-none transition-colors ${
                                                     errors[`${asset.id}_mfSubCategory`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                 }`}
                                             >
                                                 <option value="" disabled>Select Sub Category</option>
                                                 {Array.from(
                                                     new Set(
                                                         apiSubCategories
                                                             .filter((sub) => sub.asset_code === asset.mfCategoryCode)
                                                             .map((sub) => sub.category)
                                                     )
                                                 ).map((categoryName) => (
                                                     <option key={categoryName} value={categoryName}>
                                                         {categoryName}
                                                     </option>
                                                 ))}
                                             </select>
                                             {errors[`${asset.id}_mfSubCategory`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_mfSubCategory`]}</p>}
                                         </div>

                                         <div className="mb-3">
                                             <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                 AMC Name <span className="text-red-600"> *</span>
                                             </label>
                                             <select
                                                 id={`${asset.id}_mfAmc`}
                                                 value={asset.mfAmc || ""}
                                                 onChange={(e) => {
                                                     const amc = apiAmcs.find((a) => String(a.amc_name) === e.target.value);
                                                     if (amc) {
                                                         updateAssetField(asset.id, "mfAmc", amc.amc_name);
                                                         updateAssetField(asset.id, "mfAmcCode", amc.amc_code);
                                                         updateAssetField(asset.id, "mfSchemeName", "");
                                                         if (asset.mfCategoryCode && asset.mfSubCategory) {
                                                             fetchSchemesForAsset(asset.id, asset.mfCategoryCode, asset.mfSubCategory, amc.amc_code);
                                                         }
                                                     } else {
                                                         updateAssetField(asset.id, "mfAmc", "");
                                                         updateAssetField(asset.id, "mfAmcCode", undefined);
                                                         updateAssetField(asset.id, "mfSchemeName", "");
                                                         updateAssetField(asset.id, "mfSchemesList", []);
                                                     }
                                                 }}
                                                 className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] focus:outline-none transition-colors ${
                                                     errors[`${asset.id}_mfAmc`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                 }`}
                                             >
                                                 <option value="" disabled>Select AMC</option>
                                                 {apiAmcs.map((amc) => (
                                                     <option key={amc.amc_code} value={amc.amc_name}>
                                                         {amc.amc_name}
                                                     </option>
                                                 ))}
                                             </select>
                                             {errors[`${asset.id}_mfAmc`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_mfAmc`]}</p>}
                                         </div>

                                         <div className="mb-3">
                                             <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                 Scheme Name <span className="text-red-600"> *</span>
                                             </label>
                                             <select
                                                 id={`${asset.id}_mfSchemeName`}
                                                 value={asset.mfSchemeName || ""}
                                                 onChange={(e) => updateAssetField(asset.id, "mfSchemeName", e.target.value)}
                                                 className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] focus:outline-none transition-colors ${
                                                     errors[`${asset.id}_mfSchemeName`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                 }`}
                                             >
                                                 <option value="">Select Scheme</option>
                                                 {asset.mfSchemesList?.map((schemeName) => (
                                                     <option key={schemeName} value={schemeName}>
                                                         {schemeName}
                                                     </option>
                                                 ))}
                                             </select>
                                             {errors[`${asset.id}_mfSchemeName`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_mfSchemeName`]}</p>}
                                         </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Mode of Investment <span className="text-red-600"> *</span>
                                            </label>
                                            <select
                                                id={`${asset.id}_mfMode`}
                                                className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_mfMode`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                value={asset.mfMode || ""}
                                                onChange={(e) => updateAssetField(asset.id, "mfMode", e.target.value)}
                                            >
                                                <option value="" disabled>Select Mode</option>
                                                <option value="Lumpsum">Lumpsum</option>
                                                <option value="SIP">SIP</option>
                                            </select>
                                            {errors[`${asset.id}_mfMode`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_mfMode`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Amount Invested <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_mfAmount`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_mfAmount`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="₹ Amount"
                                                value={asset.mfAmount || ""}
                                                onChange={(e) => updateAssetField(asset.id, "mfAmount", e.target.value)}
                                            />
                                            {errors[`${asset.id}_mfAmount`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_mfAmount`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Current Value <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_mfCurrentValue`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_mfCurrentValue`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="₹ Value"
                                                value={asset.mfCurrentValue || ""}
                                                onChange={(e) => updateAssetField(asset.id, "mfCurrentValue", e.target.value)}
                                            />
                                            {errors[`${asset.id}_mfCurrentValue`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_mfCurrentValue`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Expected Return (%) <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_mfExpectedReturn`}
                                                type="number"
                                                step="0.01"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_mfExpectedReturn`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="%"
                                                value={asset.mfExpectedReturn || ""}
                                                onChange={(e) => updateAssetField(asset.id, "mfExpectedReturn", e.target.value)}
                                            />
                                            {errors[`${asset.id}_mfExpectedReturn`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_mfExpectedReturn`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Date of Investment <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_mfDate`}
                                                type="date"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_mfDate`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                value={asset.mfDate || ""}
                                                onChange={(e) => updateAssetField(asset.id, "mfDate", e.target.value)}
                                            />
                                            {errors[`${asset.id}_mfDate`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_mfDate`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Holding Period (Yrs) <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_mfHoldingPeriod`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_mfHoldingPeriod`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="Year"
                                                value={asset.mfHoldingPeriod || ""}
                                                onChange={(e) => updateAssetField(asset.id, "mfHoldingPeriod", e.target.value)}
                                            />
                                            {errors[`${asset.id}_mfHoldingPeriod`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_mfHoldingPeriod`]}</p>}
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-[#e9e9e9] mt-3 sm:mt-3 mb-4 sm:mb-4" />
                                </>
                            )}

                            {/* Real Estate Inputs */}
                            {asset.assetClass === "Real Estate" && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5">
                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Type <span className="text-red-600"> *</span>
                                            </label>
                                            <select
                                                id={`${asset.id}_reType`}
                                                className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_reType`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                value={asset.reType || ""}
                                                onChange={(e) => updateAssetField(asset.id, "reType", e.target.value)}
                                            >
                                                <option value="">Select</option>
                                                <option value="Plot">Plot</option>
                                                <option value="Flat">Flat</option>
                                                <option value="House">House</option>
                                                <option value="Commercial">Commercial</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            {errors[`${asset.id}_reType`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_reType`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                City <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_reCity`}
                                                type="text"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_reCity`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="Enter City"
                                                value={asset.reCity || ""}
                                                onChange={(e) => updateAssetField(asset.id, "reCity", e.target.value.replace(/\d/g, ""))}
                                            />
                                            {errors[`${asset.id}_reCity`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_reCity`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Locality <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_reLocality`}
                                                type="text"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_reLocality`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="Enter Locality"
                                                value={asset.reLocality || ""}
                                                onChange={(e) => updateAssetField(asset.id, "reLocality", e.target.value)}
                                            />
                                            {errors[`${asset.id}_reLocality`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_reLocality`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Investment Amount <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_reAmount`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_reAmount`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="₹ Amount"
                                                value={asset.reAmount || ""}
                                                onChange={(e) => updateAssetField(asset.id, "reAmount", e.target.value)}
                                            />
                                            {errors[`${asset.id}_reAmount`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_reAmount`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Current estimated market value <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_reCurrentValue`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_reCurrentValue`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="₹ Value"
                                                value={asset.reCurrentValue || ""}
                                                onChange={(e) => updateAssetField(asset.id, "reCurrentValue", e.target.value)}
                                            />
                                            {errors[`${asset.id}_reCurrentValue`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_reCurrentValue`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Loan's (If any) <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_reLoanAmount`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_reLoanAmount`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="₹ Amount"
                                                value={asset.reLoanAmount !== undefined ? asset.reLoanAmount : ""}
                                                onChange={(e) => updateAssetField(asset.id, "reLoanAmount", e.target.value)}
                                            />
                                            {errors[`${asset.id}_reLoanAmount`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_reLoanAmount`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Rate of Interest on Loan (%) <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_reLoanRoi`}
                                                type="number"
                                                step="0.01"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_reLoanRoi`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="ROI"
                                                value={asset.reLoanRoi !== undefined ? asset.reLoanRoi : ""}
                                                onChange={(e) => updateAssetField(asset.id, "reLoanRoi", e.target.value)}
                                            />
                                            {errors[`${asset.id}_reLoanRoi`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_reLoanRoi`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Avg Rate of Return (%) <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_reExpectedReturn`}
                                                type="number"
                                                step="0.01"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_reExpectedReturn`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="8%"
                                                value={asset.reExpectedReturn || ""}
                                                onChange={(e) => updateAssetField(asset.id, "reExpectedReturn", e.target.value)}
                                            />
                                            {errors[`${asset.id}_reExpectedReturn`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_reExpectedReturn`]}</p>}
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-[#e9e9e9] mt-3 sm:mt-3 mb-4 sm:mb-4" />
                                </>
                            )}

                            {/* Gold Inputs */}
                            {asset.assetClass === "Gold" && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5">
                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Form of Gold <span className="text-red-600"> *</span>
                                            </label>
                                            <select
                                                id={`${asset.id}_goldForm`}
                                                className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_goldForm`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                value={asset.goldForm || ""}
                                                onChange={(e) => updateAssetField(asset.id, "goldForm", e.target.value)}
                                            >
                                                <option value="">Select</option>
                                                <option value="Jewellery">Jewellery</option>
                                                <option value="Coins">Coins</option>
                                                <option value="Bars">Bars</option>
                                                <option value="Gold ETF">Gold ETF</option>
                                                <option value="SGB">SGB</option>
                                                <option value="Digital Gold">Digital Gold</option>
                                            </select>
                                            {errors[`${asset.id}_goldForm`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_goldForm`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Quantity (Grams) <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_goldQuantity`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_goldQuantity`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="Grams"
                                                value={asset.goldQuantity || ""}
                                                onChange={(e) => updateAssetField(asset.id, "goldQuantity", e.target.value)}
                                            />
                                            {errors[`${asset.id}_goldQuantity`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_goldQuantity`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Purchase Year <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_goldPurchaseYear`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_goldPurchaseYear`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="Year"
                                                value={asset.goldPurchaseYear || ""}
                                                onChange={(e) => updateAssetField(asset.id, "goldPurchaseYear", e.target.value)}
                                            />
                                            {errors[`${asset.id}_goldPurchaseYear`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_goldPurchaseYear`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Purchase Value <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_goldPurchaseValue`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_goldPurchaseValue`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="₹ Value"
                                                value={asset.goldPurchaseValue || ""}
                                                onChange={(e) => updateAssetField(asset.id, "goldPurchaseValue", e.target.value)}
                                            />
                                            {errors[`${asset.id}_goldPurchaseValue`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_goldPurchaseValue`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Current value (Approx.) <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_goldCurrentValue`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_goldCurrentValue`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="₹ Value"
                                                value={asset.goldCurrentValue || ""}
                                                onChange={(e) => updateAssetField(asset.id, "goldCurrentValue", e.target.value)}
                                            />
                                            {errors[`${asset.id}_goldCurrentValue`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_goldCurrentValue`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Avg Rate of Return (%) <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_goldExpectedReturn`}
                                                type="number"
                                                step="0.01"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_goldExpectedReturn`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="%"
                                                value={asset.goldExpectedReturn || ""}
                                                onChange={(e) => updateAssetField(asset.id, "goldExpectedReturn", e.target.value)}
                                            />
                                            {errors[`${asset.id}_goldExpectedReturn`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_goldExpectedReturn`]}</p>}
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-[#e9e9e9] mt-3 sm:mt-3 mb-4 sm:mb-4" />
                                </>
                            )}

                            {/* Silver Inputs */}
                            {asset.assetClass === "Silver" && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5">
                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Form of Silver <span className="text-red-600"> *</span>
                                            </label>
                                            <select
                                                id={`${asset.id}_silverForm`}
                                                className={`cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_silverForm`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                value={asset.silverForm || ""}
                                                onChange={(e) => updateAssetField(asset.id, "silverForm", e.target.value)}
                                            >
                                                <option value="">Select</option>
                                                <option value="Jewellery">Jewellery</option>
                                                <option value="Coins">Coins</option>
                                                <option value="Bars">Bars</option>
                                                <option value="Silver ETF">Silver ETF</option>
                                                <option value="SGB">SGB</option>
                                                <option value="Digital Silver">Digital Silver</option>
                                            </select>
                                            {errors[`${asset.id}_silverForm`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_silverForm`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Quantity (Grams) <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_silverQuantity`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_silverQuantity`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="Grams"
                                                value={asset.silverQuantity || ""}
                                                onChange={(e) => updateAssetField(asset.id, "silverQuantity", e.target.value)}
                                            />
                                            {errors[`${asset.id}_silverQuantity`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_silverQuantity`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Purchase Year <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_silverPurchaseYear`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_silverPurchaseYear`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="Year"
                                                value={asset.silverPurchaseYear || ""}
                                                onChange={(e) => updateAssetField(asset.id, "silverPurchaseYear", e.target.value)}
                                            />
                                            {errors[`${asset.id}_silverPurchaseYear`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_silverPurchaseYear`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Purchase Value <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_silverPurchaseValue`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_silverPurchaseValue`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="₹ Value"
                                                value={asset.silverPurchaseValue || ""}
                                                onChange={(e) => updateAssetField(asset.id, "silverPurchaseValue", e.target.value)}
                                            />
                                            {errors[`${asset.id}_silverPurchaseValue`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_silverPurchaseValue`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Current value (Approx.) <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_silverCurrentValue`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_silverCurrentValue`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="₹ Value"
                                                value={asset.silverCurrentValue || ""}
                                                onChange={(e) => updateAssetField(asset.id, "silverCurrentValue", e.target.value)}
                                            />
                                            {errors[`${asset.id}_silverCurrentValue`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_silverCurrentValue`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Avg Rate of Return (%) <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_silverExpectedReturn`}
                                                type="number"
                                                step="0.01"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_silverExpectedReturn`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="%"
                                                value={asset.silverExpectedReturn || ""}
                                                onChange={(e) => updateAssetField(asset.id, "silverExpectedReturn", e.target.value)}
                                            />
                                            {errors[`${asset.id}_silverExpectedReturn`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_silverExpectedReturn`]}</p>}
                                        </div>
                                    </div>
                                    <div className="w-full h-px bg-[#e9e9e9] mt-3 sm:mt-3 mb-4 sm:mb-4" />
                                </>
                            )}

                            {/* Other Asset Classes Inputs */}
                            {asset.assetClass === "Other Assest Classes" && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5">
                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Other Assest Classes <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_otherName`}
                                                type="text"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_otherName`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="Asset Name"
                                                value={asset.otherName || ""}
                                                onChange={(e) => updateAssetField(asset.id, "otherName", e.target.value)}
                                            />
                                            {errors[`${asset.id}_otherName`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_otherName`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Details <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_otherDetails`}
                                                type="text"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_otherDetails`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="Description"
                                                value={asset.otherDetails || ""}
                                                onChange={(e) => updateAssetField(asset.id, "otherDetails", e.target.value)}
                                            />
                                            {errors[`${asset.id}_otherDetails`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_otherDetails`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Investment Date <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_otherDate`}
                                                type="date"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_otherDate`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                value={asset.otherDate || ""}
                                                onChange={(e) => updateAssetField(asset.id, "otherDate", e.target.value)}
                                            />
                                            {errors[`${asset.id}_otherDate`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_otherDate`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Invested Value <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_otherAmount`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_otherAmount`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="₹ Cost"
                                                value={asset.otherAmount || ""}
                                                onChange={(e) => updateAssetField(asset.id, "otherAmount", e.target.value)}
                                            />
                                            {errors[`${asset.id}_otherAmount`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_otherAmount`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Current Value <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_otherCurrentValue`}
                                                type="number"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_otherCurrentValue`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="₹ Value"
                                                value={asset.otherCurrentValue || ""}
                                                onChange={(e) => updateAssetField(asset.id, "otherCurrentValue", e.target.value)}
                                            />
                                            {errors[`${asset.id}_otherCurrentValue`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_otherCurrentValue`]}</p>}
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Avg Rate of Return (%) <span className="text-red-600"> *</span>
                                            </label>
                                            <input
                                                id={`${asset.id}_otherExpectedReturn`}
                                                type="number"
                                                step="0.01"
                                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${
                                                    errors[`${asset.id}_otherExpectedReturn`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                                }`}
                                                placeholder="%"
                                                value={asset.otherExpectedReturn || ""}
                                                onChange={(e) => updateAssetField(asset.id, "otherExpectedReturn", e.target.value)}
                                            />
                                            {errors[`${asset.id}_otherExpectedReturn`] && <p className="text-red-500 text-[11px] mt-1">{errors[`${asset.id}_otherExpectedReturn`]}</p>}
                                        </div>
                                    </div>

                                    <div className="my-4 w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#06A358] transition-colors flex items-center gap-2">
                                        <label className="flex items-center justify-center bg-[#d9d9d9] border-[0.5px] border-[#b1b1b1] rounded-[5px] w-[60px] h-[20px] text-[10px] text-[#44475b] cursor-pointer flex-shrink-0">
                                            Browse...
                                            <input type="file" className="hidden" onChange={(e) => handleFileChange(asset.id, e.target.files?.[0] || null)} />
                                        </label>
                                        <span className="text-[10px] text-[#8b8b8b] whitespace-nowrap truncate">
                                            {asset.otherFileName || "No file selected."}
                                        </span>
                                    </div>
                                    <div className="w-full h-px bg-[#e9e9e9] mt-5 mb-4 sm:mb-4" />
                                </>
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
