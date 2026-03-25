import api from "./api";

// ==================== TYPES ====================

export interface ProfileData {
    id?: number;
    name: string;
    mobile: string;
    email?: string;
    profile_image?: string;
}

export interface OrderData {
    companyId: number;
    quantity: number;
    price: number;
}

export interface TransactionFilterParams {
    startDate?: string;
    endDate?: string;
    type?: 'BUY' | 'SELL' | 'ALL';
    status?: string;
}

export interface PasswordData {
    currentPassword: string;
    newPassword: string;
}

export interface PanVerificationParams {
    pan: string;
    name_as_per_pan: string;
    date_of_birth: string;
}

export interface PanVerificationResponse {
    message: string;
    data: {
        pan: string;
        name: string;
        category: string;
        aadhaar_seeding_status: string;
    };
}

export interface AadhaarOtpParams {
    aadhaarNumber: string;
}

export interface VerifyAadhaarOtpParams {
    aadhaarNumber: string;
    otp: string;
}

export interface BankVerificationParams {
    bank_name: string;
    bank_account_number: string;
    ifsc_code: string;
}

export interface BankVerificationResponse {
    status: 'success' | 'failed';
    message: string;
    data: {
        bank_name: string;
        account_holder_name: string;
        utr: string;
        amount_deposited: number;
    };
}

export interface KycStatusResponse {
    id: number;
    user_id: number;
    pan_number?: string;
    pan_verified: boolean;
    aadhaar_number?: string;
    aadhaar_verified: boolean;
    bank_account_number?: string;
    ifsc_code?: string;
    bank_name?: string;
    bank_verified: boolean;
    gst_number?: string;
    gst_verified: boolean;
    kyc_completed: boolean;
    profile_image_url?: string;
    aadhaar_kyc_data?: any;
    created_at: string;
    updated_at: string;
}

export interface UpdateProfilePayload {
  name: string;
  mobile: string;
}

export interface DematDetailsParams {
    dp_id: string;
    client_id: string;
    depository: string;
    demat_name: string;
}

export interface DematDetailsResponse {
    status: string;
    message: string;
    data?: {
        dp_id: string;
        client_id: string;
        depository: string;
        demat_name: string;
    };
}

interface Company {
  id: number;
  shares_name: string;
  logo_url: string | null;  
  price: string;
  min_lot_size: number | null; 
  depository_applicable: string | null;
}

// ==================== WISHLIST TYPES ====================

export interface AddToWishlistParams {
    product_type: string;
    product_id: number;
    product_name: string;
}

export interface WishlistItem {
    id: number;
    user_id: number;
    product_type: string;
    product_id: number;
    product_name: string;
    created_at: string;
}

export interface WishlistResponse {
    success: boolean;
    message?: string;
    data?: WishlistItem | WishlistItem[];
    total?: number;
    count?: number;
}

export interface SupportTicket {
    id: string;
    ticket_id: string;
    category: string;
    product_type: string;
    reference_id?: string;
    issue_type: string;
    severity: string;
    subject: string;
    description: string;
    status: 'Open' | 'Closed' | 'In Progress' | 'Resolved';
    created_at: string;
    updated_at: string;
}

export interface SupportCategory {
    id: number;
    category_name: string;
}

// ==================== CUSTOMER SERVICE ====================

