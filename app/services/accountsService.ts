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
}