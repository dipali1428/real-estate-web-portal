export interface BusinessLoanBank {
  name: string;
  slug: string;
  tagline: string;
  interestRate: string;
  processingFee: string;
  isLowestRate?: boolean;
  logo?: string;
  details: {
    maxTenure: string;
    maxLoanAmount: string;
    eligibility: string[];
    documents: string[];
    benefits: string[];
    products: string[];
  };
}

const baseProducts = ["Term Loan", "Top up", "Balance Transfer"];
const odProducts = [...baseProducts, "OD"];

const strictEligibility = [
  "Business vintage of more than 2 years",
  "Annual turnover of ₹1 Cr+",
  "CIBIL score 750+",
  "Applicant age between 25 and 65 years"
];

const flexibleEligibility = [
  "Business vintage of more than 3 years",
  "Annual turnover more than ₹50 Lacs",
  "CIBIL score 700+",
  "Applicant age between 21 and 65 years"
];

const defaultDetails = {
  maxTenure: "60 Months",
  maxLoanAmount: "₹50 Lakhs",
  eligibility: strictEligibility,
  documents: [
    "Last 12 months bank statements",
    "PAN Card and Aadhaar Card of owners",
    "Business registration proof (GST/Trade License)",
    "Last 2 years ITR and Balance Sheet"
  ],
  benefits: [
    "Collateral-free funding",
    "Flexible repayment options",
    "Minimal documentation",
    "Fast approval within 48 hours"
  ],
  products: baseProducts
};

const flexibleDetails = {
  ...defaultDetails,
  eligibility: flexibleEligibility
};

