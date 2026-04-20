import api from "./api";

// ==================== TYPES ====================

export interface UnlistedDashboardStats {
  total_users: string;
  total_companies: string;
  total_transactions: string;
  total_invested: string;
}

export interface Share {
  id: number;
  shares_name: string;
  logo_url: string | null;
  price: string;
  depository_applicable: string;
  min_lot_size: number;
  created_at?: string;
  updated_at?: string;
  clean_name?: string | null;
  is_active?: boolean;
  status?: string;
}

export interface UnlistedUser {
  id: number;
  adv_id: string;
  name: string;
  email: string;
  role: string;
  date_joined: string;
  mobile: string;
}

export interface UnlistedTransaction {
  txn_id: number;
  user: string;
  asset: string;
  transaction_type: string;
  quantity: number;
  price: string;
  total_amount: string;
  status: string;
  timestamp: string;
}

export interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'PENDING' | 'RESOLVED';
  createdAt: string;
}

export interface SharePriceGraphData {
  share_id: number;
  company_name: string;
  price_history: {
    date: string;
    price: number;
  }[];
}

// ==================== PAYLOAD TYPES ====================

export interface AddUserPayload {
  name: string;
  email: string;
  mobile: string;
  role?: string;
  adv_id?: string;
  password?: string;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
  mobile?: string;
  role?: string;
  adv_id?: string;
}

export interface AddSharePayload {
  shares_name: string;
  logo_url?: string;
  price: string;
  depository_applicable: string;
  min_lot_size: number;
}

export interface UpdateSharePayload {
  shares_name?: string;
  logo_url?: string;
  price?: string;
  depository_applicable?: string;
  min_lot_size?: number;
  clean_name?: string;
  is_active?: boolean;
  status?: string;
}

export interface AddTransactionPayload {
  user_id: number;
  asset: string;
  transaction_type: string;
  quantity: number;
  price: string;
  total_amount: string;
}

export interface CreateEnquiryPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface DematDetails {
  id: number;
  user_id: number;
  dp_id: string;
  client_id: string;
  depository: string;
  demat_name: string;
  created_at: string;
}

export interface DematListResponse {
  success: boolean;
  data: DematDetails[];
}

// ==================== ADMIN SERVICE ====================

