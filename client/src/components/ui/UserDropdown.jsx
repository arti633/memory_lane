"use client";

import React, { useState, useRef, useEffect } from "react";
import SignOutModal from "../modal/SignOutModal";
import SupportModal from "../modal/SupportModal";

export default function UserDropdown({ 
  user = { name: "User", initial: "U" }, 
  isNewUser = false 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        handleCloseDropdown();
      }
    }

    // Close dropdown on escape key
    function handleKeyDown(event) {
      if (event.key === 'Escape' && isOpen) {
        handleCloseDropdown();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const handleCloseDropdown = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 150);
  };

  const handleSignOut = () => {
    // Close dropdown first, then open modal after animation
    handleCloseDropdown();
    setTimeout(() => {
      setShowSignOutModal(true);
    }, 200);
  };

  const handleConfirmSignOut = () => {
    setShowSignOutModal(false);
    // Redirect to home after sign out
    window.location.href = "/";
  };

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        {/* Avatar Button */}
        <button
          onClick={() => isOpen ? handleCloseDropdown() : setIsOpen(true)}
          className="group flex items-center gap-2 rounded-full border-2 border-transparent p-1 pr-3 transition-all hover:border-amber-200 hover:bg-amber-50"
        >
          {/* Avatar Circle */}
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-200 text-sm font-medium text-amber-700 transition-transform group-hover:scale-105">
            {user.initial || user.name?.charAt(0).toUpperCase()}
          </div>
          
          {/* Name & Arrow */}
          <div className="hidden items-center gap-1 md:flex">
            <span className="text-sm font-medium text-stone-700">
              {user.name || "Account"}
            </span>
            {/* Arrow with rotation animation */}
            <i 
              className={`fas fa-chevron-down text-xs text-stone-400 transition-transform duration-200 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className={`absolute right-0 top-full mt-2 w-64 overflow-hidden rounded-2xl shadow-xl ${
              isClosing ? "animate-dropdown-out" : "animate-dropdown-in"
            }`}
            style={{
              backdropFilter: 'blur(20px)',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              boxShadow: '0 0 40px rgba(251, 191, 36, 0.15), 0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5) inset'
            }}
          >
            {/* User Info Header */}
            <div className="border-b border-stone-100/50 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-rose-200 text-sm font-medium text-amber-700">
                  {user.initial || user.name?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-stone-800 truncate">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-stone-500 truncate">
                    {user.email || "user@example.com"}
                  </p>
                </div>
                {/* New Account Badge */}
                {isNewUser && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                    New
                  </span>
                )}
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <a
                href="/settings"
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-600 transition-colors hover:bg-stone-100/50 hover:text-stone-900"
                onClick={handleCloseDropdown}
              >
                <i className="fas fa-cog w-5 text-center text-stone-400"></i>
                Account Settings
              </a>
              
              <button
                onClick={() => {
                  // Close dropdown first, then open modal after animation
                  handleCloseDropdown();
                  setTimeout(() => {
                    setShowSupportModal(true);
                  }, 200);
                }}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-stone-600 transition-colors hover:bg-stone-100/50 hover:text-stone-900"
              >
                <i className="fas fa-life-ring w-5 text-center text-stone-400"></i>
                Support
              </button>
            </div>

            {/* Sign Out */}
            <div className="border-t border-stone-100/50 py-2">
              <button
                onClick={handleSignOut}
                className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 transition-colors hover:bg-red-50"
              >
                <i className="fas fa-sign-out-alt w-5 text-center"></i>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sign Out Confirmation Modal */}
      <SignOutModal
        isOpen={showSignOutModal}
        onClose={() => setShowSignOutModal(false)}
        onConfirm={handleConfirmSignOut}
      />

      {/* Support Modal */}
      <SupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />
    </>
  );
}

