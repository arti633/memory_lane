"use client";

import React, { useState } from "react";
import AppShell from "../../components/layout/AppShell";
import CreateMemoryModal from "../../components/modal/CreateMemoryModal";
import { useMemory } from "../../hooks/useMemory";

export default function MapPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [showMemoryModal, setShowMemoryModal] = useState(false);
  const { memories, createMemory } = useMemory();

  React.useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  const handleAddLocation = () => {
    setShowMemoryModal(true);
  };

  const withLocations = memories.filter((m) => m.location);

  return (
    <AppShell
      activeNav="map"
      title="Memory Map"
      subtitle="Pin stories to places and navigate your life by location."
      contentClassName="max-w-6xl"
    >
      {/* Map Container */}
      <div className="relative h-[calc(100vh-240px)] min-h-[560px] overflow-hidden rounded-3xl premium-surface">
        {/* Placeholder Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-stone-200 via-stone-100 to-stone-200">
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle, #a8a29e 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
          
          {/* Decorative elements */}
          <div className="absolute left-1/4 top-1/3 h-32 w-32 rounded-full bg-amber-200/20 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 h-40 w-40 rounded-full bg-rose-200/20 blur-3xl"></div>
        </div>

        {/* Empty State Overlay Card */}
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="mx-4 max-w-md rounded-3xl bg-white/95 backdrop-blur-md p-8 text-center shadow-2xl">
            {/* Animated Location Icon */}
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-rose-100 shadow-lg">
                  <i className="fas fa-map-marked-alt text-3xl text-amber-600"></i>
                </div>
                {/* Pulsing ring */}
                <div className="absolute inset-0 rounded-full animate-ping bg-amber-300/30"></div>
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-stone-800">Your journey begins with a place.</h1>
            <p className="mt-3 text-base text-stone-600">Pin memories to locations and revisit them geographically.</p>

            <button 
              onClick={handleAddLocation}
              className="mt-8 group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 px-8 py-3.5 text-base font-semibold text-stone-900 shadow-lg transition-all hover:shadow-xl hover:shadow-amber-300/30"
            >
              <i className="fas fa-plus"></i>
              Add Location
            </button>

            <div className="mt-6 max-h-40 space-y-2 overflow-y-auto text-left">
              {withLocations.slice(0, 5).map((m) => (
                <div key={m.id} className="rounded-lg border border-stone-200 bg-white p-2 text-xs text-stone-700">
                  <span className="font-semibold">{m.location}</span> • {m.title}
                </div>
              ))}
              {withLocations.length === 0 && (
                <p className="text-center text-sm text-stone-500">No locations yet. Add one from a new memory.</p>
              )}
            </div>
          </div>
        </div>

        {/* Floating Action Button */}
        <div className="absolute bottom-8 right-8">
          <button 
            onClick={handleAddLocation}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-amber-500 to-amber-400 text-white shadow-xl transition-all hover:scale-110 hover:shadow-2xl hover:shadow-amber-400/30"
          >
            <i className="fas fa-plus text-xl"></i>
          </button>
        </div>
      </div>
      <CreateMemoryModal
        isOpen={showMemoryModal}
        onClose={() => setShowMemoryModal(false)}
        onSave={async (data) => {
          await createMemory(data);
          setShowMemoryModal(false);
        }}
      />
    </AppShell>
  );
}

