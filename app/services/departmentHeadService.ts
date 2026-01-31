import api from './api';

export const DepartmentHeadService = {
    getDepartmentProfile: async () => {
        // Using the endpoint: /api/department/profile
        const response = await api.get('/api/department/profile');
        return response.data;
    },
    updateDepartmentProfile: async (payload: { email: string; mobile: string; password?: string }) => {
        const response = await api.put('/api/department/update-profile', payload);
        return response.data;
    },
    getRelationshipManagers: async () => {
        const response = await api.get('/api/department/getrmlist');
        return response.data;
    },
    getDepartmentLeads: async () => {
        const response = await api.get('/api/department/getdeptLeads');
        return response.data;
    },
    
    getCustomerDetailLeads: async () => {
        const response = await api.get('/api/department/getcustomer-detail-lead');
        return response.data;
    },

    getConsumerDetailedLeads: async () => {
        const response = await api.get('/api/rm/customer-detail-leads');
        return response.data;
    },
    getLeadDocuments: async (leadId: number) => {
        const response = await api.get(`/api/rm/customer-detail-lead-documents/${leadId}`);
        return response.data;
    },
     getDetailedLeadsPaged: async (page: number, limit: number) => {
        const response = await api.get(`/api/department/getdept-detail-leads?page=${page}&limit=${limit}`);
        return response.data;
    },
};