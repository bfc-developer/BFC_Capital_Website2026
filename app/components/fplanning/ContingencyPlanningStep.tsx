import { useState, useEffect, type ReactNode } from "react";
import StepActions from "./StepActions";

interface ContingencyPlanningStepProps {
    profileId?: string | null;
    financialPlanningId?: string | null;
    setFinancialPlanningId?: React.Dispatch<React.SetStateAction<string | null>>;
    onNext?: () => void;
    onBack?: () => void;
    showBack?: boolean;
}

export default function ContingencyPlanningStep({
    profileId,
    financialPlanningId,
    setFinancialPlanningId,
    onNext,
    onBack,
    showBack,
}: ContingencyPlanningStepProps) {
    const [hasContingencyReserve, setHasContingencyReserve] = useState(true);
    const [amount, setAmount] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [grossInflow, setGrossInflow] = useState(0);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (!profileId) return;
        fetch("http://localhost:5000/api/financial")
            .then(res => res.json())
            .then(resData => {
                if (resData.success && Array.isArray(resData.data)) {
                    const profile = resData.data.find((p: any) => p.personalProfileId === profileId);
                    if (profile && Array.isArray(profile.grossInflow)) {
                        const totalGross = profile.grossInflow.reduce((sum: number, item: any) => sum + (Number(item.monthlyAmount) || 0), 0);
                        setGrossInflow(totalGross);
                    }
                }
            })
            .catch(err => console.error("Error fetching financial profile:", err));
    }, [profileId]);

    useEffect(() => {
        if (!profileId) return;
        fetch("http://localhost:5000/api/financial-planning")
            .then(res => res.json())
            .then(resData => {
                if (resData.success && Array.isArray(resData.data)) {
                    const planning = resData.data.find((p: any) => p.personalProfileId === profileId);
                    if (planning) {
                        setHasContingencyReserve(planning.hasContingencyReserve === "Yes");
                        setAmount(planning.amount !== null && planning.amount !== undefined ? String(planning.amount) : "");
                        if (setFinancialPlanningId) {
                            setFinancialPlanningId(planning._id);
                        }
                    }
                }
            })
            .catch(err => console.error("Error prefilling financial planning contingency details:", err));
    }, [profileId, setFinancialPlanningId]);

    const existingReserve = hasContingencyReserve ? (Number(amount) || 0) : 0;
    const idealReserve = 6 * grossInflow;
    const excessOrShortfall = existingReserve - idealReserve;

    const handleContinue = async () => {
        if (!profileId) {
            alert("No Personal Profile ID found.");
            return;
        }

        if (hasContingencyReserve) {
            if (!amount.trim()) {
                setErrors({ amount: "Amount is required when contingency reserve is Yes." });
                return;
            } else if (Number(amount) <= 0) {
                setErrors({ amount: "Amount must be greater than zero." });
                return;
            }
        }

        setIsSubmitting(true);
        try {
            const payload = {
                personalProfileId: profileId,
                hasContingencyReserve: hasContingencyReserve ? "Yes" : "No",
                amount: hasContingencyReserve ? Number(amount) : null,
                existingReserve,
                idealReserve,
                excessOrShortfall
            };

            const method = financialPlanningId ? "PUT" : "POST";
            const url = financialPlanningId
                ? `http://localhost:5000/api/financial-planning/${financialPlanningId}`
                : "http://localhost:5000/api/financial-planning";

            const response = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errBody = await response.json().catch(() => ({}));
                throw new Error(errBody.msg || "Failed to submit");
            }
            const data = await response.json();
            if (data.data && data.data._id && setFinancialPlanningId) {
                setFinancialPlanningId(data.data._id);
            }

            if (onNext) onNext();
        } catch (err) {
            alert("Error: " + (err instanceof Error ? err.message : String(err)));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="w-full min-w-0 bg-white border border-[#e0dbdb] rounded-[18px] sm:rounded-[24px] lg:rounded-[33px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-4 sm:p-6 md:p-8 lg:p-10">
                <div className="flex items-center justify-between flex-wrap gap-2 border-bottom">
                    <h1 className="font-bold text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] bg-gradient-to-r from-[#06a358] to-[#035daf] bg-clip-text text-transparent">
                        Contingency Planning
                    </h1>
                </div>
                <div className="w-full h-px bg-[#e9e9e9] mt-4 sm:mt-5 mb-5 sm:mb-6" />

                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-800">
                        Do You Have Any Contingency Reserve?  <span className="text-red-500">*</span>
                    </label>

                    <div role="radiogroup" aria-label="Contingency Plan" className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            onClick={() => {
                                setHasContingencyReserve(true);
                                setErrors({});
                            }}
                            role="radio"
                            className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors border-gray-200 group hover:bg-[#06A358] ${hasContingencyReserve ? 'bg-[#06A358]' : 'bg-white text-gray-700'}`} >
                            <span className="items-center flex gap-1">
                                <span className={hasContingencyReserve ? 'text-white' : 'text-gray-700 group-hover:text-white'}>Yes</span>
                                <img className="w-[15px] h-[15px]" src="/financialplanning/done.png" alt="done" style={{ filter: hasContingencyReserve ? 'brightness(0) invert(1)' : 'none' }} />
                            </span>
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setHasContingencyReserve(false);
                                setErrors({});
                            }}
                            role="radio"
                            className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors border-gray-200 group hover:bg-[#06A358] ${!hasContingencyReserve ? 'bg-[#06A358]' : 'bg-white text-gray-700'}`} >
                            <span className="items-center flex gap-1">
                                <span className={!hasContingencyReserve ? 'text-white' : 'text-gray-700 group-hover:text-white'}>No</span>
                                <img className="w-[15px] h-[15px]" src="/financialplanning/close.png" alt="close" style={{ filter: !hasContingencyReserve ? 'brightness(0) invert(1)' : 'none' }} />
                            </span>
                        </button>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-5">

                    <div className="relative grid grid-cols-1 sm:grid-cols-4 gap-4">
                        <div className="lg:col-span-12">

                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                Amount
                                {hasContingencyReserve && <span className="text-red-600"> *</span>}
                            </label>
                            <input
                                name="amount"
                                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors.amount ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                                    }`}
                                type="number"
                                placeholder="₹10,000.00"
                                value={amount}
                                onChange={(e) => {
                                    setAmount(e.target.value);
                                    setErrors({});
                                }}
                                onWheel={(e) => e.currentTarget.blur()}
                                onKeyDown={(e) => (e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault()}
                                disabled={!hasContingencyReserve}
                            />
                            {errors.amount && <p className="text-red-500 text-[11px] mt-1">{errors.amount}</p>}

                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-6 space-y-5">
                    <label className="block text-sm font-medium text-gray-800">Contingency Analysis</label>
                    <div className="w-full bg-white border border-[#e9e9e9] rounded-[10px] p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8">
                            <div className="col-md-4 bg-[#E6F0FB] border border-[#e2e3ea] rounded-[8px] p-[20px]">
                                <div className="flex justify-content-center items-center gap-3">
                                    <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] p-3">
                                        <img src="/financialplanning/f1.png" alt="rupee" />
                                    </div>
                                    <div>
                                        <p className="text-[#000] text-[13px]">Existing Reserve</p>
                                        <h5 className="font-medium text-[#000]">₹{existingReserve.toLocaleString("en-IN")}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 bg-[#E6F0FB] border border-[#e2e3ea] rounded-[8px] p-[20px]">
                                <div className="flex justify-content-center items-center gap-3">
                                    <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] p-3">
                                        <img src="/financialplanning/f2.png" alt="rupee" />
                                    </div>
                                    <div>
                                        <p className="text-[#000] text-[13px]">Ideal Reserve (6x Inflow)</p>
                                        <h5 className="font-medium text-[#000]">₹{idealReserve.toLocaleString("en-IN")}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 bg-[#E6F0FB] border border-[#e2e3ea] rounded-[8px] p-[20px]">
                                <div className="flex justify-content-center items-center gap-3">
                                    <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] p-3">
                                        <img src="/financialplanning/f3.png" alt="rupee" />
                                    </div>
                                    <div>
                                        <p className="text-[#000] text-[13px]">Excess / Shortfall</p>
                                        <h5 className={`font-medium ${excessOrShortfall < 0 ? 'text-[#FF0000]' : 'text-[#06A358]'}`}>
                                            {excessOrShortfall < 0 ? "-" : ""}₹{Math.abs(excessOrShortfall).toLocaleString("en-IN")}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
