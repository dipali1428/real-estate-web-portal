import api from './api';

export const RmService = {
  
  getReferralLeads: async () => {
    const response = await api.get('/api/rm/get-referral-leads'); 
    return response.data;
  },

  getYourDsaList:async()=>{
    const response = await api.get('/api/rm/get-mydsa');
    return response.data;
  },

  getRmProfile : async()=>{
    const response = await api.get('api/rm/get-rm-profile');
    return response.data;
  },
  
  updateRmProfile: async (payload: any) => {
    const res = await api.put("/api/rm/update-profile", payload);
    return res.data;
  },
  
   getoutgoingLeadsToRm: async () => {
     const response = await api.get('api/rm/get-outgoing-assigned-lead');
     return response.data;
   },

  getIncomingAssignedLeads: async () => {
    const response = await api.get('/api/rm/get-incoming-assigned-lead');
    return response.data;
  },

    getMyDetailLeads: async () => {
    const response = await api.get('/api/rm/get-my-detail-lead');
    return response.data; // Returns { success: boolean, count: number, leads: [] }
  },
   
   getIncomingDetailLeads: async () => {
    const response = await api.get('/api/rm/get-incoming-detail-lead');
    return response.data; // Returns { success: boolean, count: number, leads: [] }
  },
  
   getOutgoingDetailLeads: async () => {
    const response = await api.get('/api/rm/get-outgoing-detail-lead');
    return response.data; // Returns { success: boolean, count: number, leads: [] }
  },
  

  getConsumerDetailedLeads: async () => {
    const response = await api.get('/api/rm/customer-detail-leads');
    return response.data;
  },

  getLeadDocuments: async (leadId: number) => {
    const response = await api.get(`/api/rm/customer-detail-lead-documents/${leadId}`);
    return response.data;
  },
   acceptDetailLead: async (leadId:number) => {
    const response = await api.post(`/api/rm/detail-leads/${leadId}/accept`);
    return response.data;
  },

  rejectDetailLead: async (leadId: number) => {
    const response = await api.post(`/api/rm/detail-leads/${leadId}/reject`);
    return response.data;
  },
  updateReferralStatus: async (leadId: number, newStatus: string, note?: string) => {
    const response = await api.put(`/api/rm/${leadId}/referral-status`, {
      referral_lead_status: newStatus,
      rejection_note: note  // Matches your backend expectation
    });
    return response.data;
  },
 updateDetailLeadStatus: async (leadId: number, newStatus: string) => {
    // Ensure the ID is passed correctly in the URL and body matches backend expectations
    const response = await api.put(`/api/rm/${leadId}/detail-lead-status`, {
      lead_status: newStatus
    });
    return response.data;
  },

  uploadPayoutGrid: async (payload: {
    payoutGridName: string;
    category: string;
    mainCategory: string;
    subCategory: string;
    file: File;
  }) => {
    const formData = new FormData();
    formData.append("payoutGridName", payload.payoutGridName);
    formData.append("category", payload.category);
    formData.append("mainCategory", payload.mainCategory);
    formData.append("subCategory", payload.subCategory);
    formData.append("file", payload.file);

    const res = await api.post("/api/admin/upload-payout-grid", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  },

  getPayoutGrids: async () => {
    const response = await api.get("/api/admin/payout-grids");
    return response.data;
  },

  deletePayoutGrid: async (id: string) => {
    const response = await api.delete(`/api/admin/payout-grid/${id}`);
    return response.data;
},

};
