"use client";

import React, { useState, useEffect } from "react";
import { useAlbums } from "../../hooks/useAlbums";
import { useMemory } from "../../hooks/useMemory";
import { useAuthStore } from "../../store/authStore";
import CreateAlbumModal from "../../components/modal/CreateAlbumModal";

const photos = [
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png",
  "/images/image4.png",
  "/images/image5.png",
  "/images/image6.png",
  "/images/image7.png"
];

export default function AlbumsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  const user = useAuthStore((state) => state.user);
  const { albums, createAlbum, isLoading } = useAlbums();
  const { memories } = useMemory();

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, [user]);

  const getAlbumCover = (albumId) => {
    const albumMemories = memories.filter((m) => m.album === albumId);
    if (albumMemories.length > 0) {
      const idx = albums.findIndex((a) => a.id === albumId) % photos.length;
      return photos[idx];
    }
    return photos[Math.floor(Math.random() * photos.length)];
  };

  const getAlbumMemoryCount = (albumId) => {
    return memories.filter((m) => m.album === albumId).length;
  };

  if (!user) {
    return (
      <main className="min-h-screen bg-[#F8F6F2] flex items-center justify-center">
        <div className="rounded-2xl border border-stone-200 bg-white px-6 py-4 text-stone-700 shadow-soft">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-stone-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/95 backdrop-blur-md shadow-soft">
        <div className="flex items-center gap-4 px-6 py-3">
          <a href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-stone-900">memona</span>
          </a>

          <div className="mx-4 flex-1 max-w-xl">
            <div className="search-input">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                placeholder="Search albums..."
                className="flex-1 bg-transparent text-sm text-stone-800 placeholder-stone-400 outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.location.href = "/dashboard"}
              className="btn-outline gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Timeline
            </button>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="btn-gold gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Album
            </button>
            <div className="avatar bg-gradient-to-br from-amber-300 to-amber-400">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div>
        </div>
      </header>

      {/* Albums Content */}
      <section className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-800 mb-2">Albums</h1>
          <p className="text-stone-500">Organize your memories into beautiful collections</p>
        </div>

        {albums.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-stone-800 mb-2">No albums yet</h2>
            <p className="text-stone-500 mb-6">Create your first album to organize your memories</p>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="btn-gold"
            >
              Create Album
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {albums.map((album) => (
              <div 
                key={album.id}
                className="premium-card group cursor-pointer overflow-hidden"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img 
                    src={getAlbumCover(album.id)} 
                    alt={album.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-white/90 text-sm font-medium text-stone-700">
                    {getAlbumMemoryCount(album.id)} memories
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-stone-800 mb-1">{album.name}</h3>
                  {album.description && (
                    <p className="text-sm text-stone-500 line-clamp-2">{album.description}</p>
                  )}
                  <div className="flex items-center gap-2 mt-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      album.privacy === "private" 
                        ? "bg-stone-100 text-stone-600" 
                        : "bg-amber-100 text-amber-700"
                    }`}>
                      {album.privacy}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <button 
              onClick={() => setShowCreateModal(true)}
              className="premium-card flex flex-col items-center justify-center p-8 border-dashed border-2 border-stone-200 hover:border-amber-300 bg-transparent hover:bg-amber-50/50 transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-stone-400 group-hover:text-amber-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="font-medium text-stone-600 group-hover:text-stone-800 transition-colors">Create New Album</span>
            </button>
          </div>
        )}
      </section>

      <CreateAlbumModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={async (data) => {
          await createAlbum(data);
          setShowCreateModal(false);
        }}
      />
    </main>
  );
}
