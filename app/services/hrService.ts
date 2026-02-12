import api from './api';

export const hrService = {

    getAdminProfile: async () => {
    const res = await api.get("/api/admin/adminProfile");
    return res.data;
  },
    
};