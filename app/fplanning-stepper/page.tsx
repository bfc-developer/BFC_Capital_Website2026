"use client";
import { useEffect, useRef, useState } from "react";
import { ReactNode } from "react";
import FamilyDetailsStep from "../components/fplanning/FamilyDetailsStep";
import ProfessionalDetailsStep from "../components/fplanning/ProfessionalDetailsStep";
import FinancialProfileStep from "../components/fplanning/FinancialProfileStep";
import ContingencyPlanningStep from "../components/fplanning/ContingencyPlanningStep";

const STEPS = [
    { id: 1, label: "Personal Profile" },
    { id: 2, label: "Family Details" },
    { id: 3, label: "Professional Details" },
    { id: 4, label: "Financial Profile" },
    { id: 5, label: "Contingency Planning" },
    { id: 6, label: "Your Existing Investments" },
    { id: 7, label: "Goal Identification" },
    { id: 8, label: "Testing Step" },
];

const fieldBase =
    "w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors";

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

function PersonalProfileStep() {
    return (
        <div className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                <div>
                    <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                        Full Name
                        <span className="text-red-600"> *</span>
                    </label>
                    <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Enter Name" />
                </div>
                <div>
                    <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                        Date of Birth
                        <span className="text-red-600"> *</span>
                    </label>
                    <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="date" />
                </div>
                <div>
                    <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                        Mobile Number
                        <span className="text-red-600"> *</span>
                    </label>
                    <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="tel" maxLength={10} placeholder="10 Digits Mobile No." />
                </div>
                <div>
                    <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                        Email ID
                        <span className="text-red-600"> *</span>
                    </label>
                    <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="email" placeholder="Enter Email ID" />
                </div>
            </div>

            <div className="pt-6 border-t border-[#e9e9e9]">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
                    <div>
                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                            PAN
                            <span className="text-red-600"> *</span>
                        </label>
                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors uppercase" type="text" maxLength={10} placeholder="Enter" />
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
                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" maxLength={14} placeholder="XXXX-XXXX-XXXX-XXXX" />
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
                            <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Enter Your Address" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                            City
                            <span className="text-red-600"> *</span>
                        </label>
                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="e.g. Lucknow" />
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
                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="text" placeholder="Enter Name" />
                    </div>
                    <div>
                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                            Mobile No
                        </label>
                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="tel" maxLength={10} placeholder="10 Digits Mobile No." />
                    </div>
                    <div>
                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                            Emergency Email
                        </label>
                        <input className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors" type="email" placeholder="Enter Email ID" />
                    </div>
                </div>
            </div>
        </div>
    );
}

<FamilyDetailsStep />;

<ProfessionalDetailsStep />;

<FinancialProfileStep />;

<ContingencyPlanningStep />;

function ExistingInvestmentsStep() {
    const [rows, setRows] = useState([
        { type: "Mutual Funds", institution: "", value: "", maturity: "" },
    ]);
    return (
        <div className="space-y-6 sm:space-y-8">
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-medium text-[#44475b]">Your Existing Investments</h2>

        </div>
    );
}

function GoalIdentificationStep() {
    const [goals, setGoals] = useState([
        { goal: "Retirement", amount: "", year: "", priority: "High" },
    ]);
    return (
        <div className="space-y-6 sm:space-y-8">
            <h2 className="text-[16px] sm:text-[17px] lg:text-[18px] font-medium text-[#44475b]">Identify Your Financial Goals</h2>

        </div>
    );
}

function TestingStep() {
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
    6: ExistingInvestmentsStep,
    7: GoalIdentificationStep,
    8:TestingStep,
};

export default function FplanningStepper() {
    const [current, setCurrent] = useState(1);
    const StepBody =
        STEP_COMPONENTS[current as keyof typeof STEP_COMPONENTS];

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
    const next = () => setCurrent((c) => Math.min(c + 1, STEPS.length));
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
                            <img
                                src="https://www.figma.com/api/mcp/asset/cfcb44c6-0ccb-4445-8f3d-b91ad2d614ef"
                                alt="BFC Capital"
                                className="w-full h-auto object-contain"
                            />
                        </div>

                        {/* Mobile / tablet progress bar */}
                        <div className="lg:hidden mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[12px] font-medium text-[#8b8b8b]">
                                    Step {current} of {STEPS.length}
                                </span>
                                <span className="text-[12px] font-semibold text-[#04b488]">
                                    {Math.round(progressPct)}%
                                </span>
                            </div>
                            <div className="w-full h-[6px] bg-[#e2e3ea] rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#04b488] rounded-full transition-all duration-300"
                                    style={{ width: `${progressPct}%` }}
                                />
                            </div>
                        </div>

                        <ol
                            className="step-scroll flex lg:flex-col gap-4 sm:gap-6 lg:gap-0 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0 -mx-1 px-1"
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
                                                    ? "bg-[#04b488] border-[#d2ceff] shadow-[0px_2px_2.5px_rgba(6,163,88,0.25)]"
                                                    : isDone
                                                        ? "bg-white border-[#04b488]"
                                                        : "border-[#f1f2f9] bg-gradient-to-br from-white via-white to-[#fbfbfe] shadow-[inset_0px_-2px_2px_0px_rgba(27,35,85,0.07),inset_0px_4px_6px_0px_rgba(255,255,255,0.4)]"
                                                    }`}
                                            >
                                                {isDone ? (
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#04b488" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
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
                    <main className="w-full min-w-0 bg-white border border-[#e0dbdb] rounded-[18px] sm:rounded-[24px] lg:rounded-[33px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-4 sm:p-6 md:p-8 lg:p-10">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                            <h1 className="font-bold text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] bg-gradient-to-r from-[#06a358] to-[#035daf] bg-clip-text text-transparent">
                                {STEPS[current - 1].label}
                            </h1>
                            {/* <span className="hidden lg:inline text-[13px] text-[#8b8b8b]">
                                Step {current} of {STEPS.length}
                            </span> */}
                        </div>

                        <div className="w-full h-px bg-[#e9e9e9] mt-4 sm:mt-5 mb-5 sm:mb-6" />

                        <form className="space-y-6 sm:space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <StepBody />

                            <div className="flex flex-row justify-between sm:justify-end gap-3 pt-2">
                                {current > 1 && (
                                    <button
                                        type="button"
                                        onClick={back}
                                        className="w-1/2 sm:w-auto sm:min-w-[120px] h-[46px] sm:h-[48px] px-4 sm:px-6 bg-white border border-[#e0dbdb] hover:bg-[#fafafa] rounded-[10px] flex items-center justify-center gap-2 text-[#44475b] font-medium text-[15px] sm:text-[18px] transition-colors"
                                    >
                                        Back
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={next}
                                    className={`${current > 1 ? "w-1/2" : "w-full"} sm:w-auto sm:min-w-[170px] h-[46px] sm:h-[48px] px-4 sm:px-6 bg-[#04b488] hover:bg-[#039c75] rounded-[10px] shadow-[3px_3px_8.6px_0px_rgba(0,0,0,0.12)] flex items-center justify-center gap-2 text-white font-medium text-[15px] sm:text-[18px] transition-colors`}
                                >
                                    {current === STEPS.length ? "Submit" : "Continue"}
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M13 6l6 6-6 6" />
                                    </svg>
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