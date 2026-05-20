import api from './api';

export const BranchService = {
  getBranchLeads: async () => {
    const response = await api.get('/api/branch/get-branch-leads/leads');
    return response.data;
  },
  getBranchDSAs: async () => {
    const response = await api.get('/api/branch/get-specific-branch/dsa');
    return response.data;
  }
};