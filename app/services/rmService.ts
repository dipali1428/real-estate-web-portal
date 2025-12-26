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
  
  getAssignedLeadsToRm: async () => {
    const response = await api.get('/api/rm/get-assigned-leads-to-rm');
    return response.data;
  }
};
