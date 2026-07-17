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

<KnowYourRiskProfile />;

<ExistingInvestmentsStep />;

<GoalIdentificationStep />;

<PortfolioReview />


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
                            <StepBody />

                            <div className="flex flex-row justify-between sm:justify-end gap-3 pt-2">
                                {current > 1 && (
                                    <button
                                        type="button"
                                        onClick={back}
                                        className="w-1/2 sm:w-auto cursor-pointer sm:min-w-[120px] h-[46px] sm:h-[48px] px-4 sm:px-6 bg-white border border-[#e0dbdb] hover:bg-[#fafafa] rounded-[10px] flex items-center justify-center gap-2 text-[#44475b] font-medium text-[15px] sm:text-[18px] transition-colors"
                                    >
                                        Back
                                    </button>
                                )}
                                <button
                                    type="button"
                                    onClick={next}
                                    className={`${current > 1 ? "w-1/2" : "w-full"} cursor-pointer sm:w-auto sm:min-w-[170px] h-[46px] sm:h-[48px] px-4 sm:px-6 bg-[#06A358] hover:bg-[#06A358] rounded-[10px] shadow-[3px_3px_8.6px_0px_rgba(0,0,0,0.12)] flex items-center justify-center gap-2 text-white font-medium text-[15px] sm:text-[18px] transition-colors`}
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