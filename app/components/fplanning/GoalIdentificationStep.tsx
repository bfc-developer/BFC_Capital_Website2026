"use client";
import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Edit3, AlertTriangle } from "lucide-react";
import { toast } from "react-toastify";
import StepActions from "./StepActions";

function getAgeFromDob(dobString?: string | null): number | null {
    if (!dobString) return null;
    const birthDate = new Date(dobString);
    if (isNaN(birthDate.getTime())) return null;
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age > 0 && age < 120 ? age : null;
}

const PRE_RETIREMENT_FIELD_CONFIG: Record<string, { label: string; defaultVal: string; unit?: string }> = {
    currentAge: { label: "Current Age", defaultVal: "30", unit: "years" },
    retirementAge: { label: "Retirement Age", defaultVal: "60", unit: "years" },
    lifeExpectancy: { label: "Life Expectancy", defaultVal: "80", unit: "years" },
    inflationRate: { label: "Inflation Rate", defaultVal: "6", unit: "%" },
    expectedReturnPreRetirement: { label: "Expected Return Pre - Retirement", defaultVal: "15", unit: "%" },
    postRetirementReturn: { label: "Post - Retirement Return", defaultVal: "10", unit: "%" },
};

interface ExistingAssetItem {
    id: string;
    assetClass: string;
    assetName: string;
    currentValue: number;
    expectedReturn: number;
    label: string;
}

interface TaggedAssetItem {
    id: number;
    selectedAssetId: string;
    taggedPercentage: string;
    taggedCV: number;
    taggedFV: number;
    expectedReturn: number;
}

interface AdditionalAssetItem {
    id: number;
    name: string;
    amount: string;
}

interface AllocationRow {
    assetName: string;
    allocationPct: string;
    allocationRange: string;
    allocationAmount: string;
    withdrawalPct: string;
    withdrawalRange: string;
    withdrawalAmount: string;
}

interface AllocationOption {
    id: string;
    title: string;
    totalAllocation: string;
    totalAllocationAmount: string;
    totalWithdrawalAmount: string;
    rows: AllocationRow[];
}

interface GoalItem {
    id: number;
    occupation: string;
    selectedGoal: string;
    goalName: string;
    tenure: string;
    currentCost: string;

    // Retirement Planning State
    currentAge: string;
    retirementAge: string;
    lifeExpectancy: string;
    inflationRate: string;
    expectedReturnPreRetirement: string;
    postRetirementReturn: string;
    currentMonthlyExpenses: string;
    isPensionable: "Yes" | "No" | "";
    pensionAmount: string;

    // Post-Retirement Specific State
    selectedAllocationOptionId: string;
    additionalAssets: AdditionalAssetItem[];

    // Multiple tagged assets for this goal
    taggedAssets: TaggedAssetItem[];

    // API-fetched CAGR for non-retirement calculators
    cagrPercentage?: number;
}

interface GoalIdentificationStepProps {
    profileId?: string | null;
    financialPlanningId?: string | null;
    dob?: string | null;
    onNext?: () => void;
    onBack?: () => void;
    showBack?: boolean;
}

const DEFAULT_FALLBACK_ASSETS: ExistingAssetItem[] = [
    {
        id: "default_mf_1",
        assetClass: "Mutual Funds (MF)",
        assetName: "Mutual Funds (MF): Equity Category - 360 ONE Balanced Hybrid Fund (IDCW Reinvest)-Direct Plan",
        currentValue: 10000,
        expectedReturn: 12,
        label: "Mutual Funds (MF): Equity Category - 360 ONE Balanced Hybrid Fund (IDCW Reinvest)-Direct Plan (10,000)",
    },
    {
        id: "default_mf_2",
        assetClass: "Mutual Funds (MF)",
        assetName: "Mutual Funds (MF): Equity Category - Nippon India Small Cap Fund (Direct Plan-Growth)",
        currentValue: 500000,
        expectedReturn: 15,
        label: "Mutual Funds (MF): Equity Category - Nippon India Small Cap Fund (5,00,000)",
    },
    {
        id: "default_fd_1",
        assetClass: "FixedDeposits",
        assetName: "Fixed Deposit: SBI Bank",
        currentValue: 100000,
        expectedReturn: 6,
        label: "Fixed Deposit: SBI Bank (1,00,000)",
    },
];

const ALL_GOAL_OPTIONS = ["Education", "Marriage", "Retirement", "Home Purchase", "Vehicle", "Others"];

// Allocation Options for each Risk Profile
const ALLOCATION_OPTIONS_BY_RISK: Record<string, AllocationOption[]> = {
    Conservative: [
        {
            id: "option_1",
            title: "Conservative - Option 1",
            totalAllocation: "100%",
            totalAllocationAmount: "₹ 100,000,00",
            totalWithdrawalAmount: "₹ 50,000",
            rows: [
                {
                    assetName: "Hybrid-Aggressive",
                    allocationPct: "30%",
                    allocationRange: "30% - 50%",
                    allocationAmount: "₹ 30,000,00",
                    withdrawalPct: "0.8%",
                    withdrawalRange: "0.8% - 1%",
                    withdrawalAmount: "₹ 25,000",
                },
                {
                    assetName: "Hybrid-BAF",
                    allocationPct: "20%",
                    allocationRange: "20% - 40%",
                    allocationAmount: "₹ 30,000,00",
                    withdrawalPct: "0.7%",
                    withdrawalRange: "0.7% - 0.8%",
                    withdrawalAmount: "₹ 15,000",
                },
                {
                    assetName: "Fixed Deposit",
                    allocationPct: "20%",
                    allocationRange: "20% - 25%",
                    allocationAmount: "₹ 30,000,00",
                    withdrawalPct: "0.5%",
                    withdrawalRange: "0.5% - 0.6%",
                    withdrawalAmount: "₹ 25,000",
                },
                {
                    assetName: "SCSS",
                    allocationPct: "30%",
                    allocationRange: "30% - 30%",
                    allocationAmount: "₹ 30,000,00",
                    withdrawalPct: "0.0068%",
                    withdrawalRange: "0.0068%",
                    withdrawalAmount: "₹ 204",
                },
            ],
        },
        {
            id: "option_2",
            title: "Conservative - Option 2",
            totalAllocation: "100%",
            totalAllocationAmount: "₹ 100,000,00",
            totalWithdrawalAmount: "₹ 50,000",
            rows: [
                {
                    assetName: "Hybrid-Aggressive",
                    allocationPct: "40%",
                    allocationRange: "30% - 50%",
                    allocationAmount: "₹ 30,000,00",
                    withdrawalPct: "0.8%",
                    withdrawalRange: "0.8% - 1%",
                    withdrawalAmount: "₹ 25,000",
                },
                {
                    assetName: "Hybrid-BAF",
                    allocationPct: "35%",
                    allocationRange: "25% - 45%",
                    allocationAmount: "₹ 30,000,00",
                    withdrawalPct: "0.75%",
                    withdrawalRange: "0.75% - 0.8%",
                    withdrawalAmount: "₹ 20,000",
                },
                {
                    assetName: "Fixed Deposit",
                    allocationPct: "10%",
                    allocationRange: "10% - 20%",
                    allocationAmount: "₹ 30,000,00",
                    withdrawalPct: "0.5%",
                    withdrawalRange: "0.5% - 0.6%",
                    withdrawalAmount: "₹ 25,000",
                },
                {
                    assetName: "SCSS",
                    allocationPct: "15%",
                    allocationRange: "15% - 20%",
                    allocationAmount: "₹ 30,000,00",
                    withdrawalPct: "0.0068%",
                    withdrawalRange: "0.0068%",
                    withdrawalAmount: "₹ 204",
                },
            ],
        },
        {
            id: "option_3",
            title: "Conservative - Option 3",
            totalAllocation: "100%",
            totalAllocationAmount: "₹ 100,000,00",
            totalWithdrawalAmount: "₹ 50,000",
            rows: [
                {
                    assetName: "Hybrid-Aggressive",
                    allocationPct: "35%",
                    allocationRange: "35% - 60%",
                    allocationAmount: "₹ 30,000,00",
                    withdrawalPct: "0.8%",
                    withdrawalRange: "0.8% - 1%",
                    withdrawalAmount: "₹ 25,000",
                },
                {
                    assetName: "Hybrid-BAF",
                    allocationPct: "25%",
                    allocationRange: "20% - 45%",
                    allocationAmount: "₹ 30,000,00",
                    withdrawalPct: "0.75%",
                    withdrawalRange: "0.75% - 1%",
                    withdrawalAmount: "₹ 15,000",
                },
                {
                    assetName: "Equity-Large Cap",
                    allocationPct: "25%",
                    allocationRange: "20% - 45%",
                    allocationAmount: "₹ 30,000,00",
                    withdrawalPct: "0.9%",
                    withdrawalRange: "0.9% - 1%",
                    withdrawalAmount: "₹ 15,000",
                },
                {
                    assetName: "Fixed Deposit",
                    allocationPct: "5%",
                    allocationRange: "5% - 15%",
                    allocationAmount: "₹ 30,000,00",
                    withdrawalPct: "0.5%",
                    withdrawalRange: "0.5% - 0.6%",
                    withdrawalAmount: "₹ 25,000",
                },
                {
                    assetName: "SCSS",
                    allocationPct: "10%",
                    allocationRange: "10% - 20%",
                    allocationAmount: "₹ 30,000,00",
                    withdrawalPct: "0.0068%",
                    withdrawalRange: "0.0068%",
                    withdrawalAmount: "₹ 204",
                },
            ],
        },
    ],
    Moderate: [
        {
            id: "option_1",
            title: "Moderate - Option 1",
            totalAllocation: "100%",
            totalAllocationAmount: "₹ 100,000,00",
            totalWithdrawalAmount: "₹ 50,000",
            rows: [
                {
                    assetName: "Hybrid-Aggressive",
                    allocationPct: "45%",
                    allocationRange: "35% - 55%",
                    allocationAmount: "₹ 45,000,00",
                    withdrawalPct: "0.8%",
                    withdrawalRange: "0.8% - 1%",
                    withdrawalAmount: "₹ 35,000",
                },
                {
                    assetName: "Hybrid-BAF",
                    allocationPct: "25%",
                    allocationRange: "20% - 35%",
                    allocationAmount: "₹ 25,000,00",
                    withdrawalPct: "0.75%",
                    withdrawalRange: "0.7% - 0.8%",
                    withdrawalAmount: "₹ 18,000",
                },
                {
                    assetName: "Equity-Large Cap",
                    allocationPct: "15%",
                    allocationRange: "10% - 25%",
                    allocationAmount: "₹ 15,000,00",
                    withdrawalPct: "0.9%",
                    withdrawalRange: "0.8% - 1%",
                    withdrawalAmount: "₹ 13,500",
                },
                {
                    assetName: "Fixed Deposit",
                    allocationPct: "15%",
                    allocationRange: "10% - 20%",
                    allocationAmount: "₹ 15,000,00",
                    withdrawalPct: "0.5%",
                    withdrawalRange: "0.5% - 0.6%",
                    withdrawalAmount: "₹ 7,500",
                },
            ],
        },
        {
            id: "option_2",
            title: "Moderate - Option 2",
            totalAllocation: "100%",
            totalAllocationAmount: "₹ 100,000,00",
            totalWithdrawalAmount: "₹ 50,000",
            rows: [
                {
                    assetName: "Hybrid-Aggressive",
                    allocationPct: "50%",
                    allocationRange: "40% - 60%",
                    allocationAmount: "₹ 50,000,00",
                    withdrawalPct: "0.8%",
                    withdrawalRange: "0.8% - 1%",
                    withdrawalAmount: "₹ 40,000",
                },
                {
                    assetName: "Hybrid-BAF",
                    allocationPct: "20%",
                    allocationRange: "15% - 30%",
                    allocationAmount: "₹ 20,000,00",
                    withdrawalPct: "0.75%",
                    withdrawalRange: "0.7% - 0.8%",
                    withdrawalAmount: "₹ 15,000",
                },
                {
                    assetName: "Equity-Large Cap",
                    allocationPct: "20%",
                    allocationRange: "15% - 30%",
                    allocationAmount: "₹ 20,000,00",
                    withdrawalPct: "0.9%",
                    withdrawalRange: "0.8% - 1%",
                    withdrawalAmount: "₹ 18,000",
                },
                {
                    assetName: "Fixed Deposit",
                    allocationPct: "10%",
                    allocationRange: "5% - 15%",
                    allocationAmount: "₹ 10,000,00",
                    withdrawalPct: "0.5%",
                    withdrawalRange: "0.5% - 0.6%",
                    withdrawalAmount: "₹ 5,000",
                },
            ],
        },
        {
            id: "option_3",
            title: "Moderate - Option 3",
            totalAllocation: "100%",
            totalAllocationAmount: "₹ 100,000,00",
            totalWithdrawalAmount: "₹ 50,000",
            rows: [
                {
                    assetName: "Hybrid-Aggressive",
                    allocationPct: "40%",
                    allocationRange: "35% - 50%",
                    allocationAmount: "₹ 40,000,00",
                    withdrawalPct: "0.8%",
                    withdrawalRange: "0.8% - 1%",
                    withdrawalAmount: "₹ 32,000",
                },
                {
                    assetName: "Equity-Large Cap",
                    allocationPct: "30%",
                    allocationRange: "20% - 40%",
                    allocationAmount: "₹ 30,000,00",
                    withdrawalPct: "0.9%",
                    withdrawalRange: "0.8% - 1%",
                    withdrawalAmount: "₹ 27,000",
                },
                {
                    assetName: "Hybrid-BAF",
                    allocationPct: "20%",
                    allocationRange: "15% - 30%",
                    allocationAmount: "₹ 20,000,00",
                    withdrawalPct: "0.75%",
                    withdrawalRange: "0.7% - 0.8%",
                    withdrawalAmount: "₹ 15,000",
                },
                {
                    assetName: "Fixed Deposit",
                    allocationPct: "10%",
                    allocationRange: "5% - 15%",
                    allocationAmount: "₹ 10,000,00",
                    withdrawalPct: "0.5%",
                    withdrawalRange: "0.5% - 0.6%",
                    withdrawalAmount: "₹ 5,000",
                },
            ],
        },
    ],
    Aggressive: [
        {
            id: "option_1",
            title: "Aggressive - Option 1",
            totalAllocation: "100%",
            totalAllocationAmount: "₹ 100,000,00",
            totalWithdrawalAmount: "₹ 50,000",
            rows: [
                {
                    assetName: "Equity-Large Cap",
                    allocationPct: "45%",
                    allocationRange: "35% - 55%",
                    allocationAmount: "₹ 45,000,00",
                    withdrawalPct: "0.9%",
                    withdrawalRange: "0.8% - 1%",
                    withdrawalAmount: "₹ 40,500",
                },
                {
                    assetName: "Hybrid-Aggressive",
                    allocationPct: "35%",
                    allocationRange: "25% - 45%",
                    allocationAmount: "₹ 35,000,00",
                    withdrawalPct: "0.8%",
                    withdrawalRange: "0.7% - 0.9%",
                    withdrawalAmount: "₹ 28,000",
                },
                {
                    assetName: "Hybrid-BAF",
                    allocationPct: "15%",
                    allocationRange: "10% - 25%",
                    allocationAmount: "₹ 15,000,00",
                    withdrawalPct: "0.75%",
                    withdrawalRange: "0.7% - 0.8%",
                    withdrawalAmount: "₹ 11,250",
                },
                {
                    assetName: "Fixed Deposit",
                    allocationPct: "5%",
                    allocationRange: "5% - 10%",
                    allocationAmount: "₹ 5,000,00",
                    withdrawalPct: "0.5%",
                    withdrawalRange: "0.5% - 0.6%",
                    withdrawalAmount: "₹ 2,500",
                },
            ],
        },
        {
            id: "option_2",
            title: "Aggressive - Option 2",
            totalAllocation: "100%",
            totalAllocationAmount: "₹ 100,000,00",
            totalWithdrawalAmount: "₹ 50,000",
            rows: [
                {
                    assetName: "Equity-Large Cap",
                    allocationPct: "50%",
                    allocationRange: "40% - 60%",
                    allocationAmount: "₹ 50,000,00",
                    withdrawalPct: "0.9%",
                    withdrawalRange: "0.8% - 1%",
                    withdrawalAmount: "₹ 45,000",
                },
                {
                    assetName: "Hybrid-Aggressive",
                    allocationPct: "30%",
                    allocationRange: "20% - 40%",
                    allocationAmount: "₹ 30,000,00",
                    withdrawalPct: "0.8%",
                    withdrawalRange: "0.7% - 0.9%",
                    withdrawalAmount: "₹ 24,000",
                },
                {
                    assetName: "Hybrid-BAF",
                    allocationPct: "15%",
                    allocationRange: "10% - 20%",
                    allocationAmount: "₹ 15,000,00",
                    withdrawalPct: "0.75%",
                    withdrawalRange: "0.7% - 0.8%",
                    withdrawalAmount: "₹ 11,250",
                },
                {
                    assetName: "Fixed Deposit",
                    allocationPct: "5%",
                    allocationRange: "5% - 10%",
                    allocationAmount: "₹ 5,000,00",
                    withdrawalPct: "0.5%",
                    withdrawalRange: "0.5% - 0.6%",
                    withdrawalAmount: "₹ 2,500",
                },
            ],
        },
        {
            id: "option_3",
            title: "Aggressive - Option 3",
            totalAllocation: "100%",
            totalAllocationAmount: "₹ 100,000,00",
            totalWithdrawalAmount: "₹ 50,000",
            rows: [
                {
                    assetName: "Equity-Large Cap",
                    allocationPct: "60%",
                    allocationRange: "50% - 70%",
                    allocationAmount: "₹ 60,000,00",
                    withdrawalPct: "0.9%",
                    withdrawalRange: "0.8% - 1%",
                    withdrawalAmount: "₹ 54,000",
                },
                {
                    assetName: "Hybrid-Aggressive",
                    allocationPct: "25%",
                    allocationRange: "15% - 35%",
                    allocationAmount: "₹ 25,000,00",
                    withdrawalPct: "0.8%",
                    withdrawalRange: "0.7% - 0.9%",
                    withdrawalAmount: "₹ 20,000",
                },
                {
                    assetName: "Hybrid-BAF",
                    allocationPct: "10%",
                    allocationRange: "5% - 15%",
                    allocationAmount: "₹ 10,000,00",
                    withdrawalPct: "0.75%",
                    withdrawalRange: "0.7% - 0.8%",
                    withdrawalAmount: "₹ 7,500",
                },
                {
                    assetName: "Fixed Deposit",
                    allocationPct: "5%",
                    allocationRange: "0% - 10%",
                    allocationAmount: "₹ 5,000,00",
                    withdrawalPct: "0.5%",
                    withdrawalRange: "0.5% - 0.6%",
                    withdrawalAmount: "₹ 2,500",
                },
            ],
        },
    ],
};

