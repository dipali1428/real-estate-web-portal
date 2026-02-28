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
  
  /**
   * Get dashboard statistics
   * GET → /api/unlisted/admin/dashboard
   */
  getDashboardStats: async (): Promise<UnlistedDashboardStats> => {
    const response = await api.get("/api/unlisted/admin/dashboard");
    return response.data;
  },

  // ==================== SHARES ====================
  
  /**
   * Get all shares
   * GET → /api/unlisted/admin/shares
   */
  getShares: async (): Promise<Share[]> => {
    const response = await api.get("/api/unlisted/admin/shares");
    return response.data; // Returns array of shares directly
  },

  /**
   * Add new share
   * POST → /api/unlisted/admin/shares/add
   * Request Body: { shares_name, logo_url, price, depository_applicable, min_lot_size }
   */
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

  /**
   * Update share
   * POST → /api/unlisted/admin/shares/update/:id
   * Note: This is a POST request, not PUT
   */
  updateShare: async (id: number, payload: UpdateSharePayload) => {
    const response = await api.put(`/api/unlisted/admin/shares/update/${id}`, payload);
    return response.data; // Returns { success, message, data }
  },

  /**
   * Delete share
   * POST → /api/unlisted/admin/shares/delete/:id
   * Note: This is a POST request, not DELETE
   */
  deleteShare: async (id: number) => {
    const response = await api.delete(`/api/unlisted/admin/shares/delete/${id}`);
    return response.data; // Returns { message }
  },

  /**
   * Upload shares with history (Excel)
   * POST → /api/unlisted/admin/shares/uploadSharesWithHistory
   * Body: form-data with file field
   */
  uploadSharesWithHistory: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/api/unlisted/admin/shares/uploadSharesWithHistory", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // Returns { message, rowsProcessed, rowsSkipped }
  },

  /**
   * Get share price graph data
   * GET → /api/unlisted/admin/shares/:shareId/graph
   */
  getSharePriceGraph: async (shareId: number): Promise<SharePriceGraphData> => {
    const response = await api.get(`/api/unlisted/admin/shares/${shareId}/graph`);
    return response.data;
  },

  // ==================== USERS ====================
  
  /**
   * Get all users with pagination
   * GET → /api/unlisted/admin/users?page={page}&limit=10
   */
  getUsers: async (page: number = 1, limit: number = 10) => {
    const response = await api.get(`/api/unlisted/admin/users?page=${page}&limit=${limit}`);
    return response.data;
  },

  /**
   * Add new user
   * POST → /api/unlisted/admin/users/add
   */
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

  /**
   * Update user
   * PUT → /api/unlisted/admin/users/update/:id
   */
  updateUser: async (id: number, payload: UpdateUserPayload) => {
    const response = await api.put(`/api/unlisted/admin/users/update/${id}`, payload);
    return response.data;
  },

  /**
   * Delete user
   * DELETE → /api/unlisted/admin/users/delete/:id
   */
  deleteUser: async (id: number) => {
    const response = await api.delete(`/api/unlisted/admin/users/delete/${id}`);
    return response.data;
  },

  /**
   * Get user portfolio
   * GET → /api/unlisted/admin/user/portfolio?userId={userId}
   */
  getUserPortfolio: async (userId?: number) => {
    const url = userId 
      ? `/api/unlisted/admin/user/portfolio?userId=${userId}`
      : "/api/unlisted/admin/user/portfolio";
    const response = await api.get(url);
    return response.data;
  },

  // ==================== TRANSACTIONS ====================

  /**
   * Get all transactions
   * GET → /api/unlisted/admin/transactions?limit={limit}
   */
  getTransactions: async (limit: number = 50): Promise<UnlistedTransaction[]> => {
    const response = await api.get(`/api/unlisted/admin/transactions?limit=${limit}`);
    return response.data;
  },

  /**
   * Get pending transactions
   * GET → /api/unlisted/admin/transactions/pending
   */
  getPendingTransactions: async (): Promise<UnlistedTransaction[]> => {
    const response = await api.get("/api/unlisted/admin/transactions/pending");
    return response.data;
  },

  /**
   * Add transaction
   * POST → /api/unlisted/admin/transactions/add
   */
  addTransaction: async (payload: AddTransactionPayload) => {
    const response = await api.post("/api/unlisted/admin/transactions/add", payload);
    return response.data;
  },

  /**
   * Approve transaction
   * POST → /api/unlisted/admin/transactions/approve
   */
  approveTransaction: async (txnId: number) => {
    const response = await api.post("/api/unlisted/admin/transactions/approve", { txn_id: txnId });
    return response.data;
  },

  /**
   * Reject transaction
   * POST → /api/unlisted/admin/transactions/reject
   */
  rejectTransaction: async (txnId: number) => {
    const response = await api.post("/api/unlisted/admin/transactions/reject", { txn_id: txnId });
    return response.data;
  },

  // ==================== ENQUIRIES ====================
  
  /**
   * Get all enquiries
   * GET → /api/unlisted/admin/enquiries
   */
  getEnquiries: async (): Promise<Enquiry[]> => {
    const response = await api.get("/api/unlisted/admin/enquiries");
    return response.data;
  },

  // ==================== LOGOUT ====================

  /**
   * Logout admin
   * POST → /api/unlisted/admin/logout
   */
  logout: async () => {
    const response = await api.post("/api/unlisted/admin/logout");
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    return response.data;
  },

  // ==================== DEMAT ====================

  /**
   * Get user Demat details by user ID
   * GET → /api/unlisted/admin/user/demat/:userId
   */
  getUserDemat: async (userId: number): Promise<{ success: boolean; data: DematDetails }> => {
    const response = await api.get(`/api/unlisted/admin/user/demat/${userId}`);
    return response.data;
  },
};