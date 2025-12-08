// // app/admin/enquiry/page.tsx
// 'use client';

// import React, { useState, useMemo, useEffect } from 'react';
// import { Tab } from '@headlessui/react';
// import * as XLSX from 'xlsx';
// import { AdminService } from '@/app/services/adminService';
// import { Search } from 'lucide-react';

// // Try to import heroicons, but provide fallbacks if not installed
// let MagnifyingGlassIcon: any, FunnelIcon: any, ChevronUpDownIcon: any, EyeIcon: any, 
//     CheckCircleIcon: any, XCircleIcon: any, ClockIcon: any, EnvelopeIcon: any, 
//     PhoneIcon: any, UserIcon: any, DocumentTextIcon: any, CalendarIcon: any,
//     ArrowDownTrayIcon: any, ArrowPathIcon: any, XIcon: any, SearchIcon: any;

// try {
//   const icons = require('@heroicons/react/24/outline');
//   MagnifyingGlassIcon = icons.MagnifyingGlassIcon;
//   FunnelIcon = icons.FunnelIcon;
//   ChevronUpDownIcon = icons.ChevronUpDownIcon;
//   EyeIcon = icons.EyeIcon;
//   CheckCircleIcon = icons.CheckCircleIcon;
//   XCircleIcon = icons.XCircleIcon;
//   ClockIcon = icons.ClockIcon;
//   EnvelopeIcon = icons.EnvelopeIcon;
//   PhoneIcon = icons.PhoneIcon;
//   UserIcon = icons.UserIcon;
//   DocumentTextIcon = icons.DocumentTextIcon;
//   CalendarIcon = icons.CalendarIcon;
//   ArrowDownTrayIcon = icons.ArrowDownTrayIcon;
//   ArrowPathIcon = icons.ArrowPathIcon;
//   XIcon = icons.XMarkIcon;
// } catch (error) {
//   // If heroicons is not installed, use fallback icons
//   console.log('Heroicons not found, using fallback icons');
// }

// interface Enquiry {
//   id: number;
//   enquiry_id: string;
//   name: string;
//   email: string;
//   phone: string;
//   message: string;
//   entry_time: string;
//   status: 'Pending' | 'Resolved' | 'Closed';
//   source?: string;
//   subject?: string;
// }

// // Define column types
// type EnquiryKey = 'enquiry_id' | 'name' | 'email' | 'phone' | 'message' |'entry_time' | 'status';

// interface TableColumn {
//   key?: EnquiryKey;
//   label: string;
// }

// interface ApiResponse {
//   success: boolean;
//   count: number;
//   contactus: Enquiry[];
// }

// // Helper function for class names
// function classNames(...classes: string[]) {
//   return classes.filter(Boolean).join(' ');
// }

// const EnquiryAdminPage = () => {
//   const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortConfig, setSortConfig] = useState<{ key: EnquiryKey; direction: 'asc' | 'desc' } | null>(null);
//   const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isExporting, setIsExporting] = useState(false);
//   const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Resolved' | 'Closed'>('All');
//   const [totalCount, setTotalCount] = useState<number>(0);

//   // Fetch enquiries from API
//   useEffect(() => {
//     fetchEnquiries();
//   }, []);

//   const fetchEnquiries = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response: ApiResponse = await AdminService.contactusData();

//       if (response.success) {
//         // Transform the API data to match our Enquiry interface
//         const transformedData: Enquiry[] = response.contactus.map((item, index) => ({
//           id: index + 1, // Generate sequential ID for UI purposes
//           enquiry_id: item.enquiry_id || `ENQ-${new Date().getFullYear()}-${(index + 1).toString().padStart(3, '0')}`,
//           name: item.name || 'Unknown',
//           email: item.email || 'N/A',
//           phone: item.phone || 'N/A',
//           message: item.message || 'No message provided',
//           entry_time: item.entry_time || new Date().toISOString(),
//           status: (item.status as 'Pending' | 'Resolved' | 'Closed') || 'Pending',
//           source: item.source || 'Website',
//           subject: item.subject || 'General Inquiry'
//         }));

//         setEnquiries(transformedData);
//         setTotalCount(response.count || transformedData.length);
//       } else {
//         setError('Failed to fetch enquiries from server');
//       }
//     } catch (err: any) {
//       console.error('Error fetching enquiries:', err);
//       setError(err.message || 'Failed to fetch enquiries. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Refresh data function
//   const refreshData = async () => {
//     await fetchEnquiries();
//   };

//   // Enhanced search function - Fixed version
//   const searchEnquiries = (enquiry: Enquiry, term: string): boolean => {
//     if (!term.trim()) return true;

