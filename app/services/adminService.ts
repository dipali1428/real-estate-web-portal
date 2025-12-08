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

interface UpdateDSAPayload {
  name: string;
  email: string;
  mobile: string;
  pan: string;
  city: string;
  password?: string;
  role: string;
}

interface EnquiryPayload {
  id?: number;
  enquiry_id?: string;
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  entry_time?: string;
  status?: 'Pending' | 'Resolved' | 'Closed';
  source?: string;
  subject?: string;
}

export const AdminService = {
  // Fetch DSA List 
  dsaList: async (formData: DSAListPayload = {}) => {
    const response = await api.get("/api/admin/dsalist", { params: formData });
    return response.data;
  },

  // Fetch DSA List with Search
  searchDSA: async (params = {}, options = {}) => {
    const response = await api.get("/api/admin/dsalist/search", {
      params,
      ...options
    });
    return response.data;
  },

  contactusData: async (formData: EnquiryPayload = {}) => {
    const response = await api.get("/api/admin/contactus", { params: formData });
    return response.data;
  },

  // Update a DSA user
  updateDSA: async (id: string, payload: UpdateDSAPayload) => {
    const res = await api.put(`/api/admin/dsalist/${id}`, payload);
    return res.data;
  },

  // Delete a DSA
  deleteDSA: async (id: string) => {
    const res = await api.delete(`/api/admin/dsalist/${id}`);
    return res.data;
  },

  // Get Admin Profile
  getAdminProfile: async () => {
    const res = await api.get("/api/admin/adminProfile");
    return res.data;
  },

};

