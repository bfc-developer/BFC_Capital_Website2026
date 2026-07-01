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
            <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-800">
                    Marital Status <span className="text-red-500">*</span>
                </label>
                <div role="radiogroup" aria-label="Contingency Plan" className="grid grid-cols-2 gap-4">
                    <button
                        type="button"
                        role="radio"
                        className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors
              border border-gray-200 bg-[#04B488] text-white hover:[#04B488]" >
                        <span className="text-white"> Married </span>
                    </button>
                    <button
                        type="button"
                        role="radio"
                        className="flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors
              border border-gray-200 bg-white text-gray-700 hover:bg-gray-50" >
                        <span className="bg-white text-gray-700 hover:bg-gray-50"> Single </span>
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
                                    className="absolute -right-2 -top-2 sm:right-0 sm:top-0 rounded-full p-1 text-gray-400 hover:text-red-500 hover:bg-red-50"
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
                        className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        <Plus size={16} />
                        Add Family Member
                    </button>
                </div>
            </div>
        </>
    );
}
