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

export interface Ticket {
  id: string;
  ticket_id: string;
  category: string;
  product_type: string;
  reference_id: string;
  issue_type: string;
  subject: string;
  description: string;
  status: string;
  severity: string;
  created_at: string;
  updated_at: string;
  closed_at?: string | null;
  customer_id: string | number;
  customer_name?: string;
  customer_email?: string;
  customer_mobile?: string;
}

export interface TicketStats {
  total_tickets: number;
  open_tickets: number;
  in_progress_tickets: number;
  resolved_tickets: number;
  closed_tickets: number;
}

export interface Enquiry {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
  message: string;
  city: string | null;
  product_type: string | null; // e.g., 'SHARE', 'PMS'
  product_name: string | null;
  product_id: number | null;
  source_page: string | null;
  user_id: number | null;
  platform: string;
  customer_adv_id: string | null;
}

export interface TicketReplyPayload {
  reply_message: string;
  status: string;
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
   * Upload properties (CSV)
   * POST → /api/real-estate/upload-csv
   */
  uploadProperties: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(
      "/api/unlisted/admin/real-estate",
      formData
    );

    return response.data;
  },

  updateRealEstate: async (id: number | string, data: any) => {
    const response = await api.put(`/api/unlisted/admin/real-estate/${id}`, data);
    return response.data;
  },

  deleteRealEstate: async (id: number | string) => {
    const response = await api.delete(`/api/unlisted/admin/real-estate/${id}`);
    return response.data;
  },

  /**
   * Upload credit cards (CSV)
   */
  uploadCreditCards: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post(
      "/api/unlisted/admin/credit-card/upload",
      formData
    );

    return response.data;
  },

  getCreditCards: async () => {
    const response = await api.get("/api/unlisted/admin/credit-card/all");
    return response.data;
  },

  updateCreditCard: async (id: number | string, data: any) => {
    const response = await api.put(`/api/unlisted/admin/credit-card/${id}`, data);
    return response.data;
  },

  deleteCreditCard: async (id: number | string) => {
    const response = await api.delete(`/api/unlisted/admin/credit-card/${id}`);
    return response.data;
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
/**
   * Upload bonds data via CSV
   * POST → /api/admin/bonds/upload
   * Body: form-data with file field
   */
  uploadBonds: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/api/unlisted/admin/bonds/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    
    return response.data;
  },

 /**
   * Fetch all bonds
   * GET → /api/bonds/all
   */
  getBonds: async () => {
    const response = await api.get("/api/unlisted/admin/bonds/all");
    return response.data;
  },
  deleteBond: async (bond_id: number) => {
    const response = await api.delete(`/api/unlisted/admin/bonds/delete/${bond_id}`);
    return response.data;
  },
  updateBond: async (bond_id: number, data: any) => {
    const response = await api.put(`/api/unlisted/admin/bonds/update/${bond_id}`, data);
    return response.data;
  },

   /**
   * Upload NCDs data via CSV
   * POST → /api/unlisted/admin/ncd/upload
   */
  uploadNCDs: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/api/unlisted/admin/ncd/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  /**
   * Fetch all NCDs (Admin)
   * GET → /api/unlisted/admin/ncd/all
   */
  // getNCDs: async () => {
  //   const response = await api.get("/api/unlisted/admin/ncd/all");
  //   return response.data;
  // },

  /**
   * Delete an NCD
   * DELETE → /api/unlisted/admin/ncd/delete/:id
   */
  deleteNCD: async (id: number | string) => {
    const response = await api.delete(`/api/unlisted/admin/ncd/delete/${id}`);
    return response.data;
  },

  /**
   * Update an NCD
   * PUT → /api/unlisted/admin/ncd/update/:id
   */
  updateNCD: async (id: number | string, data: any) => {
    const response = await api.put(`/api/unlisted/admin/ncd/update/${id}`, data);
    return response.data;
  },

  // ==================== TICKETS ====================

  getTickets: async (): Promise<{ success: boolean; count: number; data: Ticket[] }> => {
    const response = await api.get("/api/unlisted/admin/tickets");
    return response.data;
  },

  getTicketStats: async (): Promise<{ success: boolean; data: TicketStats }> => {
    const response = await api.get("/api/unlisted/admin/tickets/stats");
    return response.data;
  },

  getTicketById: async (ticketId: string): Promise<{ success: boolean; data: Ticket }> => {
    const response = await api.get(`/api/unlisted/admin/tickets/${ticketId}`);
    return response.data;
  },

  replyToTicket: async (ticketId: string, payload: TicketReplyPayload) => {
    const response = await api.post(`/api/unlisted/admin/tickets/${ticketId}/reply`, payload);
    return response.data;
  },

  updateTicketStatus: async (ticketId: string, status: string) => {
    const response = await api.patch(`/api/unlisted/admin/tickets/${ticketId}/status`, { status });
    return response.data;
  },

  closeTicket: async (ticketId: string, status: string = "COMPLETED") => {
    const response = await api.patch(`/api/unlisted/admin/tickets/${ticketId}/close`, { status });
    return response.data;
  },

  // ==================== ENQUIRIES ====================
getEnquiries: async (): Promise<{ success: boolean; data: Enquiry[] }> => {
  const response = await api.get("/api/unlisted/admin/enquirieslist");
  return response.data;
},
};


