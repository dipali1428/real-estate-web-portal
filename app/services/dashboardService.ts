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
        const response = await api.get("/api/dashboard/get-referral-leads");
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

    // 🔹 Get Completed Detail Leads (For Payout History)
    getCompletedDetailLeads: async () => {
        const response = await api.get("/api/dashboard/get-completed-detail-leads");
        return response.data;
    },

    // 🔹 Generate Aadhaar OTP
    generateAadhaarOtp: async (aadhaar_number: string) => {
        const response = await api.post("/api/dashboard/aadhaar/generate-otp", { aadhaar_number });
        return response.data;
    },

    // 🔹 Verify Aadhaar OTP (Updated to include aadhaar_number)
    verifyAadhaarOtp: async (payload: { reference_id: string; otp: string; aadhaar_number: string }) => {
        const response = await api.post("/api/dashboard/aadhaar/verify-otp", payload);
        return response.data;
    },

    verifyPan: async (payload: { pan: string; name_as_per_pan: string; date_of_birth: string }) => {
        const response = await api.post("/api/dashboard/verify-pan", payload);
        return response.data;
    },

    // 🔹 Verify GST Number
    verifyGst: async (gst_number: string) => {
        const response = await api.post("/api/dashboard/verify-gst", { gst_number });
        return response.data;
    },


    // // 🔹 SEND OTP FOR REGISTER
    // sendOtp: async (data: { mobile: string;}) => {
    //     const response = await api.post("/api/dashboard/send-mobile-otp", data);
    //     return response.data;
    // },

    // // 🔹 VERIFY OTP FOR REGISTER
    // verifyOtp: async (data: { mobile: string; otp: string;}) => {
    //     const response = await api.post("/api/dashboard/send-mobile-otp", data);
    //     return response.data;
    // },

    // 🔹 SEND OTP FOR REGISTER
    sendEmailOtp: async () => {
        const response = await api.post("/api/dashboard/send-email-otp");
        return response.data;
    },

    verifyEmailOtp: async (data: { otp: string; }) => {
        const response = await api.post("/api/dashboard/verify-email-otp", data);
        return response.data;
    },

    verifyPanAadhaarLink: async () => {
        const response = await api.post("/api/dashboard/verify-pan-aadhaar-link");
        return response.data;
    },

    // 🔹 NEW: Get TDS Details
    getTdsDetails: async () => {
        const response = await api.get("/api/dashboard/tds");
        return response.data;
    },

    getRefLink: async () => {
        const response = await api.get("/api/dashboard/profile/share-referral");
        return response.data;
    },

    createAgreement: async (payload: { payment_method: string; coupon_code: any }) => {
        const response = await api.post("/api/dashboard/profile/create-agreement", payload);
        return response.data;
    },

    createOrder: async () => {
        const response = await api.post("/api/dashboard/payment/create-payment-order");
        return response.data;
    },

    verifyPayment: async (order_id: string) => {
        const response = await api.get(`/api/dashboard/payment/verify-payment/${order_id}`);
        return response.data;
    },

    markFailed: async (order_id: any) => {
        const response = await api.post("/api/dashboard/payment/mark-payment-failed", { order_id });
        return response.data;
    },

    checkKycStatus: async () => {
        const response = await api.get("/api/dashboard/profile/kyc-status");
        return response.data;
    },

    // 🔹 Get Referral Users (Co-Partners)
    getReferralUsers: async () => {
        const response = await api.get("/api/dashboard/profile/get-referral-user");
        return response.data;
    },

    // 🔹 Get Campaigns
    getCampaigns: async () => {
        const response = await api.get("/api/dashboard/campaigns");
        return response.data;
    },

    // 🔹 Download Campaign Image (Returns a Blob)
    downloadCampaign: async (id: string | number) => {
        const response = await api.get(`/api/dashboard/campaigns/download/${id}`, {
            responseType: 'blob'
        });
        return response.data;
    },
    // 🔹 Validate Coupon
    validateCoupon: async (coupon_code: string) => {
        const response = await api.post("/api/dashboard/profile/validate-coupon", { coupon_code });
        return response.data;
    },
    getDocuments: async () => {
        // Add "dashboard" to the path to match your other working APIs
        const response = await api.get("/api/dashboard/payout-grids");
        return response.data;
    },

    downloadPayoutGrid: async (id: string, payload: any) => {
        // Using POST because you mentioned req.body on the backend
        const response = await api.get(`/api/dashboard/payout-grids/download/${id}`, {
            params: payload,

        });
        return response.data;
    },

    // Non-Individual
    verifyCompanyAndDirectors: async (payload: { company_id: string }) => {
        const response = await api.post("/api/dashboard/verify-company-and-directors", payload);
        return response.data;
    },

// Partners API's
    addPartnersOfficeAddress: async (payload: { office_address: string }) => {
        const response = await api.post("/api/dashboard/partnership/add-partners-office-address", payload);
        return response.data;
    },

    verifyPanAndCreatePartner: async (payload: { pan: string; name_as_per_pan: string; date_of_birth: string }) => {
        // Ensure this path matches your backend route registration
        const response = await api.post("/api/dashboard/partnership/verify-pan-add-partnership", payload);
        return response.data;
    },
    generateAadhaarOtpDirector: async (payload: { aadhaar_number: string }) => {
        const response = await api.post("/api/dashboard/partnership/aadhaar/generate-otp", payload);
        return response.data;
    },
    verifyAadhaarOtpDirector: async (payload: { partner_id: string; reference_id: string; otp: string; aadhaar_number: string }) => {
        const response = await api.post("/api/dashboard/partnership/aadhaar/verify-otp", payload);
        return response.data;
    },
    verifyDirectorPanAadhaarLink: async (payload: { partner_id:string; }) => {
        // Replace with your actual backend route
        const response = await api.post("/api/dashboard/partnership/verify-pan-aadhaar-link", payload);
        return response.data;
    },

    
    // 🔹 Delete a Director/Partner
    deletePartner: async (partner_id: string) => {
        const response = await api.delete(`/api/dashboard/partnership/delete-partner/${partner_id}`);
        return response.data;
    },
};