export type SeoConfig = {
    title: string;
    description: string;
    keywords?: string[];
    targetKeyword?: string;
    canonical?: string;
    openGraph?: {
        title: string;
        description: string;
        type: string;
        locale: string;
        url: string;
        siteName: string;
        images?: Array<{
            url: string;
            width: number;
            height: number;
            alt: string;
        }>;
    };
};

// Default Global SEO
export const defaultSeo: SeoConfig = {
    title: "BFC Capital - Wealth Management | Mutual Funds | Financial Planning",
    description:
        "BFC Capital offers expert wealth management, mutual fund distribution, and financial planning services. Start your journey to financial freedom with us.",
    keywords: [
        "Wealth Management",
        "Mutual Funds",
        "SIP Calculator",
        "Financial Planning",
        "Investment Advisor",
        "BFC Capital",
    ],
    openGraph: {
        title: "BFC Capital - Wealth Management | Mutual Funds | Financial Planning",
        description: "BFC Capital offers expert wealth management, mutual fund distribution, and financial planning services. Start your journey to financial freedom with us.",
        type: "website",
        locale: "en_IN",
        url: "https://bfccapital.com/",
        siteName: "BFC Capital",
        images: [
            {
                url: "https://bfccapital.com/Logo/CAPLOGO.svg", // Placeholder
                width: 1200,
                height: 630,
                alt: "BFC Capital Logo",
            },
        ],
    },
};

