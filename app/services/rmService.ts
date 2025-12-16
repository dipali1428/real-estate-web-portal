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
    const response = await api.get('api/rm/leadmanager/profile');
    return response.data;
  }
  
};
