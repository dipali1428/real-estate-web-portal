
import mfApi from "./mutualfunds/mfApi";
// app/services/mutualfundservice.ts

export interface AmfiFund {
  schemeCode: string;
  name: string;
  nav: string;
  date: string;
  fundHouse: string;
  category?: string;
  type?: string;
  risk?: string;
}

export interface NavEntry {
  date: string;
  nav: string;
}

export interface FundDetails {
  meta: {
    scheme_code: number;
    scheme_name: string;
    fund_house: string;
    scheme_category?: string;
    type?: string;
    risk?: string;
  };
  data: NavEntry[];
}

export interface DashboardData {
  summary: {
    total_invested: string;
    total_value: string;
    total_gain: string;
    gain_percentage: string;
    sip_total: string;
    active_sips: number;
  };
  allocation: { name: string; value: number; percentage: string }[];
  product_allocation: { name: string; value: number; percentage: string }[];
  recentActivity: any[];
}

export interface InvestmentRecord {
  id: number;
  fund_name: string;
  scheme_code: string;
  amount: string;
  current_value: string;
  returns_pct: string;
  category: string;
  investment_type: string;
  created_at: string;
}

export const mutualFundService = {

  searchFunds: async (query: string): Promise<AmfiFund[]> => {
    try {
      const response = await mfApi.get<AmfiFund[]>("/products/investments/mutual-funds/search", {
        params: { q: query },
      });

      return response.data || [];
    } catch (error: any) {
      return [];
    }
  },


  getFundDetails: async (
    schemeCode: string | number
  ): Promise<FundDetails | null> => {
    try {
      const response = await mfApi.get<FundDetails>(
        `/products/investments/mutual-funds/details/${schemeCode}`
      );

      return response.data;
    } catch (error: any) {
      return null;
    }
  },

  /**
   * 🚀 Top Performing Funds
   */
  getTopPerforming: async (): Promise<AmfiFund[]> => {
    try {
      const response = await mfApi.get<AmfiFund[]>(
        "/products/investments/mutual-funds/top-performing"
      );

      return response.data || [];
    } catch (error: any) {
      return [];
    }
  },

  getDashboardData: async (): Promise<DashboardData | null> => {
    try {
      const response = await mfApi.get<DashboardData>("/products/investments/mutual-funds/dashboard");
      return response.data;
    } catch (error) {
      return null;
    }
  },

  getInvestments: async (): Promise<InvestmentRecord[]> => {
    try {
      const response = await mfApi.get<InvestmentRecord[]>("/products/investments/mutual-funds/investments");
      return response.data || [];
    } catch (error) {
      return [];
    }
  },

  addInvestment: async (payload: {
    fund_name: string;
    scheme_code: string | number;
    amount: number;
    category: string;
    investment_type: string;
  }) => {
    try {
      const response = await mfApi.post("/products/investments/mutual-funds/investments", payload);
      return response.data;
    } catch (error: any) {
      throw error?.response?.data || error;
    }
  },
};

export default mutualFundService;