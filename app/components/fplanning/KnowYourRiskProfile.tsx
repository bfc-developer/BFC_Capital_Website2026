import { useState, useEffect, type ReactNode } from "react";
import StepActions from "./StepActions";

interface KnowYourRiskProfileProps {
    profileId?: string | null;
    financialPlanningId?: string | null;
    onNext?: () => void;
    onBack?: () => void;
    showBack?: boolean;
}

export default function KnowYourRiskProfile({
    profileId,
    financialPlanningId,
    onNext,
    onBack,
    showBack
}: KnowYourRiskProfileProps) {
    const [q1, setQ1] = useState("");
    const [q2, setQ2] = useState("");
    const [q3, setQ3] = useState("");
    const [q4, setQ4] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!financialPlanningId) return;
        fetch(`http://localhost:5000/api/financial-planning/${financialPlanningId}`)
            .then(res => res.json())
            .then(resData => {
                if (resData.success && resData.data) {
                    const rp = resData.data.riskProfile;
                    if (rp === "Conservative") {
                        setQ1("Agree"); setQ2("Agree"); setQ3("Agree"); setQ4("Agree");
                    } else if (rp === "Aggressive") {
                        setQ1("No"); setQ2("No"); setQ3("No"); setQ4("No");
                    } else if (rp === "Moderate") {
                        setQ1("Agree"); setQ2("No"); setQ3("Agree"); setQ4("No");
                    }
                }
            })
            .catch(err => console.error("Error loading risk profile:", err));
    }, [financialPlanningId]);

    const calculateRiskProfile = () => {
        if (!q1 || !q2 || !q3 || !q4) return "";
        if (q1 === "Agree" && q2 === "Agree" && q3 === "Agree" && q4 === "Agree") {
            return "Aggressive";
        } else if (q1 === "No" && q2 === "No" && q3 === "No" && q4 === "No") {
            return "Conservative";
        } else {
            return "Moderate";
        }
    };

    const riskProfile = calculateRiskProfile();

    const handleContinue = async () => {
        if (!profileId || !financialPlanningId) {
            alert("Missing Profile or Financial Planning ID. Please complete previous steps.");
            return;
        }
        if (!riskProfile) {
            alert("Please answer all 4 questions.");
            return;
        }

        setIsSubmitting(true);
        try {
            // Fetch current planning data to get existing contingency details
            const getResponse = await fetch(`http://localhost:5000/api/financial-planning/${financialPlanningId}`);
            if (!getResponse.ok) {
                throw new Error("Failed to fetch existing financial planning details");
            }
            const getResData = await getResponse.json();
            const existingData = getResData.data;

            // Prepare complete payload merging existing data with riskProfile
            const payload = {
                personalProfileId: profileId,
                hasContingencyReserve: existingData.hasContingencyReserve,
                amount: existingData.amount,
                existingReserve: existingData.existingReserve,
                idealReserve: existingData.idealReserve,
                excessOrShortfall: existingData.excessOrShortfall,
                riskProfile
            };

            const response = await fetch(`http://localhost:5000/api/financial-planning/${financialPlanningId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errBody = await response.json().catch(() => ({}));
                throw new Error(errBody.msg || errBody.message || "Failed to update risk profile");
            }

            if (onNext) onNext();
        } catch (err) {
            alert("Error: " + (err instanceof Error ? err.message : String(err)));
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderQuestion = (
        title: string,
        value: string,
        onChange: (val: string) => void
    ) => (
        <>
            <h3 className="font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[25px] bg-gradient-to-r from-[#06a358] to-[#001EFE] bg-clip-text text-transparent pb-5">
                {title}
            </h3>
            <div role="radiogroup" aria-label="Risk Profile Question" className="grid md:grid-cols-3 gap-4 mb-5 md:mb-[40px]">
                <button
                    type="button"
                    onClick={() => onChange("Agree")}
                    role="radio"
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors border-gray-200 group hover:bg-[#06A358] ${value === "Agree" ? 'bg-[#06A358] text-white' : 'bg-white text-gray-700'}`} >
                    <span className="flex gap-1 items-center">
                        <span className={value === "Agree" ? "text-white" : "text-gray-700 group-hover:text-white"}>Agree</span>
                        <img className="w-[15px] h-[15px]" src="/financialplanning/done.png" alt="done" style={{ filter: value === "Agree" ? 'brightness(0) invert(1)' : 'none' }} />
                    </span>
                </button>
                <button
                    type="button"
                    onClick={() => onChange("Somewhat Agree")}
                    role="radio"
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors border-gray-200 group hover:bg-[#06A358] ${value === "Somewhat Agree" ? 'bg-[#06A358] text-white' : 'bg-white text-gray-700'}`} >
                    <span className="text-gray-700 flex gap-1 items-center">
                        <span className={value === "Somewhat Agree" ? "text-white" : "text-gray-700 group-hover:text-white"}>Somewhat Agree</span>
                        <img className="w-[15px] h-[15px]" src="/financialplanning/emo.png" alt="somewhat agree" style={{ filter: value === "Somewhat Agree" ? 'brightness(0) invert(1)' : 'none' }} />
                    </span>
                </button>
                <button
                    type="button"
                    onClick={() => onChange("No")}
                    role="radio"
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors border-gray-200 group hover:bg-[#06A358] ${value === "No" ? 'bg-[#06A358] text-white' : 'bg-white text-gray-700'}`} >
                    <span className="text-gray-700 flex gap-1 items-center">
                        <span className={value === "No" ? "text-white" : "text-gray-700 group-hover:text-white"}>No</span>
                        <img className="w-[15px] h-[15px]" src="/financialplanning/close.png" alt="no" style={{ filter: value === "No" ? 'brightness(0) invert(1)' : 'none' }} />
                    </span>
                </button>
            </div>
            <div className="w-full h-px bg-[#e9e9e9] mt-5 sm:mt-5 mb-5 sm:mb-6" />
        </>
    );

    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="w-full min-w-0 bg-white border border-[#e0dbdb] rounded-[18px] sm:rounded-[24px] lg:rounded-[33px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-4 sm:p-6 md:p-8 lg:p-10">

                {renderQuestion("I Seek Above Average Returns From My Investments", q1, setQ1)}
                {renderQuestion("I'm Patient With My Investments & Can Bear Short Term Volatility in My Portfolio", q2, setQ2)}
                {renderQuestion("I Have a Regular & Stable Income Resource", q3, setQ3)}
                {renderQuestion("My Outstanding Debt/Loan is Low or That Has Been  Provisioned For", q4, setQ4)}

            </div>

            {riskProfile && (
                <div className="py-4 w-full min-w-0 bg-white border border-[#e0dbdb] rounded-[18px] sm:rounded-[24px] lg:rounded-[33px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-4 sm:p-6 md:p-8 lg:p-10">
                    <h3 className="font-bold text-[19px] sm:text-[22px] md:text-[25px] lg:text-[30px] text-center flex justify-center gap-2 items-center">
                        <span><img className="w-[90px] h-[70px]" src="/financialplanning/congratulation.png" alt="congratulation" /></span>
                        <span className="bg-gradient-to-r from-[#06a358] to-[#001EFE] bg-clip-text text-transparent"> Congratulations!</span>
                    </h3>
                    <p className="font-semibold text-[14px] sm:text-[16px] lg:text-[18px] text-[#44475b] text-center"> You have successfully completed your risk profile assessment. </p>
                    <div className="m-auto sm:w-90 lg:w-100 flex justify-center">
                        {riskProfile === "Moderate" && (
                            <img className="md:w-100 lg:w-[100%] mt-5 pt-5 max-w-[400px]" src="/financialplanning/moderate.png" alt="Moderate" />
                        )}
                        {riskProfile === "Conservative" && (
                            <img className="md:w-100 lg:w-[100%] mt-5 pt-5 max-w-[400px]" src="/financialplanning/conservative.png" alt="Conservative" />
                        )}
                        {riskProfile === "Aggressive" && (
                            <img className="md:w-100 lg:w-[100%] mt-5 pt-5 max-w-[400px]" src="/financialplanning/aggressive.png" alt="Aggressive" />
                        )}
                    </div>
                    <div className="text-center mt-6">
                        <span className="text-[20px] lg:text-[30px] text-[#44475B] whitespace-nowrap text-center">
                            Your risk profile is <span className={
                                riskProfile === "Moderate" ? "text-[#FFAF19]" :
                                    riskProfile === "Conservative" ? "text-[#95DF3D]" :
                                        "text-[#FF3333]"
                            }>{riskProfile}</span>
                        </span>
                    </div>

                    <p className="text-[#44475B] text-center pt-5 md:w-100 m-auto leading-tight">
                        {riskProfile === "Moderate" ? "You seek a balance between stability and growth. Your portfolio captures market opportunities while maintaining a reasonable safety net." :
                            riskProfile === "Conservative" ? "You prioritize the safety of your capital over high returns. Your focus is on stability and steady, low-risk investments." :
                                "You are willing to accept significant short-term volatility in pursuit of higher long-term returns. You seek maximum capital appreciation."}
                    </p>
                </div>
            )}
            <StepActions
                showBack={showBack}
                onBack={onBack}
                onContinue={handleContinue}
                isSubmitting={isSubmitting}
            />
        </div>
    );
}