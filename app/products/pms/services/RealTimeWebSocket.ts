import toast from 'react-hot-toast';
import { io, Socket } from 'socket.io-client';

type Callback = (data: any) => void;

class RealTimeWebSocket {
    private socket: Socket | null = null;
    private subscribers: Map<string, Set<Callback>> = new Map();
    private reconnectAttempts: number = 0;
    private maxReconnectAttempts: number = 10;
    private reconnectDelay: number = 1000;

    connect() {
        if (typeof window === 'undefined') return;
        if (this.socket?.connected) return;

        const wsUrl = process.env.NEXT_PUBLIC_WS_SERVER || 'ws://localhost:5000';

        this.socket = io(wsUrl, {
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionAttempts: this.maxReconnectAttempts,
            reconnectionDelay: this.reconnectDelay,
            timeout: 10000,
            auth: {
                token: typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
            }
        });

        this.socket.on('connect', () => {
            // console.log('WebSocket connected:', this.socket?.id);
            this.reconnectAttempts = 0;
            this.subscribeToDefaultChannels();
        });

        this.socket.on('disconnect', (reason) => {
            // console.log('WebSocket disconnected:', reason);
            this.handleDisconnection(reason);
        });

        this.socket.on('connect_error', (error) => {
            // console.error('WebSocket connection error:', error);
            this.handleConnectionError(error);
        });

        this.setupEventListeners();
    }

    private setupEventListeners() {
        if (!this.socket) return;

        this.socket.on('market_update', (data) => this.notifySubscribers('market_data', data));
        this.socket.on('portfolio_update', (data) => this.notifySubscribers('portfolio_data', data));
        this.socket.on('pms_update', (data) => this.notifySubscribers('pms_data', data));
        this.socket.on('aif_update', (data) => this.notifySubscribers('aif_data', data));
        this.socket.on('order_update', (data) => this.notifySubscribers('order_data', data));
        this.socket.on('news_alert', (data) => this.notifySubscribers('news', data));
    }

    private subscribeToDefaultChannels() {
        const channels = ['market_data', 'portfolio_data'];
        if (this.socket?.connected) {
            this.socket.emit('subscribe', {
                channels,
                userId: this.getUserId()
            });
        }
    }

    subscribe(channel: string, callback: Callback) {
        if (!this.subscribers.has(channel)) {
            this.subscribers.set(channel, new Set());
        }
        this.subscribers.get(channel)!.add(callback);

        if (this.socket?.connected) {
            this.socket.emit('subscribe_channel', { channel });
        }

        return () => this.unsubscribe(channel, callback);
    }

    unsubscribe(channel: string, callback: Callback) {
        const channelSubscribers = this.subscribers.get(channel);
        if (channelSubscribers) {
            channelSubscribers.delete(callback);
        }
    }

    private notifySubscribers(channel: string, data: any) {
        const channelSubscribers = this.subscribers.get(channel);
        if (channelSubscribers) {
            channelSubscribers.forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    toast.error(`Error processing ${channel} update: ${error instanceof Error ? error.message : 'Unknown error'}`);
                    // console.error('Error in subscriber callback:', error);
                }
            });
        }
    }

    private handleDisconnection(reason: string) {
        if (reason === 'io server disconnect') {
            setTimeout(() => {
                if (this.socket) this.socket.connect();
            }, 1000);
        }
    }

    private handleConnectionError(error: any) {
        this.reconnectAttempts++;
        if (this.reconnectAttempts <= this.maxReconnectAttempts) {
            const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
            setTimeout(() => {
                if (this.socket) this.socket.connect();
            }, delay);
        }
    }

    private getUserId() {
        if (typeof window === 'undefined') return null;
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        return user.id;
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
        this.subscribers.clear();
    }
}

const realTimeWebSocket = new RealTimeWebSocket();
export default realTimeWebSocket;
