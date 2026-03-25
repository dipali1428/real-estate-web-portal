'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  AlertCircle,
  Bell,
  CheckCircle
} from 'lucide-react';
import customerService from '../../services/customerService';
import { ProfileSection } from './profilesection';
import { KYCSection } from './kycsection';
import { Modals } from './modal';

// ==================== TYPES ====================
export interface ProfileData {
  id?: number;
  name: string;
  mobile: string;
  email?: string;
  profile_image?: string;
  // KYC fields
  pan_verified?: boolean;
  aadhaar_verified?: boolean;
  bank_verified?: boolean;
  demat_added?: boolean;
  pan?: string;
  aadhaar?: string;
  bank_name?: string;
  bank_account?: string;
  ifsc?: string;
  name_as_per_pan?: string;
  date_of_birth?: string;
  // Add kycDetails as an optional property
  kycDetails?: any;
  profile_photo?: string;
  avatar?: string;
  profile_pic?: string;
}

export interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
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

const getBaseURL = (): string => {
  const baseURL = (customerService as any).defaults?.baseURL || '';
  return baseURL.replace(/\/api$/, '');
};

const validateMobile = (mobile: string): string | null => {
  if (!mobile) return 'Mobile number is required';
  if (!/^\d{10}$/.test(mobile)) return 'Please enter a valid 10-digit mobile number';
  return null;
};

