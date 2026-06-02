import api from "../api";

const EducationLoanService = {
  getAllEducationLoans: async () => {
    try {
      const response = await api.get("/api/products/finance/education-loan/all");
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default EducationLoanService;
