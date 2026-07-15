import { useState, ChangeEvent } from "react";
import { Plus, X } from "lucide-react";

interface FamilyMember {
    name: string;
    relation: string;
    dob: string;
    anniversary: string;
    remark: string;
}

interface FamilyDetailsStepProps {
    formData?: {
        maritalStatus: string;
        members: FamilyMember[];
    };
    setFormData?: React.Dispatch<React.SetStateAction<{
        maritalStatus: string;
        members: FamilyMember[];
    }>>;
}

export default function FamilyDetailsStep({ formData, setFormData }: FamilyDetailsStepProps) {
    const [localState, setLocalState] = useState({
        maritalStatus: "",
        members: [
            { name: "", relation: "", dob: "", anniversary: "", remark: "" }
        ]
    });

    const activeData = formData || localState;
    const activeSetter = setFormData || setLocalState;

    const addMember = () =>
        activeSetter((prev: any) => ({
            ...prev,
            members: [...prev.members, { name: "", relation: "", dob: "", anniversary: "", remark: "" }],
        }));

    const removeMember = (i: number) =>
        activeSetter((prev: any) => ({
            ...prev,
            members: prev.members.filter((_: any, idx: number) => idx !== i),
        }));

    const updateMemberField = (index: number, field: keyof FamilyMember, value: string) => {
        activeSetter((prev: any) => ({
            ...prev,
            members: prev.members.map((member: FamilyMember, idx: number) =>
                idx === index ? { ...member, [field]: value } : member
            ),
        }));
    };

    const isMarried = activeData.maritalStatus === "Married";
    const isSingle = activeData.maritalStatus === "Single";

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
                            onClick={() => activeSetter((prev: any) => ({ ...prev, maritalStatus: "Married" }))}
                            className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                                isMarried 
                                    ? "bg-[#06A358] border-[#06A358] text-white" 
                                    : "border-gray-200 text-gray-700 hover:bg-[#06A358] hover:text-white group"
                            }`}
                        >
                            <span className="flex gap-1 items-center">
                                <span className={isMarried ? "text-white" : "text-gray-700 group-hover:text-white"}>Married</span>
                                <img className="w-[15px] h-[15px]" src="/financialplanning/married.png" alt="done" />
                            </span>
                        </button>
                        <button
                            type="button"
                            role="radio"
                            onClick={() => activeSetter((prev: any) => ({ ...prev, maritalStatus: "Single" }))}
                            className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                                isSingle 
                                    ? "bg-[#06A358] border-[#06A358] text-white" 
                                    : "border-gray-200 text-gray-700 hover:bg-[#06A358] hover:text-white group"
                            }`}
                        >
                            <span className="flex gap-1 items-center">
                                <span className={isSingle ? "text-white" : "text-gray-700 group-hover:text-white"}>Single</span>
                                <img className="w-[15px] h-[15px]" src="/financialplanning/single.png" alt="done" />
                            </span>
                        </button>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-5">
                    {activeData.members.map((row, i) => (
                        <div key={i}>
                            <div className="relative grid grid-cols-1 sm:grid-cols-4 gap-4">
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-800">
                                        Spouse / Family Member
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter Name"
                                        value={row.name}
                                        onChange={(e) => updateMemberField(i, "name", e.target.value)}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-800">Relation</label>
                                    <input
                                        type="text"
                                        placeholder="Relation"
                                        value={row.relation}
                                        onChange={(e) => updateMemberField(i, "relation", e.target.value)}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="block text-sm font-medium text-gray-800">DOB</label>
                                    <div className="relative">
                                        <input
                                            type="date"
                                            placeholder="DD/MM/YYYY"
                                            value={row.dob}
                                            onChange={(e) => updateMemberField(i, "dob", e.target.value)}
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
                                            value={row.anniversary}
                                            onChange={(e) => updateMemberField(i, "anniversary", e.target.value)}
                                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 pr-9 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-100 focus:border-emerald-400"
                                        />
                                    </div>
                                </div>

                                {activeData.members.length > 1 && (
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
                                    value={row.remark}
                                    onChange={(e) => updateMemberField(i, "remark", e.target.value)}
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
