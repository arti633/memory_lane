"use client";

import React, { useState, useEffect } from "react";

const photos = [
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png",
  "/images/image4.png",
  "/images/image5.png",
  "/images/image6.png",
  "/images/image7.png"
];

export default function ReminisceOverlay({ memory, onClose }) {
  const [reflection, setReflection] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(photos[Math.floor(Math.random() * photos.length)]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "Unknown Date";
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  const handleSaveReflection = () => {
    // Save reflection logic would go here
    console.log("Reflection saved:", reflection);
    onClose();
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  if (!memory) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div className="text-center text-white">
          <div className="mb-4 text-6xl">📷</div>
          <p className="text-lg font-medium">No memories yet to reminisce about.</p>
          <button onClick={onClose} className="mt-6 btn-outline bg-white/10 border-white/30 text-white hover:bg-white/20">
            Return to Timeline
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${isVisible ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0'}`}
      onClick={handleClose}
    >
      <div 
        className={`relative mx-4 max-w-2xl w-full transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Main card */}
        <div className="reminisce-overlay bg-white rounded-3xl overflow-hidden shadow-2xl">
          {/* Image section */}
          <div className="relative h-80 overflow-hidden">
            <img 
              src={currentImage} 
              alt={memory.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            
            {/* Milestone badge */}
            {memory.isMilestone && (
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-amber-400 text-stone-900 text-xs font-bold flex items-center gap-1.5 shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                Milestone
              </div>
            )}
            
            {/* Date overlay */}
            <div className="absolute bottom-4 left-6">
              <p className="text-white/90 text-sm font-medium">{formatDate(memory.date || memory.createdAt)}</p>
            </div>
          </div>

          {/* Content section */}
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-stone-900">{memory.title || "Untitled Memory"}</h2>
            <p className="mt-3 text-sm leading-relaxed text-stone-600">
              {memory.description || "Take a moment to revisit this memory and capture what it means to you today."}
            </p>

            {(memory.tags || []).length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {(memory.tags || []).slice(0, 5).map((item, idx) => (
                  <span key={idx} className="tag-pill">
                    #{item}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-stone-700">Add a reflection</label>
              <textarea
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                placeholder="What does this memory mean to you today?"
                className="min-h-28 w-full rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-800 outline-none transition focus:border-amber-300 focus:bg-white focus:ring-2 focus:ring-amber-100"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                className="rounded-full border border-stone-200 px-5 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSaveReflection}
                className="rounded-full bg-amber-300 px-5 py-2.5 text-sm font-semibold text-stone-900 transition hover:bg-amber-200"
              >
                Save Reflection
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
