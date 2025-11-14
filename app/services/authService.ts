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
        console.log(response);
        return response.data;
    },

    // 🔹 Get Profile → /api/auth/profile
    getProfile: async () => {
        const response = await api.get("/api/auth/profile");
        return response.data;
    },

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
};
