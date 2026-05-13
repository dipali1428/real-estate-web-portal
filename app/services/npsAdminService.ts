import api from "./api";

const NpsAdminService = {
    /**
     * Get all NPS meetings (Admin use)
     * GET → /api/unlisted/admin/nps/meetings
     */
    getAllMeetings: async () => {
        const response = await api.get("/api/unlisted/admin/nps/meetings");
        return response.data;
    },

    /**
     * Get NPS meeting by ID (Admin)
     * GET → /api/unlisted/admin/nps/meetings/:id
     */
    getMeetingById: async (id: string | number) => {
        const response = await api.get(`/api/unlisted/admin/nps/meetings/${id}`);
        return response.data;
    },

    /**
     * Update NPS meeting (Admin)
     * PUT → /api/unlisted/admin/nps/meetings/:id
     */
    updateMeeting: async (id: string | number, meetingData: any) => {
        const response = await api.put(`/api/unlisted/admin/nps/meetings/${id}`, meetingData);
        return response.data;
    },

    /**
     * Update NPS meeting status (Admin)
     * PUT → /api/unlisted/admin/nps/meetings/:id/status
     */
    updateMeetingStatus: async (id: string | number, status: string) => {
        const response = await api.put(`/api/unlisted/admin/nps/meetings/${id}/status`, {
            status,
        });
        return response.data;
    },

    /**
     * Delete NPS meeting (Admin)
     * DELETE → /api/unlisted/admin/nps/meetings/:id
     */
    deleteMeeting: async (id: string | number) => {
        const response = await api.delete(`/api/unlisted/admin/nps/meetings/${id}`);
        return response.data;
    }
};

export default NpsAdminService;