export default function ProfilePage() {
  const router = useRouter();
  const baseURL = getBaseURL();
  const fileInputRef = useRef<HTMLInputElement>(null!);

  // Profile State
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [originalProfile, setOriginalProfile] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());

  // KYC Verification States
  const [panVerified, setPanVerified] = useState(false);
  const [aadhaarVerified, setAadhaarVerified] = useState(false);
  const [bankVerified, setBankVerified] = useState(false);
  const [dematAdded, setDematAdded] = useState(false);

  // UI State
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [mobileError, setMobileError] = useState<string | null>(null);

  // Track if initial fetch has been done
  const hasFetched = useRef(false);

  // ========== COMPLETED STEPS ==========
  const getCompletedSteps = useCallback(() => {
    let count = 0;
    if (profile?.mobile && profile.mobile.trim() !== '') count++;
    if (profile?.name && profile.name.trim() !== '') count++;
    if (profile?.profile_image) count++;
    return count;
  }, [profile]);

  const progressPercentage = useMemo(() => (getCompletedSteps() / 3) * 100, [getCompletedSteps]);

  // ========== CHECK IF FORM HAS CHANGES ==========
  const hasChanges = useMemo(() => {
    if (!profile || !originalProfile) return false;
    return profile.name !== originalProfile.name || profile.mobile !== originalProfile.mobile;
  }, [profile, originalProfile]);

  // ========== GET PROFILE IMAGE WITH CACHE BUSTER ==========
  const getProfileImageUrl = useCallback((path: string | undefined) => {
    if (!path) return null;

    // If it's already a full URL
    if (path.startsWith('http')) {
      // Add timestamp to bust cache
      return `${path}${path.includes('?') ? '&' : '?'}t=${imageTimestamp}`;
    }

    // If it's a local path
    if (path.startsWith('/uploads')) {
      return `${baseURL}${path}${path.includes('?') ? '&' : '?'}t=${imageTimestamp}`;
    }

    // Default path
    return `${baseURL}/uploads/${path}${path.includes('?') ? '&' : '?'}t=${imageTimestamp}`;
  }, [baseURL, imageTimestamp]);

  // ========== SHOW NOTIFICATION ==========
  const showNotification = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 4000);
  }, []);

  // ========== REFRESH PROFILE DATA FROM BACKEND ==========
  const refreshProfileData = useCallback(async () => {
    try {
      const response = await customerService.getProfile();

      if (response) {
        const userData = response.user || {};
        const kycData = response.kycDetails || {};

        // Get profile image from various possible fields
        const profileImage = 
          userData.profile_image ||
          userData.profile_photo ||
          userData.avatar ||
          userData.profile_pic ||
          kycData.profile_image_url ||
          '';

        const updatedProfile: ProfileData = {
          id: userData.id || userData.user_id,
          name: userData.name || userData.full_name || '',
          mobile: userData.mobile || userData.phone || userData.mobile_number || '',
          email: userData.email || '',
          profile_image: profileImage,
          profile_photo: profileImage,
          avatar: profileImage,
          profile_pic: profileImage,

          pan_verified: userData.pan_verified,
          aadhaar_verified: userData.aadhaar_verified,
          bank_verified: userData.bank_verified,
          demat_added: userData.demat_added,
          pan: userData.pan,
          aadhaar: userData.aadhaar,
          bank_name: userData.bank_name,
          bank_account: userData.bank_account,
          ifsc: userData.ifsc,
          name_as_per_pan: userData.name_as_per_pan,
          date_of_birth: userData.date_of_birth,
          kycDetails: kycData
        };

        setProfile(updatedProfile);
        setOriginalProfile(updatedProfile);

        setPanVerified(!!userData.pan_verified);
        setAadhaarVerified(!!userData.aadhaar_verified || !!kycData.aadhaar_verified);
        setBankVerified(!!userData.bank_verified || !!kycData.bank_verified);
        setDematAdded(!!userData.demat_added);
        
        // Update timestamp to refresh image
        setImageTimestamp(Date.now());
      }
    } catch (error) {
      console.error('Failed to refresh profile:', error);
    }
  }, []);

  // ========== INITIAL FETCH PROFILE DATA ==========
  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

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
        
        await refreshProfileData();

      } catch (err: any) {
        if (err.response?.status === 401) {
          removeTokenCookie();
          localStorage.removeItem('token');
          router.push('/');
        } else {
          setError(err.message || 'Failed to load profile');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, refreshProfileData]);

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
  const handleProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!profile) return;

    try {
      setUpdating(true);

      const response = await customerService.updateProfile({
        name: profile.name,
        mobile: profile.mobile,
      });

      if (response?.success) {

        const updatedProfile = {
          ...profile,
          mobile: profile.mobile,
          name: profile.name
        };

        setProfile(updatedProfile);
        setOriginalProfile(updatedProfile);

        setIsEditing(false);
        setMobileError(null);

        showNotification("Profile updated successfully", "success");

      } else {
        showNotification("Failed to update profile", "error");
      }

    } catch (err) {
      console.error(err);
      showNotification("Mobile number already exists", "error");
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

      // Force refresh profile data and update timestamp
      await refreshProfileData();
      
      // Force image refresh by updating timestamp
      setImageTimestamp(Date.now());

      showNotification(response.message || 'Profile picture updated!', 'success');
    } catch (err: any) {
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
      showNotification('New passwords do not match', 'error');
      return;
    }

    if (passwordData.newPassword.length < 8) {
      showNotification('Password must be at least 8 characters', 'error');
      return;
    }

    if (passwordStrength < 75) {
      showNotification('Please choose a stronger password', 'error');
      return;
    }

    setUpdatingPassword(true);

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
        showNotification('Incorrect current password', 'error');
      } else if (err.response?.status === 400) {
        showNotification(err.response.data?.message || 'Invalid password data', 'error');
      } else {
        showNotification('Failed to update password', 'error');
      }
    } finally {
      setUpdatingPassword(false);
    }
  };

  // ========== HANDLE ACCOUNT DELETION ==========
  const handleDeleteAccount = async () => {
    setDeleting(true);

    try {
      const response = await customerService.deleteAccount();
      
      if (response) {
        removeTokenCookie();
        localStorage.removeItem('token');
        showNotification('Account deleted successfully', 'success');
        setTimeout(() => router.push('/'), 2000);
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        showNotification('Session expired', 'error');
      } else {
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

    if (field === "mobile") {
      const cleanValue = value.replace(/\D/g, "").slice(0, 10);

      setProfile(prev =>
        prev ? { ...prev, mobile: cleanValue } : prev
      );

      if (cleanValue && !/^\d{10}$/.test(cleanValue)) {
        setMobileError("Please enter a valid 10-digit mobile number");
      } else {
        setMobileError(null);
      }
    } else {
      setProfile(prev =>
        prev ? { ...prev, [field]: value } : prev
      );
    }
  };

  // ========== DISCARD CHANGES ==========
  const discardChanges = useCallback(() => {
    setProfile(originalProfile);
    setIsEditing(false);
    setMobileError(null);
    showNotification('Changes discarded', 'info');
  }, [originalProfile, showNotification]);

  // ========== PASSWORD STRENGTH HELPERS ==========
  const getPasswordStrengthColor = useCallback(() => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-emerald-500';
  }, [passwordStrength]);

  const getPasswordStrengthText = useCallback(() => {
    if (passwordStrength < 25) return 'Very Weak';
    if (passwordStrength < 50) return 'Weak';
    if (passwordStrength < 75) return 'Medium';
    return 'Strong';
  }, [passwordStrength]);

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
          <div 
            style={{ width: `${progressPercentage}%` }}
            className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] rounded-full transition-all duration-500"
          />
        </div>
      </div>

      {/* Profile Section */}
      <ProfileSection
        profile={profile}
        isEditing={isEditing}
        updating={updating}
        uploadingImage={uploadingImage}
        mobileError={mobileError}
        hasChanges={hasChanges}
        fileInputRef={fileInputRef}
        getProfileImageUrl={getProfileImageUrl}
        onEdit={() => setIsEditing(true)}
        onDiscard={discardChanges}
        onProfileChange={handleProfileChange}
        onImageChange={handleImageChange}
        onProfileUpdate={handleProfileUpdate}
        onShowPasswordModal={() => setShowPasswordModal(true)}
        onShowDeleteModal={() => setShowDeleteModal(true)}
      />

      {/* KYC Section - With refresh and verification props */}
      <KYCSection 
        profile={profile}
        onRefresh={refreshProfileData}
        externalPanVerified={panVerified}
        externalAadhaarVerified={aadhaarVerified}
        externalBankVerified={bankVerified}
        externalDematAdded={dematAdded}
      />

      {/* Modals */}
      <Modals
        showPasswordModal={showPasswordModal}
        showDeleteModal={showDeleteModal}
        passwordData={passwordData}
        updatingPassword={updatingPassword}
        deleting={deleting}
        passwordStrength={passwordStrength}
        showCurrentPassword={showCurrentPassword}
        showNewPassword={showNewPassword}
        showConfirmPassword={showConfirmPassword}
        onClosePasswordModal={() => setShowPasswordModal(false)}
        onCloseDeleteModal={() => setShowDeleteModal(false)}
        onPasswordChange={setPasswordData}
        onPasswordUpdate={handlePasswordUpdate}
        onDeleteAccount={handleDeleteAccount}
        onToggleCurrentPassword={() => setShowCurrentPassword(!showCurrentPassword)}
        onToggleNewPassword={() => setShowNewPassword(!showNewPassword)}
        onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
        getPasswordStrengthColor={getPasswordStrengthColor}
        getPasswordStrengthText={getPasswordStrengthText}
      />
    </main>
  );
}