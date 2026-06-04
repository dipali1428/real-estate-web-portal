import api from "../api";

const CattleInsuranceService = {
  getAllCattleInsurance: async () => {
    try {
      const response = await api.get("/api/products/insurance/cattle-insurance/all");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default CattleInsuranceService;
