import api from "./api";

export const AccountService = {

    // Get Accounts Profile
    getAccountProfile: async () => {
        const res = await api.get("/api/accounts/accountProfile");
        return res.data;
    },
}