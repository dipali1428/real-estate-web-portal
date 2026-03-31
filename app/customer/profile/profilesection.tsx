'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { User, Loader2, Edit2, Save, X, Key, Camera, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import customerService from '../../services/customerService';
import toast from 'react-hot-toast';

// --- Camera Modal Component ---
const CameraCaptureModal = ({
    onCapture,
    onClose
}: {
    onCapture: (blob: Blob) => void;
    onClose: () => void
}) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    const startCamera = useCallback(async () => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            setError("Camera API is not supported in this browser (requires HTTPS).");
            return;
        }
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } }
            });
            setStream(mediaStream);
            if (videoRef.current) videoRef.current.srcObject = mediaStream;
        } catch (err: any) {
            setError("Could not access camera. Please check permissions.");
        }
    }, []);

    useEffect(() => {
        startCamera();
        return () => {
            if (stream) stream.getTracks().forEach(track => track.stop());
        };
    }, [startCamera]);

    const capturePhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx?.translate(canvas.width, 0);
            ctx?.scale(-1, 1);
            ctx?.drawImage(video, 0, 0);
            canvas.toBlob((blob) => {
                if (blob) { onCapture(blob); onClose(); }
            }, "image/jpeg", 0.9);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] bg-black flex flex-col items-center justify-center p-4">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden bg-slate-900 shadow-2xl">
                {error ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                        <AlertCircle size={48} className="text-rose-500 mb-4" />
                        <p className="text-white font-bold">{error}</p>
                        <button onClick={onClose} className="mt-6 px-6 py-2 bg-white/20 text-white rounded-xl font-bold">Go Back</button>
                    </div>
                ) : (
                    <>
                        <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover scale-x-[-1]" />
                        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                            <div className="w-[70%] h-[60%] border-2 border-dashed border-white/50 rounded-[100px] relative">
                                <div className="absolute inset-0 border-2 border-[#1CADA3] rounded-[100px] animate-pulse opacity-50" />
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mb-2">
                                    <span className="text-white text-[10px] font-bold uppercase bg-[#1CADA3] px-2 py-1 rounded">Align Face Here</span>
                                </div>
                            </div>
                            <div className="absolute inset-0 shadow-[0_0_0_1000px_rgba(0,0,0,0.5)] rounded-[100px] w-[70%] h-[60%] m-auto" />
                        </div>
                    </>
                )}
                <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white"><X size={24} /></button>
            </div>
            {!error && (
                <div className="mt-8 flex flex-col items-center gap-6">
                    <button onClick={capturePhoto} className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-1 border-4 border-[#1CADA3] active:scale-95 transition-transform">
                        <div className="w-full h-full bg-white rounded-full border-2 border-slate-200 flex items-center justify-center">
                            <div className="w-14 h-14 bg-[#1CADA3] rounded-full" />
                        </div>
                    </button>
                    <p className="text-white/60 text-xs font-medium">Position your face within the oval</p>
                </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
        </div>
    );
};

export const ProfileSection = ({ 
    profile, 
    isEditing, 
    updating, 
    onEdit, 
    onDiscard, 
    onProfileChange, 
    onProfileUpdate, 
    onShowPasswordModal, 
    refreshProfile,
    address
}: any) => {
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtpInput, setEmailOtpInput] = useState('');
  const [verifyingEmail, setVerifyingEmail] = useState(false);
  
  // Camera States
  const [showCamera, setShowCamera] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [imageKey, setImageKey] = useState(Date.now());

  const handleSendEmailOtp = async () => {
    try {
      setVerifyingEmail(true);
      await customerService.sendEmailOTP(profile.email);
      setEmailOtpSent(true);
      toast.success("OTP sent to " + profile.email);
    } catch (e) {
      toast.error("Failed to send OTP");
    } finally {
      setVerifyingEmail(false);
    }
  };

  const handleVerifyEmailOtp = async () => {
    try {
      setVerifyingEmail(true);
      await customerService.verifyEmailOtp({ otp: emailOtpInput });
      toast.success("Email verified!");
      setEmailOtpSent(false);
      refreshProfile();
    } catch (e) {
      toast.error("Invalid OTP");
    } finally {
      setVerifyingEmail(false);
    }
  };

  const handleCapture = async (blob: Blob) => {
    try {
      setUploadingPhoto(true);
      const file = new File([blob], `profile_photo_${Date.now()}.jpg`, { type: "image/jpeg" });
      const formData = new FormData();
      formData.append("profile_photo", file);
      await customerService.updateProfileImage(formData);
      await refreshProfile();
      setImageKey(Date.now());
      toast.success("Photo updated successfully!");
    } catch (err) {
      toast.error("Failed to upload photo");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const getImageUrl = () => {
    if (!profile?.profile_image) return undefined;
    const separator = profile.profile_image.includes('?') ? '&' : '?';
    return `${profile.profile_image}${separator}t=${imageKey}`;
  };

  const imageUrl = getImageUrl();

  const getAddressDisplay = () => {
    if (address) return address;
    if (profile?.address) return profile.address;
    return "Address not available";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
      {/* Left Column - Image & Contact */}
      <div className="lg:col-span-4">
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 pb-8">
          <div className="h-24 bg-gradient-to-r from-[#2076C7] to-[#1CADA3] relative mb-12">
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
              <div className="relative group">
                <div className="w-24 h-24 rounded-2xl bg-slate-100 border-4 border-white overflow-hidden shadow-md flex items-center justify-center">
                  {uploadingPhoto ? (
                    <Loader2 className="animate-spin text-[#1CADA3]" size={24} />
                  ) : imageUrl ? (
                    <img src={imageUrl} className="w-full h-full object-cover" alt="Profile" />
                  ) : (
                    <User className="text-slate-300" size={40}/>
                  )}
                </div>
                <button
                  onClick={() => setShowCamera(true)}
                  className="absolute -bottom-2 -right-2 p-2 bg-[#1CADA3] text-white rounded-full shadow-lg border-2 border-white hover:scale-110 transition-transform active:scale-95"
                >
                  <Camera size={12} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Contact Information with same styling as reference */}
          <div className="px-6 pb-6">
            <h2 className="text-xl font-extrabold text-[#0f172a] mb-4 text-center">Contact</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">Mobile Number</p>
                <p className="font-medium text-md text-slate-800 text-sm">{profile?.mobile}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">Email</p>
                <p className="font-medium text-md text-slate-800 truncate text-sm">{profile?.email}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase">Location</p>
                <p className="font-medium text-slate-800 text-sm">{getAddressDisplay()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <CameraCaptureModal
          onClose={() => setShowCamera(false)}
          onCapture={handleCapture}
        />
      )}

      {/* Right Column - Personal Details */}
      <div className="lg:col-span-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-slate-900">Personal Details</h3>
            <div className="flex gap-2">
              <button
                onClick={onShowPasswordModal}
                className="flex items-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl whitespace-nowrap"
              >
                <Key size={14} />
                <span>Password</span>
              </button>

              {!isEditing ? (
                <button
                  onClick={onEdit}
                  className="px-4 py-3 bg-[#2076C7] text-white rounded-xl text-xs font-black uppercase"
                >
                  Edit
                </button>
              ) : (
                <>
                  <button
                    onClick={onDiscard}
                    className="px-4 py-3 bg-slate-100 rounded-xl text-gray-600 text-xs font-black"
                  >
                    Discard
                  </button>
                  <button
                    onClick={onProfileUpdate}
                    className="px-4 py-3 bg-emerald-500 text-white rounded-xl text-xs font-black"
                  >
                    Save
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Full Name</label>
              <input 
                disabled={!isEditing} 
                value={profile?.name} 
                onChange={(e)=>onProfileChange('name', e.target.value)} 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-700 text-sm font-medium" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Mobile Number</label>
              <input 
                disabled={!isEditing} 
                value={profile?.mobile} 
                onChange={(e)=>onProfileChange('mobile', e.target.value)} 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-700 text-sm font-medium" 
              />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Address</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <input 
                    disabled 
                    value={profile?.email} 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-gray-700 text-sm font-medium pr-10" 
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    {profile?.email_verified ? <CheckCircle2 className="text-emerald-500" size={18}/> : <AlertCircle className="text-amber-500" size={18}/>}
                  </div>
                </div>
                {!profile?.email_verified && !emailOtpSent && (
                  <button 
                    onClick={handleSendEmailOtp} 
                    disabled={verifyingEmail} 
                    className="px-6 py-3 bg-[#1CADA3] text-white rounded-xl text-xs font-black uppercase whitespace-nowrap"
                  >
                    {verifyingEmail ? <Loader2 className="animate-spin" size={14}/> : "Verify Email"}
                  </button>
                )}
              </div>
              {emailOtpSent && (
                <div className="mt-3 p-4 bg-emerald-50 rounded-2xl flex gap-3 items-center animate-in slide-in-from-top-2">
                  <input 
                    placeholder="Enter Email OTP" 
                    value={emailOtpInput} 
                    onChange={(e)=>setEmailOtpInput(e.target.value)} 
                    className="flex-1 px-4 py-2 border rounded-xl text-gray-700 text-sm font-bold" 
                  />
                  <button 
                    onClick={handleVerifyEmailOtp} 
                    className="px-6 py-2 bg-emerald-600 text-white rounded-xl text-xs font-black"
                  >
                    Confirm
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};