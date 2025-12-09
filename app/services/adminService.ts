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
  status?: 'Pending' | 'Closed';
  source?: string;
  subject?: string;
}

interface Ticket {
  id: number;
  ticket_id: string;
  user_id: number;
  name: string;
  email: string;
  mobile: string;
  category: string;
  subject: string;
  description: string;
  status: 'Open' | 'Resolved' | 'Closed';
  created_at: string;
  updated_at: string;
  assigned_to?: string | null;
  comments?: Comment[];
  priority?: 'High' | 'Medium' | 'Low';
}

interface Comment {
  id: string;
  text: string;
  author: string;
  role: 'admin' | 'dsa';
  created_at: string;
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
  
    updateContactStatus: async (id: string, status: string) => {
    // IMPORTANT: Use backticks (`) not single quotes (')
    const res = await api.put(`/api/admin/contactus/status/${id}`, { status });
    return res.data;
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

  getTickets: async (params?: {
    status?: string;
    category?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) => {
    const response = await api.get("/api/admin/tickets", { params });
    return response.data;
  },
  
  getTicket: async (ticketId: string) => {
    const response = await api.get(`/api/admin/tickets/${ticketId}`);
    return response.data;
  },
  
  updateTicketStatus: async (ticketId: string, status: string) => {
    const response = await api.put(`/api/admin/tickets/${ticketId}/status`, { status });
    return response.data;
  },
  
  addComment: async (ticketId: string, comment: string) => {
    const response = await api.post(`/api/admin/tickets/${ticketId}/comments`, { text: comment });
    return response.data;
  },

};

