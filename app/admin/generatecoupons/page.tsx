"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { RefreshCw, Columns } from 'lucide-react';
import { toast } from "react-hot-toast";
import { AdminService } from "@/app/services/adminService";

// 1. Define an Interface for your Token
interface TokenData {
  id: number;
  token: string;
  status: string;
  usedBy: string;
  agreementStatus: string;
  batchId: number | string;
  batchCode: string;
  batchLabel: string;
  batchCreated: string;
  usedAt: string;
  created: string;
}

export default function PlaybookBypassTokens() {
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [tokens, setTokens] = useState<TokenData[]>([]); // Added Type
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [formData, setFormData] = useState({
    count: 1,
    prefix: "",
    batchLabel: ""
  });

  const [filters, setFilters] = useState({
    batch: "All",
    status: "All",
    search: "",
    sort: "Newest First"
  });

  // Helper to format dates nicely
  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr === "-") return "-";
    try {
      return new Date(dateStr).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch { return dateStr; }
  };

  const fetchTokens = async () => {
    try {
      setLoading(true);

      // Prepare API params
      const params: any = {
        // If status is "All", don't send it to the API
        status: filters.status !== "All" ? filters.status.toUpperCase() : undefined,
        coupon_code: filters.search || undefined,
        // You can add page/limit here if you add pagination state later
      };

      const response = await AdminService.getCouponsDetails({ ...params, page: currentPage });
      setTotalPages(response.pagination.total_pages);

      const dataArray = response.data || [];
      const formattedData = dataArray.map((item: any) => ({
        id: item.id,
        token: item.coupon_code || "",
        status: item.status || "UNUSED",
        usedBy: item.used_by_name || "-",
        agreementStatus: item.agreement_status || "N/A",
        batchCode: item.batch_id ? `BATCH-${item.batch_id}` : "N/A",
        batchId: item.batch_id || "-",
        batchLabel: item.batch_label || "-",
        batchCreated: formatDate(item.batch_created_at),
        usedAt: formatDate(item.used_at),
        created: formatDate(item.created_at)
      }));

      setTokens(formattedData);
    } catch (error) {
      toast.error("Failed to fetch tokens");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, [filters.status]);

  const handleGenerate = async () => {
    if (!formData.batchLabel) return toast.error("Batch label is required");

    try {
      setLoading(true);
      const payload = {
        count: formData.count,
        prefix: formData.prefix,
        batch_label: formData.batchLabel
      };

      await AdminService.generateCoupons(payload);
      toast.success(`${formData.count} tokens generated successfully`);

      setIsGeneratorOpen(false);
      setFormData({ count: 1, prefix: "", batchLabel: "" });

      // 2. Refresh the list from server to get fresh data
      await fetchTokens();
    } catch (error) {
      toast.error("Failed to generate tokens");
    } finally {
      setLoading(false);
    }
  };

  const filteredData = useMemo(() => {
    let result = [...tokens];

    // Client-side Batch Filter
    if (filters.batch !== "All") {
      result = result.filter(t => t.batchCode === filters.batch);
    }

    // Sort Logic
    return result.sort((a, b) => {
      const dateA = new Date(a.created).getTime();
      const dateB = new Date(b.created).getTime();
      return filters.sort === "Newest First" ? dateB - dateA : dateA - dateB;
    });
  }, [tokens, filters.sort, filters.batch]); // Added filters.batch here

  const batches = useMemo(() => {
    const uniqueBatches = Array.from(new Set(tokens.map(t => String(t.batchCode || "N/A"))));
    return ["All", ...uniqueBatches];
  }, [tokens]);
  const totalTokens = tokens.length;
  const usedCount = tokens.filter(t => t.status === "Used").length;
  const unusedCount = totalTokens - usedCount;
  // const totalTokens = filteredData.length;
  // const usedCount = filteredData.filter(t => t.status === "USED").length;
  // const unusedCount = totalTokens - usedCount;

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-700">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Bypass Tokens</h1>
        <p className="text-sm text-gray-500 mt-1">Generate and track per-field bypass tokens for payment fields.</p>
      </header>

      {/* Action Button */}
      <div className="mb-6">
        <button
          disabled={loading}
          onClick={() => setIsGeneratorOpen(!isGeneratorOpen)}
          className="bg-linear-to-r from-[#2076C7] to-[#1CADA3] hover:opacity-85 text-white px-4 py-2 rounded text-sm font-medium uppercase tracking-wider transition-colors disabled:opacity-50"
        >
          {isGeneratorOpen ? "Close Generator" : "Start Generate Tokens"}
        </button>
      </div>

      {/* Generator Form Section */}
      {isGeneratorOpen && (
        <div className="bg-white border border-gray-200 rounded-md p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Count</label>
              <input
                type="number"
                value={formData.count}
                onChange={(e) => setFormData({ ...formData, count: parseInt(e.target.value) || 1 })}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Prefix</label>
              <input
                type="text"
                placeholder="Enter token prefix"
                value={formData.prefix}
                onChange={(e) => setFormData({ ...formData, prefix: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Batch Label</label>
              <input
                type="text"
                placeholder="Enter batch label (e.g. Sales Team)"
                value={formData.batchLabel}
                onChange={(e) => setFormData({ ...formData, batchLabel: e.target.value })}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
            </div>
          </div>
          <button
            disabled={loading}
            onClick={handleGenerate}
            className="bg-[#1CADA3] hover:bg-[#18968d] text-white px-4 py-2 rounded text-sm font-medium uppercase disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Tokens"}
          </button>
        </div>
      )}

      {/* Filter Section */}
      <div className="bg-white border border-gray-200 rounded-md p-6 mb-6 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Filter Batch</label>
            <select
              value={filters.batch}
              onChange={(e) => setFilters({ ...filters, batch: e.target.value })}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm"
            >
              {batches.map((b, index) => (
                // Using a combined key of value + index is the safest way to prevent duplicates
                <option key={`batch-opt-${b}-${index}`} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Status</label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm"
            >
              <option value="All">All</option>
              <option value="Used">Used</option>
              <option value="Unused">Unused</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Search Token</label>
            <input
              type="text"
              placeholder="Press Enter to search..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              onKeyDown={(e) => e.key === 'Enter' && fetchTokens()} // Fetch on Enter
              className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Sort By</label>
            <select
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
              className="border border-gray-300 rounded px-3 py-1.5 text-sm"
            >
              <option value="Newest First">Newest First</option>
              <option value="Oldest First">Oldest First</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={fetchTokens}
            className="flex items-center justify-center gap-2 border border-gray-300 rounded px-4 py-1.5 text-sm hover:bg-gray-50"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 font-medium">Total Tokens</p>
          <p className="text-2xl font-semibold mt-1">{totalTokens}</p>
        </div>
        <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 font-medium">Used</p>
          <p className="text-2xl font-semibold mt-1 text-blue-600">{usedCount}</p>
        </div>
        <div className="bg-white p-4 rounded border border-gray-200 shadow-sm">
          <p className="text-xs text-gray-500 font-medium">Unused</p>
          <p className="text-2xl font-semibold mt-1 text-teal-600">{unusedCount}</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-200 rounded-md shadow-sm overflow-hidden">
        <div className="overflow-x-auto scrollbar-x-thin">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Token</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Batch Label</th>
                <th className="px-4 py-3 font-medium">Batch ID</th>
                <th className="px-4 py-3 font-medium">Used By</th>
                <th className="px-4 py-3 font-medium">Agreement</th>
                <th className="px-4 py-3 font-medium">Used At</th>
                <th className="px-4 py-3 font-medium">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && tokens.length === 0 ? (
                <tr><td colSpan={9} className="px-4 py-10 text-center">Loading...</td></tr>
              ) : filteredData.map((row, index) => (
                <tr key={`${row.id || 'row'}-${index}`} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-gray-400">#{row.id}</td>
                  <td className="px-4 py-4 font-mono text-xs font-bold text-gray-900">{row.token}</td>
                  <td className="px-4 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${row.status === 'USED' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'
                      }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">{row.batchLabel}</td>
                  <td className="px-4 py-4 text-xs text-gray-500">{row.batchId}</td>
                  <td className="px-4 py-4">
                    {row.usedBy !== "-" ? (
                      <span className="text-blue-600 font-medium">{row.usedBy}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs font-medium text-gray-600">{row.agreementStatus}</span>
                  </td>
                  <td className="px-4 py-4 text-gray-600">{row.usedAt}</td>
                  <td className="px-4 py-4 text-gray-600">{row.created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}