"use client";

import React, { useRef, useState } from "react";

export default function CreateMemoryModal({ isOpen, onClose, onSave }) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    tags: [],
    album: "",
    isMilestone: false,
    privacy: "private"
  });
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    setMediaFiles((prev) => [...prev, ...files]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files || []);
    setMediaFiles((prev) => [...prev, ...files]);
  };

  const removeMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    const next = tagInput.trim().toLowerCase();
    if (!next || formData.tags.includes(next)) return;
    setFormData((prev) => ({ ...prev, tags: [...prev.tags, next] }));
    setTagInput("");
  };

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    await onSave({ ...formData, mediaCount: mediaFiles.length });
    setIsLoading(false);
    setStep(1);
    setMediaFiles([]);
    setTagInput("");
    setFormData({
      title: "",
      description: "",
      date: "",
      location: "",
      tags: [],
      album: "",
      isMilestone: false,
      privacy: "private"
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 mx-4 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl animate-slideUp">
        <div className="sticky top-0 flex items-center justify-between border-b border-stone-100 bg-white px-8 py-5">
          <div>
            <h2 className="text-xl font-semibold text-stone-800">Add a New Memory</h2>
            <p className="text-sm text-stone-500">Step {step} of 3</p>
          </div>
          <button type="button" onClick={onClose} className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-stone-100">
            <i className="fas fa-times text-stone-500" />
          </button>
        </div>

        <div className="h-1 bg-stone-100">
          <div className="h-full bg-amber-400 transition-all duration-300" style={{ width: `${(step / 3) * 100}%` }} />
        </div>

        <div className="p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div
                className="relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-stone-300 bg-stone-50 py-12 transition-all hover:border-amber-400 hover:bg-amber-50"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => fileInputRef.current?.click()}
              >
                <input ref={fileInputRef} type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFileSelect} />
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <i className="fas fa-cloud-upload-alt text-2xl" />
                </div>
                <p className="mt-4 text-base font-medium text-stone-700">Drag and drop your memories here</p>
                <p className="mt-1 text-sm text-stone-500">or click to browse files</p>
              </div>

              {mediaFiles.length > 0 && (
                <div className="flex flex-wrap gap-3">
                  {mediaFiles.map((file, index) => (
                    <div key={`${file.name}_${index}`} className="group relative">
                      <div className="h-20 w-20 overflow-hidden rounded-xl bg-stone-200">
                        {file.type.startsWith("image/") ? (
                          <img src={URL.createObjectURL(file)} alt="preview" className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-stone-300">
                            <i className="fas fa-video text-stone-500" />
                          </div>
                        )}
                      </div>
                      <button type="button" onClick={() => removeMedia(index)} className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100">
                        <i className="fas fa-times text-xs" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Title</label>
                <input
                  type="text"
                  placeholder="Give this moment a name..."
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Description</label>
                <textarea
                  placeholder="Tell the story behind this moment..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full resize-none rounded-xl border border-stone-200 bg-white px-4 py-3.5 transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-stone-700">Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-stone-700">Location</label>
                  <input
                    type="text"
                    placeholder="Where did this happen?"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Tags</label>
                <input
                  type="text"
                  placeholder="Add tags (press Enter)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addTag();
                    }
                  }}
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.tags.map((item, index) => (
                    <span key={`${item}_${index}`} className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-sm text-amber-700">
                      {item}
                      <button type="button" onClick={() => setFormData({ ...formData, tags: formData.tags.filter((_, i) => i !== index) })}>
                        <i className="fas fa-times text-xs" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Album</label>
                <select
                  value={formData.album}
                  onChange={(e) => setFormData({ ...formData, album: e.target.value })}
                  className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3.5 transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100"
                >
                  <option value="">Select an album (optional)</option>
                  <option value="travel">Travel Adventures</option>
                  <option value="family">Family Celebrations</option>
                  <option value="milestones">Milestones</option>
                </select>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-stone-200 p-4">
                <div>
                  <p className="font-medium text-stone-800">Mark as Milestone</p>
                  <p className="text-sm text-stone-500">Highlight this memory on your timeline</p>
                </div>
                <button type="button" onClick={() => setFormData({ ...formData, isMilestone: !formData.isMilestone })} className={`relative h-8 w-14 rounded-full transition-colors ${formData.isMilestone ? "bg-amber-400" : "bg-stone-200"}`}>
                  <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition-transform ${formData.isMilestone ? "left-7" : "left-1"}`} />
                </button>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-700">Privacy</label>
                <div className="flex gap-2">
                  {["private", "shared", "public"].map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => setFormData({ ...formData, privacy: option })}
                      className={`flex-1 rounded-xl border py-3 text-sm font-medium capitalize transition-all ${formData.privacy === option ? "border-amber-400 bg-amber-50 text-amber-700" : "border-stone-200 text-stone-600 hover:border-stone-300"}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 flex items-center justify-between border-t border-stone-100 bg-white px-8 py-5">
          <button type="button" onClick={step === 1 ? onClose : () => setStep((prev) => prev - 1)} className="text-sm font-medium text-stone-600 hover:text-stone-800">
            {step === 1 ? "Cancel" : "Back"}
          </button>
          {step < 3 ? (
            <button type="button" onClick={() => setStep((prev) => prev + 1)} className="rounded-full bg-stone-900 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-stone-800">
              Continue
            </button>
          ) : (
            <button type="button" onClick={handleSave} disabled={isLoading} className="flex items-center gap-2 rounded-full bg-amber-400 px-8 py-3 text-sm font-semibold text-stone-900 transition-all hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70">
              {isLoading ? "Saving..." : "Save Memory"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
