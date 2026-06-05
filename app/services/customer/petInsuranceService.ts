import api from "../api";

const PetInsuranceService = {
  getAllPetInsurance: async () => {
    try {
      const response = await api.get("/api/products/insurance/pet-insurance/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching pet insurance plans", error);
      throw error;
    }
  },
};

export default PetInsuranceService;