export const businessLoanBanks: BusinessLoanBank[] = [
  {
    name: "Aditya Birla Capital Limited",
    slug: "aditya-birla",
    tagline: "Customized solutions for growth",
    interestRate: "16.50% p.a.",
    processingFee: "upto 1%",
    details: { ...defaultDetails, products: odProducts }
  },
  {
    name: "Ambit Finvest Pvt. Ltd.",
    slug: "ambit-finvest",
    tagline: "Empowering small businesses",
    interestRate: "18.00% p.a.",
    processingFee: "upto 1%",
    details: defaultDetails
  },
  {
    name: "Arka Fincap Limited",
    slug: "arka-fincap",
    tagline: "Fast & flexible funding",
    interestRate: "17.50% p.a.",
    processingFee: "upto 1%",
    details: defaultDetails
  },
  {
    name: "Axis Bank Limited",
    slug: "axis-bank",
    tagline: "Multi-purpose business credit",
    interestRate: "15.00% p.a.",
    processingFee: "upto 1%",
    isLowestRate: true,
    details: {
      ...defaultDetails,
      maxLoanAmount: "₹75 Lakhs",
      maxTenure: "84 Months"
    }
  },
  {
    name: "Axis Finance Ltd",
    slug: "axis-finance",
    tagline: "Structured credit solutions",
    interestRate: "17.00% p.a.",
    processingFee: "upto 1%",
    details: defaultDetails
  },
  {
    name: "Bajaj Finance Limited",
    slug: "bajaj-finance",
    tagline: "Quick approvals in 24 hours",
    interestRate: "18.50% p.a.",
    processingFee: "upto 1%",
    details: {
      ...defaultDetails,
      products: odProducts,
      benefits: [
        "Pre-approved offers",
        "No hidden charges",
        "Online account management",
        "Instant disbursal"
      ]
    }
  },
  {
    name: "Cholamandalam Investment",
    slug: "cholamandalam",
    tagline: "Extensive rural & semi-urban reach",
    interestRate: "19.00% p.a.",
    processingFee: "upto 1%",
    details: defaultDetails
  },
  {
    name: "Clix Capital Services",
    slug: "clix-capital",
    tagline: "Digital-first lending journey",
    interestRate: "18.50% p.a.",
    processingFee: "upto 1%",
    details: defaultDetails
  },
  {
    name: "Credit Saison",
    slug: "credit-saison",
    tagline: "Advanced AI-based credit risk",
    interestRate: "18.25% p.a.",
    processingFee: "upto 1%",
    details: defaultDetails
  },
  {
    name: "Deutsche Bank AG",
    slug: "deutsche-bank",
    tagline: "Global standards in business credit",
    interestRate: "16.25% p.a.",
    processingFee: "upto 1%",
    details: defaultDetails
  },
  {
    name: "Growth Source (Protium)",
    slug: "growth-source",
    tagline: "Fueled by technology, driven by data",
    interestRate: "19.50% p.a.",
    processingFee: "upto 1%",
    details: flexibleDetails
  },
  {
    name: "HDFC Bank Limited",
    slug: "hdfc-bank",
    tagline: "India's largest private bank credit",
    interestRate: "15.00% p.a.",
    processingFee: "upto 1%",
    isLowestRate: true,
    details: {
      ...defaultDetails,
      maxLoanAmount: "₹1 Crore",
      benefits: [
        "Unmatched trust of HDFC",
        "Dedicated Relationship Manager",
        "Doorstep service",
        "Attractive interest rates"
      ]
    }
  },
  {
    name: "Hero Fincorp Limited",
    slug: "hero-fincorp",
    tagline: "Legacy of trust and efficiency",
    interestRate: "18.50% p.a.",
    processingFee: "upto 1%",
    details: defaultDetails
  },
  {
    name: "ICICI Bank Limited",
    slug: "icici-bank",
    tagline: "End-to-end digital business loans",
    interestRate: "15.85% p.a.",
    processingFee: "upto 1%",
    details: defaultDetails
  },
  {
    name: "IDFC First Bank Limited",
    slug: "idfc-first",
    tagline: "Always you first, simple & fast",
    interestRate: "16.49% p.a.",
    processingFee: "upto 1%",
    details: flexibleDetails
  },
  {
    name: "InCred Finance",
    slug: "incred-finance",
    tagline: "Next-gen credit for businesses",
    interestRate: "17.00% p.a.",
    processingFee: "upto 1%",
    details: flexibleDetails
  },
  {
    name: "Indifi Technologies Pvt Ltd",
    slug: "indifi",
    tagline: "Industry-specific lending solutions",
    interestRate: "20.00% p.a.",
    processingFee: "upto 1%",
    details: defaultDetails
  },
  {
    name: "Indusind Bank Limited",
    slug: "indusind-bank",
    tagline: "Flexible tenure & easy processing",
    interestRate: "16.75% p.a.",
    processingFee: "upto 1%",
    details: defaultDetails
  },
  {
    name: "Kotak Mahindra Bank Limited",
    slug: "kotak-mahindra",
    tagline: "Special rates for MSMEs",
    interestRate: "16.00% p.a.",
    processingFee: "upto 1%",
    details: defaultDetails
  },
  {
    name: "Krazybee Services Private Limited",
    slug: "krazybee",
    tagline: "Instant credit for emerging businesses",
    interestRate: "21.00% p.a.",
    processingFee: "upto 1%",
    details: flexibleDetails
  },
  {
    name: "L&T Finance Limited",
    slug: "lt-finance",
    tagline: "Focused on business sustainability",
    interestRate: "17.75% p.a.",
    processingFee: "upto 1%",
    details: defaultDetails
  },
  {
    name: "Lendingkart Finance Limited",
    slug: "lendingkart",
    tagline: "No collateral required for MSMEs",
    interestRate: "20.50% p.a.",
    processingFee: "upto 1%",
    details: flexibleDetails
  },
  {
    name: "Muthoot Finance Ltd",
    slug: "muthoot-finance",
    tagline: "Secured & unsecured business credit",
    interestRate: "17.00% p.a.",
    processingFee: "upto 1%",
    details: defaultDetails
  },
  {
    name: "Piramal Capital",
    slug: "piramal-capital",
    tagline: "Innovative multi-category loans",
    interestRate: "18.25% p.a.",
    processingFee: "upto 1%",
    details: { ...defaultDetails, products: odProducts }
  },
  {
    name: "Poonawalla Fincorp Limited",
    slug: "poonawalla-fincorp",
    tagline: "Transparent and paperless processing",
    interestRate: "16.99% p.a.",
    processingFee: "upto 1%",
    details: defaultDetails
  },
  {
    name: "SMFG India Credit",
    slug: "smfg-india",
    tagline: "Sumitomo Mitsui Financial Group backing",
    interestRate: "17.50% p.a.",
    processingFee: "upto 1%",
    details: defaultDetails
  },
  {
    name: "Standard Chartered Bank",
    slug: "standard-chartered",
    tagline: "International expertise in SME credit",
    interestRate: "15.99% p.a.",
    processingFee: "upto 1%",
    details: defaultDetails
  },
  {
    name: "Svakarma Finance",
    slug: "svakarma-finance",
    tagline: "Social impact focused business credit",
    interestRate: "19.50% p.a.",
    processingFee: "upto 1%",
    details: defaultDetails
  },
  {
    name: "Tata Capital Limited",
    slug: "tata-capital",
    tagline: "Trusted values, modern solutions",
    interestRate: "16.25% p.a.",
    processingFee: "upto 1%",
    details: { ...defaultDetails, products: odProducts }
  },
  {
    name: "U Gro Capital Ltd",
    slug: "u-gro-capital",
    tagline: "Data-driven sector specialists",
    interestRate: "18.75% p.a.",
    processingFee: "upto 1%",
    details: defaultDetails
  },
  {
    name: "Yes Bank Limited",
    slug: "yes-bank",
    tagline: "Technology-enabled fast track credit",
    interestRate: "16.50% p.a.",
    processingFee: "upto 1%",
    details: {
      ...defaultDetails,
      benefits: [
        "Yes Robot assistance",
        "Customizable repayment",
        "Reward points on early payment",
        "Global business access"
      ]
    }
  }
];
