"use client";

import React, { useState } from "react";

export default function CreateAlbumModal({ isOpen, onClose, onCreate }) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    privacy: "private",
    coverImage: null
  });

  if (!isOpen) return null;

  const handleCreate = async () => {
    if (!formData.name.trim()) return;
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
    onCreate(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative z-10 mx-4 w-full max-w-md rounded-3xl bg-white shadow-2xl animate-slideUp">
        <div className="flex items-center justify-between border-b border-stone-100 px-8 py-5">
          <h2 className="text-xl font-semibold text-stone-800">Create Album</h2>
          <button onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-stone-100">
            <i className="fas fa-times text-stone-500"></i>
          </button>
        </div>

        <div className="space-y-6 p-8">
          {/* Cover Image Upload */}
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">Cover Image</label>
            <div className="relative flex h-32 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-stone-300 bg-stone-50 transition-all hover:border-amber-400 hover:bg-amber-50">
              {formData.coverImage ? (
                <img src={formData.coverImage} alt="cover" className="h-full w-full rounded-xl object-cover" />
              ) : (
                <div className="text-center">
                  <i className="fas fa-image text-2xl text-stone-400"></i>
                  <p className="mt-1 text-sm text-stone-500">Click to add cover</p>
                </div>
              )}
              <input type="file" accept="image/*" className="absolute inset-0 cursor-pointer opacity-0" onChange={(e) => {
                const file = e.target.files[0];
                if (file) setFormData({...formData, coverImage: URL.createObjectURL(file)});
              }} />
            </div>
          </div>

          {/* Album Name */}
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">Album Name</label>
            <input 
              type="text" 
              placeholder="e.g., Summer Vacation 2024"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
            />
          </div>

          {/* Description */}
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">Description <span className="text-stone-400">(optional)</span></label>
            <textarea 
              placeholder="What's this album about?"
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 resize-none"
            />
          </div>

          {/* Privacy */}
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700">Privacy</label>
            <div className="flex gap-2">
              {['private', 'shared'].map((option) => (
                <button
                  key={option}
                  onClick={() => setFormData({...formData, privacy: option})}
                  className={`flex-1 rounded-xl border py-3 text-sm font-medium capitalize transition-all ${
                    formData.privacy === option 
                      ? 'border-amber-400 bg-amber-50 text-amber-700' 
                      : 'border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  {option === 'private' ? <><i className="fas fa-lock mr-2"></i>Private</> : <><i className="fas fa-users mr-2"></i>Shared</>}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-stone-100 px-8 py-5">
          <button onClick={onClose} className="text-sm font-medium text-stone-600 hover:text-stone-800">
            Cancel
          </button>
          <button 
            onClick={handleCreate} 
            disabled={!formData.name.trim() || isLoading}
            className="rounded-full bg-stone-900 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? 'Creating...' : 'Create Album'}
          </button>
        </div>
      </div>
    </div>
  );
}