//     const searchTermLower = term.toLowerCase().trim();

//     // Search in all relevant fields
//     const searchableFields = [
//       enquiry.enquiry_id,
//       enquiry.name,
//       enquiry.email,
//       enquiry.phone,
//       enquiry.message,
//       enquiry.source,
//       enquiry.subject,
//       enquiry.status,
//       // Format date for searching
//       new Date(enquiry.entry_time).toLocaleDateString('en-US'),
//       new Date(enquiry.entry_time).toLocaleDateString('en-GB'),
//       new Date(enquiry.entry_time).toLocaleDateString(),
//       new Date(enquiry.entry_time).toLocaleTimeString(),
//       // Day, month, year separately
//       new Date(enquiry.entry_time).getDate().toString(),
//       (new Date(enquiry.entry_time).getMonth() + 1).toString(),
//       new Date(enquiry.entry_time).getFullYear().toString()
//     ].filter(Boolean); // Remove null/undefined values

//     // Check if any field contains the search term
//     return searchableFields.some(field => {
//       if (!field) return false;
//       return field.toString().toLowerCase().includes(searchTermLower);
//     });
//   };

//   // Filter enquiries based on active tab and search - Fixed memoization
//   const getFilteredEnquiries = useMemo(() => {
//     return enquiries.filter(enquiry => {
//       // Filter by active tab
//       const matchesTab = activeTab === 'All' || enquiry.status === activeTab;

//       // Filter by search term
//       const matchesSearch = searchEnquiries(enquiry, searchTerm);

//       return matchesTab && matchesSearch;
//     });
//   }, [enquiries, activeTab, searchTerm]);

//   // Export to Excel function
//   const exportToExcel = () => {
//     try {
//       setIsExporting(true);

//       // Determine which data to export
//       const dataToExport = getFilteredEnquiries;

//       if (dataToExport.length === 0) {
//         alert('No data to export!');
//         setIsExporting(false);
//         return;
//       }

//       // Prepare data for Excel
//       const excelData = dataToExport.map(enquiry => ({
//         'Enquiry ID': enquiry.enquiry_id,
//         'Name': enquiry.name,
//         'Email': enquiry.email,
//         'Phone': enquiry.phone,
//         'Subject': enquiry.subject || 'N/A',
//         'Message': enquiry.message,
//         'Status': enquiry.status,
//         'Source': enquiry.source || 'Website',
//         'Entry Date': new Date(enquiry.entry_time).toLocaleDateString(),
//         'Entry Time': new Date(enquiry.entry_time).toLocaleTimeString(),
//       }));

//       // Create worksheet
//       const worksheet = XLSX.utils.json_to_sheet(excelData);

//       // Create workbook
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, 'Enquiries');

//       // Generate Excel file
//       const fileName = `enquiries_${activeTab.toLowerCase()}_${new Date().toISOString().split('T')[0]}.xlsx`;
//       XLSX.writeFile(workbook, fileName);

//       console.log(`Exported ${excelData.length} enquiries to ${fileName}`);
//     } catch (err) {
//       console.error('Error exporting to Excel:', err);
//       alert('Failed to export data. Please try again.');
//     } finally {
//       setIsExporting(false);
//     }
//   };

//   // Tabs configuration
//   const tabs = ['All', 'Pending', 'Resolved', 'Closed'] as const;

//   // Table columns configuration
//   const columns: TableColumn[] = [
//     { key: 'enquiry_id', label: 'Enquiry ID' },
//     { key: 'name', label: 'Name' },
//     { key: 'email', label: 'Email' },
//     { key: 'phone', label: 'Phone' },
//     { key: 'message', label: 'Message'},
//     { key: 'entry_time', label: 'Entry Time' }, 
//     { key: 'status', label: 'Status' },
//     { label: 'Actions' }
//   ];

//   // Sort enquiries
//   const sortedEnquiries = useMemo(() => {
//     if (!sortConfig) return getFilteredEnquiries;

//     return [...getFilteredEnquiries].sort((a, b) => {
//       const aValue = a[sortConfig.key];
//       const bValue = b[sortConfig.key];

//       // Handle undefined values
//       if (aValue === undefined && bValue === undefined) return 0;
//       if (aValue === undefined) return sortConfig.direction === 'asc' ? 1 : -1;
//       if (bValue === undefined) return sortConfig.direction === 'asc' ? -1 : 1;

//       if (aValue < bValue) {
//         return sortConfig.direction === 'asc' ? -1 : 1;
//       }
//       if (aValue > bValue) {
//         return sortConfig.direction === 'asc' ? 1 : -1;
//       }
//       return 0;
//     });
//   }, [getFilteredEnquiries, sortConfig]);

