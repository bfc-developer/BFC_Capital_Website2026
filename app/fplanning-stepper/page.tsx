"use client";
import { useEffect, useRef, useState } from "react";
import { ReactNode } from "react";
import PersonalProfileStep from "../components/fplanning/PersonalProfileStep";
import FamilyDetailsStep from "../components/fplanning/FamilyDetailsStep";
import ProfessionalDetailsStep from "../components/fplanning/ProfessionalDetailsStep";
import FinancialProfileStep from "../components/fplanning/FinancialProfileStep";
import ContingencyPlanningStep from "../components/fplanning/ContingencyPlanningStep";
import KnowYourRiskProfile from "../components/fplanning/KnowYourRiskProfile";


const STEPS = [
    { id: 1, label: "Personal Profile" },
    { id: 2, label: "Family Details" },
    { id: 3, label: "Professional Details" },
    { id: 4, label: "Financial Profile" },
    { id: 5, label: "Contingency Planning" },
    { id: 6, label: "Know Your Risk Profile" },
    { id: 7, label: "Your Existing Investments" },
    { id: 8, label: "Goal Identification" },
    { id: 9, label: "Portfolio Review" },
];

<PersonalProfileStep />;

<FamilyDetailsStep />;

<ProfessionalDetailsStep />;

<FinancialProfileStep />;

<ContingencyPlanningStep />;

<KnowYourRiskProfile />

function ExistingInvestmentsStep() {
    const [rows, setRows] = useState([
        { type: "Mutual Funds", institution: "", value: "", maturity: "" },
    ]);
    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="w-full min-w-0 bg-white border border-[#e0dbdb] rounded-[18px] sm:rounded-[24px] lg:rounded-[33px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-4 sm:p-6 md:p-8 lg:p-10">
                <h3 className="font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[25px] bg-gradient-to-r from-[#06a358] to-[#001EFE] bg-clip-text text-transparent pb-5">
                    Your Existing Investments
                </h3>
                <div className="w-full h-px bg-[#e9e9e9] mt-5 sm:mt-5 mb-5 sm:mb-6" />
            </div>
        </div>
    );
}

