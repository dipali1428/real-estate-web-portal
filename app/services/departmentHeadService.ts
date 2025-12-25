import api from './api';

export const DepartmentHeadService = {
    getDepartmentProfile: async () => {
        // Using the endpoint: /api/department/profile
        const response = await api.get('/api/department/profile');
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