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
  dsaList: async (formData: DSAListPayload = {}) => {
    const response = await api.get("/api/admin/dsalist", { params: formData });
    return response.data; 
  },
  contactusData: async (formData: EnquiryPayload = {}) => {
    const response = await api.get("/api/admin/contactus", { params: formData });
    return response.data; 
  },
};

