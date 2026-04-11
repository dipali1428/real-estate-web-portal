import api from "./api";

// ==================== TYPES ====================

interface SharesSummaryPayload {
  success?: boolean;
  totalShares?: number;
  totalMinInvestment?: number;
  highestSharePrice?: number;
  lowestSharePrice?: number;
  totalCompanies?: number;
}

interface PriceTrendPayload {
  date: string;
  avg_price: string;
}

interface BuySellTrendPayload {
  [date: string]: {
    BUY: number;
    SELL: number;
  };
}

interface HighInvestmentAlert {
  share_id: number;
  company_name: string;
  price: string;
  min_lot_size: number;
  min_investment: string;
}

interface ShareFilterPayload {
  share_id?: number;
  company_name?: string;
  price?: string;
  quantity?: number;
  min_lot_size?: number;
  min_investment?: string;
  depository?: string;
}

interface TransactionFilterPayload {
  txn_id?: number;
  user_name?: string | null;
  company_name?: string | null;
  transaction_type?: 'BUY' | 'SELL';
  quantity?: number;
  price?: string | null;
  total_amount?: string | null;
  status?: string;
  createdat?: string;
}

// ==================== ANALYTICS SERVICE ====================

export const UnlistedAnalyticsService = {
  /* ===========================
     SHARES SUMMARY - WORKING
  =========================== */
  getSharesSummary: async (): Promise<SharesSummaryPayload> => {
    const response = await api.get("/api/unlisted/admin/analytics/shares-summary");
    return response.data;
  },

  /* ===========================
     HIGH INVESTMENT ALERTS - WORKING
  =========================== */
  getHighInvestmentAlerts: async (): Promise<HighInvestmentAlert[]> => {
    const response = await api.get("/api/unlisted/admin/analytics/alerts/high-investment");
    return response.data;
  },

  /* ===========================
     EXPORT CSV - WORKING
  =========================== */
  exportSharesCSV: () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // console.error('No authentication token found');
      return;
    }
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/unlisted/admin/analytics/shares/export?token=${token}`, '_blank');
  },

  exportTransactionsCSV: () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // console.error('No authentication token found');
      return;
    }
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/unlisted/admin/analytics/transactions/export?token=${token}`, '_blank');
  },

  /* ===========================
     FILTER / SEARCH - WORKING
  =========================== */
  filterShares: async (params: ShareFilterPayload = {}) => {
    const response = await api.get("/api/unlisted/admin/analytics/shares/filter", { params });
    return response.data;
  },

  filterTransactions: async (params: TransactionFilterPayload = {}) => {
    const response = await api.get("/api/unlisted/admin/analytics/transactions/filter", { params });
    return response.data;
  },

  /* ===========================
     TREND / CHART DATA - WORKING
  =========================== */
  getSharePriceTrends: async (period: string = 'daily'): Promise<PriceTrendPayload[]> => {
    const response = await api.get(`/api/unlisted/admin/analytics/trends/share-price?period=${period}`);
    return response.data;
  },

  getBuySellTrends: async (period: string = 'daily'): Promise<BuySellTrendPayload> => {
    const response = await api.get(`/api/unlisted/admin/analytics/trends/buy-sell?period=${period}`);
    return response.data;
  },

  /* ===========================
     SEARCH UTILITIES (Aliases for filter methods)
  =========================== */
  searchShares: async (params = {}, options = {}) => {
    return UnlistedAnalyticsService.filterShares(params);
  },

  searchTransactions: async (params = {}, options = {}) => {
    return UnlistedAnalyticsService.filterTransactions(params);
  }
};