// Route-specific Overrides
export const pageSeo: Record<string, Partial<SeoConfig>> = {
    "/": {
        canonical: "https://bfccapital.com/",
        // Inherits default
    },

    "/all-mutual-funds": {
        keywords: ["all mutual funds, mutual funds list india, best mutual funds india, top mutual fund schemes, mutual fund investment india, equity mutual funds india, debt mutual funds india, hybrid mutual funds india"],
        targetKeyword: "Mutual Funds",
        title: "Mutual Funds: Explore Top Mutual Fund Schemes in India",
        description: "Browse all mutual funds with BFC Capital. Compare schemes, returns, and start investing with confidence.",
        canonical: "https://bfccapital.com/all-mutual-funds",
    },
    "/sif": {
        targetKeyword: "systematic investment fund",
        title: "Systematic Investment Fund (SIF): Smart Way to Invest & Grow Wealth",
        description: "Explore Systematic Investment Fund (SIF) with BFC Capital and achieve your financial goals through consistent investing.",
        keywords: ["systematic investment fund, sif investment, systematic investment plan fund, sif meaning, sif mutual fund, systematic investing india, sip vs sif, investment planning india, wealth creation strategy, disciplined investing, long term investment plan"],
        canonical: "https://bfccapital.com/sif",
    },
    "/financial-planning": {
        targetKeyword: "financial planning",
        title: "Financial Planning: Secure Your Future with Smart Investment Strategies",
        description: "Plan your finances with BFC Capital. Get expert financial planning solutions for wealth creation and future security.",
        keywords: ["financial planning, financial planning india, personal financial planning, investment planning services, wealth management india, financial advisor india, goal based financial planning, retirement planning india"],
        canonical: "https://bfccapital.com/financial-planning",
    },

    "/download-app": {
        targetKeyword: "bfc capital app download",
        title: "Download BFC Capital App: Invest in Mutual Funds & Manage Wealth Easily",
        description: "Install BFC Capital App for seamless investing, portfolio tracking, and smart financial planning on the go.",
        keywords: ["bfc capital app download, mutual fund app india, investment app india, wealth management app, sip investment app, mutual fund investment app, portfolio tracking app, finance app india, best investment app india"],
        canonical: "https://bfccapital.com/download-app",
    },
    "/investor-complaints": {
        targetKeyword: "investor complaints bfc capital",
        title: "BFC Capital Investor Complaints – Register & Track Grievances",
        description: "Submit your complaints with BFC Capital and get timely resolution through a structured grievance redressal system.",
        keywords: ["investor complaints bfc capital, grievance redressal bfc capital, complaint registration bfc capital, investor grievance system india, sebi complaints mutual funds, bfc capital support, complaint tracking system, investor complaint portal india"],
        canonical: "https://bfccapital.com/investor-complaints",
    },

    "/calculators": {
        targetKeyword: "financial calculators",
        title: "All Financial Calculators – SIP, EMI, Retirement & More | BFC Capital",
        description: "Use BFC Capital’s financial calculators to estimate returns, EMIs, and future investments for smarter financial planning.",
        keywords: ["financial calculators, investment calculators india, sip calculator, emi calculator, fd calculator, retirement calculator, mutual fund calculator, loan calculator india, wealth planning calculator"],
        canonical: "https://bfccapital.com/calculators",
    },

    "/privacy-policy": {
        canonical: "https://bfccapital.com/privacy-policy",
    },
    "/terms&conditions": {
        canonical: "https://bfccapital.com/terms&conditions",
    },
    "/legal-disclaimer": {
        canonical: "https://bfccapital.com/legal-disclaimer",
    },


    "/about": {
        canonical: "https://bfccapital.com/about",
    },
    "/career": {
        canonical: "https://bfccapital.com/career",
    },
    "/contact-us": {
        canonical: "https://bfccapital.com/contact-us",
    },

    "/calculators/sip-calculator": {
        targetKeyword: "sip calculator",
        title: "SIP Calculator: Calculate Mutual Fund Returns & Investment Growth",
        description: "Use BFC Capital SIP Calculator to plan monthly investments and achieve your financial goals faster.",
        keywords: ["sip calculator, mutual fund sip calculator, sip return calculator, sip investment calculator, monthly sip calculator, sip growth calculator, sip planner india, investment calculator sip, future value sip calculator, compounding calculator sip"],
        canonical: "https://bfccapital.com/calculators/sip-calculator",
    },

    "/calculators/marriage-planning-calculator":{
        targetKeyword: "Marriage Planning Calculator",
        title: "Marriage Planning Calculator: Calculate Wedding Cost & Investment Needs",
        description: "Use BFC Capital Marriage Planning Calculator to estimate marriage costs and build a smart investment plan for your future.",
        keywords: ["marriage planning calculator, wedding cost calculator india, marriage expense calculator, wedding budget calculator, marriage fund calculator, future wedding cost calculator, goal based calculator marriage, sip for marriage calculator, financial planning calculator india"],
        canonical: "https://bfccapital.com/calculators/marriage-planning-calculator",
    },
    "/calculators/education-planning-calculator":{
        targetKeyword: "education planning calculator",
        title: "Education Planning Calculator: Calculate Future Education Costs & Savings",
        description: "Use BFC Capital Education Planning Calculator to calculate education expenses and build a smart investment plan for your child’s goals.",
        keywords: ["education planning calculator, child education calculator, education cost calculator india, future education cost calculator, child education fund calculator, sip for education calculator, investment calculator for education, goal based calculator education"],
        canonical: "https://bfccapital.com/calculators/education-planning-calculator",
    },

    "/calculators/lump-sum-calculator":{
        targetKeyword: "lump sum calculator",
        title: "Lump Sum Calculator: Calculate Returns on One-Time Investment",
        description: "Use BFC Capital Lump Sum Calculator to project investment growth and plan your wealth creation effectively.",
        keywords: ["lump sum calculator, one time investment calculator, lump sum investment calculator, mutual fund lump sum calculator, investment return calculator, future value calculator, compounding calculator lump sum"],
        canonical: "https://bfccapital.com/calculators/lump-sum-calculator",
    },

    "/calculators/retirement-planning-calculator":{
        targetKeyword: "retirement planning calculator",
        title: "Retirement Planning Calculator: Calculate Retirement Corpus & Savings",
        description: "Use BFC Capital Retirement Planning Calculator to calculate how much you need to save for a comfortable and stress-free retirement.",
        keywords: ["retirement planning calculator, retirement calculator india, retirement corpus calculator, retirement savings calculator, pension calculator india, retirement fund calculator, future value retirement calculator, retirement income calculator"],
        canonical: "https://bfccapital.com/calculators/retirement-planning-calculator",
    },

    "/calculators/emi-calculator":{
        targetKeyword: "emi calculator",
        title: "EMI Calculator: Calculate Loan EMI, Interest & Repayment Easily",
        description: "Use BFC Capital EMI Calculator to check loan EMIs, interest costs, and repayment schedules instantly.",
        keywords: ["emi calculator, loan emi calculator, home loan emi calculator, personal loan emi calculator, car loan emi calculator, emi interest calculator, loan repayment calculator, monthly emi calculator, emi planning calculator"],
        canonical: "https://bfccapital.com/calculators/emi-calculator",
    },

    "/calculators/fd-calculator":{
        targetKeyword: "FD Calculator",
        title: "FD Calculator: Calculate Fixed Deposit Interest & Maturity Amount",
        description: "Use BFC Capital FD Calculator to check FD returns, interest rates, and plan your investments with confidence.",
        keywords: ["fd calculator, fixed deposit calculator, fd interest calculator, fd maturity calculator, bank fd calculator, fixed deposit interest rate calculator, fd return calculator, fd investment calculator india, fd interest rates"],
        canonical: "https://bfccapital.com/calculators/fd-calculator",
    },
    "/calculators/elss-calculator":{
        targetKeyword: "ELSS Calculator",
        title: "ELSS Calculator: Calculate Returns & Tax Savings on ELSS Investments",
        description: "Use BFC Capital ELSS Calculator to project investment growth and maximize tax benefits with ELSS mutual funds.",
        keywords: ["elss calculator, tax saving mutual fund calculator, elss return calculator, section 80c calculator, tax saving sip calculator, mutual fund tax calculator, elss investment calculator, sip elss calculator, tax planning calculator india"],
        canonical: "https://bfccapital.com/calculators/elss-calculator",
    },
    "/calculators/swp-calculator":{
        targetKeyword: "swp calculator",
        title: "SWP Calculator: Calculate Withdrawals from Mutual Funds Easily",
        description: "Use BFC Capital SWP Calculator to calculate monthly withdrawals and track remaining investment value efficiently.",
        keywords: ["swp calculator, systematic withdrawal plan calculator, sip withdrawal calculator, mutual fund withdrawal calculator, swp return calculator, swp plan calculator, monthly withdrawal calculator, investment withdrawal calculator"],
        canonical: "https://bfccapital.com/calculators/swp-calculator",
    },
    "/calculators/target-amount-calculator":{
        targetKeyword: "target amount calculator",
        title: "Target Amount Calculator: Plan Investments to Reach Your Financial Goal",
        description: "Use BFC Capital Target Amount Calculator to estimate the investment required for your future goals and build wealth efficiently.",
        keywords: ["target amount calculator, goal based investment calculator, financial goal calculator, investment goal calculator, sip goal calculator, future value calculator, investment planning calculator, wealth goal calculator"],
        canonical: "https://bfccapital.com/calculators/target-amount-calculator",
    },
    "/calculators/annual-sip-calculator":{
        targetKeyword: "annual sip calculator",
        title: "Annual SIP Calculator: Calculate Yearly Investment Returns Easily",
        description: "BFC Capital Annual SIP Calculator helps you estimate returns on yearly investments and grow your wealth smarter.",
        keywords: ["annual sip calculator, yearly sip calculator, sip calculator annual investment, sip return calculator india, mutual fund sip calculator, sip growth calculator, sip planning calculator, investment calculator sip"],
        canonical: "https://bfccapital.com/calculators/annual-sip-calculator",
    },

    "/calculators/step-up-sip-calculator":{
        targetKeyword: "step up sip calculator",
        title: "Step Up SIP Calculator: Calculate Returns with Annual Investment Increase",
        description: "Use BFC Capital Step Up SIP Calculator to project future value of increasing SIP investments and achieve your financial goals faster.",
        keywords: ["step up sip calculator, top up sip calculator, sip step up calculator, sip increase calculator, sip return calculator, mutual fund sip calculator, sip growth calculator, sip planner india, investment calculator sip"],
        canonical: "https://bfccapital.com/calculators/step-up-sip-calculator",
    },

    "/calculators/cost-of-delay-in-sip-calculator":{
        targetKeyword: "cost of delay in sip calculator",
        title: "Cost of Delay in SIP Calculator: Calculate Loss from Delayed Investments",
        description: "BFC Capital Cost of Delay SIP Calculator: Check how delaying SIPs impacts your returns and future wealth.",
        keywords: ["cost of delay calculator, sip delay calculator, cost of delay in sip, sip calculator delay, sip investment calculator, mutual fund sip calculator, sip return calculator, sip planning calculator, wealth loss calculator sip, compounding loss calculator"],
        canonical: "https://bfccapital.com/calculators/cost-of-delay-in-sip-calculator",
    },
};