//   // Handle sort click
//   const requestSort = (key: EnquiryKey) => {
//     let direction: 'asc' | 'desc' = 'asc';
//     if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   // View enquiry details
//   const viewEnquiryDetails = (enquiry: Enquiry) => {
//     setSelectedEnquiry(enquiry);
//     setIsModalOpen(true);
//   };

//   // Update enquiry status
//   const updateStatus = async (id: number, newStatus: Enquiry['status']) => {
//     try {
//       // Find the original enquiry
//       const enquiryToUpdate = enquiries.find(e => e.id === id);
//       if (!enquiryToUpdate) return;

//       // Update local state optimistically
//       setEnquiries(prev => 
//         prev.map(enquiry => 
//           enquiry.id === id ? { ...enquiry, status: newStatus } : enquiry
//         )
//       );

//       // Here you would typically make an API call to update the status on the server
//       // Example: await AdminService.updateEnquiryStatus(enquiryToUpdate.enquiry_id, newStatus);

//       console.log(`Status updated for enquiry ${enquiryToUpdate.enquiry_id}: ${newStatus}`);

//       // Show success message
//       alert(`Status updated to ${newStatus}`);

//     } catch (error) {
//       console.error('Error updating status:', error);
//       alert('Failed to update status. Please try again.');

//       // Revert optimistic update
//       fetchEnquiries(); // Refetch data to revert changes
//     }
//   };

//   // Clear search
//   const clearSearch = () => {
//     setSearchTerm('');
//   };

//   // Handle search input change
//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(e.target.value);
//   };

//   // Status badge component
//   const StatusBadge = ({ status }: { status: Enquiry['status'] }) => {
//     const baseClasses = "px-3 py-1 rounded-full text-sm font-medium";

//     switch (status) {
//       case 'Pending':
//         return <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>Pending</span>;
//       case 'Resolved':
//         return <span className={`${baseClasses} bg-green-100 text-green-800`}>Resolved</span>;
//       case 'Closed':
//         return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>Closed</span>;
//       default:
//         return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{status}</span>;
//     }
//   };

//   // Helper function to render icons
//   const renderIcon = (IconComponent: any, fallback: string, props?: any) => {
//     if (IconComponent) {
//       return <IconComponent {...props} />;
//     }
//     return <span>{fallback}</span>;
//   };

