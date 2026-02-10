import api from "./api";

interface LoginPayload {
    identifier: string;
    password?: string;
}

interface RegisterPayload {
    role: string;
    name: string;
    email: string;
    mobile: string;
    rm_referral: string;
    state: string;
    city: string;
    password: string;
    confirm_password: string;
    registerToken: string; // 🔐 REQUIRED AFTER OTP VERIFY
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

    // 🔹 REGISTER (FINAL STEP)
    register: async (formData: RegisterPayload) => {
        const response = await api.post("/api/auth/register", formData);
        return response.data;
    },

    // 🔹 SEND OTP FOR REGISTER
    sendRegisterOtp: async (data: { mobile: string; email: string }) => {
        const response = await api.post("/api/auth/register/send-otp", data);
        return response.data;
    },

    // 🔹 VERIFY OTP FOR REGISTER
    verifyRegisterOtp: async (data: { mobile: string; otp: string; email: string }) => {
        const response = await api.post("/api/auth/register/verify-otp", data);
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
