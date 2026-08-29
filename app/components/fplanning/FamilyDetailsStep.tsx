import { useState } from "react";
import { Plus, X } from "lucide-react";
import StepActions from "./StepActions";

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
    personalData: {
        fullName: string;
        dob: string;
        mobileNumber: string;
        email: string;
        pan: string;
        panFile: File | null;
        aadharNo: string;
        aadharFile: File | null;
        address: string;
        city: string;
        contactPerson: string;
        emergencyMobile: string;
        emergencyEmail: string;
    };
    setFormData?: React.Dispatch<React.SetStateAction<{
        maritalStatus: string;
        members: FamilyMember[];
    }>>;
    profileId: string | null;
    onNext: () => void;
    onBack?: () => void;
    showBack?: boolean;
}

export default function FamilyDetailsStep({ formData, personalData, setFormData, profileId, onNext, onBack, showBack = false }: FamilyDetailsStepProps) {
    const [localState, setLocalState] = useState({
        maritalStatus: "",
        members: [
            { name: "", relation: "", dob: "", anniversary: "", remark: "" }
        ]
    });

    const activeData = formData || localState;
    const activeSetter = setFormData || setLocalState;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const addMember = () =>
        activeSetter((prev: any) => ({
            ...prev,
            members: [...prev.members, { name: "", relation: "", dob: "", anniversary: "", remark: "" }],
        }));

    const removeMember = (i: number) => {
        activeSetter((prev: any) => ({
            ...prev,
            members: prev.members.filter((_: any, idx: number) => idx !== i),
        }));
        // Clean up errors for this member index
        setErrors(prev => {
            const copy = { ...prev };
            delete copy[`member_${i}_name`];
            delete copy[`member_${i}_relation`];
            delete copy[`member_${i}_dob`];
            return copy;
        });
    };

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

    const handleContinue = async () => {
        if (!profileId) {
            alert("Please complete the Personal Profile step first.");
            return;
        }

        const validationErrors: Record<string, string> = {};
        if (!activeData.maritalStatus) {
            validationErrors.maritalStatus = "Please select your marital status.";
        }

        if (activeData.maritalStatus === "Married") {
            activeData.members.forEach((member, i) => {
                if (!member.name.trim()) {
                    validationErrors[`member_${i}_name`] = "Name is required.";
                }
                if (!member.relation.trim()) {
                    validationErrors[`member_${i}_relation`] = "Relation is required.";
                }
                if (!member.dob) {
                    validationErrors[`member_${i}_dob`] = "Date of Birth is required.";
                }
            });
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);
        try {
            const payload = {
                fullName: personalData.fullName || undefined,
                dob: personalData.dob || undefined,
                mobileNumber: personalData.mobileNumber || undefined,
                email: personalData.email || undefined,
                pan: personalData.pan || undefined,
                panCardUrl: personalData.panFile ? `https://example.com/${personalData.panFile.name}` : undefined,
                aadhaarNumber: personalData.aadharNo || undefined,
                aadhaarCardUrl: personalData.aadharFile ? `https://example.com/${personalData.aadharFile.name}` : undefined,
                address: personalData.address || undefined,
                city: personalData.city || undefined,
                emergencyContactName: personalData.contactPerson || undefined,
                emergencyMobile: personalData.emergencyMobile || undefined,
                emergencyEmail: personalData.emergencyEmail || undefined,
                maritalStatus: activeData.maritalStatus || undefined,
                familyMembers: activeData.members.some(member => member.name || member.relation)
                    ? activeData.members.map(member => ({
                        name: member.name || undefined,
                        relation: member.relation || undefined,
                        dob: member.dob || undefined,
                        anniversary: member.anniversary || undefined,
                        remark: member.remark || undefined,
                    }))
                    : undefined,
            };

            const response = await fetch(`https://k2b02x8c-5000.inc1.devtunnels.ms/api/personal/${profileId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errBody = await response.json().catch(() => ({}));
                throw new Error(errBody.msg || errBody.message || "Failed to submit family details");
            }

            onNext();
        } catch (err) {
            alert("Error saving family details: " + (err instanceof Error ? err.message : String(err)));
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            onClick={() => {
                                activeSetter((prev: any) => ({ ...prev, maritalStatus: "Married" }));
                                setErrors(prev => ({ ...prev, maritalStatus: "" }));
                            }}
                            className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${isMarried
                                ? "bg-[#06A358] border-[#06A358] text-white"
                                : errors.maritalStatus
                                    ? "border-red-500 text-gray-700 hover:bg-[#06A358] hover:text-white group"
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
                            onClick={() => {
                                activeSetter((prev: any) => ({ ...prev, maritalStatus: "Single" }));
                                setErrors(prev => {
                                    const copy = { ...prev };
                                    delete copy.maritalStatus;
                                    Object.keys(copy).forEach(key => {
                                        if (key.startsWith("member_")) {
                                            delete copy[key];
                                        }
                                    });
                                    return copy;
                                });
                            }}
                            className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${isSingle
                                ? "bg-[#06A358] border-[#06A358] text-white"
                                : errors.maritalStatus
                                    ? "border-red-500 text-gray-700 hover:bg-[#06A358] hover:text-white group"
                                    : "border-gray-200 text-gray-700 hover:bg-[#06A358] hover:text-white group"
                                }`}
                        >
                            <span className="flex gap-1 items-center">
                                <span className={isSingle ? "text-white" : "text-gray-700 group-hover:text-white"}>Single</span>
                                <img className="w-[15px] h-[15px]" src="/financialplanning/single.png" alt="done" />
                            </span>
                        </button>
                    </div>
                    {errors.maritalStatus && <p className="text-red-500 text-[11px] mt-1">{errors.maritalStatus}</p>}
                </div>

                {isMarried && (
                    <div className="border-t border-gray-100 pt-6 space-y-5">
                        {activeData.members.map((row, i) => (
                            <div key={i}>
                                <div className="relative grid grid-cols-1 sm:grid-cols-4 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-medium text-gray-800">
                                            Spouse / Family Member <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter Name"
                                            value={row.name}
                                            onChange={(e) => {
                                                updateMemberField(i, "name", e.target.value);
                                                setErrors(prev => ({ ...prev, [`member_${i}_name`]: "" }));
                                            }}
                                            className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${errors[`member_${i}_name`]
                                                ? "border-red-500 focus:ring-red-100 focus:border-red-500"
                                                : "border-gray-200 focus:ring-emerald-100 focus:border-emerald-400"
                                                }`}
                                        />
                                        {errors[`member_${i}_name`] && <p className="text-red-500 text-[11px] mt-1">{errors[`member_${i}_name`]}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-medium text-gray-800">
                                            Relation <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Relation"
                                            value={row.relation}
                                            onChange={(e) => {
                                                updateMemberField(i, "relation", e.target.value);
                                                setErrors(prev => ({ ...prev, [`member_${i}_relation`]: "" }));
                                            }}
                                            className={`w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${errors[`member_${i}_relation`]
                                                ? "border-red-500 focus:ring-red-100 focus:border-red-500"
                                                : "border-gray-200 focus:ring-emerald-100 focus:border-emerald-400"
                                                }`}
                                        />
                                        {errors[`member_${i}_relation`] && <p className="text-red-500 text-[11px] mt-1">{errors[`member_${i}_relation`]}</p>}
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="block text-sm font-medium text-gray-800">
                                            DOB <span className="text-red-500">*</span>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                placeholder="DD/MM/YYYY"
                                                value={row.dob}
                                                onChange={(e) => {
                                                    updateMemberField(i, "dob", e.target.value);
                                                    setErrors(prev => ({ ...prev, [`member_${i}_dob`]: "" }));
                                                }}
                                                className={`w-full rounded-lg border bg-white px-3 py-2.5 pr-9 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 ${errors[`member_${i}_dob`]
                                                    ? "border-red-500 focus:ring-red-100 focus:border-red-500"
                                                    : "border-gray-200 focus:ring-emerald-100 focus:border-emerald-400"
                                                    }`}
                                            />
                                        </div>
                                        {errors[`member_${i}_dob`] && <p className="text-red-500 text-[11px] mt-1">{errors[`member_${i}_dob`]}</p>}
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
                )}
                <StepActions
                    showBack={showBack}
                    onBack={onBack}
                    onContinue={handleContinue}
                    isSubmitting={isSubmitting}
                />
            </div>
        </>
    );
}
