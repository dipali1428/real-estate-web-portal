import api from "../api";

export const CattleInsuranceAdminService = {

  // Upload Cattle Insurance Plans (CSV)
  uploadCattleInsurance: async (file: File) => {
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });

    const response = await api.post(
      "/api/unlisted/admin/cattle-insurance/upload",
      {
        fileName: file.name,
        base64Data: base64Data
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  },

  updateCattleInsurance: async (id: number | string, data: any) => {
    const response = await api.put(`/api/unlisted/admin/cattle-insurance/${id}`, data);
    return response.data;
  },

  deleteCattleInsurance: async (id: number | string) => {
    const response = await api.delete(`/api/unlisted/admin/cattle-insurance/${id}`);
    return response.data;
  },
};
