import api from '../../../services/api';

export const fetchTopPerformingFunds = async () => {
    // For now, search for "Bluechip" to simulate top funds since we don't have a dedicated endpoint yet
    // or return a static list if preferred. Let's use search.
    try {
        const response = await api.get('/api/mf/search?query=Bluechip');
        return response.data.slice(0, 4).map((f: any) => ({
            name: f.scheme_name,
            category: "Equity", // Placeholder as list doesn't have category
            return: "+15.2%",   // Placeholder
            risk: "High",       // Placeholder
            rating: "5★",       // Placeholder
            schemeCode: f.scheme_code
        }));
    } catch (error) {
        console.error("Failed to fetch top funds", error);
        return [];
    }
};

export const searchMutualFunds = async (query: string) => {
    try {
        const response = await api.get(`/api/mf/search?query=${query}`);
        // Backend returns array of { scheme_code, scheme_name }
        return response.data.map((f: any) => ({
            name: f.scheme_name,
            schemeCode: f.scheme_code
        }));
    } catch (error) {
        console.error("Search failed", error);
        return [];
    }
};

export const fetchFundDetails = async (schemeCode: string | number) => {
    try {
        const response = await api.get("/api/mf/" + schemeCode);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch fund details", error);
        throw error;
    }
};
export const fetchMarketMovers = async (timeframe: string = '1w') => {
    try {
        // This is a placeholder as the backend doesn't have a dedicated movers endpoint yet.
        // We simulate gainers and losers.
        const response = await api.get(`/api/mf/search?query=Bluechip`);
        const funds = response.data.slice(0, 10);

        return {
            gainers: funds.slice(0, 5).map((f: any) => ({
                schemeCode: f.scheme_code,
                name: f.scheme_name,
                nav: (Math.random() * 100 + 50).toFixed(2),
                changeStr: `+${(Math.random() * 5 + 1).toFixed(2)}%`,
                date: new Date().toLocaleDateString()
            })),
            losers: funds.slice(5, 10).map((f: any) => ({
                schemeCode: f.scheme_code,
                name: f.scheme_name,
                nav: (Math.random() * 100 + 50).toFixed(2),
                changeStr: `-${(Math.random() * 3 + 0.5).toFixed(2)}%`,
                date: new Date().toLocaleDateString()
            }))
        };
    } catch (error) {
        console.error("Failed to fetch market movers", error);
        return { gainers: [], losers: [] };
    }
};
