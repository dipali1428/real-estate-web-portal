import api from "./api"; // Ensure this points to your axios instance

// 1. Define what a Lead looks like so TypeScript doesn't complain
export interface Lead {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    final_lead_confirm_status: boolean;
    source?: string;
    loan_amount?: string | number;
    created_at?: string;
}

export const AccountService = {
    // GET: Fetch all leads
    getAllFinalDetailLeads: async (): Promise<{
        success: boolean;
        detail_leads: Lead[];
    }> => {

        const res = await api.get("/api/accounts/get-all-final-detail-leads");

        return res.data;

    },
    updateLeadconfirmStatus: async (leadId: number, data: any) => {
        // This hits: PUT api/accounts/get-all-final-detail-leads/:id
        const response = await api.put(`/api/accounts/get-all-final-detail-leads/${leadId}`, data);
        return response.data;
    },

    // GET: Export Excel/CSV logic integrated here
    exportLeads: async () => {
        return await api.get(
            "/api/accounts/get-all-final-detail-leads/export",
            {
                responseType: "blob",
            }
        );
    },
    // Get Accounts Profile
    getAccountProfile: async () => {
        const res = await api.get("/api/accounts/accountProfile");
        return res.data;
    },

    getDSAKycStatus: async (params?: { page?: number; limit?: number; search?: string }) => {
        const response = await api.get("/api/accounts/dsa-kyc-status", { params });
        return response.data;
    },
    getCompletedReferralLeads: async () => {
        const response = await api.get("/api/accounts/completed-referral-leads");
        return response.data;
    },
    getCompletedDetailLeads: async () => {
        const response = await api.get("/api/accounts/completed-detail-leads");
        return response.data;
    },
    // Change 'status: string' to 'status: boolean'
    updateLeadConfirmStatus: async (
        leadId: number,
        finalLeadConfirmStatus: boolean
    ) => {

        const response = await api.put(
            `/api/accounts/detail-leads/${leadId}/confirm-status`,
            {
                final_lead_confirm_status: finalLeadConfirmStatus
            }
        );

        return response.data;
    },
};