export type SeoConfig = {
    title: string;
    description: string;
    keywords?: string[];
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
        title: "BFC Capital - Wealth Management & Financial Planning",
        description: "Expert financial advice and wealth management solutions.",
        type: "website",
        locale: "en_IN",
        url: "https://bfccapital.com",
        siteName: "BFC Capital",
        images: [
            {
                url: "/og-image.jpg", // Placeholder
                width: 1200,
                height: 630,
                alt: "BFC Capital Wealth Management",
            },
        ],
    },
};

// Route-specific Overrides
export const pageSeo: Record<string, Partial<SeoConfig>> = {
    "/": {
        // Inherits default
    },
    "/investor-complaints": {
        title: "Investor Complaints - BFC Capital",
        description:
            "View the monthly and annual trend of investor complaints for BFC Capital's Investment Advisory services.",
        keywords: ["Investor Complaints", "SEBI Data", "Grievance Redressal"],
        canonical: "https://bfccapital.com/investor-complaints",
    },
    "/about": {
        title: "About Us - BFC Capital",
        description: "Learn about BFC Capital's journey, vision, and the team behind our success.",
    },
    "/mutual-funds": {
        title: "Top Mutual Funds to Invest - BFC Capital",
        description: "Explore top-rated mutual funds and start your SIP today with BFC Capital.",
    },
    "/financial-planning": {
        title: "Comprehensive Financial Planning - BFC Capital",
        description: "Personalized financial planning services to help you achieve your life goals.",
    },
};
