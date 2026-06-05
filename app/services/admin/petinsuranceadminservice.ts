import api from "../api";

export const PetInsuranceAdminService = {

  // Upload Pet Insurance Plans (CSV)
  uploadPetInsurance: async (file: File) => {
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });

    const response = await api.post(
      "/api/unlisted/admin/pet-insurance/upload",
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

  updatePetInsurance: async (id: number | string, data: any) => {
    const response = await api.put(`/api/unlisted/admin/pet-insurance/${id}`, data);
    return response.data;
  },

  deletePetInsurance: async (id: number | string) => {
    const response = await api.delete(`/api/unlisted/admin/pet-insurance/${id}`);
    return response.data;
  },
};
