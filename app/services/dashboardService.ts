import api from "./api";


export const DashboardService = {
    // 🔹 Get current user's dashboard profile data
    getProfile: async () => {
        const response = await api.get("/api/dashboard/profile");
        return response.data;
    },

    // 🔹 Edit profile (update email, mobile, head, category, password)
    editProfile: async (payload: {
        email: string;
        mobile: string;
        head: string;
        category: string;
        password: string;
    }) => {
        const response = await api.put("/api/dashboard/profile", payload);
        return response.data;
    },

    // 🔹 Create Tciket
    createTicket: async (payload: {
        category: string;
        subject: string;
        description: string;
    }) => {
        const response = await api.post("/api/dashboard/support/ticket", payload);
        return response.data;
    },

    // 🔹 Get Tickets
    getMyTickets: async () => {
        const response = await api.get("/api/dashboard/support/my-tickets");
        return response.data;
    },

    // 🔹 Create Lead
    createReferralLead: async (payload: {
        lead_name: string;
        contact_number: string;
        email: string;
        department: string;
        sub_category: string;
        notes: string;
    }) => {
        const response = await api.post("/api/dashboard/create-referral-lead", payload);
        return response.data;
    },

    // 🔹 NEW: Get Leads
    getLeads: async () => {
        const response = await api.get("/api/dashboard/get-leads");
        return response.data;
    },

};