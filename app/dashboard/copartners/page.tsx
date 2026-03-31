'use client';

import { useState, useMemo, useEffect } from 'react';
import { Copy, Search, Users, TrendingUp, Calendar, Briefcase, Loader2, Share2 } from 'lucide-react';
import { DashboardService } from '@/app/services/dashboardService'; // ✅ added

interface Partner {
  id: number;
  name: string;
  email: string;
  mobile: string;
  city: string;
  state: string;
  joinedDate: string;
  status: string;
  deals: number;
  revenue: number;
  avatar: string;
}

export default function CoPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const [referralCode, setReferralCode] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);

        // ✅ UPDATED: using DashboardService
        const data = await DashboardService.getReferralUsers();
        const rawList =
          Array.isArray(data?.referrals)
            ? data.referrals
            : Array.isArray(data?.data?.referrals)
              ? data.data.referrals
              : [];

        const mappedPartners = rawList.map((item: any) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          mobile: item.mobile,
          city: item.city,
          state: item.state,
          joinedDate: item.date_joined, // ✅ mapped
          status: 'active', // ✅ default (since API doesn't give)
          deals: 0, // ✅ default
          revenue: 0, // ✅ default
          avatar: item.name?.substring(0, 2) || '', // ✅ fallback initials
        }));

        setPartners(mappedPartners);
        const refData = await DashboardService.getRefLink();

        const code = refData?.data?.referral_code || refData?.referral_code;
        const link = refData?.data?.referral_link || refData?.referral_link;

        if (code) setReferralCode(code);
        if (link) setReferralLink(link);

      } catch (error) {
        console.error("Error fetching referral users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPartners();
  }, []);

  const filteredPartners = useMemo(() => {
    if (!searchQuery.trim()) return partners;
    const query = searchQuery.toLowerCase();
    return partners.filter(
      partner => partner.name.toLowerCase().includes(query) ||
        partner.email.toLowerCase().includes(query)
    );
  }, [searchQuery, partners]);

  const stats = useMemo(() => {
    const total = partners.length;
    const active = partners.filter(p => p.status === 'active').length;
    const totalRevenue = partners.reduce((sum, p) => sum + p.revenue, 0);
    const previousMonthCount: number = 5;
    const growth = previousMonthCount === 0
      ? 100
      : Math.round(((total - previousMonthCount) / previousMonthCount) * 100);

    return { total, active, totalRevenue, growth };
  }, [partners]);

  const handleCopyCode = async () => {
    try {
      if (!referralLink) return;

      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShareReferral = async () => {
    try {
      if (!referralLink) return;

      if (navigator.share) {
        await navigator.share({
          title: 'Join my network',
          text: 'Join using my referral link',
          url: referralLink, // ✅ USE API LINK
        });
      } else {
        await navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Share failed:', err);
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) { return dateStr; }
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return { color: 'bg-emerald-100 text-emerald-700', text: 'Active' };
      case 'inactive': return { color: 'bg-gray-100 text-gray-600', text: 'Inactive' };
      default: return { color: 'bg-amber-100 text-amber-700', text: 'Pending' };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10 text-center md:text-left md:flex md:items-center md:justify-between bg-white rounded-2xl shadow-sm p-5 md:p-6 border border-gray-100">
          <div className="mb-4 md:mb-0">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="w-2 h-8 rounded-full" style={{ backgroundColor: '#2076C7' }}></div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-800">
                Co-Partner Network
              </h1>
            </div>
            <p className="text-gray-500 mt-1 text-sm md:text-base max-w-lg">
              Partners who joined using your unique referral code. Track your growing community.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 rounded-xl p-3 sm:p-4">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <span className="text-xs font-medium uppercase tracking-wider text-gray-500">Referral code</span>
              {referralCode ? (
                <span className="font-mono font-bold text-sm tracking-wide" style={{ color: '#2076C7' }}>
                  {referralCode}
                </span>
              ) : (
                <button
                  onClick={async () => {
                    try {
                      setLoading(true);
                      const refData = await DashboardService.getRefLink();
                      const code = refData?.data?.referral_code || refData?.referral_code;
                      if (code) setReferralCode(code);
                    } catch (err) {
                      console.error('Failed to generate referral code', err);
                    } finally {
                      setLoading(false);
                    }
                  }}
                  className="text-sm font-bold px-3 py-1 bg-[#2076C7] text-white rounded-full hover:opacity-90 transition-colors">
                  Generate your referral code
                </button>
              )}

              <button onClick={handleCopyCode} className="ml-1 text-gray-400 hover:text-[#2076C7] transition-colors">
                <Copy className="h-4 w-4" />
              </button>
              <button
                onClick={handleShareReferral}
                disabled={!referralLink}
                className="p-3 bg-[#1CADA3] text-white rounded-xl hover:opacity-90 transition-all flex items-center justify-center disabled:opacity-50"
                title="Share">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {copied && (
          <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-4 py-2 rounded-full shadow-lg z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
            ✅ Referral code copied!
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#2076C710' }}>
              <Users className="w-6 h-6" style={{ color: '#2076C7' }} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Referral</p>
              <p className="text-2xl font-bold text-gray-800">{stats.active}</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Referral growth</p>
              <p className="text-2xl font-bold text-gray-800">
                {stats.total === 0 ? '0%' : stats.growth >= 0 ? `+${stats.growth}%` : `${stats.growth}%`}
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: '#1CADA3' }}></span>
            Your Referral Team
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full border border-gray-200 bg-white text-sm w-64 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#2076C7]/30 focus:border-[#2076C7] transition"
            />
          </div>
        </div>

        {/* List logic */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Loader2 className="h-10 w-10 text-[#2076C7] animate-spin mb-4" />
            <p className="text-gray-500">Loading your network...</p>
          </div>
        ) : filteredPartners.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Users className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700">No co-partners found</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
            {filteredPartners.map((partner) => {
              const statusBadge = getStatusBadge(partner.status);
              return (
                <div key={partner.id} className="w-full max-w-[300px] bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
                  <div className="p-6 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center text-white text-xl font-semibold shadow-md uppercase" style={{ background: 'linear-gradient(135deg, #2076C7, #1CADA3)' }}>
                      {partner.avatar || partner.name.substring(0, 2)}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-gray-800">{partner.name}</h3>
                    <p className="text-xs text-gray-600 mt-0.5 font-mono break-all">{partner.mobile}</p>
                    <p className="text-xs text-gray-600 mt-0.5 font-mono break-all">{partner.email}</p>
                    <p className="text-xs text-gray-600 mt-0.5 font-mono break-all">{partner.state}</p>
                     <p className="text-xs text-gray-600 mt-0.5 font-mono break-all">{partner.city}</p>
                    <div className="mt-3 flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-3 py-1.5 rounded-full">
                      <Calendar className="w-3 h-3" />
                      <span>Joined {formatDate(partner.joinedDate)}</span>
                    </div>
                    <div className="w-full h-px bg-gray-100 my-4"></div>
                    <div className="flex justify-around w-full gap-6">
                      <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wide flex items-center justify-center gap-1"><Briefcase className="w-3 h-3" />Total Leads</p>
                        <p className="text-xl font-bold text-gray-800">{partner.deals}</p>
                      </div>
                      {/* <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Revenue</p>
                        <p className="text-xl font-bold" style={{ color: '#1CADA3' }}>₹{partner.revenue.toLocaleString()}</p>
                      </div> */}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusBadge.color}`}>{statusBadge.text}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}