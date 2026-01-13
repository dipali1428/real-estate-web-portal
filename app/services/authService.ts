import api from "./api";

interface LoginPayload {
    identifier: string;
    password?: string;
}

interface RegisterPayload {
    name: string;
    email: string;
    mobile: string;
    pan: string;
    city: string;
    rm_referral: string;
    head: string;
    category: string;
    password: string;
    confirm_password: string;
}

interface CibilPayload {
    fullName: string;
    email: string;
    mobile: string;
    pan: string;
    dob: string;
}

export const AuthService = {
    // 🔹 Login endpoint → /api/auth/login
    login: async ({ identifier, password }: LoginPayload) => {
        const response = await api.post("/api/auth/login", { identifier, password });
        return response.data;
    },

    // 🔹 Register endpoint → /api/auth/register
    register: async (formData: RegisterPayload) => {
        const response = await api.post("/api/auth/register", formData);
        return response.data;
    },

    sendLoginOtp: async (data: any) => {
        const response = await api.post("/api/auth/login/otp/send", data);
        return response.data;
    },

    verifyLoginOtp: async (data: any) => {
        const response = await api.post("/api/auth/login/otp/verify", data);
        return response.data;
    },

    // // 🔹 Verify user (check if email OR mobile exists)  // NOOOOT USINGGGG
    // verifyUser: async ({ identifier }: { identifier: string }) => {
    //     const response = await api.post("/api/auth/verify", { identifier });
    //     return response.data;
    // },

    // // 🔹 Update Password → /api/auth/update-password // NOOOOT USINGGGG
    // updatePassword: async ({ identifier, newPassword }: { identifier: string; newPassword: string }) => {
    //     const response = await api.post("/api/auth/update-password", { identifier, newPassword });
    //     return response.data;
    // },

    // 🔹 Check CIBIL score (placeholder)
    checkScore: async (payload: CibilPayload) => {
        const response = await api.post("/api/cibil/check", payload);
        return response.data;
    },

    // 🔹 Submit Contact Enquiry
    contactUs: async (formData: { name: string; email: string; phone: string; message: string }) => {
        const response = await api.post("/api/contact", formData);
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
        const response = await api.post("/api/public/create-customer-detail-lead", payload);
        return response.data;
    },


};
