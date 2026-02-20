'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Newspaper,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Search,
  Building2,
  Grid,
  List,
  ArrowLeft,
  Calendar,
  Loader2,
  MoreHorizontal
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
  id: number; // This refers to the company/share ID needed for the API
}

export default function PressMediaPage() {
  const router = useRouter();
  
  // Data State
  const [articles, setArticles] = useState<CorporateAction[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<CorporateAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // UI State
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'all' | 'ARTICLE' | 'NEWS'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // DYNAMIC DROPDOWN STATE
  const [companyOptions, setCompanyOptions] = useState<CompanyOption[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | 'all'>('all');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // ========== API FETCH & DROPDOWN SYNC ==========

  const loadData = async (type: string = 'all', companyId: number | null = null) => {
    setLoading(true);
    setCurrentPage(1); 
    try {
      let response;
      if (companyId) {
        response = await fetchCorporateActionsByShareId(companyId);
      } else if (type !== 'all') {
        response = await fetchCorporateActionsByType(type);
      } else {
        response = await fetchAllCorporateActions();
      }

      if (response.success) {
        setArticles(response.data);
        setFilteredArticles(response.data);
        
        // ✅ ONLY SHOW COMPANIES IN DROPDOWN THAT ARE IN THE NEWS DATA
        // Note: We use a Map to ensure uniqueness by Name
        const uniqueCompaniesMap = new Map();
        response.data.forEach((item: any) => {
          if (!uniqueCompaniesMap.has(item.shares_name)) {
            // Mapping the name to its corresponding ID for the API call
            uniqueCompaniesMap.set(item.shares_name, item.id); 
          }
        });

        const options: CompanyOption[] = Array.from(uniqueCompaniesMap.entries()).map(
          ([name, id]) => ({ name, id })
        ).sort((a, b) => a.name.localeCompare(b.name));

        setCompanyOptions(options);
      }
    } catch (err) {
      setError("Unable to sync news feed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  // Client-side search logic
  useEffect(() => {
    const filtered = articles.filter(a => 
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.shares_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredArticles(filtered);
    setCurrentPage(1);
  }, [searchTerm, articles]);

  // ========== PAGINATION LOGIC ==========
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const paginatedData = filteredArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) pages.push(1, 2, 3, 4, '...', totalPages);
      else if (currentPage >= totalPages - 2) pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      else pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    }
    return pages;
  };

  const formatDate = (date: string) => new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-gray-50 to-white text-slate-900 pb-20">
      <main className="container mx-auto px-4 py-8">
        
        {/* BACK BUTTON */}
        <div className="sticky top-[72px] z-40 mb-8 pt-2 pb-2">
          <button 
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all text-gray-700 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back</span>
          </button>
        </div>

        {/* HEADER */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-4 rounded-full bg-gradient-to-r from-[#2076C7]/10 to-[#1CADA3]/10 mb-6">
            <div className="p-4 rounded-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-lg">
              <Newspaper className="w-8 h-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] bg-clip-text text-transparent drop-shadow-sm">
            Press & Media
          </h1>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full mb-6"></div>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover the latest <span className="font-bold text-[#2076C7]">Corporate Updates</span> for companies you track.
          </p>
        </header>

        {/* TOOLBAR */}
        <section className="mb-10 space-y-6">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search headlines or company names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 text-base border-2 border-gray-200 rounded-xl focus:border-[#2076C7] focus:ring-2 focus:ring-[#2076C7]/10 outline-none transition-all shadow-sm text-gray-900"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-between border-t border-gray-200 pt-6">
            <div className="flex flex-wrap gap-3 items-center">
              
              {/* Type Selection Tabs - DARK GREY STYLE */}
              <div className="flex bg-gray-200 p-1.5 rounded-xl shadow-inner">
                {(['all', 'ARTICLE', 'NEWS'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => { setActiveTab(type); setSelectedCompanyId('all'); loadData(type); }}
                    className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${
                      activeTab === type 
                      ? 'bg-[#1e293b] text-white shadow-md' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-300'
                    }`}
                  >
                    {type === 'all' ? 'All Updates' : type.charAt(0) + type.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>

              {/* Company Selection Dropdown - DYNAMICALLY POPULATED */}
              <div className="relative min-w-[240px]">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                <select 
                  value={selectedCompanyId}
                  onChange={(e) => {
                    const val = e.target.value === 'all' ? 'all' : Number(e.target.value);
                    setSelectedCompanyId(val);
                    loadData(activeTab, val === 'all' ? null : val);
                  }}
                  className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-sm font-bold text-gray-800 outline-none appearance-none cursor-pointer focus:border-gray-600 transition-all shadow-sm"
                >
                  <option value="all">Companies with News ({companyOptions.length})</option>
                  {companyOptions.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm">
              <button onClick={() => setViewMode('grid')} className={`p-3 ${viewMode === 'grid' ? 'bg-[#1e293b] text-white' : 'text-gray-500 hover:bg-gray-50'}`}><Grid size={18}/></button>
              <button onClick={() => setViewMode('list')} className={`p-3 ${viewMode === 'list' ? 'bg-[#1e293b] text-white' : 'text-gray-500 hover:bg-gray-50'}`}><List size={18}/></button>
            </div>
          </div>
        </section>

        {/* MAIN FEED */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="w-12 h-12 text-[#2076C7] animate-spin mb-4" />
            <p className="text-gray-600 font-bold tracking-tight">Updating news feed...</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "flex flex-col gap-4"}>
            <AnimatePresence mode='popLayout'>
              {paginatedData.map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:border-[#2076C7] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col h-full overflow-hidden"
                >
                  <div className="h-1.5 w-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3]" />
                  <div className="p-6 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-4">
                      <span className="px-2.5 py-1 bg-blue-50 text-[#2076C7] text-[10px] font-black rounded uppercase tracking-tighter">
                        {article.type}
                      </span>
                      <div className="flex items-center gap-1 text-gray-400 text-[11px] font-bold">
                        <Calendar size={12} /> {formatDate(article.action_date)}
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-[#1e293b] mb-3 line-clamp-2 leading-tight">
                      {article.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                      {article.description}
                    </p>

                    <div className="mt-auto pt-4 border-t border-gray-50 flex flex-col gap-3">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-gray-100 rounded text-gray-500 border border-gray-200">
                          <Building2 size={12} />
                        </div>
                        <span className="text-[11px] font-black text-gray-700 uppercase truncate">{article.shares_name}</span>
                      </div>
                      <a 
                        href={article.source_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-2.5 border-2 border-[#2076C7] text-[#2076C7] text-xs font-bold rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2 group shadow-sm"
                      >
                        Read Full Article <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* PAGINATION */}
        {!loading && totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-3">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm"
            >
              <ChevronLeft size={16} /> Prev
            </button>

            <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border-2 border-gray-300 shadow-sm">
              {getPageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === '...' ? (
                    <span className="px-2 text-gray-400"><MoreHorizontal size={16} /></span>
                  ) : (
                    <button
                      onClick={() => setCurrentPage(Number(page))}
                      className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${
                        currentPage === page 
                        ? 'bg-[#1e293b] text-white shadow-md' 
                        : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-4 py-2 text-sm font-bold text-gray-700 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-30 transition-all shadow-sm"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}