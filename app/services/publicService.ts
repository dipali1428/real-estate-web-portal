import api from "./api";

export const PublicService = {
    submitCareerApplication: (payload: any) => {
        return api.post("/api/public/submit-career-application", payload);
    },

    // 🔹 SEND OTP FOR REGISTER
    sendOtp: async (data: { mobile: string; }) => {
        const response = await api.post("/api/public/send-mobile-otp", data);
        return response.data;
    },

    // 🔹 VERIFY OTP FOR REGISTER
    verifyOtp: async (data: { mobile: string; otp: string; }) => {
        const response = await api.post("/api/public/verify-mobile-otp", data);
        return response.data;
    },

    preCibilRequest: async ( data : { mobile: string; fullName: string; email: string; pan: string }) => {
        const response = await api.post("/api/cibil/precheck", data );
        return response.data;
    },

    checkCibilScore: async (payload: {
        fullName: string;
        email: string;
        mobile: string;
        pan: string;
        gender: string;
        dob: string;
    }) => {
        const response = await api.post("/api/cibil/check", payload);
        return response.data;
    },

    downloadCibilReport: async (id: string) => {
        const response = await api.get(`/api/cibil/report/${id}/download`, {
            responseType: 'blob', // Critical for handling PDF/Binary data
        });
        return response.data;
    },
}