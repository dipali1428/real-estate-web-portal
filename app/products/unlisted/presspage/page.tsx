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
  X,
  Calendar,
  FileText,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fetchAllCorporateActions,
  fetchCorporateActionsByShareId,
  fetchCorporateActionsByType,
  CorporateAction
} from '../../../services/unlistedservices';
import api from '../../../services/api';

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
  
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [activeTab, setActiveTab] = useState<'all' | 'ARTICLE'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [companyOptions, setCompanyOptions] = useState<CompanyOption[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | 'all'>('all');
  
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 25;

  const fetchLogos = async () => {
    try {
      // Use api instance instead of hardcoded URL
      const response = await api.get('/api/unlisted/public/shares');
      const data: ShareInfo[] = response.data;
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
      <main className="w-full px-4 md:px-8 lg:px-12 py-8">
        {/* Back Button */}
        <div className="sticky top-[72px] z-40 mb-8 bg-gradient-to-br from-gray-50 to-white pt-2 pb-2">
          <div className="container mx-auto px-4">
            <a 
              href="/products/unlisted" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all text-gray-700 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back</span>
            </a>
          </div>
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
            Market Intelligence & Corporate Updates
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
            <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1 shadow-sm">
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-blue-50 text-[#2076C7]' : 'text-gray-400 hover:text-gray-600'}`}><List size={18} /></button>
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-blue-50 text-[#2076C7]' : 'text-gray-400 hover:text-gray-600'}`}><Grid size={18} /></button>
            </div>
          </div>
        </div>

        {/* FEED */}
        {loading ? (
          <div className="flex justify-center py-24"><Loader2 className="w-10 h-10 text-[#2076C7] animate-spin" /></div>
        ) : (
          <>
            {viewMode === 'list' ? (
              /* LIST VIEW - FULL WIDTH WITH REDUCED LEFT/RIGHT PADDING */
              <div className="space-y-3 w-full">
                <AnimatePresence mode='popLayout'>
                  {paginatedData.map((article) => {
                    return (
                      <motion.article 
                        key={article.id} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 py-4 px-3 hover:shadow-md transition-all group w-full"
                      >
                        <div className="flex flex-col md:flex-row gap-4">
                          {/* Left side - Type and Date */}
                          <div className="md:w-[160px] shrink-0">
                            <div className="flex md:flex-col gap-2 md:gap-1.5">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 text-[#2076C7] rounded-md text-[10px] font-bold uppercase tracking-wider w-fit">
                                <Tag className="w-3 h-3" />
                                {article.type}
                              </span>
                              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-400">
                                <Calendar className="w-3 h-3" />
                                {formatDate(article.action_date)}
                              </span>
                            </div>
                          </div>

                          {/* Right side - Content */}
                          <div className="flex-1">
                            {/* Company Name */}
                            <div className="mb-1">
                              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                {article.shares_name}
                              </span>
                            </div>

                            {/* Title */}
                            <h2 className="text-lg font-bold text-gray-900 mb-2 leading-tight hover:text-[#2076C7] transition-colors">
                              {article.title}
                            </h2>

                            {/* Description */}
                            <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                              {article.description}
                            </p>

                            {/* Read More Link */}
                            <a 
                              href={article.source_url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="inline-flex items-center gap-2 text-[11px] font-bold text-[#2076C7] hover:gap-3 transition-all"
                            >
                              READ FULL ARTICLE
                              <ExternalLink size={12} />
                            </a>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              /* GRID VIEW - 5 COLUMNS */
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                <AnimatePresence mode='popLayout'>
                  {paginatedData.map((article) => {
                    return (
                      <motion.article 
                        key={article.id} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all group flex flex-col h-full"
                      >
                        {/* Header with type and date */}
                        <div className="bg-gradient-to-r from-gray-50 to-white px-4 py-3 border-b border-gray-100">
                          <div className="flex items-center justify-between">
                            <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-blue-50 text-[#2076C7] rounded-md text-[9px] font-bold uppercase tracking-wider">
                              <Tag className="w-3 h-3" />
                              {article.type}
                            </span>
                            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-400">
                              <Calendar className="w-3 h-3" />
                              {formatDate(article.action_date)}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex-1 flex flex-col">
                          {/* Company Name */}
                          <div className="mb-3">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                              {article.shares_name}
                            </span>
                          </div>

                          {/* Title */}
                          <h2 className="text-sm font-bold text-gray-900 mb-3 line-clamp-3 leading-snug group-hover:text-[#2076C7] transition-colors">
                            {article.title}
                          </h2>

                          {/* Description */}
                          <p className="text-[11px] text-gray-500 line-clamp-3 mb-4 leading-relaxed flex-1">
                            {article.description}
                          </p>

                          {/* Read More Link */}
                          <a 
                            href={article.source_url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="inline-flex items-center justify-between w-full mt-auto pt-3 border-t border-gray-100 text-[10px] font-bold text-[#2076C7] group-hover:translate-x-1 transition-transform"
                          >
                            <span>READ FULL ARTICLE</span>
                            <ExternalLink size={10} />
                          </a>
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
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                  disabled={currentPage === 1} 
                  className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-[#2076C7] disabled:opacity-30 tracking-widest"
                >
                  PREVIOUS
                </button>
                <div className="flex items-center gap-2">
                  {getPageNumbers().map((page, i) => (
                    <button 
                      key={i} 
                      onClick={() => typeof page === 'number' && setCurrentPage(page)} 
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                        currentPage === page 
                        ? 'bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white shadow-md' 
                        : 'bg-white border border-gray-200 text-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                  disabled={currentPage === totalPages} 
                  className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-[#2076C7] disabled:opacity-30 tracking-widest"
                >
                  NEXT
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}