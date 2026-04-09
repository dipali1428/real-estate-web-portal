export interface VehicleLoanBank {
  name: string;
  slug: string;
  tagline: string;
  interestRate: string;
  processingFee: string;
  isLowestRate?: boolean;
  logo?: string;
  details: {
    products: string[];
    eligibility: string[];
    maxLoanAmount: string;
    maxTenure: string;
  };
}

export const VehicleLoanBanks: VehicleLoanBank[] = [
  {
    name: "Bank of India",
    slug: "bank-of-india",
    tagline: "Low interest rates with flexible tenure",
    interestRate: "7.60% - 7.85% p.a.",
    processingFee: "0.25% (Min ₹2,500, Max ₹10,000)",
    details: {
      products: ["New Car Loan", "Used Car Loan", "Two Wheeler Loan", "Commercial Vehicle"],
      eligibility: [
        "Age between 21 to 65 years",
        "Minimum monthly income: ₹25,000",
        "Salaried or Self-employed with stable income",
        "Good CIBIL score (750+ preferred)"
      ],
      maxLoanAmount: "Up to 90% of on-road price",
      maxTenure: "Up to 84 Months"
    }
  },
  {
    name: "Bank of Maharashtra",
    slug: "bank-of-maharashtra",
    tagline: "Zero processing fees and competitive rates",
    interestRate: "7.45% - 8.90% p.a.",
    processingFee: "NIL",
    details: {
      products: ["Maha Super Car Loan", "Two Wheeler Loan", "EV Financing"],
      eligibility: [
        "Salaried employees of Central/State Govt/PSUs",
        "Professionals and Self-employed individuals",
        "Minimum income: ₹3.00 Lakhs per annum",
        "Resident Indian or NRI"
      ],
      maxLoanAmount: "Up to 100% for New Car ex-showroom",
      maxTenure: "Up to 84 Months"
    }
  },
  {
    name: "Bandhan Bank",
    slug: "bandhan-bank",
    tagline: "Quick and easy vehicle financing",
    interestRate: "Starts from 9.47% p.a.",
    processingFee: "Up to 3% + GST",
    details: {
      products: ["Passenger Vehicle Loan", "Commercial Vehicle Loan", "Used Car Loan"],
      eligibility: [
        "Age: 21 to 60 years",
        "Minimum 1 year in current job/business",
        "Income: ₹25,000 monthly (Net)",
        "Property owner/Resident in same city for 1 year"
      ],
      maxLoanAmount: "Up to ₹100 Lakhs",
      maxTenure: "Up to 60 Months"
    }
  },
  {
    name: "Central Bank of India",
    slug: "central-bank-of-india",
    tagline: "Cent Vehicle Loan - Easy credit",
    interestRate: "7.60% - 9.25% p.a.",
    processingFee: "0.50% (Min ₹2,000, Max ₹10,000)",
    details: {
      products: ["Cent Vehicle Loan", "Cent Two Wheeler", "Cent Commercial Vehicle"],
      eligibility: [
        "Permanent employees of Govt/PSU/Reputed Firms",
        "Self-employed Professionals and Businessmen",
        "Minimum Age: 18 years",
        "Debt-Income ratio below 60%"
      ],
      maxLoanAmount: "Up to 90% of on-road price",
      maxTenure: "Up to 84 Months"
    }
  },
  {
    name: "Indian Overseas Bank",
    slug: "indian-overseas-bank",
    tagline: "Pusan Vehicle Loan - Special rates",
    interestRate: "7.55% - 7.80% p.a.",
    processingFee: "~0.50% + GST",
    details: {
      products: ["IOB Car Loan Solution", "Pushpaka Two Wheeler", "Clean Energy EV Loan"],
      eligibility: [
        "Salaried individuals with 1 year service",
        "Self-employed with 2 years in business",
        "Minimum monthly income: ₹20,000",
        "Good repayment capacity"
      ],
      maxLoanAmount: "Up to 90% cost of vehicle",
      maxTenure: "Up to 84 Months"
    }
  },
  {
    name: "Karnataka Bank",
    slug: "karnataka-bank",
    tagline: "KBL Car Loan - Quick approval",
    interestRate: "8.00% - 9.07% p.a.",
    processingFee: "0.60% (Min ₹2,500, Max ₹11,000)",
    details: {
      products: ["KBL Xpress Car Loan", "Electric Vehicle Special", "Pre-owned Cars"],
      eligibility: [
        "Individuals / Proprietorship concerns",
        "Income: 3x of proposed annual EMI",
        "Age between 21 to 65 years",
        "Valid driving license is mandatory"
      ],
      maxLoanAmount: "Up to 100% on ex-showroom price",
      maxTenure: "Up to 84 Months"
    }
  },
  {
    name: "Union Bank of India (UBI SERVICES)",
    slug: "union-bank-of-india",
    tagline: "Union Miles - Minimum documentation",
    interestRate: "7.40% - 8.85% p.a.",
    processingFee: "Up to ₹1,000",
    details: {
      products: ["Union Miles", "Union Green EV", "Commercial Vehicle Plus"],
      eligibility: [
        "Individuals (Salaried/Self-employed)",
        "Minimum age: 18 years",
        "Maximum age: 70 years",
        "Good CIBIL score record"
      ],
      maxLoanAmount: "Up to ₹200 Lakhs",
      maxTenure: "Up to 84 Months"
    }
  },
  {
    name: "Saraswat Bank",
    slug: "saraswat-bank",
    tagline: "100% funding on ex-showroom price",
    interestRate: "8.55% - 9.60% p.a.",
    processingFee: "NIL up to ₹1 Cr",
    details: {
      products: ["Super Fast Car Loan", "EV Special Scheme", "Used Car Funding"],
      eligibility: [
        "Salaried individuals with 1 year tenure",
        "Professionals and Self-employed with ITR",
        "No minimum income criteria specified",
        "Applicant should be a member/nominal member"
      ],
      maxLoanAmount: "Up to ₹1.00 Crore",
      maxTenure: "Up to 84 Months"
    }
  },
  {
    name: "Punjab & Sind Bank",
    slug: "punjab-and-sind-bank",
    tagline: "PSB Car Loan (Available in MH & GOA)",
    interestRate: "7.30% - 9.05% p.a.",
    processingFee: "0.25% (Min ₹1,000, Max ₹15,000)",
    isLowestRate: true,
    details: {
      products: ["PSB Car Loan", "PSB Apni Gadi", "Old Car Scheme"],
      eligibility: [
        "Govt/Public/Private Sector Employees",
        "Businessmen and Self-Employed Professionals",
        "Farmer and Agriculturist",
        "Income Proof for last 2 years"
      ],
      maxLoanAmount: "Up to 90% of Cost",
      maxTenure: "Up to 84 Months"
    }
  },
  {
    name: "IDBI Bank",
    slug: "idbi-bank",
    tagline: "Fast track processing for quick car delivery",
    interestRate: "7.75% - 8.75% p.a.",
    processingFee: "₹1,500 - ₹2,500 + GST",
    details: {
      products: ["IDBI Auto Loan", "EV High-Speed Loan", "Personalized Vehicle Fin"],
      eligibility: [
        "Minimum age: 18 years",
        "Maximum age: 70 years at maturity",
        "Income: ₹2.40 Lakhs p.a. (Salaried)",
        "Valid residence and identity proof"
      ],
      maxLoanAmount: "Up to 100% on ex-showroom",
      maxTenure: "Up to 84 Months"
    }
  }
];
