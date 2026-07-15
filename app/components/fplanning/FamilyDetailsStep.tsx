import { useState } from "react";
import { Plus, X, } from "lucide-react";


export default function FamilyDetailsStep() {

    const [members, setMembers] = useState([
        { name: "", relation: "", dob: "", anniversary: "" },
    ]);
    const [remark, setRemark] = useState("");

    const addMember = () =>
        setMembers((m) => [...m, { name: "", relation: "", dob: "", anniversary: "" }]);

    const removeMember = (i: number) =>
        setMembers((m) => m.filter((_, idx) => idx !== i));

    return (

        <>
            <div className="w-full min-w-0 bg-white border border-[#e0dbdb] rounded-[18px] sm:rounded-[24px] lg:rounded-[33px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-4 sm:p-6 md:p-8 lg:p-10">
                <div className="flex items-center justify-between flex-wrap gap-2 border-bottom ">
                    <h1 className="font-bold text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] bg-gradient-to-r from-[#06a358] to-[#035daf] bg-clip-text text-transparent">
                        Family Details
                    </h1>
                </div>
                <div className="w-full h-px bg-[#e9e9e9] mt-4 sm:mt-5 mb-5 sm:mb-6" />
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-800">
                        Marital Status <span className="text-red-500">*</span>
                    </label>
                    <div role="radiogroup" aria-label="Contingency Plan" className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            role="radio"
                            className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors
              border border-gray-200 text-gray-700 group hover:bg-[#06A358]" >
                            <span className="text-white flex gap-1 items-center">
                                <span className="text-gray-700 group-hover:text-white">Married</span>
                                <img className="w-[15px] h-[15px]" src="/financialplanning/married.png" alt="done" />
                            </span>
                        </button>
                        <button
                            type="button"
                            role="radio"
                            className="flex items-center cursor-pointer justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors
              border border-gray-200 text-gray-700 group hover:bg-[#06A358]" >
                            <span className="text-white flex gap-1 items-center">
                                <span className="text-gray-700 group-hover:text-white">Single</span>
                                <img className="w-[15px] h-[15px]" src="/financialplanning/single.png" alt="done" />
                            </span>
                        </button>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-5">
                    {members.map((row, i) => (
                        <div key={i}>
                            <div className="relative grid grid-cols-1 sm:grid-cols-4 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-800">
                                        Spouse / Family Member
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-800">Relation</label>
                                    <input
                                        type="text"
                                        placeholder="Relation"
                                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-800">DOB</label>

                                    <div className="relative">
                                        <input
                                            type="date"
                                            placeholder="DD/MM/YYYY"
                                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-9 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                                        />

                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-800">Anniversary</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            placeholder="DD/MM/YYYY"
                                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-9 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                                        />

                                    </div>
                                </div>

                                {members.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => removeMember(i)}
                                        aria-label="Remove family member"
                                        className="absolute -right-2 -top-2 cursor-pointer sm:right-0 sm:top-0 rounded-full p-1 text-gray-400 hover:text-red-500 hover:bg-red-50"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                            <div className="space-y-1.5 mt-8">
                                <label className="block text-sm font-medium text-gray-800">Remark</label>
                                <textarea
                                    value={remark}
                                    onChange={(e) => setRemark(e.target.value)}
                                    placeholder="Type here..."
                                    rows={3}
                                    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400 resize-none"
                                />
                            </div>
                        </div>
                    ))}



                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={addMember}
                            className="flex items-center gap-2 cursor-pointer rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 group hover:bg-[#06A358] hover:text-white"
                        >
                            <Plus size={16} />
                            Add Family Member
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
