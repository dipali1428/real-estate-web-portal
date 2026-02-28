// services/unlistedservices.ts
import api from "./api";

export interface EnquiryPayload {
  company_id?: number;
  company_name?: string;
  enquiry_type: 'buy' | 'sell' | 'other';
  full_name: string;
  email: string;
  phone: string;
  quantity?: number;
  message?: string;
}

export interface EnquiryResponse {
  data: {
    id: number;
    company_id: number;
    enquiry_type: 'buy' | 'sell' | 'other';
    full_name: string;
    email: string;
    phone: string;
    quantity: number;
    created_at: string;
  };
}

// Top Movers Interfaces
export interface TopMover {
  id: number;
  shares_name: string;
  latest_price: string;
  percentage_change: string;
}

export interface TopMoversResponse {
  success: boolean;
  type: 'gainers' | 'losers';
  data: TopMover[];
}

// Dashboard Interfaces
export interface DashboardSummary {
  totalInvestors: number;
  totalCompanies: number;
  totalSharesListed: number;
  activeOrders: number;
  marketGainPercent: number;
}

export interface DashboardResponse {
  success: boolean;
  summary: DashboardSummary;
  graph: GraphPoint[];
}

// Graph Data Interface
export interface GraphPoint {
  price_date: string;
  market_price: string;
}

// Create a new interface for the graph response
export interface GraphResponse {
  success: boolean;
  summary: DashboardSummary; // If summary is included
  graph: GraphPoint[];
}

// ✅ NEW: Interface for Share-specific Graph Response
export interface ShareGraphData {
  price_date: string;
  market_price: string | number;
}

export interface ShareGraphResponse {
  success: boolean;
  share_id: number;
  view: string;
  graph: ShareGraphData[];
}

// ✅ NEW: Company Interface for the companies API
export interface Company {
  id: number;
  name: string;
  logo_url: string;
  description: string | null;
  createdat: string;
  updatedat: string;
}

export interface CorporateAction {
  id: number;
  shares_name: string;
  title: string;
  description: string;
  type: string;
  source: string;
  source_url: string;
  action_date: string;
}

export interface CorporateActionsResponse {
  success: boolean;
  count: number;
  data: CorporateAction[];
}

// Fetch all shares
export const fetchAllShares = async () => {
  try {
    const response = await api.get("/api/unlisted/public/shares");
    return response.data;
  } catch (error: any) {
    console.error("DEBUG - URL called:", error.config?.url);
    console.error("DEBUG - Status code:", error.response?.status);
    throw error;
  }
};

// Fetch Graph Data
export const fetchGraphData = async (): Promise<GraphPoint[]> => {
  try {
    const response = await api.get("/api/unlisted/public/graph");
    return response.data;
  } catch (error: any) {
    console.error("DEBUG - Graph URL called:", error.config?.url);
    console.error("DEBUG - Graph Error:", error.response?.data);
    throw error;
  }
};

// Fetch Graph Data by Share ID - FIXED: Returns ShareGraphResponse with graph array
export const fetchIdGraphData = async (share_id: number): Promise<ShareGraphResponse> => {
  try {
    const response = await api.get(`/api/unlisted/public/${share_id}/graph`); 
    return response.data;
  } catch (error: any) {
    console.error("DEBUG - Graph Error:", error.response?.data);
    throw error;
  }
};

// Fetch Top Gainers
export const fetchTopGainers = async (limit: number = 5): Promise<TopMoversResponse> => {
  try {
    const response = await api.get("/api/unlisted/public/top-movers", {
      params: { type: 'gainers', limit }
    });
    return response.data;
  } catch (error: any) {
    console.error("DEBUG - Top Gainers URL called:", error.config?.url);
    console.error("DEBUG - Top Gainers Error:", error.response?.data);
    throw error;
  }
};

// Fetch Top Losers
export const fetchTopLosers = async (limit: number = 5): Promise<TopMoversResponse> => {
  try {
    const response = await api.get("/api/unlisted/public/top-movers", {
      params: { type: 'losers', limit }
    });
    return response.data;
  } catch (error: any) {
    console.error("DEBUG - Top Losers URL called:", error.config?.url);
    console.error("DEBUG - Top Losers Error:", error.response?.data);
    throw error;
  }
};

// Create Enquiry
export const createEnquiry = async (payload: EnquiryPayload): Promise<EnquiryResponse> => {
  try {
    const response = await api.post("/api/unlisted/public/enquiries", payload); 
    return response.data;
  } catch (error: any) {
    console.error("DEBUG - Enquiry URL called:", error.config?.url);
    console.error("DEBUG - Enquiry Status code:", error.response?.status);
    console.error("DEBUG - Enquiry Error:", error.response?.data);
    throw error;
  }
};

/**
 * Fetch all corporate actions (press articles)
 * GET → /api/unlisted/public/corporate-actions
 */
export const fetchAllCorporateActions = async (): Promise<CorporateActionsResponse> => {
  try {
    const response = await api.get("/api/unlisted/public/corporate-actions");
    return response.data;
  } catch (error: any) {
    console.error("DEBUG - Corporate Actions URL called:", error.config?.url);
    console.error("DEBUG - Corporate Actions Error:", error.response?.data);
    throw error;
  }
};

export const fetchDashboardData = async (): Promise<GraphResponse> => {
  try {
    const response = await api.get("/api/unlisted/public/graph");
    return response.data;
  } catch (error: any) {
    console.error("DEBUG - Dashboard URL called:", error.config?.url);
    console.error("DEBUG - Dashboard Error:", error.response?.data);
    throw error;
  }
};

/**
 * Fetch corporate actions by share ID
 * GET → /api/unlisted/public/corporate-actions/share/:id
 */
export const fetchCorporateActionsByShareId = async (shareId: number): Promise<CorporateActionsResponse> => {
  try {
    const response = await api.get(`/api/unlisted/public/corporate-actions/share/${shareId}`);
    return response.data;
  } catch (error: any) {
    console.error("DEBUG - Corporate Actions by Share URL called:", error.config?.url);
    console.error("DEBUG - Corporate Actions by Share Error:", error.response?.data);
    throw error;
  }
};

/**
 * Fetch corporate actions by type
 * GET → /api/unlisted/public/corporate-actions/type/:type
 */
export const fetchCorporateActionsByType = async (type: string): Promise<CorporateActionsResponse> => {
  try {
    const response = await api.get(`/api/unlisted/public/corporate-actions/type/${type}`);
    return response.data;
  } catch (error: any) {
    console.error("DEBUG - Corporate Actions by Type URL called:", error.config?.url);
    console.error("DEBUG - Corporate Actions by Type Error:", error.response?.data);
    throw error;
  }
};