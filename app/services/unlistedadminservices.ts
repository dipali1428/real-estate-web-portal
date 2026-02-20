// services/unlistedadminService.ts
import api from "./api";

// ==================== TYPES ====================

export interface UnlistedDashboardStats {
  total_users: string;
  total_companies: string;
  total_transactions: string;
  total_invested: string;
}

// export interface Company {
//   id: number | string;
//   name: string;
//   sector: string;
//   createdat: string;
//   updatedat: string;
//   price: string;          
//   min_investment: string;  
//   available_shares: number;
//   status: string;        
// }

export interface UnlistedUser {
  id: number;
  adv_id: string;     
  name: string;
  email: string;
  role: string;
  date_joined: string; 
  mobile: string;     
}

export interface Share {
  share_id: number;
  company_name: string;
  price: string;
  quantity: number;
  min_lot_size: number;
  min_investment: string;
  depository: string;
  createdat: string;
  updatedat: string;
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

export interface UnlistedOrder {
  order_id: number;
  user_name: string;
  company_name: string;
  quantity: number;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  created_at: string;
  updated_at: string;
}

export interface KYCRequest {
  id: number;
  userId: number;
  userName: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  documents?: any;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
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

// ==================== ADMIN SERVICE ====================
export const AdminService = {
  
  // ==================== TEST ====================
  
  /**
   * Test endpoint
   * GET → /api/unlisted/admin/test
   */
  test: async () => {
    const response = await api.get("/api/unlisted/admin/test");
    return response.data;
  },

  // ==================== DASHBOARD ====================
  
  /**
   * Get dashboard statistics
   * GET → /api/unlisted/admin/dashboard
   */
  getUnlistedDashboardStats: async (): Promise<UnlistedDashboardStats> => {
    const response = await api.get("/api/unlisted/admin/dashboard");
    return response.data;
  },

  // ==================== COMPANIES ====================
  
  /**
   * Get all companies
   * GET → /api/unlisted/admin/companies
   */
  // getCompanies: async (): Promise<Company[]> => {
  //   const response = await api.get("/api/unlisted/admin/companies");
  //   return response.data;
  // },

  /**
   * Add new company
   * POST → /api/unlisted/admin/companies/add
   */
  // addCompany: async (payload: Partial<Company>) => {
  //   const response = await api.post("/api/unlisted/admin/companies/add", payload);
  //   return response.data;
  // },

  /**
   * Update company
   * PUT → /api/unlisted/admin/companies/update
   */
  // updateCompany: async (payload: Partial<Company>) => {
  //   const response = await api.put("/api/unlisted/admin/companies/update", payload);
  //   return response.data;
  // },

  /**
   * Delete company
   * DELETE → /api/unlisted/admin/companies/delete
   */
  // deleteCompany: async (id: number) => {
  //   const response = await api.delete("/api/unlisted/admin/companies/delete", {
  //     data: { id },
  //   });
  //   return response.data;
  // },

  // ==================== USERS ====================
  
  /**
   * Get all users with pagination
   * GET → /api/unlisted/admin/users?page={page}&limit=10
   */
  getUnlistedUsers: async (page: number = 1) => {
    const response = await api.get(`/api/unlisted/admin/users?page=${page}&limit=10`);
    return response.data;
  },
addUser: async (payload: any) => {
  // 1. Create a clean object
  // 2. Map 'mobile' to 'phone' just in case the backend expects 'phone'
  // 3. Provide a default password if the backend requires one for new accounts
  const finalPayload = {
    name: payload.name,
    email: payload.email,
    phone: payload.mobile, // Backend often expects 'phone'
    mobile: payload.mobile, // Sending both to be safe
    role: payload.role || 'CUSTOMER',
    adv_id: payload.adv_id || "", 
    password: "User@123" // MANY backends fail with 400 if password is missing
  };

  const response = await api.post(`/api/unlisted/admin/users/add`, finalPayload);
  return response.data;
},

  updateUsers: async (id: number, payload: Partial<UnlistedUser>) => {
    const response = await api.put(`/api/unlisted/admin/users/update/${id}`, payload);
    return response.data;
  },

  deleteUser: async (id: number) => {
    const response = await api.delete(`/api/unlisted/admin/users/delete/${id}`);  
    return response.data;
  },

  // ==================== USER PORTFOLIO ====================
  
  /**
   * Get user portfolio
   * GET → /api/unlisted/admin/user/portfolio
   */
  getUserPortfolio: async (userId?: number) => {
    const url = userId 
      ? `/api/unlisted/admin/user/portfolio?userId=${userId}`
      : "/api/unlisted/admin/user/portfolio";
    const response = await api.get(url);
    return response.data;
  },

  // ==================== SHARES ====================
  
  /**
   * Get all shares
   * GET → /api/unlisted/admin/shares
   */
  getShares: async (): Promise<Share[]> => {
    const response = await api.get("/api/unlisted/admin/shares");
    return response.data;
  },

  /**
   * Add new share
   * POST → /api/unlisted/admin/shares/add
   */
  addShare: async (payload: Omit<Share, 'share_id' | 'createdat' | 'updatedat'>) => {
    const response = await api.post("/api/unlisted/admin/shares/add", payload);
    return response.data;
  },

  /**
   * Update share
   * PUT → /api/unlisted/admin/shares/update
   */
  updateShare: async (payload: Partial<Share> & { share_id: number }) => {
    const response = await api.put("/api/unlisted/admin/shares/update", payload);
    return response.data;
  },

  /**
   * Delete share
   * DELETE → /api/unlisted/admin/shares/delete
   */
  deleteShare: async (share_id: number) => {
    const response = await api.delete("/api/unlisted/admin/shares/delete", {
      data: { share_id },
    });
    return response.data;
  },

  /**
   * Upload shares PDF and update
   * POST → /api/unlisted/admin/shares/upload-pdf
   */
  uploadSharesPdfAndUpdate: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/api/unlisted/admin/shares/upload-pdf", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  /**
   * Get share price graph data
   * GET → /api/unlisted/admin/shares/:share_id/graph
   */
  getSharePriceGraph: async (share_id: number): Promise<SharePriceGraphData> => {
    const response = await api.get(`/api/unlisted/admin/shares/${share_id}/graph`);
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
  addTransaction: async (payload: Partial<UnlistedTransaction>) => {
    const response = await api.post("/api/unlisted/admin/transactions/add", payload);
    return response.data;
  },

  /**
   * Approve transaction
   * POST → /api/unlisted/admin/transactions/approve
   */
  approveTransaction: async (txn_id: number) => {
    const response = await api.post("/api/unlisted/admin/transactions/approve", { txn_id });
    return response.data;
  },

  /**
   * Reject transaction
   * POST → /api/unlisted/admin/transactions/reject
   */
  rejectTransaction: async (txn_id: number) => {
    const response = await api.post("/api/unlisted/admin/transactions/reject", { txn_id });
    return response.data;
  },

  // ==================== ORDERS ====================

  /**
   * Get all orders
   * GET → /api/unlisted/admin/orders
   */
  getOrders: async (): Promise<UnlistedOrder[]> => {
    const response = await api.get("/api/unlisted/admin/orders");
    return response.data;
  },

  /**
   * Get pending orders
   * GET → /api/unlisted/admin/orders/pending
   */
  getPendingOrders: async (): Promise<UnlistedOrder[]> => {
    const response = await api.get("/api/unlisted/admin/orders/pending");
    return response.data;
  },

  /**
   * Approve order
   * PUT → /api/unlisted/admin/orders/:orderId/approve
   */
  approveOrder: async (orderId: number) => {
    const response = await api.put(`/api/unlisted/admin/orders/${orderId}/approve`);
    return response.data;
  },

  /**
   * Reject order
   * PUT → /api/unlisted/admin/orders/:orderId/reject
   */
  rejectOrder: async (orderId: number) => {
    const response = await api.put(`/api/unlisted/admin/orders/${orderId}/reject`);
    return response.data;
  },

  // ==================== KYC ====================

  /**
   * Get all KYC requests
   * GET → /api/unlisted/admin/kyc
   */
  getAllKycRequests: async (): Promise<KYCRequest[]> => {
    const response = await api.get("/api/unlisted/admin/kyc");
    return response.data;
  },

  /**
   * Get KYC by user ID
   * GET → /api/unlisted/admin/kyc/:userId
   */
  getUserKycByUserId: async (userId: number): Promise<KYCRequest> => {
    const response = await api.get(`/api/unlisted/admin/kyc/${userId}`);
    return response.data;
  },

  /**
   * Approve KYC
   * PUT → /api/unlisted/admin/kyc/:userId/approve
   */
  approveKyc: async (userId: number) => {
    const response = await api.put(`/api/unlisted/admin/kyc/${userId}/approve`);
    return response.data;
  },

  /**
   * Reject KYC
   * PUT → /api/unlisted/admin/kyc/:userId/reject
   */
  rejectKyc: async (userId: number) => {
    const response = await api.put(`/api/unlisted/admin/kyc/${userId}/reject`);
    return response.data;
  },

  // ==================== ENQUIRIES ====================

  /**
   * Create enquiry
   * POST → /api/unlisted/admin/enquiries
   */
  createEnquiry: async (payload: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }) => {
    const response = await api.post("/api/unlisted/admin/enquiries", payload);
    return response.data;
  },

  /**
   * Get all enquiries
   * GET → /api/unlisted/admin/enquiries
   */
  getAllEnquiries: async (): Promise<Enquiry[]> => {
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
    
    // Clear token on logout
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    
    return response.data;
  },

    /**
   * Upload shares with history (CSV)
   * POST → /api/unlisted/admin/shares/uploadSharesWithHistory
   */
  
   uploadSharesWithHistory: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file); // Ensure the backend expects the key "file"
    
    const response = await api.post("/api/unlisted/admin/shares/uploadSharesWithHistory", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    
    return response.data;
  },
};

