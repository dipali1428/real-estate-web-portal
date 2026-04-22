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

// interface Ticket {
//   id: number;
//   ticket_id: string;
//   user_id: number;
//   name: string;
//   email: string;
//   mobile: string;
//   category: string;
//   subject: string;
//   description: string;
//   status: 'Open' | 'Resolved' | 'Closed';
//   created_at: string;
//   updated_at: string;
//   assigned_to?: string | null;
//   comments?: Comment[];
//   admin_solution?: string;
//   admin_id?: number;
//   solved_at?: string;
// }

interface Comment {
  id: string;
  text: string;
  author: string;
  role: 'admin' | 'dsa';
  created_at: string;
}

export interface CareerApplication {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  current_city: string;
  total_experience: string;
  notice_period: string;
  current_ctc: string;
  expected_ctc: string;
  linkedin_url: string;
  applying_for: string;
  status: string;
  created_at: string;
}

export const AdminService = {
  // Fetch All Users (Admins, RMs, Department Heads, DSAs)
  getAllUsers: async () => {
    const response = await api.get("/api/admin/getalldata");
    return response.data;
  },

  // Fetch DSA List 
  dsaList: async (params?: { page?: number; limit?: number; search?: string }) => {
    const response = await api.get("/api/admin/dsalist", { params });
    return response.data;
  },

  //Download DSA List as CSV
  downloadDsa: async () => {
    const response = await api.get("/api/admin/dsalist/download");
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
  getUnassignedDsas: async (params?: { limit?: number; offset: number; search?: string }) => {
    const response = await api.get(`/api/admin/unassigned-dsas`, { params });
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

  uploadUsersCSV: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file); // The backend expects the file in the 'file' field

    const res = await api.post("/api/admin/upload-users-csv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  uploadDetailLeadsCSV: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await api.post("/api/admin/upload-detail-leads-csv", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  // Get CIBIL Requests
  getCIBILRequests: async () => {
    const response = await api.get("/api/admin/get-cibil-request");
    return response.data;
  },
  // // Fetch all detailed leads
  // getAllDetailLeads: async () => {
  //   const response = await api.get("/api/admin/get-all-detail-leads");
  //   return response.data;
  // },

  getAllReferralLeads: async () => {
    const response = await api.get("/api/admin/get-all-referral-leads");
    return response.data;
  },

  getCareerApplications: async (): Promise<{ success: boolean; career_applications: CareerApplication[]; count: number }> => {
    const response = await api.get("/api/admin/career-applications");
    return response.data;
  },


  // Updated to accept pagination and search params
  getAllDetailLeads: async (params?: { page?: number; limit?: number; search?: string }) => {
    const response = await api.get("/api/admin/get-all-detail-leads", { params });
    return response.data;
  },

  exportDetailLeads: async () => {
    return await api.get("/api/admin/get-all-detail-leads/export", {
      responseType: "blob",
      headers: {
        Accept: "text/csv",
      },
    });
  },
  // Update a Detailed Lead
  updateDetailLead: async (id: number | string, payload: any) => {
    const response = await api.put(`/api/admin/get-all-detail-leads/${id}`, payload);
    return response.data;
  },

  // 🔹 TDS Management APIs
  getTDSData: async (params?: { page?: number; limit?: number; search?: string }) => {
    const response = await api.get("/api/admin/tds/data", { params });
    return response.data;
  },

  // Add this inside the AdminService object in adminService.ts
  exportTDS: async () => {
    return await api.get("/api/admin/tds/download");
  },

  uploadTDS: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file); // Backend expects the file in the 'file' field

    const res = await api.post("/api/admin/tds/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  getDSAKycStatus: async (params?: { page?: number; limit?: number; search?: string }) => {
    const response = await api.get("/api/admin/get-dsa-kyc-status", { params });
    return response.data;
  },

  updateDSAKycStatus: async (user_id: number, payload: any) => {
    const res = await api.put(`/api/admin/update-dsa-kyc-status/${user_id}`, payload);
    return res.data;
  },

  getAssignedDsas: async (params?: { limit?: number; offset: number; search?: string }) => {
    const response = await api.get(`/api/admin/assigned-dsas`, { params });
    return response.data;
  },

  prefillLogs: async () => {
    const response = await api.get("/api/admin/get-prefill-logs");
    return response.data;
  },

  uploadCampaign: async (payload: {
    templateName: string;
    category: string;
    subCategory: string;
    description: string;
    image: File
  }) => {
    const formData = new FormData();
    formData.append("templateName", payload.templateName);
    formData.append("category", payload.category);
    formData.append("subCategory", payload.subCategory);
    formData.append("description", payload.description);
    formData.append("image", payload.image);

    const res = await api.post("/api/admin/upload-campaign", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  getCampaigns: async () => {
    const response = await api.get("/api/admin/campaigns");
    return response.data;
  },

  async deleteCampaign(id: string) {
    const response = await api.delete(`/api/admin/campaigns/${id}`);
    return response.data;
  },

  // Generate Bypass Tokens/Coupons
  generateCoupons: async (payload: { count: number; prefix: string; batch_label: string }) => {
    const res = await api.post("/api/admin/generate-coupons", payload);
    return res.data;
  },

  getCouponsDetails: async (params?: { 
    status?: string; 
    coupon_code?: string; 
    page?: number; 
    limit?: number; 
    from_date?: string; 
    to_date?: string 
  }) => {
    const response = await api.get("/api/admin/get-coupons-details", { params });
    return response.data;
  },

  getAgreementRequests: async (params?: { limit?: number; offset?: number; search?: string }) => {
    const response = await api.get("/api/admin/get-agreement-requests", { params });
    return response.data;
  },
};

