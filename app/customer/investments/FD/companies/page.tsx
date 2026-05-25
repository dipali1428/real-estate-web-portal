'use client';
import React, { useState, useEffect } from 'react';
import { Search, Filter, Landmark, TrendingUp, AlertCircle, RefreshCw, Database, Star, Bookmark, X, Percent, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import api from '../../../../services/api';
import { useRouter } from 'next/navigation';
import customerService from '@/app/services/customerService';
import toast from 'react-hot-toast';
import EnquiryModal from '@/app/customer/orderform/EnquiryModal';

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
  'Public Sector Banks': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400', short: 'PSB' },
  'Private Sector Banks': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400', short: 'Pvt' },
  'Small Finance Banks': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400', short: 'SFB' },
  'NBFCs': { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400', short: 'NBFC' },
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
  const PAGE_SIZE = 12;

  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryProduct, setEnquiryProduct] = useState<any>(null);

  const handleApplyNow = (company: FlattenedBank) => {
    setEnquiryProduct({
      product_type: 'FIXED_DEPOSIT',
      product_name: company.name,
      product_id: company.id
    });
    setEnquiryModalOpen(true);
  };

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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { icon: Landmark, label: 'Total Plans', value: `${companies.length}`, color: 'text-[#2076C7]', bg: 'bg-blue-50' },
          { icon: Percent, label: 'Avg. Best Rate', value: avgRate > 0 ? `${avgRate.toFixed(2)}%` : '—', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { icon: TrendingUp, label: 'Highest Rate', value: maxRate > 0 ? `${maxRate.toFixed(2)}%` : '—', color: 'text-amber-600', bg: 'bg-amber-50' },
          { icon: Star, label: 'Best Sr. Rate', value: maxSenior > 0 ? `${maxSenior.toFixed(2)}%` : '—', color: 'text-violet-600', bg: 'bg-violet-50' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-3.5 sm:p-5 flex items-center gap-2.5 sm:gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
              <s.icon size={15} className={s.color} />
            </div>
            <div>
              <p className="text-base sm:text-xl font-black text-gray-900 leading-tight">{s.value}</p>
              <p className="text-[9px] sm:text-[11px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Toolbar ── */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 w-full">
        {/* Left: Title and Badge */}
        <div className="w-full lg:w-auto shrink-0">
          <h3 className="text-xl font-black text-gray-900">
            Explore FD Plans
            <span className="ml-2 px-2.5 py-0.5 bg-[#2076C7]/10 text-[#2076C7] text-[11px] font-bold rounded-lg">{filtered.length} plans</span>
          </h3>
          <p className="text-xs text-gray-400 mt-0.5 font-medium">Compare daily-updated rates from {companies.length}+ institutions</p>
        </div>

        {/* Center: Category Tabs */}
       {/* Center: Category Tabs */}
<div className="w-full lg:flex-1 overflow-hidden">
  <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide whitespace-nowrap pb-2 px-1 lg:justify-center">
    {CAT_OPTS.map((opt) => {
      const meta = CATS[opt.value as keyof typeof CATS];

      const count =
        opt.value === "ALL"
          ? companies.length
          : companies.filter((c) => c.category === opt.value).length;

      const active = category === opt.value;

      return (
        <button
          key={opt.value}
          onClick={() => setCategory(opt.value as CatOpt)}
          className={
            `flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs md:text-[13px] font-bold whitespace-nowrap border transition-all shrink-0 ` +
            (active
              ? "bg-[#2076C7] text-white border-[#2076C7] shadow-md shadow-blue-100"
              : "bg-white border-gray-200 text-gray-600 hover:border-[#2076C7]/40 hover:text-[#2076C7]")
          }
        >
          {meta && !active && (
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${meta.dot}`}
            />
          )}

          <span>
            {opt.value === "ALL"
              ? "All"
              : meta?.short ?? opt.label}
          </span>

          <span
            className={
              `px-1.5 sm:px-2 py-0.5 rounded text-[9px] sm:text-[11px] font-black shrink-0 ` +
              (active
                ? "bg-white/20 text-white"
                : "bg-gray-100 text-gray-500")
            }
          >
            {count}
          </span>
        </button>
      );
    })}
  </div>
</div>
        {/* Right: Search and Filter */}
        <div className="flex items-center gap-2.5 w-full lg:w-auto shrink-0">
          <div className="relative flex-1 md:w-56 lg:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input type="text" placeholder="Search institution..." value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#2076C7] focus:ring-4 focus:ring-[#2076C7]/5 transition-all" />
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border transition-all shrink-0 ${showFilters ? 'bg-[#2076C7] text-white border-[#2076C7] shadow-md' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}>
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



      {/* ── Cards Grid ── */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.length === 0 ? (
            <div className="col-span-full bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-gray-500 font-bold text-base mb-2">No plans found</p>
              <button onClick={clearFilters} className="text-[#2076C7] text-sm font-bold hover:underline transition-all">Clear active filters</button>
            </div>
          ) : (
            paginated.map((company) => {
              const meta = CATS[company.category] ?? { bg: 'bg-gray-50', text: 'text-gray-600', dot: 'bg-gray-300', short: company.category.substring(0, 4) };
              const best = parseRate(company.bestRate);
              const bestSenior = parseRate(company.bestSeniorRate);

              return (
                <div key={company.id} className="group flex flex-col bg-white rounded-3xl p-5 shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-[#2076C7]/5 hover:border-blue-100 transition-all duration-300 relative overflow-hidden">

                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-5 gap-3">
                    <div className="flex items-center gap-3">
                      {company.logo && !imgErr.has(company.id) ? (
                        <img src={company.logo} alt={company.name} className="w-10 h-10 rounded-2xl object-contain border border-gray-100 p-1 shadow-sm bg-white shrink-0" onError={() => setImgErr(p => new Set(p).add(company.id))} />
                      ) : (
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-[#2076C7] font-black text-xs shrink-0">
                          {getInitials(company.name)}
                        </div>
                      )}
                      <div>
                        <h4 className="font-bold text-gray-900 text-[16px] leading-tight line-clamp-2 group-hover:text-[#2076C7] transition-colors">{company.name}</h4>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10.5px] font-black uppercase tracking-widest ${meta.bg} ${meta.text}`}>
                            <span className={`w-1 h-1 rounded-full ${meta.dot}`} />
                            {meta.short}
                          </span>
                          {company.specialRate && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md bg-amber-50 text-amber-700 text-[9.5px] font-black border border-amber-200 uppercase tracking-widest shadow-sm shadow-amber-100 shrink-0">
                              <Star size={8} className="fill-amber-500 text-amber-500 shrink-0" />
                              <span className="whitespace-nowrap">{company.specialRate}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleWishlistToggle(company); }}
                      disabled={wishlistLoading.has(company.id)}
                      className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-all active:scale-95 ${wishlistedIds[company.id] !== undefined
                        ? 'bg-blue-50/80 text-[#2076C7] shadow-inner'
                        : 'bg-gray-50/50 text-gray-400 hover:bg-gray-100 hover:text-[#2076C7]'
                        } disabled:opacity-50 disabled:cursor-wait`}
                      title={wishlistedIds[company.id] !== undefined ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      {wishlistLoading.has(company.id) ? (
                        <div className="w-3 h-3 border-[2px] border-current border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Bookmark
                          size={14}
                          strokeWidth={wishlistedIds[company.id] !== undefined ? 2.5 : 2}
                          className={wishlistedIds[company.id] !== undefined ? 'fill-current scale-110 transition-transform' : 'transition-transform'}
                        />
                      )}
                    </button>
                  </div>

                  {/* Tenures summary */}
                  <div className="flex items-center justify-between gap-1 pb-4 mb-4 border-b border-gray-50">
                    {['1Y', '2Y', '3Y', '5Y'].map((label, i) => {
                      const rates = [company.shortRate, company.mediumRate, company.longRate, company.megaRate];
                      const val = parseRate(rates[i]);
                      return (
                        <div key={label} className="text-center flex-1">
                          <p className="text-[13px] font-black text-gray-400 uppercase mb-0.5">{label}</p>
                          <p className={`text-[13px] font-bold ${val > 0 ? 'text-gray-700' : 'text-gray-300'}`}>{val > 0 ? `${val}%` : '—'}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Rates */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-gray-50/80 rounded-2xl p-3 border border-gray-100 flex flex-col justify-center">
                      <p className="text-[10.5px] font-bold text-gray-400 uppercase tracking-widest mb-1">Best Rate</p>
                      <p className="text-2xl font-black text-[#2076C7]">{best > 0 ? `${best.toFixed(2)}%` : '—'}</p>
                    </div>
                    <div className="bg-emerald-50/40 rounded-2xl p-3 border border-emerald-50 flex flex-col justify-center">
                      <p className="text-[10.5px] font-bold text-emerald-500/80 uppercase tracking-widest mb-1">Sr. Citizen</p>
                      <p className="text-2xl font-black text-emerald-600">{bestSenior > 0 ? `${bestSenior.toFixed(2)}%` : '—'}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto">
                    <button
                      onClick={() => handleApplyNow(company)}
                      className="w-full group/btn relative py-3.5 rounded-xl text-white font-bold text-[13px] uppercase tracking-widest shadow-md hover:shadow-xl hover:shadow-[#2076C7]/20 active:scale-95 transition-all overflow-hidden"
                      style={{ background: 'linear-gradient(to right, #1CADA3, #2076C7)' }}
                    >
                      <span className="relative z-10 transition-transform group-hover/btn:scale-105 inline-block">Apply Now</span>
                      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Pagination Footer */}
        {filtered.length > 0 && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex items-center justify-between">
            <p className="text-xs text-gray-500 font-medium px-3">
              Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} plans
            </p>
            <PaginationBar />
          </div>
        )}
      </div>


      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none !important; }
        .scrollbar-hide { -ms-overflow-style: none !important; scrollbar-width: none !important; }
        @keyframes fadeIn { from { opacity:0; transform: translateY(-8px); } to { opacity:1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.25s ease; }
      `}</style>

      {enquiryProduct && (
        <EnquiryModal
          isOpen={enquiryModalOpen}
          onClose={() => setEnquiryModalOpen(false)}
          productType="FIXED_DEPOSIT"
          productName={enquiryProduct.product_name}
          productId={enquiryProduct.product_id}
          sourcePage="/customer/investments/FD/companies"
        />
      )}
    </div>
  );
}