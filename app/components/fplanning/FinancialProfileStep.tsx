import { useState, useEffect, type ReactNode } from "react";
import { Trash2, Plus } from "lucide-react";
import StepActions from "./StepActions";

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
  professionalData,
  onNext,
  onBack,
  showBack,
}: FinancialProfileStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!profileId) return;
    fetch("http://localhost:5000/api/financial")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.success && Array.isArray(resData.data)) {
          const profile = resData.data.find(
            (p: any) => p.personalProfileId === profileId
          );
          if (profile) {
            if (Array.isArray(profile.grossInflow) && profile.grossInflow.length > 0) {
              setIncome(
                profile.grossInflow.map((item: any, idx: number) => ({
                  id: item._id || idx,
                  title: item.sourceOfInflow || "",
                  amount: item.monthlyAmount !== null && item.monthlyAmount !== undefined ? String(item.monthlyAmount) : "",
                }))
              );
            }
            if (Array.isArray(profile.monthlyDeductions) && profile.monthlyDeductions.length > 0) {
              setDeductions(
                profile.monthlyDeductions.map((item: any, idx: number) => ({
                  id: item._id || idx,
                  title: item.deductionDetail || "",
                  amount: item.amount !== null && item.amount !== undefined ? String(item.amount) : "",
                }))
              );
            }
            if (Array.isArray(profile.monthlyExpenses) && profile.monthlyExpenses.length > 0) {
              setExpenses(
                profile.monthlyExpenses.map((item: any, idx: number) => ({
                  id: item._id || idx,
                  title: item.expenseDetail || "",
                  amount: item.amount !== null && item.amount !== undefined ? String(item.amount) : "",
                }))
              );
            }
            if (Array.isArray(profile.monthlyInvestments) && profile.monthlyInvestments.length > 0) {
              setInvestments(
                profile.monthlyInvestments.map((item: any, idx: number) => ({
                  id: item._id || idx,
                  title: item.investmentName || "",
                  amount: item.monthlyAmount !== null && item.monthlyAmount !== undefined ? String(item.monthlyAmount) : "",
                }))
              );
            }
            if (Array.isArray(profile.emi) && profile.emi.length > 0) {
              setEmis(
                profile.emi.map((item: any, idx: number) => ({
                  id: item._id || idx,
                  loanType: item.loanType || "",
                  outstanding: item.outstandingLoanAmt !== null && item.outstandingLoanAmt !== undefined ? String(item.outstandingLoanAmt) : "",
                  emi: item.monthlyEmi !== null && item.monthlyEmi !== undefined ? String(item.monthlyEmi) : "",
                  roi: item.roi !== null && item.roi !== undefined ? String(item.roi) : "",
                }))
              );
            }
            if (Array.isArray(profile.insurancePremium) && profile.insurancePremium.length > 0) {
              setEnsurepre(
                profile.insurancePremium.map((item: any, idx: number) => ({
                  id: item._id || idx,
                  policyName: item.policyName || "Policy",
                  policyNumber: item.policyNumber || "",
                  insuranceType: item.insuranceType || "",
                  premiumType: item.premiumType || "Annual",
                  premium: item.premium !== null && item.premium !== undefined ? String(item.premium) : "",
                  sumInsured: item.sumInsured !== null && item.sumInsured !== undefined ? String(item.sumInsured) : "",
                }))
              );
            }
            if (Array.isArray(profile.taxSavingInvestments) && profile.taxSavingInvestments.length > 0) {
              setOthertax(
                profile.taxSavingInvestments.map((item: any, idx: number) => ({
                  id: item._id || idx,
                  date: item.date ? item.date.split("T")[0] : "",
                  investmentName: item.investmentName || "",
                  amount: item.amount !== null && item.amount !== undefined ? String(item.amount) : "",
                }))
              );
            }
          }
        }
      })
      .catch((err) => console.error("Error prefilling financial profile:", err));
  }, [profileId]);

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

  const [emis, setEmis] = useState<EMIItem[]>([]);

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

  const [insurepre, setEnsurepre] = useState<InsuranceItem[]>([]);

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

  const [othertax, setOthertax] = useState<TaxSavingItem[]>([]);

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
    } else if (!/[a-zA-Z]/.test(income[0].title)) {
      validationErrors[`income_0_title`] = "Source of inflow cannot be numeric.";
    } else if (!/^[a-zA-Z0-9\s.\-\/()&]+$/.test(income[0].title)) {
      validationErrors[`income_0_title`] = "Source of inflow must be alphanumeric.";
    }

    if (!income[0] || !income[0].amount.trim()) {
      validationErrors[`income_0_amount`] = "Monthly amount is required.";
    } else if (Number(income[0].amount) <= 0) {
      validationErrors[`income_0_amount`] = "Amount must be greater than zero.";
    }

    income.forEach((item, idx) => {
      if (idx > 0) {
        const hasTitle = item.title.trim();
        const hasAmount = item.amount.trim();
        if (hasTitle || hasAmount) {
          if (!hasTitle) {
            validationErrors[`income_${idx}_title`] = "Source of inflow is required.";
          } else if (!/[a-zA-Z]/.test(item.title)) {
            validationErrors[`income_${idx}_title`] = "Source of inflow cannot be numeric.";
          } else if (!/^[a-zA-Z0-9\s.\-\/()&]+$/.test(item.title)) {
            validationErrors[`income_${idx}_title`] = "Source of inflow must be alphanumeric.";
          }

          if (!hasAmount) validationErrors[`income_${idx}_amount`] = "Monthly amount is required.";
          else if (Number(item.amount) <= 0) validationErrors[`income_${idx}_amount`] = "Amount must be greater than zero.";
        }
      }
    });

    // 2. Deductions validation
    deductions.forEach((item, idx) => {
      if (!item.title.trim()) {
        validationErrors[`deduction_${idx}_title`] = "Deduction detail is required.";
      } else if (!/[a-zA-Z]/.test(item.title)) {
        validationErrors[`deduction_${idx}_title`] = "Deduction detail cannot be numeric.";
      } else if (!/^[a-zA-Z0-9\s.\-\/()&]+$/.test(item.title)) {
        validationErrors[`deduction_${idx}_title`] = "Deduction detail must be alphanumeric.";
      }

      if (!item.amount.trim()) {
        validationErrors[`deduction_${idx}_amount`] = "Amount is required.";
      } else if (Number(item.amount) <= 0) {
        validationErrors[`deduction_${idx}_amount`] = "Amount must be greater than zero.";
      }
    });

    // 3. Expenses validation
    expenses.forEach((item, idx) => {
      if (!item.title.trim()) {
        validationErrors[`expense_${idx}_title`] = "Expense detail is required.";
      } else if (!/[a-zA-Z]/.test(item.title)) {
        validationErrors[`expense_${idx}_title`] = "Expense detail cannot be numeric.";
      } else if (!/^[a-zA-Z0-9\s.\-\/()&]+$/.test(item.title)) {
        validationErrors[`expense_${idx}_title`] = "Expense detail must be alphanumeric.";
      }

      if (!item.amount.trim()) {
        validationErrors[`expense_${idx}_amount`] = "Amount is required.";
      } else if (Number(item.amount) <= 0) {
        validationErrors[`expense_${idx}_amount`] = "Amount must be greater than zero.";
      }
    });

    // 4. EMI validation
    emis.forEach((item, idx) => {
      if (!item.loanType) {
        validationErrors[`emi_${idx}_loanType`] = "Loan type is required.";
      } else if (!/[a-zA-Z]/.test(item.loanType)) {
        validationErrors[`emi_${idx}_loanType`] = "Loan type cannot be numeric.";
      } else if (!/^[a-zA-Z0-9\s.\-\/()&]+$/.test(item.loanType)) {
        validationErrors[`emi_${idx}_loanType`] = "Loan type must be alphanumeric.";
      }

      if (!item.emi.trim()) {
        validationErrors[`emi_${idx}_emi`] = "Monthly EMI is required.";
      } else if (Number(item.emi) <= 0) {
        validationErrors[`emi_${idx}_emi`] = "EMI must be greater than zero.";
      }
    });

    // 5. Investments validation
    Investments.forEach((item, idx) => {
      if (!item.title.trim()) {
        validationErrors[`investment_${idx}_title`] = "Investment name is required.";
      } else if (!/[a-zA-Z]/.test(item.title)) {
        validationErrors[`investment_${idx}_title`] = "Investment name cannot be numeric.";
      } else if (!/^[a-zA-Z0-9\s.\-\/()&]+$/.test(item.title)) {
        validationErrors[`investment_${idx}_title`] = "Investment name must be alphanumeric.";
      }

      if (!item.amount.trim()) {
        validationErrors[`investment_${idx}_amount`] = "Monthly amount is required.";
      } else if (Number(item.amount) <= 0) {
        validationErrors[`investment_${idx}_amount`] = "Amount must be greater than zero.";
      }
    });

    // 6. Insurance validation
    insurepre.forEach((item, idx) => {
      if (!item.policyName.trim()) {
        validationErrors[`insurance_${idx}_policyName`] = "Policy name is required.";
      }
      if (!item.policyNumber.trim()) {
        validationErrors[`insurance_${idx}_policyNumber`] = "Policy number is required.";
      }
      if (!item.insuranceType) {
        validationErrors[`insurance_${idx}_insuranceType`] = "Insurance type is required.";
      }
      if (!item.premiumType) {
        validationErrors[`insurance_${idx}_premiumType`] = "Premium type is required.";
      }
      if (!item.sumInsured.trim()) {
        validationErrors[`insurance_${idx}_sumInsured`] = "Sum insured is required.";
      } else if (Number(item.sumInsured) <= 0) {
        validationErrors[`insurance_${idx}_sumInsured`] = "Sum insured must be greater than zero.";
      }
      if (item.premium.trim() && Number(item.premium) <= 0) {
        validationErrors[`insurance_${idx}_premium`] = "Premium must be greater than zero.";
      }
    });

    // 7. Tax Saving validation
    othertax.forEach((item, idx) => {
      if (!item.date) {
        validationErrors[`tax_${idx}_date`] = "Date is required.";
      }
      if (!item.investmentName.trim()) {
        validationErrors[`tax_${idx}_investmentName`] = "Investment name is required.";
      } else if (!/[a-zA-Z]/.test(item.investmentName)) {
        validationErrors[`tax_${idx}_investmentName`] = "Investment name cannot be numeric.";
      } else if (!/^[a-zA-Z0-9\s.\-\/()&]+$/.test(item.investmentName)) {
        validationErrors[`tax_${idx}_investmentName`] = "Investment name must be alphanumeric.";
      }

      if (!item.amount.trim()) {
        validationErrors[`tax_${idx}_amount`] = "Amount is required.";
      } else if (Number(item.amount) <= 0) {
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
        grossInflow: income.filter(i => i.title.trim()).map(i => ({ sourceOfInflow: i.title, monthlyAmount: Number(i.amount) })),
        monthlyDeductions: deductions.filter(i => i.title.trim()).map(i => ({ deductionDetail: i.title, amount: Number(i.amount) })),
        monthlyExpenses: expenses.filter(i => i.title.trim()).map(i => ({ expenseDetail: i.title, amount: Number(i.amount) })),
        emi: emis.filter(i => i.loanType).map(i => ({ loanType: i.loanType, outstandingLoanAmt: Number(i.outstanding) || null, monthlyEmi: Number(i.emi), roi: Number(i.roi) || null })),
        monthlyInvestments: Investments.filter(i => i.title.trim()).map(i => ({ investmentName: i.title, monthlyAmount: Number(i.amount) })),
        insurancePremium: insurepre.filter(i => i.policyName.trim()).map(i => ({ policyName: i.policyName, insuranceType: i.insuranceType, premiumType: i.premiumType, premium: Number(i.premium) || null, sumInsured: Number(i.sumInsured) })),
        taxSavingInvestments: othertax.filter(i => i.investmentName.trim()).map(i => ({ date: i.date ? new Date(i.date).toISOString() : new Date().toISOString(), investmentName: i.investmentName, amount: Number(i.amount) }))
      };

      const url = financialProfileId
        ? `http://localhost:5000/api/financial/${financialProfileId}`
        : "http://localhost:5000/api/financial";
      const method = financialProfileId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(errBody.msg || errBody.message || "Failed to submit financial profile details");
      }

      if (onNext) onNext();
    } catch (err) {
      alert("Error saving details: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setIsSubmitting(false);
    }
  };

  const grossInflowSum = income.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
  const deductionsSum = deductions.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
  const netInflowSum = grossInflowSum - deductionsSum;
  const investmentsSum = Investments.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
  const emisSum = emis.reduce((acc, item) => acc + (Number(item.emi) || 0), 0);
  const insuranceSum = insurepre.reduce((acc, item) => acc + (Number(item.premium) || 0), 0);
  const otherTaxSum = othertax.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);
  const expensesSum = expenses.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);

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
            titlePlaceholder="e.g. Salary 1 or Sales"
            amountLabel="Monthly Amount"
            item={item}
            onTitle={(value) => {
              updateItem(income, setIncome, item.id, "title", value);
              setErrors(prev => ({ ...prev, [`income_${idx}_title`]: "" }));
            }}
            onAmount={(value) => {
              updateItem(income, setIncome, item.id, "amount", value);
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
            titlePlaceholder="e.g. Tax 80C or Rent"
            amountLabel="Amount"
            item={item}
            onTitle={(value) => {
              updateItem(deductions, setDeductions, item.id, "title", value);
              setErrors(prev => ({ ...prev, [`deduction_${idx}_title`]: "" }));
            }}
            onAmount={(value) => {
              updateItem(deductions, setDeductions, item.id, "amount", value);
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
            titlePlaceholder="e.g. Rent 2025 or Food"
            amountLabel="Amount"
            item={item}
            onTitle={(value) => {
              updateItem(expenses, setExpenses, item.id, "title", value);
              setErrors(prev => ({ ...prev, [`expense_${idx}_title`]: "" }));
            }}
            onAmount={(value) => {
              updateItem(expenses, setExpenses, item.id, "amount", value);
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
                onChange={(e) => updateEMI(item.id, "outstanding", e.target.value)}
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={(e) => (e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault()}
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                type="number"
                placeholder="₹ Amount"
              />

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
                  updateEMI(item.id, "emi", e.target.value);
                  setErrors(prev => ({ ...prev, [`emi_${idx}_emi`]: "" }));
                }}
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={(e) => (e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault()}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`emi_${idx}_emi`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                type="number"
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
                onChange={(e) => updateEMI(item.id, "roi", e.target.value)}
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={(e) => (e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault()}
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                type="number"
                placeholder="ROI"
              />

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
                    delete copy[`emi_${idx}_emi`];
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
            titleLabel="Investment Name "
            titlePlaceholder="e.g. SIP 1 or Mutual Fund"
            amountLabel="Monthly Amount "
            item={item}
            onTitle={(value) => {
              updateItem(Investments, setInvestments, item.id, "title", value);
              setErrors(prev => ({ ...prev, [`investment_${idx}_title`]: "" }));
            }}
            onAmount={(value) => {
              updateItem(Investments, setInvestments, item.id, "amount", value);
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
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-12 gap-4 items-start"
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
                  updateinsurePremium(item.id, "policyName", e.target.value);
                  setErrors(prev => ({ ...prev, [`insurance_${idx}_policyName`]: "" }));
                }}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`insurance_${idx}_policyName`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                type="text"
                placeholder="Policy Name"
              />
              {errors[`insurance_${idx}_policyName`] && <p className="text-red-500 text-[11px] mt-1">{errors[`insurance_${idx}_policyName`]}</p>}
            </div>

            <div className="lg:col-span-2">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Number
                <span className="text-red-600"> *</span>
              </label>
              <input
                name={`insurance_${idx}_policyNumber`}
                value={item.policyNumber}
                onChange={(e) => {
                  updateinsurePremium(item.id, "policyNumber", e.target.value);
                  setErrors(prev => ({ ...prev, [`insurance_${idx}_policyNumber`]: "" }));
                }}
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={(e) => (e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault()}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`insurance_${idx}_policyNumber`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                type="number"
                placeholder="Policy Number"
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

            <div className="lg:col-span-1">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Premium
              </label>
              <input
                name={`insurance_${idx}_premium`}
                value={item.premium}
                onChange={(e) => {
                  updateinsurePremium(item.id, "premium", e.target.value);
                  setErrors(prev => ({ ...prev, [`insurance_${idx}_premium`]: "" }));
                }}
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={(e) => (e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault()}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`insurance_${idx}_premium`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                type="number"
                placeholder="₹"
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
                  updateinsurePremium(item.id, "sumInsured", e.target.value);
                  setErrors(prev => ({ ...prev, [`insurance_${idx}_sumInsured`]: "" }));
                }}
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={(e) => (e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault()}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`insurance_${idx}_sumInsured`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                type="number"
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

      <Section
        title="Other Tax Saving Investments"
        buttonText="Add Tax Saving"
        buttonColor="gray"
        onAdd={othertaxsave}
      >
        {othertax.map((item, idx) => (
          <div key={item.id} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 xl:grid-cols-12 gap-4 items-start"
          >

            <div className="lg:col-span-3">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Date
                <span className="text-red-600"> *</span>
              </label>
              <input
                name={`tax_${idx}_date`}
                value={item.date}
                onChange={(e) => {
                  updateOthertax(item.id, "date", e.target.value);
                  setErrors(prev => ({ ...prev, [`tax_${idx}_date`]: "" }));
                }}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`tax_${idx}_date`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                type="date"
                placeholder="DD/MM/YYYY"
              />
              {errors[`tax_${idx}_date`] && <p className="text-red-500 text-[11px] mt-1">{errors[`tax_${idx}_date`]}</p>}
            </div>

            <div className="lg:col-span-3">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Investment Name
                <span className="text-red-600"> *</span>
              </label>
              <input
                name={`tax_${idx}_investmentName`}
                value={item.investmentName}
                onChange={(e) => {
                  updateOthertax(item.id, "investmentName", e.target.value);
                  setErrors(prev => ({ ...prev, [`tax_${idx}_investmentName`]: "" }));
                }}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`tax_${idx}_investmentName`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                type="text"
                placeholder="e.g. PPF 2024 or LIC"
              />
              {errors[`tax_${idx}_investmentName`] && <p className="text-red-500 text-[11px] mt-1">{errors[`tax_${idx}_investmentName`]}</p>}
            </div>

            <div className="lg:col-span-3">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Amount
                <span className="text-red-600"> *</span>
              </label>
              <input
                name={`tax_${idx}_amount`}
                value={item.amount}
                onChange={(e) => {
                  updateOthertax(item.id, "amount", e.target.value);
                  setErrors(prev => ({ ...prev, [`tax_${idx}_amount`]: "" }));
                }}
                onWheel={(e) => e.currentTarget.blur()}
                onKeyDown={(e) => (e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault()}
                className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors ${errors[`tax_${idx}_amount`] ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
                  }`}
                type="number"
                placeholder="₹"
              />
              {errors[`tax_${idx}_amount`] && <p className="text-red-500 text-[11px] mt-1">{errors[`tax_${idx}_amount`]}</p>}
            </div>

            <div className="lg:col-span-1 flex lg:justify-center mt-7 lg:mt-7">
              <button
                type="button"
                onClick={() => {
                  removeotherTax(item.id);
                  setErrors(prev => {
                    const copy = { ...prev };
                    delete copy[`tax_${idx}_date`];
                    delete copy[`tax_${idx}_investmentName`];
                    delete copy[`tax_${idx}_amount`];
                    return copy;
                  });
                }}
                className="h-10 w-10 rounded-full cursor-pointer bg-[#DB4437] text-white flex items-center justify-center hover:bg-red-600 transition"
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
          className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors w-full rounded-lg border px-4 py-2.5 outline-none ${titleError ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
            }`}
          type="text"
          value={item.title}
          onChange={(e) => onTitle(e.target.value)}
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
          className={`w-full h-[44px] sm:h-[46px] bg-white border rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none transition-colors w-full rounded-lg border px-4 py-2.5 outline-none ${amountError ? "border-red-500 focus:border-red-500" : "border-[#e9e9e9] focus:border-[#04b488]"
            }`}
          type="number"
          value={item.amount}
          onChange={(e) => onAmount(e.target.value)}
          onWheel={(e) => e.currentTarget.blur()}
          onKeyDown={(e) => (e.key === "ArrowUp" || e.key === "ArrowDown") && e.preventDefault()}
          placeholder="₹ Enter Amount"
        />
        {amountError && <p className="text-red-500 text-[11px] mt-1">{amountError}</p>}
      </div>

      <div className="md:col-span-2 flex md:justify-center mt-7 md:mt-7">
        {showDelete && (
          <button
            onClick={onDelete}
            className="h-10 w-10 cursor-pointer rounded-full bg-[#DB4437] text-white flex items-center justify-center hover:bg-red-600"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
}



