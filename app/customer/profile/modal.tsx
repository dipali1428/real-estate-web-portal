'use client';

import React from 'react';
import {
  Key,
  X,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Loader2,
  Trash2
} from 'lucide-react';
import { PasswordData } from './page';

interface ModalsProps {
  showPasswordModal: boolean;
  showDeleteModal: boolean;
  passwordData: PasswordData;
  updatingPassword: boolean;
  deleting: boolean;
  passwordStrength: number;
  showCurrentPassword: boolean;
  showNewPassword: boolean;
  showConfirmPassword: boolean;
  onClosePasswordModal: () => void;
  onCloseDeleteModal: () => void;
  onPasswordChange: (data: PasswordData) => void;
  onPasswordUpdate: (e: React.FormEvent) => void;
  onDeleteAccount: () => void;
  onToggleCurrentPassword: () => void;
  onToggleNewPassword: () => void;
  onToggleConfirmPassword: () => void;
  getPasswordStrengthColor: () => string;
  getPasswordStrengthText: () => string;
}

export const Modals: React.FC<ModalsProps> = ({
  showPasswordModal,
  showDeleteModal,
  passwordData,
  updatingPassword,
  deleting,
  passwordStrength,
  showCurrentPassword,
  showNewPassword,
  showConfirmPassword,
  onClosePasswordModal,
  onCloseDeleteModal,
  onPasswordChange,
  onPasswordUpdate,
  onDeleteAccount,
  onToggleCurrentPassword,
  onToggleNewPassword,
  onToggleConfirmPassword,
  getPasswordStrengthColor,
  getPasswordStrengthText
}) => {
  if (!showPasswordModal && !showDeleteModal) return null;

  return (
    <>
      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-xl">
            <div className="bg-gradient-to-r from-[#2076C7] to-[#1CADA3] p-6 text-white rounded-t-3xl flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Key size={24} />
                <h3 className="text-xl font-bold">Change Password</h3>
              </div>
              <button onClick={onClosePasswordModal} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={onPasswordUpdate} className="p-8 space-y-6">
              {/* Current Password */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Current Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordData.currentPassword}
                    onChange={(e) => onPasswordChange({ ...passwordData, currentPassword: e.target.value })}
                    className="w-full pl-12 pr-12 py-3 bg-white border-2 border-slate-400 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-[#1CADA3] transition-all"
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={onToggleCurrentPassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              {/* New Password */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-700 uppercase tracking-widest">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordData.newPassword}
                    onChange={(e) => onPasswordChange({ ...passwordData, newPassword: e.target.value })}
                    className="w-full pl-12 pr-12 py-3 bg-white border-2 border-slate-400 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-[#1CADA3] transition-all"
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={onToggleNewPassword}
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
                <label className="text-xs font-black text-slate-700 uppercase tracking-widest">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordData.confirmPassword}
                    onChange={(e) => onPasswordChange({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full pl-12 pr-12 py-3 bg-white border-2 border-slate-400 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-[#1CADA3] transition-all"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={onToggleConfirmPassword}
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
                <button type="button" onClick={onClosePasswordModal} className="flex-1 py-3 border-2 border-slate-400 rounded-xl hover:bg-slate-50 text-gray-700 text-sm font-black uppercase tracking-widest transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={updatingPassword} className="flex-1 py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest shadow-sm">
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
              <p className="text-sm text-slate-500 mb-8">This action cannot be undone. This will permanently delete your account and remove all associated data.</p>
              
              <div className="flex gap-4">
                <button onClick={onCloseDeleteModal} className="flex-1 py-3 border-2 border-slate-400 rounded-xl hover:bg-slate-50 text-gray-700 text-sm font-black uppercase tracking-widest transition-colors">
                  Cancel
                </button>
                <button onClick={onDeleteAccount} disabled={deleting} className="flex-1 py-3 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] text-white rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 text-sm font-black uppercase tracking-widest shadow-sm">
                  {deleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};