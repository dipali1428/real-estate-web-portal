'use client';

import React, { RefObject } from 'react';
import {
  User,
  Award,
  Shield,
  CheckCircle,
  Loader2,
  Edit2,
  Save,
  X,
  Key,
  Trash2,
  ChevronRight,
  Camera
} from 'lucide-react';
import { ProfileData } from './page';

interface ProfileSectionProps {
  profile: ProfileData | null;
  isEditing: boolean;
  updating: boolean;
  uploadingImage: boolean;
  mobileError: string | null;
  hasChanges: boolean;
  fileInputRef: RefObject<HTMLInputElement>;
  getImageUrl: (path: string | undefined) => string | null;
  onEdit: () => void;
  onDiscard: () => void;
  onProfileChange: (field: keyof ProfileData, value: string) => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onProfileUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
  onShowPasswordModal: () => void;
  onShowDeleteModal: () => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  profile,
  isEditing,
  updating,
  uploadingImage,
  mobileError,
  hasChanges,
  fileInputRef,
  getImageUrl,
  onEdit,
  onDiscard,
  onProfileChange,
  onImageChange,
  onProfileUpdate,
  onShowPasswordModal,
  onShowDeleteModal
}) => {
  return (
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
                    onChange={onImageChange}
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
      </div>

      {/* Right Column - Profile Details */}
      <div className="lg:col-span-8 space-y-6">
        {/* Personal Information Card */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          {/* Header */}
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
                type="button"
                onClick={onEdit}
                className="px-6 py-3 bg-[#2076C7] text-white rounded-xl hover:opacity-90 flex items-center gap-2 text-xs font-black uppercase tracking-widest shadow-sm"
              >
                <Edit2 size={14} />
                Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onDiscard}
                  className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl hover:bg-slate-200 text-xs font-black uppercase tracking-widest flex items-center gap-2"
                >
                  <X size={14} />
                  Discard
                </button>
                <button
                  type="submit"
                  form="profile-form"
                  disabled={updating || !hasChanges || !!mobileError}
                  className={`px-6 py-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 disabled:opacity-50 flex items-center gap-2 text-xs font-black uppercase tracking-widest shadow-sm ${
                    !hasChanges || mobileError ? 'cursor-not-allowed' : ''
                  }`}
                >
                  {updating ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {updating ? "Saving..." : "Save"}
                </button>
              </div>
            )}
          </div>

          {/* Form */}
          <form id="profile-form" onSubmit={onProfileUpdate}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Full Name
                </label>

                {isEditing ? (
                  <input
                    type="text"
                    value={profile?.name || ""}
                    onChange={(e) => onProfileChange("name", e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-[#1CADA3] rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-[#158f87] transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                ) : (
                  <div className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm font-bold text-slate-700">
                    {profile?.name || "Not provided"}
                  </div>
                )}
              </div>

              {/* Mobile Field */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">
                  Mobile Number
                </label>

                {isEditing ? (
                  <div>
                    <input
                      type="tel"
                      value={profile?.mobile || ""}
                      onChange={(e) => {
                        console.log("Mobile Number:", e.target.value);
                        onProfileChange("mobile", e.target.value);
                      }}
                      className={`w-full px-4 py-3 bg-white border-2 ${
                        mobileError ? "border-rose-500" : "border-[#1CADA3]"
                      } rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-[#158f87] transition-all`}
                      placeholder="Enter your mobile number"
                      required
                      maxLength={10}
                    />

                    {mobileError && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <X size={12} />
                        {mobileError}
                      </p>
                    )}
                  </div>
                ) : (
                  <div className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm font-bold text-slate-700">
                    {profile?.mobile ? profile.mobile : "Not provided"}
                  </div>
                )}
              </div>
            </div>
          </form>
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
                 onClick={onShowPasswordModal}>
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
            {/* <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-rose-500 transition-all cursor-pointer group"
                 onClick={onShowDeleteModal}>
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-white rounded-xl shadow-sm">
                  <Trash2 size={20} className="text-rose-500" />
                </div>
                <ChevronRight size={20} className="text-slate-400 group-hover:text-rose-500 transition-colors" />
              </div>
              <h4 className="font-bold text-slate-900 mb-1">Delete Account</h4>
              <p className="text-xs text-slate-500">Permanently remove your account</p>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};