const formatCurrencyInput = (val: string | number | undefined | null) => {
    if (val === undefined || val === null || val === "") return "";
    const digits = String(val).replace(/\D/g, "");
    if (!digits) return "";
    return `₹ ${Number(digits).toLocaleString("en-IN")}`;
};

const annualRateToMonthlyRate = (R: number) => {
    return Math.pow(1 + R / 100, 1 / 12) - 1;
};

const getGoalNamePlaceholder = (selectedGoal?: string) => {
    if (!selectedGoal) return "Enter Goal Name";
    if (selectedGoal === "Education") return "Education";
    if (selectedGoal === "Marriage") return "Marriage";
    if (selectedGoal === "Home Purchase") return "Home Purchase";
    if (selectedGoal === "Vehicle") return "Vehicle";
    if (selectedGoal === "Others") return "Enter Goal Name";
    return selectedGoal;
};

export default function GoalIdentificationStep({
    profileId,
    financialPlanningId,
    dob,
    onNext,
    onBack,
    showBack = false,
}: GoalIdentificationStepProps) {
    const [existingAssets, setExistingAssets] = useState<ExistingAssetItem[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Alert Popup Modal State for Default Value Changes
    const [alertPopup, setAlertPopup] = useState<{
        isOpen: boolean;
        title?: string;
        message: React.ReactNode;
    } | null>(null);
    const focusedValuesRef = useRef<Record<string, string>>({});
    const [userCalculatedAge, setUserCalculatedAge] = useState<number | null>(() => getAgeFromDob(dob));
    const userCalculatedAgeRef = useRef<number | null>(getAgeFromDob(dob));

    // Risk Profile Assessment States matching KnowYourRiskProfile.tsx
    const [currentRiskProfile, setCurrentRiskProfile] = useState<string>("Conservative");
    const [q1, setQ1] = useState<string>("No");
    const [q2, setQ2] = useState<string>("No");
    const [q3, setQ3] = useState<string>("No");
    const [q4, setQ4] = useState<string>("No");
    const [showRiskProfileAssessment, setShowRiskProfileAssessment] = useState<boolean>(false);

    // Dynamic CAGR Map for Calculators fetched via BFC Group API
    const [cagrMap, setCagrMap] = useState<Record<number, number>>({});
    const cagrCache = useRef<Record<string, number>>({});

    const fetchGoalCagr = async (riskProfile: string, tenure: string | number): Promise<number> => {
        const tenureNum = Number(tenure);
        if (!tenureNum || tenureNum <= 0) {
            return 18; // Default fallback when tenure is not specified
        }

        const horizon = String(tenureNum);
        const risk = riskProfile || "Moderate";
        const cacheKey = `${risk}_${horizon}`;
        if (cagrCache.current[cacheKey] !== undefined) {
            return cagrCache.current[cacheKey];
        }

        try {
            const url = `https://bfcgroup.in/Api_controller/goal_wise_return?risk_profile=${encodeURIComponent(risk)}&investment_horizon=${encodeURIComponent(horizon)}`;
            const res = await fetch(url);
            if (res.ok) {
                const json = await res.json();
                const rawPct = json?.data?.percentage ?? json?.data?.cagr ?? json?.percentage;
                const numPct = Number(rawPct);
                if (!isNaN(numPct) && numPct > 0) {
                    cagrCache.current[cacheKey] = numPct;
                    return numPct;
                }
            }
        } catch (e) {
            console.warn("Could not fetch goal wise return:", e);
        }

        return 18; // Default fallback
    };

    // List of goals - Pre-Retirement with configured defaults
    const [goals, setGoals] = useState<GoalItem[]>([
        {
            id: Date.now(),
            occupation: "p1",
            selectedGoal: "Retirement",
            goalName: "Pre-Retirement",
            tenure: "30",
            currentCost: "",
            currentAge: "30",
            retirementAge: "60",
            lifeExpectancy: "80",
            inflationRate: "6",
            expectedReturnPreRetirement: "15",
            postRetirementReturn: "10",
            currentMonthlyExpenses: "₹ 50,000",
            isPensionable: "Yes",
            pensionAmount: "₹ 50,000",
            selectedAllocationOptionId: "option_2",
            additionalAssets: [
                {
                    id: Date.now() + 10,
                    name: "",
                    amount: "",
                },
            ],
            taggedAssets: [
                {
                    id: Date.now() + 1,
                    selectedAssetId: "",
                    taggedPercentage: "",
                    taggedCV: 0,
                    taggedFV: 0,
                    expectedReturn: 0,
                },
            ],
        },
    ]);

    // Calculate current age from DOB and sync into Pre-Retirement goals
    useEffect(() => {
        let active = true;

        const syncDobAge = async () => {
            let birthDateStr = dob;
            if (!birthDateStr && profileId) {
                try {
                    const res = await fetch(`https://k2b02x8c-5000.inc1.devtunnels.ms/api/personal/state-by-id/${profileId}`);
                    if (res.ok) {
                        const data = await res.json();
                        if (data.success && data.personal?.dob) {
                            birthDateStr = data.personal.dob;
                        }
                    }
                } catch (e) {
                    console.warn("Could not fetch personal profile dob:", e);
                }
            }

            if (!active) return;

            const computedAge = getAgeFromDob(birthDateStr);
            if (computedAge) {
                userCalculatedAgeRef.current = computedAge;
                setUserCalculatedAge(computedAge);
                setGoals((prevGoals) =>
                    prevGoals.map((g) => {
                        if (g.selectedGoal === "Retirement" && g.goalName === "Pre-Retirement") {
                            const retAge = Number(g.retirementAge) || 60;
                            const diff = Math.max(0, retAge - computedAge);
                            return {
                                ...g,
                                currentAge: String(computedAge),
                                tenure: String(diff),
                            };
                        }
                        return g;
                    })
                );
            }
        };

        syncDobAge();

        return () => {
            active = false;
        };
    }, [dob, profileId]);

    // Automatically fetch CAGR percentage from bfcgroup API for all calculators (including Pre-Retirement)
    useEffect(() => {
        let isCancelled = false;
        goals.forEach(async (goal) => {
            const isRetirement = goal.selectedGoal === "Retirement";
            const isPostRetirement = isRetirement && goal.goalName === "Post-Retirement";

            // Post-Retirement has no pre-retirement tenure / accumulation horizon
            if (isPostRetirement) return;

            const tenureVal = isRetirement
                ? (Number(goal.tenure) || Math.max(0, (Number(goal.retirementAge) || 60) - (Number(goal.currentAge) || 30)))
                : (Number(goal.tenure) || 0);

            if (!tenureVal || tenureVal <= 0) return;

            const pct = await fetchGoalCagr(currentRiskProfile, tenureVal);
            if (!isCancelled) {
                setCagrMap((prev) => {
                    if (prev[goal.id] === pct) return prev;
                    return { ...prev, [goal.id]: pct };
                });

                if (isRetirement && goal.goalName === "Pre-Retirement") {
                    setGoals((prev) =>
                        prev.map((g) => {
                            if (g.id === goal.id && g.expectedReturnPreRetirement !== String(pct)) {
                                return { ...g, expectedReturnPreRetirement: String(pct) };
                            }
                            return g;
                        })
                    );
                }
            }
        });

        return () => {
            isCancelled = true;
        };
    }, [
        goals.map((g) => `${g.id}_${g.selectedGoal}_${g.goalName}_${g.tenure}_${g.retirementAge}_${g.currentAge}`).join(","),
        currentRiskProfile,
    ]);

    // 1. Fetch Existing Investments from MongoDB
    useEffect(() => {
        const fetchInvestments = async () => {
            try {
                let assetsFound: any[] = [];

                if (profileId) {
                    try {
                        const res = await fetch(`https://k2b02x8c-5000.inc1.devtunnels.ms/api/existing-investments/profile/${profileId}`);
                        if (res.ok) {
                            const resData = await res.json();
                            if (resData.success && resData.data && Array.isArray(resData.data.assets) && resData.data.assets.length > 0) {
                                assetsFound = resData.data.assets;
                            }
                        }
                    } catch (e) {
                        console.warn("Could not fetch profile-specific investments:", e);
                    }
                }

                if (assetsFound.length > 0) {
                    const loaded: ExistingAssetItem[] = assetsFound.map((asset: any, idx: number) => {
                        const assetId = asset._id ? String(asset._id) : `asset_${idx}_${Date.now()}`;
                        const cls = asset.assetClass || "Other";
                        let name = "";
                        let cv = 0;
                        let ret = 10;

                        if (cls === "FixedDeposits") {
                            name = `Fixed Deposit: ${asset.fdBankName || "Bank FD"}`;
                            cv = Number(asset.fdAmount) || Number(asset.fdMaturityValue) || 0;
                            ret = Number(asset.fdRoi) || 6;
                        } else if (cls === "Stocks") {
                            name = `Stocks: ${asset.stockName || "Equity"} (${asset.stockCategory || "Equity"})`;
                            cv = Number(asset.stockCurrentValue) || Number(asset.stockAmount) || 0;
                            ret = Number(asset.stockRoi) || 12;
                        } else if (cls === "Mutual Funds (MF)" || cls === "Mutual Funds") {
                            const scheme = asset.mfSchemeName || asset.mfSubCategory || asset.mfAmc || "Mutual Fund";
                            const cat = asset.mfCategory || "Equity";
                            name = `Mutual Funds (MF): ${cat} Category - ${scheme}`;
                            cv = Number(asset.mfCurrentValue) || Number(asset.mfAmount) || 0;
                            ret = Number(asset.mfExpectedReturn) || 12;
                        } else if (cls === "Real Estate") {
                            const locationStr = [asset.reLocality, asset.reCity].filter(Boolean).join(", ");
                            name = `Real Estate: ${asset.reType || "Property"}${locationStr ? ` - ${locationStr}` : ""}`;
                            cv = Number(asset.reCurrentValue) || Number(asset.reAmount) || 0;
                            ret = Number(asset.reExpectedReturn) || 8;
                        } else if (cls === "Gold") {
                            const qtyStr = Number(asset.goldQuantity) > 0 ? ` (${asset.goldQuantity}g)` : "";
                            name = `Gold: ${asset.goldForm || "Physical"}${qtyStr}`;
                            cv = Number(asset.goldCurrentValue) || Number(asset.goldPurchaseValue) || 0;
                            ret = Number(asset.goldExpectedReturn) || 10;
                        } else if (cls === "Silver") {
                            const qtyStr = Number(asset.silverQuantity) > 0 ? ` (${asset.silverQuantity}g)` : "";
                            name = `Silver: ${asset.silverForm || "Physical"}${qtyStr}`;
                            cv = Number(asset.silverCurrentValue) || Number(asset.silverPurchaseValue) || 0;
                            ret = Number(asset.silverExpectedReturn) || 10;
                        } else {
                            name = `Other: ${asset.otherName || "Asset"}`;
                            cv = Number(asset.otherCurrentValue) || Number(asset.otherAmount) || 0;
                            ret = Number(asset.otherExpectedReturn) || 8;
                        }

                        return {
                            id: assetId,
                            assetClass: cls,
                            assetName: name,
                            currentValue: cv,
                            expectedReturn: ret,
                            label: `${name} (${cv > 0 ? cv.toLocaleString("en-IN") : "0"})`,
                        };
                    });

                    setExistingAssets(loaded);
                }
            } catch (err) {
                console.error("Error fetching existing investments from MongoDB:", err);
            }
        };

        fetchInvestments();
    }, [profileId]);

    // 2. Fetch Risk Profile & Financial Planning details from Backend
    useEffect(() => {
        const fetchRiskProfile = async () => {
            try {
                let foundRisk = "";
                const urls: string[] = [];

                if (financialPlanningId) {
                    if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
                        urls.push(`http://localhost:5000/api/financial-planning/${financialPlanningId}`);
                    }
                    urls.push(`https://k2b02x8c-5000.inc1.devtunnels.ms/api/financial-planning/${financialPlanningId}`);
                }

                if (profileId) {
                    if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
                        urls.push(`http://localhost:5000/api/financial-planning/profile/${profileId}`);
                    }
                    urls.push(`https://k2b02x8c-5000.inc1.devtunnels.ms/api/financial-planning/profile/${profileId}`);
                }

                for (const u of urls) {
                    try {
                        const res = await fetch(u, {
                            headers: {
                                "Content-Type": "application/json",
                                "X-Tunnel-Skip-Anti-Abuse-Page": "true",
                            },
                        });
                        if (res.ok) {
                            const data = await res.json();
                            if (data.success && data.data?.riskProfile) {
                                foundRisk = data.data.riskProfile;
                                break;
                            }
                        }
                    } catch {
                        // try next
                    }
                }

                if (foundRisk) {
                    setCurrentRiskProfile(foundRisk);
                    if (foundRisk === "Conservative") {
                        setQ1("No"); setQ2("No"); setQ3("No"); setQ4("No");
                    } else if (foundRisk === "Moderate") {
                        setQ1("Agree"); setQ2("No"); setQ3("Agree"); setQ4("No");
                    } else if (foundRisk === "Aggressive") {
                        setQ1("Agree"); setQ2("Agree"); setQ3("Agree"); setQ4("Agree");
                    }
                }
            } catch (err) {
                console.warn("Could not load risk profile from backend:", err);
            }
        };

        fetchRiskProfile();
    }, [financialPlanningId, profileId]);

    // 3. Prefill saved goal identification if previously stored
    useEffect(() => {
        if (!profileId) return;

        fetch(`https://k2b02x8c-5000.inc1.devtunnels.ms/api/goal-identification/profile/${profileId}`)
            .then((res) => res.json())
            .then((resData) => {
                if (resData.success && resData.data && Array.isArray(resData.data.goals) && resData.data.goals.length > 0) {
                    const resolvedAge = userCalculatedAgeRef.current || getAgeFromDob(dob);
                    const loadedGoals: GoalItem[] = resData.data.goals.map((g: any) => {
                        const isRet = (g.goalType || "") === "Retirement";
                        const isPreRet = isRet && (g.goalName === "Pre-Retirement" || !g.goalName);
                        const retAgeVal = g.retirementAge ? String(g.retirementAge) : "60";
                        const curAgeVal = isPreRet && resolvedAge ? String(resolvedAge) : (g.currentAge ? String(g.currentAge) : (resolvedAge ? String(resolvedAge) : "30"));
                        const tenureVal = isPreRet
                            ? String(Math.max(0, Number(retAgeVal) - Number(curAgeVal)))
                            : (g.tenure !== undefined && g.tenure !== null ? String(g.tenure) : "");

                        return {
                            id: Date.now() + Math.random(),
                            occupation: g.planningType || "p1",
                            selectedGoal: g.goalType || "",
                            goalName: g.goalName || "",
                            tenure: tenureVal,
                            currentCost: g.currentCost !== undefined && g.currentCost !== null ? formatCurrencyInput(String(g.currentCost)) : "",
                            currentAge: curAgeVal,
                            retirementAge: retAgeVal,
                            lifeExpectancy: g.lifeExpectancy ? String(g.lifeExpectancy) : "80",
                            inflationRate: g.inflationRate ? String(g.inflationRate) : "6",
                            expectedReturnPreRetirement: g.expectedReturnPreRetirement && Number(g.expectedReturnPreRetirement) !== 12 ? String(g.expectedReturnPreRetirement) : "15",
                            postRetirementReturn: g.postRetirementReturn && Number(g.postRetirementReturn) !== 7 && Number(g.postRetirementReturn) !== 6 ? String(g.postRetirementReturn) : "10",
                            currentMonthlyExpenses: g.currentMonthlyExpenses ? formatCurrencyInput(String(g.currentMonthlyExpenses)) : "",
                            isPensionable: g.isPensionable || "",
                            pensionAmount: g.pensionAmount ? formatCurrencyInput(String(g.pensionAmount)) : "",
                            selectedAllocationOptionId: g.selectedAllocationOptionId || "option_2",
                            additionalAssets: Array.isArray(g.additionalAssets) && g.additionalAssets.length > 0
                                ? g.additionalAssets.map((aa: any) => ({
                                    id: Date.now() + Math.random(),
                                    name: aa.name || "",
                                    amount: formatCurrencyInput(String(aa.amount || "")),
                                }))
                                : [
                                    {
                                        id: Date.now() + Math.random(),
                                        name: "",
                                        amount: "",
                                    },
                                ],
                            taggedAssets: Array.isArray(g.taggedAssets) && g.taggedAssets.length > 0
                                ? g.taggedAssets.map((ta: any) => ({
                                    id: Date.now() + Math.random(),
                                    selectedAssetId: ta.assetId || "",
                                    taggedPercentage: ta.taggedPercentage !== undefined ? String(ta.taggedPercentage) : "",
                                    taggedCV: Number(ta.taggedAmount) || 0,
                                    taggedFV: Number(ta.futureValue) || 0,
                                    expectedReturn: Number(ta.expectedReturn) || 0,
                                }))
                                : [
                                    {
                                        id: Date.now() + Math.random(),
                                        selectedAssetId: "",
                                        taggedPercentage: "",
                                        taggedCV: 0,
                                        taggedFV: 0,
                                        expectedReturn: 0,
                                    },
                                ],
                        };
                    });
                    setGoals(loadedGoals);
                }
            })
            .catch((err) => console.error("Error loading goal identification:", err));
    }, [profileId]);

    // Backend sync for risk profile
    const updateRiskProfileBackend = async (newRisk: string) => {
        try {
            const payload = {
                personalProfileId: profileId,
                riskProfile: newRisk,
            };

            const endpoints: { url: string; method: string }[] = [];
            if (profileId) {
                if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
                    endpoints.push({ url: `http://localhost:5000/api/financial-planning/profile/${profileId}`, method: "PUT" });
                }
                endpoints.push({ url: `https://k2b02x8c-5000.inc1.devtunnels.ms/api/financial-planning/profile/${profileId}`, method: "PUT" });
            }

            if (financialPlanningId) {
                if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
                    endpoints.push({ url: `http://localhost:5000/api/financial-planning/${financialPlanningId}`, method: "PUT" });
                }
                endpoints.push({ url: `https://k2b02x8c-5000.inc1.devtunnels.ms/api/financial-planning/${financialPlanningId}`, method: "PUT" });
            }

            for (const ep of endpoints) {
                try {
                    const res = await fetch(ep.url, {
                        method: ep.method,
                        headers: {
                            "Content-Type": "application/json",
                            "X-Tunnel-Skip-Anti-Abuse-Page": "true",
                        },
                        body: JSON.stringify(payload),
                    });
                    if (res.ok) break;
                } catch {
                    // try next
                }
            }
        } catch (err) {
            console.error("Failed to update risk profile in backend:", err);
        }
    };

    // Calculate Risk Profile from questions matching KnowYourRiskProfile.tsx logic
    const handleQuestionChange = (qNum: 1 | 2 | 3 | 4, val: string) => {
        let nq1 = q1, nq2 = q2, nq3 = q3, nq4 = q4;
        if (qNum === 1) { nq1 = val; setQ1(val); }
        if (qNum === 2) { nq2 = val; setQ2(val); }
        if (qNum === 3) { nq3 = val; setQ3(val); }
        if (qNum === 4) { nq4 = val; setQ4(val); }

        let newRisk = "Moderate";
        if (nq1 === "Agree" && nq2 === "Agree" && nq3 === "Agree" && nq4 === "Agree") {
            newRisk = "Aggressive";
        } else if (nq1 === "No" && nq2 === "No" && nq3 === "No" && nq4 === "No") {
            newRisk = "Conservative";
        } else {
            newRisk = "Moderate";
        }

        setCurrentRiskProfile(newRisk);
        updateRiskProfileBackend(newRisk);
    };

    // When an allocation option is selected
    const handleSelectOption = (goalId: number, optionId: string) => {
        updateGoalField(goalId, "selectedAllocationOptionId", optionId);
        setShowRiskProfileAssessment(true);
    };

    // Helper to calculate CV of a tagged asset dynamically
    const getTaggedAssetCV = (ta: { selectedAssetId: string; taggedPercentage: string; taggedCV?: number }) => {
        if (!ta.selectedAssetId) return 0;
        const matching = existingAssets.find((a) => a.id === ta.selectedAssetId);
        if (!matching) return Number(ta.taggedCV) || 0;
        const pct = Number(ta.taggedPercentage) || 0;
        if (pct > 0) {
            return Math.round((matching.currentValue * pct) / 100);
        }
        return Number(ta.taggedCV) || 0;
    };

    // Total existing investments sum (real value entered in Step 7 for this profile)
    const totalExistingAssets = existingAssets.reduce((sum, item) => sum + (Number(item.currentValue) || 0), 0);

    // Sum of all tagged assets (CV) allocated across all goals
    const totalTaggedAssetsCV = goals.reduce((total, goal) => {
        return total + (goal.taggedAssets || []).reduce((sub, ta) => sub + getTaggedAssetCV(ta), 0);
    }, 0);

    // Dynamic Available Assets: Remaining unallocated assets from the real investments
    const dynamicAvailableAssets = Math.max(0, totalExistingAssets - totalTaggedAssetsCV);
    const totalAvailableAssets = dynamicAvailableAssets;

    // Calculate total tagged % for an asset across all goals
    const getTotalTaggedPercentageForAsset = (assetId: string, excludeGoalId?: number, excludeAssetItemId?: number) => {
        let total = 0;
        for (const g of goals) {
            for (const ta of g.taggedAssets) {
                if (ta.selectedAssetId === assetId) {
                    if (excludeGoalId !== undefined && excludeAssetItemId !== undefined && g.id === excludeGoalId && ta.id === excludeAssetItemId) {
                        continue;
                    }
                    total += Number(ta.taggedPercentage) || 0;
                }
            }
        }
        return total;
    };

    // Check if a goal type is already selected in another goal card
    const isGoalOptionDisabled = (option: string, currentGoalId: number) => {
        if (option === "Others") return false;
        return goals.some((g) => g.id !== currentGoalId && g.selectedGoal === option);
    };

    // Goal Handlers
    const addGoal = () => {
        const firstAvailable = ALL_GOAL_OPTIONS.find((opt) => opt !== "Others" && !goals.some((g) => g.selectedGoal === opt)) || "Others";
        const isRet = firstAvailable === "Retirement";
        const resolvedAge = userCalculatedAgeRef.current || getAgeFromDob(dob);
        const curAge = resolvedAge || 30;
        const retAge = 60;
        const initialTenure = isRet ? String(Math.max(0, retAge - curAge)) : "";

        setGoals((prev) => [
            ...prev,
            {
                id: Date.now(),
                occupation: "p1",
                selectedGoal: firstAvailable === "Others" ? "" : firstAvailable,
                goalName: isRet ? "Pre-Retirement" : "",
                tenure: initialTenure,
                currentCost: "",
                currentAge: String(curAge),
                retirementAge: String(retAge),
                lifeExpectancy: "80",
                inflationRate: "6",
                expectedReturnPreRetirement: "15",
                postRetirementReturn: "10",
                currentMonthlyExpenses: isRet ? "₹ 50,000" : "",
                isPensionable: isRet ? "Yes" : "",
                pensionAmount: isRet ? "₹ 50,000" : "",
                selectedAllocationOptionId: "option_2",
                additionalAssets: [
                    {
                        id: Date.now() + 10,
                        name: "",
                        amount: "",
                    },
                ],
                taggedAssets: [
                    {
                        id: Date.now() + 1,
                        selectedAssetId: "",
                        taggedPercentage: "",
                        taggedCV: 0,
                        taggedFV: 0,
                        expectedReturn: 0,
                    },
                ],
            },
        ]);
    };

    const removeGoal = (goalId: number) => {
        setGoals((prev) => (prev.length <= 1 ? prev : prev.filter((g) => g.id !== goalId)));
    };

    const updateGoalField = (goalId: number, field: keyof GoalItem, value: any) => {
        setGoals((prev) =>
            prev.map((g) => {
                if (g.id === goalId) {
                    const updated = { ...g, [field]: value };

                    if (field === "selectedGoal") {
                        if (value === "Retirement") {
                            if (!updated.goalName || (updated.goalName !== "Pre-Retirement" && updated.goalName !== "Post-Retirement")) {
                                updated.goalName = "Pre-Retirement";
                            }
                            if (!updated.currentMonthlyExpenses) {
                                updated.currentMonthlyExpenses = "₹ 50,000";
                            }
                            const computedAge = userCalculatedAgeRef.current || getAgeFromDob(dob);
                            if (!updated.currentAge) updated.currentAge = String(computedAge || 30);
                            if (!updated.retirementAge) updated.retirementAge = "60";
                            if (!updated.lifeExpectancy) updated.lifeExpectancy = "80";
                            if (!updated.inflationRate) updated.inflationRate = "6";
                            if (!updated.expectedReturnPreRetirement) updated.expectedReturnPreRetirement = "15";
                            if (!updated.postRetirementReturn) updated.postRetirementReturn = "10";
                            if (!updated.isPensionable) updated.isPensionable = "Yes";
                            if (!updated.pensionAmount) updated.pensionAmount = "₹ 50,000";
                            const ret = Number(updated.retirementAge) || 60;
                            const cur = Number(updated.currentAge) || 30;
                            if (updated.goalName === "Pre-Retirement") {
                                updated.tenure = String(Math.max(0, ret - cur));
                            } else {
                                updated.tenure = "";
                            }
                        } else {
                            if (updated.goalName === "Pre-Retirement" || updated.goalName === "Post-Retirement") {
                                updated.goalName = "";
                            }
                            updated.tenure = "";
                        }
                    }

                    if (field === "goalName") {
                        if (value === "Pre-Retirement" && updated.selectedGoal === "Retirement") {
                            const resolvedAge = userCalculatedAgeRef.current || getAgeFromDob(dob);
                            const cur = resolvedAge || Number(updated.currentAge) || 30;
                            const ret = Number(updated.retirementAge) || 60;
                            updated.currentAge = String(cur);
                            updated.tenure = String(Math.max(0, ret - cur));
                            if (!updated.lifeExpectancy) updated.lifeExpectancy = "80";
                            if (!updated.inflationRate) updated.inflationRate = "6";
                            if (!updated.expectedReturnPreRetirement || updated.expectedReturnPreRetirement === "12") updated.expectedReturnPreRetirement = "15";
                            if (!updated.postRetirementReturn || updated.postRetirementReturn === "7" || updated.postRetirementReturn === "6") updated.postRetirementReturn = "10";
                        } else if (value === "Post-Retirement" && updated.selectedGoal === "Retirement") {
                            updated.tenure = "";
                        }
                    }

                    // For pre-retirement planning: tenure is always based on the difference between Retirement Age and Current Age
                    if (field === "currentAge" || field === "retirementAge") {
                        if (updated.selectedGoal === "Retirement" && updated.goalName === "Pre-Retirement") {
                            const cur = Number(updated.currentAge) || 0;
                            const ret = Number(updated.retirementAge) || 0;
                            updated.tenure = String(Math.max(0, ret - cur));
                        }
                    }

                    if (field === "tenure") {
                        if (updated.selectedGoal === "Retirement" && updated.goalName === "Pre-Retirement") {
                            const cur = Number(updated.currentAge) || 30;
                            const t = Number(value) || 0;
                            updated.retirementAge = String(cur + t);
                        }
                    }

                    if (
                        field === "tenure" ||
                        field === "currentAge" ||
                        field === "retirementAge" ||
                        field === "occupation" ||
                        field === "selectedGoal" ||
                        field === "goalName"
                    ) {
                        const isRetirement = updated.selectedGoal === "Retirement";
                        const isPostRetirement = isRetirement && updated.goalName === "Post-Retirement";
                        const tenureYears = isRetirement
                            ? (isPostRetirement ? 0 : (Number(updated.tenure) || Math.max(0, (Number(updated.retirementAge) || 60) - (Number(updated.currentAge) || 30))))
                            : Number(updated.tenure) || 0;

                        updated.taggedAssets = updated.taggedAssets.map((ta) => {
                            const matching = existingAssets.find((ea) => ea.id === ta.selectedAssetId);
                            const ret = matching ? matching.expectedReturn : ta.expectedReturn;
                            return {
                                ...ta,
                                taggedFV: ta.taggedCV * Math.pow(1 + ret / 100, tenureYears),
                            };
                        });
                    }
                    return updated;
                }
                return g;
            })
        );
    };

    // Pre-Retirement Field Change Handlers to trigger Alert Popup
    const handlePreRetirementFieldFocus = (goalId: number, field: string, currentValue: string) => {
        focusedValuesRef.current[`${goalId}_${field}`] = currentValue;
    };

    const handlePreRetirementFieldBlur = (goalId: number, field: string, currentValue: string) => {
        const key = `${goalId}_${field}`;
        const prevVal = focusedValuesRef.current[key];
        if (prevVal !== undefined && prevVal !== currentValue && currentValue.trim() !== "") {
            const config = PRE_RETIREMENT_FIELD_CONFIG[field];
            if (config) {
                if (field === "expectedReturnPreRetirement") {
                    setAlertPopup({
                        isOpen: true,
                        title: "Alert",
                        message: (
                            <span style={{ color: "#2c3a5b" }}>
                                Your expected pre-retirement return is higher than our recommended average. Higher return assumptions may underestimate the investment required. Consider using a more realistic return for accurate retirement planning.
                            </span>
                        ),
                    });
                } else if (field === "inflationRate") {
                    setAlertPopup({
                        isOpen: true,
                        title: "Alert",
                        message: (
                            <span style={{ color: "#2c3a5b" }}>
                                The entered inflation rate of <strong style={{ color: "#94191e", fontWeight: 700 }}>{currentValue}%</strong> is higher than the recommended inflation rate of <strong style={{ color: "#94191e", fontWeight: 700 }}>6%</strong>.
                            </span>
                        ),
                    });
                } else if (field === "postRetirementReturn") {
                    setAlertPopup({
                        isOpen: true,
                        title: "Alert",
                        message: (
                            <span style={{ color: "#2c3a5b" }}>
                                Your expected post-retirement return is higher than our recommended average. Higher return assumptions may underestimate the investment required. Consider using a more realistic return for accurate retirement planning.
                            </span>
                        ),
                    });
                } else {
                    const unit = config.unit ? ` ${config.unit}` : "";
                    let extraMessage = "";
                    if (field === "currentAge" || field === "retirementAge") {
                        const targetGoal = goals.find((g) => g.id === goalId);
                        const cur = field === "currentAge" ? Number(currentValue) : Number(targetGoal?.currentAge || 30);
                        const ret = field === "retirementAge" ? Number(currentValue) : Number(targetGoal?.retirementAge || 60);
                        const newTenure = Math.max(0, ret - cur);
                        extraMessage = ` The investment tenure has been automatically updated to ${newTenure} years based on Retirement Age (${ret}) - Current Age (${cur}).`;
                    }
                    setAlertPopup({
                        isOpen: true,
                        title: "Alert",
                        message: (
                            <span style={{ color: "#2c3a5b" }}>
                                You have modified the default assumption for <strong style={{ color: "#1e293b", fontWeight: 600 }}>{config.label}</strong> from <strong style={{ color: "#334155", fontWeight: 700 }}>{prevVal}{unit}</strong> to <strong style={{ color: "#94191e", fontWeight: 700 }}>{currentValue}{unit}</strong>.{extraMessage}
                            </span>
                        ),
                    });
                }

                focusedValuesRef.current[key] = currentValue;
            }
        }
    };

    // Tagged Assets Handlers
    const addTaggedAssetToGoal = (goalId: number) => {
        setGoals((prev) =>
            prev.map((g) => {
                if (g.id === goalId) {
                    if (g.taggedAssets.length >= existingAssets.length && existingAssets.length > 0) {
                        alert("All available assets have already been added to this goal.");
                        return g;
                    }
                    return {
                        ...g,
                        taggedAssets: [
                            ...g.taggedAssets,
                            {
                                id: Date.now() + Math.random(),
                                selectedAssetId: "",
                                taggedPercentage: "",
                                taggedCV: 0,
                                taggedFV: 0,
                                expectedReturn: 0,
                            },
                        ],
                    };
                }
                return g;
            })
        );
    };

    const removeTaggedAssetFromGoal = (goalId: number, assetItemId: number) => {
        setGoals((prev) =>
            prev.map((g) => {
                if (g.id === goalId) {
                    const nextList = g.taggedAssets.filter((ta) => ta.id !== assetItemId);
                    return {
                        ...g,
                        taggedAssets: nextList.length > 0 ? nextList : [
                            {
                                id: Date.now() + Math.random(),
                                selectedAssetId: "",
                                taggedPercentage: "",
                                taggedCV: 0,
                                taggedFV: 0,
                                expectedReturn: 0,
                            },
                        ],
                    };
                }
                return g;
            })
        );
    };

    const updateAssetSelection = (goalId: number, assetItemId: number, assetIdValue: string) => {
        const matching = existingAssets.find((a) => a.id === assetIdValue);

        setGoals((prev) =>
            prev.map((g) => {
                if (g.id === goalId) {
                    const isRetirement = g.selectedGoal === "Retirement";
                    const isPostRetirement = isRetirement && g.goalName === "Post-Retirement";
                    const tenureYears = isRetirement
                        ? (isPostRetirement ? 0 : (Number(g.tenure) || Math.max(0, (Number(g.retirementAge) || 60) - (Number(g.currentAge) || 30))))
                        : Number(g.tenure) || 0;

                    return {
                        ...g,
                        taggedAssets: g.taggedAssets.map((item) => {
                            if (item.id === assetItemId) {
                                if (!matching) {
                                    return {
                                        ...item,
                                        selectedAssetId: "",
                                        taggedPercentage: "",
                                        taggedCV: 0,
                                        taggedFV: 0,
                                        expectedReturn: 0,
                                    };
                                }
                                const otherAllocated = getTotalTaggedPercentageForAsset(matching.id, goalId, assetItemId);
                                const maxAllowed = Math.max(0, 100 - otherAllocated);
                                let currentPct = Number(item.taggedPercentage) || 0;
                                if (currentPct > maxAllowed) {
                                    currentPct = maxAllowed;
                                }
                                const cv = Math.round((matching.currentValue * currentPct) / 100);
                                const fv = Math.round(cv * Math.pow(1 + matching.expectedReturn / 100, tenureYears));
                                return {
                                    ...item,
                                    selectedAssetId: matching.id,
                                    taggedPercentage: item.taggedPercentage ? String(currentPct) : "",
                                    expectedReturn: matching.expectedReturn,
                                    taggedCV: cv,
                                    taggedFV: fv,
                                };
                            }
                            return item;
                        }),
                    };
                }
                return g;
            })
        );
    };

    const updateAssetPercentage = (goalId: number, assetItemId: number, pctValue: string) => {
        const currentGoal = goals.find((g) => g.id === goalId);
        const currentAssetItem = currentGoal?.taggedAssets.find((a) => a.id === assetItemId);
        const assetId = currentAssetItem?.selectedAssetId;

        let maxAllowed = 100;
        if (assetId) {
            const otherAllocated = getTotalTaggedPercentageForAsset(assetId, goalId, assetItemId);
            maxAllowed = Math.max(0, 100 - otherAllocated);
        }

        const digitsOnly = pctValue.replace(/\D/g, "");
        let numVal = Number(digitsOnly) || 0;
        if (numVal > maxAllowed) {
            numVal = maxAllowed;
        }

        setGoals((prev) =>
            prev.map((g) => {
                if (g.id === goalId) {
                    const isRetirement = g.selectedGoal === "Retirement";
                    const isPostRetirement = isRetirement && g.goalName === "Post-Retirement";
                    const tenureYears = isRetirement
                        ? (isPostRetirement ? 0 : (Number(g.tenure) || Math.max(0, (Number(g.retirementAge) || 60) - (Number(g.currentAge) || 30))))
                        : Number(g.tenure) || 0;

                    return {
                        ...g,
                        taggedAssets: g.taggedAssets.map((item) => {
                            if (item.id === assetItemId) {
                                const matching = existingAssets.find((a) => a.id === item.selectedAssetId);
                                const baseCV = matching ? matching.currentValue : 0;
                                const ret = matching ? matching.expectedReturn : item.expectedReturn;
                                const cv = Math.round((baseCV * numVal) / 100);
                                const fv = Math.round(cv * Math.pow(1 + ret / 100, tenureYears));
                                return {
                                    ...item,
                                    taggedPercentage: digitsOnly ? String(numVal) : "",
                                    taggedCV: cv,
                                    taggedFV: fv,
                                };
                            }
                            return item;
                        }),
                    };
                }
                return g;
            })
        );
    };

    // Additional Assets Handlers (Post-Retirement)
    const addAdditionalAssetToGoal = (goalId: number) => {
        setGoals((prev) =>
            prev.map((g) => {
                if (g.id === goalId) {
                    return {
                        ...g,
                        additionalAssets: [
                            ...g.additionalAssets,
                            {
                                id: Date.now() + Math.random(),
                                name: "",
                                amount: "",
                            },
                        ],
                    };
                }
                return g;
            })
        );
    };

    const removeAdditionalAssetFromGoal = (goalId: number, additionalAssetId: number) => {
        setGoals((prev) =>
            prev.map((g) => {
                if (g.id === goalId) {
                    const nextList = g.additionalAssets.filter((aa) => aa.id !== additionalAssetId);
                    return {
                        ...g,
                        additionalAssets: nextList.length > 0 ? nextList : [
                            {
                                id: Date.now() + Math.random(),
                                name: "",
                                amount: "",
                            },
                        ],
                    };
                }
                return g;
            })
        );
    };

    const updateAdditionalAssetField = (goalId: number, additionalAssetId: number, field: "name" | "amount", value: string) => {
        setGoals((prev) =>
            prev.map((g) => {
                if (g.id === goalId) {
                    return {
                        ...g,
                        additionalAssets: g.additionalAssets.map((aa) => {
                            if (aa.id === additionalAssetId) {
                                return {
                                    ...aa,
                                    [field]: field === "amount" ? formatCurrencyInput(value) : value,
                                };
                            }
                            return aa;
                        }),
                    };
                }
                return g;
            })
        );
    };

    // Calculate Financial Summary for a Goal
    const calculateGoalFinancials = (goal: GoalItem) => {
        const isRetirement = goal.selectedGoal === "Retirement";
        const isPostRetirement = isRetirement && goal.goalName === "Post-Retirement";

        const curAgeNum = Number(goal.currentAge) || 30;
        const retAgeNum = Number(goal.retirementAge) || 60;
        const lifeExpNum = Number(goal.lifeExpectancy) || 80;

        const timeToRetirement = isPostRetirement ? 0 : Math.max(0, retAgeNum - curAgeNum);
        const lifeExpectancyPostRetirement = isPostRetirement
            ? Math.max(0, lifeExpNum - curAgeNum)
            : Math.max(0, lifeExpNum - retAgeNum);

        const tenureYears = isRetirement
            ? (isPostRetirement ? 0 : (Number(goal.tenure) || timeToRetirement))
            : Number(goal.tenure) || 0;

        const infRateNum = (Number(goal.inflationRate) || 6) / 100;
        const postRetReturnNum = (Number(goal.postRetirementReturn) || 10) / 100;
        const monthlyExpNum = Number(String(goal.currentMonthlyExpenses).replace(/\D/g, "")) || 0;

        const futureMonthlyExpensesExact = isPostRetirement
            ? monthlyExpNum
            : monthlyExpNum * Math.pow(1 + infRateNum, timeToRetirement);
        const futureMonthlyExpenses = Math.round(futureMonthlyExpensesExact);

        const pensionAmountNum = goal.isPensionable === "Yes" ? Number(String(goal.pensionAmount).replace(/\D/g, "")) || 0 : 0;
        const netFutureMonthlyExpenses = Math.max(0, futureMonthlyExpensesExact - pensionAmountNum);

        const realPostReturn = (postRetReturnNum - infRateNum) / (1 + infRateNum);
        const rm = realPostReturn / 12;
        const totalPostRetMonths = (lifeExpectancyPostRetirement || 20) * 12;

        let corpusRequired = 0;
        if (totalPostRetMonths <= 0 || netFutureMonthlyExpenses <= 0) {
            corpusRequired = 0;
        } else if (rm === 0) {
            corpusRequired = Math.round(netFutureMonthlyExpenses * totalPostRetMonths);
        } else {
            const pvif = Math.pow(1 + rm, totalPostRetMonths);
            corpusRequired = Math.round((netFutureMonthlyExpenses * (1 + rm) * (pvif - 1) / rm) / pvif);
        }

        let goalFutureValue = 0;
        if (isRetirement) {
            goalFutureValue = corpusRequired;
        } else {
            const costNum = Number(String(goal.currentCost).replace(/\D/g, "")) || 0;
            const inf = 0.06;
            goalFutureValue = Math.round(costNum * Math.pow(1 + inf, tenureYears));
        }

        const totalTaggedCV = Math.round(goal.taggedAssets.reduce((sum, a) => sum + (Number(a.taggedCV) || 0), 0));
        const totalTaggedFV = Math.round(goal.taggedAssets.reduce((sum, a) => sum + (Number(a.taggedFV) || 0), 0));

        const shortfallOrExcess = goalFutureValue - totalTaggedFV;
        const shortfall = Math.max(0, shortfallOrExcess);

        // CAGR logic: dynamic percentage from bfcgroup API (cagrMap) or user-specified expectedReturnPreRetirement
        const cagrPercentage = isRetirement
            ? (Number(goal.expectedReturnPreRetirement) || cagrMap[goal.id] || 18)
            : (cagrMap[goal.id] ?? goal.cagrPercentage ?? 18);
        const cagr = cagrPercentage / 100;

        // Target Amount Calculator formula for SIP Required and Lumpsum Required
        // Applied ONLY when there is a shortfall (shortfall > 0)
        let sipRequired = 0;
        let lumpsumRequired = 0;

        if (shortfall > 0) {
            const monthlyRate = annualRateToMonthlyRate(cagrPercentage);
            const totalMonths = tenureYears * 12;

            // Monthly SIP (PMT equivalent)
            if (monthlyRate > 0 && totalMonths > 0) {
                const monthlySipValue =
                    (shortfall * monthlyRate) /
                    ((Math.pow(1 + monthlyRate, totalMonths) - 1) * (1 + monthlyRate));
                sipRequired = Math.round(monthlySipValue);
            }

            // One-time Lump Sum
            if (tenureYears > 0) {
                const lumpSum =
                    shortfall / Math.pow(1 + cagrPercentage / 100, tenureYears);
                lumpsumRequired = Math.round(lumpSum);
            } else if (isPostRetirement) {
                lumpsumRequired = shortfall;
            }
        }

        return {
            tenureYears,
            timeToRetirement,
            lifeExpectancyPostRetirement,
            futureMonthlyExpenses,
            corpusRequired,
            goalFutureValue,
            totalTaggedCV,
            totalTaggedFV,
            shortfallOrExcess,
            cagrPercentage,
            sipRequired,
            lumpsumRequired,
        };
    };

    // Handle Form Submit & Store in MongoDB
    const handleContinue = async () => {
        setIsSubmitting(true);
        try {
            const formattedGoals = goals.map((goal) => {
                const fin = calculateGoalFinancials(goal);
                const isRetirement = goal.selectedGoal === "Retirement";
                const isPostRetirement = isRetirement && goal.goalName === "Post-Retirement";

                const formattedTaggedAssets = goal.taggedAssets
                    .filter((a) => a.selectedAssetId && Number(a.taggedPercentage) > 0)
                    .map((a) => {
                        const matching = existingAssets.find((ea) => ea.id === a.selectedAssetId);
                        return {
                            assetId: a.selectedAssetId,
                            assetClass: matching ? matching.assetClass : "",
                            assetName: matching ? matching.assetName : "",
                            currentValue: matching ? matching.currentValue : 0,
                            taggedPercentage: Number(a.taggedPercentage) || 0,
                            taggedAmount: Math.round(a.taggedCV),
                            expectedReturn: a.expectedReturn,
                            futureValue: Math.round(a.taggedFV),
                        };
                    });

                const formattedAdditionalAssets = isPostRetirement
                    ? goal.additionalAssets
                        .filter((aa) => aa.name && aa.amount)
                        .map((aa) => ({
                            name: aa.name,
                            amount: Number(String(aa.amount).replace(/\D/g, "")) || 0,
                        }))
                    : [];

                return {
                    goalId: goal.id,
                    goalType: goal.selectedGoal,
                    goalName: goal.goalName,
                    tenure: fin.tenureYears,
                    currentCost: Number(String(goal.currentCost).replace(/\D/g, "")) || 0,
                    planningType: isRetirement ? "p2" : goal.occupation,
                    currentAge: Number(goal.currentAge) || null,
                    retirementAge: Number(goal.retirementAge) || null,
                    lifeExpectancy: Number(goal.lifeExpectancy) || null,
                    inflationRate: Number(goal.inflationRate) || 6,
                    expectedReturnPreRetirement: Number(goal.expectedReturnPreRetirement) || 15,
                    postRetirementReturn: Number(goal.postRetirementReturn) || 10,
                    currentMonthlyExpenses: Number(String(goal.currentMonthlyExpenses).replace(/\D/g, "")) || null,
                    isPensionable: goal.isPensionable,
                    pensionAmount: Number(String(goal.pensionAmount).replace(/\D/g, "")) || null,
                    selectedAllocationOptionId: isPostRetirement ? (goal.selectedAllocationOptionId || "option_2") : null,
                    additionalAssets: formattedAdditionalAssets,
                    timeToRetirement: fin.timeToRetirement,
                    lifeExpectancyPostRetirement: fin.lifeExpectancyPostRetirement,
                    futureMonthlyExpenses: fin.futureMonthlyExpenses,
                    corpusRequired: fin.goalFutureValue,
                    taggedAssets: formattedTaggedAssets,
                    futureValue: fin.goalFutureValue,
                    cvTaggedAsset: fin.totalTaggedCV,
                    fvTaggedAsset: fin.totalTaggedFV,
                    shortfallOrExcess: fin.shortfallOrExcess,
                    cagr: fin.cagrPercentage,
                    sipRequired: fin.sipRequired,
                    lumpsumRequired: fin.lumpsumRequired,
                };
            });

            if (profileId) {
                const payload = {
                    personalProfileId: profileId,
                    goals: formattedGoals,
                };

                await fetch("https://k2b02x8c-5000.inc1.devtunnels.ms/api/goal-identification", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            }

            if (onNext) onNext();
        } catch (err) {
            console.error("Error saving goal identification:", err);
            if (onNext) onNext();
        } finally {
            setIsSubmitting(false);
        }
    };

    // Render Question exactly matching KnowYourRiskProfile.tsx
    const renderRiskQuestion = (
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
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors border-gray-200 group hover:bg-[#06A358] ${value === "Agree" ? "bg-[#06A358] text-white" : "bg-white text-gray-700"}`}
                >
                    <span className="flex gap-1 items-center">
                        <span className={value === "Agree" ? "text-white" : "text-gray-700 group-hover:text-white"}>Agree</span>
                        <img className="w-[15px] h-[15px]" src="/financialplanning/done.png" alt="done" style={{ filter: value === "Agree" ? "brightness(0) invert(1)" : "none" }} />
                    </span>
                </button>
                <button
                    type="button"
                    onClick={() => onChange("Somewhat Agree")}
                    role="radio"
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors border-gray-200 group hover:bg-[#06A358] ${value === "Somewhat Agree" ? "bg-[#06A358] text-white" : "bg-white text-gray-700"}`}
                >
                    <span className="text-gray-700 flex gap-1 items-center">
                        <span className={value === "Somewhat Agree" ? "text-white" : "text-gray-700 group-hover:text-white"}>Somewhat Agree</span>
                        <img className="w-[15px] h-[15px]" src="/financialplanning/emo.png" alt="somewhat agree" style={{ filter: value === "Somewhat Agree" ? "brightness(0) invert(1)" : "none" }} />
                    </span>
                </button>
                <button
                    type="button"
                    onClick={() => onChange("No")}
                    role="radio"
                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors border-gray-200 group hover:bg-[#06A358] ${value === "No" ? "bg-[#06A358] text-white" : "bg-white text-gray-700"}`}
                >
                    <span className="text-gray-700 flex gap-1 items-center">
                        <span className={value === "No" ? "text-white" : "text-gray-700 group-hover:text-white"}>No</span>
                        <img className="w-[15px] h-[15px]" src="/financialplanning/close.png" alt="no" style={{ filter: value === "No" ? "brightness(0) invert(1)" : "none" }} />
                    </span>
                </button>
            </div>
            <div className="w-full h-px bg-[#e9e9e9] mt-5 sm:mt-5 mb-5 sm:mb-6" />
        </>
    );

    // Current active options based on the user's risk profile
    const activeOptions = ALLOCATION_OPTIONS_BY_RISK[currentRiskProfile] || ALLOCATION_OPTIONS_BY_RISK["Conservative"];

    return (
        <div className="rounded-[24px] border border-[#E5E5E5] bg-white p-6 shadow-sm">

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between items-center gap-2">
                <h3 className="col-span-8 font-bold text-[16px] sm:text-[18px] md:text-[20px] lg:text-[25px] bg-gradient-to-r from-[#06a358] to-[#001EFE] bg-clip-text text-transparent pb-3">
                    Goal Identification
                </h3>

                <div className="col-span-1 items-center text-end rounded-[10px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-1 md:p-2">
                    <div className="flex items-center gap-1 justify-end px-5">
                        <img className="w-[15px] h-[15px]" src="/financialplanning/moneybag.png" alt="moneybag" />
                        <p className="text-[#06A358] font-semibold">
                            Available Assets: Rs. {dynamicAvailableAssets.toLocaleString("en-IN")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-[#e9e9e9] mt-5 sm:mt-5 mb-5 sm:mb-6" />

            {/* List of Goals */}
            <div className="space-y-10">
                {goals.map((goal) => {
                    const fin = calculateGoalFinancials(goal);
                    const isRetirement = goal.selectedGoal === "Retirement";
                    const isPostRetirement = isRetirement && goal.goalName === "Post-Retirement";

                    return (
                        <div key={goal.id} className="space-y-6">
                            <div className="flex gap-4 items-end">
                                <div className="flex-1">
                                    {/* Top Priority Selector & Delete Button */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div>
                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                Select Priority
                                            </label>
                                            <select
                                                value={goal.occupation}
                                                onChange={(e) => updateGoalField(goal.id, "occupation", e.target.value)}
                                                className="h-[46px] rounded-[10px] border border-[#e9e9e9] bg-white px-4 pr-8 text-[14px] text-[#44475B] outline-none transition focus:border-[#04B488] min-w-[120px] cursor-pointer"
                                            >
                                                <option value="" disabled>Select</option>
                                                <option value="p1">P1</option>
                                                <option value="p2">P2</option>
                                                <option value="p3">P3</option>
                                                <option value="p4">P4</option>
                                                <option value="p5">P5</option>
                                            </select>
                                        </div>
                                        {goals.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeGoal(goal.id)}
                                                className="cursor-pointer h-10 w-10 rounded-full bg-[#DB4437] text-white flex items-center justify-center shadow-sm hover:bg-[#c33d31] transition shrink-0"
                                                title="Remove Goal"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>

                                    <>
                                        {/* Goal Inputs Grid */}
                                        <div className={`grid grid-cols-1 sm:grid-cols-2 ${isPostRetirement ? "md:grid-cols-2" : "md:grid-cols-3"} gap-4 sm:gap-5 py-3`}>
                                            <div>
                                                <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                    Select Goal
                                                </label>
                                                <select
                                                    value={goal.selectedGoal}
                                                    onChange={(e) => updateGoalField(goal.id, "selectedGoal", e.target.value)}
                                                    className="cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                >
                                                    <option value="">Select Goal</option>
                                                    {ALL_GOAL_OPTIONS.map((opt) => (
                                                        <option
                                                            key={opt}
                                                            value={opt}
                                                            disabled={isGoalOptionDisabled(opt, goal.id)}
                                                        >
                                                            {opt} {isGoalOptionDisabled(opt, goal.id) ? "(Already Selected)" : ""}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                    Goal Name
                                                </label>
                                                {isRetirement ? (
                                                    <select
                                                        value={goal.goalName || "Pre-Retirement"}
                                                        onChange={(e) => updateGoalField(goal.id, "goalName", e.target.value)}
                                                        className="cursor-pointer w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                    >
                                                        <option value="Pre-Retirement">Pre-Retirement</option>
                                                        <option value="Post-Retirement">Post-Retirement</option>
                                                    </select>
                                                ) : (
                                                    <input
                                                        value={goal.goalName}
                                                        onChange={(e) => updateGoalField(goal.id, "goalName", e.target.value)}
                                                        className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                        type="text"
                                                        placeholder={getGoalNamePlaceholder(goal.selectedGoal)}
                                                    />
                                                )}
                                            </div>

                                            {!isPostRetirement && (
                                                <div>
                                                    <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                        Tenure (Yrs)
                                                    </label>
                                                    <input
                                                        value={goal.tenure}
                                                        onChange={(e) => updateGoalField(goal.id, "tenure", e.target.value.replace(/\D/g, ""))}
                                                        className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                        type="text"
                                                        placeholder="Enter Years"
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Mode specific section */}
                                        <div className="pt-2">
                                            {!isRetirement && (
                                                <div className="pb-5">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                                                        <div>
                                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                                Current Cost
                                                            </label>
                                                            <input
                                                                value={goal.currentCost}
                                                                onChange={(e) => updateGoalField(goal.id, "currentCost", formatCurrencyInput(e.target.value))}
                                                                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                                type="text"
                                                                placeholder="₹ Amount"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {isRetirement && (
                                                <div className="pb-5 space-y-6">
                                                    {isPostRetirement ? (
                                                        /* Post-Retirement Planning Card */
                                                        <div className="w-full bg-[#FAFAFA] border border-[#ECECEC] rounded-[24px] p-6 sm:p-8 space-y-6">
                                                            <div className="flex items-center gap-3">
                                                                <img className="w-[32px] h-[32px] object-contain shrink-0" src="/financialplanning/Group 2188.svg" alt="Post-Retirement Planning" />
                                                                <h3 className="font-bold text-[18px] sm:text-[20px] bg-gradient-to-r from-[#06a358] to-[#001EFE] bg-clip-text text-transparent inline-block">
                                                                    Post-Retirement Planning
                                                                </h3>
                                                            </div>

                                                            <div
                                                                className="grid grid-cols-1 sm:grid-cols-2"
                                                                style={{ columnGap: "68px", rowGap: "28px" }}
                                                            >
                                                                <div className="space-y-2.5">
                                                                    <label className="block text-[13.5px] sm:text-[14px] font-semibold text-[#44475B]">
                                                                        Current Age
                                                                    </label>
                                                                    <input
                                                                        value={goal.currentAge}
                                                                        onChange={(e) => updateGoalField(goal.id, "currentAge", e.target.value.replace(/\D/g, ""))}
                                                                        className="w-full h-[48px] sm:h-[50px] bg-white border border-[#e9e9e9] rounded-[12px] px-4 text-[14px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors shadow-2xs"
                                                                        type="text"
                                                                        placeholder="68"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2.5">
                                                                    <label className="block text-[13.5px] sm:text-[14px] font-semibold text-[#44475B]">
                                                                        Retirement Age
                                                                    </label>
                                                                    <input
                                                                        value={goal.retirementAge}
                                                                        onChange={(e) => updateGoalField(goal.id, "retirementAge", e.target.value.replace(/\D/g, ""))}
                                                                        className="w-full h-[48px] sm:h-[50px] bg-white border border-[#e9e9e9] rounded-[12px] px-4 text-[14px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors shadow-2xs"
                                                                        type="text"
                                                                        placeholder="60"
                                                                    />
                                                                </div>
                                                                <div className="space-y-2.5 sm:col-span-2 md:col-span-1">
                                                                    <label className="block text-[13.5px] sm:text-[14px] font-semibold text-[#44475B]">
                                                                        Current Monthly Expenses
                                                                    </label>
                                                                    <input
                                                                        value={goal.currentMonthlyExpenses}
                                                                        onChange={(e) => updateGoalField(goal.id, "currentMonthlyExpenses", formatCurrencyInput(e.target.value))}
                                                                        className="w-full h-[48px] sm:h-[50px] bg-white border border-[#e9e9e9] rounded-[12px] px-4 text-[14px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors shadow-2xs"
                                                                        type="text"
                                                                        placeholder="₹ 50,000"
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Is Your Service Pensionable? */}
                                                            <div className="space-y-3 pt-2">
                                                                <label
                                                                    className="block text-[15px] sm:text-[16px] font-bold text-black"
                                                                    style={{ color: "#000000", fontWeight: 700 }}
                                                                >
                                                                    Is Your Service Pensionable? <span className="font-bold text-red-600" style={{ color: "#dc2626", fontWeight: 700 }}>*</span>
                                                                </label>
                                                                <div role="radiogroup" aria-label="Pensionable Service" className="grid grid-cols-2 gap-4">
                                                                    <button
                                                                        type="button"
                                                                        role="radio"
                                                                        onClick={() => updateGoalField(goal.id, "isPensionable", "Yes")}
                                                                        className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${goal.isPensionable === "Yes"
                                                                            ? "bg-[#EBFFEC] border-[#04B488]"
                                                                            : "bg-white border-gray-200 text-gray-700 hover:bg-[#EBFFEC]"
                                                                            }`}
                                                                    >
                                                                        <span className="flex gap-1.5 items-center">
                                                                            <span className="text-gray-700 font-medium">Yes</span>
                                                                            <img className="w-[15px] h-[15px]" src="/financialplanning/done.png" alt="done" />
                                                                        </span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        role="radio"
                                                                        onClick={() => updateGoalField(goal.id, "isPensionable", "No")}
                                                                        className={`flex items-center cursor-pointer justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${goal.isPensionable === "No"
                                                                            ? "bg-[#FFF2F2] border-[#DB4437]"
                                                                            : "bg-white border-gray-200 text-gray-700 hover:bg-[#FFF2F2]"
                                                                            }`}
                                                                    >
                                                                        <span className="flex gap-1.5 items-center">
                                                                            <span className="text-gray-700 font-medium">No</span>
                                                                            <img className="w-[15px] h-[15px]" src="/financialplanning/close.png" alt="close" />
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                                {goal.isPensionable === "Yes" && (
                                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
                                                                        <div>
                                                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                                                Monthly Pension Amount (Approx.)
                                                                            </label>
                                                                            <input
                                                                                value={goal.pensionAmount}
                                                                                onChange={(e) => updateGoalField(goal.id, "pensionAmount", formatCurrencyInput(e.target.value))}
                                                                                className="w-full h-[46px] sm:h-[48px] bg-white border border-[#e9e9e9] rounded-[12px] px-4 text-[14px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                                                type="text"
                                                                                placeholder="₹ 50,000"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        /* Pre-Retirement Planning Card */
                                                        <div className="w-full bg-[#FAFAFA] border border-[#ECECEC] rounded-[24px] p-6 sm:p-8 space-y-7 sm:space-y-8">
                                                            <div className="flex items-center gap-3 pb-2 border-b border-[#ECECEC]">
                                                                <img className="w-[30px] h-[30px] object-contain shrink-0" src="/financialplanning/umb.png" alt="Pre-Retirement Planning" />
                                                                <h3 className="font-bold text-[18px] sm:text-[20px] bg-gradient-to-r from-[#06a358] to-[#001EFE] bg-clip-text text-transparent inline-block">
                                                                    Pre-Retirement Planning
                                                                </h3>
                                                            </div>

                                                            <div
                                                                className="grid grid-cols-1 sm:grid-cols-2"
                                                                style={{ columnGap: "68px", rowGap: "28px" }}
                                                            >
                                                                {/* Current Age */}
                                                                <div className="space-y-2.5">
                                                                    <label className="block text-[13.5px] sm:text-[14px] font-semibold text-[#44475B]">
                                                                        Current Age
                                                                    </label>
                                                                    <input
                                                                        value={goal.currentAge}
                                                                        onFocus={() => handlePreRetirementFieldFocus(goal.id, "currentAge", goal.currentAge)}
                                                                        onBlur={(e) => handlePreRetirementFieldBlur(goal.id, "currentAge", e.target.value)}
                                                                        onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
                                                                        onChange={(e) => updateGoalField(goal.id, "currentAge", e.target.value.replace(/\D/g, ""))}
                                                                        className="w-full h-[48px] sm:h-[50px] bg-white border border-[#e9e9e9] rounded-[12px] px-4 text-[14px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors shadow-2xs"
                                                                        type="text"
                                                                        placeholder="30"
                                                                    />
                                                                </div>

                                                                {/* Retirement Age */}
                                                                <div className="space-y-2.5">
                                                                    <label className="block text-[13.5px] sm:text-[14px] font-semibold text-[#44475B]">
                                                                        Retirement Age
                                                                    </label>
                                                                    <input
                                                                        value={goal.retirementAge}
                                                                        onFocus={() => handlePreRetirementFieldFocus(goal.id, "retirementAge", goal.retirementAge)}
                                                                        onBlur={(e) => handlePreRetirementFieldBlur(goal.id, "retirementAge", e.target.value)}
                                                                        onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
                                                                        onChange={(e) => updateGoalField(goal.id, "retirementAge", e.target.value.replace(/\D/g, ""))}
                                                                        className="w-full h-[48px] sm:h-[50px] bg-white border border-[#e9e9e9] rounded-[12px] px-4 text-[14px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors shadow-2xs"
                                                                        type="text"
                                                                        placeholder="60"
                                                                    />
                                                                </div>

                                                                {/* Life Expectancy */}
                                                                <div className="space-y-2.5">
                                                                    <label className="block text-[13.5px] sm:text-[14px] font-semibold text-[#44475B]">
                                                                        Life Expectancy
                                                                    </label>
                                                                    <input
                                                                        value={goal.lifeExpectancy}
                                                                        onFocus={() => handlePreRetirementFieldFocus(goal.id, "lifeExpectancy", goal.lifeExpectancy)}
                                                                        onBlur={(e) => handlePreRetirementFieldBlur(goal.id, "lifeExpectancy", e.target.value)}
                                                                        onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
                                                                        onChange={(e) => updateGoalField(goal.id, "lifeExpectancy", e.target.value.replace(/\D/g, ""))}
                                                                        className="w-full h-[48px] sm:h-[50px] bg-white border border-[#e9e9e9] rounded-[12px] px-4 text-[14px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors shadow-2xs"
                                                                        type="text"
                                                                        placeholder="80"
                                                                    />
                                                                </div>

                                                                {/* Inflation rate (%) */}
                                                                <div className="space-y-2.5">
                                                                    <label className="block text-[13.5px] sm:text-[14px] font-semibold text-[#44475B]">
                                                                        Inflation rate (%)
                                                                    </label>
                                                                    <input
                                                                        value={goal.inflationRate}
                                                                        onFocus={() => handlePreRetirementFieldFocus(goal.id, "inflationRate", goal.inflationRate)}
                                                                        onBlur={(e) => handlePreRetirementFieldBlur(goal.id, "inflationRate", e.target.value)}
                                                                        onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
                                                                        onChange={(e) => updateGoalField(goal.id, "inflationRate", e.target.value)}
                                                                        className="w-full h-[48px] sm:h-[50px] bg-white border border-[#e9e9e9] rounded-[12px] px-4 text-[14px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors shadow-2xs"
                                                                        type="text"
                                                                        placeholder="6"
                                                                    />
                                                                </div>

                                                                {/* Expected Return Pre - Retirment (%) */}
                                                                <div className="space-y-2.5">
                                                                    <label className="block text-[13.5px] sm:text-[14px] font-semibold text-[#44475B]">
                                                                        Expected Return Pre - Retirement (%)
                                                                        {cagrMap[goal.id] !== undefined && (
                                                                            <span className="text-[#035daf] font-bold text-xs ml-1">
                                                                                (GRID RATE: {cagrMap[goal.id]}%)
                                                                            </span>
                                                                        )}
                                                                    </label>
                                                                    <input
                                                                        value={goal.expectedReturnPreRetirement}
                                                                        onFocus={() => handlePreRetirementFieldFocus(goal.id, "expectedReturnPreRetirement", goal.expectedReturnPreRetirement)}
                                                                        onBlur={(e) => handlePreRetirementFieldBlur(goal.id, "expectedReturnPreRetirement", e.target.value)}
                                                                        onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
                                                                        onChange={(e) => updateGoalField(goal.id, "expectedReturnPreRetirement", e.target.value)}
                                                                        className="w-full h-[48px] sm:h-[50px] bg-white border border-[#e9e9e9] rounded-[12px] px-4 text-[14px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors shadow-2xs"
                                                                        type="text"
                                                                        placeholder={String(cagrMap[goal.id] || 18)}
                                                                    />
                                                                </div>

                                                                {/* Post - Retirement Return (%) */}
                                                                <div className="space-y-2.5">
                                                                    <label className="block text-[13.5px] sm:text-[14px] font-semibold text-[#44475B]">
                                                                        Post - Retirement Return (%)
                                                                    </label>
                                                                    <input
                                                                        value={goal.postRetirementReturn}
                                                                        onFocus={() => handlePreRetirementFieldFocus(goal.id, "postRetirementReturn", goal.postRetirementReturn)}
                                                                        onBlur={(e) => handlePreRetirementFieldBlur(goal.id, "postRetirementReturn", e.target.value)}
                                                                        onKeyDown={(e) => { if (e.key === "Enter") (e.target as HTMLInputElement).blur(); }}
                                                                        onChange={(e) => updateGoalField(goal.id, "postRetirementReturn", e.target.value)}
                                                                        className="w-full h-[48px] sm:h-[50px] bg-white border border-[#e9e9e9] rounded-[12px] px-4 text-[14px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors shadow-2xs"
                                                                        type="text"
                                                                        placeholder="10"
                                                                    />
                                                                </div>

                                                                {/* Current Monthly Expenses */}
                                                                <div className="space-y-2.5 sm:col-span-2 md:col-span-1">
                                                                    <label className="block text-[13.5px] sm:text-[14px] font-semibold text-[#44475B]">
                                                                        Current Monthly Expenses
                                                                    </label>
                                                                    <input
                                                                        value={goal.currentMonthlyExpenses}
                                                                        onChange={(e) => updateGoalField(goal.id, "currentMonthlyExpenses", formatCurrencyInput(e.target.value))}
                                                                        className="w-full h-[48px] sm:h-[50px] bg-white border border-[#e9e9e9] rounded-[12px] px-4 text-[14px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors shadow-2xs"
                                                                        type="text"
                                                                        placeholder="₹ 50,000"
                                                                    />
                                                                </div>
                                                            </div>

                                                            {/* Divider line */}
                                                            <div className="w-full h-px bg-[#EAEAEA] my-2" />

                                                            {/* Is Your Service Pensionable? */}
                                                            <div className="space-y-4 pt-1">
                                                                <label
                                                                    className="block text-[15px] sm:text-[16px] font-bold text-black"
                                                                    style={{ color: "#000000", fontWeight: 700 }}
                                                                >
                                                                    Is Your Service Pensionable? <span className="font-bold text-red-600" style={{ color: "#dc2626", fontWeight: 700 }}>*</span>
                                                                </label>
                                                                <div role="radiogroup" aria-label="Pensionable Service" className="grid grid-cols-2 gap-4 max-w-md">
                                                                    <button
                                                                        type="button"
                                                                        role="radio"
                                                                        aria-checked={goal.isPensionable === "Yes"}
                                                                        onClick={() => updateGoalField(goal.id, "isPensionable", "Yes")}
                                                                        className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${goal.isPensionable === "Yes"
                                                                            ? "bg-[#EBFFEC] border-[#04B488] shadow-xs"
                                                                            : "bg-white border-gray-200 text-gray-700 hover:bg-[#EBFFEC]"
                                                                            }`}
                                                                    >
                                                                        <span className="flex gap-1.5 items-center">
                                                                            <span className="text-gray-700 font-medium">Yes</span>
                                                                            <img className="w-[15px] h-[15px]" src="/financialplanning/done.png" alt="done" />
                                                                        </span>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        role="radio"
                                                                        aria-checked={goal.isPensionable === "No"}
                                                                        onClick={() => updateGoalField(goal.id, "isPensionable", "No")}
                                                                        className={`flex items-center cursor-pointer justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${goal.isPensionable === "No"
                                                                            ? "bg-[#FFF2F2] border-[#DB4437] shadow-xs"
                                                                            : "bg-white border-gray-200 text-gray-700 hover:bg-[#FFF2F2]"
                                                                            }`}
                                                                    >
                                                                        <span className="flex gap-1.5 items-center">
                                                                            <span className="text-gray-700 font-medium">No</span>
                                                                            <img className="w-[15px] h-[15px]" src="/financialplanning/close.png" alt="close" />
                                                                        </span>
                                                                    </button>
                                                                </div>
                                                                {goal.isPensionable === "Yes" && (
                                                                    <div className="pt-2 max-w-md space-y-2">
                                                                        <label className="block text-[13.5px] sm:text-[14px] font-semibold text-[#44475B]">
                                                                            Monthly Pension Amount (Approx.)
                                                                        </label>
                                                                        <input
                                                                            value={goal.pensionAmount}
                                                                            onChange={(e) => updateGoalField(goal.id, "pensionAmount", formatCurrencyInput(e.target.value))}
                                                                            className="w-full h-[48px] sm:h-[50px] bg-white border border-[#e9e9e9] rounded-[12px] px-4 text-[14px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors shadow-2xs"
                                                                            type="text"
                                                                            placeholder="₹ 50,000"
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {/* Retirement Analysis Projection Cards (Pre-Retirement Only) */}
                                                    {!isPostRetirement && (
                                                        <section className="bg-[#FAFAFA] border border-[#e9e9e9] rounded-[20px] p-5 my-6">
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                                {/* Card 1 */}
                                                                <div className="flex items-center gap-4 rounded-xl bg-[#FFF8E5] p-4">
                                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FFBF08] text-white p-3">
                                                                        <img className="w-full h-full object-contain" src="/financialplanning/r1.png" alt="rupee" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-gray-500 font-medium">Time to Retirement</p>
                                                                        <h4 className="text-lg sm:text-xl font-bold text-[#F4A300]">{fin.timeToRetirement} Years</h4>
                                                                    </div>
                                                                </div>

                                                                {/* Card 2 */}
                                                                <div className="flex items-center gap-4 rounded-xl bg-[#E4F8EB] p-4">
                                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-[#50E680] to-[#048A42] text-white p-3">
                                                                        <img className="w-full h-full object-contain" src="/financialplanning/f1.png" alt="rupee" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-gray-500 font-medium">Life Expectancy Post Retirement</p>
                                                                        <h4 className="text-lg sm:text-xl font-bold text-[#04B488]">{fin.lifeExpectancyPostRetirement} Years</h4>
                                                                    </div>
                                                                </div>

                                                                {/* Card 3 */}
                                                                <div className="flex items-center gap-4 rounded-xl border border-[#E8E8E8] bg-[#F4EEFF] p-4">
                                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#7C4DFF] text-white p-3">
                                                                        <img className="w-full h-full object-contain" src="/financialplanning/r2.png" alt="rupee" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-gray-500 font-medium">Future Monthly Expenses</p>
                                                                        <h4 className="text-lg sm:text-xl font-bold text-[#7C4DFF]">₹{fin.futureMonthlyExpenses.toLocaleString("en-IN")}</h4>
                                                                    </div>
                                                                </div>

                                                                {/* Card 4 */}
                                                                <div className="flex items-center gap-4 rounded-xl bg-[#D4FEFF] p-4">
                                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#077E82] text-white p-3">
                                                                        <img className="w-full h-full object-contain" src="/financialplanning/r3.png" alt="rupee" />
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-xs text-gray-500 font-medium">Corpus Required</p>
                                                                        <h4 className="text-lg sm:text-xl font-bold text-[#077E82]">₹{fin.corpusRequired.toLocaleString("en-IN")}</h4>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </section>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="w-full h-px bg-[#e9e9e9] mt-5 mb-4 sm:mb-4" />
                                    </>

                                    {/* Tag Existing Assets Section */}
                                    <div className="flex-1">
                                        <div className="flex gap-4 items-center justify-between mb-2">
                                            <h2 className="block font-medium text-[19px] text-[#44475B]">
                                                Tag Existing Assets
                                            </h2>
                                            {goal.taggedAssets.length > 0 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeTaggedAssetFromGoal(goal.id, goal.taggedAssets[0]?.id)}
                                                    className="cursor-pointer h-10 w-10 rounded-full bg-[#DB4437] text-white flex items-center justify-center shadow-sm hover:bg-[#c33d31] transition shrink-0"
                                                    title="Delete Tagged Assets"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            )}
                                        </div>

                                        {/* Tagged Asset Rows */}
                                        <div className="space-y-4 py-3">
                                            {goal.taggedAssets.map((asset) => {
                                                const otherAllocated = asset.selectedAssetId
                                                    ? getTotalTaggedPercentageForAsset(asset.selectedAssetId, goal.id, asset.id)
                                                    : 0;
                                                const availablePct = Math.max(0, 100 - otherAllocated);

                                                return (
                                                    <div
                                                        key={asset.id}
                                                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-2 items-end border-b border-gray-100 sm:border-0 pb-3 sm:pb-0"
                                                    >
                                                        <div>
                                                            <label className="block mb-2 text-sm font-medium text-[#44475B]">
                                                                Select Asset
                                                            </label>
                                                            <select
                                                                value={asset.selectedAssetId}
                                                                onChange={(e) => updateAssetSelection(goal.id, asset.id, e.target.value)}
                                                                className="h-[48px] w-full rounded-[10px] border border-[#E8E8E8] bg-white px-4 text-sm text-[#44475B] outline-none transition focus:border-[#04B488]"
                                                            >
                                                                <option value="">Select Asset</option>
                                                                {existingAssets
                                                                    .filter((ea) => {
                                                                        return !goal.taggedAssets.some(
                                                                            (ta) => ta.id !== asset.id && ta.selectedAssetId === ea.id
                                                                        );
                                                                    })
                                                                    .map((ea) => {
                                                                        const allocatedInOthers = getTotalTaggedPercentageForAsset(ea.id, goal.id, asset.id);
                                                                        const remaining = Math.max(0, 100 - allocatedInOthers);
                                                                        const isFullyTagged = remaining <= 0 && asset.selectedAssetId !== ea.id;
                                                                        return (
                                                                            <option key={ea.id} value={ea.id} disabled={isFullyTagged}>
                                                                                {ea.label} {remaining < 100 ? `(${remaining}% available)` : ""}
                                                                            </option>
                                                                        );
                                                                    })}
                                                            </select>
                                                        </div>

                                                        <div>
                                                            <div className="flex justify-between items-center mb-2">
                                                                <label className="block text-[13px] font-medium text-[#44475b]">
                                                                    Tagged %
                                                                </label>
                                                                {asset.selectedAssetId && (
                                                                    <span className="text-[11px] text-gray-500 font-medium">
                                                                        Max: {availablePct}%
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <input
                                                                type="text"
                                                                inputMode="numeric"
                                                                value={asset.taggedPercentage || ""}
                                                                onKeyDown={(e) => {
                                                                    if (e.ctrlKey || e.metaKey || e.altKey) return;
                                                                    if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
                                                                    if (e.key.length === 1 && !/^\d$/.test(e.key)) e.preventDefault();
                                                                }}
                                                                onChange={(e) => updateAssetPercentage(goal.id, asset.id, e.target.value)}
                                                                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                                placeholder={`Max ${availablePct}%`}
                                                            />
                                                        </div>

                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <p className="text-[18px] text-[#06A358] font-bold">
                                                                    ₹{asset.taggedCV > 0 ? asset.taggedCV.toLocaleString("en-IN") : "0"}
                                                                </p>
                                                            </div>
                                                            {goal.taggedAssets.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeTaggedAssetFromGoal(goal.id, asset.id)}
                                                                    className="cursor-pointer h-10 w-10 rounded-full bg-[#DB4437] text-white flex items-center justify-center shrink-0 ml-2"
                                                                    title="Remove Asset"
                                                                >
                                                                    <Trash2 size={18} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Add Another Asset Button for this Goal */}
                                        <div className="mt-3">
                                            <button
                                                type="button"
                                                onClick={() => addTaggedAssetToGoal(goal.id)}
                                                className="w-full h-12 rounded-xl bg-gradient-to-r from-[#06A358] to-[#001EFE] text-white shadow-sm flex items-center justify-center gap-2 font-medium cursor-pointer hover:opacity-95 transition"
                                            >
                                                <Plus size={18} />
                                                Add Another Asset
                                            </button>
                                        </div>
                                    </div>

                                    {/* Post-Retirement Only: Additional Assets, Allocation Grid & Modify Option */}
                                    {isPostRetirement && (
                                        <div className="space-y-8 mt-8">
                                            {/* Additional Asset Section */}
                                            <div className="space-y-4">
                                                <div className="flex gap-4 items-center justify-between">
                                                    <h2 className="block font-medium text-[19px] text-[#44475B]">
                                                        Additional Asset
                                                    </h2>
                                                    {goal.additionalAssets.length > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => removeAdditionalAssetFromGoal(goal.id, goal.additionalAssets[0]?.id)}
                                                            className="cursor-pointer h-10 w-10 rounded-full bg-[#DB4437] text-white flex items-center justify-center shadow-sm hover:bg-[#c33d31] transition shrink-0"
                                                            title="Delete Additional Asset"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    )}
                                                </div>

                                                <div className="space-y-4 py-2">
                                                    {goal.additionalAssets.map((aa) => (
                                                        <div key={aa.id} className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                                                            <input
                                                                type="text"
                                                                value={aa.name}
                                                                onChange={(e) => updateAdditionalAssetField(goal.id, aa.id, "name", e.target.value)}
                                                                className="w-full h-[46px] sm:h-[48px] bg-white border border-[#e9e9e9] rounded-[10px] px-4 text-[14px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                                placeholder="Asset Name"
                                                            />
                                                            <div className="flex items-center gap-3">
                                                                <input
                                                                    type="text"
                                                                    value={aa.amount}
                                                                    onChange={(e) => updateAdditionalAssetField(goal.id, aa.id, "amount", formatCurrencyInput(e.target.value))}
                                                                    className="w-full h-[46px] sm:h-[48px] bg-white border border-[#e9e9e9] rounded-[10px] px-4 text-[14px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                                    placeholder="₹ Amount"
                                                                />
                                                                {goal.additionalAssets.length > 1 && (
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => removeAdditionalAssetFromGoal(goal.id, aa.id)}
                                                                        className="cursor-pointer h-10 w-10 rounded-full bg-[#DB4437] text-white flex items-center justify-center shrink-0"
                                                                        title="Remove"
                                                                    >
                                                                        <Trash2 size={18} />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() => addAdditionalAssetToGoal(goal.id)}
                                                    className="w-full h-12 rounded-xl bg-gradient-to-r from-[#06A358] to-[#001EFE] text-white shadow-sm flex items-center justify-center gap-2 font-medium cursor-pointer hover:opacity-95 transition"
                                                >
                                                    <Plus size={18} />
                                                    Add Additional Asset
                                                </button>
                                            </div>

                                            <div className="w-full h-px bg-[#e9e9e9] my-6" />

                                            {/* Allocation Option Cards (Grid) */}
                                            <div className="space-y-6">
                                                {activeOptions.map((opt) => {
                                                    const isSelected = (goal.selectedAllocationOptionId || "option_2") === opt.id;

                                                    return (
                                                        <div
                                                            key={opt.id}
                                                            onClick={() => handleSelectOption(goal.id, opt.id)}
                                                            role="radio"
                                                            aria-checked={isSelected}
                                                            className={`space-y-3 cursor-pointer p-4 sm:p-5 rounded-[22px] transition-all duration-200 border-2 select-none ${isSelected
                                                                ? "border-[#06A358] bg-[#F9FCFA] shadow-[0_4px_20px_rgba(6,163,88,0.12)] ring-1 ring-[#06A358]"
                                                                : "border-[#ECECEC] bg-white hover:border-[#06A358]/50 hover:shadow-sm"
                                                                }`}
                                                        >
                                                            {/* Radio selector and title */}
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-3">
                                                                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? "border-[#06A358] bg-[#06A358]" : "border-gray-400 bg-white"
                                                                        }`}>
                                                                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                                                                    </div>
                                                                    <span className={`text-[16px] transition-colors ${isSelected ? "font-bold text-[#024B39]" : "font-semibold text-[#44475B]"
                                                                        }`}>
                                                                        {opt.title}
                                                                    </span>
                                                                </div>
                                                                {isSelected && (
                                                                    <span className="text-[12px] font-semibold text-[#06A358] bg-[#EAF8F1] px-3 py-1 rounded-full border border-[#06A358]/30">
                                                                        Selected
                                                                    </span>
                                                                )}
                                                            </div>

                                                            {/* Table Card */}
                                                            <div className={`w-full bg-white border rounded-[16px] overflow-hidden transition-all ${isSelected ? "border-[#06A358]/40 shadow-xs" : "border-[#ECECEC]"
                                                                }`}>
                                                                <div className="overflow-x-auto">
                                                                    <table className="w-full text-left border-collapse min-w-[650px]">
                                                                        <thead>
                                                                            <tr className="bg-[#024B39] text-white text-[13px] sm:text-[14px]">
                                                                                <th className="py-3.5 px-4 font-semibold border-r border-[#035b46]/50">Asset Allocation</th>
                                                                                <th className="py-3.5 px-4 font-semibold text-center border-r border-[#035b46]/50">Allocation Range</th>
                                                                                <th className="py-3.5 px-4 font-semibold text-center border-r border-[#035b46]/50">Allocation Amount</th>
                                                                                <th className="py-3.5 px-4 font-semibold text-center border-r border-[#035b46]/50">Withdrawal Range (P.M.)</th>
                                                                                <th className="py-3.5 px-4 font-semibold text-right">Withdrawal Amount</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody className="text-[13px] sm:text-[14px] text-[#44475B]">
                                                                            {opt.rows.map((row, idx) => (
                                                                                <tr key={idx} className="border-b border-[#F0F0F0] hover:bg-gray-50/50 transition">
                                                                                    <td className="py-4 px-4 font-medium text-[#44475B]">{row.assetName}</td>
                                                                                    <td className="py-4 px-4 text-center">
                                                                                        <div className="inline-flex flex-col items-center">
                                                                                            <span className="bg-white border border-[#E0E0E0] rounded-[6px] px-3 py-1 text-[13px] font-medium text-[#44475B] shadow-2xs">
                                                                                                {row.allocationPct}
                                                                                            </span>
                                                                                            <span className="text-[11px] text-gray-400 mt-1">{row.allocationRange}</span>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className="py-4 px-4 text-center font-medium text-[#44475B]">{row.allocationAmount}</td>
                                                                                    <td className="py-4 px-4 text-center">
                                                                                        <div className="inline-flex flex-col items-center">
                                                                                            <span className="bg-white border border-[#E0E0E0] rounded-[6px] px-3 py-1 text-[13px] font-medium text-[#44475B] shadow-2xs">
                                                                                                {row.withdrawalPct}
                                                                                            </span>
                                                                                            <span className="text-[11px] text-gray-400 mt-1">{row.withdrawalRange}</span>
                                                                                        </div>
                                                                                    </td>
                                                                                    <td className="py-4 px-4 text-right font-medium text-[#44475B]">{row.withdrawalAmount}</td>
                                                                                </tr>
                                                                            ))}
                                                                            {/* Total Footer Row */}
                                                                            <tr className="bg-[#FAFDFB] font-bold text-[14px] text-[#44475B]">
                                                                                <td className="py-4 px-4">Total</td>
                                                                                <td className="py-4 px-4 text-center">{opt.totalAllocation}</td>
                                                                                <td className="py-4 px-4 text-center">{opt.totalAllocationAmount}</td>
                                                                                <td className="py-4 px-4 text-center"></td>
                                                                                <td className="py-4 px-4 text-right text-[#06A358]">{opt.totalWithdrawalAmount}</td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Modify Risk Profile Guidance Banner (when collapsed) */}
                                            {!showRiskProfileAssessment && (
                                                <div className="border border-dashed border-gray-300 rounded-[20px] p-6 text-center space-y-3 bg-[#FAFAFA]">
                                                    <p className="text-[14px] text-[#44475B] leading-relaxed">
                                                        Suggested asset allocations are based on you risk profile.
                                                        <br />
                                                        If you want to get other asset allocations, pls modify your risk profile.
                                                    </p>
                                                    <div className="pt-1">
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowRiskProfileAssessment(true)}
                                                            className="inline-flex items-center justify-center gap-2 bg-[#06A358] hover:bg-[#058b4b] text-white px-6 py-2.5 rounded-lg text-[14px] font-medium cursor-pointer shadow-sm transition"
                                                        >
                                                            <Edit3 size={16} />
                                                            Modify
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Risk Profile Assessment Section (Opened when user selects an option or clicks Modify) */}
                                            {showRiskProfileAssessment && (
                                                <div className="space-y-6 sm:space-y-8 mt-8">
                                                    {/* Questions Card matching KnowYourRiskProfile.tsx */}
                                                    <div className="w-full min-w-0 bg-white border border-[#e0dbdb] rounded-[18px] sm:rounded-[24px] lg:rounded-[33px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-4 sm:p-6 md:p-8 lg:p-10">
                                                        {renderRiskQuestion("I Seek Above Average Returns From My Investments", q1, (val) => handleQuestionChange(1, val))}
                                                        {renderRiskQuestion("I'm Patient With My Investments & Can Bear Short Term Volatility in My Portfolio", q2, (val) => handleQuestionChange(2, val))}
                                                        {renderRiskQuestion("I Have a Regular & Stable Income Resource", q3, (val) => handleQuestionChange(3, val))}
                                                        {renderRiskQuestion("My Outstanding Debt/Loan is Low or That Has Been  Provisioned For", q4, (val) => handleQuestionChange(4, val))}
                                                    </div>

                                                    {/* Congratulations Result Card matching KnowYourRiskProfile.tsx */}
                                                    {currentRiskProfile && (
                                                        <div className="py-4 w-full min-w-0 bg-white border border-[#e0dbdb] rounded-[18px] sm:rounded-[24px] lg:rounded-[33px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-4 sm:p-6 md:p-8 lg:p-10">
                                                            <h3 className="font-bold text-[19px] sm:text-[22px] md:text-[25px] lg:text-[30px] text-center flex justify-center gap-2 items-center">
                                                                <span><img className="w-[90px] h-[70px]" src="/financialplanning/congratulation.png" alt="congratulation" /></span>
                                                                <span className="bg-gradient-to-r from-[#06a358] to-[#001EFE] bg-clip-text text-transparent"> Congratulations!</span>
                                                            </h3>
                                                            <p className="font-semibold text-[14px] sm:text-[16px] lg:text-[18px] text-[#44475b] text-center"> You have successfully completed your risk profile assessment. </p>
                                                            <div className="m-auto sm:w-90 lg:w-100 flex justify-center">
                                                                {currentRiskProfile === "Moderate" && (
                                                                    <img className="md:w-100 lg:w-[100%] mt-5 pt-5 max-w-[400px]" src="/financialplanning/moderate.png" alt="Moderate" />
                                                                )}
                                                                {currentRiskProfile === "Conservative" && (
                                                                    <img className="md:w-100 lg:w-[100%] mt-5 pt-5 max-w-[400px]" src="/financialplanning/conservative.png" alt="Conservative" />
                                                                )}
                                                                {currentRiskProfile === "Aggressive" && (
                                                                    <img className="md:w-100 lg:w-[100%] mt-5 pt-5 max-w-[400px]" src="/financialplanning/aggressive.png" alt="Aggressive" />
                                                                )}
                                                            </div>
                                                            <div className="text-center mt-6">
                                                                <span className="text-[20px] lg:text-[30px] text-[#44475B] whitespace-nowrap text-center">
                                                                    Your risk profile is <span className={
                                                                        currentRiskProfile === "Moderate" ? "text-[#FFAF19]" :
                                                                            currentRiskProfile === "Conservative" ? "text-[#95DF3D]" :
                                                                                "text-[#FF3333]"
                                                                    }>{currentRiskProfile}</span>
                                                                </span>
                                                            </div>

                                                            <p className="text-[#44475B] text-center pt-5 md:w-100 m-auto leading-tight">
                                                                {currentRiskProfile === "Moderate" ? "You seek a balance between stability and growth. Your portfolio captures market opportunities while maintaining a reasonable safety net." :
                                                                    currentRiskProfile === "Conservative" ? "You prioritize the safety of your capital over high returns. Your focus is on stability and steady, low-risk investments." :
                                                                        "You are willing to accept significant short-term volatility in pursuit of higher long-term returns. You seek maximum capital appreciation."}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Non-Post-Retirement Only: Summary Projection Cards */}
                                    {!isPostRetirement && (
                                        <div className="mt-8">
                                            <div className="w-full bg-white border border-[#e9e9e9] rounded-[14px] p-6 shadow-sm">
                                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                    {/* Card 1: Future Value */}
                                                    <div className="bg-[#E6F0FB] border border-[#e2e3ea] rounded-[12px] p-5 flex items-center min-h-[96px]">
                                                        <div className="flex items-center gap-3 w-full">
                                                            <div className="w-[50px] h-[50px] shrink-0 rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] flex items-center justify-center overflow-hidden p-2">
                                                                <img className="w-[24px] h-[24px] max-w-[24px] max-h-[24px] object-contain shrink-0" src="/financialplanning/g1.png" alt="Future Value" />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-[#44475B] text-[13px] font-medium leading-snug">
                                                                    Future Value (@6% Inf.)
                                                                </p>
                                                                <h5 className="font-bold text-[18px] text-[#000000] mt-0.5">
                                                                    ₹{fin.goalFutureValue.toLocaleString("en-IN")}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Card 2: CV of Tagged Asset */}
                                                    <div className="bg-[#E6F0FB] border border-[#e2e3ea] rounded-[12px] p-5 flex items-center min-h-[96px]">
                                                        <div className="flex items-center gap-3 w-full">
                                                            <div className="w-[50px] h-[50px] shrink-0 rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] flex items-center justify-center overflow-hidden p-2">
                                                                <img className="w-[24px] h-[24px] max-w-[24px] max-h-[24px] object-contain shrink-0" src="/financialplanning/g2.png" alt="CV of Tagged Asset" />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-[#44475B] text-[13px] font-medium leading-snug">
                                                                    CV of Tagged Asset
                                                                </p>
                                                                <h5 className="font-bold text-[18px] text-[#000000] mt-0.5">
                                                                    ₹{fin.totalTaggedCV.toLocaleString("en-IN")}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Card 3: FV of Tagged Asset */}
                                                    <div className="bg-[#E6F0FB] border border-[#e2e3ea] rounded-[12px] p-5 flex items-center min-h-[96px]">
                                                        <div className="flex items-center gap-3 w-full">
                                                            <div className="w-[50px] h-[50px] shrink-0 rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] flex items-center justify-center overflow-hidden p-2">
                                                                <img className="w-[24px] h-[24px] max-w-[24px] max-h-[24px] object-contain shrink-0" src="/financialplanning/g3.png" alt="FV of Tagged Asset" />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-[#44475B] text-[13px] font-medium leading-snug">
                                                                    FV of Tagged Asset
                                                                </p>
                                                                <h5 className="font-bold text-[18px] text-[#000000] mt-0.5">
                                                                    ₹{fin.totalTaggedFV.toLocaleString("en-IN")}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Card 4: Shortfall / Excess */}
                                                    <div className="bg-[#E6F0FB] border border-[#e2e3ea] rounded-[12px] p-5 flex items-center min-h-[96px]">
                                                        <div className="flex items-center gap-3 w-full">
                                                            <div className="w-[50px] h-[50px] shrink-0 rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] flex items-center justify-center overflow-hidden p-2">
                                                                <img className="w-[24px] h-[24px] max-w-[24px] max-h-[24px] object-contain shrink-0" src="/financialplanning/f3.png" alt="Shortfall / Excess" />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-[#44475B] text-[13px] font-medium leading-snug">
                                                                    Shortfall / Excess
                                                                </p>
                                                                <h5 className="font-bold text-[18px] text-[#FF0000] mt-0.5">
                                                                    ₹{Math.abs(fin.shortfallOrExcess).toLocaleString("en-IN")}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Card 5: SIP Required */}
                                                    <div className="bg-[#E6F0FB] border border-[#e2e3ea] rounded-[12px] p-5 flex items-center min-h-[96px]">
                                                        <div className="flex items-center gap-3 w-full">
                                                            <div className="w-[50px] h-[50px] shrink-0 rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] flex items-center justify-center overflow-hidden p-2">
                                                                <img className="w-[24px] h-[24px] max-w-[24px] max-h-[24px] object-contain shrink-0" src="/financialplanning/g4.png" alt="SIP Required" />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-[#44475B] text-[13px] font-medium leading-snug">
                                                                    SIP Required
                                                                    <br />
                                                                    (@{fin.cagrPercentage}% CAGR)
                                                                </p>
                                                                <h5 className="font-bold text-[18px] text-[#FF0000] mt-0.5">
                                                                    ₹{fin.sipRequired.toLocaleString("en-IN")}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Card 6: Lumpsum Required */}
                                                    <div className="bg-[#E6F0FB] border border-[#e2e3ea] rounded-[12px] p-5 flex items-center min-h-[96px]">
                                                        <div className="flex items-center gap-3 w-full">
                                                            <div className="w-[50px] h-[50px] shrink-0 rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] flex items-center justify-center overflow-hidden p-2">
                                                                <img className="w-[24px] h-[24px] max-w-[24px] max-h-[24px] object-contain shrink-0" src="/financialplanning/g5.png" alt="Lumpsum Required" />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-[#44475B] text-[13px] font-medium leading-snug">
                                                                    Lumpsum Required
                                                                    <br />
                                                                    (@{fin.cagrPercentage}% CAGR)
                                                                </p>
                                                                <h5 className="font-bold text-[18px] text-[#FF0000] mt-0.5">
                                                                    ₹{fin.lumpsumRequired.toLocaleString("en-IN")}
                                                                </h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add Goal Button */}
            <div className="mt-8 mb-4">
                <button
                    type="button"
                    onClick={addGoal}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-[#06A358] to-[#001EFE] text-white shadow-sm flex items-center justify-center gap-2 font-medium cursor-pointer hover:opacity-95 transition"
                >
                    <Plus size={18} />
                    Add Goal
                </button>
            </div>

            {/* Step Navigation Actions */}
            <StepActions
                showBack={showBack}
                onBack={onBack}
                onContinue={handleContinue}
                continueLabel="Continue"
                isSubmitting={isSubmitting}
            />

            {/* Pre-Retirement Assumption Alert Popup Modal */}
            {alertPopup && alertPopup.isOpen && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        zIndex: 999999,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "16px",
                        backgroundColor: "rgba(15, 23, 42, 0.45)",
                        backdropFilter: "blur(4px)",
                        WebkitBackdropFilter: "blur(4px)",
                    }}
                    onClick={() => setAlertPopup(null)}
                >
                    <div
                        style={{
                            backgroundColor: "#ffffff",
                            borderRadius: "32px",
                            boxShadow: "0 25px 60px rgba(0, 0, 0, 0.22)",
                            maxWidth: "540px",
                            width: "100%",
                            paddingTop: "40px",
                            paddingBottom: "44px",
                            paddingLeft: "36px",
                            paddingRight: "36px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            textAlign: "center",
                            position: "relative",
                            boxSizing: "border-box",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Warning Icon */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" }}>
                            <svg width="60" height="52" viewBox="0 0 64 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M28.47 4.56c1.55-2.75 5.51-2.75 7.06 0l25.8 45.74c1.52 2.7-0.42 6.07-3.53 6.07H6.2c-3.11 0-5.05-3.37-3.53-6.07L28.47 4.56z"
                                    fill="url(#alert_icon_grad_v2)"
                                />
                                <defs>
                                    <linearGradient id="alert_icon_grad_v2" x1="32" y1="0" x2="32" y2="56" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#FCCF5A" />
                                        <stop offset="1" stopColor="#FEA85B" />
                                    </linearGradient>
                                </defs>
                                <path d="M32 20v13" stroke="#232323" strokeWidth="4.2" strokeLinecap="round" />
                                <circle cx="32" cy="40.5" r="2.6" fill="#232323" />
                            </svg>
                        </div>

                        {/* Title */}
                        <h3
                            style={{
                                fontSize: "28px",
                                fontWeight: 700,
                                color: "#94191e",
                                letterSpacing: "-0.01em",
                                margin: "0 0 16px 0",
                                lineHeight: "1.2",
                            }}
                        >
                            {alertPopup.title || "Alert"}
                        </h3>

                        {/* Message Body */}
                        <div
                            style={{
                                color: "#2c3a5b",
                                fontSize: "16px",
                                lineHeight: "1.65",
                                fontWeight: 400,
                                margin: "0 0 32px 0",
                                maxWidth: "440px",
                            }}
                        >
                            {alertPopup.message}
                        </div>

                        {/* Action Button */}
                        <button
                            type="button"
                            onClick={() => setAlertPopup(null)}
                            style={{
                                width: "305px",
                                maxWidth: "100%",
                                height: "52px",
                                backgroundColor: "#d32f2f",
                                backgroundImage: "linear-gradient(180deg, #de3838 0%, #c82828 100%)",
                                color: "#ffffff",
                                fontSize: "16px",
                                fontWeight: 700,
                                borderRadius: "16px",
                                border: "none",
                                boxShadow: "0 8px 20px rgba(216, 40, 40, 0.35)",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                outline: "none",
                            }}
                        >
                            Acknowledge &amp; Continue
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
