"use client";
import React, { useState, useEffect } from "react";
import { apiBaseURL, endpoints } from "../urls/URLS";
interface AmcItem {
    amc_code: number;
    amc_name: string;
}
interface RiskItem {
    risk: string;
    risk_code: number;
}
interface AssetTypeItem {
    asset_code: number;
    asset_type: string;
}

interface CategoryItem {
    asset_code: number;
    category: string;
    sub_category: string;
    classcode: number;
}
interface SortItem {
    sort_mode: string;
    sort_code: number;
}
interface FilterPanelProps {
    onFilterChange: (filters: any) => void;
}

const CustomTick = ({ active }: { active: boolean }) => (
    <div
        className="flex items-center justify-center shrink-0 rounded-full transition-all duration-200"
        style={{
            width: "22px",
            height: "22px",
            padding: active ? "0" : "1px",
            background: active
                ? "linear-gradient(269.9deg, #06A358 24.53%, #001EFE 156.82%)"
                : "linear-gradient(90deg, rgba(4, 180, 136, 0.2) 39.5%, rgba(1, 30, 254, 0.2) 100%)"
        }}
    >
        <div
            className="w-full h-full rounded-full flex items-center justify-center transition-colors duration-200"
            style={{
                background: active ? "transparent" : "#F3F9FD"
            }}
        >
            {active && (
                <svg width="13" height="10" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 4.5L4.5 7.5L10.5 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
        </div>
    </div>
);


const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange }) => {
    const [type, setType] = useState("");
    const [category, setCategory] = useState<string[]>([]);
    const [risk, setRisk] = useState("");
    const [amc, setAmc] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("");
    const [assetTypes, setAssetTypes] = useState<AssetTypeItem[]>([]);
    const [amcList, setAmcList] = useState<AmcItem[]>([]);
    const [riskList, setRiskList] = useState<RiskItem[]>([]);
    const [sortList, setSortList] = useState<SortItem[]>([]);
    const [allCategories, setAllCategories] = useState<CategoryItem[]>([]);
    const [filteredCategories, setFilteredCategories] = useState<CategoryItem[]>(
        [],
    );

    useEffect(() => {
        // Skip first load
        if (!type) return;

        setCategory([]);
        setAmc([]);
        setRisk("");
    }, [type]);
    useEffect(() => {
        const fetchSortFilters = async () => {
            try {
                const res = await fetch(apiBaseURL + endpoints.sort);
                const json = await res.json();

                if (json.success && Array.isArray(json.data)) {
                    setSortList(json.data);

                    // auto-select first sort option if needed
                    if (json.data.length > 0) {
                        setSortBy(String(json.data[0].sort_code));
                    }
                }
            } catch (error) {
                console.error("SORT FILTER API ERROR:", error);
            }
        };

        fetchSortFilters();
    }, []);

    useEffect(() => {
        const fetchAmcList = async () => {
            try {
                const res = await fetch(apiBaseURL + endpoints.getAMCList);
                const json = await res.json();

                if (json.success && Array.isArray(json.data)) {
                    setAmcList(json.data); // Store API result
                }
            } catch (error) {
                console.error("AMC LIST API ERROR:", error);
            }
        };

        fetchAmcList();
    }, []);

    useEffect(() => {
        const fetchRiskList = async () => {
            try {
                const res = await fetch(apiBaseURL + endpoints.getRiskFilters);
                const json = await res.json();

                if (json.success && Array.isArray(json.data)) {
                    setRiskList(json.data); // dynamic risk filters
                }
            } catch (error) {
                console.error("RISK FILTER API ERROR:", error);
            }
        };

        fetchRiskList();
    }, []);

    useEffect(() => {
        const fetchAssetTypes = async () => {
            try {
                const res = await fetch(apiBaseURL + endpoints.getassettypefilter);
                const json = await res.json();

                if (json.success && Array.isArray(json.data)) {
                    setAssetTypes(json.data);

                    // 👉 Auto-select Equity (asset_code = 1)
                    const equityItem = json.data.find(
                        (item: AssetTypeItem) => item.asset_type.toLowerCase() === "equity",
                    );

                    if (equityItem) {
                        setType(String(equityItem.asset_code));
                    }
                }
            } catch (error) {
                console.error("ASSET TYPE API ERROR:", error);
            }
        };

        fetchAssetTypes();
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(apiBaseURL + endpoints.getassetlist);
                const json = await res.json();

                if (json.success && Array.isArray(json.data)) {
                    setAllCategories(json.data);
                }
            } catch (error) {
                console.error("CATEGORY API ERROR:", error);
            }
        };

        fetchCategories();
    }, []);
    useEffect(() => {
        if (!type) return;
        const filtered = allCategories.filter((c) => String(c.asset_code) === type);
        setFilteredCategories(filtered);
    }, [type, allCategories]);

    // -----------------------------------------------------
    // 🔥 Send filter values to parent on any change
    // -----------------------------------------------------
    // Whenever any filter changes → send to parent
    useEffect(() => {
        onFilterChange({ type, category, amc, risk, sortBy });
    }, [type, category, amc, risk, sortBy]);

    // ----------------- CLICKABLE BLOCK TOGGLE FUNCTION -----------------
    const toggleArray = (setter: any, value: string) => {
        setter((prev: string[]) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
        );
    };

    return (
        <div className="bg-transparent mt-1 px-0">
            {/* Sort By */}
            <div className="mb-6">
                <h6 className="font-bold text-[14px] text-[#44475B] mb-3 tracking-wide">Sort By</h6>
                <div className="flex flex-col gap-3">
                    {sortList.map((item) => {
                        const val = String(item.sort_code);
                        const active = sortBy === val;

                        return (
                            <div
                                key={item.sort_code}
                                className="flex items-center gap-2.5"
                                onClick={() => setSortBy(active ? "" : val)}
                                style={{ cursor: "pointer" }}
                            >
                                <CustomTick active={active} />

                                <label className="text-[14px] text-gray-600 cursor-pointer mb-0 leading-tight">{item.sort_mode}</label>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Category */}
            <div className="mb-8">
                <div className="pt-2 pb-1">
                    <h6 className="font-bold text-[14px] text-[#44475B] mb-5 tracking-wide">Category</h6>

                    {/* Type Tabs */}
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">TYPE</p>
                    <div className="flex flex-wrap gap-2 mb-6">
                        {assetTypes.map((item) => {
                            const val = String(item.asset_code);
                            const active = type === val;

                            return (
                                <button
                                    key={item.asset_code}
                                    className={`px-5 py-1.5 text-[15px] font-medium rounded-full transition-all duration-300 cursor-pointer ${active
                                        ? "border border-transparent text-white"
                                        : "bg-transparent hover:bg-[#F3F9FD] border border-transparent hover:border-[#F3F9FD]"
                                        }`}
                                    style={
                                        active
                                            ? { background: "linear-gradient(269.9deg,  #06A358 24.53%, #001EFE 156.82%)" }
                                            : {
                                                background: "linear-gradient(white, white) padding-box, linear-gradient(90deg, rgba(4, 180, 136, 0.2) 39.5%, rgba(1, 30, 254, 0.2) 100%) border-box",
                                            }
                                    }
                                    onClick={() => setType(val)}
                                >
                                    <span
                                        style={
                                            !active
                                                ? {
                                                    background: "linear-gradient(90deg, #04B488 39.5%, #011EFE 100%)",
                                                    WebkitBackgroundClip: "text",
                                                    WebkitTextFillColor: "transparent",
                                                    display: "inline-block",
                                                }
                                                : {}
                                        }
                                    >
                                        {item.asset_type}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">CATEGORY</p>
                </div>

                <div className="flex flex-col gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredCategories.map((item) => {
                        const value = `cat-${item.classcode}`;
                        const active = category.includes(value);

                        return (
                            <div
                                key={item.classcode}
                                className="flex items-center gap-2.5"
                                onClick={() => toggleArray(setCategory, value)}
                                style={{ cursor: "pointer" }}
                            >
                                <CustomTick active={active} />

                                <label className="text-[14px] text-gray-600 cursor-pointer mb-0 leading-tight">
                                    {item.category}
                                    {item.sub_category ? ` - ${item.sub_category}` : ""}
                                </label>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Risk */}
            <div className="mb-8">
                <h6 className="font-bold text-[14px] text-[#44475B] mb-4 tracking-wide">Risk</h6>
                <div className="grid grid-cols-2 gap-y-3 gap-x-2">
                    {riskList.map((item) => {
                        const val = String(item.risk_code);
                        const active = risk === val;

                        return (
                            <div
                                key={item.risk_code}
                                className="flex items-center gap-2.5"
                                onClick={() => setRisk(active ? "" : val)}
                                style={{ cursor: "pointer" }}
                            >
                                <CustomTick active={active} />

                                <label className="text-[14px] text-gray-600 flex-1 cursor-pointer mb-0 leading-tight">{item.risk}</label>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* AMC */}
            <div className="mb-6">
                <h6 className="font-bold text-[14px] text-[#44475B] mb-4 tracking-wide">AMC</h6>
                <div className="flex flex-col gap-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                    {amcList.map((item) => {
                        const val = String(item.amc_code);
                        const active = amc.includes(val);

                        return (
                            <div
                                key={item.amc_code}
                                className="flex items-center gap-2.5"
                                onClick={() => toggleArray(setAmc, val)}
                                style={{ cursor: "pointer" }}
                            >
                                <CustomTick active={active} />

                                <label className="text-[14px] text-gray-600 flex-1 cursor-pointer mb-0 leading-tight">{item.amc_name}</label>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FilterPanel;
