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
        const response = await api.get('/api/department/getrm');
        return response.data;
    },
    getDepartmentLeads: async () => {
        const response = await api.get('/api/department/getdeptLeads');
        return response.data;
    },
};