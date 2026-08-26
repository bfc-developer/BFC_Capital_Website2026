"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { Plus, Trash2 } from "lucide-react";
import StepActions from "./StepActions";

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

interface GoalItem {
    id: number;
    occupation: string;
    selectedGoal: string;
    goalName: string;
    tenure: string;
    currentCost: string;

    // Pre-Retirement Planning State (p2)
    currentAge: string;
    retirementAge: string;
    lifeExpectancy: string;
    inflationRate: string;
    expectedReturnPreRetirement: string;
    postRetirementReturn: string;
    currentMonthlyExpenses: string;
    isPensionable: "Yes" | "No" | "";
    pensionAmount: string;

    // Multiple tagged assets for this goal
    taggedAssets: TaggedAssetItem[];
}

interface GoalIdentificationStepProps {
    profileId?: string | null;
    financialPlanningId?: string | null;
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

export default function GoalIdentificationStep({
    profileId,
    financialPlanningId,
    onNext,
    onBack,
    showBack = false,
}: GoalIdentificationStepProps) {
    const [existingAssets, setExistingAssets] = useState<ExistingAssetItem[]>(DEFAULT_FALLBACK_ASSETS);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // List of goals, each with its own multiple tagged assets
    const [goals, setGoals] = useState<GoalItem[]>([
        {
            id: Date.now(),
            occupation: "p1",
            selectedGoal: "",
            goalName: "",
            tenure: "",
            currentCost: "",
            currentAge: "30",
            retirementAge: "60",
            lifeExpectancy: "80",
            inflationRate: "6",
            expectedReturnPreRetirement: "12",
            postRetirementReturn: "7",
            currentMonthlyExpenses: "",
            isPensionable: "",
            pensionAmount: "",
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

    // 1. Fetch Existing Investments from MongoDB Existing_Investments collection
    useEffect(() => {
        const fetchInvestments = async () => {
            try {
                let assetsFound: any[] = [];

                // Attempt 1: Fetch by profileId if provided
                if (profileId) {
                    try {
                        const res = await fetch(`http://localhost:5000/api/existing-investments/profile/${profileId}`);
                        if (res.ok) {
                            const resData = await res.json();
                            if (resData.success && resData.data && Array.isArray(resData.data.assets) && resData.data.assets.length > 0) {
                                assetsFound = resData.data.assets;
                            }
                        }
                    } catch (e) {
                        console.warn("Could not fetch profile-specific investments, trying general collection:", e);
                    }
                }

                // Attempt 2: If no assets found yet, fetch from MongoDB Existing_Investments collection (/api/existing-investments)
                if (assetsFound.length === 0) {
                    try {
                        const allRes = await fetch(`http://localhost:5000/api/existing-investments`);
                        if (allRes.ok) {
                            const allData = await allRes.json();
                            if (allData.success && Array.isArray(allData.data) && allData.data.length > 0) {
                                for (const record of allData.data) {
                                    if (Array.isArray(record.assets) && record.assets.length > 0) {
                                        assetsFound = record.assets;
                                        break;
                                    }
                                }
                            }
                        }
                    } catch (e) {
                        console.warn("Could not fetch general existing investments:", e);
                    }
                }

                // Parse and map assets from MongoDB
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
                            name = `Real Estate: ${asset.reType || "Property"} - ${asset.reCity || asset.reLocality || ""}`;
                            cv = Number(asset.reCurrentValue) || Number(asset.reAmount) || 0;
                            ret = Number(asset.reExpectedReturn) || 8;
                        } else if (cls === "Gold") {
                            name = `Gold: ${asset.goldForm || "Physical"} (${asset.goldQuantity || 0}g)`;
                            cv = Number(asset.goldCurrentValue) || Number(asset.goldPurchaseValue) || 0;
                            ret = Number(asset.goldExpectedReturn) || 10;
                        } else if (cls === "Silver") {
                            name = `Silver: ${asset.silverForm || "Physical"} (${asset.silverQuantity || 0}g)`;
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

    // 2. Prefill saved goal identification if previously stored
    useEffect(() => {
        if (!profileId) return;

        fetch(`http://localhost:5000/api/goal-identification/profile/${profileId}`)
            .then((res) => res.json())
            .then((resData) => {
                if (resData.success && resData.data && Array.isArray(resData.data.goals) && resData.data.goals.length > 0) {
                    const loadedGoals: GoalItem[] = resData.data.goals.map((g: any) => ({
                        id: Date.now() + Math.random(),
                        occupation: g.planningType || "p1",
                        selectedGoal: g.goalType || "",
                        goalName: g.goalName || "",
                        tenure: g.tenure !== undefined && g.tenure !== null ? String(g.tenure) : "",
                        currentCost: g.currentCost !== undefined && g.currentCost !== null ? String(g.currentCost) : "",
                        currentAge: g.currentAge ? String(g.currentAge) : "30",
                        retirementAge: g.retirementAge ? String(g.retirementAge) : "60",
                        lifeExpectancy: g.lifeExpectancy ? String(g.lifeExpectancy) : "80",
                        inflationRate: g.inflationRate ? String(g.inflationRate) : "6",
                        expectedReturnPreRetirement: g.expectedReturnPreRetirement ? String(g.expectedReturnPreRetirement) : "12",
                        postRetirementReturn: g.postRetirementReturn ? String(g.postRetirementReturn) : "7",
                        currentMonthlyExpenses: g.currentMonthlyExpenses ? String(g.currentMonthlyExpenses) : "",
                        isPensionable: g.isPensionable || "",
                        pensionAmount: g.pensionAmount ? String(g.pensionAmount) : "",
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
                    }));
                    setGoals(loadedGoals);
                }
            })
            .catch((err) => console.error("Error loading goal identification:", err));
    }, [profileId]);

    // Total Available Assets sum
    const totalAvailableAssets = existingAssets.reduce((sum, item) => sum + item.currentValue, 0);

    // Goal Handlers
    const addGoal = () => {
        setGoals((prev) => [
            ...prev,
            {
                id: Date.now(),
                occupation: "p1",
                selectedGoal: "",
                goalName: "",
                tenure: "",
                currentCost: "",
                currentAge: "30",
                retirementAge: "60",
                lifeExpectancy: "80",
                inflationRate: "6",
                expectedReturnPreRetirement: "12",
                postRetirementReturn: "7",
                currentMonthlyExpenses: "",
                isPensionable: "",
                pensionAmount: "",
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
                    // Recalculate tagged asset FVs if tenure changed
                    if (field === "tenure" || field === "currentAge" || field === "retirementAge" || field === "occupation") {
                        const tenureYears = updated.occupation === "p2"
                            ? Math.max(0, (Number(updated.retirementAge) || 60) - (Number(updated.currentAge) || 30))
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

    // Tagged Assets Handlers for a specific Goal
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
                    const tenureYears = g.occupation === "p2"
                        ? Math.max(0, (Number(g.retirementAge) || 60) - (Number(g.currentAge) || 30))
                        : Number(g.tenure) || 0;

                    return {
                        ...g,
                        taggedAssets: g.taggedAssets.map((item) => {
                            if (item.id === assetItemId) {
                                if (!matching) {
                                    return {
                                        ...item,
                                        selectedAssetId: "",
                                        taggedCV: 0,
                                        taggedFV: 0,
                                        expectedReturn: 0,
                                    };
                                }
                                const pct = Number(item.taggedPercentage) || 0;
                                const cv = (matching.currentValue * pct) / 100;
                                const fv = cv * Math.pow(1 + matching.expectedReturn / 100, tenureYears);
                                return {
                                    ...item,
                                    selectedAssetId: matching.id,
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
        const numVal = Math.min(100, Math.max(0, Number(pctValue) || 0));

        setGoals((prev) =>
            prev.map((g) => {
                if (g.id === goalId) {
                    const tenureYears = g.occupation === "p2"
                        ? Math.max(0, (Number(g.retirementAge) || 60) - (Number(g.currentAge) || 30))
                        : Number(g.tenure) || 0;

                    return {
                        ...g,
                        taggedAssets: g.taggedAssets.map((item) => {
                            if (item.id === assetItemId) {
                                const matching = existingAssets.find((a) => a.id === item.selectedAssetId);
                                const baseCV = matching ? matching.currentValue : 0;
                                const ret = matching ? matching.expectedReturn : item.expectedReturn;
                                const cv = (baseCV * numVal) / 100;
                                const fv = cv * Math.pow(1 + ret / 100, tenureYears);
                                return {
                                    ...item,
                                    taggedPercentage: pctValue,
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

    // Calculate Financial Summary for a Goal
    const calculateGoalFinancials = (goal: GoalItem) => {
        const tenureYears = goal.occupation === "p2"
            ? Math.max(0, (Number(goal.retirementAge) || 60) - (Number(goal.currentAge) || 30))
            : Number(goal.tenure) || 0;

        const curAgeNum = Number(goal.currentAge) || 30;
        const retAgeNum = Number(goal.retirementAge) || 60;
        const lifeExpNum = Number(goal.lifeExpectancy) || 80;
        const timeToRetirement = Math.max(0, retAgeNum - curAgeNum);
        const lifeExpectancyPostRetirement = Math.max(0, lifeExpNum - retAgeNum);
        const infRateNum = (Number(goal.inflationRate) || 6) / 100;
        const postRetReturnNum = (Number(goal.postRetirementReturn) || 7) / 100;
        const monthlyExpNum = Number(goal.currentMonthlyExpenses) || 0;

        const futureMonthlyExpenses = Math.round(monthlyExpNum * Math.pow(1 + infRateNum, timeToRetirement));
        const pensionAmountNum = goal.isPensionable === "Yes" ? Number(goal.pensionAmount) || 0 : 0;
        const netFutureMonthlyExpenses = Math.max(0, futureMonthlyExpenses - pensionAmountNum);

        const realPostReturn = (postRetReturnNum - infRateNum) / (1 + infRateNum);
        let corpusRequired = 0;
        if (realPostReturn === 0) {
            corpusRequired = Math.round(netFutureMonthlyExpenses * 12 * lifeExpectancyPostRetirement);
        } else {
            corpusRequired = Math.round((netFutureMonthlyExpenses * 12) * ((1 - Math.pow(1 + realPostReturn, -lifeExpectancyPostRetirement)) / realPostReturn));
        }

        let goalFutureValue = 0;
        if (goal.occupation === "p2") {
            goalFutureValue = corpusRequired;
        } else {
            const costNum = Number(goal.currentCost) || 0;
            const inf = 0.06;
            goalFutureValue = Math.round(costNum * Math.pow(1 + inf, tenureYears));
        }

        // Sum of all tagged assets for this goal
        const totalTaggedCV = Math.round(goal.taggedAssets.reduce((sum, a) => sum + a.taggedCV, 0));
        const totalTaggedFV = Math.round(goal.taggedAssets.reduce((sum, a) => sum + a.taggedFV, 0));

        const shortfallOrExcess = goalFutureValue - totalTaggedFV;
        const shortfall = Math.max(0, shortfallOrExcess);

        // SIP Required (@18% CAGR)
        let sipRequired = 0;
        const cagr = 0.18;
        const monthlyR = cagr / 12;
        const totalMonths = tenureYears * 12;
        if (shortfall > 0 && totalMonths > 0) {
            sipRequired = Math.round((shortfall * monthlyR) / ((Math.pow(1 + monthlyR, totalMonths) - 1) * (1 + monthlyR)));
        }

        // Lumpsum Required (@18% CAGR)
        let lumpsumRequired = 0;
        if (shortfall > 0 && tenureYears > 0) {
            lumpsumRequired = Math.round(shortfall / Math.pow(1 + cagr, tenureYears));
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

                return {
                    goalType: goal.selectedGoal,
                    goalName: goal.goalName,
                    tenure: fin.tenureYears,
                    currentCost: Number(goal.currentCost) || 0,
                    planningType: goal.occupation,
                    currentAge: Number(goal.currentAge) || null,
                    retirementAge: Number(goal.retirementAge) || null,
                    lifeExpectancy: Number(goal.lifeExpectancy) || null,
                    inflationRate: Number(goal.inflationRate) || 6,
                    expectedReturnPreRetirement: Number(goal.expectedReturnPreRetirement) || 12,
                    postRetirementReturn: Number(goal.postRetirementReturn) || 7,
                    currentMonthlyExpenses: Number(goal.currentMonthlyExpenses) || null,
                    isPensionable: goal.isPensionable,
                    pensionAmount: Number(goal.pensionAmount) || null,
                    timeToRetirement: fin.timeToRetirement,
                    lifeExpectancyPostRetirement: fin.lifeExpectancyPostRetirement,
                    futureMonthlyExpenses: fin.futureMonthlyExpenses,
                    corpusRequired: fin.goalFutureValue,
                    taggedAssets: formattedTaggedAssets,
                    futureValue: fin.goalFutureValue,
                    cvTaggedAsset: fin.totalTaggedCV,
                    fvTaggedAsset: fin.totalTaggedFV,
                    shortfallOrExcess: fin.shortfallOrExcess,
                    sipRequired: fin.sipRequired,
                    lumpsumRequired: fin.lumpsumRequired,
                };
            });

            if (profileId) {
                const payload = {
                    personalProfileId: profileId,
                    goals: formattedGoals,
                };

                await fetch("http://localhost:5000/api/goal-identification", {
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
                            Available Assets: Rs. {totalAvailableAssets > 0 ? totalAvailableAssets.toLocaleString("en-IN") : "30,00,000"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-[#e9e9e9] mt-5 sm:mt-5 mb-5 sm:mb-6" />

            {/* List of Goals */}
            <div className="space-y-8">
                {goals.map((goal) => {
                    const fin = calculateGoalFinancials(goal);

                    return (
                        <div key={goal.id} className="space-y-5">
                            <div className="flex gap-4 items-end">
                                <div className="flex-1">
                                    {/* Top Occupation / Mode Selector */}
                                    <div className="flex gap-4 items-end justify-between mb-3">
                                        <select
                                            value={goal.occupation}
                                            onChange={(e) => updateGoalField(goal.id, "occupation", e.target.value)}
                                            className="h-[48px] rounded-[10px] border border-[#E8E8E8] bg-white px-4 text-sm text-[#44475B] outline-none transition focus:border-[#04B488]"
                                        >
                                            <option value="" disabled>Select</option>
                                            <option value="p1">P1</option>
                                            <option value="p2">P2</option>
                                            <option value="p3">P3</option>
                                            <option value="p4">P4</option>
                                            <option value="p5">P5</option>
                                        </select>
                                        {goals.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeGoal(goal.id)}
                                                className="cursor-pointer h-10 w-10 rounded-full bg-[#DB4437] text-white flex items-center justify-center"
                                                title="Remove Goal"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </div>

                                    <>
                                        {/* Goal Inputs */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-5">
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
                                                    <option value="Education">Education</option>
                                                    <option value="Marriage">Marriage</option>
                                                    <option value="Retirement">Retirement</option>
                                                    <option value="Home Purchase">Home Purchase</option>
                                                    <option value="Vehicle">Vehicle</option>
                                                    <option value="Others">Others</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                    Goal Name
                                                </label>
                                                <input
                                                    value={goal.goalName}
                                                    onChange={(e) => updateGoalField(goal.id, "goalName", e.target.value)}
                                                    className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                    type="text"
                                                    placeholder="e.g. House or Education"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                    Tenure (Yrs)
                                                </label>
                                                <input
                                                    value={goal.occupation === "p2" ? String(fin.timeToRetirement) : goal.tenure}
                                                    disabled={goal.occupation === "p2"}
                                                    onChange={(e) => updateGoalField(goal.id, "tenure", e.target.value.replace(/\D/g, ""))}
                                                    className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                    type="text"
                                                    placeholder="Enter Years"
                                                />
                                            </div>
                                        </div>

                                        {/* Mode specific section */}
                                        <div className="">
                                            {goal.occupation === "p1" && (
                                                <div className="pb-5">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                                                        <div>
                                                            <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                                Current Cost
                                                            </label>
                                                            <input
                                                                value={goal.currentCost}
                                                                onChange={(e) => updateGoalField(goal.id, "currentCost", e.target.value.replace(/\D/g, ""))}
                                                                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                                type="text"
                                                                placeholder="₹ Amount"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {goal.occupation === "p2" && (
                                                <div className="pb-5">
                                                    <div className="w-full bg-[#FAFAFA] border border-[#e9e9e9] rounded-[10px] p-6">
                                                        <div className="flex justify-content-start items-center gap-3 mb-4">
                                                            <div>
                                                                <img className="w-[30px] h-[30px] object-contain" src="/financialplanning/umb.png" alt="rupee" />
                                                            </div>
                                                            <h3 className="col-span-8 font-bold text-[15px] sm:text-[16px] md:text-[18px] lg:text-[20px] bg-gradient-to-r from-[#06a358] to-[#001EFE] bg-clip-text text-transparent pb-3">
                                                                Pre-Retirement Planning
                                                            </h3>
                                                        </div>

                                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-5">
                                                            <div>
                                                                <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                                    Current Age
                                                                </label>
                                                                <input
                                                                    value={goal.currentAge}
                                                                    onChange={(e) => updateGoalField(goal.id, "currentAge", e.target.value.replace(/\D/g, ""))}
                                                                    className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                                    type="text"
                                                                    placeholder="₹ Amount"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                                    Retirement Age
                                                                </label>
                                                                <input
                                                                    value={goal.retirementAge}
                                                                    onChange={(e) => updateGoalField(goal.id, "retirementAge", e.target.value.replace(/\D/g, ""))}
                                                                    className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                                    type="text"
                                                                    placeholder="₹ Amount"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                                    Life Expectancy
                                                                </label>
                                                                <input
                                                                    value={goal.lifeExpectancy}
                                                                    onChange={(e) => updateGoalField(goal.id, "lifeExpectancy", e.target.value.replace(/\D/g, ""))}
                                                                    className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                                    type="text"
                                                                    placeholder="₹ Amount"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                                    Inflation rate (%)
                                                                </label>
                                                                <input
                                                                    value={goal.inflationRate}
                                                                    onChange={(e) => updateGoalField(goal.id, "inflationRate", e.target.value)}
                                                                    className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                                    type="text"
                                                                    placeholder="₹ Amount"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                                    Expected Return Pre - Retirment (%)
                                                                </label>
                                                                <input
                                                                    value={goal.expectedReturnPreRetirement}
                                                                    onChange={(e) => updateGoalField(goal.id, "expectedReturnPreRetirement", e.target.value)}
                                                                    className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                                    type="text"
                                                                    placeholder="₹ Amount"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                                    Post - Retirement Return (%)
                                                                </label>
                                                                <input
                                                                    value={goal.postRetirementReturn}
                                                                    onChange={(e) => updateGoalField(goal.id, "postRetirementReturn", e.target.value)}
                                                                    className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                                    type="text"
                                                                    placeholder="₹ Amount"
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                                    Current Monthly Expenses
                                                                </label>
                                                                <input
                                                                    value={goal.currentMonthlyExpenses}
                                                                    onChange={(e) => updateGoalField(goal.id, "currentMonthlyExpenses", e.target.value.replace(/\D/g, ""))}
                                                                    className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                                    type="text"
                                                                    placeholder="₹ Amount"
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="space-y-3 py-5">
                                                            <label className="block text-[18px] font-medium text-gray-800">
                                                                Is Your Service Pensionable? <span className="text-red-500">*</span>
                                                            </label>
                                                            <div role="radiogroup" aria-label="Contingency Plan" className="grid grid-cols-2 gap-4">
                                                                <button
                                                                    type="button"
                                                                    role="radio"
                                                                    onClick={() => updateGoalField(goal.id, "isPensionable", "Yes")}
                                                                    className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                                                                        goal.isPensionable === "Yes"
                                                                            ? "bg-[#EBFFEC] border-[#04B488]"
                                                                            : "bg-white border-gray-200 text-gray-700 hover:bg-[#EBFFEC]"
                                                                    }`}
                                                                >
                                                                    <span className="text-white flex gap-1 items-center">
                                                                        <span className="text-gray-700 ">Yes</span>
                                                                        <img className="w-[15px] h-[15px]" src="/financialplanning/done.png" alt="done" />
                                                                    </span>
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    role="radio"
                                                                    onClick={() => updateGoalField(goal.id, "isPensionable", "No")}
                                                                    className={`flex items-center cursor-pointer justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                                                                        goal.isPensionable === "No"
                                                                            ? "bg-[#FFF2F2] border-[#DB4437]"
                                                                            : "bg-white border-gray-200 text-gray-700 hover:bg-[#FFF2F2]"
                                                                    }`}
                                                                >
                                                                    <span className="text-white flex gap-1 items-center">
                                                                        <span className="text-gray-700 ">No</span>
                                                                        <img className="w-[15px] h-[15px]" src="/financialplanning/close.png" alt="done" />
                                                                    </span>
                                                                </button>
                                                                {goal.isPensionable === "Yes" && (
                                                                    <div>
                                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                                                                            Monthly Pension Amount (Approx.)
                                                                        </label>
                                                                        <input
                                                                            value={goal.pensionAmount}
                                                                            onChange={(e) => updateGoalField(goal.id, "pensionAmount", e.target.value.replace(/\D/g, ""))}
                                                                            className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                                            type="text"
                                                                            placeholder="₹ 50,000"
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <section className="bg-[#FAFAFA] border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors p-4 mt-8">
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                                                            {/* Card 1 */}
                                                            <div className="flex items-center gap-4 rounded-xl bg-[#FFF8E5] p-4">
                                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFBF08] text-white p-3">
                                                                    <img src="/financialplanning/r1.png" alt="rupee" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500">Time to Retirement</p>
                                                                    <h4 className="text-xl font-bold text-[#F4A300]">{fin.timeToRetirement} Years</h4>
                                                                </div>
                                                            </div>

                                                            {/* Card 2 */}
                                                            <div className="flex items-center gap-4 rounded-xl bg-[#E4F8EB] p-4">
                                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#50E680] to-[#048A42] text-white p-3">
                                                                    <img src="/financialplanning/f1.png" alt="rupee" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500">Life Expectancy Post Retirement</p>
                                                                    <h4 className="text-xl font-bold text-[#04B488]">{fin.lifeExpectancyPostRetirement} Years</h4>
                                                                </div>
                                                            </div>

                                                            {/* Card 3 */}
                                                            <div className="flex items-center gap-4 rounded-xl border border-[#E8E8E8] bg-[#F4EEFF] p-4">
                                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7C4DFF] text-white p-3">
                                                                    <img src="/financialplanning/r2.png" alt="rupee" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500">Future Monthly Expenses</p>
                                                                    <h4 className="text-xl font-bold text-[#7C4DFF]">₹{fin.futureMonthlyExpenses.toLocaleString("en-IN")}</h4>
                                                                </div>
                                                            </div>

                                                            {/* Card 4 */}
                                                            <div className="flex items-center gap-4 rounded-xl bg-[#D4FEFF] p-4">
                                                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#077E82] text-white p-3">
                                                                    <img src="/financialplanning/r3.png" alt="rupee" />
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-500">Corpus Required</p>
                                                                    <h4 className="text-xl font-bold text-[#077E82]">₹{fin.corpusRequired.toLocaleString("en-IN")}</h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </div>
                                            )}
                                        </div>

                                        <div className="w-full h-px bg-[#e9e9e9] mt-5 mb-4 sm:mb-4" />
                                    </>

                                    {/* Tag Existing Assets Section (Allows multiple assets per goal) */}
                                    <div className="flex-1">
                                        <div className="flex gap-4 items-end justify-between">
                                            <h2 className="block text-sm font-medium text-[19px] text-[#44475B]">
                                                Tag Existing Assets
                                            </h2>
                                        </div>

                                        {/* Tagged Asset Rows */}
                                        <div className="space-y-4 py-3">
                                            {goal.taggedAssets.map((asset) => (
                                                <div
                                                    key={asset.id}
                                                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 py-2 items-end border-b border-gray-100 sm:border-0 pb-3 sm:pb-0"
                                                >
                                                    <div className="">
                                                        <label className="block mb-2 text-sm font-medium text-[#44475B]">
                                                            Select Asset
                                                        </label>
                                                        <select
                                                            value={asset.selectedAssetId}
                                                            onChange={(e) => updateAssetSelection(goal.id, asset.id, e.target.value)}
                                                            className="h-[48px] w-full rounded-[10px] border border-[#E8E8E8] bg-white px-4 text-sm text-[#44475B] outline-none transition focus:border-[#04B488]"
                                                        >
                                                            <option value="">Select</option>
                                                            {existingAssets
                                                                .filter((ea) => {
                                                                    // Do not allow selecting an asset that is already selected in another row under this goal
                                                                    return !goal.taggedAssets.some(
                                                                        (ta) => ta.id !== asset.id && ta.selectedAssetId === ea.id
                                                                    );
                                                                })
                                                                .map((ea) => (
                                                                    <option key={ea.id} value={ea.id}>
                                                                        {ea.label}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                    </div>

                                                    <div>
                                                        <label className="block text-[13px] font-medium text-[#44475b] mb-2">

                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={asset.taggedPercentage}
                                                            onChange={(e) => updateAssetPercentage(goal.id, asset.id, e.target.value.replace(/\D/g, ""))}
                                                            className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                                                            placeholder="%"
                                                        />
                                                    </div>

                                                    <div className="flex items-center justify-between">
                                                        <p className="text-[18px] text-[#06A358] font-bold">%{asset.taggedPercentage || "0"}</p>
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
                                            ))}
                                        </div>

                                        {/* Add Another Asset Button for this Goal */}
                                        <div className="mt-3 rounded-xl border border-[#EAEAEA] p-3">
                                            <button
                                                type="button"
                                                onClick={() => addTaggedAssetToGoal(goal.id)}
                                                className="w-full h-12 rounded-xl border border-[#E5E5E5] bg-white shadow-sm flex items-center justify-center gap-2 text-[#666] font-medium cursor-pointer hover:bg-gradient-to-r from-[#06A358] to-[#001EFE] hover:text-white transition"
                                            >
                                                <Plus size={18} />
                                                Add Another Asset
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Summary Projection Cards for this Goal */}
                            <div>
                                <div className="border-t border-gray-100 pt-6 space-y-5">
                                    <div className="w-full bg-white border border-[#e9e9e9] rounded-[10px] p-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                            <div className="col-md-4 bg-[#E6F0FB] border border-[#e2e3ea] rounded-[8px] p-[20px]">
                                                <div className="flex justify-content-center items-center gap-3">
                                                    <div className="rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] p-3">
                                                        <img className="w-[30px] h-[30px] object-contain" src="/financialplanning/g1.png" alt="rupee" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[#000] text-[13px]">
                                                            Future Value (@6% Inf.)
                                                        </p>
                                                        <h5 className="font-medium text-[#000]">₹{fin.goalFutureValue.toLocaleString("en-IN")}</h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 bg-[#E6F0FB] border border-[#e2e3ea] rounded-[8px] p-[20px]">
                                                <div className="flex justify-content-center items-center gap-3">
                                                    <div className="rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] p-3">
                                                        <img className="w-[30px] h-[30px]" src="/financialplanning/g2.png" alt="rupee" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[#000] text-[13px]">
                                                            CV of Tagged Asset
                                                        </p>
                                                        <h5 className="font-bold text-[#000]">
                                                            ₹{fin.totalTaggedCV.toLocaleString("en-IN")}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 bg-[#E6F0FB] border border-[#e2e3ea] rounded-[8px] p-[20px]">
                                                <div className="flex justify-content-center items-center gap-3">
                                                    <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] p-3">
                                                        <img src="/financialplanning/g3.png" alt="rupee" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[#000] text-[13px]">
                                                            FV of Tagged Asset
                                                        </p>
                                                        <h5 className="font-bold text-[#FF0000]">
                                                            ₹{fin.totalTaggedFV.toLocaleString("en-IN")}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 bg-[#E6F0FB] border border-[#e2e3ea] rounded-[8px] p-[20px]">
                                                <div className="flex justify-content-center items-center gap-3">
                                                    <div className="w-[50px] h-[50px] rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] p-3">
                                                        <img src="/financialplanning/f3.png" alt="rupee" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[#000] text-[13px]">
                                                            Shortfall / Excess
                                                        </p>
                                                        <h5 className="font-bold text-[#FF0000]">
                                                            ₹{Math.abs(fin.shortfallOrExcess).toLocaleString("en-IN")}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 bg-[#E6F0FB] border border-[#e2e3ea] rounded-[8px] p-[20px]">
                                                <div className="flex justify-content-center items-center gap-3">
                                                    <div className="rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] p-3">
                                                        <img className="w-[30px] h-[28px] p-1" src="/financialplanning/g4.png" alt="rupee" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[#000] text-[13px]">
                                                            SIP Required
                                                            (@18% CAGR)
                                                        </p>
                                                        <h5 className="font-bold text-[#FF0000]">
                                                            ₹{fin.sipRequired.toLocaleString("en-IN")}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4 bg-[#E6F0FB] border border-[#e2e3ea] rounded-[8px] p-[20px]">
                                                <div className="flex justify-content-center items-center gap-3">
                                                    <div className="rounded-full bg-gradient-to-r from-[#06A358] to-[#035DAF] p-3">
                                                        <img className="w-[30px] h-[25px]" src="/financialplanning/g5.png" alt="rupee" />
                                                    </div>
                                                    <div>
                                                        <p className="text-[#000] text-[13px]">
                                                            Lumpsum Required
                                                            (@18% CAGR)
                                                        </p>
                                                        <h5 className="font-bold text-[#FF0000]">
                                                            ₹{fin.lumpsumRequired.toLocaleString("en-IN")}
                                                        </h5>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Add Goal Button */}
            <div className="my-6 rounded-xl border border-[#EAEAEA] p-5">
                <button
                    type="button"
                    onClick={addGoal}
                    className="w-[90%] m-auto h-12 rounded-xl border border-[#E5E5E5] bg-white shadow-sm flex items-center justify-center gap-2 text-[#666] font-medium cursor-pointer hover:bg-gradient-to-r from-[#06A358] to-[#001EFE] hover:text-white transition"
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
        </div>
    );
}
