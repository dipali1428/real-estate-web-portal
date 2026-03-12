import React from "react";
import {
  Briefcase,
  Building2,
  Factory,
  FileText,
  Users,
  ShieldCheck,
  Target,
  Award,
  Zap,
  TrendingUp,
  Activity,
  Clock,
  Shield,
  Gem,
  Landmark,
  Truck,
  Stethoscope,
  Utensils,
  Store,
  Building,
  Laptop,
} from "lucide-react";

/* TYPE */

export type LoanProduct = {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  tenure: string;
};

/* --- DATA ARRAYS --- */
export const COMMERCIAL_PRODUCTS: LoanProduct[] = [
  {
    title: "Working Capital Loans",
    description:
      "For day-to-day operations (buying raw materials, paying wages). Includes Cash Credit (CC) and Overdraft (OD) facilities.",
    icon: <Briefcase className="w-6 h-6" />,
    features: ["Cash Credit (CC)", "Overdraft (OD)", "Daily operations"],
    tenure: "12-36 Months",
  },
  {
    title: "Term Loans",
    description:
      "Used for long-term investments like business expansion or buying office space.",
    icon: <Building2 className="w-6 h-6" />,
    features: ["Business expansion", "High value", "Structured EMI"],
    tenure: "Up to 60 Months",
  },
  {
    title: "Machinery/Equipment Finance",
    description:
      "Loans specifically to purchase plant machinery. The machine itself usually acts as the collateral.",
    icon: <Factory className="w-6 h-6" />,
    features: ["Machine as collateral", "Tax benefits", "Up to 80% funding"],
    tenure: "Up to 84 Months",
  },
  {
    title: "Invoice Discounting",
    description:
      "Allows you to get immediate cash by 'selling' your unpaid invoices to a lender.",
    icon: <FileText className="w-6 h-6" />,
    features: ["Immediate cash", "Unpaid invoices", "Short-term"],
    tenure: "30-90 Days",
  },
];

export const GOVT_SCHEMES: LoanProduct[] = [
  {
    title: "PMMY (Mudra Loan)",
    description:
      "Categorized into Shishu (up to 50k), Kishore (5L), Tarun (10L), and Tarun Plus (20L). No collateral required.",
    icon: <Users className="w-6 h-6" />,
    features: ["No collateral", "Up to ₹20 Lakh", "Micro-units"],
    tenure: "Up to 5 Years",
  },
  {
    title: "CGTMSE",
    description:
      "Provides a government guarantee to lenders, allowing MSMEs to get loans without traditional security/collateral.",
    icon: <ShieldCheck className="w-6 h-6" />,
    features: ["Govt guarantee", "Up to ₹5 Crore", "No security"],
   
    tenure: "Based on Lender",
  },
  {
    title: "PMEGP",
    description:
      "A credit-linked subsidy scheme for new units; offers 15–35% subsidy on the project cost.",
    icon: <Target className="w-6 h-6" />,
    features: ["15-35% Subsidy", "Up to ₹50L (Mfg)", "New units"],
    tenure: "3-7 Years",
  },
  {
    title: "Stand-Up India",
    description:
      "Specifically for SC/ST and Women entrepreneurs starting greenfield projects.",
    icon: <Award className="w-6 h-6" />,
    features: ["SC/ST & Women", "Up to ₹1 Crore", "Greenfield"],
    tenure: "Up to 7 Years",
  },
  {
    title: "PSB Loans in 59 Min",
    description:
      "An online portal for quick in-principle approval from Public Sector Banks.",
    icon: <Zap className="w-6 h-6" />,
    features: ["59 min app", "Up to ₹5 Crore", "PSB backed"],
    tenure: "Varies",
  },
];

