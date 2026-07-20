"use client";
import { useState, ChangeEvent } from "react";
import { Plus, Trash2 } from "lucide-react";

interface AssetItem {
    id: number;
    assetClass: string;
}

export default function GoalIdentificationStep() {
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

    const [occupation, setOccupation] = useState<string>("");

    const handleOccupationChange = (
        e: ChangeEvent<HTMLSelectElement>
    ): void => {
        setOccupation(e.target.value);
    };


    return (
        <div className="rounded-[24px] border border-[#E5E5E5] bg-white p-6 shadow-sm">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-center gap-2">
                <h3 className="col-span-8 font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[25px] bg-gradient-to-r from-[#06a358] to-[#001EFE] bg-clip-text text-transparent pb-3">
                    Goal Identification
                </h3>

                <div className="col-span-1 items-center text-end rounded-[10px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-1 md:p-2">
                    <div className="flex items-center gap-1 justify-end px-5">
                        <img className="w-[15px] h-[15px]" src="/financialplanning/moneybag.png" alt="moneybag" />
                        <p className="text-[#06A358] font-semibold">Available Assets: Rs. 30,00,000</p>
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-[#e9e9e9] mt-5 sm:mt-5 mb-5 sm:mb-6" />


            <div className="space-y-5">
                {assets.map((asset) => (
                    <div
                        key={asset.id}
                        className="flex gap-4 items-end"
                    >
                        <div className="flex-1">
                            <div className="flex gap-4 items-end justify-between mb-3">
                                <select
                                    value={occupation}
                                    onChange={handleOccupationChange}
                                    className="h-[48px] rounded-[10px] border border-[#E8E8E8] bg-white px-4 text-sm text-[#44475B] outline-none transition focus:border-[#04B488]"
                                >
                                    <option value="" disabled>Select</option>
                                    <option value="p1" >P1</option>
                                    <option value="p2" >P2</option>
                                    <option value="p3" >P3</option>
                                    <option value="p4" >P4</option>
                                    <option value="p5" >P5</option>
                                </select>
                                <button
                                    onClick={() => removeAsset(asset.id)}
                                    className="cursor-pointer h-10 w-10 rounded-full bg-[#DB4437] text-white flex items-center justify-center"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5" >

                                    <div>
                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                            Select Goal
                                        </label>
                                        <select className=" cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors">
                                            <option value="">Select Goal</option>
                                            <option value="Large Cap">Education</option>
                                            <option value="Mid Cap">Marriage</option>
                                            <option value="Small Cap">Retirement</option>
                                            <option value={"Home Purchase"}>Home Purchase</option>
                                            <option value={"Vehicle"}>Vehicle</option>
                                            <option value={"Others"}>Others</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                            Goal Name
                                        </label>
                                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="e.g. House or Education" />
                                    </div>

                                    <div>
                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                            Tenure (Yrs)
                                        </label>
                                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Enter Years" />
                                    </div>
                                </div>

                                <div className="">
                                    {occupation === "p1" && (
                                        <div className="pb-5">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" >
                                                <div>
                                                    <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                        Current Cost
                                                    </label>
                                                    <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="₹ Amount" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {occupation === "p2" && (
                                        <div className="pb-5">
                                            <div className="w-full bg-[#FAFAFA] border border-[#e9e9e9] rounded-[10px] p-6">


                                                <div className="flex justify-content-start items-center gap-3 mb-4">
                                                    <div>
                                                        <img className="w-[30px] h-[30px] object-contain" src="/financialplanning/umb.png" alt="rupee" />
                                                    </div>
                                                    <h3 className="col-span-8 font-bold text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] bg-gradient-to-r from-[#06a358] to-[#001EFE] bg-clip-text text-transparent pb-3">
                                                        Pre-Retirement Planning
                                                    </h3>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5" >
                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Current Age
                                                        </label>
                                                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="₹ Amount" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Retirement Age
                                                        </label>
                                                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="₹ Amount" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Life Expectancy
                                                        </label>
                                                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="₹ Amount" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Inflation rate (%)
                                                        </label>
                                                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="₹ Amount" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Expected Return Pre - Retirment (%)
                                                        </label>
                                                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="₹ Amount" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Post - Retirement Return (%)
                                                        </label>
                                                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="₹ Amount" />
                                                    </div>
                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                            Current Monthly Expenses
                                                        </label>
                                                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="₹ Amount" />
                                                    </div>
                                                </div>

                                                <div className="space-y-3 py-5">
                                                    <label className="block text-[18px] font-medium text-gray-800">
                                                        Is Your Service Pensionable? <span className="text-red-500">*</span>
                                                    </label>
                                                    <div role="radiogroup" aria-label="Contingency Plan" className="grid grid-cols-2 gap-4">
                                                        <button
                                                            type="button"
                                                            role="radio"
                                                            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors
              border border-gray-200 text-gray-700 group hover:bg-[#EBFFEC] bg-white" >
                                                            <span className="text-white flex gap-1 items-center">
                                                                <span className="text-gray-700 ">Yes</span>
                                                                <img className="w-[15px] h-[15px]" src="/financialplanning/done.png" alt="done" />
                                                            </span>
                                                        </button>
                                                        <button
                                                            type="button"
                                                            role="radio"
                                                            className="flex items-center cursor-pointer justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors
              border border-gray-200 text-gray-700 group hover:bg-[#FFF2F2] bg-white" >
                                                            <span className="text-white flex gap-1 items-center">
                                                                <span className="text-gray-700 ">No</span>
                                                                <img className="w-[15px] h-[15px]" src="/financialplanning/close.png" alt="done" />
                                                            </span>
                                                        </button>
                                                        <div>
                                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                                Monthly Pension Amount (Approx.)
                                                            </label>
                                                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="₹ 50,000" />
                                                        </div>
                                                    </div>


                                                </div>
                                            </div>

                                            <section className="bg-[#FAFAFA] border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors p-4 mt-8">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                                    {/* Card 1 */}
                                                    <div className="flex items-center gap-4 rounded-xl bg-[#FFF8E5] p-4">
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFBF08] text-white p-3">
                                                            <img src="/financialplanning/r1.png" alt="rupee" />
                                                        </div>

                                                        <div>
                                                            <p className="text-xs text-gray-500">Time to Retirement</p>
                                                            <h4 className="text-xl font-bold text-[#F4A300]">8 Years</h4>
                                                        </div>
                                                    </div>

                                                    {/* Card 2 */}
                                                    <div className="flex items-center gap-4 rounded-xl bg-[#E4F8EB] p-4">
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#50E680] to-[#048A42] text-white p-3">
                                                            <img src="/financialplanning/f1.png" alt="rupee" />
                                                        </div>

                                                        <div>
                                                            <p className="text-xs text-gray-500">Life Expectancy Post
                                                                Retirement</p>
                                                            <h4 className="text-xl font-bold text-[#04B488]">20 Years</h4>
                                                        </div>
                                                    </div>

                                                    {/* Card 3 */}
                                                    <div className="flex items-center gap-4 rounded-xl border border-[#E8E8E8] bg-[#F4EEFF] p-4">
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7C4DFF] text-white p-3">
                                                            <img src="/financialplanning/r2.png" alt="rupee" />
                                                        </div>

                                                        <div>
                                                            <p className="text-xs text-gray-500">Future Monthly Expenses</p>
                                                            <h4 className="text-xl font-bold text-[#7C4DFF]">₹37,371</h4>
                                                        </div>
                                                    </div>

                                                    {/* Card 4 */}
                                                    <div className="flex items-center gap-4 rounded-xl bg-[#D4FEFF] p-4">
                                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#077E82] text-white p-3">
                                                            <img src="/financialplanning/r3.png" alt="rupee" />
                                                        </div>

                                                        <div>
                                                            <p className="text-xs text-gray-500">Corpus Required</p>
                                                            <h4 className="text-xl font-bold text-[#077E82]">₹52,96,818</h4>
                                                        </div>
                                                    </div>
                                                </div>

                                            </section>
                                        </div>
                                    )}
                                </div>

                                <div className="w-full h-px bg-[#e9e9e9] mt-5 mb-4 sm:mb-4" />
                            </>
                            <div className="flex-1">
                                <div className="flex gap-4 items-end justify-between">
                                    <h2 className="block text-sm font-medium text-[19px] text-[#44475B]">
                                        Tag Existing Assets
                                    </h2>
                                    <button
                                        onClick={() => removeAsset(asset.id)}
                                        className="cursor-pointer h-10 w-10 rounded-full bg-[#DB4437] text-white flex items-center justify-center"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5 items-end">
                                    <div className="">
                                        <label className="block mb-2 text-sm font-medium text-[#44475B]">
                                            Select Asset
                                        </label>
                                        <select
                                            value={asset.assetClass}
                                            onChange={(e) => updateAsset(asset.id, e.target.value)}
                                            className="h-[48px] w-full rounded-[10px] border border-[#E8E8E8] bg-white px-4 text-sm text-[#44475B] outline-none transition focus:border-[#04B488]"
                                        >
                                            <option value="">Select</option>
                                            <option value="">Mutual Funds (MF): Equity Category - 360 ONE Balanced Hybrid Fund (IDCW Reinvest)-Direct Plan (10,000) - Avail: 5%</option>
                                            <option>Mutual Funds (MF): Equity Category - 360 ONE Balanced Hybrid Fund (IDCW Reinvest)-Direct Plan (10,000) - Avail: 5%</option>
                                            <option>Mutual Funds (MF): Equity Category - 360 ONE Balanced Hybrid Fund (IDCW Reinvest)-Direct Plan (10,000) - Avail: 5%</option>

                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">

                                        </label>
                                        <input type="text" className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" placeholder="%" />
                                    </div>
                                    <p className="text-[18px] text-[#06A358] font-bold">%0</p>
                                </div>
                            </div>
                        </div>


                    </div>
                ))}
            </div>

            <div className="mt-6 rounded-xl border border-[#EAEAEA] p-5">
                <button
                    onClick={addAsset}
                    className="w-full h-14 rounded-xl border border-[#E5E5E5] bg-white shadow-sm flex items-center justify-center gap-2 text-[#666] font-medium cursor-pointer hover:bg-gradient-to-r from-[#06A358] to-[#001EFE] hover:text-white"
                >
                    <Plus size={18} />
                    Add Another Asset
                </button>
            </div>

            <div>
                <div className="border-t border-gray-100 pt-6 space-y-5">
                    <div className="w-full bg-white border border-[#e9e9e9] rounded-[10px] p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            <div className="col-md-4 bg-[#E6F0FB] border border-[#e2e3ea] rounded-[8px] p-[20px]">
                                <div className="flex justify-content-center items-center gap-3">
                                    <div className="rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] p-3">
                                        <img className="w-[30px] h-[30px] object-contain" src="/financialplanning/g1.png" alt="rupee" />
                                    </div>
                                    <div>
                                        <p className="text-[#000] text-[13px]">
                                            Future Value (@6% Inf.)
                                        </p>
                                        <h5 className="font-medium text-[#000]">₹3,58,170</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 bg-[#E6F0FB] border border-[#e2e3ea] rounded-[8px] p-[20px]">
                                <div className="flex justify-content-center items-center gap-3">
                                    <div className="rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] p-3">
                                        <img className="w-[30px] h-[30px]" src="/financialplanning/g2.png" alt="rupee" />
                                    </div>
                                    <div>
                                        <p className="text-[#000] text-[13px]">
                                            CV of Tagged Asset
                                        </p>
                                        <h5 className="font-bold text-[#000]">
                                            ₹0
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 bg-[#E6F0FB] border border-[#e2e3ea] rounded-[8px] p-[20px]">
                                <div className="flex justify-content-center items-center gap-3">
                                    <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] p-3">
                                        <img src="/financialplanning/g3.png" alt="rupee" />
                                    </div>
                                    <div>
                                        <p className="text-[#000] text-[13px]">
                                            FV of Tagged Asset
                                        </p>
                                        <h5 className="font-bold text-[#FF0000]">
                                            ₹0
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 bg-[#E6F0FB] border border-[#e2e3ea] rounded-[8px] p-[20px]">
                                <div className="flex justify-content-center items-center gap-3">
                                    <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] p-3">
                                        <img src="/financialplanning/f3.png" alt="rupee" />
                                    </div>
                                    <div>
                                        <p className="text-[#000] text-[13px]">
                                            Shortfall / Excess
                                        </p>
                                        <h5 className="font-bold text-[#FF0000]">
                                            ₹3,58,170
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 bg-[#E6F0FB] border border-[#e2e3ea] rounded-[8px] p-[20px]">
                                <div className="flex justify-content-center items-center gap-3">
                                    <div className="rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] p-3">
                                        <img className="w-[30px] h-[28px] p-1" src="/financialplanning/g4.png" alt="rupee" />
                                    </div>
                                    <div>
                                        <p className="text-[#000] text-[13px]">
                                            SIP Required
                                            (@18% CAGR)
                                        </p>
                                        <h5 className="font-bold text-[#FF0000]">
                                            ₹1,081
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 bg-[#E6F0FB] border border-[#e2e3ea] rounded-[8px] p-[20px]">
                                <div className="flex justify-content-center items-center gap-3">
                                    <div className="rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] p-3">
                                        <img className="w-[30px] h-[25px]" src="/financialplanning/g5.png" alt="rupee" />
                                    </div>
                                    <div>
                                        <p className="text-[#000] text-[13px]">
                                            Lumpsum Required
                                            (@18% CAGR)
                                        </p>
                                        <h5 className="font-bold text-[#FF0000]">
                                            ₹68,434
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="my-6 rounded-xl border border-[#EAEAEA] p-5">
                    <button
                        className="w-[90%] m-auto h-12 rounded-xl border border-[#E5E5E5] bg-white shadow-sm flex items-center justify-center gap-2 text-[#666] font-medium cursor-pointer hover:bg-gradient-to-r from-[#06A358] to-[#001EFE] hover:text-white"
                    >
                        <Plus size={18} />
                        Add Goal
                    </button>
                </div>
            </div>
        </div>
    );
}
