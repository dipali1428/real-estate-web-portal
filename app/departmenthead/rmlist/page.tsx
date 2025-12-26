'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Search,
  MapPin,
  Mail,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { DepartmentHeadService } from '../../services/departmentHeadService';

interface RelationshipManager {
  id: number;
  name: string;
  email: string;
  mobile: string;
  department: string;
  sub_category: string;
  city: string;
  date_joined: string;
}

export default function DepartmentHeadPanel() {
  const [allRMs, setAllRMs] = useState<RelationshipManager[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await DepartmentHeadService.getRelationshipManagers();
        setAllRMs(response.rms || []);
      } catch (err) {
        setError('Failed to fetch data.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const dynamicSubcategories = useMemo(() => {
    const categoriesSet = new Set<string>();
    allRMs.forEach(rm => {
      if (rm.sub_category) {
        rm.sub_category.split(',').forEach(cat => {
          const trimmed = cat.trim();
          if (trimmed) categoriesSet.add(trimmed);
        });
      }
    });
    return ['All', ...Array.from(categoriesSet).sort()];
  }, [allRMs]);

  const filteredManagers = useMemo(() => {
    return allRMs.filter(rm => {
      const s = searchTerm.toLowerCase();
      const matchesSearch =
        rm.name.toLowerCase().includes(s) ||
        rm.email.toLowerCase().includes(s) ||
        rm.mobile?.includes(s) ||
        rm.id.toString().includes(s) ||
        rm.city.toLowerCase().includes(s);

      const matchesCategory = selectedSubcategory === 'All' || rm.sub_category.includes(selectedSubcategory);
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedSubcategory, allRMs]);

  const getDeptColor = (dept: string) => {
    const d = dept.toLowerCase();
    if (d.includes('insur')) return 'bg-green-50 text-green-600 border-green-100';
    if (d.includes('invest')) return 'bg-blue-50 text-blue-600 border-blue-100';
    if (d.includes('finan')) return 'bg-purple-50 text-purple-600 border-purple-100';
    return 'bg-gray-50 text-gray-600 border-gray-100';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white font-sans">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcfdfe] p-4 md:p-8 font-sans antialiased text-gray-900">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-800">Relationship Managers</h1>
        <p className="text-gray-500 text-sm font-normal">{allRMs.length} total members</p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative w-full lg:flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
            <input
              type="text"
              placeholder="Search by ID, Name, Mobile..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm font-normal outline-none focus:border-blue-400 bg-gray-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <label className="text-xs font-medium text-gray-500 uppercase">Category</label>
            <select
              className="w-full lg:w-56 px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm outline-none"
              value={selectedSubcategory}
              onChange={(e) => setSelectedSubcategory(e.target.value)}
            >
              {dynamicSubcategories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-200">
                <th className="px-6 py-4 text-[12px] font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-gray-700 uppercase tracking-wider">RM</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-gray-700 uppercase tracking-wider">Mobile</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-gray-700 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-gray-700 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-gray-700 uppercase tracking-wider">Sub Categories</th>
                <th className="px-6 py-4 text-[12px] font-semibold text-gray-700 uppercase tracking-wider">Joined On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredManagers.map((rm) => (
                <tr key={rm.id} className="hover:bg-blue-50/10 transition-colors">
                  <td className="px-6 py-4 text-sm font-normal text-gray-700">{rm.id}</td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-normal text-gray-900">{rm.name}</span>
                      <span className="text-[12px] text-gray-700 font-normal flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {rm.email}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm font-normal text-gray-700">
                    {rm.mobile === 'null' || !rm.mobile ? '—' : rm.mobile}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-[11px] font-medium rounded-full border ${getDeptColor(rm.department)}`}>
                      {rm.department}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm font-normal text-gray-700">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-red-400" />
                      {rm.city}
                    </div>
                  </td>

                  {/* FIXED SUB CATEGORIES COLUMN */}
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-x-1.5 gap-y-1.5 min-w-[200px] max-w-[300px]">
                      {rm.sub_category.split(',').map((sub, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-medium rounded border border-blue-100 whitespace-nowrap"
                        >
                          {sub.trim()}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
                    {new Date(rm.date_joined).toLocaleDateString('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric'
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}