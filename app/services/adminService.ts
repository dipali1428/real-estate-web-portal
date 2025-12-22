// adminService.ts
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

interface RolesListPayload {
  id?: string;
  name?: string;
  email?: string;
  mobile?: string;
  city?: string;
  date_joined?: string;
  updated_at?: string;
  role?: string;
  department?: string;
  sub_category?: string;

}
interface UpdateRoleListPayload {
  name: string;
  email: string;
  mobile: string;
  city: string;
  role: string;
  department?: string;
  sub_category?: string;

}
interface AddRoleUserPayload {
  adv_id: string;
  name: string;
  email: string;
  mobile: string;
  pan: string;
  city: string;
  role: string;
  head?: string;
  category?: string;
  referral_code: string;
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
  admin_solution?: string;
  admin_id?: number;
  solved_at?: string;
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

  // Update Admin Profile
  updateAdminProfile: async (payload: any) => {
    const res = await api.put("/api/admin/adminProfile/update", payload);
    return res.data;
  },

  // Get all Tickets on Admin Dashboard
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

  // Solve ticket with admin solution 
  solveTicket: async (ticketId: string | number, solution: string) => {
    const response = await api.put(`/api/admin/tickets/${ticketId}/solve`, {
      solution: solution
    });
    return response.data;
  },

  // Add these to DashboardService in your service file
  getRms: async () => {
    const response = await api.get("/api/admin/rmlist");
    return response.data;
  },

  // 🔹 Get Unassigned DSAs/Leads
  getUnassignedDsas: async () => {
    const response = await api.get("/api/admin/unassigned-dsas");
    return response.data;
  },

  assignDsaToRm: async (payload: { dsa_id: string; rm_id: string }) => {
    const response = await api.put("/api/admin/assign-dsa-to-rm", payload);
    return response.data;
  },

  // Fetch Role List 
  rolesist: async (formData: RolesListPayload = {}) => {
    const response = await api.get("/api/admin/rolelist", { params: formData });
    return response.data;
  },

  /// Update a Role user
  updaterolelist: async (id: string, payload: UpdateRoleListPayload) => {
    const res = await api.put(`/api/admin/rolelist/${id}`, payload);
    return res.data;
  },

  addroleuser: async (payload: AddRoleUserPayload) => {
    const res = await api.post("/api/admin/add-role-user", payload);
    return res.data;
  },

};

