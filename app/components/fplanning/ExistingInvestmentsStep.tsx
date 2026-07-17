"use client";
import { useState, ChangeEvent } from "react";
import { Plus, Trash2 } from "lucide-react";

interface AssetItem {
    id: number;
    assetClass: string;
}

export default function ExistingInvestmentsStep() {
    const [assets, setAssets] = useState<AssetItem[]>([]);

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
                    ? { ...item, assetClass: value }
                    : item
            )
        );
    };

    const removeAsset = (id: number) => {
        setAssets((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };


    // const assetClasses = [
    //     { value: "FixedDeposits", label: "Fixed Deposits (FDs)" },
    //     { value: "Stocks", label: "Stocks" },
    //     { value: "MutualFunds", label: "Mutual Funds (MF)" },
    //     { value: "RealEstate", label: "Real Estate" },
    //     { value: "Gold", label: "Gold" },
    //     { value: "Silver", label: "Silver" },
    //     { value: "OtherAssetClasses", label: "Other Asset Classes" },

    // ];

    const fundData = {
        Equity: {
            subCategories: [
                "Multi Cap Fund",
                "Flexi Cap Fund",
                "Large Cap Fund",
                "Large & Mid Cap Fund",
                "Mid Cap Fund",
                "Small Cap Fund",
                "Dividend Yield Fund",
                "Value Fund",
                "Contra Fund",
                "Focused Fund",
                "Sectoral/Thematic Fund",
                "ELSS",
            ],
            amcs: [
                "360 ONE",
                "Aditya Birla SL MF",
                "Abakkus MF",
                "Altiva SIF",
                "Angel One",
                "Arthaya SIF",
            ],
        },

        Hybrid: {
            subCategories: [
                "Conservative Hybrid",
                "Balanced Hybrid ",
                "Aggressive Hybrid",
                "Dynamic Asset Allocation",
                "Multi Asset Allocation",
                "Arbitrage Fund",
                "Equity Savings Fund",
            ],
            amcs: [
                "360 ONE",
                "APEX SIF",
                "Aditya Birla SL MF",
                "Altiva SIF",
                "Arudha SIF",
                "Axis MF",
            ],
        },

        Debt: {
            subCategories: [
                "Overnight Fund",
                "Liquid Fund",
                "Money Market Fund",
                "Ultra Short Duration",
                "Low Duration Fund",
                "Short Duration Fund",
                "Medium Duration Fund",
                "Medium to Long Duration",
                "Long Duration Fund",
                "Dynamic Bond Fund",
                "Corporate Bond Fund",
                "Credit Risk Fund",
                "Banking & PSU Fund",
                "Gilt Fund",
                "Gilt 10Y Fund",
                "Floater Fund",
            ],
            amcs: [
                "360 ONE",
                "APEX SIF",
                "Aditya Birla SL MF",
                "Altiva SIF",
                "Arudha SIF",
                "Axis MF",
            ],
        },

        "Commodity/Other": {
            subCategories: [
                "Gold Fund",
                "Silver Fund",
            ],
            amcs: [
                "360 ONE",
                "APEX SIF",
                "Aditya Birla SL MF",
                "Altiva SIF",
                "Arudha SIF",
                "Axis MF",
            ],
        },
    };

    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [amc, setAmc] = useState("");

    return (
        <div className="rounded-[24px] border border-[#E5E5E5] bg-white p-6 shadow-sm">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-center gap-2">
                <h3 className="col-span-8 font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[25px] bg-gradient-to-r from-[#06a358] to-[#001EFE] bg-clip-text text-transparent pb-3">
                    Your Existing Investments
                </h3>

                <div className="col-span-1 items-center text-end rounded-[10px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-1 md:p-2">
                    <div className="flex items-center gap-1 justify-end px-5">
                        <img className="w-[15px] h-[15px]" src="/financialplanning/moneybag.png" alt="moneybag" />
                        <p className="text-[#06A358] font-semibold">Total: ₹3,00,000,00</p>
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-[#e9e9e9] mt-5 sm:mt-5 mb-5 sm:mb-6" />

            {/* Asset List */}
            <div className="space-y-5">
                {assets.map((asset) => (
                    <div
                        key={asset.id}
                        className="flex gap-4 items-end"
                    >
                        <div className="flex-1">
                            <div className="flex gap-4 items-end justify-between mb-4">
                                <label className="block text-sm font-medium text-[#44475B]">
                                    Select Asset Class
                                </label>
                                <button
                                    onClick={() => removeAsset(asset.id)}
                                    className="cursor-pointer h-10 w-10 rounded-full bg-[#DB4437] text-white flex items-center justify-center"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <select
                                value={asset.assetClass}
                                onChange={(e) => updateAsset(asset.id, e.target.value)}
                                className="h-[48px] w-full rounded-[10px] border border-[#E8E8E8] bg-white px-4 text-sm text-[#44475B] outline-none transition focus:border-[#04B488]"
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
                                            !assets.some(
                                                (a) => a.assetClass === option
                                            )
                                    )
                                    .map((option) => (
                                        <option key={option} value={option}>
                                            {
                                                option === "FixedDeposits" ? "Fixed Deposits (FDs)" : option
                                            }
                                        </option>
                                    ))}
                            </select>

                            {/* <select
                                value={asset.assetClass}
                                onChange={(e) => updateAsset(asset.id, e.target.value)}
                                className="h-[48px] w-full rounded-[10px] border border-[#E8E8E8] bg-white px-4 text-sm text-[#44475B] outline-none transition focus:border-[#04B488]">
                                <option value="">--Select--</option>

                                {assetClasses.map((asset) => (
                                    <option key={asset.value} value={asset.value}>
                                        {asset.label}
                                    </option>
                                ))}
                            </select> */}

                            {asset.assetClass === "FixedDeposits" && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5" >

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Name of the Bank/Institution
                                            </label>
                                            <input type="text" className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" placeholder="Name" />
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Tenure
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Years" />
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Investment Amount
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="₹ Amount" />
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                ROI (%)
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Rate" />
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Maturity Date
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="date" placeholder="Maturity Date" />
                                        </div>
                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Maturity Value
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="₹ Amount" />
                                        </div>

                                    </div>
                                    <div className="w-full h-px bg-[#e9e9e9] mt-5 sm:mt-5 mb-4 sm:mb-4" />
                                </>
                            )}

                            {asset.assetClass === "Stocks" && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5" >

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Name of Stock
                                            </label>
                                            <input type="text" className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" placeholder="Name" />
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Category
                                            </label>
                                            <select className=" cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors">
                                                <option value="">Select</option>
                                                <option value="Large Cap">Large Cap</option>
                                                <option value="Mid Cap">Mid Cap</option>
                                                <option value="Small Cap">Small Cap</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Avg Buy Price
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="₹ Price" />
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Quantity
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Qty" />
                                        </div>

                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Investment Amount
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="₹ Amount" />
                                        </div>
                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                ₹ C.V of Investment (Approx)
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="₹ Value" />
                                        </div>
                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Avg Rate of Return (%)
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Rate" />
                                        </div>
                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Holding Period
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Years" />
                                        </div>

                                    </div>
                                    <div className="w-full h-px bg-[#e9e9e9] mt-5 sm:mt-5 mb-4 sm:mb-4" />
                                </>
                            )}

                            {asset.assetClass === "Mutual Funds (MF)" && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5" >

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Category
                                                <span className="text-red-600"> *</span>
                                            </label>
                                            <select
                                                value={category}
                                                onChange={(e) => {
                                                    setCategory(e.target.value);
                                                    setSubCategory("");
                                                    setAmc("");
                                                }}
                                                className=" cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors">
                                                <option value="" disabled>Select Category</option>
                                                <option value="Equity">Equity</option>
                                                <option value="Hybrid">Hybrid</option>
                                                <option value="Debt">Debt</option>
                                                <option value="Commodity/Other">Commodity/Other</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Sub  Category
                                                <span className="text-red-600"> *</span>
                                            </label>
                                            <select
                                                value={subCategory}
                                                onChange={(e) => setSubCategory(e.target.value)}
                                                className=" cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors">
                                                <option value="" disabled>Select Sub Category</option>
                                                {category &&
                                                    fundData[category as keyof typeof fundData]
                                                        ?.subCategories.map((item) => (
                                                            <option key={item} value={item}>
                                                                {item}
                                                            </option>
                                                        ))}
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                AMC Name
                                                <span className="text-red-600"> *</span>
                                            </label>
                                            <select
                                                value={amc}
                                                onChange={(e) => setAmc(e.target.value)}
                                                className=" cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors">
                                                <option value="" disabled>Select AMC</option>
                                                {category &&
                                                    fundData[category as keyof typeof fundData]
                                                        ?.amcs.map((item) => (
                                                            <option key={item} value={item}>
                                                                {item}
                                                            </option>
                                                        ))}
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Scheme Name
                                                <span className="text-red-600"> *</span>
                                            </label>
                                            <select className=" cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors">
                                                <option value="">Select Scheme</option>
                                                <option value="Service">360 ONE Balanced Hybrid Fund(G)-Direct Plan</option>
                                                <option value="Service">360 ONE Balanced Hybrid Fund(IDCW Reinvest)-Direct Plan</option>
                                                <option value="Service">360 ONE Balanced Hybrid Fund(IDCW)-Direct Plan</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Mode of Investment
                                                <span className="text-red-600"> *</span>
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Lumpsum" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Amount Invested
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="₹ Amount" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Current Value
                                                <span className="text-red-600"> *</span>
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="₹ Value" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Expected Return (%) *
                                                <span className="text-red-600"> *</span>
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="%" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Date of Investment
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="date" placeholder="Date of Investment" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Holding Period (Yrs)
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Year" />
                                        </div>

                                    </div>
                                    <div className="w-full h-px bg-[#e9e9e9] mt-3 sm:mt-3 mb-4 sm:mb-4" />
                                </>
                            )}

                            {asset.assetClass === "Real Estate" && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5" >

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Type
                                            </label>
                                            <select className=" cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors">
                                                <option value="">Select</option>
                                                <option value="Plot">Plot</option>
                                                <option value="Flat">Flat</option>
                                                <option value="House">House</option>
                                                <option value="Commercial">Commercial</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                City
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Enter City" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Locality
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Enter Locality" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Investment Amount
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="number" placeholder="₹ Amount" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Current estimated market value
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="number" placeholder="₹ Value" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Loan's (If any)
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="number" placeholder="₹ Amount" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Rate of Interest on Loan (%)
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="number" placeholder="ROI" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Avg Rate of Return (%)
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="number" placeholder="8%" />
                                        </div>

                                    </div>
                                    <div className="w-full h-px bg-[#e9e9e9] mt-3 sm:mt-3 mb-4 sm:mb-4" />
                                </>
                            )}

                            {asset.assetClass === "Gold" && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5" >

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Form of Gold
                                            </label>
                                            <select className=" cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors">
                                                <option value="">Select</option>
                                                <option value="Jewellery">Jewellery</option>
                                                <option value="Coins">Coins</option>
                                                <option value="Bars">Bars</option>
                                                <option value="Gold ETF">Gold ETF</option>
                                                <option value="SGB">SGB</option>
                                                <option value="Digital Gold">Digital Gold</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Quantity (Grams)
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="number" placeholder="Grams" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Purchase Year
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Year" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Purchase Value
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="number" placeholder="₹ Value" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Current value (Approx.)
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="number" placeholder="₹ Value" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Avg Rate of Return (%)
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="number" placeholder="%" />
                                        </div>

                                    </div>
                                    <div className="w-full h-px bg-[#e9e9e9] mt-3 sm:mt-3 mb-4 sm:mb-4" />
                                </>
                            )}

                            {asset.assetClass === "Silver" && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5" >

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Form of Silver
                                            </label>
                                            <select className=" cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors">
                                                <option value="">Select</option>
                                                <option value="Jewellery">Jewellery</option>
                                                <option value="Coins">Coins</option>
                                                <option value="Bars">Bars</option>
                                                <option value="Gold ETF">Silver ETF</option>
                                                <option value="SGB">SGB</option>
                                                <option value="Digital Gold">Digital Silver</option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Quantity (Grams)
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="number" placeholder="Grams" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Purchase Year
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Year" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Purchase Value
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="number" placeholder="₹ Value" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Current value (Approx.)
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="number" placeholder="₹ Value" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Avg Rate of Return (%)
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="number" placeholder="%" />
                                        </div>

                                    </div>
                                    <div className="w-full h-px bg-[#e9e9e9] mt-3 sm:mt-3 mb-4 sm:mb-4" />
                                </>
                            )}

                            {asset.assetClass === "Other Assest Classes" && (
                                <>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 pt-5" >

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Other Assest Classes
                                                <span className="text-red-600"> *</span>
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Asset Name" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Details
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Description" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Investment Date
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="date" placeholder="Investment Date" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Invested Value
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="number" placeholder="₹ Cost" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Current Value *
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="number" placeholder="₹ Value" />
                                        </div>

                                        <div className="mb-3">
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Avg Rate of Return (%)
                                            </label>
                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="number" placeholder="%" />
                                        </div>

                                    </div>
                                    <div className="my-4 w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#06A358] transition-colors flex items-center gap-2">
                                        <label className="flex items-center justify-center bg-[#d9d9d9] border-[0.5px] border-[#b1b1b1] rounded-[5px] w-[60px] h-[20px] text-[10px] text-[#44475b] cursor-pointer flex-shrink-0">
                                            Browse...
                                            <input type="file" className="hidden" />
                                        </label>
                                        <span className="text-[10px] text-[#8b8b8b] whitespace-nowrap truncate">
                                            No file selected.
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
                    onClick={addAsset}
                    className="w-full h-14 rounded-xl border border-[#E5E5E5] bg-white shadow-sm flex items-center justify-center gap-2 text-[#666] font-medium cursor-pointer hover:bg-gradient-to-r from-[#06A358] to-[#001EFE] hover:text-white"
                >
                    <Plus size={18} />
                    Add Asset
                </button>
            </div>
        </div>
    );
}