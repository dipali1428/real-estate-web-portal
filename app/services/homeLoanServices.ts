import api from "./api";
export interface HomeLoanPlan {
  id: number;
  bank_name: string;
  category: string;
  interest_rate: string;
  processing_fee: string;
  benefits: string[];
  color: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
export const HomeLoanService = {
  // Upload Home Loan Plans (Excel) POST → /api/unlisted/admin/home-loan/upload
  uploadHomeLoanPlans: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/api/unlisted/admin/home-loan/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // Returns { success, message, processed, skipped }
  },
  //Get all active Home Loan Plans (Public/Customer) GET → /api/products/finance/home-loan/plans
  getPublicHomeLoanPlans: async () => {
    const response = await api.get("/api/products/finance/home-loan/plans");
    return response.data;
  },
  //Get all Home Loan Plans (Admin & Customer) GET → /api/products/finance/home-loan/plans
  getAllHomeLoanPlans: async () => {
    const response = await api.get("/api/products/finance/home-loan/plans");
    return response.data;
  },
  // Update a Home Loan Plan PUT → /api/unlisted/admin/home-loan/update/:id
  updateHomeLoanPlan: async (id: number, data: Partial<HomeLoanPlan>) => {
    const response = await api.put(`/api/unlisted/admin/home-loan/update/${id}`, data);
    return response.data;
  },
  // Delete a Home Loan Plan DELETE → /api/unlisted/admin/home-loan/delete/:id
  deleteHomeLoanPlan: async (id: number) => {
    const response = await api.delete(`/api/unlisted/admin/home-loan/delete/${id}`);
    return response.data;
  },
};
