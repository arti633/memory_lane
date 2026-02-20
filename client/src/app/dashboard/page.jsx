"use client";

import React, { useEffect, useMemo, useState } from "react";
import CreateMemoryModal from "../../components/modal/CreateMemoryModal";
import CreateAlbumModal from "../../components/modal/CreateAlbumModal";
import ReminisceOverlay from "../../components/modal/ReminisceOverlay";
import { useMemory } from "../../hooks/useMemory";
import { useAlbums } from "../../hooks/useAlbums";
import { useAuthStore } from "../../store/authStore";

const photos = [
  "/images/image1.png",
  "/images/image2.png",
  "/images/image3.png",
  "/images/image4.png",
  "/images/image5.png",
  "/images/image6.png",
  "/images/image7.png"
];

const formatDate = (value) => {
  if (!value) return "Unknown Date";
  return new Date(value).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  });
};

const formatFullDate = (value) => {
  if (!value) return "Unknown Date";
  return new Date(value).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
};

// Sample notifications
const notifications = [
  { id: 1, type: "milestone", message: "Your graduation memory is now 1 year old!", time: "2h ago" },
  { id: 2, type: "album", message: "New photos added to Travel Adventures", time: "5h ago" },
  { id: 3, type: "memory", message: "Sarah commented on your beach memory", time: "1d ago" }
];

