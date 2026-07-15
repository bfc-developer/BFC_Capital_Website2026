import { useState } from "react";

const fieldBase =
    "w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#06A358] transition-colors";

function FileField() {
    return (
        <div className={fieldBase + " flex items-center gap-2"}>
            <label className="flex items-center justify-center bg-[#d9d9d9] border-[0.5px] border-[#b1b1b1] rounded-[5px] w-[60px] h-[20px] text-[10px] text-[#44475b] cursor-pointer flex-shrink-0">
                Browse...
                <input type="file" className="hidden" />
            </label>
            <span className="text-[10px] text-[#8b8b8b] whitespace-nowrap truncate">
                No file selected.
            </span>
        </div>
    );
}

export default function PersonalProfileStep() {
    return (
        <>
            <div className="space-y-6 sm:space-y-8 w-full min-w-0 bg-white border border-[#e0dbdb] rounded-[18px] sm:rounded-[24px] lg:rounded-[33px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-4 sm:p-6 md:p-8 lg:p-10">

                <div className="flex items-center justify-between flex-wrap gap-2 border-bottom">
                    <h1 className="font-bold text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] bg-gradient-to-r from-[#06a358] to-[#035daf] bg-clip-text text-transparent">
                        Personal Profile
                    </h1>
                </div>
                <div className="w-full h-px bg-[#e9e9e9] mt-4 sm:mt-5 mb-5 sm:mb-6" />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    <div>
                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                            Full Name
                            <span className="text-red-600"> *</span>
                        </label>
                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#06A358] transition-colors" type="text" placeholder="Enter Name" />
                    </div>
                    <div>
                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                            Date of Birth
                            <span className="text-red-600"> *</span>
                        </label>
                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#06A358] transition-colors" type="date" />
                    </div>
                    <div>
                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                            Mobile Number
                            <span className="text-red-600"> *</span>
                        </label>
                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#06A358] transition-colors" type="tel" maxLength={10} placeholder="10 Digits Mobile No." />
                    </div>
                    <div>
                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                            Email ID
                            <span className="text-red-600"> *</span>
                        </label>
                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#06A358] transition-colors" type="email" placeholder="Enter Email ID" />
                    </div>
                </div>

                <div className="pt-6 border-t border-[#e9e9e9]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        <div>
                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                PAN
                                <span className="text-red-600"> *</span>
                            </label>
                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#06A358] transition-colors uppercase" type="text" maxLength={10} placeholder="Enter" />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                Upload PAN Card
                            </label>
                            <FileField />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                Aadhar No.
                            </label>
                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#06A358] transition-colors" type="text" maxLength={14} placeholder="XXXX-XXXX-XXXX-XXXX" />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                Upload Aadhar Card
                            </label>
                            <FileField />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-[#e9e9e9] space-y-5">

                    <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-medium text-[#44475b]">
                        Residential Address Details
                    </h2>
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-5">
                        <div className="lg:col-span-3">
                            <div>
                                <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                    Address (House No, Building, Area)
                                    <span className="text-red-600"> *</span>
                                </label>
                                <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#06A358] transition-colors" type="text" placeholder="Enter Your Address" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                City
                                <span className="text-red-600"> *</span>
                            </label>
                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#06A358] transition-colors" type="text" placeholder="e.g. Lucknow" />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-[#e9e9e9] space-y-5">
                    <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-medium text-[#44475b]">Emergency Contact Details</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                        <div>
                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                Contact Person
                            </label>
                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#06A358] transition-colors" type="text" placeholder="Enter Name" />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                Mobile No
                            </label>
                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#06A358] transition-colors" type="tel" maxLength={10} placeholder="10 Digits Mobile No." />
                        </div>
                        <div>
                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                Emergency Email
                            </label>
                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#06A358] transition-colors" type="email" placeholder="Enter Email ID" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}