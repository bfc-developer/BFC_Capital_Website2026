import { useState } from "react";

export default function ContingencyPlanningStep() {


    return (

        <>
            <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-800">
                    Do You Have Any Contingency Reserve?  <span className="text-red-500">*</span>
                </label>

                <div role="radiogroup" aria-label="Contingency Plan" className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        role="radio"
                        className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors
              border border-gray-200 bg-white text-gray-700 hover:bg-gray-50" >
                        <span className="bg-white text-gray-700 hover:bg-gray-50"> Yes </span>
                    </button>
                    <button
                        type="button"
                        role="radio"
                        className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors
              border border-gray-200 bg-white text-gray-700 hover:bg-gray-50" >
                        <span className="bg-white text-gray-700 hover:bg-gray-50"> No</span>
                    </button>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-5">

                <div className="relative grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="lg:col-span-12">

                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                            Amount
                            {/* <span className="text-red-600"> *</span> */}
                        </label>
                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                            type="number"
                            placeholder="₹10,00.00"
                        />

                    </div>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-6 space-y-5">
                <label className="block text-sm font-medium text-gray-800">Contingency Analysis</label>
                <div className="w-full bg-white border border-[#e9e9e9] rounded-[10px] p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="col-md-4 bg-[#E6F0FB] border border-[#e2e3ea] rounded-[8px] p-[20px]">
                            <div className="flex justify-content-center items-center gap-3">
                                <div className="w-[37px] h-[37px] rounded-full bg-[#04b488]">
                                </div>
                                <div>
                                    <p className="text-[#000] text-[13px]">Existing Reserve</p>
                                    <h5 className="font-medium text-[#000]">₹0</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 bg-[#E6F0FB] border border-[#e2e3ea] rounded-[8px] p-[20px]">
                            <div className="flex justify-content-center items-center gap-3">
                                <div className="w-[37px] h-[37px] rounded-full bg-[#04b488]">
                                </div>
                                <div>
                                    <p className="text-[#000] text-[13px]">Ideal Reserve (6x Inflow)</p>
                                    <h5 className="font-medium text-[#000]">₹1,20,000</h5>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 bg-[#E6F0FB] border border-[#e2e3ea] rounded-[8px] p-[20px]">
                            <div className="flex justify-content-center items-center gap-3">
                                <div className="w-[37px] h-[37px] rounded-full bg-[#04b488]">
                                </div>
                                <div>
                                    <p className="text-[#000] text-[13px]">Excess / Shortfall</p>
                                    <h5 className="font-medium text-[#FF0000]">₹1,20,000</h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
