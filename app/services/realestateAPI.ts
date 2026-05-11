
export interface RealEstateInvestment {
  id: number;
  project_name: string;
  developer_name: string;
  project_type: string;
  location: string;
  total_area: number | null;
  total_asset_value: string | null;
  min_investment: string;
  processing_fee: string | null;
  lockin_period_months: number | null;
  yield_percentage: string;
  current_status: string | null;
  status: string;
  sanctions: boolean | null;
  litigations: string | null;
  land_title: string | null;
  total_units: number | null;
  market_price: string | null;
  discounted_price: string | null;
  buyback_price: string | null;
  buyback_duration_months: number | null;
  ownership_structure: string | null;
  trustee_name: string | null;
  llp_name: string | null;
  rera_id: string | null;
  irr_percentage: string | null;
  image_url: string | null;
  due_diligence: string | null;
  created_at: string;
  updated_at: string;
}

const BASE = process.env.NEXT_PUBLIC_API_BASE_URL || '';

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status} ${res.statusText} — ${path}`);
  }
  return res.json() as Promise<T>;
}

export const realEstateAPI = {
  // Get all properties
  async getAllProperties(): Promise<{ success: boolean; data: RealEstateInvestment[] }> {
    try {
      const apiResponse = await fetchJson<{ success: boolean; data: RealEstateInvestment[]; count?: number }>(
        '/api/products/investments/realestate/properties'
      );
      const data = Array.isArray(apiResponse.data)
        ? apiResponse.data
        : (Array.isArray(apiResponse) ? (apiResponse as unknown as RealEstateInvestment[]) : []);
      return { success: apiResponse.success ?? true, data };
    } catch (error) {
      return { success: false, data: [] };
    }
  },

  // Get single property by ID
  async getPropertyById(id: number | string): Promise<{ success: boolean; data: RealEstateInvestment }> {
    try {
      const apiResponse = await fetchJson<{ success: boolean; data: RealEstateInvestment }>(
        `/api/products/investments/realestate/properties/${id}`
      );
      return {
        success: apiResponse.success ?? true,
        data: apiResponse.data ?? (apiResponse as unknown as RealEstateInvestment),
      };
    } catch (error) {
      throw error;
    }
  },

  isUsingMockData(): boolean {
    return false;
  },
};