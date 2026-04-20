import api from './api';

export const directorService = {
    getDirectorProfile: async () => {
        const response = await api.get('/api/director/get-director-profile');
        return response.data;
    },
};