export const HIGHLIGHTS = [
  {
    title: "Loan Amount",
    value: "Up to ₹5 Crore",
    icon: <TrendingUp size={18} />,
    desc: "For established businesses",
  },
  {
    title: "Interest Rate",
    value: "Starting 10.5% p.a.",
    icon: <Activity size={18} />,
    desc: "Based on credit profile",
  },
  {
    title: "Approval Time",
    value: "24–72 Hours",
    icon: <Clock size={18} />,
    desc: "Digital-first process",
  },
  {
    title: "No Collateral",
    value: "Available",
    icon: <Shield size={18} />,
    desc: "Unsecured options",
  },
  {
    title: "Tenure",
    value: "Up to 120 Months",
    icon: <Gem size={18} />,
    desc: "For machinery loans",
  },
  {
    title: "Paperwork",
    value: "Minimal Digital",
    icon: <FileText size={18} />,
    desc: "Upload & approve",
  },
];

export const DOCUMENTS = [
  {
    category: "KYC & Identity",
    items: [
      "PAN Card (Promoters & Business)",
      "Aadhaar Card of Promoters",
      "Passport / Voter ID (Optional)",
    ],
  },
  {
    category: "Business Proof",
    items: [
      "Business Registration Certificate",
      "Partnership Deed / MoA & AoA",
      "Udyam Registration (for MSMEs)",
      "Utility Bill for Business Address",
    ],
  },
  {
    category: "Financial Documents",
    items: [
      "Last 12 Months GST Returns",
      "12 Months Bank Statements ",
      "ITR & Audited Financials ",
      "CMA Data / Projected Financials",
    ],
  },
  {
    category: "Credit & Other Reports",
    items: [
      "CIBIL / Credit Report of Promoters",
      "CMR / Business Credit Report",
      "Existing Loan Sanction Letters",
      "Ownership Proof of Asset",
    ],
  },
];

export const FAQ = [
  {
    q: "Is collateral mandatory for an SME loan?",
    a: "No, we facilitate unsecured business loans through our lending partners where no collateral is required. Approval is based on business vintage and financials. For larger amounts above ₹2 Crore, secured options may be recommended for better rates.",
  },
  {
    q: "How soon can I get the funds?",
    a: "Digital approval typically happens within 24 hours, and disbursal occurs within 3 working days after document verification. For pre-approved customers, funds can be credited within 24 hours.",
  },
  {
    q: "What is the minimum turnover required?",
    a: "Generally, a minimum annual turnover of ₹10 Lakhs is required for most of our SME lending products. However, startups with strong business models may qualify through our partner NBFCs.",
  },
  {
    q: "Can I prepay my SME loan?",
    a: "Yes, prepayment options are available. The terms vary by lending partner; some offer zero foreclosure charges after a certain period. Typically, floating rate loans have no prepayment penalties.",
  },
  {
    q: "What credit score is needed?",
    a: "Most lenders prefer a CIBIL score of 700+ for unsecured business loans. However, we work with multiple partners who consider overall business health, cash flows, and industry potential.",
  },
  {
    q: "Do you fund new businesses?",
    a: "Yes, we have specialized programs for businesses with 6-12 months of operations. These may require a stronger business plan, promoter contribution, or collateral options.",
  },
  {
    q: "What industries are eligible for SME loans?",
    a: "We cater to a wide range of industries including Manufacturing, Retail, IT Services, Healthcare, Logistics, and FMCG. Specialized products are available for sector-specific needs.",
  },
  {
    q: "Is there an overlapping limit with my existing loans?",
    a: "Lenders look at your repayment capacity (FOIR - Fixed Obligation to Income Ratio). If you have enough cash flow to service additional EMIs, existing loans won't necessarily stop you from getting a new one.",
  },
  {
    q: "Can I use the SME loan for multiple purposes?",
    a: "Yes, working capital loans and business expansion loans can be used interchangeably for inventory, payroll, marketing, and minor equipment purchases as long as it supports business growth.",
  },
  {
    q: "Are government schemes applicable to all SMEs?",
    a: "Schemes like CGTMSE and PMEGP have specific eligibility criteria such as manufacturing or service sector focus, maximum project cost, and promoter category. We guide you to the schemes that best fit your profile.",
  },
];

