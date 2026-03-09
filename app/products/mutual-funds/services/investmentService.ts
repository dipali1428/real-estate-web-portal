import api from '../../../services/api';

export const investmentService = {
    getDashboardData: async () => {
        const response = await api.get('/api/dashboard/summary');
        return response.data;
    },

    // Goals API
    getGoals: async () => {
        const response = await api.get('/api/goals');
        return response.data;
    },
    createGoal: async (goal: any) => {
        const response = await api.post('/api/goals', goal);
        return response.data;
    },
    deleteGoal: async (id: string | number) => {
        const response = await api.delete(`/api/goals/${id}`);
        return response.data;
    },

    // Portfolio API
    getPortfolio: async () => {
        const response = await api.get('/api/investments/portfolio');
        return response.data;
    },
    getPortfolioSummary: async () => {
        const response = await api.get('/api/dashboard/summary'); // Reusing summary for now
        return response.data.summary;
    },
    getTransactionHistory: async (userId: string | number, page: number = 1, limit: number = 20) => {
        const response = await api.get(`/api/investments/history?userId=${userId}&page=${page}&limit=${limit}`);
        return response.data;
    },

    // Kept for backward compatibility
    getDashboardSummary: async () => {
        const data = await investmentService.getDashboardData();
        return data.summary;
    },
    getRecentActivity: async () => {
        const data = await investmentService.getDashboardData();
        return data.recentActivity;
    },
    getPortfolioAllocation: async () => {
        const data = await investmentService.getDashboardData();
        return data.allocation;
    }
};

export default investmentService;
