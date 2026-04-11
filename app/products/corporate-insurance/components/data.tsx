import {
  CheckCircle2,
  ShieldCheck,
  Stethoscope,
  Heart,
  Factory,
  Users,
  Anchor,
  Shield,
  FileText,
  Briefcase,
  Lock,
  Wrench,
  Building,
  UserCheck,
  Banknote,
  Laptop,
  Store,
  Home,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  Activity,
  Handshake,
} from "lucide-react";

export interface Insurer {
  name: string;
  image: string;
  claimRatio: string;
  network: string;
  marketCap: string;
  specialty: string;
  color: string;
}

export interface InsuranceProduct {
  title: string;
  category: string;
  desc: string;
  icon: any;
  color: string;
  bg: string;
  coverage: string;
  network: string;
  waiting: string;
  claimRatio: string;
  popular?: boolean;
  premium: string;
}

export interface Industry {
  title: string;
  icon: any;
  desc: string;
}

export interface ProcessStep {
  title: string;
  desc: string;
}

export interface Benefit {
  title: string;
  desc: string;
  icon: any;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface RiskData {
  name: string;
  value: number;
  color: string;
}

export interface TrendData {
  year: string;
  CostWithoutInsurance: number;
  CostWithInsurance: number;
}

export interface DidYouKnow {
  fact: string;
  desc: string;
  icon: any;
}

export interface BusinessType {
  id: string;
  name: string;
  riskRate: number;
}

export interface LiabilityTier {
  label: string;
  premium: number;
}

export const TOP_INSURERS: Insurer[] = [
  {
    name: "HDFC ERGO",
    image: "/Logos/hdfcergo.webp",
    claimRatio: "96.71%",
    network: "13,000+",
    marketCap: "₹85,000Cr",
    specialty: "Comprehensive Business Packages",
    color: "bg-blue-50 border-blue-100",
  },
  {
    name: "ICICI Lombard",
    image: "/Logos/icicilombard.webp",
    claimRatio: "98.54%",
    network: "12,500+",
    marketCap: "₹92,000Cr",
    specialty: "Tech-driven Claims Processing",
    color: "bg-orange-50 border-orange-100",
  },
  {
    name: "New India Assurance",
    image: "/Logos/newindia.webp",
    claimRatio: "92.30%",
    network: "15,000+",
    marketCap: "₹1,20,000Cr",
    specialty: "Public Sector Reliability",
    color: "bg-green-50 border-green-100",
  },
  {
    name: "Tata AIG",
    image: "/Logos/tataaig.png",
    claimRatio: "97.10%",
    network: "11,000+",
    marketCap: "₹78,000Cr",
    specialty: "Best for Liability Insurance",
    color: "bg-slate-50 border-slate-100",
  },
  {
    name: "Bajaj Allianz",
    image: "/Logos/bajaj.webp",
    claimRatio: "98.00%",
    network: "10,000+",
    marketCap: "₹80,000Cr",
    specialty: "Customer-Centric Services",
    color: "bg-indigo-50 border-indigo-100",
  },
  {
    name: "SBI General",
    image: "/Logos/sbigeneral.webp",
    claimRatio: "95.50%",
    network: "14,000+",
    marketCap: "₹65,000Cr",
    specialty: "Wide Reach & Trust",
    color: "bg-teal-50 border-teal-100",
  },
  {
    name: "goDigit Insurance",
    image: "/Logos/digit.png",
    claimRatio: "96.04%",
    network: "5,900+",
    marketCap: "₹28,000Cr",
    specialty: "Digital-First General Insurance",
    color: "bg-violet-50 border-violet-100",
  },
  {
    name: "Cholamandalam MS",
    image: "/Logos/Chola Ms.png",
    claimRatio: "95.80%",
    network: "7,200+",
    marketCap: "₹22,000Cr",
    specialty: "SME & Motor Insurance",
    color: "bg-amber-50 border-amber-100",
  },
  {
    name: "Royal Sundaram",
    image: "/Logos/royal.png",
    claimRatio: "94.50%",
    network: "5,000+",
    marketCap: "₹18,000Cr",
    specialty: "Complete Business Protection",
    color: "bg-rose-50 border-rose-100",
  },
  {
    name: "Future Generali",
    image: "/Logos/future.png",
    claimRatio: "95.20%",
    network: "6,000+",
    marketCap: "₹15,000Cr",
    specialty: "Retail & SME Corporate Plans",
    color: "bg-orange-50 border-orange-100",
  },
  {
    name: "Zurich Kotak",
    image: "/Logos/Zurich.jpg",
    claimRatio: "95.80%",
    network: "5,500+",
    marketCap: "₹32,000Cr",
    specialty: "Global Expertise, Indian Market",
    color: "bg-sky-50 border-sky-100",
  },
  {
    name: "Liberty General",
    image: "/Logos/liberty.png",
    claimRatio: "90.50%",
    network: "5,000+",
    marketCap: "₹12,000Cr",
    specialty: "Motor & Commercial Lines",
    color: "bg-green-50 border-green-100",
  },
];

export const PRODUCTS: InsuranceProduct[] = [
  {
    title: "Group Personal Accident (GPA) Cover",
    category: "Accident",
    desc: "24x7 accident coverage for all employees — covers accidental death, permanent disability, temporary disability, and medical expenses arising from accidents.",
    icon: ShieldCheck,
    color: "text-[#1CADA3]",
    bg: "bg-[#1CADA3]/5",
    coverage: "₹5L – ₹1Cr per employee",
    network: "Pan India + Worldwide",
    waiting: "No waiting period",
    claimRatio: "98%",
    popular: true,
    premium: "Starts at ₹200/emp/year",
  },
  {
    title: "Group Medical Cover (GMC)",
    category: "Health",
    desc: "Comprehensive cashless hospitalisation cover for employees and their families — includes pre & post hospitalisation, day-care procedures, maternity, and OPD benefits.",
    icon: Stethoscope,
    color: "text-[#1CADA3]",
    bg: "bg-[#1CADA3]/5",
    coverage: "₹1L – ₹10L per/emp + family",
    network: "10,000+ network hospitals",
    waiting: "30 days (waived for accidents)",
    claimRatio: "96%+",
    popular: true,
    premium: "Starts at ₹400/emp/month",
  },
  {
    title: "Group Term Life (GTL)",
    category: "Life",
    desc: "Life insurance for the entire workforce — provides a lump-sum payout to the nominee in case of an employee's death during service, at very low group premium rates.",
    icon: Heart,
    color: "text-[#1CADA3]",
    bg: "bg-[#1CADA3]/5",
    coverage: "2× – 5× annual CTC per/emp",
    network: "All major life insurers",
    waiting: "No waiting period",
    claimRatio: "99%+",
    popular: true,
    premium: "Starts at ₹100/emp/year",
  },
  {
    title: "Bharat Laghu Udyam Policy",
    category: "Property",
    desc: "Commercial property insurance for mid-size businesses with assets ₹5Cr–₹50Cr.",
    icon: Factory,
    color: "text-[#1CADA3]",
    bg: "bg-[#1CADA3]/5",
    coverage: "₹5Cr – ₹50Cr",
    network: "Pan India",
    waiting: "7 days",
    claimRatio: "94%",
    premium: "Based on asset value",
  },
  {
    title: "Workmen Compensation",
    category: "Liability",
    desc: "Mandatory protection for employee injury, disability, or death during employment.",
    icon: Users,
    color: "text-[#1CADA3]",
    bg: "bg-[#1CADA3]/5",
    coverage: "Based on wages (min ₹4L cover)",
    network: "Pan India",
    waiting: "Immediate coverage",
    claimRatio: "98%",
    premium: "0.5% - 2% of wages",
  },
  {
    title: "Marine & Transit Insurance",
    category: "Property",
    desc: "Coverage for goods transported via road, rail, air, or sea.",
    icon: Anchor,
    color: "text-[#1CADA3]",
    bg: "bg-[#1CADA3]/5",
    coverage: "CIF value + 10%",
    network: "International",
    waiting: "Immediate",
    claimRatio: "94%",
    premium: "0.2% - 0.8% of consignment ",
  },
  {
    title: "General Liability Insurance",
    category: "Liability",
    desc: "Protection against third-party injury, property damage, or legal claims.",
    icon: Shield,
    color: "text-[#1CADA3]",
    bg: "bg-[#1CADA3]/5",
    coverage: "₹1Cr - ₹50Cr",
    network: "Pan India",
    waiting: "15 days",
    claimRatio: "89%",
    premium: "₹10,000 - ₹2L annually",
  },
  {
    title: "Professional Indemnity",
    category: "Liability",
    desc: "Protection against claims due to professional negligence or service errors.",
    icon: FileText,
    color: "text-[#1CADA3]",
    bg: "bg-[#1CADA3]/5",
    coverage: "₹10L - ₹10Cr",
    network: "IT, consulting, finance",
    waiting: "Retroactive cover available",
    claimRatio: "91%",
    premium: "0.5% - 2% of sum insured",
  },
  {
    title: "Directors & Officers Insurance",
    category: "Liability",
    desc: "Protect company directors from personal liability claims.",
    icon: Briefcase,
    color: "text-[#1CADA3]",
    bg: "bg-[#1CADA3]/5",
    coverage: "₹1Cr - ₹25Cr",
    network: "All companies",
    waiting: "30 days",
    claimRatio: "88%",
    premium: "₹25,000 - ₹5L annually",
  },
  {
    title: "Cyber Insurance",
    category: "Cyber",
    desc: "Coverage against hacking, ransomware, and data breaches.",
    icon: Lock,
    color: "text-[#1CADA3]",
    bg: "bg-[#1CADA3]/5",
    coverage: "₹25L - ₹10Cr",
    network: "24/7 incident response",
    waiting: "7 days",
    claimRatio: "86%",
    popular: true,
    premium: "₹15,000 - ₹3L annually",
  },
  {
    title: "Contractor All Risk",
    category: "Property",
    desc: "Coverage for construction projects against accidental damage.",
    icon: Factory,
    color: "text-[#1CADA3]",
    bg: "bg-[#1CADA3]/5",
    coverage: "Project value based",
    network: "Infrastructure sector",
    waiting: "Immediate",
    claimRatio: "93%",
    premium: "0.3% - 1% of project value",
  },
  {
    title: "Contractors Plant & Machinery (CPM)",
    category: "Property",
    desc: "Comprehensive cover for construction machinery and equipment against accidental damage, breakdown, or external perils during operation or at rest.",
    icon: Wrench,
    color: "text-[#1CADA3]",
    bg: "bg-[#1CADA3]/5",
    coverage: "Market value of machinery",
    network: "Construction & Mining sectors",
    waiting: "Immediate",
    claimRatio: "90%",
    popular: false,
    premium: "0.5% - 2.5% of equipment value",
  },
  {
    title: "Office Package Policy",
    category: "Property",
    desc: "Comprehensive insurance covering office assets and liabilities.",
    icon: Building,
    color: "text-[#1CADA3]",
    bg: "bg-[#1CADA3]/5",
    coverage: "₹10L - ₹5Cr",
    network: "SMEs, startups",
    waiting: "7 days",
    claimRatio: "94%",
    premium: "₹5,000 - ₹50,000 annually",
  },
  {
    title: "Key Man Insurance",
    category: "Life",
    desc: "Protects your business against financial loss arising from the death or disability of a key employee or founder.",
    icon: UserCheck,
    color: "text-[#1CADA3]",
    bg: "bg-[#1CADA3]/5",
    coverage: "₹25L - ₹10Cr ",
    network: "All major life insurers",
    waiting: "30 days",
    claimRatio: "97%",
    popular: false,
    premium: "upto 2% of sum assured annually",
  },
  {
    title: "Surety Bonds",
    category: "Liability",
    desc: "Financial guarantee bonds for contractors, government projects, and tenders — covering bid bonds, performance bonds, advance payment bonds, and contract bonds.",
    icon: Banknote,
    color: "text-[#1CADA3]",
    bg: "bg-[#1CADA3]/5",
    coverage: "Project / Contract value based",
    network: "Govt, Infra & EPC sector",
    waiting: "Immediate on approval",
    claimRatio: "92%",
    popular: false,
    premium: "0.5% - 3% of bond value annually",
  },
];

export const INDUSTRIES: Industry[] = [
  {
    title: "IT & Software Companies",
    icon: Laptop,
    desc: "Cyber, Professional Indemnity, Group Health",
  },
  {
    title: "Manufacturing",
    icon: Factory,
    desc: "Fire, Workmen Compensation, Machinery Breakdown",
  },
  {
    title: "Construction & Infrastructure",
    icon: Building,
    desc: "Workmen Compensation, Contractor All Risk (CAR), CPM, Marine & Liability",
  },
  {
    title: "Healthcare & Hospitals",
    icon: Stethoscope,
    desc: "Medical Malpractice, Group Health, Property",
  },
  {
    title: "Retail & Shops",
    icon: Store,
    desc: "Fire, Theft, Public Liability",
  },
  {
    title: "Finance & Banking",
    icon: Banknote,
    desc: "D&O, Professional Indemnity, Cyber",
  },
  {
    title: "Startups & Corporates",
    icon: Building,
    desc: "Complete business protection packages",
  },
  {
    title: "Residential Societies",
    icon: Home,
    desc: "Property, Public Liability, Workmen Compensation",
  },
  {
    title: "Educational Institutions",
    icon: GraduationCap,
    desc: "GPA, GMC, GTL, Property & Liability Cover",
  },
];

export const PROCESS: ProcessStep[] = [
  {
    title: "Submit Your Requirement",
    desc: "Tell us about your business and insurance needs. Free consultation.",
  },
  {
    title: "Get Expert Consultation",
    desc: "Our IRDAI-certified experts analyze your risks and suggest best policies from top insurers.",
  },
  {
    title: "Compare & Choose Plan",
    desc: "Compare multiple insurers, premiums, and coverage to choose the best fit.",
  },
  {
    title: "Policy Issuance",
    desc: "Instant policy issuance with full documentation support (24-48 hrs).",
  },
];

export const BENEFITS: Benefit[] = [
  {
    title: "Complete Business Protection",
    desc: "Protect employees, assets, operations, and liabilities under one roof.",
    icon: Shield,
  },
  {
    title: "Regulatory Compliance",
    desc: "Ensure compliance with Indian labor laws, IRDAI, and corporate regulations.",
    icon: FileText,
  },
  {
    title: "Financial Security",
    desc: "Prevent large financial losses and protect revenue streams.",
    icon: Banknote,
  },
  {
    title: "Employee Satisfaction",
    desc: "Improve retention with strong employee benefits and wellness programs.",
    icon: Users,
  },
  {
    title: "Pan India Service",
    desc: "On-ground support across all major cities and states — from policy issuance to claims, wherever your business operates.",
    icon: Activity,
  },
];

export const FAQS: FAQ[] = [
  {
    q: "Is corporate insurance mandatory in India?",
    a: "Yes, certain policies like Workmen Compensation are mandatory under the Employees' Compensation Act, 1923 for businesses with employees. Other policies like Professional Indemnity may be mandatory for specific professions as per regulatory requirements.",
  },
  {
    q: "Who should buy corporate insurance?",
    a: "Any business including startups, SMEs, and large enterprises should have insurance. According to industry data, 75% of Indian businesses are underinsured, leaving them vulnerable to unexpected losses that could threaten their survival.",
  },
  {
    q: "How fast can policy be issued?",
    a: "Most policies can be issued within 24-48 hours after documentation. Group Health Insurance can be activated instantly for organizations with 20+ employees. Cyber insurance quotes are available within 2-3 hours.",
  },
  {
    q: "What is the typical claim settlement ratio?",
    a: "Top insurers like HDFC ERGO (96.71%), Bajaj General (96.78%), and New India Assurance maintain claim settlement ratios above 95%, ensuring reliable payouts when you need them most.",
  },
  {
    q: "Can I customize coverage for my industry?",
    a: "Absolutely. We work with multiple insurers to create tailored packages for IT, manufacturing, healthcare, and other sectors with specific risk profiles. Each policy is customized to your unique business needs.",
  },
  {
    q: "What does Fire & Burglary Insurance cover?",
    a: "It covers your business premises, machinery, equipment, and stock against perils like fire, lightning, explosion, riots, strikes, malicious damage, and theft or burglary involving forcible entry.",
  },
  {
    q: "Is Group Health Cover better than individual policies?",
    a: "Group Health policies usually cover pre-existing conditions from day one and waive waiting periods. They are more affordable per member and provide standardized coverage to all employees.",
  },
  {
    q: "Do you help with the claims process?",
    a: "Yes, our dedicated claims assistance team helps you navigate the entire process. We liaison directly with the TPA and the insurance company to ensure fast, hassle-free settlement.",
  },
  {
    q: "How are premiums calculated for corporate policies?",
    a: "Premiums depend on factors like employee strength, average age (for GMC), industry risk profile, asset valuation, chosen add-on covers, and previous claims history if applicable.",
  },
  {
    q: "Is Keyman Insurance tax deductible?",
    a: "Yes, premiums paid towards Keyman Insurance are generally treated as business expenses and are tax-deductible under Section 37(1) of the Income Tax Act, 1961, subject to conditions.",
  },
];

export const RISK_DATA: RiskData[] = [
  { name: "Cyber Attacks", value: 35, color: "#1CADA3" },
  { name: "Employee Health", value: 25, color: "#2076C7" },
  { name: "Property Damage", value: 20, color: "#189B8D" },
  { name: "Legal Liability", value: 15, color: "#1A68B0" },
  { name: "Theft & Fraud", value: 5, color: "#148B80" },
];

export const TREND_DATA: TrendData[] = [
  { year: "2020", CostWithoutInsurance: 50, CostWithInsurance: 40 },
  { year: "2021", CostWithoutInsurance: 80, CostWithInsurance: 45 },
  { year: "2022", CostWithoutInsurance: 120, CostWithInsurance: 50 },
  { year: "2023", CostWithoutInsurance: 160, CostWithInsurance: 55 },
  { year: "2024", CostWithoutInsurance: 200, CostWithInsurance: 60 },
];

export const DID_YOU_KNOW: DidYouKnow[] = [
  {
    fact: "43% of cyber attacks target small businesses.",
    desc: "Cyber insurance is no longer optional; it's a necessity for digital safety. Premiums start at just ₹15,000 annually for basic coverage.",
    icon: Laptop,
  },
  {
    fact: "75% of businesses are underinsured.",
    desc: "Many companies fail to update their coverage as they grow, leaving gaps in protection that could be catastrophic.",
    icon: AlertTriangle,
  },
  {
    fact: "Group Health premiums grew 9% in FY26.",
    desc: "Retail health grew even faster at 10%, showing increased awareness of health coverage needs among Indians.",
    icon: TrendingUp,
  },
];

export const BUSINESS_TYPES: BusinessType[] = [
  { id: "office", name: "Office / IT / Consulting", riskRate: 0.0005 },
  { id: "shop", name: "Retail Shop / Showroom", riskRate: 0.0015 },
  { id: "warehouse", name: "Warehouse / Godown", riskRate: 0.0025 },
  { id: "factory", name: "Factory / Manufacturing", riskRate: 0.0035 },
  { id: "restaurant", name: "Restaurant / Hotel", riskRate: 0.002 },
];

export const LIABILITY_TIERS: LiabilityTier[] = [
  { label: "Up to ₹50 Lakhs", premium: 2500 },
  { label: "₹50L - ₹2 Cr", premium: 5000 },
  { label: "₹2 Cr - ₹10 Cr", premium: 12000 },
  { label: "Over ₹10 Cr", premium: 25000 },
];

export const CLAIMS_FEATURES = [
  {
    title: "Dedicated Manager",
    desc: "A single point of contact for all your claim-related queries.",
    icon: UserCheck,
    color: "text-[#2076C7]",
    bg: "bg-[#2076C7]/10",
  },
  {
    title: "Documentation Support",
    desc: "Complete handholding with paperwork to avoid rejections.",
    icon: FileText,
    color: "text-[#1CADA3]",
    bg: "bg-[#1CADA3]/10",
  },
  {
    title: "Insurer Coordination",
    desc: "We talk to the insurers so you can focus on your business.",
    icon: Handshake,
    color: "text-[#2076C7]",
    bg: "bg-[#2076C7]/10",
  },
  {
    title: "Escalation Support",
    desc: "Priority resolution channels for complex or delayed claims.",
    icon: TrendingUp,
    color: "text-[#1CADA3]",
    bg: "bg-[#1CADA3]/10",
  },
];

export const WELLNESS_FEATURES = [
  {
    icon: Activity,
    text: "Cashless Hospitalization",
    color: "text-[#2076C7]",
  },
  {
    icon: Users,
    text: "Covers Family & Parents",
    color: "text-[#1CADA3]",
  },
  {
    icon: CheckCircle2,
    text: "Pre-existing Covered",
    color: "text-[#2076C7]",
  },
];
