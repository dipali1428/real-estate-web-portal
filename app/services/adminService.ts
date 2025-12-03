import api from "./api";

interface DSAListPayload {
    id?: string;
    adv_id?: string;
    name?: string;
    email?: string;
    mobile?: string;
    pan?: string;
    city?: string;
    head?: string;
    category?: string;
    date_joined?: string;
    updated_at?: string;
    role?: string;
}

export const AdminService = {
  dsaList: async (formData: DSAListPayload = {}) => {
    const response = await api.get("/api/admin/dsalist", { params: formData });
    return response.data; 
  },
};

