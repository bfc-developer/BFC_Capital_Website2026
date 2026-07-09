import { useState } from "react";
import { Trash2, Plus } from "lucide-react";

interface Item {
  id: number;
  title: string;
  amount: string;
}

export default function FinancialProfileStep() {
  const [income, setIncome] = useState<Item[]>([
    {
      id: Date.now(),
      title: "",
      amount: "",
    },
  ]);

  const [deductions, setDeductions] = useState<Item[]>([
    {
      id: Date.now() + 1,
      title: "",
      amount: "",
    },
  ]);

  const [Investments, setInvestments] = useState<Item[]>([
    {
      id: Date.now() + 1,
      title: "",
      amount: "",
    },
  ]);

  const [expenses, setExpenses] = useState<Item[]>([
    {
      id: Date.now() + 2,
      title: "",
      amount: "",
    },
  ]);

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
    if (list.length === 1) return;
    setList(list.filter((item) => item.id !== id));
  };

  const [emis, setEmis] = useState<EMIItem[]>([
    {
      id: Date.now() + 3,
      loanType: "",
      outstanding: "",
      emi: "",
      roi: "",
    },
  ]);

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
    if (emis.length === 1) return;
    setEmis((prev) => prev.filter((item) => item.id !== id));
  };

  const [insurepre, setEnsurepre] = useState<EMIItem[]>([
    {
      id: Date.now() + 3,
      loanType: "",
      outstanding: "",
      emi: "",
      roi: "",
    },
  ]);

  const updateinsurePremium = (
    id: number,
    field: keyof EMIItem,
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
        loanType: "",
        outstanding: "",
        emi: "",
        roi: "",
      },
    ]);
  };

  const removeinsurePremium = (id: number) => {
    if (insurepre.length === 1) return;
    setEnsurepre((prev) => prev.filter((item) => item.id !== id));
  };

  const [othertax, setOthertax] = useState<EMIItem[]>([
    {
      id: Date.now() + 3,
      loanType: "",
      outstanding: "",
      emi: "",
      roi: "",
    },
  ]);

  const updateOthertax = (
    id: number,
    field: keyof EMIItem,
    value: string
  ) => {
    setEnsurepre((prev) =>
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
        loanType: "",
        outstanding: "",
        emi: "",
        roi: "",
      },
    ]);
  };

  const removeotherTax = (id: number) => {
    if (othertax.length === 1) return;
    setOthertax((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div >

      <Section
        title="Gross Inflow (Salary, Rental, etc)"
        buttonText="Add Source"
        buttonColor="gray"
        onAdd={() => addItem(setIncome)}
      >
        {income.map((item) => (
          <Row
            key={item.id}
            titleLabel="Source of Inflow"
            titlePlaceholder="e.g. Salary 1 or Sales"
            amountLabel="Monthly Amount"
            item={item}
            onTitle={(value) =>
              updateItem(income, setIncome, item.id, "title", value)
            }
            onAmount={(value) =>
              updateItem(income, setIncome, item.id, "amount", value)
            }
            onDelete={() =>
              removeItem(income, setIncome, item.id)
            }
            showDelete={income.length > 1}
          />
        ))}
      </Section>

      <Section
        title="Monthly Deductions (Tax, PF, etc)"
        buttonText="Add Deduction"
        buttonColor="gray"
        onAdd={() => addItem(setDeductions)}
      >
        {deductions.map((item) => (
          <Row
            key={item.id}
            titleLabel="Deduction Detail"
            titlePlaceholder="e.g. Tax 80C or Rent"
            amountLabel="Amount"
            item={item}
            onTitle={(value) =>
              updateItem(deductions, setDeductions, item.id, "title", value)
            }
            onAmount={(value) =>
              updateItem(deductions, setDeductions, item.id, "amount", value)
            }
            onDelete={() =>
              removeItem(deductions, setDeductions, item.id)
            }
            showDelete={deductions.length > 1}
          />
        ))}
      </Section>

      <Section
        title="Monthly Expenses (Rent, Food, etc)"
        buttonText="Add Expense"
        buttonColor="green"
        onAdd={() => addItem(setExpenses)}
      >
        {expenses.map((item) => (
          <Row
            key={item.id}
            titleLabel="Expense Detail"
            titlePlaceholder="e.g. Rent 2025 or Food"
            amountLabel="Amount"
            item={item}
            onTitle={(value) =>
              updateItem(expenses, setExpenses, item.id, "title", value)
            }
            onAmount={(value) =>
              updateItem(expenses, setExpenses, item.id, "amount", value)
            }
            onDelete={() =>
              removeItem(expenses, setExpenses, item.id)
            }
            showDelete={expenses.length > 1}
          />
        ))}
      </Section>

      <Section
        title="EMI (If any)"
        buttonText="Add EMI"
        buttonColor="gray"
        onAdd={addEMI}
      >
        {emis.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end"
          >
            {/* Loan Type */}
            <div className="lg:col-span-3">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Loan Type
                <span className="text-red-600"> *</span>
              </label>
              <select
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors cursor-pointer"
              >
                <option value="">Select Loan Type</option>
                <option>Home Loan</option>
                <option>Car Loan</option>
                <option>Personal Loan</option>
                <option>Education Loan</option>
              </select>

            </div>

            {/* Outstanding Loan */}
            <div className="lg:col-span-3">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Outstanding Loan Amt

              </label>
              <input
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
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                type="number"
                placeholder="₹ Required"

              />

            </div>

            {/* ROI */}
            <div className="lg:col-span-2">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                ROI (%)
              </label>
              <input
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                placeholder="ROI"
              />

            </div>

            {/* Delete */}
            <div className="lg:col-span-1 flex lg:justify-center">
              {emis.length > 1 && (
                <button
                  onClick={() => removeEMI(item.id)}
                  className="h-10 w-10 rounded-full bg-[#DB4437] text-white flex items-center justify-center hover:bg-red-600 transition"
                >
                  <Trash2 size={18} />
                </button>
              )}
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
        {Investments.map((item) => (
          <Row
            key={item.id}
            titleLabel="Investment Name "
            titlePlaceholder="e.g. SIP 1 or Mutual Fund"
            amountLabel="Monthly Amount "
            item={item}
            onTitle={(value) =>
              updateItem(Investments, setInvestments, item.id, "title", value)
            }
            onAmount={(value) =>
              updateItem(Investments, setInvestments, item.id, "amount", value)
            }
            onDelete={() =>
              removeItem(Investments, setInvestments, item.id)
            }
            showDelete={Investments.length > 1}
          />
        ))}
      </Section>

      <Section
        title="Insurance Premiums (If any)"
        buttonText="Add Insurance"
        buttonColor="gray"
        onAdd={insurePremium}
      >
        {insurepre.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end"
          >

            <div className="lg:col-span-2">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Name
                <span className="text-red-600"> *</span>
              </label>
              <input
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                type="text"
                placeholder="Policy Name"

              />
            </div>

            <div className="lg:col-span-2">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Number
                <span className="text-red-600"> *</span>
              </label>
              <input
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                type="number"
                placeholder="Policy Number"
              />

            </div>

            <div className="lg:col-span-2">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Type
                <span className="text-red-600"> *</span>
              </label>
              <select
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors cursor-pointer"
              >
                <option value="">Select Type</option>
                <option>Home Loan</option>
                <option>Car Loan</option>
                <option>Personal Loan</option>
                <option>Education Loan</option>
              </select>
            </div>

            <div className="lg:col-span-2">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Premium Type
                <span className="text-red-600"> *</span>
              </label>
              <select
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors cursor-pointer"
              >
                <option value="">Annually</option>
                <option>Monthly</option>
              </select>

            </div>

            <div className="lg:col-span-1">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Premium
              </label>
              <input
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                type="number"
                placeholder="₹"
              />

            </div>

            <div className="lg:col-span-2">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Sum Insured
                <span className="text-red-600"> *</span>
              </label>
              <input
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                type="number"
                placeholder="₹"
              />

            </div>

            <div className="lg:col-span-1 flex lg:justify-center">
              {insurepre.length > 1 && (
                <button
                  onClick={() => removeinsurePremium(item.id)}
                  className="h-10 w-10 rounded-full bg-[#DB4437] text-white flex items-center justify-center hover:bg-red-600 transition"
                >
                  <Trash2 size={18} />
                </button>
              )}
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
        {othertax.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end"
          >

            <div className="lg:col-span-3">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Date
                <span className="text-red-600"> *</span>
              </label>
              <input
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                type="date"
                placeholder="DD/MM/YYYY"
              />

            </div>

            <div className="lg:col-span-3">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Investment Name
                <span className="text-red-600"> *</span>
              </label>
              <input
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                type="text"
                placeholder="e.g. PPF 2024 or LIC"

              />

            </div>

            <div className="lg:col-span-3">

              <label className="block text-[13px] font-medium text-[#44475b] mb-2">
                Amount
                <span className="text-red-600"> *</span>
              </label>
              <input
                className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors"
                type="number"
                placeholder="₹"

              />

            </div>

            <div className="lg:col-span-1 flex lg:justify-center">
              {othertax.length > 1 && (
                <button
                  onClick={() => removeotherTax(item.id)}
                  className="h-10 w-10 rounded-full bg-[#DB4437] text-white flex items-center justify-center hover:bg-red-600 transition"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          </div>
        ))}
      </Section>

      <section className="bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors p-4 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="flex items-center gap-4 rounded-xl border border-[#E8E8E8] bg-[#FFF9E8] p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FFC107] text-white">
              💰
            </div>

            <div>
              <p className="text-xs text-gray-500">Gross Inflow</p>
              <h4 className="text-xl font-bold text-[#F4A300]">₹20,000</h4>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex items-center gap-4 rounded-xl border border-[#E8E8E8] bg-[#ECFFF4] p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#04B488] text-white">
              📄
            </div>

            <div>
              <p className="text-xs text-gray-500">Net Inflow</p>
              <h4 className="text-xl font-bold text-[#04B488]">₹30,000</h4>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex items-center gap-4 rounded-xl border border-[#E8E8E8] bg-[#F4EEFF] p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#7C4DFF] text-white">
              💼
            </div>

            <div>
              <p className="text-xs text-gray-500">Monthly Investment</p>
              <h4 className="text-xl font-bold text-[#7C4DFF]">₹5,000</h4>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex items-center gap-4 rounded-xl border border-[#E8E8E8] bg-[#EEF6FF] p-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1E88E5] text-white">
              🏦
            </div>

            <div>
              <p className="text-xs text-gray-500">Overall Surplus</p>
              <h4 className="text-xl font-bold text-[#1E88E5]">₹40,000</h4>
            </div>
          </div>
        </div>
        <hr className="mt-5 text-[#ededed]" />

        <div className="flex-none md:flex gap-2 pt-4">
          <div className="mb-2 md:mb-0">
            <p className="text-[15px] font-normal"><span className="px-[8px] py-[3px] rounded text-white text-[11px] me-2 bg-[#7b9ebe]">i</span>Gross: Total Inflow Sources</p>
          </div>
          <div className="mb-2 md:mb-0">
            <p><span className="px-[8px] py-[3px] rounded text-white text-[11px] me-2 bg-[#7b9ebe]">i</span>Net: Gross - Deductions </p>
          </div>
          <div className="mb-2 md:mb-0">
            <p><span className="px-[8px] py-[3px] rounded text-white text-[11px] me-2 bg-[#7b9ebe]">i</span>Surplus: Net - EMI - Insurance - Expenses - Other - Monthly Investments</p>
          </div>
        </div>
      </section>
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
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition
            ${buttonColor === "green"
              ? "bg-[#04b488] text-white hover:bg-emerald-600"
              : "flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
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
}: RowProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">

      <div className="md:col-span-5">
        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
          {titleLabel}
          <span className="text-red-600"> *</span>
        </label>

       <input
          className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors w-full rounded-lg border px-4 py-2.5 outline-none"
          type="text"
          value={item.title}
          onChange={(e) => onTitle(e.target.value)}
          placeholder={titlePlaceholder}
        />
      </div>

      <div className="md:col-span-5">

        <label className="block text-[13px] font-medium text-[#44475b] mb-2">
          {amountLabel}
          <span className="text-red-600"> *</span>
        </label>

        <input
          className="w-full h-[44px] sm:h-[46px] bg-white border border-[#e9e9e9] rounded-[10px] px-3 text-[13px] text-[#44475b] placeholder-[#8b8b8b] focus:outline-none focus:border-[#04b488] transition-colors w-full rounded-lg border px-4 py-2.5 outline-none"
          type="number"
          value={item.amount}
          onChange={(e) => onAmount(e.target.value)}
          placeholder="₹ Enter Amount"
        />
      </div>

      <div className="md:col-span-2 flex md:justify-center">
        {showDelete && (
          <button
            onClick={onDelete}
            className="h-10 w-10 rounded-full bg-[#DB4437] cursor-pointer text-white flex items-center justify-center hover:bg-red-600"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

interface EMIItem {
  id: number;
  loanType: string;
  outstanding: string;
  emi: string;
  roi: string;
}



