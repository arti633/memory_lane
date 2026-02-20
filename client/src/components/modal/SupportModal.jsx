"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";

export default function SupportModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setFormData({ subject: "", message: "" });
    setIsSubmitted(false);
    onClose();
  };

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={handleClose}
        style={{ backdropFilter: 'blur(8px)' }}
      />
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-md animate-dropdown-in">
        <div 
          className="overflow-hidden rounded-2xl shadow-2xl"
          style={{ 
            backdropFilter: 'blur(20px)', 
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            boxShadow: '0 0 60px rgba(251, 191, 36, 0.15), 0 25px 50px rgba(0, 0, 0, 0.15)'
          }}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-stone-100 px-6 py-4">
            <div>
              <h2 className="text-lg font-semibold text-stone-800">Need Help?</h2>
              <p className="text-xs text-stone-500">We're here to assist you</p>
            </div>
            <button 
              onClick={handleClose}
              className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-stone-100"
            >
              <i className="fas fa-times text-stone-400"></i>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Help Center Link */}
                <a 
                  href="https://help.memona.app" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-xl border border-stone-200 bg-stone-50 p-3 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100"
                >
                  <i className="fas fa-book-open text-amber-600"></i>
                  Visit Help Center
                </a>

                <div className="relative">
                  <span className="mb-1 block text-xs font-medium text-stone-600">Subject</span>
                  <input 
                    type="text" 
                    placeholder="How can we help?"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    required
                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  />
                </div>

                <div>
                  <span className="mb-1 block text-xs font-medium text-stone-600">Message</span>
                  <textarea 
                    placeholder="Tell us more about your issue..."
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 resize-none"
                  />
                </div>

                {/* Attach Screenshot */}
                <label className="flex cursor-pointer items-center gap-2 text-sm text-stone-500 hover:text-stone-700">
                  <i className="fas fa-paperclip"></i>
                  <span>Attach screenshot (optional)</span>
                  <input type="file" className="hidden" accept="image/*" />
                </label>

                {/* Buttons */}
                <div className="flex gap-3 pt-2">
                  <button 
                    type="button"
                    onClick={handleClose}
                    className="flex-1 rounded-full border-2 border-stone-200 bg-white px-6 py-2.5 text-sm font-medium text-stone-700 transition-all hover:border-stone-300 hover:bg-stone-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold text-stone-900 transition-all hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <i className="fas fa-circle-notch fa-spin text-xs"></i>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Success State */
              <div className="text-center py-4">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <i className="fas fa-check text-2xl text-green-500"></i>
                </div>
                <h3 className="text-lg font-semibold text-stone-800">Message Sent!</h3>
                <p className="mt-2 text-sm text-stone-500">
                  We'll get back to you shortly.
                </p>
                <button 
                  onClick={handleClose}
                  className="mt-6 rounded-full bg-stone-800 px-8 py-2.5 text-sm font-medium text-white transition-all hover:bg-stone-700"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

