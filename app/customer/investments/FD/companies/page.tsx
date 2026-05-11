'use client';
import React, { useState, useEffect } from 'react';
import { Search, Filter, Landmark, TrendingUp, AlertCircle, RefreshCw, Database, Star, Bookmark, X, Percent, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../../../../services/api';
import { useRouter } from 'next/navigation';
import customerService from '@/app/services/customerService';
import toast from 'react-hot-toast';

interface FlattenedBank {
  id: number; name: string; logo: string; category: string;
  shortRate: string; mediumRate: string; longRate: string; megaRate: string;
  specialRate: string; bestRate: string; bestSeniorRate: string;
}

const getTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  const c = document.cookie.split('; ').find(r => r.startsWith('authToken='));
  return c ? c.split('=')[1] : null;
};
const getInitials = (n: string) => n.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
const parseRate = (v: string) => parseFloat(String(v).replace('%', '')) || 0;
const fmt = (v: string) => { const n = parseRate(v); return n > 0 ? `${n.toFixed(2)}%` : '—'; };

const CATS: Record<string, { bg: string; text: string; dot: string; short: string }> = {
  'Public Sector Banks': { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-400', short: 'PSB' },
  'Private Sector Banks': { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-400', short: 'Pvt' },
  'Small Finance Banks': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400', short: 'SFB' },
  'NBFCs': { bg: 'bg-violet-50', text: 'text-violet-700', dot: 'bg-violet-400', short: 'NBFC' },
};

const normCat = (cat: string) => {
  const c = (cat || '').trim();
  if (c === 'Public Sector Bank' || c === 'Public Sector Banks') return 'Public Sector Banks';
  if (c === 'Private Sector Bank' || c === 'Private Sector Banks') return 'Private Sector Banks';
  if (c === 'Small Finance Bank' || c === 'Small Finance Banks' || c === 'SFB') return 'Small Finance Banks';
  if (c === 'NBFC' || c === 'NBFCs') return 'NBFCs';
  return c || 'Other';
};

const fmt2 = (items: any[]): FlattenedBank[] => {
  if (!Array.isArray(items)) return [];
  return items.map((item: any, idx: number) => ({
    id: item.id || idx + 1, name: item.company_name || 'Unknown', logo: item.logo_url || '',
    category: normCat(item.category),
    shortRate: String(item.one_year_rate || 0), mediumRate: String(item.two_year_rate || 0),
    longRate: String(item.three_year_rate || 0), megaRate: String(item.five_year_rate || 0),
    specialRate: item.special_offer || '', bestRate: String(item.best_rate || 0),
    bestSeniorRate: item.best_rate ? String((parseFloat(item.best_rate) + 0.5).toFixed(2)) : '0',
  }));
}

const RATE_RANGES = [
  { label: 'All Rates', value: 'ALL' }, { label: 'Above 8%', value: '8-100' },
  { label: '7% – 8%', value: '7-8' }, { label: '6% – 7%', value: '6-7' }, { label: 'Below 6%', value: '0-6' },
] as const;
const CAT_OPTS = [
  { label: 'All Categories', value: 'ALL' },
  { label: 'Public Sector Banks', value: 'Public Sector Banks' },
  { label: 'Private Sector Banks', value: 'Private Sector Banks' },
  { label: 'Small Finance Banks', value: 'Small Finance Banks' },
  { label: 'NBFCs', value: 'NBFCs' },
] as const;
const SORT_OPTS = [
  { label: 'Best Rate ↓', value: 'rate-desc' }, { label: 'Best Rate ↑', value: 'rate-asc' },
  { label: 'Name A→Z', value: 'name-asc' }, { label: 'Name Z→A', value: 'name-desc' },
] as const;
type RangeOpt = typeof RATE_RANGES[number]['value'];
type CatOpt = typeof CAT_OPTS[number]['value'];
type SortOpt = typeof SORT_OPTS[number]['value'];

export default function FDCompaniesPage() {
  const router = useRouter();
  // const { toggleWishlist, isInWishlist } = useWishlist();
  const [companies, setCompanies] = useState<FlattenedBank[]>([]);
  const [filtered, setFiltered] = useState<FlattenedBank[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [rateRange, setRateRange] = useState<RangeOpt>('ALL');
  const [category, setCategory] = useState<CatOpt>('ALL');
  const [sortBy, setSortBy] = useState<SortOpt>('rate-desc');
  const [showFilters, setShowFilters] = useState(false);
  const [imgErr, setImgErr] = useState<Set<number>>(new Set());
  // wishlistedIds: maps company.id → wishlist-row-id (from DB) so we can delete by the right ID
  const [wishlistedIds, setWishlistedIds] = useState<Record<number, number>>({});
  const [wishlistLoading, setWishlistLoading] = useState<Set<number>>(new Set());
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    const token = getTokenFromCookie();
    if (!token) { router.push('/'); return; }
    localStorage.setItem('token', token);
    (async () => {
      try {
        setLoading(true);
        // Load FD plans
        const res = await api.get('/api/products/investments/fd/plans');
        setCompanies(fmt2(res.data?.data || []));
        // Load existing wishlist to pre-fill bookmark state
        const wl = await customerService.getMyWishlist();
        if (wl.success && Array.isArray(wl.data)) {
          const map: Record<number, number> = {};
          wl.data
            .filter((item: any) => item.product_type === 'fd')
            .forEach((item: any) => { map[item.product_id] = item.id; });
          setWishlistedIds(map);
        }
      } catch { setError('Failed to load FD plans.'); }
      finally { setLoading(false); }
    })();
  }, [router]);

  useEffect(() => {
    let r = [...companies];
    if (search.trim()) r = r.filter(c => c.name.toLowerCase().includes(search.toLowerCase()) || c.category.toLowerCase().includes(search.toLowerCase()));
    if (rateRange !== 'ALL') {
      const [min, max] = rateRange.split('-').map(Number);
      r = r.filter(c => { const v = parseRate(c.bestRate); return v >= min && v <= max; });
    }
    if (category !== 'ALL') r = r.filter(c => c.category === category);
    r.sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'name-desc') return b.name.localeCompare(a.name);
      if (sortBy === 'rate-asc') return parseRate(a.bestRate) - parseRate(b.bestRate);
      return parseRate(b.bestRate) - parseRate(a.bestRate);
    });
    setFiltered(r);
    setPage(1); // reset to page 1 whenever filters change
  }, [companies, search, rateRange, category, sortBy]);

  // Toggle wishlist via API
  const handleWishlistToggle = async (company: FlattenedBank) => {
    const isBookmarked = wishlistedIds[company.id] !== undefined;
    setWishlistLoading(prev => new Set(prev).add(company.id));
    try {
      if (isBookmarked) {
        // Remove from wishlist
        const rowId = wishlistedIds[company.id];
        const res = await customerService.removeFromWishlist(rowId);
        if (res.success) {
          setWishlistedIds(prev => { const n = { ...prev }; delete n[company.id]; return n; });
          toast.success(`${company.name} removed from wishlist`);
        } else {
          toast.error(res.message || 'Failed to remove from wishlist');
        }
      } else {
        // Add to wishlist
        const res = await customerService.addToWishlist({
          product_type: 'fd',
          product_id: company.id,
          product_name: company.name,
          category: company.category,
          Short_Term: company.shortRate,
          Medium_Term: company.mediumRate,
          Long_Term: company.longRate,
          Mega_Term: company.megaRate,
          Special_Offer: company.specialRate,
          best_rate: company.bestRate, // Added for UI display in wishlist
          senior_rate: company.bestSeniorRate,
          risk: 'Low',
        } as any);
        if (res.success && res.data && !Array.isArray(res.data)) {
          setWishlistedIds(prev => ({ ...prev, [company.id]: (res.data as any).id }));
          toast.success(`${company.name} added to wishlist! 🔖`);
        } else if (res.success) {
          // Fallback: Reload wishlist to get the correct row ID
          const wl = await customerService.getMyWishlist();
          if (wl.success && Array.isArray(wl.data)) {
            const map: Record<number, number> = {};
            wl.data.filter((i: any) => i.product_type === 'fd')
              .forEach((i: any) => { map[i.product_id] = i.id; });
            setWishlistedIds(map);
          }
          toast.success(`${company.name} added to wishlist! 🔖`);
        } else {
          toast.error(res.message || 'Failed to add to wishlist');
        }
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || 'Wishlist update failed';
      toast.error(msg);
      console.error('Wishlist Error:', err);
    } finally {
      setWishlistLoading(prev => { const n = new Set(prev); n.delete(company.id); return n; });
    }
  };

  const clearFilters = () => { setSearch(''); setRateRange('ALL'); setCategory('ALL'); setSortBy('rate-desc'); setShowFilters(false); };
  const activeCnt = [search ? 1 : 0, rateRange !== 'ALL' ? 1 : 0, category !== 'ALL' ? 1 : 0, sortBy !== 'rate-desc' ? 1 : 0].reduce((a, b) => a + b, 0);
  const avgRate = companies.length ? companies.reduce((s, c) => s + parseRate(c.bestRate), 0) / companies.length : 0;
  const maxRate = companies.length ? Math.max(...companies.map(c => parseRate(c.bestRate))) : 0;
  const maxSenior = companies.length ? Math.max(...companies.map(c => parseRate(c.bestSeniorRate))) : 0;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Pagination helper: show at most 5 page numbers
  const getPageNumbers = () => {
    const pages: number[] = [];
    const start = Math.max(1, Math.min(page - 2, totalPages - 4));
    const end = Math.min(totalPages, start + 4);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  const PaginationBar = () => (
    totalPages > 1 ? (
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:border-[#2076C7] hover:text-[#2076C7] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {getPageNumbers().map(pg => (
          <button
            key={pg}
            onClick={() => setPage(pg)}
            className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${page === pg
              ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md shadow-blue-200'
              : 'border border-slate-200 text-slate-500 hover:border-[#2076C7] hover:text-[#2076C7]'}`}
          >
            {pg}
          </button>
        ))}

        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:border-[#2076C7] hover:text-[#2076C7] disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    ) : null
  );

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <div className="w-12 h-12 border-[3px] border-[#2076C7]/20 border-t-[#2076C7] rounded-full animate-spin mx-auto" />
        <p className="text-gray-400 text-sm font-medium">Loading FD plans...</p>
      </div>
    </div>
  );
  if (error) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="bg-white rounded-2xl p-8 text-center max-w-xs border border-red-100 shadow-sm">
        <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
        <p className="text-gray-700 font-semibold text-sm mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-[#2076C7] text-white text-sm font-semibold rounded-xl flex items-center gap-2 mx-auto hover:bg-[#1a5fa8] transition-colors">
          <RefreshCw size={13} /> Retry
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full space-y-6">


      {/* ── Stats ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { icon: Landmark, label: 'Total Plans', value: `${companies.length}`, color: 'text-[#2076C7]', bg: 'bg-blue-50' },
          { icon: Percent, label: 'Avg. Best Rate', value: avgRate > 0 ? `${avgRate.toFixed(2)}%` : '—', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { icon: TrendingUp, label: 'Highest Rate', value: maxRate > 0 ? `${maxRate.toFixed(2)}%` : '—', color: 'text-amber-600', bg: 'bg-amber-50' },
          { icon: Star, label: 'Best Sr. Rate', value: maxSenior > 0 ? `${maxSenior.toFixed(2)}%` : '—', color: 'text-violet-600', bg: 'bg-violet-50' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 flex items-center gap-3 sm:gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-9 h-9 sm:w-10 sm:h-10 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <s.icon size={16} className={s.color} />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-black text-gray-900 leading-tight">{s.value}</p>
              <p className="text-[10px] sm:text-[11px] text-gray-400 font-medium mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-xl font-black text-gray-900">
            Explore FD Plans
            <span className="ml-2 px-2.5 py-0.5 bg-[#2076C7]/10 text-[#2076C7] text-[11px] font-bold rounded-lg">{filtered.length} plans</span>
          </h3>
          <p className="text-xs text-gray-400 mt-0.5 font-medium">Compare daily-updated rates from {companies.length}+ institutions</p>
        </div>
        <div className="flex items-center gap-2.5 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input type="text" placeholder="Search institution..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/5 transition-all" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 border transition-all ${showFilters ? 'bg-[#2076C7] text-white border-[#2076C7] shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}>
            <Filter size={14} />
            Filter
            {activeCnt > 0 && <span className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center ${showFilters ? 'bg-white text-[#2076C7]' : 'bg-[#2076C7] text-white'}`}>{activeCnt}</span>}
            <ChevronDown size={13} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Filter Panel ── */}
      {showFilters && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-gray-700">Refine Results</p>
            <button onClick={clearFilters} className="text-xs text-gray-400 hover:text-gray-600 flex items-center gap-1 font-medium"><X size={12} /> Clear all</button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Best Rate', value: rateRange, opts: RATE_RANGES, set: setRateRange },
              { label: 'Category', value: category, opts: CAT_OPTS, set: setCategory },
              { label: 'Sort By', value: sortBy, opts: SORT_OPTS, set: setSortBy },
            ].map((f, i) => (
              <div key={i}>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{f.label}</label>
                <select value={f.value} onChange={e => (f.set as any)(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-800 outline-none focus:border-[#2076C7] focus:bg-white transition-all cursor-pointer">
                  {f.opts.map((o: any) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Category Tabs ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {CAT_OPTS.map(opt => {
          const meta = CATS[opt.value as keyof typeof CATS];
          const count = opt.value === 'ALL' ? companies.length : companies.filter(c => c.category === opt.value).length;
          const active = category === opt.value;
          return (
            <button key={opt.value} onClick={() => setCategory(opt.value as CatOpt)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap border transition-all ${active ? 'bg-[#2076C7] text-white border-[#2076C7] shadow-md shadow-blue-100'
                : 'bg-white border-gray-200 text-gray-600 hover:border-[#2076C7]/40 hover:text-[#2076C7]'}`}>
              {meta && !active && <span className={`w-2 h-2 rounded-full ${meta.dot}`} />}
              {opt.value === 'ALL' ? 'All' : meta?.short ?? opt.label}
              <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-black ${active ? 'bg-white/20' : 'bg-gray-100 text-gray-500'}`}>{count}</span>
            </button>
          );
        })}
      </div>

      {/* ── Desktop Table / Mobile Cards ── */}
      <div className="space-y-4">
        {/* Mobile Cards (Hidden on md+) */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {paginated.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-sm">
              <Database className="w-8 h-8 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 font-bold text-sm">No plans found</p>
            </div>
          ) : (
            paginated.map((company) => {
              const meta = CATS[company.category] ?? { bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-300', short: company.category.substring(0, 4) };
              // const bookmarked = isInWishlist(company.id);
              const best = parseRate(company.bestRate);
              return (
                <div key={company.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4 relative overflow-hidden">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {company.logo && !imgErr.has(company.id) ? (
                        <img src={company.logo} alt={company.name} className="w-10 h-10 rounded-xl object-contain border border-gray-50 p-1" onError={() => setImgErr(p => new Set(p).add(company.id))} />
                      ) : (
                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#2076C7] font-black text-xs">
                          {getInitials(company.name)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-gray-900 text-sm leading-tight">{company.name}</h4>
                        <span className={`inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter ${meta.bg} ${meta.text}`}>
                          {meta.short}
                        </span>
                      </div>
                    </div>
                    {/* <button onClick={() => handleBookmark(company)} className={`p-2 rounded-xl transition-all ${bookmarked ? 'bg-blue-50 text-[#2076C7]' : 'text-gray-300'}`}>
                      <Bookmark size={18} className={bookmarked ? 'fill-current' : ''} />
                    </button> */}
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="bg-gray-50/50 rounded-xl p-3 border border-gray-100">
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Best Rate</p>
                      <p className="text-lg font-black text-[#2076C7]">{best > 0 ? `${best.toFixed(2)}%` : '—'}</p>
                    </div>
                    <div className="bg-emerald-50/30 rounded-xl p-3 border border-emerald-50">
                      <p className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest mb-1">Sr. Citizen</p>
                      <p className="text-lg font-black text-emerald-700">{parseRate(company.bestSeniorRate) > 0 ? `${parseRate(company.bestSeniorRate).toFixed(2)}%` : '—'}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 py-2 border-y border-gray-50">
                    {['1Y', '2Y', '3Y', '5Y'].map((label, i) => {
                      const rates = [company.shortRate, company.mediumRate, company.longRate, company.megaRate];
                      const val = parseRate(rates[i]);
                      return (
                        <div key={label} className="text-center">
                          <p className="text-[8px] font-black text-gray-300 uppercase mb-0.5">{label}</p>
                          <p className={`text-[11px] font-bold ${val > 0 ? 'text-gray-700' : 'text-gray-300'}`}>{val > 0 ? `${val}%` : '—'}</p>
                        </div>
                      );
                    })}
                  </div>

                  {company.specialRate && (
                    <div className="bg-amber-50 rounded-xl p-2.5 border border-amber-100 flex items-center gap-2">
                      <Star size={12} className="text-amber-400 fill-amber-400" />
                      <p className="text-[10px] font-bold text-amber-800 line-clamp-1">{company.specialRate}</p>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    <button
                      className="flex-1 py-3.5 rounded-xl text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all cursor-default bg-linear-to-r from-[#2076C7] to-[#1CADA3] whitespace-nowrap"
                    >
                      Apply Now
                    </button>
                    <button
                      onClick={() => handleWishlistToggle(company)}
                      disabled={wishlistLoading.has(company.id)}
                      className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center border transition-all ${wishlistedIds[company.id] !== undefined
                        ? 'bg-[#2076C7]/10 border-[#2076C7]/30 text-[#2076C7]'
                        : 'border-gray-200 text-gray-400 hover:border-[#2076C7]/40 hover:text-[#2076C7]'
                        } disabled:opacity-50 disabled:cursor-wait`}
                      title={wishlistedIds[company.id] !== undefined ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      {wishlistLoading.has(company.id) ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Bookmark
                          size={17}
                          strokeWidth={wishlistedIds[company.id] !== undefined ? 2.5 : 2}
                          className={wishlistedIds[company.id] !== undefined ? 'fill-current' : ''}
                        />
                      )}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="hidden md:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest w-48 whitespace-nowrap">Company</th>
                  <th className="px-4 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest w-24 whitespace-nowrap">Category</th>
                  {['1Y Rate', '2Y Rate', '3Y Rate', '5Y Rate'].map(h => (
                    <th key={h} className="px-4 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest w-20 whitespace-nowrap">{h}</th>
                  ))}
                  <th className="px-4 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest w-24 whitespace-nowrap">Best Rate</th>
                  <th className="px-4 py-4 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest w-24 whitespace-nowrap">Sr. Citizen</th>
                  <th className="px-4 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest w-32 whitespace-nowrap">Special Offer</th>
                  <th className="px-4 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest w-28 whitespace-nowrap">Action</th>
                  <th className="px-4 py-4 w-10" />
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-20 text-center">
                      <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Database className="w-6 h-6 text-gray-300" />
                      </div>
                      <p className="text-gray-400 font-semibold text-sm">No plans match your filters</p>
                      <button onClick={clearFilters} className="text-[#2076C7] text-xs font-bold mt-2 hover:underline">Clear filters</button>
                    </td>
                  </tr>
                ) : paginated.map((company, idx) => {
                  const meta = CATS[company.category] ?? { bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-300', short: company.category.substring(0, 4) };
                  // const bookmarked = isInWishlist(company.id);
                  const best = parseRate(company.bestRate);
                  return (
                    <tr key={company.id}
                      className={`group transition-colors border-b border-gray-50 last:border-0 hover:bg-blue-50/40 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          {company.logo && !imgErr.has(company.id) ? (
                            <img src={company.logo} alt={company.name} className="w-9 h-9 rounded-xl object-contain border border-gray-100 bg-white flex-shrink-0 shadow-sm" onError={() => setImgErr(p => new Set(p).add(company.id))} loading="lazy" />
                          ) : (
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2076C7]/10 to-[#1CADA3]/10 flex items-center justify-center text-[#2076C7] font-black text-xs flex-shrink-0">
                              {getInitials(company.name)}
                            </div>
                          )}
                          <span className="font-semibold text-gray-900 text-sm truncate whitespace-nowrap max-w-[150px] block">{company.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold ${meta.bg} ${meta.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                          {meta.short}
                        </span>
                      </td>
                      {[company.shortRate, company.mediumRate, company.longRate, company.megaRate].map((r, i) => (
                        <td key={i} className="px-4 py-5 text-right">
                          <span className={`text-sm font-semibold ${parseRate(r) > 0 ? 'text-gray-800' : 'text-gray-300'}`}>
                            {fmt(r)}
                          </span>
                        </td>
                      ))}
                      <td className="px-4 py-5 text-right">
                        {best > 0 ? (
                          <span className="inline-flex items-center justify-center px-2.5 py-1 bg-[#2076C7]/10 text-[#2076C7] text-sm font-black rounded-lg">
                            {best.toFixed(2)}%
                          </span>
                        ) : <span className="text-gray-300 text-sm">—</span>}
                      </td>
                      <td className="px-4 py-5 text-right">
                        {parseRate(company.bestSeniorRate) > 0 ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 text-sm font-semibold">
                            <TrendingUp size={12} className="text-emerald-500" />
                            {parseRate(company.bestSeniorRate).toFixed(2)}%
                          </span>
                        ) : <span className="text-gray-300 text-sm">—</span>}
                      </td>
                      <td className="px-4 py-5">
                        {company.specialRate ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-[11px] font-semibold border border-amber-100 max-w-[120px] truncate">
                            <Star size={10} className="fill-amber-400 text-amber-400 flex-shrink-0" />
                            <span className="truncate">{company.specialRate}</span>
                          </span>
                        ) : <span className="text-gray-300 text-xs">—</span>}
                      </td>
                      <td className="px-4 py-5 text-center">
                        <button
                          className="px-5 py-2.5 rounded-xl text-white font-black text-[10px] uppercase tracking-widest shadow-md shadow-blue-500/10 hover:shadow-lg active:scale-95 transition-all cursor-default bg-linear-to-r from-[#2076C7] to-[#1CADA3] whitespace-nowrap"
                        >
                          Apply Now
                        </button>
                      </td>
                      <td className="px-4 py-5">
                        <button
                          onClick={e => { e.preventDefault(); e.stopPropagation(); handleWishlistToggle(company); }}
                          disabled={wishlistLoading.has(company.id)}
                          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${wishlistedIds[company.id] !== undefined
                            ? 'bg-[#2076C7]/10 text-[#2076C7]'
                            : 'text-gray-400 hover:bg-gray-100 hover:text-[#2076C7]'
                            } disabled:opacity-50 disabled:cursor-wait`}
                          title={wishlistedIds[company.id] !== undefined ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                          {wishlistLoading.has(company.id) ? (
                            <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Bookmark
                              size={17}
                              strokeWidth={wishlistedIds[company.id] !== undefined ? 2.5 : 2}
                              className={wishlistedIds[company.id] !== undefined ? 'fill-current' : ''}
                            />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer with pagination — matches admin FD dashboard style */}
          {filtered.length > 0 && (
            <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
              <p className="text-xs text-slate-400 font-medium">
                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length}
              </p>
              <PaginationBar />
            </div>
          )}
        </div>
      </div>


      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none !important; }
        .scrollbar-hide { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        @keyframes fadeIn { from { opacity:0; transform: translateY(-8px); } to { opacity:1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.25s ease; }
      `}</style>
    </div>
  );
}