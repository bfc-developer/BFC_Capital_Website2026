"use client";
import { useEffect, useRef, useState } from "react";
import { ReactNode } from "react";
import PersonalProfileStep from "../components/fplanning/PersonalProfileStep";
import FamilyDetailsStep from "../components/fplanning/FamilyDetailsStep";
import ProfessionalDetailsStep from "../components/fplanning/ProfessionalDetailsStep";
import FinancialProfileStep from "../components/fplanning/FinancialProfileStep";
import ContingencyPlanningStep from "../components/fplanning/ContingencyPlanningStep";
import KnowYourRiskProfile from "../components/fplanning/KnowYourRiskProfile";
import ExistingInvestmentsStep from "../components/fplanning/ExistingInvestmentsStep";
import PortfolioReview from "../components/fplanning/PortfolioReview";
import GoalIdentificationStep from "../components/fplanning/GoalIdentificationStep";
import StepActions from "../components/fplanning/StepActions";


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
    const [financialProfileId, setFinancialProfileId] = useState<string | null>(null);
    const [financialProfileExists, setFinancialProfileExists] = useState(false);
    const [financialPlanningId, setFinancialPlanningId] = useState<string | null>(null);
    const [isPlanningCompleted, setIsPlanningCompleted] = useState(false);

    const [sessionChoice, setSessionChoice] = useState<"ask" | "new" | "continue">("ask");
    const [resumeMobileNumber, setResumeMobileNumber] = useState("");
    const [resumePan, setResumePan] = useState("");
    const [matchingProfiles, setMatchingProfiles] = useState<any[]>([]);
    const [isFetchingSession, setIsFetchingSession] = useState(false);
    const [sessionError, setSessionError] = useState("");

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
    const back = () => setCurrent((c) => Math.max(c - 1, 1));

    const progressPct = ((current - 1) / (STEPS.length - 1)) * 100;
    const stepRefs = useRef<Record<number, HTMLLIElement | null>>({});

    const handleResumeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (resumeMobileNumber.length !== 10) {
            setSessionError("Please enter a valid 10-digit mobile number.");
            return;
        }
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        if (!panRegex.test(resumePan)) {
            setSessionError("Please enter a valid PAN format (e.g. ABCDE1234F).");
            return;
        }
        setIsFetchingSession(true);
        setSessionError("");
        setMatchingProfiles([]);
        try {
            const response = await fetch(`http://localhost:5000/api/personal/mobile-state`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    mobileNumber: resumeMobileNumber,
                    pan: resumePan,
                }),
            });
            if (!response.ok) {
                throw new Error("Unable to contact backend server.");
            }
            const resData = await response.json();
            if (resData.success) {
                if (resData.multiple) {
                    setMatchingProfiles(resData.profiles || []);
                } else {
                    // Prefill state variables for single matching profile
                    const personal = resData.personal;
                    setProfileId(personal._id);
                    setFinancialProfileId(resData.financialProfile ? resData.financialProfile._id : null);
                    setFinancialProfileExists(!!resData.financialProfile);
                    setFinancialPlanningId(resData.financialPlanning ? resData.financialPlanning._id : null);

                    // Personal data prefill
                    setPersonalData({
                        fullName: personal.fullName || "",
                        dob: personal.dob ? personal.dob.split("T")[0] : "",
                        mobileNumber: personal.mobileNumber || "",
                        email: personal.email || "",
                        pan: personal.pan || "",
                        panFile: null,
                        aadharNo: personal.aadhaarNumber || "",
                        aadharFile: null,
                        address: personal.address || "",
                        city: personal.city || "",
                        contactPerson: personal.emergencyContactName || "",
                        emergencyMobile: personal.emergencyMobile || "",
                        emergencyEmail: personal.emergencyEmail || "",
                    });

                    // Family data prefill
                    setFamilyData({
                        maritalStatus: personal.maritalStatus || "",
                        members: (personal.familyMembers && personal.familyMembers.length > 0)
                            ? personal.familyMembers.map((member: any) => ({
                                name: member.name || "",
                                relation: member.relation || "",
                                dob: member.dob ? member.dob.split("T")[0] : "",
                                anniversary: member.anniversary ? member.anniversary.split("T")[0] : "",
                                remark: member.remark || ""
                            }))
                            : [{ name: "", relation: "", dob: "", anniversary: "", remark: "" }]
                    });

                    // Professional data prefill
                    setProfessionalData({
                        occupation: (resData.financialProfile?.occupation === "Others" || resData.financialProfile?.occupation === "Other") ? "Other" : (resData.financialProfile?.occupation || ""),
                        pvtOrGovt: resData.financialProfile?.pvtOrGovt || "",
                        organisationName: resData.financialProfile?.organisationName || "",
                        designation: resData.financialProfile?.designation || "",
                        workProfile: resData.financialProfile?.workProfile || "",
                        businessType: resData.financialProfile?.businessType || "",
                        professionName: resData.financialProfile?.professionName || "",
                        lastOrganisation: resData.financialProfile?.lastOrganisation || "",
                        address: resData.financialProfile?.address || "",
                        city: resData.financialProfile?.city || "",
                        remarks: resData.financialProfile?.remarks || "",
                    });

                    // Move stepper to target step
                    setCurrent(resData.step || 1);
                }
            } else {
                setSessionError("No existing record found for this mobile number and PAN.");
            }
        } catch (err) {
            setSessionError(err instanceof Error ? err.message : "Error connecting to server. Please try again.");
        } finally {
            setIsFetchingSession(false);
        }
    };

    const handleSelectProfile = async (id: string) => {
        setIsFetchingSession(true);
        setSessionError("");
        try {
            const response = await fetch(`http://localhost:5000/api/personal/state-by-id/${id}`);
            if (!response.ok) {
                throw new Error("Unable to contact backend server.");
            }
            const resData = await response.json();
            if (resData.success) {
                const personal = resData.personal;
                setProfileId(personal._id);
                setFinancialProfileId(resData.financialProfile ? resData.financialProfile._id : null);
                setFinancialProfileExists(!!resData.financialProfile);
                setFinancialPlanningId(resData.financialPlanning ? resData.financialPlanning._id : null);

                // Personal data prefill
                setPersonalData({
                    fullName: personal.fullName || "",
                    dob: personal.dob ? personal.dob.split("T")[0] : "",
                    mobileNumber: personal.mobileNumber || "",
                    email: personal.email || "",
                    pan: personal.pan || "",
                    panFile: null,
                    aadharNo: personal.aadhaarNumber || "",
                    aadharFile: null,
                    address: personal.address || "",
                    city: personal.city || "",
                    contactPerson: personal.emergencyContactName || "",
                    emergencyMobile: personal.emergencyMobile || "",
                    emergencyEmail: personal.emergencyEmail || "",
                });

                // Family data prefill
                setFamilyData({
                    maritalStatus: personal.maritalStatus || "",
                    members: (personal.familyMembers && personal.familyMembers.length > 0)
                        ? personal.familyMembers.map((member: any) => ({
                            name: member.name || "",
                            relation: member.relation || "",
                            dob: member.dob ? member.dob.split("T")[0] : "",
                            anniversary: member.anniversary ? member.anniversary.split("T")[0] : "",
                            remark: member.remark || ""
                        }))
                        : [{ name: "", relation: "", dob: "", anniversary: "", remark: "" }]
                });

                // Professional data prefill
                setProfessionalData({
                    occupation: (resData.financialProfile?.occupation === "Others" || resData.financialProfile?.occupation === "Other") ? "Other" : (resData.financialProfile?.occupation || ""),
                    pvtOrGovt: resData.financialProfile?.pvtOrGovt || "",
                    organisationName: resData.financialProfile?.organisationName || "",
                    designation: resData.financialProfile?.designation || "",
                    workProfile: resData.financialProfile?.workProfile || "",
                    businessType: resData.financialProfile?.businessType || "",
                    professionName: resData.financialProfile?.professionName || "",
                    lastOrganisation: resData.financialProfile?.lastOrganisation || "",
                    address: resData.financialProfile?.address || "",
                    city: resData.financialProfile?.city || "",
                    remarks: resData.financialProfile?.remarks || "",
                });

                // Move stepper to target step
                setCurrent(resData.step || 1);
                // Clear matching list
                setMatchingProfiles([]);
            } else {
                setSessionError("Failed to retrieve profile details.");
            }
        } catch (err) {
            setSessionError(err instanceof Error ? err.message : "Error connecting to server. Please try again.");
        } finally {
            setIsFetchingSession(false);
        }
    };

    const sharedFooter = (
        <StepActions
            showBack={current > 1}
            onBack={back}
            onContinue={() => setCurrent((c) => Math.min(c + 1, STEPS.length))}
            continueLabel={current === STEPS.length ? "Submit" : "Continue"}
        />
    );

    if (sessionChoice === "ask") {
        return (
            <div className="relative min-h-screen bg-white overflow-x-hidden font-sans flex items-center justify-center py-10 px-4">
                <div
                    className="absolute inset-0 -z-10 opacity-60"
                    style={{
                        backgroundImage:
                            "linear-gradient(#f1f2f9 1px, transparent 1px), linear-gradient(90deg, #f1f2f9 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/0 to-white" />

                <div className="w-full max-w-[600px] bg-white border border-[#e0dbdb] rounded-[24px] sm:rounded-[33px] shadow-[0px_10px_30px_rgba(0,0,0,0.08)] p-6 sm:p-10 md:p-12 text-center space-y-8 relative overflow-hidden">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-tr from-[#06a358]/10 to-[#001EFE]/10 rounded-full blur-2xl" />
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tr from-[#001EFE]/10 to-[#06a358]/10 rounded-full blur-2xl" />

                    <div className="flex justify-center mb-4">
                        <img src="/logo/cap-logo.svg" alt="BFC Capital" className="w-[180px] sm:w-[220px] h-auto object-contain" />
                    </div>

                    <div className="space-y-3">
                        <h1 className="font-bold text-[24px] sm:text-[30px] bg-gradient-to-r from-[#06a358] to-[#001EFE] bg-clip-text text-transparent leading-tight">
                            Financial Planning Stepper
                        </h1>
                        <p className="text-[14px] sm:text-[16px] text-[#8b8b8b] font-medium max-w-md mx-auto">
                            Plan your financial future with expert assistance. Choose an option below to begin.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                        <button
                            onClick={() => setSessionChoice("continue")}
                            className="flex-1 min-h-[52px] bg-gradient-to-r from-[#06a358] to-[#035daf] hover:from-[#058f4d] hover:to-[#024d91] text-white font-bold text-[14px] sm:text-[15px] rounded-[12px] shadow-[0px_4px_12px_rgba(6,163,88,0.2)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
                        >
                            Continue Where You Left
                        </button>
                        <button
                            onClick={() => setSessionChoice("new")}
                            className="flex-1 min-h-[52px] bg-white border border-[#e0dbdb] hover:border-[#06a358] text-[#44475b] hover:text-[#06a358] font-bold text-[14px] sm:text-[15px] rounded-[12px] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]"
                        >
                            Start New Session
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (sessionChoice === "continue" && !profileId && matchingProfiles.length > 0) {
        return (
            <div className="relative min-h-screen bg-white overflow-x-hidden font-sans flex items-center justify-center py-10 px-4">
                <div
                    className="absolute inset-0 -z-10 opacity-60"
                    style={{
                        backgroundImage:
                            "linear-gradient(#f1f2f9 1px, transparent 1px), linear-gradient(90deg, #f1f2f9 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/0 to-white" />

                <div className="w-full max-w-[600px] bg-white border border-[#e0dbdb] rounded-[24px] sm:rounded-[33px] shadow-[0px_10px_30px_rgba(0,0,0,0.08)] p-6 sm:p-10 text-center space-y-6 relative overflow-hidden">
                    <div className="flex justify-center mb-2">
                        <img src="/logo/cap-logo.svg" alt="BFC Capital" className="w-[140px] sm:w-[180px] h-auto object-contain" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="font-bold text-[20px] sm:text-[24px] text-[#44475b]">
                            Multiple Records Found
                        </h2>
                        <p className="text-[13px] sm:text-[14px] text-[#8b8b8b] font-medium">
                            Please select the profile session you want to continue.
                        </p>
                    </div>

                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                        {matchingProfiles.map((prof: any) => {
                            const dateStr = prof.createdAt ? new Date(prof.createdAt).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                            }) : "";
                            return (
                                <div key={prof._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gradient-to-r from-[#faf9fa] to-[#eaf6ff] hover:to-[#dfeffd] border border-[#e2e3ea] rounded-[14px] text-left gap-3 transition-colors">
                                    <div className="space-y-1">
                                        <h4 className="font-bold text-[15px] text-[#44475b]">{prof.fullName || "Unnamed Profile"}</h4>
                                        <p className="text-[12px] text-[#8b8b8b] font-medium">Email: {prof.email || "N/A"}</p>
                                        <p className="text-[11px] text-[#b0b0b0]">Created: {dateStr}</p>
                                    </div>
                                    <button
                                        onClick={() => handleSelectProfile(prof._id)}
                                        className="h-[36px] px-5 bg-[#06A358] hover:bg-[#058f4d] text-white font-bold text-[12px] rounded-[8px] transition-colors flex-shrink-0"
                                    >
                                        Select
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {sessionError && (
                        <p className="text-[12px] font-semibold text-red-500 text-center bg-red-50 py-2 px-3 rounded-[8px]">
                            {sessionError}
                        </p>
                    )}

                    <button
                        type="button"
                        onClick={() => {
                            setMatchingProfiles([]);
                            setSessionError("");
                        }}
                        className="text-[13px] text-[#06A358] font-bold hover:underline"
                    >
                        Go Back to Input
                    </button>
                </div>
            </div>
        );
    }

    if (sessionChoice === "continue" && !profileId) {
        return (
            <div className="relative min-h-screen bg-white overflow-x-hidden font-sans flex items-center justify-center py-10 px-4">
                <div
                    className="absolute inset-0 -z-10 opacity-60"
                    style={{
                        backgroundImage:
                            "linear-gradient(#f1f2f9 1px, transparent 1px), linear-gradient(90deg, #f1f2f9 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/0 to-white" />

                <div className="w-full max-w-[500px] bg-white border border-[#e0dbdb] rounded-[24px] sm:rounded-[33px] shadow-[0px_10px_30px_rgba(0,0,0,0.08)] p-6 sm:p-10 text-center space-y-6 relative overflow-hidden">
                    <div className="flex justify-center mb-2">
                        <img src="/logo/cap-logo.svg" alt="BFC Capital" className="w-[140px] sm:w-[180px] h-auto object-contain" />
                    </div>

                    <div className="space-y-2">
                        <h2 className="font-bold text-[20px] sm:text-[24px] text-[#44475b]">
                            Resume Your Progress
                        </h2>
                        <p className="text-[13px] sm:text-[14px] text-[#8b8b8b] font-medium">
                            Enter the mobile number and PAN associated with your previous session.
                        </p>
                    </div>

                    <form onSubmit={handleResumeSubmit} className="space-y-4 text-left">
                        <div>
                            <label className="block text-[12px] font-semibold text-[#44475b] mb-1.5">
                                Mobile Number
                            </label>
                            <input
                                type="text"
                                maxLength={10}
                                placeholder="Enter 10-digit mobile number"
                                value={resumeMobileNumber}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, "");
                                    setResumeMobileNumber(val);
                                    setSessionError("");
                                }}
                                className="w-full h-[48px] bg-white border border-[#e9e9e9] rounded-[10px] px-4 text-[14px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#06A358] transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-[12px] font-semibold text-[#44475b] mb-1.5">
                                PAN
                            </label>
                            <input
                                type="text"
                                maxLength={10}
                                placeholder="Enter 10-digit PAN (e.g. ABCDE1234F)"
                                value={resumePan}
                                onChange={(e) => {
                                    setResumePan(e.target.value.toUpperCase());
                                    setSessionError("");
                                }}
                                className="w-full h-[48px] bg-white border border-[#e9e9e9] rounded-[10px] px-4 text-[14px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#06A358] transition-colors"
                            />
                        </div>



                        {sessionError && (
                            <p className="text-[12px] font-semibold text-red-500 text-center bg-red-50 py-2 px-3 rounded-[8px]">
                                {sessionError}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isFetchingSession}
                            className="w-full min-h-[48px] bg-gradient-to-r from-[#06a358] to-[#035daf] hover:from-[#058f4d] hover:to-[#024d91] disabled:opacity-70 text-white font-bold text-[14px] sm:text-[15px] rounded-[10px] shadow-[0px_4px_12px_rgba(6,163,88,0.2)] transition-all duration-300"
                        >
                            {isFetchingSession ? "Retrieving Record..." : "Retrieve and Continue"}
                        </button>
                    </form>

                    <div className="flex flex-col gap-2 pt-2 text-center">
                        <button
                            type="button"
                            onClick={() => {
                                setSessionChoice("ask");
                                setSessionError("");
                            }}
                            className="text-[13px] text-[#06A358] font-bold hover:underline"
                        >
                            Go Back
                        </button>
                        <span className="text-[12px] text-[#8b8b8b]">or</span>
                        <button
                            type="button"
                            onClick={() => {
                                setSessionChoice("new");
                                setSessionError("");
                            }}
                            className="text-[13px] text-[#44475b] font-semibold hover:underline"
                        >
                            Start a new session instead
                        </button>
                    </div>
                </div>
            </div>
        );
    }

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
                                const isDone = s.id < current || (s.id === 9 && isPlanningCompleted);
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
                                <PersonalProfileStep
                                    formData={personalData}
                                    setFormData={setPersonalData}
                                    profileId={profileId}
                                    setProfileId={setProfileId}
                                    onNext={() => setCurrent((c) => Math.min(c + 1, STEPS.length))}
                                    onBack={back}
                                    showBack={current > 1}
                                />
                            ) : current === 2 ? (
                                <FamilyDetailsStep
                                    formData={familyData}
                                    personalData={personalData}
                                    setFormData={setFamilyData}
                                    profileId={profileId}
                                    onNext={() => setCurrent((c) => Math.min(c + 1, STEPS.length))}
                                    onBack={back}
                                    showBack={current > 1}
                                />
                            ) : current === 3 ? (
                                <ProfessionalDetailsStep
                                    formData={professionalData}
                                    setFormData={setProfessionalData}
                                    profileId={profileId}
                                    financialProfileId={financialProfileId}
                                    setFinancialProfileId={setFinancialProfileId}
                                    financialProfileExists={financialProfileExists}
                                    setFinancialProfileExists={setFinancialProfileExists}
                                    onNext={() => setCurrent((c) => Math.min(c + 1, STEPS.length))}
                                    onBack={back}
                                    showBack={current > 1}
                                />
                            ) : current === 4 ? (
                                <FinancialProfileStep
                                    profileId={profileId}
                                    financialProfileId={financialProfileId}
                                    professionalData={professionalData}
                                    onNext={() => setCurrent((c) => Math.min(c + 1, STEPS.length))}
                                    onBack={back}
                                    showBack={current > 1}
                                />
                            ) : current === 5 ? (
                                <ContingencyPlanningStep
                                    profileId={profileId}
                                    financialPlanningId={financialPlanningId}
                                    setFinancialPlanningId={setFinancialPlanningId}
                                    onNext={() => setCurrent((c) => Math.min(c + 1, STEPS.length))}
                                    onBack={back}
                                    showBack={current > 1}
                                />
                            ) : current === 6 ? (
                                <KnowYourRiskProfile
                                    profileId={profileId}
                                    financialPlanningId={financialPlanningId}
                                    onNext={() => setCurrent((c) => Math.min(c + 1, STEPS.length))}
                                    onBack={back}
                                    showBack={current > 1}
                                />
                            ) : current === 7 ? (
                                <ExistingInvestmentsStep
                                    profileId={profileId}
                                    onNext={() => setCurrent((c) => Math.min(c + 1, STEPS.length))}
                                    onBack={back}
                                    showBack={current > 1}
                                />
                            ) : current === 8 ? (
                                <GoalIdentificationStep
                                    profileId={profileId}
                                    financialPlanningId={financialPlanningId}
                                    dob={personalData.dob}
                                    onNext={() => setCurrent((c) => Math.min(c + 1, STEPS.length))}
                                    onBack={back}
                                    showBack={current > 1}
                                />
                            ) : current === 9 ? (
                                <PortfolioReview
                                    profileId={profileId}
                                    financialPlanningId={financialPlanningId}
                                    onBack={back}
                                    showBack={current > 1}
                                    onSuccess={() => setIsPlanningCompleted(true)}
                                />
                            ) : (
                                <StepBody footer={sharedFooter} />
                            )}
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
