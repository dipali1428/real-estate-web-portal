'use client';

import { useState, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import * as XLSX from 'xlsx';
import { AdminService } from '@/app/services/adminService';
import { Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

// Define types for Direct Selling Agent based on API response
interface DSA {
  password: string;
  id: string;
  adv_id: string;
  name: string;
  email: string;
  mobile: string;
  pan: string;
  city: string;
  head: string;
  category: string;
  date_joined: string;
  updated_at: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

// Initial empty data
const initialDSAs: DSA[] = [];

// Extract unique values for dropdowns from API data
const extractOptionsFromData = (dsas: DSA[]) => {
  const cities = Array.from(new Set(dsas.map(dsa => dsa.city).filter(Boolean)));
  const categories = Array.from(new Set(
    dsas.flatMap(dsa =>
      dsa.category?.split(',').map(cat => cat.trim()).filter(Boolean) || []
    )
  ));
  const heads = Array.from(new Set(
    dsas.flatMap(dsa =>
      dsa.head?.split(',').map(h => h.trim()).filter(Boolean) || []
    )
  ));
  const roles = Array.from(new Set(dsas.map(dsa => dsa.role).filter(Boolean)));

  return { cities, categories, heads, roles };
};

const mapApiDataToDSA = (apiData: any[]): DSA[] => {
  return apiData.map(item => ({
    id: item.id?.toString() || '',
    adv_id: item.adv_id || '',
    name: item.name || '',
    email: item.email || '',
    mobile: item.mobile || '',
    pan: item.pan || '',
    city: item.city || '',
    head: item.head || '',
    category: item.category || '',
    date_joined: item.date_joined || '',
    updated_at: item.updated_at || '',
    role: item.role || '',
    status: 'Active',
    password: item.password || ''
  }));
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function DSAManagementPage() {
  const [dsas, setDsas] = useState<DSA[]>(initialDSAs);
  const [editingDSA, setEditingDSA] = useState<DSA | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDSA, setNewDSA] = useState<Partial<DSA>>({
    name: '',
    email: '',
    mobile: '',
    pan: '',
    city: '',
    head: '',
    category: '',
    role: '',
    status: 'Pending',
  });

  // State for dropdown options from API data
  const [cities, setCities] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [heads, setHeads] = useState<string[]>([]);
  const [roles, setRoles] = useState<string[]>([]);

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'Active', 'Inactive', 'Pending'];

  // Fetch DSAs from API on component mount
  useEffect(() => {
    fetchDSAs();
  }, []);

  const fetchDSAs = async () => {
    try {
      setLoading(true);
      setError(null);
      const apiResponse = await AdminService.dsaList();

      const apiData =
        (Array.isArray(apiResponse) && apiResponse) ||
        apiResponse.data ||
        apiResponse.dsas ||
        apiResponse.result ||
        apiResponse.items ||
        apiResponse.dsalist ||
        [];

      // console.log("Extracted apiData:", apiData);
      // console.log("Is apiData array?", Array.isArray(apiData));

      if (!Array.isArray(apiData)) {
        throw new Error("API did not return an array");
      }

      const mappedDSAs = mapApiDataToDSA(apiData);
      setDsas(mappedDSAs);

      const options = extractOptionsFromData(mappedDSAs);
      setCities(options.cities);
      setCategories(options.categories);
      setHeads(options.heads);
      setRoles(options.roles);

    } catch (err) {
      console.error("Error fetching DSAs:", err);
      setError("Failed to load DSAs");
      setDsas([]);
    } finally {
      setLoading(false);
    }
  };


  // Filter DSAs based on selected tab
  const getFilteredDSAs = (tab: string) => {
    if (tab === 'All') return dsas;
    return dsas.filter(dsa => dsa.status === tab);
  };

  // Get current DSAs for the current page
  const getCurrentPageDSAs = () => {
    const filteredDSAs = getFilteredDSAs(activeTab);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return filteredDSAs.slice(indexOfFirstItem, indexOfLastItem);
  };

  // Calculate total pages for filtered DSAs
  const getTotalPages = () => {
    const filteredDSAs = getFilteredDSAs(activeTab);
    return Math.ceil(filteredDSAs.length / itemsPerPage);
  };

  // Reset to first page when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  // Download Excel function
  const downloadExcel = (type: 'all') => {
    let dataToExport: DSA[];

    switch (type) {
      case 'all':
      default:
        // Export all data
        dataToExport = dsas;
        break;
    }

    // Prepare data for Excel
    const excelData = dataToExport.map(dsa => ({
      'ID': dsa.id,
      'Adv ID': dsa.adv_id,
      'Name': dsa.name,
      'Email': dsa.email,
      'Mobile': dsa.mobile,
      'PAN': dsa.pan,
      'City': dsa.city,
      'Head': dsa.head,
      'Category': dsa.category,
      'Date Joined': dsa.date_joined,
      'Updated At': dsa.updated_at,
      'Role': dsa.role,
      // 'Status': dsa.status
    }));

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'DSAs');

    // Generate filename with timestamp
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `DSA_Report_${type}_${timestamp}.xlsx`;

    // Write workbook and trigger download
    XLSX.writeFile(workbook, filename);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this DSA?")) return;

    try {
      await AdminService.deleteDSA(id);

      setDsas(prev => prev.filter(d => d.id !== id));
      toast.success("DSA Deleted Successfully!");
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete DSA");
    }
  };


  // Edit DSA
  const handleEdit = (dsa: DSA) => {
    setEditingDSA({ ...dsa });
    setIsEditModalOpen(true);
  };

  // Save edited DSA
  const handleSaveEdit = async () => {
    if (!editingDSA) return;

    try {
      const payload = {
        name: editingDSA.name,
        email: editingDSA.email,
        mobile: editingDSA.mobile,
        pan: editingDSA.pan,
        city: editingDSA.city,
        password: editingDSA.password,
        role: editingDSA.role,
      };

      const response = await AdminService.updateDSA(editingDSA.id, payload);
      toast.success("DSA Updated Successfully!");

      // Update UI
      setDsas(dsas.map(dsa =>
        dsa.id === editingDSA.id ? { ...dsa, ...payload, updated_at: new Date().toISOString() } : dsa
      ));

      setIsEditModalOpen(false);
      setEditingDSA(null);

    } catch (err) {
      console.error("Error updating DSA:", err);
      alert("Failed to update DSA");
    }
  };


  // Add new DSA
  const handleAddDSA = async () => {
    try {
      const dsa: DSA = {
        id: Date.now().toString(),
        adv_id: `ADV${String(Date.now()).slice(-6)}`,
        name: newDSA.name || '',
        email: newDSA.email || '',
        mobile: newDSA.mobile || '',
        pan: newDSA.pan || '',
        city: newDSA.city || '',
        head: newDSA.head || '',
        category: newDSA.category || '',
        date_joined: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        role: newDSA.role || '',
        status: newDSA.status as 'Active' | 'Inactive' | 'Pending',
        password: ''
      };

      // Update local state
      setDsas([...dsas, dsa]);

      // Update dropdown options if new values are added
      if (dsa.city && !cities.includes(dsa.city)) {
        setCities([...cities, dsa.city]);
      }
      if (dsa.role && !roles.includes(dsa.role)) {
        setRoles([...roles, dsa.role]);
      }

      setIsAddModalOpen(false);
      setNewDSA({
        name: '',
        email: '',
        mobile: '',
        pan: '',
        city: '',
        head: '',
        category: '',
        role: '',
        status: 'Pending',
      });
    } catch (err) {
      console.error('Error adding DSA:', err);
      alert('Failed to add DSA. Please try again.');
    }
  };

  // Calculate statistics
  const stats = {
    total: dsas.length,
    active: dsas.filter(d => d.status === 'Active').length,
    inactive: dsas.filter(d => d.status === 'Inactive').length,
    pending: dsas.filter(d => d.status === 'Pending').length,
  };

  // Pagination controls
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToNextPage = () => {
    if (currentPage < getTotalPages()) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const totalPages = getTotalPages();
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pageNumbers.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pageNumbers;
  };

  const [searchQuery, setSearchQuery] = useState("");


  // Auto Search 
  // useEffect(() => {
  //   const delayDebounce = setTimeout(() => {
  //     if (searchQuery.trim() === "") {
  //       fetchDSAs();
  //     } else {
  //       searchDSAFromAPI(searchQuery);
  //     }
  //   }, 400); // debounce 400ms

  //   return () => clearTimeout(delayDebounce);
  // }, [searchQuery]);

  // // API search function
  // const searchDSAFromAPI = async (query: string) => {
  //   try {
  //     const res = await AdminService.searchDSA({ search: query });

  //     const apiData = res?.dsalist || res?.data || res || [];

  //     if (!Array.isArray(apiData)) {
  //       console.error("Search API did not return array:", apiData);
  //       return;
  //     }

  //     const mapped = mapApiDataToDSA(apiData);
  //     setDsas(mapped);

  //   } catch (err) {
  //     console.error("Search error:", err);
  //   }
  // };
  // Search Optimization
  useEffect(() => {
    let abortController = new AbortController();

    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim() === "") {
        fetchDSAs(); // load full list
        return;
      }

      try {
        const res = await AdminService.searchDSA(
          { search: searchQuery.trim() },
          { signal: abortController.signal }
        );

        const apiData =
          res?.dsalist ||
          res?.data ||
          res ||
          [];

        if (Array.isArray(apiData)) {
          setDsas(mapApiDataToDSA(apiData));
        }

      } catch (err: any) {
        if (err.name !== "AbortError") {
          console.error("Search error:", err);
        }
      }
    }, 500); // ⏳ 500ms debounce delay

    return () => {
      abortController.abort();     // cancel previous request
      clearTimeout(delayDebounce); // clear debounce
    };

  }, [searchQuery]);

  const normalize = (str: string) =>
    str?.toLowerCase().replace(/[^a-z0-9]/g, "") || "";

  const filteredDSAs = dsas.filter((dsa) => {
    const query = normalize(searchQuery);

    return (
      normalize(dsa.adv_id).includes(query) ||
      normalize(dsa.name).includes(query) ||
      normalize(dsa.email).includes(query) ||
      normalize(dsa.mobile).includes(query)
    );
  });


  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Refresh data
  const handleRefresh = () => {
    fetchDSAs();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2076C7] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading DSAs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg font-medium text-red-800">Error Loading Data</h3>
            </div>
            <p className="mt-2 text-red-700">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Refresh Button */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold font-sans text-slate-700 mb-2">
              DSA Management
            </h1>
            <p className="text-slate-800">
              Manage your Direct Selling Agents and their performance
            </p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center text-[#2076C7] hover:text-[#2076C7] item-right"
            title="Refresh Data">
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>

        </div>
        <div className="flex justify-end space-x-3 mb-4">
          {/* Add DSA Button */}
          {/* <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#2076C7] text-white px-4 py-2 rounded-lg hover:bg-[#2076C7] flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add New DSA
          </button> */}

          {/* Download Excel Button */}
          <button
            onClick={() => downloadExcel('all')}
            className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
            disabled={dsas.length === 0}>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Excel
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>




        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total DSAs</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active DSAs</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.active}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-100 rounded-lg">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending DSAs</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Inactive DSAs</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.inactive}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-6 flex flex-wrap justify-end gap-4">
          {/* Download Excel Button */}
          <div className="relative group">


            {/* Dropdown menu for download options */}
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-1">
                <button
                  onClick={() => downloadExcel('all')}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={dsas.length === 0}>
                  <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                  Download All ({dsas.length} records)
                </button>
              </div>
            </div>
          </div>


        </div>

        {/* Tabs */}
        <div className="w-full max-w-7xl mx-auto">
          <Tab.Group onChange={(index) => setActiveTab(tabs[index])}>
            <Tab.List className="flex space-x-1 rounded-xl bg-[#2076C7] p-1 mb-8">
              {tabs.map((tab) => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white text-blue-700 shadow'
                        : 'text-blue-100 hover:bg-white/12 hover:text-white'
                    )}>
                  {tab} ({getFilteredDSAs(tab).length})
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>

              {tabs.map((tab) => (
                <Tab.Panel key={tab} className="rounded-xl bg-white p-6 shadow">
                  {/* Records per page selector */}

                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center mb-4">
                      <div className="relative w-96">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search by adv_id, name, email or mobile"
                          className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none text-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-500"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
                            />
                          </svg>

                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <label className="text-sm text-gray-600">Show:</label>
                      <select
                        value={itemsPerPage}
                        onChange={(e) => {
                          setItemsPerPage(Number(e.target.value));
                          setCurrentPage(1);
                        }}
                        className="border border-gray-300 text-gray-500 rounded-md px-2 py-1 text-sm">
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                      <span className="text-sm text-gray-600">per page</span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    {getCurrentPageDSAs().length === 0 ? (
                      <div className="text-center py-12">
                        <svg className="w-16 h-16 text-gray-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="mt-4 text-gray-500">No DSAs found</p>
                      </div>
                    ) : (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Actions
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Adv ID
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Name
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Email
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Mobile
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              PAN
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              City
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Head
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Category
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Date Joined
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Updated At
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Role
                            </th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                              Status
                            </th>

                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {getCurrentPageDSAs().map((dsa) => (
                            <tr key={dsa.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                                {dsa.id}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                                {/* Edit Button */}
                                <button
                                  onClick={() => handleEdit(dsa)}
                                  className="text-indigo-600 hover:text-indigo-900 p-2"
                                  title="Edit">
                                  <Pencil className="w-4 h-4" />
                                </button>

                                {/* Delete Button */}
                                <button
                                  onClick={() => handleDelete(dsa.id)}
                                  className="text-red-600 hover:text-red-900 p-2"
                                  title="Delete">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                {dsa.adv_id}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                {dsa.name}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {dsa.email}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                {dsa.mobile}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                {dsa.pan}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                {dsa.city}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                {dsa.head}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                {dsa.category}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(dsa.date_joined)}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                {formatDate(dsa.updated_at)}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                                {dsa.role}
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${dsa.status === 'Active'
                                    ? 'bg-green-100 text-green-800'
                                    : dsa.status === 'Pending'
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-red-100 text-red-800'
                                    }`}>
                                  {dsa.status}
                                </span>
                              </td>

                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  {/* Pagination Controls - Only show if there are records */}
                  {getFilteredDSAs(tab).length > 0 && (
                    <div className="mt-6 flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
                      <div className="flex flex-1 justify-between sm:hidden">
                        <button
                          onClick={goToPrevPage}
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ${currentPage === 1
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}>
                          Previous
                        </button>
                        <button
                          onClick={goToNextPage}
                          disabled={currentPage === getTotalPages()}
                          className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ${currentPage === getTotalPages()
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                            }`}>
                          Next
                        </button>
                      </div>
                      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm text-gray-700">
                            Page <span className="font-medium">{currentPage}</span> of{' '}
                            <span className="font-medium">{getTotalPages()}</span> |{' '}
                            <span className="font-medium">{getFilteredDSAs(tab).length}</span> total DSAs
                          </p>
                        </div>
                        <div>
                          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <button
                              onClick={goToPrevPage}
                              disabled={currentPage === 1}
                              className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
                                }`}>
                              <span className="sr-only">Previous</span>
                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                              </svg>
                            </button>

                            {getPageNumbers().map((pageNumber, index) => (
                              pageNumber === '...' ? (
                                <span
                                  key={`dots-${index}`}
                                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                                  ...
                                </span>
                              ) : (
                                <button
                                  key={pageNumber}
                                  onClick={() => goToPage(pageNumber as number)}
                                  aria-current={currentPage === pageNumber ? 'page' : undefined}
                                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${currentPage === pageNumber
                                    ? 'z-10 bg-[#2076C7] text-white focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#2076C7]'
                                    : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0'
                                    }`}>
                                  {pageNumber}
                                </button>
                              )
                            ))}

                            <button
                              onClick={goToNextPage}
                              disabled={currentPage === getTotalPages()}
                              className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 ${currentPage === getTotalPages() ? 'cursor-not-allowed opacity-50' : ''
                                }`}>
                              <span className="sr-only">Next</span>
                              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </nav>
                        </div>
                      </div>
                    </div>
                  )}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && editingDSA && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto border border-gray-200">

            {/* Header */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">
              Edit DSA Details
            </h3>
            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Adv ID (Readonly) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Advisor ID
                </label>
                <input
                  type="text"
                  value={editingDSA.adv_id}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-800 rounded-lg  cursor-not-allowed"
                />
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={editingDSA.name}
                  onChange={(e) =>
                    setEditingDSA({ ...editingDSA, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={editingDSA.email}
                  onChange={(e) =>
                    setEditingDSA({ ...editingDSA, email: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Mobile
                </label>
                <input
                  type="tel"
                  value={editingDSA.mobile}
                  onChange={(e) =>
                    setEditingDSA({ ...editingDSA, mobile: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* PAN */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  PAN
                </label>
                <input
                  type="text"
                  value={editingDSA.pan}
                  onChange={(e) =>
                    setEditingDSA({ ...editingDSA, pan: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  City
                </label>
                <select
                  value={editingDSA.city}
                  onChange={(e) =>
                    setEditingDSA({ ...editingDSA, city: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={editingDSA.role}
                  onChange={(e) =>
                    setEditingDSA({ ...editingDSA, role: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>

              {/* Optional Password Reset */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  New Password (leave blank if unchanged)
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={editingDSA.password || ""}
                  onChange={(e) =>
                    setEditingDSA({ ...editingDSA, password: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 bg-gray-100 text-gray-800 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="px-5 py-2 rounded-lg border border-gray-400 text-gray-800 hover:bg-gray-100 transition">
                Cancel
              </button>

              <button
                onClick={handleSaveEdit}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}



      {/* Add DSA Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 shadow bg-opacity-100 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Add New DSA
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={newDSA.name}
                  onChange={(e) => setNewDSA({ ...newDSA, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newDSA.email}
                  onChange={(e) => setNewDSA({ ...newDSA, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mobile
                </label>
                <input
                  type="tel"
                  value={newDSA.mobile}
                  onChange={(e) => setNewDSA({ ...newDSA, mobile: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter mobile number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PAN
                </label>
                <input
                  type="text"
                  value={newDSA.pan}
                  onChange={(e) => setNewDSA({ ...newDSA, pan: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter PAN number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <select
                  value={newDSA.city}
                  onChange={(e) => setNewDSA({ ...newDSA, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Select City</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Head
                </label>
                <select
                  value={newDSA.head}
                  onChange={(e) => setNewDSA({ ...newDSA, head: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Select Head</option>
                  {heads.map(head => (
                    <option key={head} value={head}>{head}</option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={newDSA.category}
                  onChange={(e) => setNewDSA({ ...newDSA, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={newDSA.role}
                  onChange={(e) => setNewDSA({ ...newDSA, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500">
                  <option value="">Select Role</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">
                Cancel
              </button>
              <button
                onClick={handleAddDSA}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">
                Add DSA
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function useRef(arg0: boolean) {
  throw new Error('Function not implemented.');
}
