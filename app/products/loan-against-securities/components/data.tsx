import React from "react";
import {
  Landmark,
  TrendingUp,
  LineChart,
  ShieldCheck,
  Briefcase,
  PieChart,
  Users,
  Clock,
  CheckCircle,
} from "lucide-react";

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
    icon: <Landmark className="w-8 h-8 text-[#1FAD9F]" />,
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
    name: "Specialized Lenders",
    features: [
      "Industry-focused financing",
      "Asset-based lending",
      "Portfolio expertise",
    ],
    icon: <Briefcase className="w-8 h-8 text-[#1FAD9F]" />,
    color: "bg-[#E6F7F5] border-[#1FAD9F]/20",
    buttonColor:
      "text-[#1FAD9F] border-[#1FAD9F]/20 hover:border-[#1FAD9F] hover:bg-teal-50",
  },
];

export const LAS_PRODUCTS = [
  {
    title: "Mutual Funds",
    description:
      "Pledge equity, debt, hybrid, or ELSS mutual fund units for immediate capital.",
    icon: TrendingUp,
    bg: "bg-[#E6F7F5]",
    color: "text-[#1CADA3]",
    rate: "9% - 12%",
    ltv: "Up to 80%",
    popular: true,
  },
  {
    title: "Shares (Equity)",
    description:
      "Unlock funds against NSE/BSE listed large-cap and approved mid-cap shares.",
    icon: LineChart,
    bg: "bg-[#E6F0FF]",
    color: "text-[#2076C7]",
    rate: "9% - 14%",
    ltv: "Up to 50%",
  },
  {
    title: "Insurance Policies",
    description:
      "Leverage your life insurance policies (Endowment, Money-back, LIC Traditional).",
    icon: ShieldCheck,
    bg: "bg-[#E6F7F5]",
    color: "text-[#1CADA3]",
  
    rate: "10% - 13%",
    ltv: "Up to 90%",
  },
  {
    title: "Bonds",
    description:
      "Secure a loan against your fixed-income corporate, PSU, or government bonds.",
    icon: Briefcase,
    bg: "bg-[#E6F0FF]",
    color: "text-[#2076C7]",
  
    rate: "9% - 12%",
    ltv: "Up to 80%",
  },
  {
    title: "ETFs",
    description:
      "Use Exchange Traded Funds (Gold, Nifty, Bank ETFs) as collateral for your loan.",
    icon: PieChart,
    bg: "bg-[#E6F7F5]",
    color: "text-[#1CADA3]",
    rate: "9% - 13%",
    ltv: "Up to 65%",
  },
  {
    title: "Govt Securities",
    description:
      "Get the lowest interest rates by pledging sovereign risk-free securities.",
    icon: Landmark,
    bg: "bg-[#E6F0FF]",
    color: "text-[#2076C7]",

    rate: "7.5% - 10%",
    ltv: "Up to 90%",
  },
];

export const PROCESS_STEPS = [
  { step: "01", title: "Apply Online", desc: "Quick digital form" },
  { step: "02", title: "KYC Check", desc: "Paperless verification" },
  { step: "03", title: "E-Approval", desc: "Instant sanction" },
  { step: "04", title: "Digital Pledge", desc: "Safe & Secure" },
  { step: "05", title: "Disbursal", desc: "Funds in 24 hours" },
];

export const ELIGIBILITY_ITEMS = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Resident Indian",
    desc: "Individual, HUF, or Corporate entity",
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Eligible Securities",
    desc: "Own approved securities in Demat or folio",
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Valid PAN & KYC",
    desc: "Completed KYC with valid PAN card",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Age 18+",
    desc: "Must be 18 years or older to apply",
  },
];

export const FEATURES = [
  {
    icon: <TrendingUp className="text-[#2076C7]" />,
    title: "Maintain Portfolio",
    desc: "Continue earning returns, dividends, and bonuses on your investments.",
  },
  {
    icon: <Clock className="text-[#2076C7]" />,
    title: "Swift Disbursal",
    desc: "Digital application ensures funds reach your account within 24 hours.",
  },
  {
    icon: <CheckCircle className="text-[#2076C7]" />,
    title: "Flexible Repayment",
    desc: "No foreclosure charges and ability to pay back at your convenience.",
  },
];
