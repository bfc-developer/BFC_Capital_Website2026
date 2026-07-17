import { useState } from "react";

export default function KnowYourRiskProfile() {
    const [rows, setRows] = useState([
        { type: "Mutual Funds", institution: "", value: "", maturity: "" },
    ]);
    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="w-full min-w-0 bg-white border border-[#e0dbdb] rounded-[18px] sm:rounded-[24px] lg:rounded-[33px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-4 sm:p-6 md:p-8 lg:p-10">
                <h3 className="font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[25px] bg-gradient-to-r from-[#06a358] to-[#001EFE] bg-clip-text text-transparent pb-5">
                    I Seek Above Average Returns From My Investments
                </h3>
                <div role="radiogroup" aria-label="Contingency Plan" className="grid md:grid-cols-3 gap-4 mb-5 md:mb-[40px]">
                    <button
                        type="button"
                        role="radio"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors border border-gray-200 bg-white text-gray-700 group hover:bg-[#06A358]" >
                        <span className="flex gap-1 items-center">
                            <span className="text-gray-700 group-hover:text-white">Agree</span>
                            <img className="w-[15px] h-[15px]" src="/financialplanning/done.png" alt="done" />
                        </span>
                    </button>
                    <button
                        type="button"
                        role="radio"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors
                 border border-gray-200 bg-white text-gray-700 group hover:bg-[#06A358]" >
                        <span className="text-gray-700 flex gap-1 items-center">
                            <span className="text-gray-700 group-hover:text-white">Somewhat Agree</span>
                            <img className="w-[15px] h-[15px]" src="/financialplanning/emo.png" alt="done" />
                        </span>
                    </button>
                    <button
                        type="button"
                        role="radio"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors
                 border border-gray-200 bg-white text-gray-700 group hover:bg-[#06A358]" >
                        <span className="text-gray-700 flex gap-1 items-center">
                            <span className="text-gray-700 group-hover:text-white">No</span>
                            <img className="w-[15px] h-[15px]" src="/financialplanning/close.png" alt="done" />
                        </span>
                    </button>
                </div>

                <div className="w-full h-px bg-[#e9e9e9] mt-5 sm:mt-5 mb-5 sm:mb-6" />
                <h3 className="font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[25px] bg-gradient-to-r from-[#06a358] to-[#001EFE] bg-clip-text text-transparent pb-5">
                    I'm Patient With My Investments & Can Bear Short Term Volatility in My Portfolio
                </h3>
                <div role="radiogroup" aria-label="Contingency Plan" className="grid md:grid-cols-3 gap-4 mb-5 md:mb-[40px]">
                    <button
                        type="button"
                        role="radio"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors border border-gray-200 bg-white text-gray-700 group hover:bg-[#06A358]" >
                        <span className="flex gap-1 items-center">
                            <span className="text-gray-700 group-hover:text-white">Agree</span>
                            <img className="w-[15px] h-[15px]" src="/financialplanning/done.png" alt="done" />
                        </span>
                    </button>
                    <button
                        type="button"
                        role="radio"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors
                 border border-gray-200 text-gray-700 group hover:bg-[#06A358]" >
                        <span className="flex gap-1 items-center">
                            <span className="text-gray-700 group-hover:text-white">Somewhat Agree</span>
                            <img className="w-[15px] h-[15px]" src="/financialplanning/emo.png" alt="done" />
                        </span>
                    </button>
                    <button
                        type="button"
                        role="radio"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors
                 border border-gray-200 bg-white text-gray-700 group hover:bg-[#06A358]" >
                        <span className="text-gray-700 flex gap-1 items-center">
                            <span className="text-gray-700 group-hover:text-white">No</span>
                            <img className="w-[15px] h-[15px]" src="/financialplanning/close.png" alt="done" />
                        </span>
                    </button>
                </div>

                <div className="w-full h-px bg-[#e9e9e9] mt-4 sm:mt-5 mb-5 sm:mb-6" />
                <h3 className="font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[25px] bg-gradient-to-r from-[#06a358] to-[#001EFE] bg-clip-text text-transparent pb-5">
                    I Have a Regular & Stable Income Resource
                </h3>
                <div role="radiogroup" aria-label="Contingency Plan" className="grid md:grid-cols-3 gap-4 mb-5 md:mb-[40px]">
                    <button
                        type="button"
                        role="radio"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors border border-gray-200 bg-white text-gray-700 group hover:bg-[#06A358]" >
                        <span className="flex gap-1 items-center">
                            <span className="text-gray-700 group-hover:text-white">Agree</span>
                            <img className="w-[15px] h-[15px]" src="/financialplanning/done.png" alt="done" />
                        </span>
                    </button>
                    <button
                        type="button"
                        role="radio"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors
                 border border-gray-200 bg-white text-gray-700 group hover:bg-[#06A358]" >
                        <span className="text-gray-700 flex gap-1 items-center">
                            <span className="text-gray-700 group-hover:text-white">Somewhat Agree</span>
                            <img className="w-[15px] h-[15px]" src="/financialplanning/emo.png" alt="done" />
                        </span>
                    </button>
                    <button
                        type="button"
                        role="radio"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors
                 border border-gray-200 bg-white text-gray-700 group hover:bg-[#06A358]" >
                        <span className="text-gray-700 flex gap-1 items-center">
                            <span className="text-gray-700 group-hover:text-white">No</span>
                            <img className="w-[15px] h-[15px]" src="/financialplanning/close.png" alt="done" />
                        </span>
                    </button>
                </div>

                <div className="w-full h-px bg-[#e9e9e9] mt-4 sm:mt-5 mb-5 sm:mb-6" />
                <h3 className="font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[25px] bg-gradient-to-r from-[#06a358] to-[#001EFE] bg-clip-text text-transparent pb-5">
                    My Outstanding Debt/Loan is Low or That Has Been  Provisioned For
                </h3>
                <div role="radiogroup" aria-label="Contingency Plan" className="grid md:grid-cols-3 gap-4 mb-5">
                    <button
                        type="button"
                        role="radio"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors border border-gray-200 bg-white text-gray-700 group hover:bg-[#06A358]" >
                        <span className="flex gap-1 items-center">
                            <span className="text-gray-700 group-hover:text-white">Agree</span>
                            <img className="w-[15px] h-[15px]" src="/financialplanning/done.png" alt="done" />
                        </span>
                    </button>
                    <button
                        type="button"
                        role="radio"
                        className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors
                 border border-gray-200 bg-white text-gray-700 group hover:bg-[#06A358]" >
                        <span className="text-gray-700 flex gap-1 items-center">
                            <span className="text-gray-700 group-hover:text-white">Somewhat Agree</span>
                            <img className="w-[15px] h-[15px]" src="/financialplanning/emo.png" alt="done" />
                        </span>
                    </button>
                    <button
                        type="button"
                        role="radio"
                        className="flex cursor-pointer cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors
                 border border-gray-200 bg-white text-gray-700 group hover:bg-[#06A358]" >
                        <span className="text-gray-700 flex gap-1 items-center">
                            <span className="text-gray-700 group-hover:text-white">No</span>
                            <img className="w-[15px] h-[15px]" src="/financialplanning/close.png" alt="done" />
                        </span>
                    </button>
                </div>
            </div>

            <div className="py-4 w-full min-w-0 bg-white border border-[#e0dbdb] rounded-[18px] sm:rounded-[24px] lg:rounded-[33px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-4 sm:p-6 md:p-8 lg:p-10">

                <h3 className="font-bold text-[19px] sm:text-[22px] md:text-[25px] lg:text-[30px] text-center flex justify-center gap-2 items-center">
                    <span><img className="w-[90px] h-[70px]" src="/financialplanning/congratulation.png" alt="congratulation" /></span>
                    <span className="bg-gradient-to-r from-[#06a358] to-[#001EFE] bg-clip-text text-transparent"> Congratulations!</span>
                </h3>
                <p className="font-semibold text-[14px] sm:text-[16px] lg:text-[18px] text-[#44475b] text-center"> You have successfully completed your risk profile assessment. </p>
                <div className="m-auto sm:w-90 lg:w-100">
                    {/* <img className="md:w-100 lg:w-[100%] mt-5 pt-5" src="/financialplanning/moderate.png" alt="Moderate" /> */}
                    {/* <img className="md:w-100 lg:w-[100%] mt-5 pt-5" src="/financialplanning/conservative.png" alt="Conservative" /> */}
                    <img className="md:w-100 lg:w-[100%] mt-5 pt-5" src="/financialplanning/aggressive.png" alt="Aggressive" />
                </div>
                <div className="text-center">
                    {/* <span className="text-[20px] lg:text-[30px] text-[#44475B] whitespace-nowrap text-center">Your risk profile is <span className=" text-[#FFAF19]">Moderate</span></span> */}
                    {/* <span className="text-[20px] lg:text-[30px] text-[#44475B] whitespace-nowrap text-center">Your risk profile is <span className=" text-[#95DF3D]">Conservative</span></span> */}
                    <span className="text-[20px] lg:text-[30px] text-[#44475B] whitespace-nowrap text-center">Your risk profile is <span className=" text-[#FF3333]">Aggressive</span></span>
                </div>

                <p className="text-[#44475B] text-center pt-5 md:w-100 m-auto leading-tight">
                    You seek a balance between stability and growth. Your portfolio captures market opportunities while maintaining a reasonable safety net.
                </p>
            </div>
        </div>
    );
}