export const AdminService = {

  // ==================== DASHBOARD ====================

  getDashboardStats: async (): Promise<UnlistedDashboardStats> => {
    const response = await api.get("/api/unlisted/admin/dashboard");
    return response.data;
  },

  // ==================== SHARES ====================

  getShares: async (): Promise<Share[]> => {
    const response = await api.get("/api/unlisted/public/shares");
    return response.data;
  },

  addShare: async (payload: AddSharePayload) => {
    const cleanPayload: any = {
      shares_name: payload.shares_name,
      price: payload.price,
      depository_applicable: payload.depository_applicable,
      min_lot_size: payload.min_lot_size,
    };

    if (payload.logo_url) {
      cleanPayload.logo_url = payload.logo_url;
    }

    const response = await api.post("/api/unlisted/admin/shares/add", cleanPayload);
    return response.data;
  },

  updateShare: async (id: number, payload: UpdateSharePayload) => {
    const response = await api.put(`/api/unlisted/admin/shares/update/${id}`, payload);
    return response.data;
  },

  deleteShare: async (id: number) => {
    const response = await api.delete(`/api/unlisted/admin/shares/delete/${id}`);
    return response.data;
  },

  getSharePriceGraph: async (shareId: number): Promise<SharePriceGraphData> => {
    const response = await api.get(`/api/unlisted/public/${shareId}/graph`);
    return response.data;
  },

  // ==================== USERS ====================

  getUsers: async (page: number = 1, limit: number = 10) => {
    const response = await api.get(`/api/unlisted/admin/users?page=${page}&limit=${limit}`);
    return response.data;
  },

  addUser: async (payload: AddUserPayload) => {
    const finalPayload = {
      name: payload.name,
      email: payload.email,
      phone: payload.mobile,
      mobile: payload.mobile,
      role: payload.role || 'CUSTOMER',
      adv_id: payload.adv_id || "",
      password: payload.password || "User@123"
    };

    const response = await api.post("/api/unlisted/admin/users/add", finalPayload);
    return response.data;
  },

  updateUser: async (id: number, payload: UpdateUserPayload) => {
    const response = await api.put(`/api/unlisted/admin/users/update/${id}`, payload);
    return response.data;
  },

  deleteUser: async (id: number) => {
    const response = await api.delete(`/api/unlisted/admin/users/delete/${id}`);
    return response.data;
  },

  getUserPortfolio: async (userId?: number) => {
    const url = userId
      ? `/api/unlisted/admin/user/portfolio?userId=${userId}`
      : "/api/unlisted/admin/user/portfolio";

    const response = await api.get(url);
    return response.data;
  },

  // ==================== TRANSACTIONS ====================

  getTransactions: async (limit: number = 50): Promise<UnlistedTransaction[]> => {
    const response = await api.get(`/api/unlisted/admin/transactions?limit=${limit}`);
    return response.data;
  },

  getPendingTransactions: async (): Promise<UnlistedTransaction[]> => {
    const response = await api.get("/api/unlisted/admin/transactions/pending");
    return response.data;
  },

  addTransaction: async (payload: AddTransactionPayload) => {
    const response = await api.post("/api/unlisted/admin/transactions/add", payload);
    return response.data;
  },

  approveTransaction: async (txnId: number) => {
    const response = await api.post("/api/unlisted/admin/transactions/approve", { txn_id: txnId });
    return response.data;
  },

  rejectTransaction: async (txnId: number) => {
    const response = await api.post("/api/unlisted/admin/transactions/reject", { txn_id: txnId });
    return response.data;
  },

  // ==================== ENQUIRIES ====================

  getEnquiries: async (): Promise<Enquiry[]> => {
    const response = await api.get("/api/unlisted/admin/enquiries");
    return response.data;
  },

  // ==================== LOGOUT ====================

  logout: async () => {
    const response = await api.post("/api/unlisted/admin/logout");

    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }

    return response.data;
  },

  // ==================== DEMAT ====================

  getUserDemat: async (userId: number): Promise<{ success: boolean; data: DematDetails }> => {
    const response = await api.get(`/api/unlisted/admin/user/demat/${userId}`);
    return response.data;
  },

  /**
   * Upload shares with history (Excel) - History Mode
   * POST → /api/unlisted/admin/shares/uploadSharesWithHistory?mode=history
   * Body: form-data with file field
   */
  uploadSharesWithHistoryMode: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/api/unlisted/admin/shares/uploadSharesWithHistory?mode=history", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // Returns { success, message, mode, applySoftDelete, rowsProcessed, rowsSkipped }
  },

  /**
   * Upload shares with history (Excel) - Daily Mode
   * POST → /api/unlisted/admin/shares/uploadSharesWithHistory?mode=daily
   * Body: form-data with file field
   */
  uploadSharesWithDailyMode: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/api/unlisted/admin/shares/uploadSharesWithHistory?mode=daily", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // Returns { success, message, mode, applySoftDelete, rowsProcessed, rowsSkipped }
  },
  /**
     * Upload PMS Funds (Excel)
     * POST → /api/unlisted/admin/pms/upload
     */
  uploadPMSFunds: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/api/unlisted/admin/pms/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // Returns { success, message, processed, skipped }
  },

  /**
   * Get all PMS Funds (Admin)
   * GET → /api/unlisted/admin/pms/funds
   */
  getPMSFunds: async () => {
    const response = await api.get("/api/unlisted/admin/pms/funds");
    return response.data;
  },

  /**
   * Delete a PMS Fund
   * DELETE → /api/unlisted/admin/pms/:id
   */
  deletePMSFund: async (id: number) => {
    const response = await api.delete(`/api/unlisted/admin/pms/${id}`);
    return response.data;
  },
};

