"use client";

import React, { useState } from "react";
import { useAuthStore } from "../../store/authStore";

export default function SignOutModal({ isOpen, onClose, onConfirm }) {
  const [isLoading, setIsLoading] = useState(false);
  const logout = useAuthStore((state) => state.logout);

  if (!isOpen) return null;

  const handleSignOut = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    await logout();
    onConfirm();
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={onClose}
        style={{ backdropFilter: 'blur(8px)' }}
      />
      
      {/* Modal */}
      <div className="relative z-10 mx-4 w-full max-w-md animate-dropdown-in">
        <div className="overflow-hidden rounded-2xl bg-white/80 shadow-2xl" style={{ backdropFilter: 'blur(20px)', backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
          {/* Subtle glow effect */}
          <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: '0 0 60px rgba(251, 191, 36, 0.15), 0 25px 50px rgba(0, 0, 0, 0.15)' }} />
          
          {/* Content */}
          <div className="relative p-8 text-center">
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <i className="fas fa-sign-out-alt text-2xl text-red-500"></i>
            </div>
            
            {/* Title */}
            <h2 className="text-xl font-semibold text-stone-800">
              Are you sure you want to sign out?
            </h2>
            
            <p className="mt-2 text-sm text-stone-500">
              You can always log back in to continue your journey.
            </p>
            
            {/* Buttons */}
            <div className="mt-8 flex gap-3">
              <button 
                onClick={onClose}
                className="flex-1 rounded-full border-2 border-stone-200 bg-white px-6 py-3 text-sm font-medium text-stone-700 transition-all hover:border-stone-300 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleSignOut}
                disabled={isLoading}
                className="flex-1 rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <i className="fas fa-circle-notch fa-spin text-xs"></i>
                    Signing out...
                  </span>
                ) : (
                  'Sign Out'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

