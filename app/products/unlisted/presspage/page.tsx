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
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [activeTab, setActiveTab] = useState<'all' | 'ARTICLE' | 'NEWS'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [companyOptions, setCompanyOptions] = useState<CompanyOption[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | 'all'>('all');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Adjusted for better reading flow

  const fetchLogos = async () => {
    try {
      const response = await fetch('http://192.168.1.69:5000/api/unlisted/public/shares');
      const data: ShareInfo[] = await response.json();
      
      const mapping: Record<string, string> = {};
      data.forEach(item => {
        if (item.logo_url) {
          mapping[item.shares_name] = item.logo_url;
        }
      });
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
        
        const uniqueCompaniesMap = new Map();
        response.data.forEach((item: any) => {
          if (!uniqueCompaniesMap.has(item.shares_name)) {
            uniqueCompaniesMap.set(item.shares_name, item.id); 
          }
        });

        const options: CompanyOption[] = Array.from(uniqueCompaniesMap.entries()).map(
          ([name, id]) => ({ name, id })
        ).sort((a, b) => a.name.localeCompare(b.name));

        setCompanyOptions(options);
      }
    } catch (err) {
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchLogos();
    loadData(); 
  }, []);

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
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 md:px-6 py-8 max-w-5xl">
        
        {/* BACK BUTTON - Updated to match SellShares */}
          <div className="container mx-auto px-4">
            <a 
              href="/products/unlisted" 
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-all text-gray-700 group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="font-semibold">Back</span>
            </a>
          </div>

        {/* HEADER - Exactly as you wanted, kept unchanged */}
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

        {/* SEARCH - Clean and minimal */}
        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm border-b border-gray-200 focus:border-[#2076C7] outline-none transition-colors bg-transparent"
            />
          </div>
        </div>

        {/* FILTERS - Minimal like the image */}
        <div className="flex items-center justify-between mb-10 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => { setActiveTab('all'); setSelectedCompanyId('all'); loadData('all'); }}
              className={`text-sm font-medium transition-colors ${
                activeTab === 'all' ? 'text-[#2076C7]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              All Updates
            </button>
            <button
              onClick={() => { setActiveTab('ARTICLE'); setSelectedCompanyId('all'); loadData('ARTICLE'); }}
              className={`text-sm font-medium transition-colors ${
                activeTab === 'ARTICLE' ? 'text-[#2076C7]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => { setActiveTab('NEWS'); setSelectedCompanyId('all'); loadData('NEWS'); }}
              className={`text-sm font-medium transition-colors ${
                activeTab === 'NEWS' ? 'text-[#2076C7]' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              News
            </button>
          </div>

          <div className="flex items-center gap-3">
            <select 
              value={selectedCompanyId}
              onChange={(e) => {
                const val = e.target.value === 'all' ? 'all' : Number(e.target.value);
                setSelectedCompanyId(val);
                loadData(activeTab, val === 'all' ? null : val);
              }}
              className="text-sm text-gray-600 bg-transparent border-0 focus:ring-0 cursor-pointer pr-6"
            >
              <option value="all">All Companies</option>
              {companyOptions.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>

            <div className="flex items-center gap-1 border-l border-gray-200 pl-3">
              <button 
                onClick={() => setViewMode('grid')} 
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'grid' ? 'text-[#2076C7] bg-gray-50' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid size={16} />
              </button>
              <button 
                onClick={() => setViewMode('list')} 
                className={`p-1.5 rounded transition-colors ${
                  viewMode === 'list' ? 'text-[#2076C7] bg-gray-50' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* NEWS FEED - Newspaper style like the image */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-6 h-6 text-[#2076C7] animate-spin" />
          </div>
        ) : (
          <>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence mode='popLayout'>
                  {paginatedData.map((article) => {
                    const logo = logoMap[article.shares_name];
                    return (
                      <motion.article
                        key={article.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="group"
                      >
                        <div className="aspect-[16/9] bg-gray-50 rounded-sm mb-4 overflow-hidden border border-gray-100">
                          {logo ? (
                            <img 
                              src={logo} 
                              alt={article.shares_name} 
                              className="w-full h-full object-contain p-8"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Building2 className="w-12 h-12 text-gray-200" />
                            </div>
                          )}
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="font-medium text-[#2076C7] uppercase tracking-wider">
                              {article.type}
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="text-gray-400">
                              {formatDate(article.action_date)}
                            </span>
                          </div>
                          <h2 className="text-lg font-semibold text-gray-900 leading-tight group-hover:text-[#2076C7] transition-colors line-clamp-2">
                            {article.title}
                          </h2>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            {article.description}
                          </p>
                          <div className="pt-3 flex items-center justify-between">
                            <a 
                              href={article.source_url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-xs font-medium text-[#2076C7] hover:text-[#1CADA3] transition-colors inline-flex items-center gap-1"
                            >
                              Read full article <ExternalLink size={10} />
                            </a>
                            <span className="text-xs text-gray-400">
                              {article.shares_name}
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              /* LIST VIEW - Exactly like the image with clean article format */
              <div className="space-y-10">
                <AnimatePresence mode='popLayout'>
                  {paginatedData.map((article, index) => {
                    const logo = logoMap[article.shares_name];
                    return (
                      <motion.article
                        key={article.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-b border-gray-100 pb-10 last:border-0 last:pb-0"
                      >
                        <div className="flex gap-8">
                          {/* Logo Column */}
                          <div className="w-48 shrink-0">
                            <div className="aspect-square bg-gray-50 rounded-sm overflow-hidden border border-gray-100">
                              {logo ? (
                                <img 
                                  src={logo} 
                                  alt={article.shares_name} 
                                  className="w-full h-full object-contain p-4"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <Building2 className="w-10 h-10 text-gray-200" />
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Content Column */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-xs mb-2">
                              <span className="font-medium text-[#2076C7] uppercase tracking-wider">
                                {article.type}
                              </span>
                              <span className="text-gray-300">•</span>
                              <span className="text-gray-400">
                                {formatDate(article.action_date)}
                              </span>
                            </div>

                            {/* Title - Large and bold like the image */}
                            <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight hover:text-[#2076C7] transition-colors">
                              {article.title}
                            </h2>

                            {/* Description - Clean and readable */}
                            <p className="text-gray-600 mb-4 leading-relaxed">
                              {article.description}
                            </p>

                            {/* Footer with company and link */}
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-medium text-gray-400">
                                {article.shares_name}
                              </span>
                              <a 
                                href={article.source_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm font-medium text-[#2076C7] hover:text-[#1CADA3] transition-colors inline-flex items-center gap-1"
                              >
                                Read the Full Article <ExternalLink size={12} />
                              </a>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
                </AnimatePresence>
              </div>
            )}

            {/* PAGINATION - Minimal like the image */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-6 mt-12 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="text-sm text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"
                >
                  ← Previous
                </button>
                
                <div className="flex items-center gap-3">
                  {getPageNumbers().map((page, i) => (
                    <button
                      key={i}
                      onClick={() => typeof page === 'number' && setCurrentPage(page)}
                      className={`text-sm transition-colors ${
                        currentPage === page 
                        ? 'text-[#2076C7] font-medium' 
                        : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="text-sm text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
} 