function GoalIdentificationStep() {
    const [goals, setGoals] = useState([
        { goal: "Retirement", amount: "", year: "", priority: "High" },
    ]);
    return (
        <div className="space-y-6 sm:space-y-8">
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-medium text-[#44475b]">Testing Step</h2>

        </div>
    );
}

function PortfolioReview() {
    return (
        <div className="space-y-6 sm:space-y-8">
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-medium text-[#44475b]">Testing Step</h2>
        </div>
    );
}

const STEP_COMPONENTS = {
    1: PersonalProfileStep,
    2: FamilyDetailsStep,
    3: ProfessionalDetailsStep,
    4: FinancialProfileStep,
    5: ContingencyPlanningStep,
    6: KnowYourRiskProfile,
    7: ExistingInvestmentsStep,
    8: GoalIdentificationStep,
    9: PortfolioReview,
};

export default function FplanningStepper() {
    const [current, setCurrent] = useState(1);
    const [profileId, setProfileId] = useState<string | null>(null);

    const [personalData, setPersonalData] = useState({
        fullName: "",
        dob: "",
        mobileNumber: "",
        email: "",
        pan: "",
        panFile: null as File | null,
        aadharNo: "",
        aadharFile: null as File | null,
        address: "",
        city: "",
        contactPerson: "",
        emergencyMobile: "",
        emergencyEmail: "",
    });

    const [familyData, setFamilyData] = useState({
        maritalStatus: "",
        members: [
            { name: "", relation: "", dob: "", anniversary: "", remark: "" }
        ]
    });

    const [professionalData, setProfessionalData] = useState({
        occupation: "",
        pvtOrGovt: "",
        organisationName: "",
        designation: "",
        workProfile: "",
        businessType: "",
        professionName: "",
        lastOrganisation: "",
        address: "",
        city: "",
        remarks: "",
    });

    const [financialProfileExists, setFinancialProfileExists] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleApiSubmit = async () => {
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
                maritalStatus: familyData.maritalStatus || undefined,
                familyMembers: familyData.members.some(member => member.name || member.relation)
                    ? familyData.members.map(member => ({
                        name: member.name || undefined,
                        relation: member.relation || undefined,
                        dob: member.dob || undefined,
                        anniversary: member.anniversary || undefined,
                        remark: member.remark || undefined,
                    }))
                    : undefined
            };

            const url = profileId 
                ? `http://localhost:5000/api/personal/${profileId}` 
                : "http://localhost:5000/api/personal";
            const method = profileId ? "PUT" : "POST";

            console.log(`Submitting payload using ${method} to ${url}:`, payload);

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errBody = await response.json().catch(() => ({}));
                throw new Error(errBody.msg || errBody.message || "Failed to submit personal/family profile details");
            }

            const resData = await response.json();
            console.log("Submit successful:", resData);

            if (resData.data && resData.data._id) {
                setProfileId(resData.data._id);
            }
            return true;
        } catch (err) {
            console.error("API Error:", err);
            alert("Error saving details: " + (err instanceof Error ? err.message : String(err)));
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleProfessionalApiSubmit = async () => {
        if (!profileId) {
            alert("Please complete the Personal Profile step first.");
            return false;
        }
        setIsSubmitting(true);
        try {
            const payload = {
                _id: profileId,
                occupation: professionalData.occupation === "Other" ? "Others" : professionalData.occupation,
                pvtOrGovt: professionalData.pvtOrGovt || undefined,
                organisationName: professionalData.organisationName || undefined,
                designation: professionalData.designation || undefined,
                workProfile: professionalData.workProfile || undefined,
                businessType: professionalData.businessType || undefined,
                professionName: professionalData.professionName || undefined,
                lastOrganisation: professionalData.lastOrganisation || undefined,
                address: professionalData.address || undefined,
                city: professionalData.city || undefined,
                remarks: professionalData.remarks || undefined,
            };

            const url = financialProfileExists
                ? `http://localhost:5000/api/financial/${profileId}`
                : "http://localhost:5000/api/financial";
            const method = financialProfileExists ? "PUT" : "POST";

            console.log(`Submitting professional payload using ${method} to ${url}:`, payload);

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errBody = await response.json().catch(() => ({}));
                throw new Error(errBody.msg || errBody.message || "Failed to submit professional details");
            }

            const resData = await response.json();
            console.log("Professional submit successful:", resData);

            setFinancialProfileExists(true);
            return true;
        } catch (err) {
            console.error("Professional API Error:", err);
            alert("Error saving professional details: " + (err instanceof Error ? err.message : String(err)));
            return false;
        } finally {
            setIsSubmitting(false);
        }
    };

    const StepBody =
        STEP_COMPONENTS[current as keyof typeof STEP_COMPONENTS] as React.ComponentType<any>;

    useEffect(() => {
        stepRefs.current[current]?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
        });
    }, [current]);

    const goTo = (id: number) => {
        if (id <= current) {
            setCurrent(id);
        }
    };
    const next = async () => {
        if (current === 1 || current === 2) {
            const success = await handleApiSubmit();
            if (!success) {
                return;
            }
        } else if (current === 3) {
            const success = await handleProfessionalApiSubmit();
            if (!success) {
                return;
            }
        }
        setCurrent((c) => Math.min(c + 1, STEPS.length));
    };
    const back = () => setCurrent((c) => Math.max(c - 1, 1));

    const progressPct = ((current - 1) / (STEPS.length - 1)) * 100;
    const stepRefs = useRef<Record<number, HTMLLIElement | null>>({});
    return (
        <div className="relative min-h-screen bg-white overflow-x-hidden font-sans">
            <div
                className="absolute inset-0 -z-10 opacity-60"
                style={{
                    backgroundImage:
                        "linear-gradient(#f1f2f9 1px, transparent 1px), linear-gradient(90deg, #f1f2f9 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />
            <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/0 to-white" />
            <div className="relative w-full max-w-[1400px] mx-auto px-3 sm:px-6 md:px-8 lg:px-10 py-4 sm:py-6 lg:py-10">
                <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-[280px] xl:w-[300px] lg:flex-shrink-0 bg-gradient-to-b from-[#faf9fa] to-[#eaf6ff] border border-[#e2e3ea] rounded-[18px] sm:rounded-[24px] lg:rounded-[30px] shadow-[0px_-2px_9.1px_-3px_rgba(0,0,0,0.2)] p-4 sm:p-6 lg:p-8 lg:sticky lg:top-6">
                        <div className="w-[140px] sm:w-[180px] lg:w-[220px] mb-4 sm:mb-6 lg:mb-8">
                            <img src="/logo/cap-logo.svg" alt="BFC Capital" className="w-full h-auto object-contain"
                            />
                        </div>

                        {/* Mobile / tablet progress bar */}
                        <div className="lg:hidden mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[12px] font-medium text-[#8b8b8b]">
                                    Step {current} of {STEPS.length}
                                </span>
                                <span className="text-[12px] font-semibold text-[#06A358]">
                                    {Math.round(progressPct)}%
                                </span>
                            </div>
                            <div className="w-full h-[6px] bg-[#e2e3ea] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#06A358] rounded-full transition-all duration-300"
                                    style={{ width: `${progressPct}%` }}
                                />
                            </div>
                        </div>

                        <ol className="step-scroll flex lg:flex-col gap-4 sm:gap-6 lg:gap-0 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 -mx-1 px-1"
                        >
                            {STEPS.map((s, idx) => {
                                const isActive = s.id === current;
                                const isDone = s.id < current;
                                const clickable = s.id <= current;
                                return (
                                    <li
                                        key={s.id}
                                        ref={(el) => {
                                            stepRefs.current[s.id] = el;
                                        }}
                                        className="flex lg:items-stretch gap-3 flex-shrink-0 lg:flex-shrink lg:flex-col"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => goTo(s.id)}
                                            disabled={!clickable}
                                            className={`flex items-center gap-2.5 sm:gap-3 text-left ${clickable ? "cursor-pointer" : "cursor-default"
                                                }`}
                                        >
                                            <div
                                                className={`flex items-center justify-center w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] flex-shrink-0 rounded-[8px] border-[0.5px] ${isActive
                                                    ? "bg-[#06A358] cursor-pointer border-[#d2ceff] shadow-[0px_2px_2.5px_rgba(6,163,88,0.25)]"
                                                    : isDone
                                                        ? "bg-white cursor-pointer border-[#06A358]"
                                                        : "border-[#f1f2f9] bg-gradient-to-br from-white via-white to-[#fbfbfe] shadow-[inset_0px_-2px_2px_0px_rgba(27,35,85,0.07),inset_0px_4px_6px_0px_rgba(255,255,255,0.4)]"
                                                    }`}
                                            >
                                                {isDone ? (
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#06A358" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M5 13l4 4L19 7" />
                                                    </svg>
                                                ) : (
                                                    <span
                                                        className={`font-semibold text-[14px] sm:text-[16px] leading-none ${isActive ? "text-white" : "text-[#a0a3bd]"
                                                            }`}
                                                    >
                                                        {s.id}
                                                    </span>
                                                )}
                                            </div>
                                            <p
                                                className={`font-semibold text-[13px] sm:text-[15px] lg:text-[16px] text-[#44475b] whitespace-nowrap ${isActive || isDone ? "" : "opacity-40"
                                                    }`}
                                            >
                                                {s.label}
                                            </p>
                                        </button>
                                        {idx < STEPS.length - 1 && (
                                            <div className="hidden lg:block w-[2.5px] flex-1 min-h-[24px] bg-[#d2ceff] rounded-[40px] ml-[15px]" />
                                        )}
                                    </li>
                                );
                            })}
                        </ol>
                    </aside>

                    {/* Form card */}
                    <main className="w-full min-w-0">
                        {/* <div className="flex items-center justify-between flex-wrap gap-2">
                            <h1 className="font-bold text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] bg-gradient-to-r from-[#06a358] to-[#035daf] bg-clip-text text-transparent">
                                {STEPS[current - 1].label}
                            </h1>
                            <span className="hidden lg:inline text-[13px] text-[#8b8b8b]">
                                Step {current} of {STEPS.length}
                            </span>
                        </div>

                        <div className="w-full h-px bg-[#e9e9e9] mt-4 sm:mt-5 mb-5 sm:mb-6" /> */}

                        <form className="space-y-6 sm:space-y-8" onSubmit={(e) => e.preventDefault()}>
                            {current === 1 ? (
                                <PersonalProfileStep formData={personalData} setFormData={setPersonalData} />
                            ) : current === 2 ? (
                                <FamilyDetailsStep formData={familyData} setFormData={setFamilyData} />
                            ) : current === 3 ? (
                                <ProfessionalDetailsStep formData={professionalData} setFormData={setProfessionalData} />
                            ) : (
                                <StepBody />
                            )}

                            <div className="flex flex-row justify-between sm:justify-end gap-3 pt-2">
                                {current > 1 && (
                                    <button
                                        type="button"
                                        onClick={back}
                                        disabled={isSubmitting}
                                        className="w-1/2 sm:w-auto cursor-pointer sm:min-w-[120px] h-[46px] sm:h-[48px] px-4 sm:px-6 bg-white border border-[#e0dbdb] hover:bg-[#fafafa] rounded-[10px] flex items-center justify-center gap-2 text-[#44475b] font-medium text-[15px] sm:text-[18px] transition-colors disabled:opacity-55"
                                    >
                                        Back
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={next}
                                    disabled={isSubmitting}
                                    className={`${current > 1 ? "w-1/2" : "w-full"} cursor-pointer sm:w-auto sm:min-w-[170px] h-[46px] sm:h-[48px] px-4 sm:px-6 bg-[#06A358] hover:bg-[#06A358] rounded-[10px] shadow-[3px_3px_8.6px_0px_rgba(0,0,0,0.12)] flex items-center justify-center gap-2 text-white font-medium text-[15px] sm:text-[18px] transition-colors disabled:opacity-75`}
                                >
                                    {isSubmitting ? "Saving..." : current === STEPS.length ? "Submit" : "Continue"}
                                    {!isSubmitting && (
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M5 12h14M13 6l6 6-6 6" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </form>
                    </main>
                </div>
            </div>

            <style jsx>{`
        .step-scroll::-webkit-scrollbar {
          height: 4px;
        }
        .step-scroll::-webkit-scrollbar-thumb {
          background: #d2ceff;
          border-radius: 4px;
        }
        .step-scroll {
          scrollbar-width: thin;
        }
      `}</style>
        </div>
    );
}