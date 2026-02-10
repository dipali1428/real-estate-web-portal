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

    // 🔹 Bank Verification (Penny Drop)
    verifyBankDetails: async (payload: {
        bank_name?: string;
        bank_account_number: string;
        ifsc_code: string;
    }) => {
        const response = await api.post("/api/dashboard/verify-bank", payload);
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

    // 🔹 Get Assigned Relationship Manager
    getAssignedRM: async () => {
        const response = await api.get("/api/dashboard/get-assigned-rm");
        return response.data;
    },

    getAllClientDetails: async () => {
        const response = await api.get("/api/dashboard/all-client-detail");
        return response.data;
    },

    createLead: async (payload: {
        department: string;
        product_type: string;
        sub_category: string;
        client: {
            name: string;
            mobile: string;
            email: string;
        };
        meta: {
            is_self_login: boolean;
        };
        form_data: any;
    }) => {
        const response = await api.post("/api/dashboard/create-detail-lead", payload);
        return response.data;
    },

    // 🔹 Get Detailed Leads
    getMyLeads: async () => {
        const response = await api.get("/api/dashboard/get-my-detail-leads");
        return response.data;
    },

    getLeadDocuments: async (leadId: string) => {
        const response = await api.get(`/api/dashboard/detail-lead/${leadId}/all-documents`);
        return response.data;
    },

    uploadLeadDocument: async (leadId: string, formData: FormData) => {
        // Encode the ID here
        const encodedId = encodeURIComponent(leadId);
        const response = await api.post(`/api/dashboard/detail-leads/${encodedId}/documents`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    updateProfileImage: async (formData: FormData) => {
        const response = await api.put("/api/dashboard/profile/image", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },
};