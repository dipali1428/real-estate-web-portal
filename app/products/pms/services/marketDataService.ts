import axios from 'axios';

const API_CONFIG = {
    alphaVantage: {
        baseURL: 'https://www.alphavantage.co/query',
        apiKey: process.env.NEXT_PUBLIC_ALPHA_VANTAGE_KEY || 'demo'
    },
    nseIndia: {
        baseURL: 'https://api.nseindia.com/api'
    },
    bseIndia: {
        baseURL: 'https://api.bseindia.com/BseIndiaAPI/api'
    },
    mfapi: {
        baseURL: 'https://api.mfapi.in/mf'
    }
};

class MarketDataService {
    private cache: Map<string, { data: any, timestamp: number }>;
    private cacheDuration: number;

    constructor() {
        this.cache = new Map();
        this.cacheDuration = 5 * 60 * 1000; // 5 minutes
    }

    async getLiveStockPrice(symbol: string) {
        const cacheKey = `stock_${symbol}`;

        if (this.isCacheValid(cacheKey)) {
            return this.cache.get(cacheKey)!.data;
        }

        try {
            const response = await axios.get(API_CONFIG.alphaVantage.baseURL, {
                params: {
                    function: 'GLOBAL_QUOTE',
                    symbol: `${symbol}.BSE`,
                    apikey: API_CONFIG.alphaVantage.apiKey
                }
            });

            const data = this.processAlphaVantageResponse(response.data);
            if (data) {
                this.cache.set(cacheKey, { data, timestamp: Date.now() });
            }

            return data;
        } catch (error) {
            return this.getMockStockData(symbol);
        }
    }

    async getNifty50Data() {
        try {
            return this.getMockNiftyData();
        } catch (error) {
            return this.getMockNiftyData();
        }
    }

    async getAIFCategoryData(category: string) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.getMockAIFData(category));
            }, 500);
        });
    }

    private isCacheValid(key: string) {
        const cached = this.cache.get(key);
        if (!cached) return false;

        return (Date.now() - cached.timestamp) < this.cacheDuration;
    }

    private processAlphaVantageResponse(data: any) {
        if (!data || !data['Global Quote'] || Object.keys(data['Global Quote']).length === 0) {
            return null;
        }

        const quote = data['Global Quote'];
        return {
            symbol: quote['01. symbol'],
            price: parseFloat(quote['05. price']),
            change: parseFloat(quote['09. change']),
            changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
            volume: parseInt(quote['06. volume']),
            timestamp: new Date().toISOString()
        };
    }

    private getMockStockData(symbol: string) {
        return {
            symbol: symbol,
            price: 2500 + Math.random() * 100,
            change: (Math.random() - 0.5) * 50,
            changePercent: (Math.random() - 0.5) * 2,
            volume: 1000000,
            timestamp: new Date().toISOString()
        };
    }

    private getMockNiftyData() {
        return {
            name: 'NIFTY 50',
            last: 21000 + Math.random() * 500,
            change: (Math.random() - 0.5) * 100,
            changePercent: (Math.random() - 0.5) * 2,
            timestamp: new Date().toISOString()
        };
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

const marketDataService = new MarketDataService();
export default marketDataService;
