'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  User,
  Mail,
  Award,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  Loader2,
  Edit2,
  Save,
  Info,
  X,
  Copy,
  Check,
  LogOut,
  XCircle,
  Home,
  Key,
  Eye,
  EyeOff,
  Trash2,
  AlertTriangle,
  Bell,
  Lock,
  Camera,
  Upload,
  ArrowLeft,
  Building2,
  BadgeCheck,
  Database,
  Fingerprint,
  Smartphone,
  Hash,
  CreditCard,
  Landmark,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import customerService from '../../../services/customerService';

// ==================== TYPES ====================

interface ProfileData {
  id?: number;
  name: string;
  email: string;
  profile_image?: string;
}

// ==================== HELPER FUNCTIONS ====================

const getTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  const cookies = document.cookie.split('; ');
  const authCookie = cookies.find(row => row.startsWith('authToken='));
  return authCookie ? authCookie.split('=')[1] : null;
};

const removeTokenCookie = () => {
  document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax';
};

// ==================== MAIN COMPONENT ====================

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const BACKEND_URL = "http://192.168.1.69:5000";
  
  // Profile State
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [originalProfile, setOriginalProfile] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // UI State
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [notifications, setNotifications] = useState<{ id: number; message: string; type: 'success' | 'error' | 'info' }[]>([]);

  // Get completed steps count for progress
  const getCompletedSteps = () => {
    let count = 0;
    if (profile?.email) count++;
    if (profile?.name) count++;
    if (profile?.profile_image) count++;
    return count;
  };

  const progressPercentage = (getCompletedSteps() / 3) * 100;

  // ========== IMAGE URL HELPER ==========
  const getImageUrl = (path: string | undefined) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    if (path.startsWith('/')) return `${BACKEND_URL}${path}`;
    return `${BACKEND_URL}/uploads/${path}`;
  };

  // ========== SHOW NOTIFICATION ==========
  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  }, []);

  // ========== FETCH PROFILE DATA ==========
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const token = getTokenFromCookie();
        
        if (!token) {
          router.push('/');
          return;
        }

        localStorage.setItem('token', token);
        
        const profileData = await customerService.getProfile();
        console.log('Profile data from API:', profileData);
        
        if (!isMounted) return;
        
        if (profileData) {
          const storedImageUrl = localStorage.getItem('profile_image_url');
          
          if (storedImageUrl && !profileData.profile_image) {
            profileData.profile_image = storedImageUrl;
          }
          
          setProfile(profileData);
          setOriginalProfile(profileData);
        } else {
          setError('Failed to load profile data');
        }

      } catch (err: any) {
        if (!isMounted) return;
        
        if (err.response?.status === 401) {
          removeTokenCookie();
          localStorage.removeItem('token');
          localStorage.removeItem('profile_image_url');
          router.push('/');
        } else {
          setError(err.message || 'Failed to load profile');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [router]);

  // ========== CHECK PASSWORD STRENGTH ==========
  useEffect(() => {
    if (!passwordData.newPassword) {
      setPasswordStrength(0);
      return;
    }
    
    let strength = 0;
    const password = passwordData.newPassword;
    
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    
    setPasswordStrength(Math.min(strength, 100));
  }, [passwordData.newPassword]);

  // ========== HANDLE PROFILE UPDATE ==========
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile) return;
    
    setUpdating(true);
    setError(null);
    
    try {
      const response = await customerService.updateProfile({
        id: profile.id,
        name: profile.name,
        email: profile.email
      });
      
      if (response) {
        setOriginalProfile(profile);
        setIsEditing(false);
        showNotification('Profile updated successfully!', 'success');
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        showNotification('Session expired. Please login again.', 'error');
        removeTokenCookie();
        localStorage.removeItem('token');
        localStorage.removeItem('profile_image_url');
        router.push('/');
      } else if (err.response?.status === 400) {
        setError(err.response.data?.message || 'Invalid data provided');
        showNotification('Validation error', 'error');
      } else {
        setError('Failed to update profile');
        showNotification('Failed to update profile', 'error');
      }
    } finally {
      setUpdating(false);
    }
  };

  // ========== HANDLE PROFILE IMAGE UPLOAD ==========
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showNotification('File size should be less than 5MB', 'error');
      return;
    }

    if (!file.type.startsWith('image/')) {
      showNotification('Please upload a valid image file', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('profile_photo', file);

    setUploadingImage(true);
    try {
      const response = await customerService.updateProfileImage(formData);
      console.log("Upload response:", response);
      
      let imageUrl = null;
      
      if (response.profile_image_url) {
        imageUrl = response.profile_image_url;
      } else if (response.data?.profile_image_url) {
        imageUrl = response.data.profile_image_url;
      } else if (response.image_url) {
        imageUrl = response.image_url;
      } else if (response.url) {
        imageUrl = response.url;
      }
      
      if (imageUrl) {
        localStorage.setItem('profile_image_url', imageUrl);
        
        setProfile(prev => prev ? { 
          ...prev, 
          profile_image: imageUrl 
        } : null);
        
        if (!isEditing) {
          setOriginalProfile(prev => prev ? { 
            ...prev, 
            profile_image: imageUrl 
          } : null);
        }
        
        showNotification(response.message || 'Profile picture updated!', 'success');
      } else {
        const refreshedProfile = await customerService.getProfile();
        if (refreshedProfile) {
          setProfile(refreshedProfile);
          setOriginalProfile(refreshedProfile);
        }
        showNotification('Profile picture updated!', 'success');
      }
    } catch (err: any) {
      console.error("Upload Error:", err.response?.data);
      showNotification(
        err.response?.data?.message || 'Failed to upload image', 
        'error'
      );
    } finally { 
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // ========== HANDLE PASSWORD UPDATE ==========
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError('New passwords do not match');
      showNotification('New passwords do not match', 'error');
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      setError('Password must be at least 8 characters');
      showNotification('Password too short', 'error');
      return;
    }
    
    if (passwordStrength < 75) {
      setError('Please choose a stronger password');
      showNotification('Please choose a stronger password', 'error');
      return;
    }
    
    setUpdatingPassword(true);
    setError(null);
    
    try {
      const response = await customerService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      
      if (response) {
        setShowPasswordModal(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        showNotification('Password updated successfully!', 'success');
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Current password is incorrect');
        showNotification('Incorrect current password', 'error');
      } else if (err.response?.status === 400) {
        setError(err.response.data?.message || 'Invalid password data');
        showNotification('Validation error', 'error');
      } else {
        setError('Failed to update password');
        showNotification('Failed to update password', 'error');
      }
    } finally {
      setUpdatingPassword(false);
    }
  };

  // ========== HANDLE ACCOUNT DELETION ==========
  const handleDeleteAccount = async () => {
    setDeleting(true);
    setError(null);
    
    try {
      const response = await customerService.deleteAccount();
      
      if (response) {
        removeTokenCookie();
        localStorage.removeItem('token');
        localStorage.removeItem('profile_image_url');
        showNotification('Account deleted successfully', 'success');
        setTimeout(() => router.push('/'), 2000);
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError('Your session has expired. Please login again.');
        showNotification('Session expired', 'error');
      } else {
        setError('Failed to delete account');
        showNotification('Failed to delete account', 'error');
      }
      setShowDeleteModal(false);
    } finally {
      setDeleting(false);
    }
  };

  // ========== HANDLE PROFILE CHANGE ==========
  const handleProfileChange = (field: keyof ProfileData, value: string) => {
    if (!profile) return;
    setProfile({ ...profile, [field]: value });
  };

  // ========== CANCEL EDIT ==========
  const cancelEdit = () => {
    setProfile(originalProfile);
    setIsEditing(false);
    setError(null);
    showNotification('Edit cancelled', 'info');
  };

  // ========== COPY TO CLIPBOARD ==========
  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
    showNotification(`${field} copied to clipboard!`, 'success');
  };

  // ========== GO BACK TO DASHBOARD ==========
  const goToDashboard = () => {
    router.push('/customer/unlisted');
  };

  // ========== HANDLE LOGOUT ==========
  const handleLogout = async () => {
    try {
      await customerService.logout();
      removeTokenCookie();
      localStorage.removeItem('token');
      localStorage.removeItem('profile_image_url');
      showNotification('Logged out successfully', 'success');
      router.push('/');
    } catch (err) {
      showNotification('Failed to logout', 'error');
    }
  };

  // ========== PASSWORD STRENGTH HELPERS ==========
  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-emerald-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Very Weak';
    if (passwordStrength < 50) return 'Weak';
    if (passwordStrength < 75) return 'Medium';
    return 'Strong';
  };

  // ========== LOADING STATE ==========
  if (loading) {
    return (
      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#2076C7]/20 border-t-[#2076C7] rounded-full animate-spin mx-auto"></div>
          </div>
          <p className="text-slate-600 font-medium mt-6">Loading your profile...</p>
        </div>
      </main>
    );
  }

  // ========== ERROR STATE ==========
  if (error && !profile) {
    return (
      <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-sm max-w-md w-full p-8 text-center border border-slate-100">
          <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">Unable to Load Profile</h3>
          <p className="text-slate-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-[#2076C7] text-white rounded-xl hover:opacity-90 text-xs font-black uppercase tracking-widest"
          >
            Retry
          </button>
        </div>
      </main>
    );
  }

  // ========== MAIN RENDER ==========
  return (
    <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 bg-[#F8FAFC] min-h-screen relative">
      
      {/* Notifications */}
      <div className="fixed top-20 right-5 z-50 flex flex-col gap-3">
        {notifications.map(n => (
          <div
            key={n.id}
            className={`px-4 py-3 rounded-xl shadow-lg flex items-center gap-3 border ${
              n.type === 'success' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
              n.type === 'error' ? 'bg-rose-50 text-rose-800 border-rose-200' :
              'bg-blue-50 text-blue-800 border-blue-200'
            }`}
          >
            {n.type === 'success' && <CheckCircle className="w-5 h-5" />}
            {n.type === 'error' && <AlertCircle className="w-5 h-5" />}
            {n.type === 'info' && <Bell className="w-5 h-5" />}
            <span className="text-sm font-bold">{n.message}</span>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={goToDashboard}
              className="p-2 hover:bg-white rounded-xl transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-700">My Profile</h1>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-slate-500">Manage your personal information and security</p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest whitespace-nowrap border ${
              getCompletedSteps() === 3 
                ? "bg-emerald-50 text-emerald-600 border-emerald-200" 
                : "bg-amber-50 text-amber-600 border-amber-200"
            }`}>
              {getCompletedSteps() === 3 ? "Profile Complete" : `${getCompletedSteps()}/3 Fields Done`}
            </span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="mb-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Profile Completion</span>
          <span className="text-sm font-bold text-[#1CADA3]">{getCompletedSteps()}/3 Fields</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column - Profile Image */}
        <div className="lg:col-span-4 space-y-6">
          {/* Profile Image Card */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 pb-8">
            <div className="h-28 bg-[#1CADA3] relative mb-14">
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-2xl bg-slate-100 border-4 border-white overflow-hidden shadow-md flex items-center justify-center">
                    {uploadingImage ? (
                      <div className="flex flex-col items-center gap-1">
                        <Loader2 className="w-6 h-6 animate-spin text-[#1CADA3]" />
                        <span className="text-[8px] font-bold text-slate-400">UPDATING</span>
                      </div>
                    ) : profile?.profile_image ? (
                      <img 
                        src={getImageUrl(profile.profile_image)!} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.log('Image failed to load:', profile.profile_image);
                          e.currentTarget.style.display = 'none';
                          const parent = e.currentTarget.parentElement;
                          if (parent) {
                            const fallback = document.createElement('div');
                            fallback.className = 'fallback-avatar w-full h-full flex items-center justify-center bg-slate-100 text-[#2076C7]';
                            fallback.innerHTML = '<svg class="w-10 h-10" ...></svg>';
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    ) : (
                      <User className="w-12 h-12 text-slate-300" />
                    )}
                  </div>
                  <label className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#1CADA3] rounded-full border-2 border-white flex items-center justify-center text-white shadow-lg cursor-pointer hover:scale-110 transition-transform active:scale-95">
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    <Camera size={14} strokeWidth={2.5} />
                  </label>
                </div>
              </div>
            </div>
            <div className="px-6 text-center mt-2">
              <h2 className="text-xl font-extrabold text-[#0f172a]">Profile Photo</h2>
              <p className="text-slate-400 text-[10px] font-bold tracking-widest uppercase mt-1">Upload your photo</p>
              <div className="mt-6 text-left">
                <p className="text-xs text-slate-500 font-medium">Upload a clear passport size photo (max 5MB)</p>
              </div>
            </div>
          </div>

          {/* Account Summary Card */}
          <div className="bg-gradient-to-br from-[#2076C7] to-[#1CADA3] rounded-3xl p-6 text-white shadow-sm">
            <h3 className="font-bold mb-6 flex items-center gap-2 text-lg">
              <Award size={20} />
              Account Summary
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between py-3 border-b border-white/20">
                <span className="text-sm opacity-90 font-medium">Investor ID</span>
                <span className="font-bold">#{profile?.id || 'N/A'}</span>
              </div>
              
              <div className="flex justify-between py-3">
                <span className="text-sm opacity-90 font-medium">Account Status</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-100 rounded-lg text-xs font-bold">
                  <CheckCircle className="w-3 h-3" />
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Profile Details */}
        <div className="lg:col-span-8 space-y-6">
          {/* Personal Information Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Personal Information</h3>
                  <p className="text-sm text-slate-500">Update your personal details</p>
                </div>
              </div>
              
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-[#2076C7] text-white rounded-xl hover:opacity-90 flex items-center gap-2 text-xs font-black uppercase tracking-widest shadow-sm"
                >
                  <Edit2 size={14} />
                  Edit Profile
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    onClick={cancelEdit}
                    className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 text-xs font-black uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProfileUpdate}
                    disabled={updating}
                    className="px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-50 flex items-center gap-2 text-xs font-black uppercase tracking-widest shadow-sm"
                  >
                    {updating ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                    {updating ? 'Saving...' : 'Save'}
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                  <span>Full Name</span>
                  {!isEditing && (
                    <button 
                      onClick={() => copyToClipboard(profile?.name || '', 'Name')}
                      className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      {copiedField === 'Name' ? 
                        <Check size={14} className="text-emerald-600" /> : 
                        <Copy size={14} className="text-slate-400" />
                      }
                    </button>
                  )}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile?.name || ''}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-[#1CADA3] rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-[#158f87] transition-all"
                    placeholder="Enter your full name"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm font-bold text-slate-700 border-2 border-transparent">
                    {profile?.name || 'Not provided'}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center justify-between">
                  <span>Email Address</span>
                  {!isEditing && (
                    <button 
                      onClick={() => copyToClipboard(profile?.email || '', 'Email')}
                      className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                      {copiedField === 'Email' ? 
                        <Check size={14} className="text-emerald-600" /> : 
                        <Copy size={14} className="text-slate-400" />
                      }
                    </button>
                  )}
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={profile?.email || ''}
                    onChange={(e) => handleProfileChange('email', e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-[#1CADA3] rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-[#158f87] transition-all"
                    placeholder="Enter your email"
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm font-bold text-slate-700 border-2 border-transparent flex items-center gap-2">
                    <Mail size={16} className="text-slate-400" />
                    {profile?.email || 'Not provided'}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Security Card */}
          <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-emerald-50 text-emerald-500 rounded-2xl">
                <Shield size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Security Settings</h3>
                <p className="text-sm text-slate-500">Manage your account security</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Change Password Card */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-[#1CADA3] transition-all cursor-pointer group"
                   onClick={() => setShowPasswordModal(true)}>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-white rounded-xl shadow-sm">
                    <Key size={20} className="text-[#2076C7]" />
                  </div>
                  <ChevronRight size={20} className="text-slate-400 group-hover:text-[#1CADA3] transition-colors" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Change Password</h4>
                <p className="text-xs text-slate-500">Update your password regularly</p>
              </div>

              {/* Delete Account Card */}
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-rose-500 transition-all cursor-pointer group"
                   onClick={() => setShowDeleteModal(true)}>
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-white rounded-xl shadow-sm">
                    <Trash2 size={20} className="text-rose-500" />
                  </div>
                  <ChevronRight size={20} className="text-slate-400 group-hover:text-rose-500 transition-colors" />
                </div>
                <h4 className="font-bold text-slate-900 mb-1">Delete Account</h4>
                <p className="text-xs text-slate-500">Permanently remove your account</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-xl">
            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white rounded-t-3xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Key size={24} />
                <h3 className="text-xl font-bold">Change Password</h3>
              </div>
              <button 
                onClick={() => setShowPasswordModal(false)} 
                className="p-2 hover:bg-white/20 rounded-xl transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handlePasswordUpdate} className="p-8 space-y-6">
              
              {/* Current Password */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full pl-12 pr-12 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-[#1CADA3] transition-all"
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              {/* New Password */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full pl-12 pr-12 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-[#1CADA3] transition-all"
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                {passwordData.newPassword && (
                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-500">Password Strength:</span>
                      <span className={`text-xs font-black px-2 py-1 rounded-lg ${
                        passwordStrength < 25 ? 'bg-red-50 text-red-600' :
                        passwordStrength < 50 ? 'bg-orange-50 text-orange-600' :
                        passwordStrength < 75 ? 'bg-yellow-50 text-yellow-600' :
                        'bg-emerald-50 text-emerald-600'
                      }`}>
                        {getPasswordStrengthText()}
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full ${getPasswordStrengthColor()}`} style={{ width: `${passwordStrength}%` }} />
                    </div>
                  </div>
                )}
              </div>
              
              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full pl-12 pr-12 py-3 bg-white border-2 border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-[#1CADA3] transition-all"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                
                {passwordData.confirmPassword && (
                  <div className="mt-2">
                    {passwordData.newPassword === passwordData.confirmPassword ? (
                      <p className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                        <CheckCircle size={12} /> Passwords match
                      </p>
                    ) : (
                      <p className="text-xs font-bold text-rose-600 flex items-center gap-1">
                        <XCircle size={12} /> Passwords do not match
                      </p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 py-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50 text-sm font-black uppercase tracking-widest transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatingPassword}
                  className="flex-1 py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest shadow-sm"
                >
                  {updatingPassword ? <Loader2 size={16} className="animate-spin" /> : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-xl">
            <div className="text-center">
              <div className="w-20 h-20 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-100">
                <Trash2 size={40} className="text-rose-500" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Delete Account?</h3>
              <p className="text-sm text-slate-500 mb-8">
                This action cannot be undone. This will permanently delete your account and remove all associated data.
              </p>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-3 border-2 border-slate-200 rounded-xl hover:bg-slate-50 text-sm font-black uppercase tracking-widest transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="flex-1 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 disabled:opacity-50 text-sm font-black uppercase tracking-widest shadow-sm"
                >
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}