const CustomerService = {
    // ==================== DASHBOARD ====================
    getDashboard: async () => {
        const response = await api.get("/api/unlisted/user/dashboard");
        return response.data;
    },

    // ==================== PORTFOLIO ====================
    getPortfolio: async () => {
        const response = await api.get("/api/customer/portfolio");
        return response.data;
    },

    // ==================== TRANSACTIONS ====================
    getTransactions: async () => {
        const response = await api.get("/api/unlisted/user/transactions");
        return response.data;
    },

    filterTransactions: async (params: TransactionFilterParams) => {
        const response = await api.get("/api/unlisted/user/transactions/filter", { params });
        return response.data;
    },

    // ==================== COMPANIES ====================
    getAllCompanies: async () => {
        const response = await api.get("/api/unlisted/public/shares");
        return response.data;
    },

    // ==================== PROFILE ====================
    getProfile: async () => {
        const response = await api.get("/api/dashboard/profile");
        return response.data;
    },

    //    * Update current user profile
    //    * PUT → /api/unlisted/user/updateprofile
    //    */
        updateProfile: async (profileData: UpdateProfilePayload) => {
            const response = await api.put(
                "/api/unlisted/user/updateprofile", 
                {
                    name: profileData.name,
                    mobile: profileData.mobile
                }
            );
            return response.data;
        },

    /**
     * Update Profile Image
     * PUT → /api/dashboard/profile/image
     */
    updateProfileImage: async (formData: FormData) => {
        const response = await api.put("/api/dashboard/profile/image", formData, {
            headers: { 
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    deleteAccount: async () => {
        const response = await api.delete("/api/unlisted/user/delete-account");
        return response.data;
    },

    changePassword: async (passwordData: PasswordData) => {
        const response = await api.put("/api/unlisted/user/change-password", passwordData);
        return response.data;
    },

    // ==================== KYC VERIFICATION ====================
    verifyPan: async (params: PanVerificationParams): Promise<PanVerificationResponse> => {
        const response = await api.post("/api/dashboard/verify-pan", {
            pan: params.pan,
            name_as_per_pan: params.name_as_per_pan,
            date_of_birth: params.date_of_birth
        });
        return response.data;
    },

    generateAadhaarOtp: async (aadhaar_number: string) => {
        const response = await api.post("/api/dashboard/aadhaar/generate-otp", { aadhaar_number });
        return response.data;
    },

    verifyAadhaarOtp: async (payload: { reference_id: string; otp: string; aadhaar_number: string }) => {
        const response = await api.post("/api/dashboard/aadhaar/verify-otp", payload);
        return response.data;
    },

    verifyBankPennyDrop: async (params: BankVerificationParams): Promise<BankVerificationResponse> => {
        const response = await api.post("/api/dashboard/verify-bank", {
            bank_name: params.bank_name,
            bank_account_number: params.bank_account_number,
            ifsc_code: params.ifsc_code
        });
        return response.data;
    },

    getKycStatus: async (): Promise<KycStatusResponse> => {
        const response = await api.get("/api/dashboard/kyc/status");
        return response.data;
    },

    // ==================== DEMAT ACCOUNT ====================
    addDematAccount: async (dematDetails: DematDetailsParams): Promise<DematDetailsResponse> => {
        const response = await api.post("/api/unlisted/user/demat/add", {
            dp_id: dematDetails.dp_id,
            client_id: dematDetails.client_id,
            depository: dematDetails.depository,
            demat_name: dematDetails.demat_name
        });
        return response.data;
    },

    // ==================== GOAL PLANNER (FIXED PATHS) ====================
    createGoal: async (goalData: any) => {
        const response = await api.post("/api/customer/create-goal", goalData);
        return response.data;
    },

    getMyGoals: async () => {
        const response = await api.get("/api/customer/my-goals");
        return response.data;
    },

    getGoalById: async (goalId: number) => {
        const response = await api.get(`/api/customer/goal/${goalId}`);
        return response.data;
    },

    updateGoal: async (goalId: number, goalData: any) => {
        const response = await api.put(`/api/customer/update-goal/${goalId}`, goalData);
        return response.data;
    },

    calculateGoal: async (calculationData: any) => {
        const response = await api.post("/api/customer/calculate-goal", {
            target_amount: calculationData.target_amount,
            target_years: calculationData.target_years,
            expected_return: calculationData.expected_return,
            current_savings: calculationData.current_savings || 0
        });
        return response.data;
    },

    getGoalProgress: async (goalId: number) => {
        const response = await api.get(`/api/customer/goal-progress/${goalId}`);
        return response.data;
    },

    deleteGoal: async (goalId: number) => {
        const response = await api.delete(`/api/customer/delete-goal/${goalId}`);
        return response.data;
    },

    // ==================== WISHLIST API METHODS ====================

    /**
     * Add item to wishlist
     * POST → /api/customer/add-wishlist
     */
    addToWishlist: async (wishlistData: AddToWishlistParams): Promise<WishlistResponse> => {
        const response = await api.post("/api/customer/add-wishlist", {
            product_type: wishlistData.product_type,
            product_id: wishlistData.product_id,
            product_name: wishlistData.product_name
        });
        return response.data;
    },

    /**
     * Get all wishlist items for current user
     * GET → /api/customer/my-wishlist
     */
    getMyWishlist: async (): Promise<WishlistResponse> => {
        const response = await api.get("/api/customer/my-wishlist");
        return response.data;
    },

    /**
     * Get specific wishlist item by ID
     * GET → /api/customer/wishlist/:id
     */
    getWishlistItem: async (wishlistId: number): Promise<WishlistResponse> => {
        const response = await api.get(`/api/customer/wishlist/${wishlistId}`);
        return response.data;
    },

    /**
     * Get total count of wishlist items for current user
     * GET → /api/customer/wishlist-count
     */
    getWishlistCount: async (): Promise<{ success: boolean; count: number }> => {
        const response = await api.get("/api/customer/wishlist-count");
        return response.data;
    },

    /**
     * Remove item from wishlist by ID
     * DELETE → /api/customer/remove-wishlist/:id
     */
    removeFromWishlist: async (wishlistId: number): Promise<{ success: boolean; message: string }> => {
        const response = await api.delete(`/api/customer/remove-wishlist/${wishlistId}`);
        return response.data;
    },

      createTicket: async (ticketData: {
        category: string;
        product_type: string;
        reference_id: string;
        issue_type: string;
        severity: string;
        subject: string;
        description: string;
    }) => {
        const response = await api.post("/api/customer/create", ticketData);
        return response.data;
    },

    // 2) GET: /api/customer/list
    getTicketList: async () => {
        const response = await api.get("/api/customer/list");
        return response.data;
    },

    // 3) GET: /api/customer/categories
    getSupportCategories: async () => {
        const response = await api.get("/api/customer/categories");
        return response.data;
    },

    // 4) POST : /api/customer/reply
    replyToTicket: async (replyData: { ticket_id: string; message: string }) => {
        const response = await api.post("/api/customer/reply", replyData);
        return response.data;
    },

    // 5) POST : /api/customer/close
    closeTicket: async (ticket_id: string) => {
        const response = await api.post("/api/customer/close", { ticket_id });
        return response.data;
    },

    // 6) GET : /api/customer/:ticket_id
    getTicketDetails: async (ticket_id: string) => {
        const response = await api.get(`/api/customer/${ticket_id}`);
        return response.data;
    },

    // Add these methods to your customerService object

    // ==================== REPORT API METHODS ====================

    /**
     * Get report overview
     * GET → /api/customer/reports/overview
     */
    getReportOverview: async () => {
        const response = await api.get("/api/customer/reports/overview");
        return response.data;
    },

    /**
     * Get product summary
     * GET → /api/customer/reports/product-summary
     */
    getProductSummary: async () => {
        const response = await api.get("/api/customer/reports/product-summary");
        return response.data;
    },

    /**
     * Get recent investments
     * GET → /api/customer/reports/recent-investments
     */
    getRecentInvestments: async () => {
        const response = await api.get("/api/customer/reports/recent-investments");
        return response.data;
    },

    /**
     * Get portfolio distribution
     * GET → /api/customer/reports/portfolio-distribution
     */
    getPortfolioDistribution: async () => {
        const response = await api.get("/api/customer/reports/portfolio-distribution");
        return response.data;
    },

    /**
     * Get assigned relationship manager
     * GET → /api/customer/assigned-rm
     */

    getrmcustomer: async () => {
        const response = await api.get("/api/customer/rm/assigned-rm");
        return response.data;
    },

    // ==================== AUTH HELPERS ====================
    isAuthenticated: () => typeof window !== 'undefined' && !!localStorage.getItem('token'),
    getToken: () => typeof window !== 'undefined' ? localStorage.getItem('token') : null,
    setToken: (token: string) => typeof window !== 'undefined' && localStorage.setItem('token', token),
    clearToken: () => typeof window !== 'undefined' && localStorage.removeItem('token'),
};

export default CustomerService;