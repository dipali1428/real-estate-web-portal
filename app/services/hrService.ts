import api from './api';

export const hrService = {

    getAdminProfile: async () => {
    const res = await api.get("/api/admin/adminProfile");
    return res.data;
  },
  
     updateContactStatus: async (id: string, status: string) => {
    const res = await api.put(`/api/admin/contactus/status/${id}`, { status });
    return res.data;
  },
};