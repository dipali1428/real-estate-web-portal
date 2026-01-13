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

  // getIncomingDetailedLeads: async () => {
  //   const response = await api.get('/api/rm/get-incoming-detailed-lead');
  //   return response.data; // Returns { success: boolean, count: number, leads: [] }
  // },

  // getOutgoingDetailedLeads: async () => {
  //   const response = await api.get('/api/rm/get-outgoing-detailed-lead');
  //   return response.data;
  // },

  getConsumerDetailedLeads: async () => {
    const response = await api.get('/api/rm/customer-detail-leads');
    return response.data;
  },

  getLeadDocuments: async (leadId: number) => {
    const response = await api.get(`/api/rm/customer-detail-lead-documents/${leadId}`);
    return response.data;
  },

};
