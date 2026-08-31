import { useState, useEffect, useCallback, type ReactNode } from "react";
import { Trash2, Plus } from "lucide-react";
import StepActions from "./StepActions";
import { formatIndianAmount, parseIndianAmount } from "./formatters";

const sanitizeAlphaNumeric = (value: string) => {
  return value.replace(/[^a-zA-Z0-9\s]/g, "").replace(/^[^a-zA-Z]+/, "");
};

interface Item {
  id: number;
  title: string;
  amount: string;
}

interface EMIItem {
  id: number;
  loanType: string;
  outstanding: string;
  emi: string;
  roi: string;
}

interface InsuranceItem {
  id: number;
  policyName: string;
  policyNumber: string;
  insuranceType: string;
  premiumType: string;
  premium: string;
  sumInsured: string;
}

interface TaxSavingItem {
  id: number;
  date: string;
  investmentName: string;
  amount: string;
}

interface FinancialProfileStepProps {
  profileId?: string | null;
  financialProfileId?: string | null;
  setFinancialProfileId?: (id: string | null) => void;
  initialData?: any;
  professionalData?: {
    occupation: string;
    pvtOrGovt: string;
    organisationName: string;
    designation: string;
    workProfile: string;
    businessType: string;
    professionName: string;
    lastOrganisation: string;
    address: string;
    city: string;
    remarks: string;
  };
  onNext?: () => void;
  onBack?: () => void;
  showBack?: boolean;
}

