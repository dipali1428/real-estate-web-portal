class AIFDataService {
    async getAIFCategoryData(category: string) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.getMockAIFData(category));
            }, 500);
        });
    }

    async getStubAIFData() {
        return { totalAUM: 680000, numberOfFunds: 1200 };
    }

    private getMockAIFData(category: string) {
        const baseData: { [key: string]: any } = {
            'vc': { avgIRR: 32, totalAUM: 150000, fundsCount: 450 },
            'pe': { avgIRR: 24, totalAUM: 350000, fundsCount: 220 },
            're': { avgIRR: 18, totalAUM: 180000, fundsCount: 150 },
            'hedge': { avgIRR: 15, totalAUM: 120000, fundsCount: 180 }
        };

        return baseData[category?.toLowerCase()] || { avgIRR: 20, totalAUM: 200000, fundsCount: 250 };
    }
}

const aifDataService = new AIFDataService();
export default aifDataService;
