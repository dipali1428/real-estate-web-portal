import api from "./api";

export interface PMSFund {
  id: number;
  fund_name: string;
  description: string;
  category: string;
  risk_level: string;
  min_investment: number;
  aum: number;
  return_1y: number;
  return_3y: number;
  return_5y: number;
  benchmark: string;
  inception_date: string;
  portfolio_style: string;
  strategy_type: string;
  sector_exposure: any;
  market_allocation: any;
  top_holdings: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export const PMSService = {
  /**
   * Upload PMS Funds (Excel)
   * POST → /api/unlisted/admin/pms/upload
   */
  uploadPMSFunds: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/api/unlisted/admin/pms/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data; // Returns { success, message, processed, skipped }
  },

  /**
   * Get all PMS Funds (Admin)
   * GET → /api/unlisted/admin/pms/funds
 

  /**
   * Update a PMS Fund
   * PUT → /api/unlisted/admin/pms/update/:id
   */
  updatePMSFund: async (id: number, data: Partial<PMSFund>) => {
    const response = await api.put(`/api/unlisted/admin/pms/update/${id}`, data);
    return response.data;
  },

  /**
   * Delete a PMS Fund
   * DELETE → /api/unlisted/admin/pms/delete/:id
   */
  deletePMSFund: async (id: number) => {
    const response = await api.delete(`/api/unlisted/admin/pms/delete/${id}`);
    return response.data;
  },
};
