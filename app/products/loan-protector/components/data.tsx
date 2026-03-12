import React from "react";
import {
  TrendingDown,
  Shield,
  Home,
  Banknote,
  Heart,
  Briefcase,
  TrendingUp,
  Clock,
  Award,
  ShieldCheck,
  Activity,
  User,
  Zap,
  IndianRupee,
  Smartphone,
  Users,
  Landmark,
  Building2,
  Laptop,
  Factory,
  Lock,
} from "lucide-react";

export const BASE_RATES = [
  { maxAge: 25, rate: 850 },
  { maxAge: 30, rate: 900 },
  { maxAge: 35, rate: 1000 },
  { maxAge: 40, rate: 1200 },
  { maxAge: 45, rate: 1600 },
  { maxAge: 50, rate: 2200 },
  { maxAge: 55, rate: 3200 },
  { maxAge: 60, rate: 4800 },
  { maxAge: 65, rate: 7000 },
  { maxAge: 70, rate: 10000 },
];

export const TENURE_FACTORS = [
  { maxTenure: 5, factor: 1.0 },
  { maxTenure: 10, factor: 1.05 },
  { maxTenure: 15, factor: 1.1 },
  { maxTenure: 20, factor: 1.15 },
  { maxTenure: 25, factor: 1.2 },
  { maxTenure: 30, factor: 1.25 },
];

export const LOAN_TYPES = [
  "Home Loan",
  "Personal Loan",
  "Car Loan",
  "Business Loan",
  "Education Loan",
];

export const PLAN_TYPES = [
  {
    title: "Individual Loan Protection Plan",
    desc: "Comprehensive single-life coverage designed for primary borrowers to protect their assets.",
    icon: User,
    color: "text-[#2076C7]",
    bg: "bg-blue-50",
    factor: 1.0,
  },
  {
    title: "Joint Loan Protection Plan",
    desc: "Dual-life protection for co-borrowers or spouses, ensuring the loan is cleared if either partner faces a crisis.",
    icon: Users,
    color: "text-[#2076C7]",
    bg: "bg-blue-50",
    factor: 1.2,
  },
  {
    title: "Group Loan Protection Plan",
    desc: "Affordable, high-volume coverage for employee groups or financial institution members.",
    icon: Briefcase,
    color: "text-[#2076C7]",
    bg: "bg-blue-50",
    factor: 0.9,
  },
  {
    title: "Home Loan Protection Plan",
    desc: "High-value, long-tenure protection specifically structured for significant property liabilities.",
    icon: Home,
    color: "text-[#2076C7]",
    bg: "bg-blue-50",
    factor: 1.05,
  },
  {
    title: "Credit Life Insurance Plan",
    desc: "Flexible, short-term coverage for micro-loans, credit card balances, and personal credit lines.",
    icon: Zap,
    color: "text-[#2076C7]",
    bg: "bg-blue-50",
    factor: 0.95,
  },
];

export const features = [
  {
    icon: Shield,
    title: "Full Loan Protection",
    desc: "Ensures outstanding loan amount is paid in case of death, disability, or critical illness.",
    color: "text-[#2076C7]",
    bg: "bg-blue-50",
  },
  {
    icon: Home,
    title: "Protect Your Assets",
    desc: "Keeps your home, car, or business safe by clearing loan liabilities automatically.",
    color: "text-[#2076C7]",
    bg: "bg-blue-50",
  },
  {
    icon: Banknote,
    title: "EMI Security",
    desc: "Covers EMI payments so your family does not face financial burden.",
    color: "text-[#2076C7]",
    bg: "bg-blue-50",
  },
  {
    icon: Lock,
    title: "Financial Stability",
    desc: "Maintains your family’s financial stability during unexpected events.",
    color: "text-[#2076C7]",
    bg: "bg-blue-50",
  },
];

