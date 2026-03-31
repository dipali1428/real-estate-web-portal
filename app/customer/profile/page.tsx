'use client';

import React, { useState, useEffect, useCallback, useRef, useMemo, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Loader2 } from 'lucide-react';
import customerService from '../../services/customerService';
import { ProfileSection } from './profilesection';
import { KYCSection } from './kycsection';
import { Modals } from './modal';
import toast from 'react-hot-toast';

export interface ProfileData {
  id?: number;
  name: string;
  mobile: string;
  email: string;
  email_verified?: boolean;
  profile_image?: string;
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
  address?: string; // Add address to ProfileData
  current_address?: string; // Add current_address
  kycDetails?: any;
  profile_photo?: string;
  avatar?: string;
  profile_pic?: string;
  [key: string]: any;
}

export interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// Helper for info toast
const showInfoToast = (message: string) => {
  toast(message, {
    icon: 'ℹ️',
    style: {
      background: '#3b82f6',
      color: '#fff',
    },
  });
};

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

// Get profile image URL helper function
const getProfileImageUrl = (imagePath: string | undefined): string | null => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  
  const baseUrl = getBaseURL();
  return `${baseUrl}${imagePath}`;
};

const validateMobile = (mobile: string): string | null => {
  if (!mobile) return 'Mobile number is required';
  if (!/^\d{10}$/.test(mobile)) return 'Please enter a valid 10-digit mobile number';
  return null;
};

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null!);

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [originalProfile, setOriginalProfile] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());
  const [mobileError, setMobileError] = useState<string | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [aadhaarAddress, setAadhaarAddress] = useState('');

  // UI States
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [passwordData, setPasswordData] = useState<PasswordData>({ 
    currentPassword: '', 
    newPassword: '', 
    confirmPassword: '' 
  });

  const [passwordStrength, setPasswordStrength] = useState(0);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  // Calculate password strength
  useEffect(() => {
    const password = passwordData.newPassword;
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  }, [passwordData.newPassword]);

  // STEP LOGIC
  const isStep1Complete = useMemo(() => {
    return !!(profile?.name && profile?.mobile && profile?.email_verified);
  }, [profile]);

  const isStep2Complete = useMemo(() => {
    return !!(isStep1Complete && profile?.pan_verified && profile?.aadhaar_verified);
  }, [isStep1Complete, profile]);

  const isStep3Complete = useMemo(() => {
    return !!(isStep2Complete && profile?.bank_verified);
  }, [isStep2Complete, profile]);

  const refreshProfileData = useCallback(async () => {
    try {
      const response = await customerService.getProfile();
      if (response) {
        const userData = response.user || {};
        const kycData = response.kycDetails || {};
        const profileImage = userData.profile_photo || userData.profile_image || kycData.profile_image_url || '';

        // Get address from multiple sources
        let userAddress = userData.address || userData.current_address || '';
        // If Aadhaar is verified, use Aadhaar address
        if (kycData.aadhaar_verified && kycData.aadhaar_kyc_data?.full_address) {
          userAddress = kycData.aadhaar_kyc_data.full_address;
          setAadhaarAddress(kycData.aadhaar_kyc_data.full_address);
        } else if (kycData.current_address) {
          userAddress = kycData.current_address;
        }

        const updatedProfile: ProfileData = {
          ...userData,
          email: userData.email || '',
          email_verified: !!userData.email_verified || !!kycData.email_verified,
          pan_verified: !!userData.pan_verified,
          aadhaar_verified: !!kycData.aadhaar_verified,
          bank_verified: !!kycData.bank_verified,
          profile_image: profileImage,
          address: userAddress, // Set address
          current_address: userAddress,
          kycDetails: kycData
        };

        setProfile(updatedProfile);
        setOriginalProfile(updatedProfile);
        setImageTimestamp(Date.now());
        setHasChanges(false);
      }
    } catch (error) {
      toast.error("Failed to refresh profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProfileData();
  }, [refreshProfileData]);

  // Handle profile field changes - Fixed type issue
  const handleProfileChange = (field: keyof ProfileData, value: string) => {
    setProfile(prev => prev ? { ...prev, [field]: value } : null);
    setHasChanges(true);
    
    // Validate mobile on change
    if (field === 'mobile') {
      const error = validateMobile(value);
      setMobileError(error);
    }
  };

  // Handle image upload from gallery
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const formData = new FormData();
    formData.append('profile_photo', file);
    
    try {
      setUploadingImage(true);
      await customerService.updateProfileImage(formData);
      await refreshProfileData();
      setImageTimestamp(Date.now());
      toast.success("Photo updated successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to update photo");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Handle camera capture
  const handleCameraCapture = async (blob: Blob) => {
    const file = new File([blob], `camera_capture_${Date.now()}.jpg`, { type: "image/jpeg" });
    const formData = new FormData();
    formData.append("profile_photo", file);
    
    try {
      setUploadingImage(true);
      await customerService.updateProfileImage(formData);
      await refreshProfileData();
      setImageTimestamp(Date.now());
      toast.success("Photo updated successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to update photo");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleAddressUpdate = (address: string) => {
    console.log('Address update received in parent:', address); // Debug log
    setAadhaarAddress(address);
    // Update profile with this address
    if (profile) {
      setProfile({ ...profile, address, current_address: address });
    }
    // Show success message
    toast.success("Address fetched from Aadhaar!");
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    // Validate mobile before updating
    const mobileValidationError = validateMobile(profile.mobile);
    if (mobileValidationError) {
      setMobileError(mobileValidationError);
      toast.error(mobileValidationError);
      return;
    }
    
    try {
      setUpdating(true);
      // Include address in update if it exists
      const updateData: any = { 
        name: profile.name, 
        mobile: profile.mobile 
      };
      if (profile.address) {
        updateData.current_address = profile.address;
      }
      
      await customerService.updateProfile(updateData);
      setIsEditing(false);
      setHasChanges(false);
      toast.success("Profile updated successfully!");
      await refreshProfileData();
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setMobileError(null);
  };

  const handleDiscard = () => {
    setProfile(originalProfile);
    setIsEditing(false);
    setHasChanges(false);
    setMobileError(null);
  };

  const handlePasswordUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    if (passwordData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    try {
      setUpdatingPassword(true);
      await customerService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      toast.success("Password updated successfully!");
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update password");
    } finally {
      setUpdatingPassword(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setDeleting(true);
      await customerService.deleteAccount();
      toast.success("Account deleted successfully");
      removeTokenCookie();
      router.push('/login');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete account");
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  // Determine the final address to display
  const displayAddress = useMemo(() => {
    // Priority: Aadhaar address > profile address > current_address > empty
    if (aadhaarAddress) return aadhaarAddress;
    if (profile?.address) return profile.address;
    if (profile?.current_address) return profile.current_address;
    return '';
  }, [aadhaarAddress, profile]);

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin text-[#1CADA3]" /></div>;

  return (
    <main className="max-w-[1440px] mx-auto px-4 md:px-8 py-8 bg-[#F8FAFC] min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-700">My Profile</h1>
        <p className="text-slate-500">Complete your verification to unlock all features.</p>
      </header>

      {/* Progress Bar */}
      <div className="mb-8 bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
        <div className="flex justify-between items-center mb-3 text-xs font-black uppercase tracking-widest text-slate-400">
          <span>Onboarding Progress</span>
          <span className="text-[#1CADA3]">
            {isStep3Complete ? "100%" : isStep2Complete ? "66%" : isStep1Complete ? "33%" : "0%"}
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#2076C7] to-[#1CADA3] transition-all duration-700"
            style={{ width: isStep3Complete ? '100%' : isStep2Complete ? '66%' : isStep1Complete ? '33%' : '5%' }}
          />
        </div>
      </div>

      <ProfileSection
        profile={profile}
        isEditing={isEditing}
        updating={updating}
        uploadingImage={uploadingImage}
        mobileError={mobileError}
        hasChanges={hasChanges}
        fileInputRef={fileInputRef}
        getProfileImageUrl={getProfileImageUrl}
        onEdit={handleEdit}
        onDiscard={handleDiscard}
        onProfileChange={handleProfileChange}
        onImageChange={handleImageChange}
        onProfileUpdate={handleProfileUpdate}
        onShowPasswordModal={() => setShowPasswordModal(true)}
        onShowDeleteModal={() => setShowDeleteModal(true)}
        onCameraCapture={handleCameraCapture}
        refreshProfile={refreshProfileData}
        imageTimestamp={imageTimestamp}
        address={displayAddress} // Pass the computed display address
      />

      <KYCSection 
        profile={profile}
        onRefresh={refreshProfileData}
        isStep1Complete={isStep1Complete}
        isStep2Complete={isStep2Complete}
        isStep3Complete={isStep3Complete}
        onAddressUpdate={handleAddressUpdate}
      />

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