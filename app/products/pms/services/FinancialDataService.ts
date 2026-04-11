import axios, { AxiosInstance } from 'axios';
import REAL_APIS from './marketDataApis';
import toast from 'react-hot-toast';

class FinancialDataService {
    private nseInstance: AxiosInstance;
    private bseInstance: AxiosInstance;
    private alphaVantageInstance: AxiosInstance;
    private cache: Map<string, { data: any, timestamp: number }>;
    private cacheDuration: number;

    constructor() {
        this.nseInstance = axios.create({
            baseURL: REAL_APIS.NSE_INDIA.baseURL,
            headers: REAL_APIS.NSE_INDIA.headers,
            timeout: 10000
        });

        this.bseInstance = axios.create({
            baseURL: REAL_APIS.BSE_INDIA.baseURL,
            timeout: 10000
        });

        this.alphaVantageInstance = axios.create({
            baseURL: REAL_APIS.ALPHA_VANTAGE.baseURL,
            params: REAL_APIS.ALPHA_VANTAGE.params,
            timeout: 10000
        });

        this.cache = new Map();
        this.cacheDuration = 5 * 60 * 1000;
    }

    async getNifty50LiveData() {
        const cacheKey = 'nifty50_live';
        if (this.isCacheValid(cacheKey)) return this.cache.get(cacheKey)!.data;

        try {
            const response = await this.nseInstance.get(`${REAL_APIS.NSE_INDIA.endpoints.equityIndices}NIFTY%2050`);
            const data = this.processNSEIndexData(response.data);
            if (data) return this.cacheAndReturn(cacheKey, data);
        } catch (error) {
            // console.warn('NSE fetch failed, falling back to Alpha Vantage');
            toast.error(`Error fetching Nifty 50 data from NSE: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }

        try {
            const response = await this.alphaVantageInstance.get('', {
                params: { function: 'GLOBAL_QUOTE', symbol: 'NIFTY50.NSE' }
            });
            const quote = response.data['Global Quote'];
            if (quote) {
                const data = {
                    name: 'NIFTY 50',
                    last: parseFloat(quote['05. price']),
                    change: parseFloat(quote['09. change']),
                    changePercent: parseFloat(quote['10. change percent'].replace('%', '')),
                    timestamp: new Date().toISOString()
                };
                return this.cacheAndReturn(cacheKey, data);
            }
        } catch (error) {
            // console.warn('Alpha Vantage fetch failed');
            toast.error(`Error fetching Nifty 50 data: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }

        return this.getMockNiftyData();
    }

    async getSensexLiveData() {
        const cacheKey = 'sensex_live';
        if (this.isCacheValid(cacheKey)) return this.cache.get(cacheKey)!.data;

        try {
            const response = await this.bseInstance.get(`${REAL_APIS.BSE_INDIA.endpoints.indices}?Indices=SENSEX`);
            const data = this.processBSEIndexData(response.data);
            if (data) return this.cacheAndReturn(cacheKey, data);
        } catch (error) {
            return this.getMockSensexData();
        }
    }

    async getStockQuote(symbol: string, exchange = 'NSE') {
        try {
            if (exchange === 'NSE') {
                const response = await this.nseInstance.get(`${REAL_APIS.NSE_INDIA.endpoints.quote}${symbol}`);
                return this.processNSESymbolData(response.data);
            }
            return this.getMockStockData(symbol);
        } catch (error) {
            return this.getMockStockData(symbol);
        }
    }

    async getPortfolioPerformanceHistory(portfolioId: string, period = '1mo') {
        // Simplified for migration, returning mock or calculating based on actual data if available
        return this.getMockHistory(period);
    }

    async getPMSPerformanceData() {
        return this.getStubPMSPerformanceData();
    }

    async getAIFCategoryData() {
        return this.getStubAIFData();
    }

    async getHistoricalData(symbol: string, period = '1y') {
        const points = period === '1mo' ? 22 : period === '6mo' ? 125 : 252;
        const basePrice = symbol === '^NSEI' ? 21000 : 72000;

        return Array.from({ length: points }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - (points - i));
            return {
                date: date.toISOString().split('T')[0],
                close: basePrice + (i * 10) + (Math.sin(i / 10) * 100) + (Math.random() * 50),
                volume: 1000000 + (Math.random() * 500000)
            };
        });
    }

    async getMarketPulseData(period = '1d') {
        return this.getMockPulseData(period);
    }

    async getSectorPerformance() {
        return this.getMockSectorData();
    }

    private isCacheValid(key: string) {
        const cached = this.cache.get(key);
        return cached ? (Date.now() - cached.timestamp) < this.cacheDuration : false;
    }

    private cacheAndReturn(key: string, data: any) {
        this.cache.set(key, { data, timestamp: Date.now() });
        return data;
    }

    private processNSEIndexData(data: any) {
        if (!data.data || !data.data[0]) return null;
        const indexData = data.data[0];
        return {
            name: indexData.index,
            last: parseFloat(indexData.last),
            change: parseFloat(indexData.change),
            changePercent: parseFloat(indexData.pChange),
            timestamp: indexData.lastUpdateTime || new Date().toISOString()
        };
    }

    private processBSEIndexData(data: any) {
        if (!data) return null;
        return {
            name: 'SENSEX',
            last: parseFloat(data.currentValue),
            change: parseFloat(data.change),
            changePercent: parseFloat(data.pChange),
            timestamp: new Date().toISOString()
        };
    }

    private processNSESymbolData(data: any) {
        if (!data.priceInfo) return null;
        return {
            symbol: data.info.symbol,
            last: data.priceInfo.lastPrice,
            change: data.priceInfo.change,
            changePercent: data.priceInfo.pChange
        };
    }

    private getMockNiftyData() {
        return { name: 'NIFTY 50', last: 21850.45, change: 125.30, changePercent: 0.58, timestamp: new Date().toISOString() };
    }

    private getMockSensexData() {
        return { name: 'SENSEX', last: 72150.12, change: 412.50, changePercent: 0.57, timestamp: new Date().toISOString() };
    }

    private getMockStockData(symbol: string) {
        return { symbol, last: 2500 + Math.random() * 100, change: (Math.random() - 0.5) * 50, changePercent: (Math.random() - 0.5) * 2 };
    }

    private getMockHistory(period: string) {
        const points = period === '1mo' ? 30 : 90;
        return Array.from({ length: points }, (_, i) => ({
            date: `Day ${i + 1}`,
            portfolio: 100 + (i * 0.6) + Math.random() * 2,
            benchmark: 100 + (i * 0.45) + Math.random() * 1.5,
            topQuartile: 100 + (i * 0.7) + Math.random() * 3
        }));
    }

    private getMockPulseData(period: string) {
        const points = period === '1d' ? 12 : 30;
        return Array.from({ length: points }, (_, i) => ({
            name: `Point ${i + 1}`,
            nifty: 21500 + (Math.sin(i / 2) * 200) + Math.random() * 50,
            sensex: 71200 + (Math.sin(i / 2) * 600) + Math.random() * 150
        }));
    }

    private getMockSectorData() {
        return [
            { name: 'AUTO', last: 18250, change: 120, changePercent: 0.65 },
            { name: 'BANK', last: 45600, change: -210, changePercent: -0.46 },
            { name: 'IT', last: 36200, change: 450, changePercent: 1.25 }
        ].map(s => ({ ...s, timestamp: new Date().toISOString() }));
    }

    private getStubPMSPerformanceData() {
        return { topPerformers: [], categoryAverage: 22.4, benchmarkReturn: 18.2 };
    }

    private getStubAIFData() {
        return { totalAUM: 680000, numberOfFunds: 1200 };
    }
}

const financialDataService = new FinancialDataService();
export default financialDataService;
