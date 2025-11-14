import api from "./api";


export const DashboardService = {
    // 🔹 Get current user's dashboard profile data
    getProfile: async () => {
        const response = await api.get("/api/auth/profile");
        return response.data;
    },
};
