'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Newspaper,
  ExternalLink,
  Search,
  Building2,
  Grid,
  List,
  ArrowLeft,
  Loader2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fetchAllCorporateActions,
  fetchCorporateActionsByShareId,
  fetchCorporateActionsByType,
  CorporateAction
} from '../../../services/unlistedservices';

interface CompanyOption {
  name: string;
  id: number;
}

interface ShareInfo {
  id: number;
  shares_name: string;
  logo_url: string | null;
}

export default function PressMediaPage() {
  const router = useRouter();
  
  const [articles, setArticles] = useState<CorporateAction[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<CorporateAction[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [logoMap, setLogoMap] = useState<Record<string, string>>({});
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid'); 
  const [activeTab, setActiveTab] = useState<'all' | 'ARTICLE'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [companyOptions, setCompanyOptions] = useState<CompanyOption[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | 'all'>('all');
  
  const [currentPage, setCurrentPage] = useState(1);
  
  // UPDATED: 25 items per page (5 columns x 5 rows)
  const itemsPerPage = 25; 

  const fetchLogos = async () => {
    try {
      const response = await fetch('http://192.168.1.69:5000/api/unlisted/public/shares');
      const data: ShareInfo[] = await response.json();
      const mapping: Record<string, string> = {};
      data.forEach(item => { if (item.logo_url) mapping[item.shares_name] = item.logo_url; });
      setLogoMap(mapping);
    } catch (err) {
      console.error("Error fetching logos:", err);
    }
  };

  const loadData = async (type: string = 'all', companyId: number | null = null) => {
    setLoading(true);
    setCurrentPage(1); 
    try {
      let response;
      if (companyId) response = await fetchCorporateActionsByShareId(companyId);
      else if (type !== 'all') response = await fetchCorporateActionsByType(type);
      else response = await fetchAllCorporateActions();

      if (response.success) {
        const cleanData = response.data.filter((item: CorporateAction) => item.type !== 'NEWS');
        setArticles(cleanData);
        setFilteredArticles(cleanData);
        
        const uniqueCompaniesMap = new Map();
        cleanData.forEach((item: any) => {
          if (!uniqueCompaniesMap.has(item.shares_name)) uniqueCompaniesMap.set(item.shares_name, item.id); 
        });

        const options: CompanyOption[] = Array.from(uniqueCompaniesMap.entries()).map(
          ([name, id]) => ({ name, id })
        ).sort((a, b) => a.name.localeCompare(b.name));

        setCompanyOptions(options);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogos(); loadData(); }, []);

  useEffect(() => {
    const filtered = articles.filter(a => 
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.shares_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(filtered);
    setCurrentPage(1);
  }, [searchTerm, articles]);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedData = filteredArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) for (let i = 1; i <= totalPages; i++) pages.push(i);
    else {
      if (currentPage <= 3) pages.push(1, 2, 3, 4, '...', totalPages);
      else if (currentPage >= totalPages - 2) pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      else pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  };

  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 to-white">
      {/* w-full and px-4/8 removed max-w constraint for full edge-to-edge look */}
      <main className="w-full px-4 md:px-8 lg:px-12 py-8">
        
        {/* BACK BUTTON */}
        <div className="flex justify-start mb-8">
          <a href="/products/unlisted" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all text-gray-700 group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back</span>
          </a>
        </div>

        {/* HEADER */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 mb-4">
            <div className="p-3 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg">
              <Newspaper className="w-7 h-7" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
            Press & Media
          </h1>
          <div className="w-20 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-6"></div>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Market Intelligence & <span className="font-bold text-[#2076C7]">Corporate Updates</span>.
          </p>
        </header>

        {/* SEARCH BAR */}
        <section className="mb-10">
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search through 250+ research articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 outline-none transition-all shadow-sm hover:shadow-md text-gray-900 placeholder-gray-500"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600">
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </section>

        {/* FILTERS */}
        <div className="flex flex-wrap items-center justify-between mb-10 gap-4 border-b border-gray-100 pb-6">
          <div className="flex items-center gap-3">
            {['all', 'ARTICLE'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab as any); setSelectedCompanyId('all'); loadData(tab); }}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                  activeTab === tab 
                  ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {tab === 'all' ? 'All Updates' : 'Articles'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <select 
              value={selectedCompanyId}
              onChange={(e) => {
                const val = e.target.value === 'all' ? 'all' : Number(e.target.value);
                setSelectedCompanyId(val);
                loadData(activeTab, val === 'all' ? null : val);
              }}
              className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:border-[#2076C7] text-sm font-semibold text-gray-700 outline-none shadow-sm cursor-pointer min-w-[200px]"
            >
              <option value="all">ALL COMPANIES</option>
              {companyOptions.map(c => (
                <option key={c.id} value={c.id}>{c.name.toUpperCase()}</option>
              ))}
            </select>

            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-blue-50 text-[#2076C7]' : 'text-gray-400 hover:text-gray-600'}`}><Grid size={18} /></button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-blue-50 text-[#2076C7]' : 'text-gray-400 hover:text-gray-600'}`}><List size={18} /></button>
            </div>
          </div>
        </div>

        {/* FEED */}
        {loading ? (
          <div className="flex justify-center py-24"><Loader2 className="w-10 h-10 text-[#2076C7] animate-spin" /></div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              // grid-cols-5 for 5 columns on desktop
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                <AnimatePresence mode='popLayout'>
                  {paginatedData.map((article) => {
                    const logo = logoMap[article.shares_name];
                    return (
                      <motion.article key={article.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col h-full">
                        <div className="aspect-video bg-gray-50 flex items-center justify-center p-6 border-b border-gray-50">
                          {logo ? <img src={logo} alt={article.shares_name} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500" /> : <Building2 className="w-10 h-10 text-gray-200" />}
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                          <div className="flex items-center gap-2 text-[9px] font-bold text-[#2076C7] uppercase tracking-widest mb-2">
                            <span>{article.type}</span>
                            <span className="text-gray-400">{formatDate(article.action_date)}</span>
                          </div>
                          <h2 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2 leading-snug group-hover:text-[#2076C7] transition-colors">{article.title}</h2>
                          <p className="text-[11px] text-gray-500 line-clamp-2 mb-4 leading-relaxed flex-1">{article.description}</p>
                          <a href={article.source_url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-[#2076C7] inline-flex items-center gap-1.5 hover:translate-x-1 transition-transform mt-auto">
                            READ ARTICLE <ExternalLink size={10} />
                          </a>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <div className="space-y-4 max-w-6xl mx-auto">
                <AnimatePresence mode='popLayout'>
                  {paginatedData.map((article) => {
                    const logo = logoMap[article.shares_name];
                    return (
                      <motion.article key={article.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow-md border border-gray-100 p-5 hover:shadow-lg transition-all">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                          <div className="w-full md:w-[140px] shrink-0">
                            <div className="aspect-video bg-gray-50 rounded-lg overflow-hidden flex items-center justify-center p-4">
                              {logo ? <img src={logo} alt={article.shares_name} className="max-h-full max-w-full object-contain" /> : <Building2 className="w-8 h-8 text-gray-200" />}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <span className="px-2 py-0.5 bg-blue-50 text-[#2076C7] rounded text-[9px] font-bold uppercase tracking-widest">{article.type}</span>
                              <span className="text-[11px] font-bold text-gray-400">{formatDate(article.action_date)}</span>
                            </div>
                            <h2 className="text-base font-bold text-gray-900 mb-1 leading-tight hover:text-[#2076C7] transition-colors">{article.title}</h2>
                            <p className="text-xs text-gray-500 line-clamp-1">{article.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{article.shares_name}</span>
                              <a href={article.source_url} target="_blank" rel="noopener noreferrer" className="text-[11px] font-bold text-[#2076C7] flex items-center gap-2">FULL VIEW <ExternalLink size={12} /></a>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-16 pb-12">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-[#2076C7] disabled:opacity-30 tracking-widest">PREVIOUS</button>
                <div className="flex items-center gap-2">
                  {getPageNumbers().map((page, i) => (
                    <button key={i} onClick={() => typeof page === 'number' && setCurrentPage(page)} className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${currentPage === page ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-400 hover:bg-gray-50'}`}>{page}</button>
                  ))}
                </div>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-[#2076C7] disabled:opacity-30 tracking-widest">NEXT</button>
              </div>
            )}
          </>
        )}
      </main>

      <style jsx>{`
        .line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}