export const benefits = [
  {
    title: "Family Protection",
    desc: "Ensures your family is not burdened with loan repayment.",
    icon: Heart,
  },
  {
    title: "Improves Loan Approval",
    desc: "Enhances loan approval chances with added protection.",
    icon: TrendingUp,
  },
  {
    title: "Long-Term Coverage",
    desc: "Coverage continues throughout the loan tenure.",
    icon: Clock,
  },
  {
    title: "Peace of Mind",
    desc: "Provides confidence knowing liabilities are covered.",
    icon: Award,
  },
];

export const faqs = [
  {
    q: "Is loan protector insurance mandatory?",
    a: "No, it is optional. However, it is highly recommended to protect against financial risks like death, disability, or critical illness while carrying a large liability.",
  },
  {
    q: "What is the difference between Individual and Joint plans?",
    a: "Individual plans cover a single borrower. Joint plans cover two co-borrowers (like spouses), settling the loan if either person faces an unfortunate event.",
  },
  {
    q: "How does Group Loan Protection work?",
    a: "It is a cost-effective solution for employees or members of a group, offering institutional-grade protection at lower premiums.",
  },
  {
    q: "Can I use term insurance instead?",
    a: "Yes, but Loan Protector is specifically tailored to match the decreasing balance of your loan, often making it more cost-effective than a static term plan.",
  },
  {
    q: "What is Credit Life Insurance?",
    a: "It's a specialized short-term plan designed to cover smaller liabilities like credit card debt, personal lines of credit, or micro-finance loans.",
  },
  {
    q: "What illnesses and disabilities are covered?",
    a: "Critical illnesses like heart attack, cancer, and stroke are typically covered, along with permanent total and partial disabilities resulting from accidents.",
  },
  {
    q: "Does loan protector insurance cover job loss?",
    a: "Many comprehensive plans include a job loss rider that covers your EMI payments for a specific period (usually 3 to 6 months) if you are involuntarily terminated.",
  },
  {
    q: "How are the premiums paid?",
    a: "Premiums can be paid as a single upfront lump sum, which is often conveniently added to the total loan amount, or through regular installments.",
  },
  {
    q: "Can I transfer the policy if I switch my loan to another bank?",
    a: "Yes, most loan protection policies are portable. You can seamlessly transfer the coverage to the new lender without losing any accumulated benefits.",
  },
  {
    q: "Are the premiums paid for Loan Protector tax-deductible?",
    a: "Generally, premiums paid towards life and health coverage sections of the policy may be eligible for tax deductions under Sections 80C and 80D of the Income Tax Act.",
  },
];

export const coverage = [
  "Death due to natural or accidental causes",
  "Permanent total and partial disability",
  "Critical illness & Terminal illness riders",
  "Job loss coverage for salaried individuals",
  "Full outstanding loan balance settlement",
  "Coverage for co-borrowers in Joint plans",
  "Seamless transfer between lenders",
  "Flexible premium payment (Single/Regular)",
];

export const INSURANCE_PARTNER_TYPES = [
  {
    name: "Public Sector Insurers",
    features: [
      "Government-backed reliability",
      "Nationwide network & reach",
      "High trust & stability",
    ],
    icon: Landmark,
    color: "bg-white border-blue-100",
    textColor: "text-[#2076C7]",
  },
  {
    name: "Private Sector Insurers",
    features: [
      "Tech-driven fast claims",
      "Customized corporate packages",
      "Global reinsurance backing",
    ],
    icon: Building2,
    color: "bg-white border-blue-100",
    textColor: "text-[#2076C7]",
  },
  {
    name: "Digital-First Insurers",
    features: [
      "Paperless onboarding",
      "Instant policy approvals",
      "App-based claim tracking",
    ],
    icon: Laptop,
    color: "bg-white border-blue-100",
    textColor: "text-[#2076C7]",
  },
  {
    name: "Specialized Commercial Insurers",
    features: [
      "Industry-specific coverage",
      "Complex risk underwriting",
      "Dedicated loss assessors",
    ],
    icon: Factory,
    color: "bg-white border-blue-100",
    textColor: "text-[#2076C7]",
  },
];