export const LENDER_TYPES = [
  {
    name: "Public Sector Banks",
    features: [
      "Nationwide presence",
      "Competitive interest rates",
      "Government-backed schemes",
    ],
    icon: <Landmark className="w-8 h-8 text-[#0056D2]" />,
    color: "bg-[#E6F0FF] border-[#0056D2]/20",
    buttonColor:
      "text-[#0056D2] border-[#0056D2]/20 hover:border-[#0056D2] hover:bg-blue-50",
  },
  {
    name: "Private Sector Banks",
    features: ["Faster approvals", "Flexible products", "Digital processing"],
    icon: <Building2 className="w-8 h-8 text-[#1FAD9F]" />,
    color: "bg-[#E6F7F5] border-[#1FAD9F]/20",
    buttonColor:
      "text-[#1FAD9F] border-[#1FAD9F]/20 hover:border-[#1FAD9F] hover:bg-teal-50",
  },
  {
    name: "NBFC Lenders",
    features: ["Quick disbursal", "Flexible eligibility", "Startup-friendly"],
    icon: <Briefcase className="w-8 h-8 text-[#0056D2]" />,
    color: "bg-[#E6F0FF] border-[#0056D2]/20",
    buttonColor:
      "text-[#0056D2] border-[#0056D2]/20 hover:border-[#0056D2] hover:bg-blue-50",
  },
  {
    name: "Specialized MSME Lenders",
    features: [
      "Industry-focused financing",
      "Machinery loans",
      "Working capital expertise",
    ],
    icon: <Factory className="w-8 h-8 text-[#1FAD9F]" />,
    color: "bg-[#E6F7F5] border-[#1FAD9F]/20",
    buttonColor:
      "text-[#1FAD9F] border-[#1FAD9F]/20 hover:border-[#1FAD9F] hover:bg-teal-50",
  },
];

export const INDUSTRIES_SERVED = [
  {
    title: "Manufacturing, Steel & Defense",
    icon: Factory,
    desc: "Machinery loans for Heavy Engineering, Defense, Textiles, Sugar & Ethanol.",
  },
  {
    title: "Retail, Traders & E-commerce",
    icon: Store,
    desc: "Inventory financing, POS-based loans, and supply chain credit for traders.",
  },
  {
    title: "Logistics & Shipping",
    icon: Truck,
    desc: "Fleet expansion loans, commercial vehicle finance, and shipping vessel credit.",
  },
  {
    title: "Healthcare, Pharma & Hospitals",
    icon: Stethoscope,
    desc: "Medical equipment leasing, hospital infrastructure loans, and working capital.",
  },
  {
    title: "Hotels, Food & Hospitality",
    icon: Utensils,
    desc: "Restaurant & hotel expansion capital, and kitchen equipment loans.",
  },
  {
    title: "Infra & Real Estate",
    icon: Building2,
    desc: "Project financing, heavy equipment leasing, and working capital for contractors.",
  },
  {
    title: "Education & Institutions",
    icon: Building,
    desc: "Infrastructure expansion, smart-class upgrades, and working capital facilities.",
  },
  {
    title: "IT & Digital Services",
    icon: Laptop,
    desc: "Tech stack upgrades, office infrastructure loans, and service-export credit.",
  },
  {
    title: "NBFCs & Financial Entities",
    icon: Landmark,
    desc: "Term loans, working capital, and specialized credit lines for on-lending.",
  },
];

export const LOAN_STATS_DATA = [
  { name: "Working Capital", minAPR: 10.5, maxAPR: 15, maxLoan: 200 },
  { name: "Machinery", minAPR: 9.5, maxAPR: 13, maxLoan: 500 },
  { name: "Unsecured", minAPR: 12, maxAPR: 19, maxLoan: 75 },
  { name: "Credit Line", minAPR: 11, maxAPR: 16, maxLoan: 100 },
];
