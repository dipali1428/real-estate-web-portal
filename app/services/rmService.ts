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
  updateReferralStatus: async (leadId: number, newStatus: string) => {
    const response = await api.put(`/api/rm/${leadId}/referral-status`,{
      referral_lead_status: newStatus  // ✅ MATCH BACKEND
    },);
    return response.data;
  },
};