export default function FinancialProfileStep({
  profileId,
  financialProfileId,
  setFinancialProfileId,
  initialData,
  professionalData,
  onNext,
  onBack,
  showBack,
}: FinancialProfileStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [income, setIncome] = useState<Item[]>([
    {
      id: Date.now(),
      title: "",
      amount: "",
    },
  ]);

  const [deductions, setDeductions] = useState<Item[]>([]);
  const [Investments, setInvestments] = useState<Item[]>([]);
  const [expenses, setExpenses] = useState<Item[]>([]);
  const [emis, setEmis] = useState<EMIItem[]>([]);
  const [insurepre, setEnsurepre] = useState<InsuranceItem[]>([]);
  const [othertax, setOthertax] = useState<TaxSavingItem[]>([]);

  const populateData = useCallback((profile: any) => {
    if (!profile) return;

    // Gross Inflow
    const rawInflow = profile.grossInflow || profile.inflow;
    if (Array.isArray(rawInflow) && rawInflow.length > 0) {
      const mapped = rawInflow
        .filter((item: any) => item && (item.sourceOfInflow || item.title || item.source || item.monthlyAmount || item.amount))
        .map((item: any, idx: number) => ({
          id: item._id || item.id || idx + 1,
          title: item.sourceOfInflow || item.title || item.source || item.name || "",
          amount: (item.monthlyAmount !== null && item.monthlyAmount !== undefined && item.monthlyAmount !== "")
            ? formatIndianAmount(item.monthlyAmount)
            : ((item.amount !== null && item.amount !== undefined && item.amount !== "")
              ? formatIndianAmount(item.amount)
              : ""),
        }));
      if (mapped.length > 0) {
        setIncome(mapped);
      }
    }

    // Deductions
    const rawDeductions = profile.monthlyDeductions || profile.deductions;
    if (Array.isArray(rawDeductions) && rawDeductions.length > 0) {
      const mapped = rawDeductions
        .filter((item: any) => item && (item.deductionDetail || item.title || item.detail || item.amount))
        .map((item: any, idx: number) => ({
          id: item._id || item.id || idx + 1,
          title: item.deductionDetail || item.title || item.detail || item.name || "",
          amount: (item.amount !== null && item.amount !== undefined && item.amount !== "")
            ? formatIndianAmount(item.amount)
            : ((item.monthlyAmount !== null && item.monthlyAmount !== undefined && item.monthlyAmount !== "")
              ? formatIndianAmount(item.monthlyAmount)
              : ""),
        }));
      if (mapped.length > 0) {
        setDeductions(mapped);
      }
    }

    // Expenses
    const rawExpenses = profile.monthlyExpenses || profile.expenses;
    if (Array.isArray(rawExpenses) && rawExpenses.length > 0) {
      const mapped = rawExpenses
        .filter((item: any) => item && (item.expenseDetail || item.title || item.detail || item.amount))
        .map((item: any, idx: number) => ({
          id: item._id || item.id || idx + 1,
          title: item.expenseDetail || item.title || item.detail || item.name || "",
          amount: (item.amount !== null && item.amount !== undefined && item.amount !== "")
            ? formatIndianAmount(item.amount)
            : ((item.monthlyAmount !== null && item.monthlyAmount !== undefined && item.monthlyAmount !== "")
              ? formatIndianAmount(item.monthlyAmount)
              : ""),
        }));
      if (mapped.length > 0) {
        setExpenses(mapped);
      }
    }

    // Investments
    const rawInvestments = profile.monthlyInvestments || profile.investments;
    if (Array.isArray(rawInvestments) && rawInvestments.length > 0) {
      const mapped = rawInvestments
        .filter((item: any) => item && (item.investmentName || item.title || item.monthlyAmount || item.amount))
        .map((item: any, idx: number) => ({
          id: item._id || item.id || idx + 1,
          title: item.investmentName || item.title || item.name || "",
          amount: (item.monthlyAmount !== null && item.monthlyAmount !== undefined && item.monthlyAmount !== "")
            ? formatIndianAmount(item.monthlyAmount)
            : ((item.amount !== null && item.amount !== undefined && item.amount !== "")
              ? formatIndianAmount(item.amount)
              : ""),
        }));
      if (mapped.length > 0) {
        setInvestments(mapped);
      }
    }

    // EMI
    const rawEmi = profile.emi || profile.emis;
    if (Array.isArray(rawEmi) && rawEmi.length > 0) {
      const mapped = rawEmi
        .filter((item: any) => item && (item.loanType || item.monthlyEmi || item.emi))
        .map((item: any, idx: number) => ({
          id: item._id || item.id || idx + 1,
          loanType: item.loanType || "",
          outstanding: item.outstandingLoanAmt !== null && item.outstandingLoanAmt !== undefined
            ? formatIndianAmount(item.outstandingLoanAmt)
            : (item.outstanding ? formatIndianAmount(item.outstanding) : ""),
          emi: item.monthlyEmi !== null && item.monthlyEmi !== undefined
            ? formatIndianAmount(item.monthlyEmi)
            : (item.emi ? formatIndianAmount(item.emi) : ""),
          roi: item.roi !== null && item.roi !== undefined ? String(item.roi) : "",
        }));
      if (mapped.length > 0) {
        setEmis(mapped);
      }
    }

    // Insurance
    const rawInsurance = profile.insurancePremium || profile.insurance;
    if (Array.isArray(rawInsurance) && rawInsurance.length > 0) {
      const mapped = rawInsurance
        .filter((item: any) => item && (item.policyName || item.premium || item.sumInsured))
        .map((item: any, idx: number) => ({
          id: item._id || item.id || idx + 1,
          policyName: item.policyName || "Policy",
          policyNumber: item.policyNumber || "",
          insuranceType: item.insuranceType || "",
          premiumType: item.premiumType || "Annual",
          premium: item.premium !== null && item.premium !== undefined ? formatIndianAmount(item.premium) : "",
          sumInsured: item.sumInsured !== null && item.sumInsured !== undefined ? formatIndianAmount(item.sumInsured) : "",
        }));
      if (mapped.length > 0) {
        setEnsurepre(mapped);
      }
    }

    // Tax Saving
    const rawTax = profile.taxSavingInvestments || profile.taxSavings;
    if (Array.isArray(rawTax) && rawTax.length > 0) {
      const mapped = rawTax
        .filter((item: any) => item && (item.investmentName || item.amount))
        .map((item: any, idx: number) => ({
          id: item._id || item.id || idx + 1,
          date: item.date ? item.date.split("T")[0] : "",
          investmentName: item.investmentName || "",
          amount: item.amount !== null && item.amount !== undefined ? formatIndianAmount(item.amount) : "",
        }));
      if (mapped.length > 0) {
        setOthertax(mapped);
      }
    }
  }, []);

  useEffect(() => {
    if (initialData) {
      populateData(initialData);
    }
  }, [initialData, populateData]);

  useEffect(() => {
    if (!profileId && !financialProfileId) return;

    let active = true;

    const fetchJson = async (path: string) => {
      const urls: string[] = [];
      if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
        urls.push(`http://localhost:5000${path}`);
      }
      urls.push(`https://k2b02x8c-5000.inc1.devtunnels.ms${path}`);

      for (const url of urls) {
        try {
          const res = await fetch(url, {
            headers: {
              "Content-Type": "application/json",
              "X-Tunnel-Skip-Anti-Abuse-Page": "true",
            },
          });
          if (res.ok) {
            const data = await res.json();
            return data;
          }
        } catch {
          // try next
        }
      }
      return null;
    };

    const fetchFinancialData = async () => {
      // 1. Try fetching directly by profileId
      if (profileId) {
        try {
          const resData = await fetchJson(`/api/financial/profile/${profileId}`);
          if (active && resData && resData.success && resData.data) {
            populateData(resData.data);
            if (setFinancialProfileId && resData.data._id) {
              setFinancialProfileId(resData.data._id);
            }
            return;
          }
        } catch (e) {
          console.warn("Could not fetch by profileId, trying fallback:", e);
        }
      }

      // 2. Try fetching by financialProfileId if profileId route didn't return
      if (financialProfileId) {
        try {
          const resData = await fetchJson(`/api/financial/${financialProfileId}`);
          if (active && resData && resData.success && resData.data) {
            populateData(resData.data);
            return;
          }
        } catch (e) {
          console.warn("Could not fetch by financialProfileId, trying fallback:", e);
        }
      }

      // 3. Fallback: fetch all and find
      try {
        const resData = await fetchJson(`/api/financial`);
        if (active && resData && resData.success && Array.isArray(resData.data)) {
          const profile = resData.data.find(
            (p: any) =>
              (financialProfileId && String(p._id) === String(financialProfileId)) ||
              (profileId && String(p.personalProfileId?._id || p.personalProfileId) === String(profileId))
          );
          if (profile) {
            populateData(profile);
            if (setFinancialProfileId && profile._id) {
              setFinancialProfileId(profile._id);
            }
          }
        }
      } catch (err) {
        console.error("Error prefilling financial profile:", err);
      }
    };

    fetchFinancialData();

    return () => {
      active = false;
    };
  }, [profileId, financialProfileId, populateData, setFinancialProfileId]);

  const updateItem = (
    list: Item[],
    setList: React.Dispatch<React.SetStateAction<Item[]>>,
    id: number,
    field: keyof Item,
    value: string
  ) => {
    setList(
      list.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addItem = (
    setList: React.Dispatch<React.SetStateAction<Item[]>>
  ) => {
    setList((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "",
        amount: "",
      },
    ]);
  };

  const removeItem = (
    list: Item[],
    setList: React.Dispatch<React.SetStateAction<Item[]>>,
    id: number
  ) => {
    setList(list.filter((item) => item.id !== id));
  };

  const updateEMI = (
    id: number,
    field: keyof EMIItem,
    value: string
  ) => {
    setEmis((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const addEMI = () => {
    setEmis((prev) => [
      ...prev,
      {
        id: Date.now(),
        loanType: "",
        outstanding: "",
        emi: "",
        roi: "",
      },
    ]);
  };

  const removeEMI = (id: number) => {
    setEmis((prev) => prev.filter((item) => item.id !== id));
  };

  const updateinsurePremium = (
    id: number,
    field: keyof InsuranceItem,
    value: string
  ) => {
    setEnsurepre((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const insurePremium = () => {
    setEnsurepre((prev) => [
      ...prev,
      {
        id: Date.now(),
        policyName: "",
        policyNumber: "",
        insuranceType: "",
        premiumType: "Annual",
        premium: "",
        sumInsured: "",
      },
    ]);
  };

  const removeinsurePremium = (id: number) => {
    setEnsurepre((prev) => prev.filter((item) => item.id !== id));
  };

  const updateOthertax = (
    id: number,
    field: keyof TaxSavingItem,
    value: string
  ) => {
    setOthertax((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const othertaxsave = () => {
    setOthertax((prev) => [
      ...prev,
      {
        id: Date.now(),
        date: "",
        investmentName: "",
        amount: "",
      },
    ]);
  };

  const removeotherTax = (id: number) => {
    setOthertax((prev) => prev.filter((item) => item.id !== id));
  };

  const handleContinue = async () => {
    if (!profileId) {
      alert("No Personal Profile ID found. Please go back and complete Step 1.");
      return;
    }

    const validationErrors: Record<string, string> = {};

    // 1. Gross Inflow validation
    if (!income[0] || !income[0].title.trim()) {
      validationErrors[`income_0_title`] = "Source of inflow is required.";
    } else if (!/^[a-zA-Z]/.test(income[0].title.trim())) {
      validationErrors[`income_0_title`] = "Source of inflow must start with an alphabet.";
    } else if (!/^[a-zA-Z][a-zA-Z0-9\s]*$/.test(income[0].title.trim())) {
      validationErrors[`income_0_title`] = "Source of inflow must contain only letters, numbers, and spaces.";
    }

    if (!income[0] || !income[0].amount.trim()) {
      validationErrors[`income_0_amount`] = "Monthly amount is required.";
    } else if (parseIndianAmount(income[0].amount) <= 0) {
      validationErrors[`income_0_amount`] = "Amount must be greater than zero.";
    }

    income.forEach((item, idx) => {
      if (idx > 0) {
        const hasTitle = item.title.trim();
        const hasAmount = item.amount.trim();
        if (hasTitle || hasAmount) {
          if (!hasTitle) {
            validationErrors[`income_${idx}_title`] = "Source of inflow is required.";
          } else if (!/^[a-zA-Z]/.test(item.title.trim())) {
            validationErrors[`income_${idx}_title`] = "Source of inflow must start with an alphabet.";
          } else if (!/^[a-zA-Z][a-zA-Z0-9\s]*$/.test(item.title.trim())) {
            validationErrors[`income_${idx}_title`] = "Source of inflow must contain only letters, numbers, and spaces.";
          }

          if (!hasAmount) {
            validationErrors[`income_${idx}_amount`] = "Monthly amount is required.";
          } else if (parseIndianAmount(item.amount) <= 0) {
            validationErrors[`income_${idx}_amount`] = "Amount must be greater than zero.";
          }
        }
      }
    });

    // 2. Deductions validation
    deductions.forEach((item, idx) => {
      if (!item.title.trim()) {
        validationErrors[`deduction_${idx}_title`] = "Deduction detail is required.";
      } else if (!/^[a-zA-Z]/.test(item.title.trim())) {
        validationErrors[`deduction_${idx}_title`] = "Deduction detail must start with an alphabet.";
      } else if (!/^[a-zA-Z][a-zA-Z0-9\s]*$/.test(item.title.trim())) {
        validationErrors[`deduction_${idx}_title`] = "Deduction detail must contain only letters, numbers, and spaces.";
      }

      if (!item.amount.trim()) {
        validationErrors[`deduction_${idx}_amount`] = "Amount is required.";
      } else if (parseIndianAmount(item.amount) <= 0) {
        validationErrors[`deduction_${idx}_amount`] = "Amount must be greater than zero.";
      }
    });

    // 3. Expenses validation
    expenses.forEach((item, idx) => {
      if (!item.title.trim()) {
        validationErrors[`expense_${idx}_title`] = "Expense detail is required.";
      } else if (!/^[a-zA-Z]/.test(item.title.trim())) {
        validationErrors[`expense_${idx}_title`] = "Expense detail must start with an alphabet.";
      } else if (!/^[a-zA-Z][a-zA-Z0-9\s]*$/.test(item.title.trim())) {
        validationErrors[`expense_${idx}_title`] = "Expense detail must contain only letters, numbers, and spaces.";
      }

      if (!item.amount.trim()) {
        validationErrors[`expense_${idx}_amount`] = "Amount is required.";
      } else if (parseIndianAmount(item.amount) <= 0) {
        validationErrors[`expense_${idx}_amount`] = "Amount must be greater than zero.";
      }
    });

    // 4. EMI validation
    emis.forEach((item, idx) => {
      if (!item.loanType) {
        validationErrors[`emi_${idx}_loanType`] = "Loan type is required.";
      }

      if (item.outstanding.trim() && parseIndianAmount(item.outstanding) < 0) {
        validationErrors[`emi_${idx}_outstanding`] = "Outstanding amount must be valid.";
      }

      if (!item.emi.trim()) {
        validationErrors[`emi_${idx}_emi`] = "Monthly EMI is required.";
      } else if (parseIndianAmount(item.emi) <= 0) {
        validationErrors[`emi_${idx}_emi`] = "EMI must be greater than zero.";
      }

      if (item.roi.trim()) {
        if (isNaN(Number(item.roi))) {
          validationErrors[`emi_${idx}_roi`] = "ROI must be a valid number.";
        } else if (Number(item.roi) <= 0 || Number(item.roi) > 100) {
          validationErrors[`emi_${idx}_roi`] = "ROI must be between 0 and 100%.";
        }
      }
    });

    // 5. Investments validation
    Investments.forEach((item, idx) => {
      if (!item.title.trim()) {
        validationErrors[`investment_${idx}_title`] = "Investment name is required.";
      } else if (!/^[a-zA-Z]/.test(item.title.trim())) {
        validationErrors[`investment_${idx}_title`] = "Investment name must start with an alphabet.";
      } else if (!/^[a-zA-Z][a-zA-Z0-9\s]*$/.test(item.title.trim())) {
        validationErrors[`investment_${idx}_title`] = "Investment name must contain only letters, numbers, and spaces.";
      }

      if (!item.amount.trim()) {
        validationErrors[`investment_${idx}_amount`] = "Monthly amount is required.";
      } else if (parseIndianAmount(item.amount) <= 0) {
        validationErrors[`investment_${idx}_amount`] = "Amount must be greater than zero.";
      }
    });

    // 6. Insurance validation
    insurepre.forEach((item, idx) => {
      if (!item.policyName.trim()) {
        validationErrors[`insurance_${idx}_policyName`] = "Policy name is required.";
      } else if (!/^[a-zA-Z]/.test(item.policyName.trim())) {
        validationErrors[`insurance_${idx}_policyName`] = "Policy name must start with an alphabet.";
      } else if (!/^[a-zA-Z][a-zA-Z0-9\s]*$/.test(item.policyName.trim())) {
        validationErrors[`insurance_${idx}_policyName`] = "Policy name must contain only letters, numbers, and spaces.";
      }

      if (item.policyNumber.trim() && !/^\d+$/.test(item.policyNumber.trim())) {
        validationErrors[`insurance_${idx}_policyNumber`] = "Policy number must contain only numbers.";
      }

      if (!item.insuranceType) {
        validationErrors[`insurance_${idx}_insuranceType`] = "Insurance type is required.";
      }
      if (!item.premiumType) {
        validationErrors[`insurance_${idx}_premiumType`] = "Premium type is required.";
      }

      if (!item.premium.trim()) {
        validationErrors[`insurance_${idx}_premium`] = "Premium is required.";
      } else if (parseIndianAmount(item.premium) <= 0) {
        validationErrors[`insurance_${idx}_premium`] = "Premium must be greater than zero.";
      }

      if (!item.sumInsured.trim()) {
        validationErrors[`insurance_${idx}_sumInsured`] = "Sum insured is required.";
      } else if (parseIndianAmount(item.sumInsured) <= 0) {
        validationErrors[`insurance_${idx}_sumInsured`] = "Sum insured must be greater than zero.";
      }
    });

    // 7. Tax Saving validation
    othertax.forEach((item, idx) => {
      if (!item.date) {
        validationErrors[`tax_${idx}_date`] = "Date is required.";
      }
      if (!item.investmentName.trim()) {
        validationErrors[`tax_${idx}_investmentName`] = "Investment name is required.";
      } else if (!/^[a-zA-Z]/.test(item.investmentName.trim())) {
        validationErrors[`tax_${idx}_investmentName`] = "Investment name must start with an alphabet.";
      } else if (!/^[a-zA-Z][a-zA-Z0-9\s]*$/.test(item.investmentName.trim())) {
        validationErrors[`tax_${idx}_investmentName`] = "Investment name must contain only letters, numbers, and spaces.";
      }

      if (!item.amount.trim()) {
        validationErrors[`tax_${idx}_amount`] = "Amount is required.";
      } else if (parseIndianAmount(item.amount) <= 0) {
        validationErrors[`tax_${idx}_amount`] = "Amount must be greater than zero.";
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorKey = Object.keys(validationErrors)[0];
      const errorElement = document.getElementsByName(firstErrorKey)[0];
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        errorElement.focus();
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        personalProfileId: profileId,
        ...professionalData,
        occupation: (professionalData?.occupation === "Other" || professionalData?.occupation === "Others")
          ? "Others"
          : professionalData?.occupation,
        grossInflow: income.filter(i => i.title.trim()).map(i => ({ sourceOfInflow: i.title, monthlyAmount: parseIndianAmount(i.amount) })),
        monthlyDeductions: deductions.filter(i => i.title.trim()).map(i => ({ deductionDetail: i.title, amount: parseIndianAmount(i.amount) })),
        monthlyExpenses: expenses.filter(i => i.title.trim()).map(i => ({ expenseDetail: i.title, amount: parseIndianAmount(i.amount) })),
        emi: emis.filter(i => i.loanType).map(i => ({ loanType: i.loanType, outstandingLoanAmt: parseIndianAmount(i.outstanding) || null, monthlyEmi: parseIndianAmount(i.emi), roi: Number(i.roi) || null })),
        monthlyInvestments: Investments.filter(i => i.title.trim()).map(i => ({ investmentName: i.title, monthlyAmount: parseIndianAmount(i.amount) })),
        insurancePremium: insurepre.filter(i => i.policyName.trim()).map(i => ({ policyName: i.policyName, insuranceType: i.insuranceType, premiumType: i.premiumType, premium: parseIndianAmount(i.premium) || null, sumInsured: parseIndianAmount(i.sumInsured) })),
        taxSavingInvestments: othertax.filter(i => i.investmentName.trim()).map(i => ({ date: i.date ? new Date(i.date).toISOString() : new Date().toISOString(), investmentName: i.investmentName, amount: parseIndianAmount(i.amount) }))
      };

      const path = financialProfileId
        ? `/api/financial/${financialProfileId}`
        : `/api/financial`;
      const method = financialProfileId ? "PUT" : "POST";

      const urls: string[] = [];
      if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
        urls.push(`http://localhost:5000${path}`);
      }
      urls.push(`https://k2b02x8c-5000.inc1.devtunnels.ms${path}`);

      let response = null;
      let lastErrMsg = "Failed to submit financial profile details";

      for (const targetUrl of urls) {
        try {
          const res = await fetch(targetUrl, {
            method,
            headers: {
              "Content-Type": "application/json",
              "X-Tunnel-Skip-Anti-Abuse-Page": "true",
            },
            body: JSON.stringify(payload),
          });
          if (res.ok) {
            response = res;
            break;
          } else {
            const errBody = await res.json().catch(() => ({}));
            lastErrMsg = errBody.msg || errBody.message || lastErrMsg;
          }
        } catch {
          // try next
        }
      }

      if (!response) {
        throw new Error(lastErrMsg);
      }

      const resData = await response.json().catch(() => ({}));
      if (resData.data && resData.data._id && setFinancialProfileId) {
        setFinancialProfileId(resData.data._id);
      }

      if (onNext) onNext();
    } catch (err) {
      alert("Error saving details: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsSubmitting(false);
    }
  };

  const grossInflowSum = income.reduce((acc, item) => acc + parseIndianAmount(item.amount), 0);
  const deductionsSum = deductions.reduce((acc, item) => acc + parseIndianAmount(item.amount), 0);
  const netInflowSum = grossInflowSum - deductionsSum;
  const investmentsSum = Investments.reduce((acc, item) => acc + parseIndianAmount(item.amount), 0);
  const emisSum = emis.reduce((acc, item) => acc + parseIndianAmount(item.emi), 0);
  const insuranceSum = insurepre.reduce((acc, item) => acc + parseIndianAmount(item.premium), 0);
  const otherTaxSum = othertax.reduce((acc, item) => acc + parseIndianAmount(item.amount), 0);
  const expensesSum = expenses.reduce((acc, item) => acc + parseIndianAmount(item.amount), 0);

  const overallSurplus = netInflowSum - emisSum - insuranceSum - expensesSum - otherTaxSum - investmentsSum;

  return (
    <div className="w-full min-w-0 bg-white border border-[#e0dbdb] rounded-[18px] sm:rounded-[24px] lg:rounded-[33px] shadow-[1px_0px_6.8px_-1px_rgba(0,0,0,0.18)] p-4 sm:p-6 md:p-8 lg:p-10">

      <div className="flex items-center justify-between flex-wrap gap-2 border-bottom">
        <h1 className="font-bold text-[18px] sm:text-[22px] md:text-[26px] lg:text-[28px] bg-gradient-to-r from-[#06a358] to-[#035daf] bg-clip-text text-transparent">
          Financial Profile
        </h1>
      </div>
      <div className="w-full h-px bg-[#e9e9e9] mt-4 sm:mt-5 mb-5 sm:mb-6" />

      <Section
        title="Gross Inflow (Salary, Rental, etc)"
        buttonText="Add Source"
        buttonColor="gray"
        onAdd={() => addItem(setIncome)}
      >
        {income.map((item, idx) => (
          <Row
            key={item.id}
            titleLabel="Source of Inflow"
            titlePlaceholder="e.g. Salary or Rental"
            amountLabel="Monthly Amount"
            item={item}
            onTitle={(value) => {
              const filtered = sanitizeAlphaNumeric(value);
              updateItem(income, setIncome, item.id, "title", filtered);
              setErrors(prev => ({ ...prev, [`income_${idx}_title`]: "" }));
            }}
            onAmount={(value) => {
              const filtered = formatIndianAmount(value);
              updateItem(income, setIncome, item.id, "amount", filtered);
              setErrors(prev => ({ ...prev, [`income_${idx}_amount`]: "" }));
            }}
            onDelete={() => {
              removeItem(income, setIncome, item.id);
              setErrors(prev => {
                const copy = { ...prev };
                delete copy[`income_${idx}_title`];
                delete copy[`income_${idx}_amount`];
                return copy;
              });
            }}
            showDelete={income.length > 1}
            prefix={`income_${idx}`}
            errors={errors}
          />
        ))}
      </Section>

      <Section
        title="Monthly Deductions (Tax, PF, etc)"
        buttonText="Add Deduction"
        buttonColor="gray"
        onAdd={() => addItem(setDeductions)}
      >
        {deductions.map((item, idx) => (
          <Row
            key={item.id}
            titleLabel="Deduction Detail"
            titlePlaceholder="e.g. Provident Fund or Professional Tax"
            amountLabel="Amount"
            item={item}
            onTitle={(value) => {
              const filtered = sanitizeAlphaNumeric(value);
              updateItem(deductions, setDeductions, item.id, "title", filtered);
              setErrors(prev => ({ ...prev, [`deduction_${idx}_title`]: "" }));
            }}
            onAmount={(value) => {
              const filtered = formatIndianAmount(value);
              updateItem(deductions, setDeductions, item.id, "amount", filtered);
              setErrors(prev => ({ ...prev, [`deduction_${idx}_amount`]: "" }));
            }}
            onDelete={() => {
              removeItem(deductions, setDeductions, item.id);
              setErrors(prev => {
                const copy = { ...prev };
                delete copy[`deduction_${idx}_title`];
                delete copy[`deduction_${idx}_amount`];
                return copy;
              });
            }}
            showDelete={true}
            prefix={`deduction_${idx}`}
            errors={errors}
          />
        ))}
      </Section>

      <Section
        title="Monthly Expenses (Rent, Food, etc)"
        buttonText="Add Expense"
        buttonColor="gray"
        onAdd={() => addItem(setExpenses)}
      >
        {expenses.map((item, idx) => (
          <Row
            key={item.id}
            titleLabel="Expense Detail"
            titlePlaceholder="e.g. House Rent or Groceries"
            amountLabel="Amount"
            item={item}
            onTitle={(value) => {
              const filtered = sanitizeAlphaNumeric(value);
              updateItem(expenses, setExpenses, item.id, "title", filtered);
              setErrors(prev => ({ ...prev, [`expense_${idx}_title`]: "" }));
            }}
            onAmount={(value) => {
              const filtered = formatIndianAmount(value);
              updateItem(expenses, setExpenses, item.id, "amount", filtered);
              setErrors(prev => ({ ...prev, [`expense_${idx}_amount`]: "" }));
            }}
            onDelete={() => {
              removeItem(expenses, setExpenses, item.id);
              setErrors(prev => {
                const copy = { ...prev };
                delete copy[`expense_${idx}_title`];
                delete copy[`expense_${idx}_amount`];
                return copy;
              });
            }}
            showDelete={true}
            prefix={`expense_${idx}`}
            errors={errors}
          />
        ))}
      </Section>

      <Section
        title="EMI (If any)"
        buttonText="Add EMI"
        buttonColor="gray"
        onAdd={addEMI}
      >
        {emis.map((item, idx) => (
          <div
            key={item.id}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-12 gap-4 items-start"
          >
            {/* Loan Type */}
            <div className="lg:col-span-3">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Loan Type
                <span className="text-red-600"> *</span>
              </label>
              <select
                name={`emi_${idx}_loanType`}
                value={item.loanType}
                onChange={(e) => {
                  updateEMI(item.id, "loanType", e.target.value);
                  setErrors(prev => ({ ...prev, [`emi_${idx}_loanType`]: "" }));
                }}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors cursor-pointer ${errors[`emi_${idx}_loanType`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
              >
                <option value="">Select Loan Type</option>
                <option value="Home Loan">Home Loan</option>
                <option value="Car Loan">Car Loan</option>
                <option value="Personal Loan">Personal Loan</option>
                <option value="Education Loan">Education Loan</option>
              </select>
              {errors[`emi_${idx}_loanType`] && <p className="text-red-500 text-[11px] mt-1">{errors[`emi_${idx}_loanType`]}</p>}
            </div>

            {/* Outstanding Loan */}
            <div className="lg:col-span-3">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Outstanding Loan Amt
              </label>
              <input
                name={`emi_${idx}_outstanding`}
                value={item.outstanding}
                onChange={(e) => {
                  updateEMI(item.id, "outstanding", formatIndianAmount(e.target.value));
                  setErrors(prev => ({ ...prev, [`emi_${idx}_outstanding`]: "" }));
                }}
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={(e) => {
                  if (e.ctrlKey || e.metaKey || e.altKey) return;
                  if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
                  if (e.key.length === 1 && !/^\d$/.test(e.key)) e.preventDefault();
                }}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`emi_${idx}_outstanding`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                type="text"
                inputMode="numeric"
                placeholder="₹ Amount"
              />
              {errors[`emi_${idx}_outstanding`] && <p className="text-red-500 text-[11px] mt-1">{errors[`emi_${idx}_outstanding`]}</p>}
            </div>

            {/* EMI */}
            <div className="lg:col-span-3">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Monthly EMI
                <span className="text-red-600"> *</span>
              </label>
              <input
                name={`emi_${idx}_emi`}
                value={item.emi}
                onChange={(e) => {
                  updateEMI(item.id, "emi", formatIndianAmount(e.target.value));
                  setErrors(prev => ({ ...prev, [`emi_${idx}_emi`]: "" }));
                }}
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={(e) => {
                  if (e.ctrlKey || e.metaKey || e.altKey) return;
                  if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
                  if (e.key.length === 1 && !/^\d$/.test(e.key)) e.preventDefault();
                }}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`emi_${idx}_emi`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                type="text"
                inputMode="numeric"
                placeholder="₹ Required"
              />
              {errors[`emi_${idx}_emi`] && <p className="text-red-500 text-[11px] mt-1">{errors[`emi_${idx}_emi`]}</p>}
            </div>

            {/* ROI */}
            <div className="lg:col-span-2">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                ROI (%)
              </label>
              <input
                name={`emi_${idx}_roi`}
                value={item.roi}
                onChange={(e) => {
                  const val = e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
                  updateEMI(item.id, "roi", val);
                  setErrors(prev => ({ ...prev, [`emi_${idx}_roi`]: "" }));
                }}
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={(e) => {
                  if (e.ctrlKey || e.metaKey || e.altKey) return;
                  if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
                  if (e.key.length === 1 && !/^[0-9.]$/.test(e.key)) e.preventDefault();
                }}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`emi_${idx}_roi`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                type="text"
                inputMode="decimal"
                placeholder="ROI"
              />
              {errors[`emi_${idx}_roi`] && <p className="text-red-500 text-[11px] mt-1">{errors[`emi_${idx}_roi`]}</p>}
            </div>

            {/* Delete */}
            <div className="lg:col-span-1 flex lg:justify-center mt-7 lg:mt-7">
              <button
                type="button"
                onClick={() => {
                  removeEMI(item.id);
                  setErrors(prev => {
                    const copy = { ...prev };
                    delete copy[`emi_${idx}_loanType`];
                    delete copy[`emi_${idx}_outstanding`];
                    delete copy[`emi_${idx}_emi`];
                    delete copy[`emi_${idx}_roi`];
                    return copy;
                  });
                }}
                className="h-10 w-10 cursor-pointer rounded-full bg-[#DB4437] text-white flex items-center justify-center hover:bg-red-600 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </Section>

      <Section
        title="Monthly Investments (SIP, RD, etc)"
        buttonText="Add Investment"
        buttonColor="gray"
        onAdd={() => addItem(setInvestments)}
      >
        {Investments.map((item, idx) => (
          <Row
            key={item.id}
            titleLabel="Investment Name"
            titlePlaceholder="e.g. Mutual Fund or Fixed Deposit"
            amountLabel="Monthly Amount"
            item={item}
            onTitle={(value) => {
              const filtered = sanitizeAlphaNumeric(value);
              updateItem(Investments, setInvestments, item.id, "title", filtered);
              setErrors(prev => ({ ...prev, [`investment_${idx}_title`]: "" }));
            }}
            onAmount={(value) => {
              const filtered = formatIndianAmount(value);
              updateItem(Investments, setInvestments, item.id, "amount", filtered);
              setErrors(prev => ({ ...prev, [`investment_${idx}_amount`]: "" }));
            }}
            onDelete={() => {
              removeItem(Investments, setInvestments, item.id);
              setErrors(prev => {
                const copy = { ...prev };
                delete copy[`investment_${idx}_title`];
                delete copy[`investment_${idx}_amount`];
                return copy;
              });
            }}
            showDelete={true}
            prefix={`investment_${idx}`}
            errors={errors}
          />
        ))}
      </Section>

      <Section
        title="Insurance Premiums (If any)"
        buttonText="Add Insurance"
        buttonColor="gray"
        onAdd={insurePremium}
      >
        {insurepre.map((item, idx) => (
          <div
            key={item.id}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-4 items-start"
          >

            <div className="lg:col-span-2">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Name
                <span className="text-red-600"> *</span>
              </label>
              <input
                name={`insurance_${idx}_policyName`}
                value={item.policyName}
                onChange={(e) => {
                  updateinsurePremium(item.id, "policyName", sanitizeAlphaNumeric(e.target.value));
                  setErrors(prev => ({ ...prev, [`insurance_${idx}_policyName`]: "" }));
                }}
                onKeyDown={(e) => {
                  if (e.ctrlKey || e.metaKey || e.altKey) return;
                  if (e.key.length === 1 && !/^[a-zA-Z]$/.test(e.key) && (e.currentTarget.selectionStart === 0 || !e.currentTarget.value)) {
                    e.preventDefault();
                  } else if (e.key.length === 1 && !/^[a-zA-Z0-9\s]$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`insurance_${idx}_policyName`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                type="text"
                placeholder="e.g. Life Term Insurance"
              />
              {errors[`insurance_${idx}_policyName`] && <p className="text-red-500 text-[11px] mt-1">{errors[`insurance_${idx}_policyName`]}</p>}
            </div>

            <div className="lg:col-span-1">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Policy No.
              </label>
              <input
                name={`insurance_${idx}_policyNumber`}
                value={item.policyNumber}
                onChange={(e) => {
                  updateinsurePremium(item.id, "policyNumber", e.target.value.replace(/\D/g, ""));
                  setErrors(prev => ({ ...prev, [`insurance_${idx}_policyNumber`]: "" }));
                }}
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={(e) => {
                  if (e.ctrlKey || e.metaKey || e.altKey) return;
                  if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
                  if (e.key.length === 1 && !/^\d$/.test(e.key)) e.preventDefault();
                }}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`insurance_${idx}_policyNumber`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                type="text"
                inputMode="numeric"
                placeholder="Policy No."
              />
              {errors[`insurance_${idx}_policyNumber`] && <p className="text-red-500 text-[11px] mt-1">{errors[`insurance_${idx}_policyNumber`]}</p>}
            </div>

            <div className="lg:col-span-2">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Type
                <span className="text-red-600"> *</span>
              </label>
              <select
                name={`insurance_${idx}_insuranceType`}
                value={item.insuranceType}
                onChange={(e) => {
                  updateinsurePremium(item.id, "insuranceType", e.target.value);
                  setErrors(prev => ({ ...prev, [`insurance_${idx}_insuranceType`]: "" }));
                }}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors cursor-pointer ${errors[`insurance_${idx}_insuranceType`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
              >
                <option value="">Select Type</option>
                <option value="Life Insurance">Life Insurance</option>
                <option value="Health Insurance">Health Insurance</option>
                <option value="Motor Insurance">Motor Insurance</option>
                <option value="Other Insurance">Other Insurance</option>
              </select>
              {errors[`insurance_${idx}_insuranceType`] && <p className="text-red-500 text-[11px] mt-1">{errors[`insurance_${idx}_insuranceType`]}</p>}
            </div>

            <div className="lg:col-span-2">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Premium Type
                <span className="text-red-600"> *</span>
              </label>
              <select
                name={`insurance_${idx}_premiumType`}
                value={item.premiumType}
                onChange={(e) => {
                  updateinsurePremium(item.id, "premiumType", e.target.value);
                  setErrors(prev => ({ ...prev, [`insurance_${idx}_premiumType`]: "" }));
                }}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors cursor-pointer ${errors[`insurance_${idx}_premiumType`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
              >
                <option value="Annual">Annually</option>
                <option value="Monthly">Monthly</option>
              </select>
              {errors[`insurance_${idx}_premiumType`] && <p className="text-red-500 text-[11px] mt-1">{errors[`insurance_${idx}_premiumType`]}</p>}
            </div>

            <div className="lg:col-span-2">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Premium
                <span className="text-red-600"> *</span>
              </label>
              <input
                name={`insurance_${idx}_premium`}
                value={item.premium}
                onChange={(e) => {
                  updateinsurePremium(item.id, "premium", formatIndianAmount(e.target.value));
                  setErrors(prev => ({ ...prev, [`insurance_${idx}_premium`]: "" }));
                }}
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={(e) => {
                  if (e.ctrlKey || e.metaKey || e.altKey) return;
                  if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
                  if (e.key.length === 1 && !/^\d$/.test(e.key)) e.preventDefault();
                }}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`insurance_${idx}_premium`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                type="text"
                inputMode="numeric"
                placeholder="₹ Amount"
              />
              {errors[`insurance_${idx}_premium`] && <p className="text-red-500 text-[11px] mt-1">{errors[`insurance_${idx}_premium`]}</p>}
            </div>

            <div className="lg:col-span-2">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Sum Insured
                <span className="text-red-600"> *</span>
              </label>
              <input
                name={`insurance_${idx}_sumInsured`}
                value={item.sumInsured}
                onChange={(e) => {
                  updateinsurePremium(item.id, "sumInsured", formatIndianAmount(e.target.value));
                  setErrors(prev => ({ ...prev, [`insurance_${idx}_sumInsured`]: "" }));
                }}
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={(e) => {
                  if (e.ctrlKey || e.metaKey || e.altKey) return;
                  if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
                  if (e.key.length === 1 && !/^\d$/.test(e.key)) e.preventDefault();
                }}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`insurance_${idx}_sumInsured`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                type="text"
                inputMode="numeric"
                placeholder="₹"
              />
              {errors[`insurance_${idx}_sumInsured`] && <p className="text-red-500 text-[11px] mt-1">{errors[`insurance_${idx}_sumInsured`]}</p>}
            </div>

            <div className="lg:col-span-1 flex lg:justify-center mt-7 lg:mt-7">
              <button
                type="button"
                onClick={() => {
                  removeinsurePremium(item.id);
                  setErrors(prev => {
                    const copy = { ...prev };
                    delete copy[`insurance_${idx}_policyName`];
                    delete copy[`insurance_${idx}_policyNumber`];
                    delete copy[`insurance_${idx}_insuranceType`];
                    delete copy[`insurance_${idx}_premiumType`];
                    delete copy[`insurance_${idx}_premium`];
                    delete copy[`insurance_${idx}_sumInsured`];
                    return copy;
                  });
                }}
                className="h-10 w-10 cursor-pointer rounded-full bg-[#DB4437] text-white flex items-center justify-center hover:bg-red-600 transition"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </Section>


      <section className="bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors p-4 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="flex items-center gap-4 rounded-xl bg-[#FFF8E5] p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFBF08] text-white p-3">
              <img src="/financialplanning/r1.png" alt="rupee" />
            </div>

            <div>
              <p className="text-xs text-gray-500">Gross Inflow</p>
              <h4 className="text-xl font-bold text-[#F4A300]">₹{grossInflowSum.toLocaleString("en-IN")}</h4>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center gap-4 rounded-xl bg-[#E4F8EB] p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-[#50E680] to-[#048A42] text-white p-3">
              <img src="/financialplanning/f1.png" alt="rupee" />
            </div>

            <div>
              <p className="text-xs text-gray-500">Net Inflow</p>
              <h4 className="text-xl font-bold text-[#04B488]">₹{netInflowSum.toLocaleString("en-IN")}</h4>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-center gap-4 rounded-xl border border-[#E8E8E8] bg-[#F4EEFF] p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7C4DFF] text-white p-3">
              <img src="/financialplanning/r2.png" alt="rupee" />
            </div>

            <div>
              <p className="text-xs text-gray-500">Monthly Investment</p>
              <h4 className="text-xl font-bold text-[#7C4DFF]">₹{investmentsSum.toLocaleString("en-IN")}</h4>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex items-center gap-4 rounded-xl bg-[#BEDEFF] p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1E88E5] text-white p-3">
              <img src="/financialplanning/r3.png" alt="rupee" />
            </div>

            <div>
              <p className="text-xs text-gray-500">Overall Surplus</p>
              <h4 className={`text-xl font-bold ${overallSurplus < 0 ? 'text-red-600' : 'text-[#1E88E5]'}`}>
                {overallSurplus < 0 ? "-" : ""}₹{Math.abs(overallSurplus).toLocaleString("en-IN")}
              </h4>
            </div>
          </div>
        </div>
        <hr className="mt-5 text-[#ededed]" />

        <div className="flex-none md:flex gap-2 pt-4">
          <div className="mb-2 md:mb-0">
            <p className="text-[15px] font-normal flex items-center"><span className="px-[8px] py-[3px] rounded text-white text-[11px] me-2 bg-[#7b9ebe]">i</span>
              <span>Gross: Total Inflow Sources</span></p>
          </div>
          <div className="mb-2 md:mb-0">
            <p className="flex items-center"><span className="px-[8px] py-[3px] rounded text-white text-[11px] me-2 bg-[#7b9ebe]">i</span>
              <span>Net: Gross - Deductions</span> </p>
          </div>
          <div className="mb-2 md:mb-0">
            <p className="flex items-center"><span className="px-[8px] py-[3px] rounded text-white text-[11px] me-2 bg-[#7b9ebe]">i</span>
              <span> Surplus: Net - EMI - Insurance - Expenses - Other - Monthly Investments</span>
            </p>
          </div>
        </div>
      </section>
      <StepActions
        showBack={showBack}
        onBack={onBack}
        onContinue={handleContinue}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

/* ============================================= */

interface SectionProps {
  title: string;
  buttonText: string;
  buttonColor: "gray" | "green";
  children: React.ReactNode;
  onAdd: () => void;
}

function Section({
  title,
  children,
  buttonText,
  buttonColor,
  onAdd,
}: SectionProps) {
  return (
    <div className="mb-10">

      <h3 className="font-semibold text-gray-800 mb-5">
        {title}
      </h3>

      <div className="space-y-5">
        {children}
      </div>
      <hr className="mt-8" />
      <div className="flex justify-end mt-5">

        <button
          onClick={onAdd}
          className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition
            ${buttonColor === "green"
              ? "bg-emerald-600 text-white hover:bg-[#04b488]"
              : "flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 group hover:bg-[#06A358] hover:text-white"
            }`}
        >
          <Plus size={16} />
          {buttonText}
        </button>
      </div>


    </div>
  );
}

/* ============================================= */

interface RowProps {
  titleLabel: string;
  titlePlaceholder: string;
  amountLabel: string;
  item: Item;
  onTitle: (value: string) => void;
  onAmount: (value: string) => void;
  onDelete: () => void;
  showDelete: boolean;
  prefix: string;
  errors: Record<string, string>;
}

function Row({
  titleLabel,
  titlePlaceholder,
  amountLabel,
  item,
  onTitle,
  onAmount,
  onDelete,
  showDelete,
  prefix,
  errors,
}: RowProps) {
  const titleError = errors[`${prefix}_title`];
  const amountError = errors[`${prefix}_amount`];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">

      <div className="md:col-span-5">
        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
          {titleLabel}
          <span className="text-red-600"> *</span>
        </label>

        <input
          name={`${prefix}_title`}
          className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${titleError ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
            }`}
          type="text"
          value={item.title}
          onKeyDown={(e) => {
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            if (e.key.length === 1 && !/^[a-zA-Z]$/.test(e.key) && (e.currentTarget.selectionStart === 0 || !e.currentTarget.value)) {
              e.preventDefault();
            } else if (e.key.length === 1 && !/^[a-zA-Z0-9\s]$/.test(e.key)) {
              e.preventDefault();
            }
          }}
          onChange={(e) => onTitle(sanitizeAlphaNumeric(e.target.value))}
          placeholder={titlePlaceholder}
        />
        {titleError && <p className="text-red-500 text-[11px] mt-1">{titleError}</p>}
      </div>

      <div className="md:col-span-5">

        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
          {amountLabel}
          <span className="text-red-600"> *</span>
        </label>

        <input
          name={`${prefix}_amount`}
          className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${amountError ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
            }`}
          type="text"
          inputMode="numeric"
          value={item.amount}
          onWheel={(e) => e.currentTarget.blur()}
          onKeyDown={(e) => {
            if (e.ctrlKey || e.metaKey || e.altKey) return;
            if (e.key === "ArrowUp" || e.key === "ArrowDown") e.preventDefault();
            if (e.key.length === 1 && !/^\d$/.test(e.key)) {
              e.preventDefault();
            }
          }}
          onChange={(e) => onAmount(formatIndianAmount(e.target.value))}
          placeholder="₹ Enter Amount"
        />
        {amountError && <p className="text-red-500 text-[11px] mt-1">{amountError}</p>}
      </div>

      <div className="md:col-span-2 flex md:justify-center mt-7 md:mt-7">
        {showDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="h-10 w-10 cursor-pointer rounded-full bg-[#DB4437] text-white flex items-center justify-center hover:bg-red-600 transition"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
}



