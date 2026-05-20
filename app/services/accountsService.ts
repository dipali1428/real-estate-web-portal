import api from "./api";

export const AccountService = {

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
}