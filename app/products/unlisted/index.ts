export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  kyc_status: 'verified' | 'pending';
  created_at: string;
}

export interface Company {
  id: number;
  name: string;
  category: string;
  sector: string;
  logo: string;
  price: number;
  current_price: number;
  priceChange: number;
  weekChange: number;
  lotSize: string;
  depository: string;
  valuation: string;
  availableShares: string;
  pe_ratio: string;
  pb_ratio: string;
  revenue_growth: string;
  profit_growth: string;
  market_share: string;
  description: string;
  rationale?: string;
  slug?: string; // Optional if not present in all objects
  status?: 'active' | 'inactive';
}

export interface Transaction {
  id: number;
  user_id: number;
  user?: { name: string; email: string };
  company_id: number;
  company?: { name: string; symbol?: string };
  type: 'buy' | 'sell';
  quantity: number;
  price_per_share: number;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  created_at: string;
  updated_at?: string;
}

export interface Order {
  id: number;
  user_id: number;
  user: { name: string; email: string };
  company_id: number;
  company: { name: string; symbol: string };
  type: 'buy' | 'sell';
  order_type: 'market' | 'limit' | 'stop';
  quantity: number;
  price: number;
  amount: number;
  status: 'open' | 'partial' | 'completed' | 'cancelled';
  created_at: string;
}

export interface ImportHistory {
  id: string;
  filename: string;
  type: string;
  total_rows: number;
  imported_rows: number;
  failed_rows: number;
  status: 'completed' | 'processing' | 'failed';
  started_at: string;
  duration: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  kyc_status: 'verified' | 'pending';
  created_at: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
  features: string[];
  to: string;
}

export interface Transaction {
  id: number;
  user_id: number;
  user?: { name: string; email: string };
  company_id: number;
  company?: { name: string; symbol?: string };
  type: 'buy' | 'sell';
  quantity: number;
  price_per_share: number;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  created_at: string;
  updated_at?: string;
}

export interface Order {
  id: number;
  user_id: number;
  user: { name: string; email: string };
  company_id: number;
  company: { name: string; symbol: string };
  type: 'buy' | 'sell';
  order_type: 'market' | 'limit' | 'stop';
  quantity: number;
  price: number;
  amount: number;
  status: 'open' | 'partial' | 'completed' | 'cancelled';
  created_at: string;
}

export interface ImportHistory {
  id: string;
  filename: string;
  type: string;
  total_rows: number;
  imported_rows: number;
  failed_rows: number;
  status: 'completed' | 'processing' | 'failed';
  started_at: string;
  duration: number;
}
