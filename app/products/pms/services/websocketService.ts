// For demo purposes, create a mock WebSocket service
type Callback = (data: any) => void;

class MockWebSocketService {
    private subscribers: Map<string, Set<Callback>>;
    private intervalIds: Map<string, NodeJS.Timeout>;
    private mockDataGenerators: { [key: string]: () => any };

    constructor() {
        this.subscribers = new Map();
        this.intervalIds = new Map();
        this.mockDataGenerators = {
            market_data: this.generateMarketData,
            portfolio_updates: this.generatePortfolioData,
            aif_metrics: this.generateAIFMetrics,
            pms_performance: this.generatePMSPerformance
        };
    }

    connect() {
        if (typeof window === 'undefined') return;

        // console.log('Mock WebSocket service connected');

        // Start generating mock data for each channel
        Object.keys(this.mockDataGenerators).forEach(channel => {
            // Clear existing interval if any
            const existingInterval = this.intervalIds.get(channel);
            if (existingInterval) {
                clearInterval(existingInterval);
            }

            const intervalId = setInterval(() => {
                const data = this.mockDataGenerators[channel]();
                this.notifySubscribers(channel, data);
            }, channel === 'market_data' ? 5000 : 10000); // Different intervals for different channels

            this.intervalIds.set(channel, intervalId);
        });
    }

    subscribe(channel: string, callback: Callback) {
        if (!this.subscribers.has(channel)) {
            this.subscribers.set(channel, new Set());
        }
        this.subscribers.get(channel)!.add(callback);

        // Return unsubscribe function
        return () => this.unsubscribe(channel, callback);
    }

    unsubscribe(channel: string, callback: Callback) {
        const channelSubscribers = this.subscribers.get(channel);
        if (channelSubscribers) {
            channelSubscribers.delete(callback);
        }
    }

    notifySubscribers(channel: string, data: any) {
        const channelSubscribers = this.subscribers.get(channel);
        if (channelSubscribers) {
            channelSubscribers.forEach(callback => {
                callback(data);
            });
        }
    }

    disconnect() {
        // Clear all intervals
        this.intervalIds.forEach(intervalId => clearInterval(intervalId));
        this.intervalIds.clear();
        this.subscribers.clear();
        // console.log('Mock WebSocket service disconnected');
    }

    // Mock data generators
    private generateMarketData = () => {
        return {
            type: 'market_data',
            payload: {
                nifty50: {
                    price: 21000 + (Math.random() - 0.5) * 100,
                    change: (Math.random() - 0.5) * 50,
                    volume: Math.floor(Math.random() * 1000000)
                },
                sensex: {
                    price: 70000 + (Math.random() - 0.5) * 200,
                    change: (Math.random() - 0.5) * 80,
                    volume: Math.floor(Math.random() * 1500000)
                },
                timestamp: new Date().toISOString()
            }
        };
    }

    private generatePortfolioData = () => {
        return {
            type: 'portfolio_updates',
            payload: {
                totalValue: 10000000 + (Math.random() - 0.5) * 100000,
                dailyChange: (Math.random() - 0.5) * 50000,
                ytdReturn: 24.5 + (Math.random() - 0.5) * 2,
                topHoldings: [
                    { symbol: 'RELIANCE', weight: 12.5, change: (Math.random() - 0.5) * 3 },
                    { symbol: 'TCS', weight: 10.2, change: (Math.random() - 0.5) * 2.5 },
                    { symbol: 'HDFCBANK', weight: 8.7, change: (Math.random() - 0.5) * 2 },
                ]
            }
        };
    }

    private generateAIFMetrics = () => {
        const categories = ['VC', 'PE', 'RE', 'Hedge'];
        const category = categories[Math.floor(Math.random() * categories.length)];

        return {
            type: 'aif_metrics',
            payload: {
                category,
                avgIRR: 20 + (Math.random() - 0.5) * 10,
                dryPowder: 100000 + Math.random() * 50000,
                dealsClosed: Math.floor(Math.random() * 20),
                timestamp: new Date().toISOString()
            }
        };
    }

    private generatePMSPerformance = () => {
        return {
            type: 'pms_performance',
            payload: {
                avgReturn: 24.5 + (Math.random() - 0.5) * 3,
                vsNifty: 5.2 + (Math.random() - 0.5) * 2,
                sharpeRatio: 1.6 + (Math.random() - 0.5) * 0.3,
                topPerformer: 'Motilal Oswal',
                topPerformerReturn: 28.5 + (Math.random() - 0.5) * 4
            }
        };
    }
}

const websocketService = new MockWebSocketService();
export default websocketService;