export default function DashboardPage() {
  const [showMemoryModal, setShowMemoryModal] = useState(false);
  const [showAlbumModal, setShowAlbumModal] = useState(false);
  const [showReminisce, setShowReminisce] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [activeNav, setActiveNav] = useState("timeline");

  const user = useAuthStore((state) => state.user);
  const initialize = useAuthStore((state) => state.initialize);
  const ready = useAuthStore((state) => state.isAuthenticated);

  const {
    memories,
    tags,
    search,
    tag,
    date,
    setSearch,
    setTag,
    setDate,
    loadMemories,
    createMemory,
    getRandomMemory
  } = useMemory();
  const { albums, createAlbum } = useAlbums();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (!ready && user === null) {
      const timer = setTimeout(() => {
        if (useAuthStore.getState().user === null) {
          window.location.href = "/login";
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [ready, user]);

  const grouped = useMemo(() => {
    const groups = memories.reduce((acc, memory, idx) => {
      const key = formatDate(memory.date || memory.createdAt);
      if (!acc[key]) acc[key] = [];
      acc[key].push({ ...memory, image: photos[idx % photos.length] });
      return acc;
    }, {});
    return Object.entries(groups);
  }, [memories]);

  const years = useMemo(() => {
    const ys = memories
      .map((m) => new Date(m.date || m.createdAt).getFullYear())
      .filter((y) => Number.isFinite(y));
    return [...new Set(ys)].sort((a, b) => b - a);
  }, [memories]);

  const handleSearch = async (e) => {
    e.preventDefault();
    await loadMemories();
  };

  const handleReminisce = async () => {
    const memory = await getRandomMemory();
    setShowReminisce(true);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowNotifications(false);
      setShowProfileDropdown(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (user === null) {
    return (
      <main className="min-h-screen bg-[#F8F6F2] flex items-center justify-center">
        <div className="rounded-2xl border border-stone-200 bg-white px-6 py-4 text-stone-700 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
            Loading your memories...
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-stone-900">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/95 backdrop-blur-md shadow-soft">
        <div className="flex items-center gap-4 px-6 py-3">
          {/* Logo */}
          <a href="/dashboard" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-stone-900">memona</span>
          </a>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mx-4 flex-1 max-w-xl">
            <div className="search-input">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your memories..."
                className="flex-1 bg-transparent text-sm text-stone-800 placeholder-stone-400 outline-none"
              />
              <button type="submit" className="text-stone-400 hover:text-stone-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Reminisce Button */}
            <button 
              onClick={handleReminisce}
              className="btn-outline gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Reminisce
            </button>

            {/* Add Memory Button (Gold) */}
            <button 
              onClick={() => setShowMemoryModal(true)}
              className="btn-gold gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Memory
            </button>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotifications(!showNotifications);
                }}
                className="relative p-2 rounded-full hover:bg-stone-100 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {notifications.length > 0 && (
                  <span className="notification-badge">{notifications.length}</span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl border border-stone-100 shadow-soft-lg overflow-hidden animate-dropdown-in">
                  <div className="px-4 py-3 border-b border-stone-100">
                    <h3 className="font-semibold text-stone-800">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="px-4 py-3 hover:bg-stone-50 transition-colors cursor-pointer border-b border-stone-50 last:border-0">
                        <p className="text-sm text-stone-700">{notif.message}</p>
                        <p className="text-xs text-stone-400 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="relative">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileDropdown(!showProfileDropdown);
                }}
                className="avatar bg-gradient-to-br from-amber-300 to-amber-400"
              >
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </button>

              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-stone-100 shadow-soft-lg overflow-hidden animate-dropdown-in">
                  <div className="px-4 py-3 border-b border-stone-100">
                    <p className="font-semibold text-stone-800">{user?.name || "User"}</p>
                    <p className="text-sm text-stone-500">{user?.email || "user@memona.app"}</p>
                  </div>
                  <div className="py-2">
                    <a href="/settings" className="flex items-center gap-3 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Settings
                    </a>
                    <a href="/support" className="flex items-center gap-3 px-4 py-2 text-sm text-stone-600 hover:bg-stone-50 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Help & Support
                    </a>
                  </div>
                  <div className="border-t border-stone-100 py-2">
                    <button className="flex items-center gap-3 px-4 py-2 w-full text-sm text-rose-600 hover:bg-rose-50 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
        </div>
      </div>
      </header>

      {/* Main Content Area */}
      <div className="flex min-h-[calc(100vh-73px)]">
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-stone-200/80 bg-white p-4 hidden lg:block">
          <nav className="space-y-1">
            <p className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-stone-400">Browse</p>
            
            <a 
              href="/dashboard" 
              className={`sidebar-item ${activeNav === "timeline" ? "active" : ""}`}
              onClick={() => setActiveNav("timeline")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
              Timeline
            </a>
            
            <a 
              href="/albums" 
              className={`sidebar-item ${activeNav === "albums" ? "active" : ""}`}
              onClick={() => setActiveNav("albums")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Albums
            </a>
            
            <a 
              href="/map" 
              className={`sidebar-item ${activeNav === "map" ? "active" : ""}`}
              onClick={() => setActiveNav("map")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Map
            </a>
            
            <a 
              href="/milestones" 
              className={`sidebar-item ${activeNav === "milestones" ? "active" : ""}`}
              onClick={() => setActiveNav("milestones")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Milestones
            </a>
            
            <a href="#" className="sidebar-item">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Favorites
            </a>
            
            <a href="#" className="sidebar-item">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              Archive
            </a>
          </nav>

          {/* Albums Section */}
          <div className="mt-8">
            <div className="flex items-center justify-between px-4 mb-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">Albums</p>
              <button 
                onClick={() => setShowAlbumModal(true)}
                className="text-xs text-amber-600 hover:text-amber-700 font-medium"
              >
                + New
              </button>
            </div>
            <div className="space-y-1">
              {albums.slice(0, 4).map((album) => (
                <a 
                  key={album.id} 
                  href={`/albums/${album.id}`}
                  className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-stone-600 hover:bg-stone-50 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-200 to-orange-200 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="truncate">{album.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Storage Info */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-stone-600">Storage</span>
                <span className="text-xs text-stone-400">2.4 GB / 15 GB</span>
              </div>
              <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
                <div className="h-full w-[16%] bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" />
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <section className="flex-1 bg-[#F8F6F2] px-6 py-6 overflow-y-auto">
          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <select 
              value={tag} 
              onChange={(e) => setTag(e.target.value)}
              className="px-4 py-2.5 rounded-full border border-stone-200 bg-white text-sm font-medium text-stone-700 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition-all"
            >
              <option value="">All Tags</option>
              {tags.map((t) => (
                <option key={t} value={t}>#{t}</option>
              ))}
            </select>
            
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              className="px-4 py-2.5 rounded-full border border-stone-200 bg-white text-sm font-medium text-stone-700 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-100 transition-all"
            />
            
            <button 
              onClick={() => loadMemories()}
              className="px-5 py-2.5 rounded-full border border-stone-200 bg-white text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
            >
              Apply Filters
            </button>
            
            {(tag || date) && (
              <button 
                onClick={() => { setTag(""); setDate(""); }}
                className="text-sm text-amber-600 hover:text-amber-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>

          {/* Timeline View */}
          <div className="space-y-10">
            {grouped.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-stone-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-stone-800 mb-2">No memories yet</h3>
                <p className="text-stone-500 mb-6">Start capturing your precious moments</p>
                <button 
                  onClick={() => setShowMemoryModal(true)}
                  className="btn-gold"
                >
                  Add Your First Memory
                </button>
              </div>
            ) : (
              grouped.map(([groupDate, list]) => (
                <div key={groupDate}>
                  {/* Date Separator */}
                  <div className="timeline-date-separator">
                    <span className="timeline-date-text whitespace-nowrap px-4">{groupDate}</span>
                  </div>
                  
                  {/* Memory Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {list.map((memory) => (
                      <article 
                        key={memory.id} 
                        className={`memory-card ${memory.isMilestone ? "milestone" : ""} group cursor-pointer`}
                      >
                        {/* Image */}
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <img 
                            src={memory.image} 
                            alt={memory.title} 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          {/* Favorite Button */}
                          <button className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-stone-600 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                          </button>
                          
                          {/* Milestone Badge */}
                          {memory.isMilestone && (
                            <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-amber-400 text-stone-900 text-xs font-bold flex items-center gap-1 shadow-lg">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                              Milestone
                            </div>
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="p-4">
                          <h3 className="font-semibold text-stone-800 mb-1 truncate">{memory.title}</h3>
                          {memory.location && (
                            <p className="text-xs text-stone-500 flex items-center gap-1 mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {memory.location}
                            </p>
                          )}
                          <p 
                            className="text-xs text-stone-500 line-clamp-2"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden"
                            }}
                          >
                            {memory.description || "No description"}
                          </p>
                          
                          {/* Tags */}
                          {(memory.tags || []).length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mt-3">
                              {(memory.tags || []).slice(0, 3).map((item, idx) => (
                                <span key={idx} className="tag-pill">
                                  #{item}
                                </span>
                              ))}
                              {(memory.tags || []).length > 3 && (
                                <span className="text-xs text-stone-400">+{memory.tags.length - 3}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Right Sidebar - Year Navigation */}
        <aside className="w-16 border-l border-stone-200/80 bg-white hidden xl:block">
          <div className="sticky top-20 py-4">
            <div className="flex flex-col items-center gap-2">
              {years.map((year) => (
                <a 
                  key={year}
                  href={`#year-${year}`}
                  className="text-xs font-semibold text-stone-400 hover:text-amber-600 transition-colors py-1"
                >
                  {year}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Modals */}
      <CreateMemoryModal
        isOpen={showMemoryModal}
        onClose={() => setShowMemoryModal(false)}
        onSave={async (data) => {
          await createMemory(data);
          setShowMemoryModal(false);
        }}
      />
      
      <CreateAlbumModal
        isOpen={showAlbumModal}
        onClose={() => setShowAlbumModal(false)}
        onCreate={async (data) => {
          await createAlbum(data);
          setShowAlbumModal(false);
        }}
      />

      {/* Reminisce Overlay */}
      {showReminisce && (
        <ReminisceOverlay 
          memory={memories[Math.floor(Math.random() * memories.length)]} 
          onClose={() => setShowReminisce(false)}
        />
      )}
    </main>
  );
}
