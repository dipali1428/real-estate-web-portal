import { useState, useEffect } from 'react';
import { mutualFundService } from "../services/mutualfundservice";
// import { fetchTopPerformingFunds } from '../products/mutualfunds/services/mfApi';
import api from '../services/api';

export const useDashboardData = () => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Determine if we should mock or fetch based on auth
                // Ideally this hook is only used when authenticated.
                const dashboardData = await mutualFundService.getDashboardData();
                setData(dashboardData);
            } catch (error) {
                console.error("Failed to load dashboard data", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    return { data, isLoading };
};

export const useMarketIndices = () => {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchIndices = async () => {
            try {
                const response = await api.get('/api/public/indices');
                setData(response.data || []);
            } catch (error) {
                console.error("Failed to fetch market indices", error);
                // Fallback to mock data if API fails to avoid blank screen
                setData([
                    { name: "Nifty 50", price: 24500, change: 120, changePercent: 0.5, trend: "up" },
                    { name: "Sensex", price: 80200, change: 350, changePercent: 0.45, trend: "up" },
                    { name: "Bank Nifty", price: 52100, change: -80, changePercent: -0.15, trend: "down" },
                    { name: "Nifty IT", price: 38500, change: 400, changePercent: 1.05, trend: "up" },
                    { name: "Nifty Next 50", price: 72400, change: 150, changePercent: 0.21, trend: "up" },
                    { name: "Nifty Midcap 50", price: 14200, change: 45, changePercent: 0.32, trend: "up" }
                ]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchIndices();

        // Refresh every 5 minutes
        const interval = setInterval(fetchIndices, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    return { data, isLoading };
};
// export const useGoals = () => {
//     const [data, setData] = useState<any[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [refresh, setRefresh] = useState(0);

//     useEffect(() => {
//         const loadGoals = async () => {
//             try {
//                 const goals = await mutualFundService.getGoals();
//                 setData(goals);
//             } catch (error) {
//                 console.error("Failed to load goals", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         loadGoals();
//     }, [refresh]);

//     const mutate = () => setRefresh(prev => prev + 1);

//     return { data, isLoading, mutate };
// };

// export const usePortfolio = () => {
//     const [data, setData] = useState<any[]>([]);
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const loadPortfolio = async () => {
//             try {
//                 const portfolio = await mutualFundService.getPortfolio();
//                 setData(portfolio);
//             } catch (error) {
//                 console.error("Failed to load portfolio", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         loadPortfolio();
//     }, []);

//     return { data, isLoading };
// };

// export const usePortfolioSummary = () => {
//     const [data, setData] = useState<any>({});
//     const [isLoading, setIsLoading] = useState(true);

//     useEffect(() => {
//         const loadSummary = async () => {
//             try {
//                 const summaryValue = await mutualFundService.getPortfolioSummary();
//                 setData(summaryValue);
//             } catch (error) {
//                 console.error("Failed to load portfolio summary", error);
//             } finally {
//                 setIsLoading(false);
//             }
//         };
//         loadSummary();
//     }, []);

//     return { data, isLoading };
// };
