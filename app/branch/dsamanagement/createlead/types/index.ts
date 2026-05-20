export interface Product {
  title: string;
  description: string;
  onClick: () => void;
  activeLeads?: number;
  converted?: number;
}

export interface ProductCards {
  loans: Product[];
  insurance: Product[];
  mutual_fund: Product[];
  investment: Product[];
  real_estate: Product[];
  unlisted: Product[];
}

export interface TabCounts {
  loans: number;
  insurance: number;
  mutual_fund: number;
  investment: number;
  real_estate: number;
  unlisted: number;
}

export type TabKey = keyof TabCounts;

// Lead related types
export interface Lead {
  id: string;
  clientName: string;
  clientType: string;
  contactNumber: string;
  email: string;
  product: string;
  productDetails: string;
  status: 'new' | 'contacted' | 'follow-up' | 'document-review' | 'converted' | 'lost';
  assignedTo: string;
  lastUpdated: string;
  avatarColor: string;
  avatarInitials: string;
}