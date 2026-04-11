import { useState, useEffect } from 'react';

/**
 * Hook for fetching AIF Category Metrics - simulating real-time data
 */
export const useAIFCategoryMetrics = (category: string) => {
    const [metrics, setMetrics] = useState({
        institutional_sentiment: 82,
        regulatory_status: 'SEBI CAT II/III Sync',
        performance_alpha: 3.2
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        // Initial fetch simulation
        const initialTimer = setTimeout(() => {
            setLoading(false);
        }, 800);

        // Live data update simulation
        const intervalId = setInterval(() => {
            setMetrics(prev => ({
                ...prev,
                institutional_sentiment: Math.min(100, Math.max(0, prev.institutional_sentiment + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 3))),
                performance_alpha: parseFloat((prev.performance_alpha + (Math.random() - 0.5) * 0.2).toFixed(1))
            }));
        }, 3000);

        return () => {
            clearTimeout(initialTimer);
            clearInterval(intervalId);
        };
    }, [category]);

    return { metrics, loading };
};
