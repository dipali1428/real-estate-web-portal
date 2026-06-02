import api from "../api";

export const EducationLoanAdminService = {
  /**
   * Upload Education Loans (CSV/XLSX)
   */
  uploadEducationLoans: async (file: File) => {
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });

    const response = await api.post(
      "/api/unlisted/admin/education-loan/upload",
      {
        fileName: file.name,
        base64Data: base64Data
      },
      { headers: { "Content-Type": "application/json" } }
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
