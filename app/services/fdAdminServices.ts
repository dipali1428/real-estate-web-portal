import api from "./api";

export const FDAdminService = {
  /**
   * Upload FD Plans CSV
   * POST → /api/fd/upload
   * Body: form-data with file field
   */
  uploadFDPlans: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post("/api/unlisted/admin/fd/upload", formData, {
      headers: {
        // Unset the global Content-Type so axios auto-sets
        // multipart/form-data with the correct boundary for FormData
        "Content-Type": undefined,
      },

    });
    return response.data;
  },

  /**
   * Get Current FD Plans (optional, for previewing in admin if needed)
   */
   getAllPlans: async () => {
    const response = await api.get("/api/products/investments/fd/plans");
    return response.data?.data || [];
  },


  //delete the fd plan
  deleteFDPlan: async (id: number) => {
    const res = await api.delete(`/api/unlisted/admin/fd/delete/${id}`);
    return res.data;
  },

  //update the fd plan
  updateFDPlan: async (id: number, data: any) => {
    const res = await api.put(`/api/unlisted/admin/fd/update/${id}`, data);
    return res.data;
  },
  /**
   * Get FD Plans for customer comparison
   * GET → /api/products/investments/fd/plans
   */
  getFDPlansForCompare: async () => {
    const response = await api.get("/api/products/investments/fd/plans");
    return response.data;
  }

};