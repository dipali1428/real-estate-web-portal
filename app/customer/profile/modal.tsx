'use client';

import React, { useState, useEffect } from 'react';
import {
  Key,
  X,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  XCircle,
  Loader2,
  AlertCircle,
  Info
} from 'lucide-react';
import { PasswordData } from './page';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
}

// Toast Component
const Toast = ({ message, type, onClose }: { message: string; type: 'success' | 'error' | 'info' | 'warning'; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }[type];

  const icon = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    warning: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />
  }[type];

  return (
    <div className={`fixed top-20 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg ${bgColor} animate-in slide-in-from-right-5 max-w-sm cursor-pointer`} onClick={onClose}>
      {icon}
      <p className="text-sm font-medium">{message}</p>
      <button onClick={onClose} className="ml-2 hover:opacity-70">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

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
  // Add these props for toast notifications
  showToast?: (message: string, type: 'success' | 'error' | 'info' | 'warning') => void;
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
  getPasswordStrengthText,
  showToast
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Toast helper
  const handleShowToast = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    if (showToast) {
      showToast(message, type);
    } else {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts(prev => [...prev, { id, message, type }]);
      setTimeout(() => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
      }, 4000);
    }
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Wrap the original handlers to add toast notifications
  const handlePasswordUpdateWithToast = async (e: React.FormEvent) => {
    try {
      await onPasswordUpdate(e);
      // Success will be shown by parent component
    } catch (error: any) {
      handleShowToast(error.message || 'Failed to update password', 'error');
    }
  };

  const handleDeleteAccountWithToast = async () => {
    try {
      await onDeleteAccount();
      // Success will be shown by parent component
    } catch (error: any) {
      handleShowToast(error.message || 'Failed to delete account', 'error');
    }
  };

  if (!showPasswordModal && !showDeleteModal) return null;

  return (
    <>
      {/* Toast Container */}
      {toasts.length > 0 && (
        <div className="fixed top-20 right-4 z-[10000] flex flex-col gap-3">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              message={toast.message}
              type={toast.type}
              onClose={() => removeToast(toast.id)}
            />
          ))}
        </div>
      )}

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
            
            <form onSubmit={handlePasswordUpdateWithToast} className="p-8 space-y-6">
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
    </>
  );
};