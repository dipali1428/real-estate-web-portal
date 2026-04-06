import { aifStrategies } from "@/app/products/aif/data/aif_funds";

export interface AIFProduct {
  name: string;
  desc: string;
  manager: string;
  theme: string;
  link: string;
  risk: string;
  horizon: string;
  color: string;
  category: string;
  returns: string;
  minInvestment: string;
  strategyDetails?: string;
  managerDescription?: string;
  coreFocusAreas?: string[];
  holdings?: { name: string; weight: string }[];
  benchmark?: string;
  inceptionDate?: string;
  investmentStyle?: string;
  portfolioSize?: string;
  performance?: { period: string; strategy: number; benchmark: number }[];
  marketCap?: { label: string; value: number }[];
  sectorAllocation?: { name: string; value: number }[];
  sectorAllocationTitle?: string;
  stageAllocationTitle?: string;
}

export const MIN_INVESTMENT_AIF = 10000000; // 1 Crore

export const aifProducts: AIFProduct[] = aifStrategies.map((strategy: any) => ({
  name: strategy.name,
  desc: strategy.desc,
  manager: strategy.manager || "Investment Team",
  theme: strategy.theme || "Growth",
  link: strategy.link,
  risk: "High Risk",
  horizon: strategy.details?.tenure || "5-7 Years",
  color: strategy.color || "#2076C7",
  category: strategy.category || "Category II",
  returns: strategy.details?.targetIRR || "18-22%",
  minInvestment: strategy.details?.minCommitment || "₹1 Crore",
  strategyDetails: strategy.details?.strategyDescription,
  managerDescription: strategy.details?.managerDescription,
  coreFocusAreas: strategy.details?.coreFocusAreas || [],
  benchmark: strategy.details?.fees?.hurdle || "As per PPM",
  inceptionDate: "N/A",
  investmentStyle: strategy.theme || "Growth",
  portfolioSize: strategy.details?.structure || "Closed-Ended",
  sectorAllocationTitle: strategy.details?.graphs?.sectorAllocationTitle || "Sector Allocation",
  stageAllocationTitle: strategy.details?.graphs?.stageAllocationTitle || "Stage Allocation",
  marketCap: strategy.details?.graphs?.sectorAllocation?.map((s: any) => ({ label: s.name, value: s.value })) || [],
  sectorAllocation: strategy.details?.graphs?.stageAllocation?.map((s: any) => ({ name: s.name, value: s.value })) || [],
  holdings: []
}));
