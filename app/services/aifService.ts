import api from "./api";
export interface AIFFund {
  id: number;
  fund_name: string;
  category: string;
  aum: string;
  min_investment: string;
  inception_date: string;
  performance_fee: string;
  management_fee: string;
  lock_in_period: string;
  risk_level: string;
  strategy_description: string;
  target_audience: string;
  returns_since_inception: string;
  is_active: boolean;
  created_at: string;
}
export const AIFService = {
  //Upload AIF Funds (Excel) POST → /api/unlisted/admin/aif/upload
  uploadAIFFunds: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/api/unlisted/admin/aif/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // Returns { success, message, processed, skipped }
  },  
  //Update an AIF Fund PUT → /api/unlisted/admin/aif/update/:id
  updateAIFFund: async (id: number, data: Partial<AIFFund>) => {
    const response = await api.put(`/api/unlisted/admin/aif/update/${id}`, data);
    return response.data;
  },
  //Delete an AIF Fund DELETE → /api/unlisted/admin/aif/delete/:id
  deleteAIFFund: async (id: number) => {
    const response = await api.delete(`/api/unlisted/admin/aif/delete/${id}`);
    return response.data;
  },
};