//   // Format date for display
//   const formatDate = (dateString: string) => {
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) {
//         return 'Invalid Date';
//       }
//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//       });
//     } catch (error) {
//       return 'Invalid Date';
//     }
//   };

//   // Format time for display
//   const formatTime = (dateString: string) => {
//     try {
//       const date = new Date(dateString);
//       if (isNaN(date.getTime())) {
//         return 'Invalid Time';
//       }
//       return date.toLocaleTimeString('en-US', {
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true
//       });
//     } catch (error) {
//       return 'Invalid Time';
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
//           <p className="mt-4 text-gray-600">Loading enquiries...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
//           <div className="text-red-500 text-4xl mb-4">⚠️</div>
//           <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Data</h2>
//           <p className="text-gray-600 mb-4">{error}</p>
//           <button
//             onClick={refreshData}
//             className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 md:p-6">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-8">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Enquiry Management</h1>
//             <p className="text-gray-600 mt-2">View and manage all customer enquiries</p>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-3">
//             {/* Export to Excel Button */}
//             <button
//             onClick={exportToExcel}
//             className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//             disabled={isExporting || getFilteredEnquiries.length === 0}
//           >
//             <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//             Download Excel
//             <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//             </svg>
//           </button>

//             {/* Refresh Button */}
//             <button
//               onClick={refreshData}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
//             >
//               {renderIcon(ArrowPathIcon, "🔄", { className: "h-5 w-5" })}
//               <span>Refresh</span>
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Total Enquiries</p>
//                 <p className="text-2xl font-bold text-gray-900">{totalCount}</p>
//               </div>
//               <div className="p-3 bg-blue-50 rounded-lg">
//                 {renderIcon(DocumentTextIcon, "📄", { className: "h-6 w-6 text-blue-600" })}
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Pending</p>
//                 <p className="text-2xl font-bold text-yellow-600">
//                   {enquiries.filter(e => e.status === 'Pending').length}
//                 </p>
//               </div>
//               <div className="p-3 bg-yellow-200 rounded-lg">
//                 {renderIcon(ClockIcon, "⏰", { className: "h-6 w-6 text-yellow-600" })}
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-gray-600">Resolved</p>
//                 <p className="text-2xl font-bold text-green-600">
//                   {enquiries.filter(e => e.status === 'Resolved').length}
//                 </p>
//               </div>
//               <div className="p-3 bg-green-300 rounded-lg">
//                 {renderIcon(CheckCircleIcon, "✅", { className: "h-6 w-6  text-green-900" })}
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text- text-gray-600">Closed</p>
//                 <p className="text-2xl font-bold text-gray-600">
//                   {enquiries.filter(e => e.status === 'Closed').length}
//                 </p>
//               </div>
//               <div className="p-3 bg-gray-500 rounded-lg">
//                 {renderIcon(ClockIcon, "✖", { className: "h-6 w-6 text-gray-900" })}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Tab Navigation */}
//         <Tab.Group onChange={(index) => setActiveTab(tabs[index])}>
//           <Tab.List className="flex space-x-1 rounded-xl bg-[#2076C7] p-1 mb-8">
//             {tabs.map((tab) => (
//               <Tab
//                 key={tab}
//                 className={({ selected }) =>
//                   classNames(
//                     'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
//                     'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
//                     selected
//                       ? 'bg-white text-blue-700 shadow'
//                       : 'text-blue-100 hover:bg-white/12 hover:text-white'
//                   )
//                 }
//               >
//                 {tab} (
//                   {tab === 'All' 
//                     ? enquiries.length 
//                     : enquiries.filter(e => e.status === tab).length
//                   }
//                 )
//               </Tab>
//             ))}
//           </Tab.List>
//         </Tab.Group>

//         {/* Search and Filter Bar */}
//         <div className="bg-white rounded-lg shadow p-4 mb-6">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div className="flex-1 relative">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   placeholder="Search enquiries by ID, name, email, phone, message, or status..."
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                   onKeyDown={(e) => { 
//                     if (e.key === 'Escape') {
//                       clearSearch();
//                     }
//                   }}
//                   className="w-full pl-10 pr-10 py-2.5 text-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                 />
//                 {searchTerm && (
//                   <button
//                     onClick={clearSearch}
//                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//                     title="Clear search"
//                   >
//                     {renderIcon(XIcon, "✕", { className: "w-5 h-5" })}
//                   </button>
//                 )}
//               </div>
//             </div>

//             {/* Export Info */}
//             <div className="text-sm text-gray-600">
//               <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//                 <div className="flex items-center space-x-2">
//                   <span>
//                     Showing <span className="font-bold">{getFilteredEnquiries.length}</span> of{' '}
//                     <span className="font-bold">{enquiries.length}</span> enquiries
//                   </span>
//                   {searchTerm && (
//                     <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
//                       "{searchTerm}"
//                     </span>
//                   )}
//                 </div>
//                 {activeTab !== 'All' && (
//                   <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
//                     Filtered by: <span className="font-medium">{activeTab}</span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Table Container with Horizontal Scroll */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200">
//               <thead className="bg-gray-50">
//                 <tr>
//                   {columns.map((column) => (
//                     <th
//                       key={column.key || column.label}
//                       className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap"
//                     >
//                       {column.key ? (
//                         <button
//                           className="flex items-center space-x-1 hover:text-gray-700 focus:outline-none"
//                           onClick={() => column.key && requestSort(column.key)}
//                         >
//                           <span>{column.label}</span>
//                           {renderIcon(ChevronUpDownIcon, "↕", { className: "h-4 w-4" })}
//                         </button>
//                       ) : (
//                         column.label
//                       )}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody className="bg-white divide-y divide-gray-200">
//                 {sortedEnquiries.map((enquiry) => (
//                   <tr 
//                     key={enquiry.id} 
//                     className="hover:bg-gray-50 transition-colors duration-150"
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-blue-600">
//                         {enquiry.enquiry_id}
//                       </div>
//                       {enquiry.subject && (
//                         <div className="text-sm text-gray-500 truncate max-w-xs">{enquiry.subject}</div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">
//                         {enquiry.name}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900 flex items-center">
//                         {renderIcon(EnvelopeIcon, "✉", { className: "h-4 w-4 mr-2 text-gray-400" })}
//                         <span className="truncate max-w-xs">{enquiry.email}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900 flex items-center">  
//                         {enquiry.phone}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4">
//                       <div className="text-sm text-gray-900 max-w-xs">
//                         {enquiry.message.length > 50 
//                           ? `${enquiry.message.substring(0, 50)}...` 
//                           : enquiry.message}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm text-gray-900">
//                         {formatDate(enquiry.entry_time)}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         {formatTime(enquiry.entry_time)}
//                       </div>
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <StatusBadge status={enquiry.status} />
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex items-center space-x-3">
//                         <button
//                           onClick={() => viewEnquiryDetails(enquiry)}
//                           className="text-blue-600 hover:text-blue-900 flex items-center"
//                           title="View Details"
//                         >
//                           {renderIcon(EyeIcon, "👁", { className: "h-5 w-5" })}
//                         </button>
//                         <select
//                           value={enquiry.status}
//                           onChange={(e) => updateStatus(enquiry.id, e.target.value as Enquiry['status'])}
//                           className="text-gray-700 border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                         >
//                           <option value="Pending">Pending</option>
//                           <option value="Resolved">Resolved</option>
//                           <option value="Closed">Closed</option>
//                         </select>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {sortedEnquiries.length === 0 && (
//             <div className="text-center py-12">
//               {renderIcon(DocumentTextIcon, "📄", { 
//                 className: "h-12 w-12 text-gray-400 mx-auto mb-4" 
//               })}
//               <p className="text-gray-500">
//                 {searchTerm 
//                   ? `No enquiries found for "${searchTerm}" in ${activeTab === 'All' ? 'all enquiries' : activeTab.toLowerCase() + ' enquiries'}`
//                   : `No ${activeTab === 'All' ? 'enquiries' : activeTab.toLowerCase() + ' enquiries'} found`
//                 }
//               </p>
//               {searchTerm && (
//                 <button
//                   onClick={clearSearch}
//                   className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
//                 >
//                   Clear search
//                 </button>
//               )}
//             </div>
//           )}

//           {/* Pagination */}
//           {sortedEnquiries.length > 0 && (
//             <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
//               <div className="text-sm text-gray-700">
//                 Showing <span className="font-medium">{sortedEnquiries.length}</span> enquiries
//               </div>
//               <div className="flex space-x-2">
//                 <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
//                   Previous
//                 </button>
//                 <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 bg-blue-50 text-blue-600 border-blue-600">
//                   1
//                 </button>
//                 <button className="px-3 py-1 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
//                   Next
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Enquiry Details Modal */}
//       {isModalOpen && selectedEnquiry && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-6">
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-900">Enquiry Details</h2>
//                   <p className="text-blue-600 font-medium">{selectedEnquiry.enquiry_id}</p>
//                 </div>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   className="text-gray-400 hover:text-gray-600"
//                 >
//                   {renderIcon(XCircleIcon, "✕", { className: "h-6 w-6" })}
//                 </button>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                       {renderIcon(UserIcon, "👤", { className: "h-5 w-5 mr-2" })}
//                       Customer Information
//                     </label>
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <p className="font-medium">{selectedEnquiry.name}</p>
//                       <p className="text-sm text-gray-600 mt-1">{selectedEnquiry.email}</p>
//                       <p className="text-sm text-gray-600">{selectedEnquiry.phone}</p>
//                     </div>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                       {renderIcon(CalendarIcon, "📅", { className: "h-5 w-5 mr-2" })}
//                       Entry Details
//                     </label>
//                     <div className="bg-gray-50 p-4 rounded-lg">
//                       <p className="text-sm">
//                         <span className="font-medium">Date:</span>{' '}
//                         {formatDate(selectedEnquiry.entry_time)}
//                       </p>
//                       <p className="text-sm">
//                         <span className="font-medium">Time:</span>{' '}
//                         {formatTime(selectedEnquiry.entry_time)}
//                       </p>
//                       {selectedEnquiry.source && (
//                         <p className="text-sm">
//                           <span className="font-medium">Source:</span> {selectedEnquiry.source}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
//                     {renderIcon(DocumentTextIcon, "📄", { className: "h-5 w-5 mr-2" })}
//                     Message
//                   </label>
//                   <div className="bg-gray-50 p-4 rounded-lg h-full">
//                     <p className="whitespace-pre-line text-gray-700">
//                       {selectedEnquiry.message}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="border-t pt-6">
//                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
//                   <div className="mb-4 sm:mb-0">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Current Status
//                     </label>
//                     <StatusBadge status={selectedEnquiry.status} />
//                   </div>
//                   <div className="flex space-x-3">
//                     <button
//                       onClick={() => setIsModalOpen(false)}
//                       className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
//                     >
//                       Close
//                     </button>
//                     <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//                       Send Response
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EnquiryAdminPage;
const EnquiryAdminPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold text-gray-900">Enquiry Management Page Under Construction</h1>
        </div>
    );
}
export default EnquiryAdminPage;