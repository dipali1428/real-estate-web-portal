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

interface RecentTransaction {
  txn_id: number;
  user_name: string | null;
  company_name: string | null;
  transaction_type: 'BUY' | 'SELL';
  quantity: number;
  price: string | null;
  total_amount: string | null;
  status: string;
  timestamp?: string;
  createdat?: string;
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

interface AnalyticsAlertsPayload {
  pendingTransactions: number;
  highInvestmentAlerts: number;
}

interface HighInvestmentAlert {
  share_id: number;
  company_name: string;
  price: string;
  quantity: number;
  min_investment: string;
}

interface ShareLog {
  id: number;
  company_name: string;
  price: string;
  quantity: number;
  updated_at: string;
}

interface TransactionLog {
  txn_id: number;
  user_name: string | null;
  company_name: string | null;
  quantity: number;
  price: string | null;
  total_amount: string | null;
  status: string;
  updatedat: string;
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

interface BulkApprovePayload {
  ids: number[];
}

interface BulkDeletePayload {
  ids: (number | string)[];
}

// ==================== ANALYTICS SERVICE ====================

export const UnlistedAnalyticsService = {
  /* ===========================
     SHARES SUMMARY
  =========================== */
  getSharesSummary: async (): Promise<SharesSummaryPayload> => {
    const response = await api.get("/api/unlisted/admin/analytics/shares-summary");
    return response.data;
  },

  /* ===========================
     RECENT TRANSACTIONS
  =========================== */
  getRecentTransactions: async (limit: number = 10) => {
    const response = await api.get(`/api/unlisted/admin/analytics/transactions/recent?limit=${limit}`);
    return response.data;
  },

  /* ===========================
     PENDING SHARE UPDATES
  =========================== */
  getPendingShareUpdates: async () => {
    const response = await api.get("/api/unlisted/admin/analytics/shares/pending-updates");
    return response.data;
  },

  /* ===========================
     BULK OPERATIONS
  =========================== */
  bulkApproveShares: async (payload: BulkApprovePayload) => {
    const response = await api.post("/api/unlisted/admin/analytics/shares/bulk-approve", payload);
    return response.data;
  },

  bulkDeleteCompanies: async (payload: BulkDeletePayload) => {
    const response = await api.post("/api/unlisted/admin/analytics/companies/bulk-delete", payload);
    return response.data;
  },

  /* ===========================
     ALERTS
  =========================== */
  getPendingTransactionsCount: async () => {
    const response = await api.get("/api/unlisted/admin/analytics/alerts/pending-transactions");
    return response.data;
  },

  getHighInvestmentAlerts: async () => {
    const response = await api.get("/api/unlisted/admin/analytics/alerts/high-investment");
    return response.data;
  },

  getAlerts: async (): Promise<AnalyticsAlertsPayload> => {
    const [txns, investments] = await Promise.all([
      api.get("/api/unlisted/admin/analytics/alerts/pending-transactions"),
      api.get("/api/unlisted/admin/analytics/alerts/high-investment")
    ]);
    
    return {
      pendingTransactions: txns.data.pendingTransactions || 0,
      highInvestmentAlerts: Array.isArray(investments.data) ? investments.data.length : 0
    };
  },

  /* ===========================
     LOGS
  =========================== */
  getShareLogs: async () => {
    const response = await api.get("/api/unlisted/admin/analytics/logs/shares");
    return response.data;
  },

  getTransactionLogs: async () => {
    const response = await api.get("/api/unlisted/admin/analytics/logs/transactions");
    return response.data;
  },

  /* ===========================
     EXPORT CSV
  =========================== */
  exportSharesCSV: () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/unlisted/admin/analytics/shares/export?token=${token}`, '_blank');
  },

  exportTransactionsCSV: () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/unlisted/admin/analytics/transactions/export?token=${token}`, '_blank');
  },
    uploadSharesWithHistory: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/api/unlisted/admin/analytics/shares/import-with-history", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  uploadSharesPdfAndUpdate: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/api/unlisted/admin/analytics/shares/pdf-import", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  /* ===========================
     FILTER / SEARCH
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
     TREND / CHART DATA
  =========================== */
  getSharePriceTrends: async (period: string = 'daily') => {
    const response = await api.get(`/api/unlisted/admin/analytics/trends/share-price?period=${period}`);
    return response.data;
  },

  getBuySellTrends: async (period: string = 'daily') => {
    const response = await api.get(`/api/unlisted/admin/analytics/trends/buy-sell?period=${period}`);
    return response.data;
  },

  /* ===========================
     SEARCH / FILTER UTILITIES
  =========================== */
  searchShares: async (params = {}, options = {}) => {
    const response = await api.get("/api/unlisted/admin/analytics/shares/filter", {
      params,
      ...options
    });
    return response.data;
  },

  searchTransactions: async (params = {}, options = {}) => {
    const response = await api.get("/api/unlisted/admin/analytics/transactions/filter", {
      params,
      ...options
    });
    return response.data;
  },

  /* ===========================
     STATUS UPDATES (if needed)
  =========================== */
  updateTransactionStatus: async (id: string | number, status: string) => {
    const res = await api.put(`/api/unlisted/admin/analytics/transactions/status/${id}`, { status });
    return res.data;
  },

  updateShareStatus: async (id: string | number, status: string) => {
    const res = await api.put(`/api/unlisted/admin/analytics/shares/status/${id}`, { status });
    return res.data;
  },

  /* ===========================
     DELETE OPERATIONS (if needed)
  =========================== */
  deleteShare: async (id: string | number) => {
    const res = await api.delete(`/api/unlisted/admin/analytics/shares/${id}`);
    return res.data;
  },

  deleteTransaction: async (id: string | number) => {
    const res = await api.delete(`/api/unlisted/admin/analytics/transactions/${id}`);
    return res.data;
  }
};