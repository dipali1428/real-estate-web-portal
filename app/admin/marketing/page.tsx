'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Upload, X, LayoutGrid, Loader2 } from 'lucide-react';
import { AdminService } from '@/app/services/adminService';
import toast from 'react-hot-toast';

interface TemplateItem {
  id: string;
  name: string;
  type: 'image';
  category: 'insurance' | 'loan' | 'investments' | 'mutualfunds' | 'realestate' | 'contest';
  subCategory: string;
  description: string;
  imageUrl: string;
}

const CATEGORY_MAP = {
  insurance: ['insurance', 'life insurance', 'health insurance', 'motor insurance', 'marine insurance', 'general insurance'],
  loan: ['loan', 'home loan', 'personal loan', 'business loan', 'educational loan', 'vehicle loan'],
  investments: ['investments'],
  mutualfunds: ['mutualfunds'],
  realestate: ['realestate'],
  contest: ['current']
};

export default function AdminTemplates() {
  // All 21 templates added to static state
  const [templates, setTemplates] = useState<TemplateItem[]>([]);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await AdminService.getCampaigns();

        // Map API underscore_names to your frontend CamelCase names
        const formattedData = response.map((item: any) => ({
          id: item.id.toString(),
          name: item.template_name,        // Maps "template_name" to "name"
          type: 'image',
          category: item.category,
          subCategory: item.sub_category,  // Maps "sub_category" to "subCategory"
          description: item.description,
          imageUrl: item.image_url         // Maps "image_url" to "imageUrl"
        }));

        setTemplates(formattedData);
      } catch (error) {
        toast.error("Failed to load templates. Please refresh the page.");
      }
    };

    fetchTemplates();
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const [formData, setFormData] = useState({
    name: '',
    category: 'insurance' as keyof typeof CATEGORY_MAP,
    subCategory: 'life insurance', // <--- Matches CATEGORY_MAP
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // New loading state

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCategoryChange = (cat: string) => {
    const category = cat as keyof typeof CATEGORY_MAP;
    setFormData({
      ...formData,
      category,
      subCategory: CATEGORY_MAP[category][0]
    });
  };

  const handleAddTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please select an image");

    setIsSubmitting(true);
    try {
      // API Call
      const response = await AdminService.uploadCampaign({
        templateName: formData.name,
        category: formData.category,
        subCategory: formData.subCategory,
        description: formData.description,
        image: selectedFile
      });

      if (response) {
        const newTemplate: TemplateItem = {
          id: response.id || Date.now().toString(), // Use ID from server if available
          name: formData.name,
          type: 'image',
          category: formData.category,
          subCategory: formData.subCategory,
          description: formData.description,
          imageUrl: previewUrl!
        };

        setTemplates([newTemplate, ...templates]);
        setFormData({
          name: '',
          category: 'insurance',
          subCategory: 'life insurance', // <--- Correct reset value
          description: ''
        });
        setSelectedFile(null);
        setPreviewUrl(null);
        setNotification({ message: "Template uploaded successfully!", type: 'success' });
      }
    } catch (error: any) {
      // toast.error("Failed to upload template. Please try again.");
      setNotification({
        message: error.response?.data?.message || "Failed to upload template. Please try again.",
        type: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      try {
        // 1. Call the API
        await AdminService.deleteCampaign(id);

        // 2. Update local state
        setTemplates(templates.filter(t => t.id !== id));

        // 3. Show success notification
        setNotification({ message: "Template deleted successfully", type: 'success' });
      } catch (error: any) {
        setNotification({
          message: error.response?.data?.message || "Failed to delete template",
          type: 'error'
        });
      }
    }
  };


  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm">Marketing Template Asset Management</p>
          </div>
          <div className="text-center px-4 py-2 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs text-blue-600 font-bold uppercase">Total Templates</p>
            <p className="text-xl font-black text-blue-700">{templates.length}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Upload Form */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-8  text-gray-700">
              <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Plus className="text-blue-600" size={20} /> Upload New Template
              </h2>

              <form onSubmit={handleAddTemplate} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Template Name</label>
                  <input
                    type="text" required
                    placeholder='Enter template name'
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                    <select
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none cursor-pointer"
                      value={formData.category}
                      onChange={e => handleCategoryChange(e.target.value)}
                    >
                      {Object.keys(CATEGORY_MAP).map(cat => (
                        <option key={cat} value={cat}>{cat.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Sub-Category</label>
                    <select
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none cursor-pointer"
                      value={formData.subCategory}
                      onChange={e => setFormData({ ...formData, subCategory: e.target.value })}
                    >
                      {CATEGORY_MAP[formData.category].map(sub => (
                        <option key={sub} value={sub}>{sub.toUpperCase()}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                  <textarea
                    placeholder='Enter description'
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none h-20 resize-none"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Upload Image</label>
                  {!previewUrl ? (
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 hover:border-blue-400 transition-all cursor-pointer relative">
                      <input
                        type="file" accept="image/*" required
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleFileChange}
                      />
                      <Upload className="mx-auto text-slate-400 mb-2" />
                      <p className="text-xs text-slate-500">Select Image</p>
                    </div>
                  ) : (
                    <div className="relative group rounded-xl overflow-hidden border border-slate-200">
                      <img src={previewUrl} alt="Preview" className="w-full h-40 object-cover" />
                      <button
                        type="button"
                        onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-xl"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#2076C7] text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : (
                    <Plus size={18} />
                  )}
                  {isSubmitting ? "Uploading..." : "Add to Library"}
                </button>
              </form>
            </div>
          </div>

          {/* List Section */}
          <div className="lg:col-span-8 space-y-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                  <LayoutGrid size={18} className="text-slate-400" /> Active Templates
                </h3>
              </div>

              <div className="max-h-[610px] overflow-y-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white border-b border-slate-100">
                      <th className="p-4 text-[10px] uppercase font-black text-slate-400">Asset</th>
                      <th className="p-4 text-[10px] uppercase font-black text-slate-400">Classification</th>
                      <th className="p-4 text-[10px] uppercase font-black text-slate-400">Details</th>
                      <th className="p-4 text-[10px] uppercase font-black text-slate-400 text-right">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-50">
                    {templates.map((template) => (
                      <tr key={template.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4">
                          <img
                            src={template.imageUrl}
                            alt="Marketing Template Images"
                            className="w-44 h-48 rounded-lg object-cover border border-slate-200"
                          />
                        </td>
                        <td className="p-4">
                          <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase rounded">
                            {template.category}
                          </span>
                          <p className="text-[11px] text-slate-600 mt-1 uppercase">
                            {template.subCategory}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-slate-800 text-sm">{template.name}</p>
                          <p className="text-xs text-slate-500 line-clamp-1">
                            {template.description}
                          </p>
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDelete(template.id)}
                            className="p-2 text-slate-300 hover:text-red-600 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      {notification && (
        <div className="fixed top-6 right-6 z-[100] animate-in fade-in slide-in-from-right-4 duration-300">
          <div className={`flex items-center gap-3 px-5 py-4 rounded-xl shadow-2xl border ${notification.type === 'success'
            ? 'bg-white border-emerald-100 text-emerald-800'
            : 'bg-white border-red-100 text-red-800'
            }`}>
            {/* Icon */}
            <div className={`p-1.5 rounded-full ${notification.type === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
              }`}>
              {notification.type === 'success' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
              ) : (
                <X size={16} strokeWidth={3} />
              )}
            </div>

            {/* Message */}
            <p className="font-bold text-sm tracking-tight">{notification.message}</p>

            {/* Close Button */}
            <button
              onClick={() => setNotification(null)}
              className="ml-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={16} />
            </button>

            {/* Progress Bar (Visual Timer) */}
            <div className="absolute bottom-0 left-0 h-1 bg-slate-100 w-full overflow-hidden rounded-b-xl">
              <div className={`h-full animate-progress ${notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                }`} style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}