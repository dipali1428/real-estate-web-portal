import api from "../api";

export const EducationLoanAdminService = {

  // Upload Education Loans (CSV)
  uploadEducationLoans: async (file: File) => {
    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
      "/api/unlisted/admin/education-loan/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },

  updateEducationLoan: async (id: number | string, data: any) => {
    const response = await api.put(`/api/unlisted/admin/education-loan/${id}`, data);
    return response.data;
  },

  deleteEducationLoan: async (id: number | string) => {
    const response = await api.delete(`/api/unlisted/admin/education-loan/${id}`);
    return response.data;
  }
};
