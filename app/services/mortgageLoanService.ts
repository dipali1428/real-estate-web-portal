import api from "./api"
export interface MortgageLoanPlan {
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
export const MortgageLoanService = {
  // Upload Mortgage Loan Plans (Excel) POST → /api/unlisted/admin/mortgage-loan/upload
  uploadMortgageLoanPlans: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/api/unlisted/admin/mortgage-loan/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },
  //Get all Mortgage Loan Plans (Used for both Admin & Customer) GET → /api/products/finance/mortgage-loan/plans
  getAllMortgageLoanPlans: async () => {
    const response = await api.get("/api/products/finance/mortgage-loan/plans");
    return response.data;
  },
  // Update a Mortgage Loan Plan PUT → /api/unlisted/admin/mortgage-loan/update/:id
  updateMortgageLoanPlan: async (id: number, data: Partial<MortgageLoanPlan>) => {
    const response = await api.put(`/api/unlisted/admin/mortgage-loan/update/${id}`, data);
    return response.data;
  },
  // Delete a Mortgage Loan Plan DELETE → /api/unlisted/admin/mortgage-loan/delete/:id
  deleteMortgageLoanPlan: async (id: number) => {
    const response = await api.delete(`/api/unlisted/admin/mortgage-loan/delete/${id}`);
    return response.data;
  },
};
