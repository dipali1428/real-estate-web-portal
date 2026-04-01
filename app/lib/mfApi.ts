
const AMFI_PROXY_URL = '/api/amfi-nav';

// ─── Shared Types ──────────────────────────────────────────────────────────────
export interface AmfiScheme {
    schemeCode: string;
    name: string;
    nav: string;
    date: string;
    fundHouse?: string;
    category?: string;
}

export interface NavData {
    date: string;
    nav: string;
}

export interface FundResponse {
    meta: {
        scheme_code: number;
        scheme_name: string;
        fund_house: string;
        scheme_category?: string;
    };
    data: NavData[];
}


let amfiCache: { data: Record<string, AmfiScheme>; timestamp: number } | null = null;
const AMFI_CACHE_MS = 15 * 60 * 1000; // 15 min — AMFI updates once a day
const AMFI_STORAGE_KEY = 'amfi_nav_cache';

const restoreAmfiCache = (): void => {
    if (amfiCache) return;
    try {
        const stored = sessionStorage.getItem(AMFI_STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed?.timestamp && Date.now() - parsed.timestamp < AMFI_CACHE_MS) {
                amfiCache = parsed;
            }
        }
    } catch { /* sessionStorage unavailable (SSR) */ }
};

export const fetchAMFINav = async (): Promise<Record<string, AmfiScheme>> => {
    restoreAmfiCache();
    
    // Background revalidate helper
    const revalidate = async () => {
        try {
            const res = await fetch(AMFI_PROXY_URL);
            if (!res.ok) return;
            const data = await res.json();
            amfiCache = { data, timestamp: Date.now() };
            try {
                sessionStorage.setItem(AMFI_STORAGE_KEY, JSON.stringify(amfiCache));
            } catch { /* ignore */ }
        } catch { /* ignore */ }
    };

    // If we have data (stale or fresh), return it now
    if (amfiCache) {
        // If expired, revalidate in background
        if (Date.now() - amfiCache.timestamp > AMFI_CACHE_MS) {
            revalidate();
        }
        return amfiCache.data;
    }

    // First time load (nothing in storage)
    try {
        const res = await fetch(AMFI_PROXY_URL);
        if (!res.ok) return {};
        const data = await res.json();
        amfiCache = { data, timestamp: Date.now() };
        try {
            sessionStorage.setItem(AMFI_STORAGE_KEY, JSON.stringify(amfiCache));
        } catch { /* ignore */ }
        return data;
    } catch {
        return {};
    }
};

export const searchFunds = async (query: string): Promise<AmfiScheme[]> => {
    const all = await fetchAMFINav();
    const q   = query.toLowerCase();
    return Object.entries(all)
        .filter(([code, f]) => {
            if (!code || isNaN(Number(code))) return false; // skip invalid keys
            const n = (f.name || '').toLowerCase();
            if (n.includes('direct')) return false;
            const isRegular = n.includes('growth') || n.includes('idcw') || n.includes('dividend');
            return isRegular && n.includes(q);
        })
        .slice(0, 20)
        .map(([code, f]) => ({
            ...f,
            schemeCode: code, // ensure schemeCode is set from the map key
        }));
};

const MF_DETAILS_PROXY = '/api/mf-details';
const MFAPI_CACHE_MS = 10 * 60 * 1000; // 10 min

const mfapiNavCache: Record<string, { nav: number; timestamp: number }> = {};

const fetchProxy = async (url: string, timeoutMs = 20000): Promise<any> => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
        const res = await fetch(url, { signal: controller.signal });
        clearTimeout(id);
        if (!res.ok) return null;
        return await res.json();
    } catch {
        clearTimeout(id);
        return null;
    }
};

export const getLatestNav = async (schemeCode: string): Promise<number> => {
    const cached = mfapiNavCache[schemeCode];
    if (cached && Date.now() - cached.timestamp < MFAPI_CACHE_MS) return cached.nav;

    try {
        const data: FundResponse = await fetchProxy(`${MF_DETAILS_PROXY}/${schemeCode}`);
        if (data?.data?.length > 0) {
            const nav = parseFloat(data.data[0].nav);
            if (!isNaN(nav)) {
                mfapiNavCache[schemeCode] = { nav, timestamp: Date.now() };
                return nav;
            }
        }
        return cached?.nav ?? 0;
    } catch {
        return cached?.nav ?? 0;
    }
};

const fundDetailsCache: Record<string, { data: FundResponse; timestamp: number }> = {};

export const getFullFundDetails = async (schemeCode: string): Promise<FundResponse | null> => {
    const cached = fundDetailsCache[schemeCode];
    if (cached && Date.now() - cached.timestamp < MFAPI_CACHE_MS) {
        return cached.data;
    }
    const data = await fetchProxy(`${MF_DETAILS_PROXY}/${schemeCode}`);
    if (data?.data && Array.isArray(data.data)) {
        fundDetailsCache[schemeCode] = { data, timestamp: Date.now() };
    }
    return data;
};