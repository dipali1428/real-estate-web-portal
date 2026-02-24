import api from "./api";

export const PublicService = {
    submitCareerApplication: (payload: any) => {
        return api.post("/api/public/submit-career-application", payload);
      }
    
}